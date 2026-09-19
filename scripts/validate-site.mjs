import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
const pages = [];
const failures = [];

function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith(".") || ["node_modules", "articles-upcoming", "_site", "pricing-output"].includes(entry.name)) continue;
        const path = join(dir, entry.name);
        if (entry.isDirectory()) walk(path);
        else if (entry.name.endsWith(".html")) pages.push(path);
    }
}

walk(root);
const read = (path) => readFileSync(path, "utf8");
const label = (path) => relative(root, path).replaceAll(sep, "/");
const matchAttrs = (html, tag) => [...html.matchAll(new RegExp("<" + tag + "\\b[^>]*>", "gi"))];
const attr = (tag, name) => tag.match(new RegExp("\\b" + name + '="([^"]*)"', "i"))?.[1];
const fail = (path, message) => failures.push(label(path) + ": " + message);

for (const page of pages) {
    const html = read(page);
    const ids = new Set();
    for (const match of html.matchAll(/\bid="([^"]+)"/g)) {
        const id = match[1];
        if (ids.has(id)) fail(page, "duplicate id #" + id);
        ids.add(id);
    }
    for (const tag of matchAttrs(html, "img")) {
        if (attr(tag[0], "alt") === undefined) fail(page, "image missing alt: " + tag[0]);
        if (!attr(tag[0], "width") || !attr(tag[0], "height")) fail(page, "image missing dimensions: " + tag[0]);
    }
    if (!/<title>[^<]+<\/title>/i.test(html)) fail(page, "missing title");
    if (!/<meta\s+name="description"/i.test(html)) fail(page, "missing description");
    if (!/<link\s+rel="canonical"/i.test(html) && !/<link[^>]+rel="canonical"/i.test(html)) fail(page, "missing canonical");
    for (const tag of [...matchAttrs(html, "a"), ...matchAttrs(html, "img"), ...matchAttrs(html, "script"), ...matchAttrs(html, "link")]) {
        const value = attr(tag[0], "href") ?? attr(tag[0], "src");
        if (!value || /^(https?:|mailto:|tel:|fameally:|data:)/i.test(value)) continue;
        const [pathAndQuery, fragment] = value.split("#");
        const pathname = pathAndQuery.split("?")[0];
        const target = pathname ? resolve(dirname(page), decodeURIComponent(pathname)) : page;
        const relativeTarget = relative(root, target);
        if (relativeTarget.startsWith("..") || !existsSync(target)) {
            fail(page, "broken local reference: " + value);
            continue;
        }
        if (fragment && target.endsWith(".html") && !read(target).includes('id="' + decodeURIComponent(fragment) + '"')) {
            fail(page, "broken fragment: " + value);
        }
    }
    for (const block of html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
        try { JSON.parse(block[1]); } catch (error) { fail(page, "invalid JSON-LD: " + error.message); }
    }
}

const sitemap = read(join(root, "sitemap.xml"));
for (const page of pages) {
    const url = label(page) === "index.html" ? "https://fameally.com/" : "https://fameally.com/" + label(page);
    if (label(page) === "open/index.html") continue;
    if (!sitemap.includes("<loc>" + url + "</loc>")) fail(page, "missing from sitemap");
}
if (sitemap.includes("/open")) fail(join(root, "sitemap.xml"), "/open should not be indexable");

if (failures.length) {
    console.error(failures.join("\n"));
    process.exitCode = 1;
} else {
    console.log("Validated " + pages.length + " HTML pages: links, fragments, assets, image accessibility, metadata, JSON-LD, and sitemap.");
}
