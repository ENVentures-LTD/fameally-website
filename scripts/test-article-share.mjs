import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';

const source = readFileSync(new URL('../assets/printable-planner/share.js', import.meta.url), 'utf8');
const canonical = 'https://fameally.com/articles/printable-weekly-meal-planner-vs-meal-planning-app.html';

function setup(navigator = {}) {
    function element() {
        return { hidden: true, textContent: '', handlers: {}, addEventListener(name, fn) { this.handlers[name] = fn; } };
    }
    const native = element(), copy = element(), status = element(), controls = element(), fallback = element();
    const input = { focus() { this.focused = true; }, select() { this.selected = true; } };
    controls.querySelector = selector => selector === '[data-native-share]' ? native : copy;
    fallback.querySelector = () => input;
    const nodes = {
        '[data-share-controls]': controls,
        'link[rel="canonical"]': { href: canonical },
        'h1': { textContent: 'Printable planner or app?' },
        '[data-share-status]': status,
        '[data-share-fallback]': fallback,
    };
    runInNewContext(source, { navigator, document: { querySelector: selector => nodes[selector] } });
    return { native, copy, status, controls, fallback, input };
}

test('copies the clean canonical URL and announces success', async () => {
    let written;
    const ui = setup({ clipboard: { writeText: async value => { written = value; } } });
    await ui.copy.handlers.click();
    assert.equal(written, canonical);
    assert.equal(ui.status.textContent, 'Article link copied.');
    assert.equal(ui.fallback.hidden, true);
    assert.equal(ui.controls.hidden, false);
    assert.equal(ui.native.hidden, true);
});

for (const [name, navigator] of [
    ['unavailable clipboard', {}],
    ['clipboard permission denied', { clipboard: { writeText: async () => { throw new Error('Denied'); } } }],
]) {
    test(`${name} exposes and selects a usable link`, async () => {
        const ui = setup(navigator);
        await ui.copy.handlers.click();
        assert.equal(ui.fallback.hidden, false);
        assert.equal(ui.input.value, canonical);
        assert.equal(ui.input.focused, true);
        assert.equal(ui.input.selected, true);
        assert.match(ui.status.textContent, /Select and copy/);
    });
}

test('native sharing receives the title and canonical URL', async () => {
    let payload;
    const ui = setup({ share: async value => { payload = value; } });
    assert.equal(ui.native.hidden, false);
    await ui.native.handlers.click();
    assert.equal(payload.url, canonical);
    assert.equal(payload.title, 'Printable planner or app?');
});

test('cancelling native sharing does not show an error', async () => {
    const ui = setup({ share: async () => { throw { name: 'AbortError' }; } });
    await ui.native.handlers.click();
    assert.equal(ui.status.textContent, '');
    assert.equal(ui.fallback.hidden, true);
});

test('native sharing failure offers the selectable link', async () => {
    const ui = setup({ share: async () => { throw new Error('Unavailable'); } });
    await ui.native.handlers.click();
    assert.equal(ui.fallback.hidden, false);
    assert.equal(ui.input.value, canonical);
});

test('does nothing on pages without sharing controls', () => {
    assert.doesNotThrow(() => runInNewContext(source, { document: { querySelector: () => null } }));
});
