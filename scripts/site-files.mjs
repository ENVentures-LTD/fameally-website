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
        ...readdirSync(join(root, "articles"))
            .filter((name) => name.endsWith(".html"))
            .sort()
            .map((name) => "articles/" + name),
        "open/index.html",
    ];
}
export const publicFiles = [
    "styles.css",
    "site.js",
    "robots.txt",
    "sitemap.xml",
    "CNAME",
    ".nojekyll",
    ".well-known/assetlinks.json",
    ".well-known/apple-app-site-association",
    "output/pdf/fameally-weekly-dinner-planner.pdf",
];
