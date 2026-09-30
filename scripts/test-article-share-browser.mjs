// Optional browser QA using the same dependencies and preview as test-browser.mjs.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { publicPages, publicUrl } from './site-files.mjs';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') throw error;
    ({ chromium } = require('playwright-core'));
}
const AxeBuilder = require('@axe-core/playwright').default;
const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'output/review/article-share');
mkdirSync(output, { recursive: true });
const base = process.env.SITE_URL ?? 'http://127.0.0.1:8766';
const articles = publicPages(root).filter(file => /^(articles|updates)\//.test(file) && !file.endsWith('/index.html'));
const update = 'updates/due-soon-remember-regular-shopping-items.html';
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL ?? 'msedge', headless: true });
try {
    for (const javaScriptEnabled of [true, false]) {
        const context = await browser.newContext({ javaScriptEnabled, viewport: { width: 390, height: 844 } });
        const page = await context.newPage();
        for (const file of articles) {
            await page.goto(`${base}/${file}`);
            assert.equal(await page.locator('[data-article-share]').count(), 1, file);
            assert.equal(await page.locator('[data-article-share]').isVisible(), javaScriptEnabled, file);
            assert.equal(await page.locator('[data-share-fallback]').isVisible(), !javaScriptEnabled, file);
            assert.equal(await page.locator('[data-share-fallback] input').inputValue(), publicUrl(file), file);
            assert.equal(await page.locator('.article-meta [data-share-controls]').count(), 1, file);
        }
        await context.close();
    }
    for (const colorScheme of ['light', 'dark']) {
        for (const width of [360, 390, 768, 1440]) {
            const context = await browser.newContext({ colorScheme, viewport: { width, height: 1000 } });
            const page = await context.newPage();
            await page.goto(`${base}/${update}`);
            const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
            assert.deepEqual(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [], `${width} ${colorScheme}`);
            const button = page.getByRole('button', { name: 'Share', exact: true });
            await button.focus();
            assert.equal(await button.evaluate(el => el === document.activeElement), true);
            if ([390, 1440].includes(width)) {
                const image = page.locator('.article-figure img');
                await image.scrollIntoViewIfNeeded();
                await image.evaluate(el => el.decode());
                await button.evaluate(el => el.blur());
                await page.evaluate(() => window.scrollTo(0, 0));
                await page.screenshot({ path: `${output}/due-soon-${width}-${colorScheme}.png`, fullPage: true });
            }
            await context.close();
        }
    }
    for (const [platform, userAgent, expected] of [['ios', 'iPhone', 'ios'], ['android', 'Android', 'generic']]) {
        const context = await browser.newContext({ userAgent, viewport: { width: 390, height: 844 } });
        await context.addInitScript(() => {
            Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
            Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { window.copiedArticle = value; } } });
        });
        const page = await context.newPage();
        await page.goto(`${base}/${update}?utm_source=review#weekly-routine`);
        const button = page.getByRole('button', { name: 'Share', exact: true });
        assert.equal(await page.locator(`[data-share-icon="${expected}"]`).isVisible(), true);
        await button.screenshot({ path: `${output}/share-${platform}.png` });
        await button.focus(); await page.keyboard.press('Enter');
        await page.getByRole('status').filter({ hasText: 'Article link copied.' }).waitFor();
        assert.equal(await page.evaluate(() => window.copiedArticle), publicUrl(update));
        await context.close();
    }
    for (const native of ['success', 'cancel', 'failure']) {
        const context = await browser.newContext();
        await context.addInitScript(mode => {
            Object.defineProperty(navigator, 'share', { configurable: true, value: async payload => {
                window.sharedArticle = payload;
                if (mode !== 'success') throw new DOMException('Share failed', mode === 'cancel' ? 'AbortError' : 'NotAllowedError');
            } });
            Object.defineProperty(navigator, 'canShare', { configurable: true, value: () => true });
            Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new DOMException('Denied', 'NotAllowedError'); } } });
        }, native);
        const page = await context.newPage();
        await page.goto(`${base}/${update}`);
        await page.getByRole('button', { name: 'Share', exact: true }).click();
        await page.waitForFunction(() => !document.querySelector('[data-article-share]').disabled);
        assert.equal(await page.evaluate(() => window.sharedArticle.url), publicUrl(update));
        assert.equal(await page.locator('[data-share-fallback]').isVisible(), native === 'failure');
        if (native === 'failure') {
            const input = page.locator('[data-share-fallback] input');
            assert.equal(await input.evaluate(el => el === document.activeElement), true);
            assert.equal(await input.evaluate(el => el.selectionEnd - el.selectionStart), publicUrl(update).length);
        }
        await context.close();
    }
    console.log(`Passed browser sharing checks on ${articles.length} articles, both icons, native/copy/manual fallbacks, no-JS, keyboard and Due Soon accessibility in both themes at four widths.`);
} finally { await browser.close(); }
