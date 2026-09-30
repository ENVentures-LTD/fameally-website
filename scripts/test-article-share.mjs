import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';
const source = readFileSync(new URL('../assets/article-share.js', import.meta.url), 'utf8');
const canonical = 'https://fameally.com/updates/due-soon-remember-regular-shopping-items.html';
function setup(navigator = {}) {
    const element = () => ({ hidden: true, disabled: false, textContent: '', handlers: {}, addEventListener(name, fn) { this.handlers[name] = fn; } });
    const button = element(), status = element(), fallback = element(), ios = element(), generic = element();
    fallback.hidden = false;
    const input = { focus() { this.focused = true; }, select() { this.selected = true; } };
    fallback.querySelector = () => input;
    const controls = { querySelector: selector => ({ '[data-article-share]': button, '[data-share-status]': status, '[data-share-fallback]': fallback, '[data-share-icon="ios"]': ios, '[data-share-icon="generic"]': generic })[selector] };
    const nodes = { '[data-share-controls]': controls, 'link[rel="canonical"]': { href: canonical }, 'h1': { textContent: '  Due Soon: regular shopping items  ' } };
    runInNewContext(source, { navigator, document: { querySelector: selector => nodes[selector] } });
    return { button, status, fallback, input, ios, generic };
}
test('copies the canonical URL and announces success without native sharing', async () => {
    let written;
    const ui = setup({ clipboard: { writeText: async value => { written = value; } } });
    assert.equal(ui.button.hidden, false);
    await ui.button.handlers.click();
    assert.equal(written, canonical);
    assert.equal(ui.status.textContent, 'Article link copied.');
    assert.equal(ui.fallback.hidden, true);
    assert.equal(ui.button.disabled, false);
});
for (const [name, navigator] of [['unavailable clipboard', {}], ['clipboard permission denied', { clipboard: { writeText: async () => { throw Error('Denied'); } } }]]) {
    test(`${name} exposes and selects a usable link`, async () => {
        const ui = setup(navigator); await ui.button.handlers.click();
        assert.equal(ui.fallback.hidden, false); assert.equal(ui.input.value, canonical);
        assert.equal(ui.input.focused, true); assert.equal(ui.input.selected, true);
        assert.match(ui.status.textContent, /Select and copy/);
    });
}
test('native sharing receives the heading and canonical URL', async () => {
    let payload; const ui = setup({ share: async value => { payload = value; } });
    await ui.button.handlers.click(); assert.equal(payload.url, canonical);
    assert.equal(payload.title, 'Due Soon: regular shopping items');
});
test('cancelling native sharing is quiet and does not copy', async () => {
    let copied = false;
    const ui = setup({ share: async () => { throw { name: 'AbortError' }; }, clipboard: { writeText: async () => { copied = true; } } });
    await ui.button.handlers.click(); assert.equal(ui.status.textContent, '');
    assert.equal(ui.fallback.hidden, true); assert.equal(copied, false); assert.equal(ui.button.disabled, false);
});
test('native sharing failure falls back to copying', async () => {
    let written; const ui = setup({ share: async () => { throw Error('Unavailable'); }, clipboard: { writeText: async value => { written = value; } } });
    await ui.button.handlers.click(); assert.equal(written, canonical); assert.equal(ui.status.textContent, 'Article link copied.');
});
test('native and clipboard failure expose manual copying', async () => {
    const ui = setup({ share: async () => { throw Error('Unavailable'); } });
    await ui.button.handlers.click(); assert.equal(ui.fallback.hidden, false); assert.equal(ui.input.value, canonical);
});
for (const [label, canShare] of [['unsupported payload', () => false], ['capability error', () => { throw Error('Unavailable'); }]]) {
    test(`${label} copies without invoking native share`, async () => {
        let written, shared = false;
        const ui = setup({ canShare, share: async () => { shared = true; }, clipboard: { writeText: async value => { written = value; } } });
        await ui.button.handlers.click(); assert.equal(shared, false); assert.equal(written, canonical);
    });
}
test('button stays disabled until sharing finishes', async () => {
    let finish; const ui = setup({ share: () => new Promise(resolve => { finish = resolve; }) });
    const pending = ui.button.handlers.click(); assert.equal(ui.button.disabled, true);
    finish(); await pending; assert.equal(ui.button.disabled, false);
});
for (const [label, navigator, expected] of [['iPhone', { userAgent: 'iPhone' }, true], ['iPad', { userAgent: 'iPad' }, true], ['desktop-mode iPad', { userAgent: 'Macintosh', platform: 'MacIntel', maxTouchPoints: 5 }, true], ['Android', { userAgent: 'Android' }, false], ['Mac desktop', { platform: 'MacIntel', maxTouchPoints: 0 }, false], ['unknown platform', {}, false]]) {
    test(`${label} uses the matching Fameally icon`, () => {
        const ui = setup(navigator); assert.equal(ui.ios.hidden, !expected); assert.equal(ui.generic.hidden, expected);
    });
}
test('does nothing on pages without sharing controls', () => {
    assert.doesNotThrow(() => runInNewContext(source, { document: { querySelector: () => null } }));
});
