// Optional browser QA: requires playwright and @axe-core/playwright in Node's module path.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";
import { publicPages } from "./site-files.mjs";
const require = createRequire(import.meta.url);
let chromium;
try {
    ({ chromium } = require("playwright"));
} catch (error) {
    if (error.code !== "MODULE_NOT_FOUND") throw error;
    ({ chromium } = require("playwright-core"));
}
const AxeBuilder = require("@axe-core/playwright").default;
const base = process.env.SITE_URL ?? "http://127.0.0.1:8765";
const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "output/review/browser");
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({
    channel: process.env.BROWSER_CHANNEL ?? "msedge",
    headless: true,
});
const pages = publicPages(root);
const representatives = [
    "index.html",
    "articles/index.html",
    "articles/printable-weekly-meal-planner-vs-meal-planning-app.html",
    "articles/best-meal-planning-apps-for-uk-families.html",
    "support.html",
    "privacy-policy.html",
    "open/index.html",
    "updates/index.html",
    "updates/introducing-fameally.html",
    "resources/index.html",
];
const errors = [],
    audits = [];
try {
    for (const colorScheme of ["light", "dark"]) {
        const context = await browser.newContext({ colorScheme });
        const page = await context.newPage();
        page.on("pageerror", (error) => errors.push(error.message));
        page.on("response", (response) => {
            if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
        });
        for (const width of [360, 390, 768, 1440]) {
            await page.setViewportSize({ width, height: 1000 });
            for (const file of pages) {
                await page.goto(`${base}/${file}`, { waitUntil: "networkidle" });
                const dimensions = await page.evaluate(() => ({
                    viewport: innerWidth,
                    content: document.documentElement.scrollWidth,
                }));
                assert.ok(
                    dimensions.content <= dimensions.viewport,
                    `${file}: horizontal overflow at ${width}px (${colorScheme})`,
                );
                assert.equal(await page.locator("h1").count(), 1, file);
                if ([390, 1440].includes(width) && representatives.includes(file)) {
                    const audit = await new AxeBuilder({ page })
                        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
                        .analyze();
                    audits.push({
                        file,
                        width,
                        colorScheme,
                        violations: audit.violations.map((v) => ({
                            id: v.id,
                            impact: v.impact,
                            nodes: v.nodes.map((n) => n.target),
                        })),
                    });
                    const label = file.replaceAll("/", "-").replace(".html", "");
                    await page.screenshot({
                        path: `${output}/${label}-${width}-${colorScheme}.png`,
                        fullPage: true,
                    });
                }
            }
        }
        await context.close();
        console.log(`Checked all ${pages.length} pages at four widths in ${colorScheme} mode.`);
    }
    const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(base);
    const toggle = page.getByRole("button", { name: /Menu/ });
    assert.equal(await page.locator("#primary-links").isVisible(), false);
    await toggle.focus();
    await page.keyboard.press("Enter");
    assert.equal(await toggle.getAttribute("aria-expanded"), "true");
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement.textContent), "Product");
    await page.keyboard.press("Escape");
    assert.equal(await toggle.getAttribute("aria-expanded"), "false");
    assert.equal(await toggle.evaluate((el) => el === document.activeElement), true);
    await toggle.click();
    await page.locator("#primary-links a").first().click();
    assert.equal(await toggle.getAttribute("aria-expanded"), "false");
    assert.ok(page.url().endsWith("#how-it-works"));
    assert.equal(
        await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
        "auto",
    );
    for (const file of representatives) {
        await page.setViewportSize({ width: 1440, height: 1000 });
        await page.goto(`${base}/${file}`);
        await page.evaluate(() => {
            document.body.style.zoom = "2";
        });
        assert.ok(
            await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
            `${file}: overflow at 200% CSS zoom`,
        );
    }
    // The PDF remains reachable, and every store link retains the correct app identifier.
    const pdf = await page.request.get(`${base}/output/pdf/fameally-weekly-dinner-planner.pdf`);
    assert.equal(pdf.status(), 200);
    assert.ok((await pdf.body()).subarray(0, 5).toString().startsWith("%PDF"));
    await page.goto(base);
    for (const href of await page
        .locator(".store-badge-link")
        .evaluateAll((links) => links.map((a) => a.href))) {
        assert.ok(href.includes("id6761440482") || href.includes("id=com.edwardnickless.fameally"));
    }
    await context.close();
    const nojs = await browser.newContext({
        javaScriptEnabled: false,
        viewport: { width: 360, height: 800 },
    });
    const fallback = await nojs.newPage();
    await fallback.goto(base);
    assert.equal(await fallback.locator("#primary-links").isVisible(), true);
    assert.equal(
        await fallback.getByRole("link", { name: "Product", exact: true }).isVisible(),
        true,
    );
    await nojs.close();
    const editorial = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const editorialPage = await editorial.newPage();
    for (const [path, canonical] of [
        ["updates/", "https://fameally.com/updates/"],
        ["resources/", "https://fameally.com/resources/"],
        ["updates/introducing-fameally.html", "https://fameally.com/updates/introducing-fameally.html"],
    ]) {
        await editorialPage.goto(`${base}/${path}`);
        assert.equal(await editorialPage.locator('link[rel="canonical"]').getAttribute("href"), canonical);
        assert.ok(await editorialPage.locator("main").isVisible());
        assert.ok(await editorialPage.locator("#primary-links").isVisible());
    }
    await editorial.close();
    writeFileSync(
        `${output}/results.json`,
        JSON.stringify(
            { pages: pages.length, viewportChecks: pages.length * 8, errors, audits },
            null,
            2,
        ),
    );
    assert.deepEqual(errors, [], "Browser or resource errors");
    const violations = audits.filter((audit) => audit.violations.length);
    assert.deepEqual(
        violations,
        [],
        "Accessibility violations; see output/review/browser/results.json",
    );
    console.log(
        "Passed accessibility, navigation, no-JS fallback, reduced motion, 200% reflow, PDF and store link checks.",
    );
} finally {
    await browser.close();
}
