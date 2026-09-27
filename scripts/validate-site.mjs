import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { publicPages } from "./site-files.mjs";

const root = process.argv[2] ? resolve(process.argv[2]) : resolve(import.meta.dirname, "..");
const pages = publicPages(root).map((page) => join(root, page));
const failures = [];
const titles = new Map(),
    descriptions = new Map(),
    canonicals = new Map();
const read = (path) => readFileSync(path, "utf8");
const label = (path) => relative(root, path).replaceAll(sep, "/");
const matchAttrs = (html, tag) => [...html.matchAll(new RegExp("<" + tag + "\\b[^>]*>", "gi"))];
const attr = (tag, name) => tag.match(new RegExp("\\b" + name + '="([^"]*)"', "i"))?.[1];
const fail = (path, message) => failures.push(label(path) + ": " + message);
const pageUrl = (page) =>
    "https://fameally.com/" +
    (label(page) === "index.html" ? "" : label(page) === "open/index.html" ? "open" : label(page));
const metadata = (html, name) =>
    matchAttrs(html, "meta")
        .map((m) => m[0])
        .find((tag) => attr(tag, "name") === name || attr(tag, "property") === name);
function unique(page, map, value, kind) {
    if (!value) return fail(page, "missing " + kind);
    if (map.has(value)) fail(page, `duplicate ${kind} with ${map.get(value)}`);
    map.set(value, label(page));
}

for (const page of pages) {
    const html = read(page);
    unique(page, titles, html.match(/<title>([^<]+)<\/title>/i)?.[1], "title");
    unique(page, descriptions, attr(metadata(html, "description") ?? "", "content"), "description");
    const canonicalTag = matchAttrs(html, "link")
        .map((m) => m[0])
        .find((tag) => attr(tag, "rel") === "canonical");
    const canonical = attr(canonicalTag ?? "", "href");
    unique(page, canonicals, canonical, "canonical");
    if (canonical !== pageUrl(page)) fail(page, "canonical does not match its public URL");
    if ([...html.matchAll(/<h1\b/gi)].length !== 1) fail(page, "expected exactly one H1");
    if (!/<html\b[^>]*lang="en-GB"/i.test(html))
        fail(page, "expected British English language declaration");
    if (!html.includes('href="#main"') || !/<main\b[^>]*id="main"/.test(html))
        fail(page, "missing skip link or main target");
    for (const key of [
        "og:title",
        "og:description",
        "og:type",
        "og:url",
        "og:image",
        "og:image:alt",
        "twitter:card",
    ]) {
        if (!attr(metadata(html, key) ?? "", "content"))
            fail(page, "missing social metadata: " + key);
    }
    if (attr(metadata(html, "og:url") ?? "", "content") !== canonical)
        fail(page, "social URL does not match canonical");
    const noindex = /noindex/i.test(attr(metadata(html, "robots") ?? "", "content") ?? "");
    if (noindex !== (label(page) === "open/index.html")) fail(page, "unexpected indexing policy");
    const ids = new Set();
    for (const match of html.matchAll(/\bid="([^"]+)"/g)) {
        const id = match[1];
        if (ids.has(id)) fail(page, "duplicate id #" + id);
        ids.add(id);
    }
    for (const tag of matchAttrs(html, "img")) {
        if (attr(tag[0], "alt") === undefined) fail(page, "image missing alt: " + tag[0]);
        if (!attr(tag[0], "width") || !attr(tag[0], "height"))
            fail(page, "image missing dimensions: " + tag[0]);
    }
    for (const tag of [...matchAttrs(html, "img"), ...matchAttrs(html, "source")]) {
        for (const candidate of (attr(tag[0], "srcset") ?? "").split(",").filter(Boolean)) {
            const src = candidate.trim().split(/\s+/)[0];
            if (!existsSync(resolve(dirname(page), src)))
                fail(page, "missing responsive image: " + src);
        }
    }
    if (!/<title>[^<]+<\/title>/i.test(html)) fail(page, "missing title");
    if (!/<meta\s+name="description"/i.test(html)) fail(page, "missing description");
    if (!/<link\s+rel="canonical"/i.test(html) && !/<link[^>]+rel="canonical"/i.test(html))
        fail(page, "missing canonical");
    for (const tag of [
        ...matchAttrs(html, "a"),
        ...matchAttrs(html, "img"),
        ...matchAttrs(html, "script"),
        ...matchAttrs(html, "link"),
    ]) {
        const value = attr(tag[0], "href") ?? attr(tag[0], "src");
        if (!value || /^(https?:|mailto:|tel:|fameally:|data:)/i.test(value)) continue;
        const [pathAndQuery, fragment] = value.split("#");
        const pathname = pathAndQuery.split("?")[0];
        const target = pathname
            ? pathname.startsWith("/")
                ? resolve(root, "." + decodeURIComponent(pathname))
                : resolve(dirname(page), decodeURIComponent(pathname))
            : page;
        const relativeTarget = relative(root, target);
        if (relativeTarget.startsWith("..") || !existsSync(target)) {
            fail(page, "broken local reference: " + value);
            continue;
        }
        if (
            fragment &&
            target.endsWith(".html") &&
            !read(target).includes('id="' + decodeURIComponent(fragment) + '"')
        ) {
            fail(page, "broken fragment: " + value);
        }
    }
    const nodes = [];
    for (const block of html.matchAll(
        /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    )) {
        try {
            const json = JSON.parse(block[1]);
            nodes.push(...(json["@graph"] ?? [json]));
        } catch (error) {
            fail(page, "invalid JSON-LD: " + error.message);
        }
    }
    const organization = nodes.find((node) => node["@type"] === "Organization");
    if (organization?.["@id"] !== "https://fameally.com/#organization")
        fail(page, "missing shared publisher entity");
    const isArticle = label(page).startsWith("articles/") && label(page) !== "articles/index.html";
    if (isArticle) {
        const article = nodes.find((node) => ["BlogPosting", "Article"].includes(node["@type"]));
        if (article?.mainEntityOfPage?.["@id"] !== canonical)
            fail(page, "article entity URL mismatch");
        if (article?.publisher?.["@id"] !== organization?.["@id"])
            fail(page, "article publisher mismatch");
        for (const key of ["datePublished", "dateModified"]) {
            if (
                !/^\d{4}-\d{2}-\d{2}$/.test(article?.[key]) ||
                !html.includes(`datetime="${article[key]}"`)
            )
                fail(page, "missing or non-visible article date: " + key);
        }
        const breadcrumbs = nodes.find((node) => node["@type"] === "BreadcrumbList");
        if (breadcrumbs?.itemListElement?.at(-1)?.item !== canonical)
            fail(page, "missing or mismatched breadcrumbs");
    }
    if (
        label(page) === "index.html" &&
        !nodes.some((node) => node["@type"] === "SoftwareApplication")
    )
        fail(page, "missing app entity");
    if (
        label(page) === "articles/index.html" &&
        !nodes.some((node) => node["@type"] === "CollectionPage")
    )
        fail(page, "missing guide collection entity");
}

const sitemap = read(join(root, "sitemap.xml"));
for (const page of pages) {
    const url =
        label(page) === "index.html"
            ? "https://fameally.com/"
            : "https://fameally.com/" + label(page);
    if (label(page) === "open/index.html") continue;
    if (!sitemap.includes("<loc>" + url + "</loc>")) fail(page, "missing from sitemap");
}
if (sitemap.includes("/open")) fail(join(root, "sitemap.xml"), "/open should not be indexable");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedUrls = new Set(
    pages.filter((page) => label(page) !== "open/index.html").map(pageUrl),
);
if (new Set(sitemapUrls).size !== sitemapUrls.length)
    fail(join(root, "sitemap.xml"), "duplicate URLs");
for (const url of sitemapUrls)
    if (!expectedUrls.has(url)) fail(join(root, "sitemap.xml"), "non-public URL: " + url);
if (!read(join(root, "robots.txt")).includes("Sitemap: https://fameally.com/sitemap.xml"))
    fail(join(root, "robots.txt"), "missing sitemap reference");

if (failures.length) {
    console.error(failures.join("\n"));
    process.exitCode = 1;
} else {
    console.log(
        "Validated " +
            pages.length +
            " HTML pages: links, fragments, assets, image accessibility, metadata, JSON-LD, and sitemap.",
    );
}
