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
node --test scripts/test-site-files.mjs scripts/test-indexnow.mjs
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
node scripts/test-article-share-browser.mjs
```

Set `BROWSER_CHANNEL` to another installed Playwright browser channel if needed. Browser reports and screenshots are saved in the ignored `output/review/browser` directory. The checks cover all public pages at 360, 390, 768 and 1440 pixels in light and dark modes, plus representative axe audits, keyboard navigation, the no-JavaScript menu fallback, reduced motion, 200% CSS zoom, the PDF and store links.

Rebuild responsive images and the sharing image with `python scripts/build-web-assets.py` (requires Pillow). Keep the original screenshot JPEGs as the source; generated WebP files are committed so deployment needs no image tooling. Keep pricing and app-store eligibility wording synchronised with the product when it changes.

App previews use light-mode `screenshot-<scene>.jpg` sources and matching
`screenshot-<scene>-dark.jpg` sources. Both are real captures from Fameally
1.9.77, resized proportionally to 900 × 1820. Static screenshot pictures follow the website's colour scheme automatically,
including when it changes, without JavaScript or appearance controls. Article
captions sit below their centred screenshots at every screen width. Screenshot changes also require
regenerating the main social image and the three planner promotional graphics;
the printable PDF itself does not need to change.

Run the additional screenshot appearance and layout checks against the built
preview with `node scripts/test-screenshots.mjs` using the same `NODE_PATH` and
`SITE_URL` setup as the browser checks above. Raw emulator captures, version
provenance, demo imports and the page-to-capture inventory belong under ignored
`output/review/captures`, not the public assets directory.

The Due Soon update uses real light/dark captures from the connected Android
emulator running Fameally 1.9.77. Its existing demonstration household supplies
the displayed purchase patterns; capture provenance is recorded in
`output/review/captures/due-soon-provenance.json`.

Every Guide and Product Update detail page uses `assets/article-share.js`.
Keep one Share control beside the article metadata, a polite status message,
and a canonical manual-copy input for clipboard failures and no-JavaScript
visitors. The icons reuse the app's Heroicons paths: ArrowUpOnSquare on
iOS/iPadOS and Share elsewhere. Native sharing is capability-detected;
unsupported sharing falls back to clipboard copying. The optional browser
sharing checks cover both icons and real DOM fallback behaviour.

All page metadata belongs in the document head with no duplicate tags. Social
titles, descriptions, URLs and image fields must agree with the canonical page
metadata. Keep page-specific structured data grounded in visible content.
The publication gate checks duplicate Published/Updated dates on every public
page, including newly discovered Guides, Updates and Resources. Articles must
show one original publication date and at most one latest meaningful update;
other pages may remain undated. New root pages or sections must be added to
the explicit publication boundary in `scripts/site-files.mjs`, after which the
same validation applies automatically.

## Release gate

### Updates, Resources and entity maintenance

Published Updates live in `updates/`, with `/updates/` as the index canonical and `.html` post URLs. Resources uses `/resources/`; existing article canonicals and the printable PDF URL remain unchanged. Keep drafts outside all published directories. Every HTML file in `articles/`, `updates/` and `resources/` is included by `scripts/site-files.mjs`. Documentation, including `CONTENT-PLAN.md`, remains excluded.

For each update: write the page using the existing editorial layout; add it to the index and its JSON-LD ItemList in descending **publication** date order; add its canonical URL to the sitemap; then run all checks. Include a summary, visible byline, publication date, matching BlogPosting/BreadcrumbList data and relevant contextual links. On first publication, dateModified equals datePublished; show a separate updated date only for a meaningful later edit. Never change an old publication date to promote a post. The introductory post is prepared for 28 September 2026: if publication happens later, update its visible/index/schema dates and new-page sitemap dates together before release.

The shared publisher/creator is `https://enventures.co.uk/#organization`; the application is `https://fameally.com/#app`. Keep these entities consistent with ENVentures' product page. Social links and app `sameAs` entries remain deferred until official URLs are supplied; see `CONTENT-PLAN.md`.

The company site changes should be reviewed and released first, followed by Fameally. Review both sites' cross-links after both releases. Do not push ENVentures' publishing branch until its preview is approved. Capture current Search Console indexing and performance before release where account access is available; website implementation does not modify store or social accounts.

Run `node --test scripts/test-indexnow.mjs` as well as the checks above. IndexNow supports the new collection and detail routes; tests mock network access and never submit URLs.

**Review the local preview before pushing to `main`: a push to `main` publishes the website automatically.** Building, testing and opening the preview do not publish anything. The **Publish reviewed website** GitHub Actions workflow validates and publishes only `_site` from `main`. Pushes to other branches do not deploy. Manual dispatch remains available for a deliberate redeployment or retry from `main`.

Commit and push the reviewed revision to `main`, then monitor **Publish reviewed website** in the repository's Actions page. No separate dispatch is required. GitHub Pages must use **GitHub Actions** as its build source. The workflow retains the existing `fameally.com` domain and HTTPS. Verify `/`, `/articles/index.html`, `/updates/`, `/resources/`, `/open/`, the PDF, both `.well-known` association files, and the sitemap on the live host. Keep the previous release commit available for rollback. Association files must retain the host's appropriate JSON content type.

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

The 28 October 2026 audit used the connected `sc-domain:fameally.com` property.
For 28 September–25 October, Google recorded **4 clicks, 141 impressions and
2.84% CTR**, versus 1 click and 72 impressions in the previous 28 days.
UK traffic contributed 2 clicks and 90 impressions. These are small samples;
query rows omit some searches and page impressions use different aggregation
from property totals. Do not sum page rows into a property baseline.

Inspection of the 29 sitemap URLs found 14 submitted and indexed, 11 unknown
to Google and 4 crawled but currently not indexed. These are audit-time
snapshots, not live tests or promises about later indexing. Raw evidence is
kept locally under ignored `output/review/seo-audit/`.

#### Search Console checklist after publishing the SEO changes

Start this checklist only after the reviewed revision is deployed to
`https://fameally.com/`. A local preview cannot be inspected by Google.
The MCP can read performance and indexed URL status; the following submission
and live-testing actions must be done in Search Console itself.

- [ ] Select the **fameally.com domain property** in [Search Console](https://search.google.com/search-console).
- [ ] Open **Sitemaps** and submit `https://fameally.com/sitemap.xml` once.
      Confirm **Success**, no fetch/parse errors, and a refreshed **Last read**
      date after Google fetches it. The audit reported the previous download
      as 20 March 2026 even though the live sitemap returned HTTP 200. Review
      the submitted/discovered URL count; the current sitemap contains 29 URLs.
- [ ] Inspect the homepage, Guides index and Resources page listed below.
      Choose **Test live URL**. Confirm successful fetching, crawling and
      indexing allowed, and the expected content in **View tested page**.
      Check the declared canonical in the HTML. Request indexing once for
      each priority page after the live test succeeds.
- [ ] Inspect and live-test the existing comparison pages in priority group 2,
      then the other unknown pages in group 3. Request indexing once for each
      accessible page you want indexed, within Google's daily quota. Continue
      on another day if the quota is reached; repeat requests do not speed up
      crawling.
- [ ] Reinspect the three materially revised guides in priority group 4.
      They were crawled but not indexed, with recorded crawls from August.
      Check whether the last crawl advances beyond this release. A crawl
      request after a material revision is reasonable; the status alone is
      not a reason for repeated submissions.
- [ ] In **Indexing → Pages**, review errors affecting the intended public
      pages, especially server errors, robots blocks, accidental `noindex`,
      unexpected duplicates or a different Google-selected canonical. Use
      **Validate fix** only for an applicable issue that has actually been
      corrected. Do not try to eliminate every exclusion: `/open/` should
      retain `noindex`, and `/index.html` may correctly remain an alternate
      of `/`. The non-indexed Terms page is not a traffic-recovery priority.
- [ ] After Google recrawls, inspect the indexed results again. Confirm the
      **Google-selected canonical** matches the expected URL. The live test
      does not predict Google's eventual canonical selection or guarantee
      indexing.
- [ ] Check **Experience → Core Web Vitals** if the report is available.
      Record any mobile issues. With this traffic level there may be
      insufficient field data; that does not establish a pass or failure.
- [ ] Compare complete 28-day periods at four and eight weeks after deployment,
      both unfiltered and with the UK country filter. Save clicks,
      impressions, CTR, queries and landing pages. Track whether app searches
      reach the homepage or relevant comparisons rather than only the Guides
      index, and whether the previously unknown pages begin receiving
      impressions. Allow for seasonality and reporting delay. These are
      review checkpoints, not automatically scheduled tasks.

Priority URLs, in order:

1. **Updated entry pages:**
   - <https://fameally.com/>
   - <https://fameally.com/articles/index.html>
   - <https://fameally.com/resources/>
2. **Comparison pages reported unknown to Google:**
   - <https://fameally.com/articles/best-meal-planning-apps-for-uk-families.html>
   - <https://fameally.com/articles/best-shopping-list-apps-for-families-and-households.html>
   - <https://fameally.com/articles/mealime-vs-fameally.html>
   - <https://fameally.com/articles/anylist-alternatives-for-family-meal-planning-and-shopping-lists.html>
   - <https://fameally.com/articles/meal-planning-app-vs-notes-app.html>
3. **Other sitemap pages reported unknown to Google:**
   - <https://fameally.com/articles/cheap-family-meals-for-the-week-plan-before-you-shop.html>
   - <https://fameally.com/articles/how-to-reduce-food-waste-at-home-a-practical-uk-family-guide.html>
   - <https://fameally.com/articles/how-to-organise-your-shopping-list-by-supermarket-aisle.html>
   - <https://fameally.com/articles/should-you-use-ai-to-plan-your-family-meals.html>
   - <https://fameally.com/articles/how-to-plan-family-meals-around-what-you-already-have.html>
   - <https://fameally.com/updates/due-soon-remember-regular-shopping-items.html>
4. **Revised guides reported crawled but not indexed:**
   - <https://fameally.com/articles/family-meal-planning-for-busy-households-a-simple-repeatable-system.html>
   - <https://fameally.com/articles/how-to-make-a-weekly-meal-plan-that-survives-a-normal-uk-week.html>
   - <https://fameally.com/articles/the-easiest-way-to-stop-forgetting-regular-household-shopping-items.html>

The homepage now describes the site with `WebSite` markup and records the six
visible UK subscription offers with monthly/yearly periods. No rating or
review was supplied, so software-app rich-result eligibility remains
incomplete. Do not invent ratings to clear a Rich Results Test warning.

Google references: [submit and manage sitemaps](https://support.google.com/webmasters/answer/7451001),
[request recrawling](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl),
[understand Page indexing](https://support.google.com/webmasters/answer/7440203),
and [software-app structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app).

Search Console does not measure app-store clicks or installs. No analytics or
advertising integration has been added. Store/profile edits and independent
review outreach remain separate account and distribution work; confirmed
social URLs are still required before adding public profile links.

Advertising remains deferred. Revisit only after traffic is established; any later pilot should be confined to long guides and evaluated for revenue, usability, performance and consent requirements before launch.
