import { cpSync, existsSync, lstatSync, mkdirSync, readdirSync } from "node:fs";
import { resolve, dirname, join, relative, sep } from "node:path";
import { publicPages, publicFiles } from "./site-files.mjs";

const root = resolve(import.meta.dirname, "..");
const destination = resolve(root, "_site");
const files = [...publicPages(root), ...publicFiles];
function collectAssets(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) collectAssets(path);
        else if (/\.(png|jpe?g|webp|svg|woff2?|ttf|css|js)$/i.test(entry.name))
            files.push(relative(root, path));
    }
}
collectAssets(join(root, "assets"));
// Existing approved files can be updated; unexpected files must never sneak into a release.
const allowed = new Set(files.map((file) => resolve(destination, file)));
function checkOutput(dir) {
    if (lstatSync(dir).isSymbolicLink()) throw new Error("Build output must not contain symbolic links");
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isSymbolicLink()) throw new Error("Build output must not contain symbolic links");
        if (entry.isDirectory()) checkOutput(path);
        else if (!allowed.has(path))
            throw new Error("Unexpected file in _site; move it out before rebuilding: " + path);
    }
}
if (existsSync(destination)) checkOutput(destination);
for (const file of files) {
    const target = resolve(destination, file);
    if (!target.startsWith(destination + sep)) throw new Error("Invalid public path: " + file);
    mkdirSync(dirname(target), { recursive: true });
    cpSync(join(root, file), target);
}
console.log(`Built ${files.length} public files in _site. No files published.`);
