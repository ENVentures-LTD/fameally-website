import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { preparePlan, submitPlan } from "./indexnow.mjs";

const origin = "https://fameally.com";
const key = "305954218a0338733c38f301bb6825ed";
const xml = (paths) => `<urlset>${paths.map((path) => `<url><loc>${origin}${path}</loc></url>`).join("")}</urlset>`;

test("compares with deployed content; includes additions and removals but skips unchanged pages", async () => {
    const root = mkdtempSync(join(tmpdir(), "fameally-indexnow-"));
    try {
        writeFileSync(join(root, "sitemap.xml"), xml(["/", "/support.html", "/legal.html"]));
        writeFileSync(join(root, "index.html"), "updated home");
        writeFileSync(join(root, "support.html"), "same support");
        writeFileSync(join(root, "legal.html"), "new legal");
        const pages = new Map([
            [`${origin}/sitemap.xml`, xml(["/", "/support.html", "/terms.html"])],
            [`${origin}/`, "old home"],
            [`${origin}/support.html`, "same support"],
        ]);
        const plan = await preparePlan(root, async (url) => {
            assert.ok(pages.has(url), `Unexpected request ${url}`);
            return new Response(pages.get(url));
        });
        assert.deepEqual(plan.urlList, [`${origin}/`, `${origin}/legal.html`, `${origin}/terms.html`]);
        await assert.rejects(preparePlan(root, async () => new Response("unavailable", { status: 503 })), /503/);
    } finally {
        rmSync(root, { recursive: true });
    }
});

test("rejects off-site, draft and noindex URLs before network access", async () => {
    for (const url of ["https://example.com/", `${origin}/open/`, `${origin}/articles-upcoming/draft.html`, `${origin}/?x=1`]) {
        await assert.rejects(submitPlan({ urlList: [url] }, () => assert.fail("Unexpected request")), /Not a public/);
    }
});

test("does not submit until the deployed key matches", async () => {
    let calls = 0;
    await assert.rejects(submitPlan({ urlList: [`${origin}/`] }, async () => {
        calls++;
        return new Response("wrong key");
    }), /key is not live/);
    assert.equal(calls, 1);
});

test("submits the protocol payload and distinguishes pending verification", async () => {
    for (const status of [200, 202, 403, 429, 500]) {
        let calls = 0;
        const result = submitPlan({ urlList: [`${origin}/`, `${origin}/`] }, async (url, options) => {
            calls++;
            if (calls === 1) {
                assert.equal(url, `${origin}/${key}.txt`);
                return new Response(key + "\n");
            }
            assert.equal(url, "https://api.indexnow.org/indexnow");
            assert.equal(options.method, "POST");
            assert.deepEqual(JSON.parse(options.body), {
                host: "fameally.com", key, keyLocation: `${origin}/${key}.txt`, urlList: [`${origin}/`],
            });
            return new Response("", { status });
        });
        if (status === 200 || status === 202) {
            const message = await result;
            assert.match(message, /received 1 URLs/);
            assert.equal(message.includes("validation pending"), status === 202);
        } else await assert.rejects(result, new RegExp(`HTTP ${status}`));
        assert.equal(calls, 2);
    }
});

test("an unchanged release verifies the key without posting URLs", async () => {
    let calls = 0;
    assert.match(await submitPlan({ urlList: [] }, async () => {
        calls++;
        return new Response(key);
    }), /No changed pages/);
    assert.equal(calls, 1);
});
