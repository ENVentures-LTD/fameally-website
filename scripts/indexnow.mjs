import { readFileSync, writeFileSync, realpathSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const origin = "https://fameally.com";
const key = "305954218a0338733c38f301bb6825ed";
const keyLocation = `${origin}/${key}.txt`;
const root = resolve(import.meta.dirname, "..");

function validateUrl(value) {
    const url = new URL(value);
    if (url.origin !== origin || url.username || url.password || url.search || url.hash ||
        !(url.pathname === "/" || /^\/(?:articles\/)?[a-z0-9-]+\.html$/.test(url.pathname)))
        throw new Error(`Not a public Fameally page URL: ${value}`);
    return value;
}

function sitemapUrls(xml) {
    if (!xml.includes("<urlset")) throw new Error("Expected a URL sitemap");
    return [...new Set([...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)]
        .map((match) => validateUrl(match[1])))];
}

async function get(url, fetcher) {
    return fetcher(url, { redirect: "error", cache: "no-store", signal: AbortSignal.timeout(30000) });
}

// Compare with the actual published site before deployment, not the previous Git commit.
export async function preparePlan(siteRoot, fetcher = fetch) {
    const current = sitemapUrls(readFileSync(join(siteRoot, "sitemap.xml"), "utf8"));
    const response = await get(`${origin}/sitemap.xml`, fetcher);
    if (response.status !== 200 && response.status !== 404)
        throw new Error(`Cannot read published sitemap: HTTP ${response.status}`);
    const previous = response.status === 200 ? sitemapUrls(await response.text()) : [];
    const urlList = [];
    for (const url of current) {
        const path = new URL(url).pathname;
        const local = readFileSync(join(siteRoot, path === "/" ? "index.html" : path.slice(1)), "utf8");
        if (!previous.includes(url)) {
            urlList.push(url);
            continue;
        }
        const live = await get(url, fetcher);
        if (live.status === 404 || live.status === 410) urlList.push(url);
        else if (live.status !== 200) throw new Error(`Cannot compare ${url}: HTTP ${live.status}`);
        else if (await live.text() !== local) urlList.push(url);
    }
    // Notify removals too, even though they are no longer in the new sitemap.
    urlList.push(...previous.filter((url) => !current.includes(url)));
    return { urlList };
}

export async function submitPlan(plan, fetcher = fetch) {
    if (!Array.isArray(plan.urlList)) throw new Error("Missing URL list");
    const urlList = [...new Set(plan.urlList.map(validateUrl))];
    if (urlList.length > 10000) throw new Error("IndexNow accepts at most 10,000 URLs per request");
    const verification = await get(keyLocation, fetcher);
    if (verification.status !== 200 || (await verification.text()).trim() !== key)
        throw new Error("IndexNow key is not live yet; retry after the deployment is available");
    if (!urlList.length) return "Verification key is live. No changed pages to submit.";
    const response = await fetcher("https://api.indexnow.org/indexnow", {
        method: "POST",
        redirect: "error",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ host: "fameally.com", key, keyLocation, urlList }),
        signal: AbortSignal.timeout(30000),
    });
    if (response.status !== 200 && response.status !== 202)
        throw new Error(`IndexNow HTTP ${response.status}: ${await response.text()}`);
    return `IndexNow received ${urlList.length} URLs (HTTP ${response.status}${response.status === 202 ? "; key validation pending" : ""}). Indexing is not guaranteed.`;
}

if (process.argv[1] && realpathSync(fileURLToPath(import.meta.url)) === realpathSync(process.argv[1])) {
    const [mode, planPath] = process.argv.slice(2);
    if (mode === "prepare" || mode === "dry-run") {
        if (mode === "prepare" && !planPath) throw new Error("Provide an output plan path");
        const siteRoot = join(root, "_site");
        if (readFileSync(join(siteRoot, `${key}.txt`), "utf8").trim() !== key)
            throw new Error("Built verification key is invalid");
        const plan = await preparePlan(siteRoot);
        if (mode === "prepare") writeFileSync(planPath, JSON.stringify(plan, null, 2) + "\n");
        console.log(JSON.stringify(plan, null, 2));
        console.log("Compared with the live site. No URLs submitted.");
    } else if (mode === "submit" && planPath) {
        console.log(await submitPlan(JSON.parse(readFileSync(planPath, "utf8"))));
    } else throw new Error("Usage: node scripts/indexnow.mjs dry-run | prepare <plan.json> | submit <plan.json>");
}
