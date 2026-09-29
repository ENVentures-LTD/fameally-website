// Run against the local built preview; uses the same optional tools as test-browser.mjs.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { publicPages } from "./site-files.mjs";
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); }
catch (error) {
    if (error.code !== "MODULE_NOT_FOUND") throw error;
    ({ chromium } = require("playwright-core"));
}
const AxeBuilder = require("@axe-core/playwright").default;
const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "output/review/screenshots");
mkdirSync(output, { recursive: true });
const base = process.env.SITE_URL ?? "http://127.0.0.1:8766";
const pages = publicPages(root).filter((file) => readFileSync(resolve(root, file), "utf8").includes("data-screenshot="));
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL ?? "msedge", headless: true });
const errors = [];
async function checkPictures(page, colorScheme) {
    assert.equal(await page.locator('.screenshot-controls, .screenshot-track').count(), 0);
    for (const viewer of await page.locator('[data-screenshot]').all()) {
        assert.equal(await viewer.locator('img').count(), 1);
        const img = viewer.locator('img');
        await img.scrollIntoViewIfNeeded();
        await page.waitForFunction(({ element, dark }) => element.complete && element.naturalWidth > 0 && element.currentSrc.includes('-dark') === dark,
            { element: await img.elementHandle(), dark: colorScheme === 'dark' });
        await img.evaluate((el) => el.decode());
    }
    for (const figure of await page.locator('.article-figure').all()) {
        const image = await figure.locator('[data-screenshot]').boundingBox();
        const caption = await figure.locator('figcaption').boundingBox();
        assert.ok(caption.y >= image.y + image.height, 'Caption must sit below the screenshot');
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Horizontal overflow');
}
try {
    for (const javaScriptEnabled of [true, false]) {
        for (const colorScheme of ['light', 'dark']) {
            const context = await browser.newContext({ javaScriptEnabled, colorScheme, reducedMotion: 'reduce' });
            const page = await context.newPage();
            page.on('pageerror', (e) => errors.push(e.message));
            page.on('response', (r) => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
            for (const width of [360, 390, 768, 1440]) {
                await page.setViewportSize({ width, height: 1000 });
                for (const file of pages) {
                    await page.goto(`${base}/${file}`, { waitUntil: 'networkidle' });
                    await checkPictures(page, colorScheme);
                    if (javaScriptEnabled && [390, 1440].includes(width)) {
                        for (const figure of await page.locator('.article-figure').all()) {
                            await figure.screenshot({ path: `${output}/figure-${file.replaceAll('/', '-')}-${width}-${colorScheme}.png` });
                        }
                    }
                }
            }
            // Native picture selection must follow a live theme change on every page.
            const changed = colorScheme === 'light' ? 'dark' : 'light';
            for (const file of pages) {
                await page.emulateMedia({ colorScheme });
                await page.goto(`${base}/${file}`);
                await checkPictures(page, colorScheme);
                await page.emulateMedia({ colorScheme: changed });
                await checkPictures(page, changed);
            }
            if (javaScriptEnabled) {
                const audit = await new AxeBuilder({ page }).include('[data-screenshot]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
                assert.deepEqual(audit.violations, [], 'Screenshot accessibility');
            }
            await context.close();
        }
    }
    assert.deepEqual(errors, []);
    console.log(`Passed static screenshot checks across ${pages.length} pages, four widths and both themes, with and without JavaScript, including live theme changes and stacked captions.`);
} finally {
    await browser.close();
}
