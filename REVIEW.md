# Local review: UI and SEO refinement

Prepared 27 September 2026. Local review completed; the owner subsequently approved publication. Deployment outcome is recorded in the repository's **Publish reviewed website** workflow run.

## What to review

- Homepage: quieter plum and warm neutral styling, real app screenshots, save/plan/shop explanation, household sharing, unchanged plan prices and eligibility, useful guide links.
- Navigation: consistent product, pricing, guides, support and download links; expandable mobile menu with keyboard and no-JavaScript support.
- Guides: readable text column, breadcrumbs, contents links, original publication dates, visible update dates, fewer promotional blocks, practical examples and related reading.
- Comparison guide: publisher relationship made explicit, recommendations tied to published features, and Mealime's announced 21 October 2026 closure reflected in the comparison. Source: https://www.mealime.com/ (reviewed 27 September 2026).
- Support and legal pages: consistent presentation with existing instructions and legal wording retained.
- SEO: consistent titles and social metadata, shared publisher entity, article and breadcrumb data, canonical/sitemap agreement, responsive images, small brand assets and a 1200 × 630 sharing image. Existing public URLs retained.

## Validation

- Source and release-folder validation: 18 pages; local links and fragments, image metadata and source sets, unique metadata, one H1, canonical/indexing rules, article dates, structured data and sitemap.
- Sharing regression tests: 7 passed.
- Browser checks: all 18 pages at four widths in both colour schemes. Representative accessibility checks include home, guide index, printable guide, comparison guide, support, privacy and app-opening pages.
- Reviewed desktop/mobile screenshots, dark theme and social image. Keyboard menu, Escape/focus behaviour, no-JavaScript navigation, reduced motion, 200% CSS zoom and printable download checked.
- Local build excludes drafts and review artifacts, preserves app association files, and does not deploy.

### Mobile Lighthouse measurements

| Page | Performance | Accessibility | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Original homepage | 61 | 100 | 100 | 8.3 s | 0.041 |
| Updated homepage | 93 | 100 | 100 | 2.9 s | 0 |
| Updated printable guide | 92 | 100 | 100 | 2.9 s | 0 |

These are single local lab runs with simulated mobile throttling, not real-user Core Web Vitals or a ranking forecast. The host computer injects Kaspersky requests into browser traffic; these were present in both before and after runs and lower the local best-practices score to 81. That script is not part of the website source. Production HTTPS, caching and real network conditions need checking after the approved release. Reports are in ignored `output/review/lighthouse-*.json`.

Search Console trends and live Google-selected canonicals remain post-release checks; no account data was available here. Ads and new tracking are deferred. Future changes still require local review and explicit publication approval.
