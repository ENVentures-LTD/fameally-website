# Fameally website

Static HTML, CSS and JavaScript for fameally.com. No application framework or runtime service is required.

## Local review

Build the public site and start a loopback-only preview:

```powershell
node scripts/build-site.mjs
python -m http.server 8766 --bind 127.0.0.1 --directory _site
```

Open http://127.0.0.1:8766/ in your browser. Stop the server with Ctrl+C. Rebuild after source edits to update this preview. The build updates existing approved files but refuses unexpected files or symbolic links in `_site`.

`_site` is an explicit publication boundary: published HTML, approved assets, app association files, the printable PDF, and crawl configuration. Drafts in `articles-upcoming`, scripts, documentation, and `output/review` are excluded. Do not publish the repository root as a replacement for this build without reviewing those exclusions.

## Checks

Requires Node.js 22.16+ (or 24+).

```powershell
node scripts/validate-site.mjs
node scripts/test-article-share.mjs
node --test scripts/test-indexnow.mjs
node scripts/build-site.mjs
node scripts/validate-site.mjs _site
```

Optional browser checks use Playwright, axe, and the installed Microsoft Edge browser:

```powershell
npm install --prefix output/review/tools --cache output/review/npm-cache --no-save playwright @axe-core/playwright
$env:NODE_PATH = (Resolve-Path output/review/tools/node_modules).Path
$env:SITE_URL = 'http://127.0.0.1:8766'
node scripts/test-browser.mjs
```

Set `BROWSER_CHANNEL` to another installed Playwright browser channel if needed. Browser reports and screenshots are saved in the ignored `output/review/browser` directory. The checks cover all public pages at 360, 390, 768 and 1440 pixels in light and dark modes, plus representative axe audits, keyboard navigation, the no-JavaScript menu fallback, reduced motion, 200% CSS zoom, the PDF and store links.

Rebuild responsive images and the sharing image with `python scripts/build-web-assets.py` (requires Pillow). Keep the original screenshot JPEGs as the source; generated WebP files are committed so deployment needs no image tooling. Keep pricing and app-store eligibility wording synchronised with the product when it changes.

## Release gate

**The owner must review the local preview and explicitly approve publishing.** Building, testing, opening the preview, or pushing source changes does not publish anything. The manually dispatched **Publish reviewed website** GitHub Actions workflow validates and publishes only `_site` from `main`.

After approval, commit and push the reviewed revision to `main`, then run **Publish reviewed website** from the repository's Actions page, selecting `main`. GitHub Pages must use **GitHub Actions** as its build source. The workflow retains the existing `fameally.com` domain and HTTPS. Verify `/`, `/articles/index.html`, `/open/`, the PDF, both `.well-known` association files, and the sitemap on the live host. Keep the previous release commit available for rollback. Association files must retain the host's appropriate JSON content type.

## Search Console follow-up

### IndexNow

The publish workflow compares the built pages with the live sitemap and HTML before deployment. After GitHub Pages succeeds, it verifies the public IndexNow key and submits only added, changed or removed page URLs to `https://api.indexnow.org/indexnow`. Participating engines share these notifications. No account or GitHub secret is required; the verification file is intentionally public. Drafts and `/open/` are excluded.

Build first, then preview the changes without submitting anything:

```powershell
node scripts/indexnow.mjs dry-run
```

The initial deployment activates the verification file. If page content is unchanged, it submits no URLs; use the sitemap in Bing Webmaster Tools for existing-page discovery. HTTP 200 means URLs were received; HTTP 202 means key validation is pending. Neither guarantees indexing or ranking.

If the **Notify IndexNow after publishing** job fails, the website has already deployed. Re-run that failed job after resolving the reported issue (for example, waiting for the key to become available or a rate limit to clear). Re-running only that job preserves the original change list. Avoid rerunning the entire workflow for a notification retry, because comparing against the newly published site would find no changes.

Protocol reference: https://www.indexnow.org/documentation

### Google Search Console

Before publishing, export the last complete 28 days of Search results with the UK country filter. Save clicks, impressions, CTR, average position, queries and landing pages. Also retain an unfiltered export and record indexing and Core Web Vitals status. These account reports were not available during implementation.

After deployment, inspect the homepage, guide index and one updated guide using the live URL test. Confirm the selected canonical URLs, submit `https://fameally.com/sitemap.xml`, and confirm `/open/` remains excluded by `noindex`. Review at four and eight weeks against equivalent periods, allowing for seasonal changes and delayed reporting. Search Console does not measure app-store clicks or installs. No analytics or advertising integration has been added.

Advertising remains deferred. Revisit only after traffic is established; any later pilot should be confined to long guides and evaluated for revenue, usability, performance and consent requirements before launch.
