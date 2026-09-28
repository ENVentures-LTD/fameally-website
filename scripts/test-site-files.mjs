import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { publicPages, publicUrl } from "./site-files.mjs";

test("new collection canonicals preserve existing article and app-opening URLs", () => {
    for (const [file, url] of [
        ["index.html", "/"],
        ["articles/index.html", "/articles/index.html"],
        ["articles/existing-guide.html", "/articles/existing-guide.html"],
        ["open/index.html", "/open"],
        ["updates/index.html", "/updates/"],
        ["updates/introducing-fameally.html", "/updates/introducing-fameally.html"],
        ["resources/index.html", "/resources/"],
        ["resources/future-resource.html", "/resources/future-resource.html"],
    ]) assert.equal(publicUrl(file), "https://fameally.com" + url);
});

test("published discovery includes new sections but excludes drafts and tooling", () => {
    const fixture = mkdtempSync(join(tmpdir(), "fameally-public-pages-"));
    try {
        for (const dir of ["articles", "updates", "resources", "updates-upcoming", "articles-upcoming", "output/review"])
            mkdirSync(join(fixture, dir), { recursive: true });
        for (const file of ["articles/index.html", "updates/index.html", "updates/release.html", "resources/index.html", "updates/notes.md", "updates-upcoming/draft.html", "articles-upcoming/draft.html", "output/review/preview.html"])
            writeFileSync(join(fixture, file), "fixture");
        const pages = publicPages(fixture);
        for (const file of ["updates/index.html", "updates/release.html", "resources/index.html"])
            assert.ok(pages.includes(file), file);
        assert.ok(!pages.some((file) => /upcoming|output|notes/.test(file)));
        assert.equal(new Set(pages).size, pages.length);
    } finally {
        rmSync(fixture, { recursive: true });
    }
});
