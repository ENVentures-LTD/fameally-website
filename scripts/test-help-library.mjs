import { test } from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { publicFiles, publicPages } from "./site-files.mjs";

const root = resolve(import.meta.dirname, "..");

test("Help pages pass the publication gate and reject incomplete releases", async (t) => {
    const fixture = mkdtempSync(join(tmpdir(), "fameally-help-gate-"));
    try {
        for (const file of [...publicPages(root), ...publicFiles]) {
            mkdirSync(dirname(join(fixture, file)), { recursive: true });
            cpSync(join(root, file), join(fixture, file));
        }
        cpSync(join(root, "assets"), join(fixture, "assets"), { recursive: true });
        const validate = () => spawnSync(process.execPath,
            [join(root, "scripts/validate-site.mjs"), fixture],
            { encoding: "utf8", timeout: 15000 });
        const originalIndex = readFileSync(join(fixture, "help/index.html"), "utf8");
        const originalTutorial = readFileSync(join(fixture, "help/getting-started.html"), "utf8");
        const baseline = validate();
        assert.equal(baseline.status, 0, baseline.stderr || baseline.error?.message);

        async function rejects(name, file, source, expected) {
            await t.test(name, () => {
                const path = join(fixture, file);
                const original = readFileSync(path, "utf8");
                try {
                    assert.notEqual(source, original, "Fixture mutation must change its target");
                    writeFileSync(path, source);
                    const result = validate();
                    assert.equal(result.status, 1, result.stderr || result.error?.message);
                    assert.match(result.stderr, expected);
                } finally { writeFileSync(path, original); }
            });
        }
        const emptyIndex = originalIndex.replace(
            /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
            (_, json) => {
                const data = JSON.parse(json);
                data["@graph"].find((node) => node["@type"] === "CollectionPage")
                    .hasPart.itemListElement = [];
                return '<script type="application/ld+json">' + JSON.stringify(data) + '</script>';
            });
        await rejects("hub cannot omit a tutorial from its structured list", "help/index.html",
            emptyIndex, /help index must list every tutorial exactly once/);
        await rejects("tutorials receive the same sharing checks as articles", "help/getting-started.html",
            originalTutorial.replace('data-article-share=""', 'data-disabled-share=""'),
            /expected exactly one reusable Share control/);
        await rejects("tutorial breadcrumbs must lead through Help", "help/getting-started.html",
            originalTutorial.replace('"item": "https://fameally.com/help/"', '"item": "https://fameally.com/articles/index.html"'),
            /tutorial breadcrumb must link to Help/);
        await rejects("primary navigation retains the Help route", "help/index.html",
            originalIndex.replace('href="/help/" aria-current="page">Help</a>', 'href="../support.html">Support</a>'),
            /primary navigation must link to Help/);
    } finally { rmSync(fixture, { recursive: true }); }
});
