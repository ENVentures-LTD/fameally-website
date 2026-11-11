// Focused Help QA after tutorial edits; uses the existing optional browser tools.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright-core");
const AxeBuilder = require("@axe-core/playwright").default;
const base = process.env.SITE_URL ?? "http://127.0.0.1:8767";
const output = resolve(import.meta.dirname, "../output/review/help-t1/browser");
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL ?? "msedge", headless: true });
const errors = [], audits = [];
try {
    for (const javaScriptEnabled of [true, false]) {
        for (const colorScheme of ["light", "dark"]) {
            const context = await browser.newContext({ javaScriptEnabled, colorScheme });
            const page = await context.newPage();
            page.on("pageerror", (error) => errors.push(error.message));
            page.on("response", (response) => {
                if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
            });
            for (const width of [360, 390, 768, 1440]) {
                await page.setViewportSize({ width, height: 1000 });
                for (const [file, canonical] of [
                    ["help/", "https://fameally.com/help/"],
                    ["help/getting-started.html", "https://fameally.com/help/getting-started.html"],
                ]) {
                    await page.goto(`${base}/${file}`);
                    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), canonical);
                    assert.equal(await page.locator("h1").count(), 1);
                    const current = page.locator('#primary-links [aria-current]');
                    assert.equal(await current.count(), 1);
                    assert.equal(await current.innerText(), "Help");
                    if (!javaScriptEnabled) assert.ok(await page.locator("#primary-links").isVisible());
                    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${file}: overflow at ${width}px`);
                    for (const image of await page.locator('[data-screenshot] img').all()) {
                        await image.scrollIntoViewIfNeeded();
                        await image.evaluate((element) => element.decode());
                    }
                    if (file === "help/") {
                        const data = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
                        const collection = data["@graph"].find((node) => node["@type"] === "CollectionPage");
                        assert.deepEqual(collection.hasPart.itemListElement.map((item) => item.url),
                            ["https://fameally.com/help/getting-started.html"]);
                        assert.ok(await page.getByRole("link", { name: "Contact support", exact: true }).first().isVisible());
                    }
                    if (javaScriptEnabled && [390, 1440].includes(width)) {
                        const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
                        const violations = audit.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }));
                        audits.push({ file, width, colorScheme, violations });
                        assert.deepEqual(violations, [], `${file}: accessibility`);
                        await page.evaluate(() => window.scrollTo(0, 0));
                        const name = file === "help/" ? "hub" : "getting-started";
                        await page.screenshot({ path: `${output}/${name}-${width}-${colorScheme}.png`, fullPage: true });
                        await page.screenshot({ path: `${output}/${name}-${width}-${colorScheme}-viewport.png` });
                    }
                }
            }
            await context.close();
        }
    }
    assert.deepEqual(errors, []);
    writeFileSync(`${output}/results.json`, JSON.stringify({ errors, audits, viewportChecks: 32 }, null, 2));
    console.log("Passed Help checks at four widths in both themes, with and without JavaScript: canonical routes, current navigation, images, accessible content and populated hub.");
} finally { await browser.close(); }
