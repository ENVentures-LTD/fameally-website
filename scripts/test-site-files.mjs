import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { publicPages, publicUrl } from "./site-files.mjs";
import { articleDateErrors, pageDateErrors } from "./article-dates.mjs";

const publishedDate = '<span>Published <time datetime="2026-06-22">22 June 2026</time></span>';
const latestDate = '<span>Updated <time datetime="2026-09-27">27 September 2026</time></span>';
const oldDate = '<span>Updated <time datetime="2026-07-01">1 July 2026</time></span>';
const dateMarkup = (dates) => '<div class="article-meta">' + dates + '</div>';
const datedArticle = { datePublished: '2026-06-22', dateModified: '2026-09-27' };

test('article dates retain original publication and only the latest update', () => {
    assert.deepEqual(articleDateErrors(dateMarkup(publishedDate + latestDate), datedArticle), []);
    assert.deepEqual(articleDateErrors(dateMarkup(publishedDate.replace('</span>', '</span\n>') + latestDate), datedArticle), []);
    assert.match(articleDateErrors(dateMarkup(publishedDate + oldDate + latestDate), datedArticle).join(), /only the latest/);
    assert.match(articleDateErrors(dateMarkup(publishedDate + oldDate), datedArticle).join(), /only the latest/);
    assert.match(articleDateErrors(dateMarkup(publishedDate + publishedDate + latestDate), datedArticle).join(), /exactly one/);
});

test('first publication omits redundant updated dates', () => {
    const fresh = { datePublished: '2026-06-22', dateModified: '2026-06-22' };
    assert.deepEqual(articleDateErrors(dateMarkup(publishedDate), fresh), []);
    assert.match(articleDateErrors(dateMarkup(publishedDate + latestDate), fresh).join(), /omit it on first publication/);
});

test('visible article dates cannot contradict their machine-readable values', () => {
    assert.match(articleDateErrors(dateMarkup(publishedDate + latestDate.replace('27 September', '1 September')), datedArticle).join(), /visible date text/);
    assert.match(articleDateErrors(dateMarkup(publishedDate + latestDate), { ...datedArticle, dateModified: '2026-01-01' }).join(), /predates/);
});

test('duplicate dates are rejected on any page without requiring dates on undated pages', () => {
    assert.deepEqual(pageDateErrors('<body><h1>Support</h1></body>'), []);
    assert.deepEqual(pageDateErrors('<body>' + latestDate + '</body>'), []);
    assert.match(pageDateErrors('<body>' + oldDate + latestDate + '</body>').join(), /only the latest/);
    assert.match(pageDateErrors('<body>' + publishedDate + publishedDate + '</body>').join(), /exactly one/);
    assert.match(pageDateErrors('<body>' + publishedDate + '</body>', { datePublished: '2026-07-01' }).join(), /datePublished/);
});

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
        for (const file of ["articles/index.html", "articles/future-guide.html", "updates/index.html", "updates/release.html", "resources/index.html", "resources/future-resource.html", "updates/notes.md", "updates-upcoming/draft.html", "articles-upcoming/draft.html", "output/review/preview.html"])
            writeFileSync(join(fixture, file), "fixture");
        const pages = publicPages(fixture);
        for (const file of ["articles/future-guide.html", "updates/index.html", "updates/release.html", "resources/index.html", "resources/future-resource.html"])
            assert.ok(pages.includes(file), file);
        assert.ok(!pages.some((file) => /upcoming|output|notes/.test(file)));
        assert.equal(new Set(pages).size, pages.length);
        // New public pages automatically enter the same validation path.
        for (const file of ["articles/future-guide.html", "updates/release.html", "resources/future-resource.html"])
            assert.match(pageDateErrors(dateMarkup(publishedDate + oldDate + latestDate), datedArticle).join(), /only the latest/, file);
    } finally {
        rmSync(fixture, { recursive: true });
    }
});
