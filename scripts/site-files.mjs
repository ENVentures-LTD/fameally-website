import { readdirSync } from "node:fs";
import { join } from "node:path";

// A deliberate publication boundary: drafts, tooling and review screenshots are never deployed.
export const rootPages = [
    "index.html",
    "support.html",
    "legal.html",
    "privacy-policy.html",
    "terms.html",
    "account-deletion.html",
];
export function publicPages(root) {
    return [
        ...rootPages,
        ...["articles", "updates", "resources"].flatMap((section) =>
            readdirSync(join(root, section))
                .filter((name) => name.endsWith(".html"))
                .sort()
                .map((name) => section + "/" + name),
        ),
        "open/index.html",
    ];
}
// Existing article and app-opening canonicals remain unchanged.
export function publicUrl(page) {
    const path =
        page === "index.html"
            ? ""
            : page === "open/index.html"
              ? "open"
              : ["updates/index.html", "resources/index.html"].includes(page)
                ? page.slice(0, -"index.html".length)
                : page;
    return "https://fameally.com/" + path;
}
export const publicFiles = [
    "styles.css",
    "site.js",
    "robots.txt",
    "sitemap.xml",
    "305954218a0338733c38f301bb6825ed.txt",
    "CNAME",
    ".nojekyll",
    ".well-known/assetlinks.json",
    ".well-known/apple-app-site-association",
    "output/pdf/fameally-weekly-dinner-planner.pdf",
];
