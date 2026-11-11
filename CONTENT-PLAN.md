# Fameally content and linking plan

Fameally owns household meal-planning, recipe, shopping and food-organisation content. ENVentures owns its company information, product portfolio and genuine development stories. These are editorial opportunities, not measured keyword-volume claims.

This is the authoritative Fameally editorial roadmap. It combines the 20 recommended article topics, five topics from the older active queue and 18 app tutorials: **43 topics in total**. The revision agreed on **9 November 2026** preserves nine published records and schedules the remaining **34 entries** through **1 February 2027**. Use the [publication calendar](#publication-calendar) and linked briefs whenever planning the next article or tutorial. Historical releases and archived ideas remain in the existing, Git-ignored local reference [planned-articles.txt](articles-upcoming/planned-articles.txt); the active calendar and briefs are maintained here in the repository.

## Section purposes

- `/articles/index.html`: practical evergreen advice, household routines and app comparisons. Keep the existing routes into planning, shopping and comparisons, and all existing URLs.
- `/help/`: the app-help hub titled **How to use Fameally**, organised by task; tutorials use `/help/<slug>.html`.
- `/support.html`: contact support, account assistance and escalation, with links to relevant tutorials when they are available.
- `/updates/`: meaningful first-party product news; posts at `/updates/<slug>.html`. No artificial publishing schedule.
- `/resources/`: useful downloads with no account required. Start with the existing A4 planner. Future substantial resources can use `/resources/<slug>.html`; do not publish placeholders.
- Homepage product, family, pricing and download anchors remain the product destinations.

### Site structure evaluation and help library

The existing Guides index already offers routes into planning, shopping and app comparisons. Retain that discovery structure. App tutorials serve a different reader need: completing a specific action or resolving a problem in Fameally. Give them a dedicated help library rather than expanding the general-advice feed with interface instructions.

The hub launched with T1 and shared Help navigation on **11 November 2026**. Use this structure as new categories and tutorials become available.

- Replace the primary **Support** link with **Help**, pointing to `/help/`. Keep **Contact support** prominent in the hub and footer, linking to the existing `/support.html` page.
- Group the hub by **Getting started** (T1), **Meals and plans** (T3, T4, T8, T9, T10), **Shopping** (T5, T6, T7, T11, T12), **Sharing** (T2, T13), and **Account and data** (T14–T18). Cross-link sign-in help from getting-started content. Show only groups with published tutorials.
- Order tutorials by task and learning sequence within those groups. Use ordinary HTML links and section anchors; the initial 18-guide library does not require site search or JavaScript-only discovery.
- Link to the hub from Support and the Guides index. Link relevant homepage features and general articles directly to the matching tutorial when readers need app instructions. Use descriptive anchors and add public links only when the destination is live.
- Use **Home → Help → Tutorial** breadcrumbs. Retain existing article, support and download URLs; the new library requires no migration of existing pages.
- Launch the hub with [T1](#tutorial-t1), not an empty directory. Keep unpublished titles, empty categories and drafts out of public navigation. Product announcements remain in Updates and point to maintained tutorials when those publish.

**Help release requirements:** the explicit publication boundary in `scripts/site-files.mjs` includes the `help` section, maps `help/index.html` to the `/help/` canonical, and recognises help routes in sitemap handling, validation and IndexNow eligibility. The hub uses `CollectionPage` with a matching visible `ItemList`; T1 uses `Article` with Home → Help → Tutorial breadcrumb data. Help pages are included in date, metadata, sharing and browser checks, with regression tests for incomplete help releases. Complete local review and align provisional publication dates before any separately authorised release; apply the [help-library acceptance checks](#future-help-library-acceptance-checks) to future additions too.

## Topics to build on

| Topic | Existing article to review first | Future opportunity |
| --- | --- | --- |
| Weekly food shopping | `articles/how-to-turn-a-meal-plan-into-a-food-shopping-list.html` | Organising the weekly shop |
| Shared household planning | `articles/shared-meal-planning-app-for-families.html` | Shared shopping lists for couples |
| Dinner decisions | `articles/how-to-make-a-weekly-meal-plan-that-survives-a-normal-uk-week.html`, `articles/a-7-day-family-meal-plan-template-for-a-practical-uk-week.html`, `articles/cheap-family-meals-for-the-week-plan-before-you-shop.html` | Practical decision routines and easy dinners |
| Household essentials | `articles/the-easiest-way-to-stop-forgetting-regular-household-shopping-items.html` | Family shopping-list template and weekly essentials checklist |
| Food waste and storage | Existing planning and shopping guidance | Freezer inventory, pantry checklist and planning to reduce waste |

Before commissioning a new page, identify its reader need, inspect the existing coverage and decide whether an update to an existing page would answer that need better. Do not duplicate the same intent across multiple articles or on ENVentures.

The 25 existing article topics and 18 app tutorials are agreed as separate, focused guides. Their briefs define the boundaries that distinguish them from one another and from existing articles. General articles explain household routines and choices; tutorials explain verified Fameally operations. Apply the review-first principle above to future additions to the roadmap.

## Linking and resources

Link Updates to relevant guides and product functionality, including maintained tutorials once published. Link articles to features and tutorials only where they help the reader act; avoid repetitive promotional blocks. Tutorials should link to the relevant general guide for context, related app tasks for the next step, and support where the problem needs assistance. Use descriptive natural anchors. Resources should work independently, then explain briefly how Fameally simplifies that manual workflow.

The planner remains at `output/pdf/fameally-weekly-dinner-planner.pdf`; the comparison article retains its existing URL and download. Resources is a directory with original instructions, not a replacement article. No redirects or migrations are required.

## Using the roadmap

This document defines editorial intentions, planning briefs and future site structure. Article and tutorial writing, downloadable resource creation, website implementation, scheduling automations and publication are separate work, requiring their own instruction. A target date is not an instruction to publish or proof of publication.

1. Select the earliest unpublished entry by its **revised target date** and open its linked brief. Check any work already in progress before starting another draft. Before releasing T1, complete the help-library release prerequisite above.
2. Review the reader need, existing coverage, planned companions and current product/source evidence. Recheck relevant facts when writing, even if they were verified for an earlier article.
3. When article or tutorial work is separately requested, use the brief to prepare it and update its calendar status as work progresses. Tutorial drafting must follow the [app tutorial production requirements](#app-tutorial-production-requirements).
4. After the article or tutorial actually publishes, record **Published** and its actual publication date. Retain the original target and any revised target as planning history; use the actual date in the page's publication metadata.
5. If a target is missed or priorities change, edit the remaining revised targets deliberately and check the seasonal windows. Passing a date never changes status automatically. Do not rewrite published dates to refresh or promote a page.

Status progression: **Planned → Drafting → Ready → Published**.

- **Planned:** the topic has an agreed brief and target; article work has not started.
- **Drafting:** article or tutorial work has started under a separate request.
- **Ready:** the page and any required resource have completed factual, editorial and website checks and are ready for a separate publication decision.
- **Published:** the page is live at its canonical URL and its actual publication date has been recorded.

## Publication calendar

All dates use **Europe/London** time, with the existing **19:00** reminder convention. From **11 November 2026**, publish one tutorial each **Wednesday**, alongside the existing articles on **Monday and Friday**. Once those articles finish on **11 January 2027**, use the remaining Monday/Wednesday/Friday slots for tutorials. The revised queue finishes on **Monday 1 February 2027**. Pause on **25 December 2026** and **1 January 2027**. These are target dates; no automatic publication is configured.

Publishing reminders are managed in ChatGPT, following setup confirmed by the user on **24 October 2026**. The existing cloud reminder is recorded as **19:00 Europe/London on Monday, Wednesday and Friday**, from **23 October** through **16 December 2026**. **Follow-up:** separately extend that reminder through **1 February 2027**, accounting for the two holiday pauses; this document does not change its schedule or notifications. Keep the desktop reminder, **Publish Fameally articles**, paused as it has been since **24 October** to prevent duplicates. The cloud reminder does not read this local roadmap automatically; consult the calendar and brief when acting on a reminder. Reminders do not authorise page creation or publication.

IDs 1–20 retain the original recommendation numbers; L1–L5 identify the five topics carried over from the older queue; **T1–T18** identify the new app tutorials. Published records retain their editorial targets and actual dates below. Other previously published site guides remain outside this calendar. The active calendar is ordered by revised target; original targets preserve the previous schedule, and **— (new)** marks tutorials with no earlier target. Empty actual-date cells mean publication has not been recorded.

### Published records

| ID | Target date | Article or tutorial and planning brief | Status | Actual publication date |
| --- | --- | --- | --- | --- |
| 1 | Thu 2026-10-22 (evening) | [How to Reduce Food Waste at Home: A Practical UK Family Guide](#article-1) | Published | 2026-10-22 |
| 2 | Fri 2026-10-23 | [How to Organise Your Shopping List by Supermarket Aisle](#article-2) | Published | 2026-10-24 |
| 3 | Mon 2026-10-26 | [Should You Use AI to Plan Your Family Meals?](#article-3) | Published | 2026-10-26 |
| 4 | Wed 2026-10-28 | [How to Plan Family Meals Around What You Already Have](#article-4) | Published | 2026-10-28 |
| 5 | Fri 2026-10-30 | [How to Share a Shopping List Between iPhone and Android](#article-5) | Published | 2026-11-04 |
| 7 | Mon 2026-11-02 | [How to Stop Buying Duplicate Groceries](#article-7) | Published | 2026-11-04 |
| 9 | Wed 2026-11-04 | [How to Create a Master Grocery List for Your Household](#article-9) | Published | 2026-11-04 |
| 10 | Fri 2026-11-06 | [How to Plan Meals Around Expiry Dates](#article-10) | Published | 2026-11-09 |
| 6 | Mon 2026-11-09 | [How to Make a Monthly Family Meal Plan Without Starting From Scratch](#article-6) | Published | 2026-11-09 |
| T1 | Wed 2026-11-11 | [Get started with Fameally: create your first meal plan and shopping list](#tutorial-t1) | Published | 2026-11-11 |

### Active calendar

The Christmas shopping checklist retains **20 November** and the Christmas leftovers guide retains **14 December**. The active calendar contains 16 articles and 17 tutorials, all **Planned**.

| ID | Original target date | Revised target date | Article or tutorial and planning brief | Status | Actual publication date |
| --- | --- | --- | --- | --- | --- |
| L1 | Wed 2026-11-11 | Fri 2026-11-13 | [Paprika vs Fameally: Recipe Manager or Weekly Household Planner?](#article-l1) | Planned | |
| 8 | Fri 2026-11-13 | Mon 2026-11-16 | [Meal Planning for Picky Eaters: A Flexible Family Approach](#article-8) | Planned | |
| T2 | — (new) | Wed 2026-11-18 | [Invite your household and share meals, plans and shopping lists in Fameally](#tutorial-t2) | Planned | |
| 16 | Fri 2026-11-20 | Fri 2026-11-20 | [Christmas Food Shopping Checklist for UK Families](#article-16) | Planned | |
| L2 | Mon 2026-11-16 | Mon 2026-11-23 | [Cozi vs Fameally: Family Organiser or Meal Planning App?](#article-l2) | Planned | |
| T3 | — (new) | Wed 2026-11-25 | [Import a recipe from a website into Fameally](#tutorial-t3) | Planned | |
| 11 | Wed 2026-11-18 | Fri 2026-11-27 | [Meal Planning for Couples: Share the Cooking and Shopping](#article-11) | Planned | |
| 12 | Mon 2026-11-23 | Mon 2026-11-30 | [How to Save and Organise Your Favourite Family Recipes](#article-12) | Planned | |
| T4 | — (new) | Wed 2026-12-02 | [Save and reuse a weekly meal plan in Fameally](#tutorial-t4) | Planned | |
| 13 | Wed 2026-11-25 | Fri 2026-12-04 | [How Much Does Meal Planning Actually Save?](#article-13) | Planned | |
| 14 | Fri 2026-11-27 | Mon 2026-12-07 | [How to Plan Family Meals When Everyone Has Different Preferences](#article-14) | Planned | |
| T5 | — (new) | Wed 2026-12-09 | [Set up weekly regulars and household essentials in Fameally](#tutorial-t5) | Planned | |
| 15 | Mon 2026-11-30 | Fri 2026-12-11 | [When Does Tracking Recipe Serving Sizes Matter?](#article-15) | Planned | |
| 17 | Mon 2026-12-14 | Mon 2026-12-14 | [How to Avoid Wasting Christmas Leftovers](#article-17) | Planned | |
| T6 | — (new) | Wed 2026-12-16 | [Sort your Fameally shopping list by supermarket aisle](#tutorial-t6) | Planned | |
| 18 | Wed 2026-12-02 | Fri 2026-12-18 | [The Ultimate Printable Family Shopping Checklist](#article-18) | Planned | |
| 19 | Fri 2026-12-04 | Mon 2026-12-21 | [7-Day Family Meal Plans for Different Budgets](#article-19) | Planned | |
| T7 | — (new) | Wed 2026-12-23 | [Use Due Soon shopping suggestions in Fameally](#tutorial-t7) | Planned | |
| 20 | Mon 2026-12-07 | Mon 2026-12-28 | [What Can I Cook With What I Already Have?](#article-20) | Planned | |
| T8 | — (new) | Wed 2026-12-30 | [Add and edit your own meals and ingredients in Fameally](#tutorial-t8) | Planned | |
| L3 | Wed 2026-12-09 | Mon 2027-01-04 | [Why Use a Meal Planning App Instead of Planning in Your Head?](#article-l3) | Planned | |
| T9 | — (new) | Wed 2027-01-06 | [Change your weekly Fameally plan and check the shopping list](#tutorial-t9) | Planned | |
| L4 | Fri 2026-12-11 | Fri 2027-01-08 | [Why Shared Shopping List Apps Reduce Forgotten Items](#article-l4) | Planned | |
| L5 | Wed 2026-12-16 | Mon 2027-01-11 | [How to Choose Between Recipe Apps, Meal Planning Apps, and Shopping List Apps](#article-l5) | Planned | |
| T10 | — (new) | Wed 2027-01-13 | [Find and organise saved meals with Fameally tags](#tutorial-t10) | Planned | |
| T11 | — (new) | Fri 2027-01-15 | [Complete a shop and revisit your Fameally shopping history](#tutorial-t11) | Planned | |
| T12 | — (new) | Mon 2027-01-18 | [Switch between combined and separate shopping lists in Fameally](#tutorial-t12) | Planned | |
| T13 | — (new) | Wed 2027-01-20 | [Share a saved meal or meal plan from Fameally](#tutorial-t13) | Planned | |
| T14 | — (new) | Fri 2027-01-22 | [Recover deleted meals, plans and shopping items in Fameally](#tutorial-t14) | Planned | |
| T15 | — (new) | Mon 2027-01-25 | [Create and restore a password-protected Fameally backup](#tutorial-t15) | Planned | |
| T16 | — (new) | Wed 2027-01-27 | [Sign in to Fameally, verify your email and reset your password](#tutorial-t16) | Planned | |
| T17 | — (new) | Fri 2027-01-29 | [Manage your Fameally subscription and purchased access](#tutorial-t17) | Planned | |
| T18 | — (new) | Mon 2027-02-01 | [Understand your Fameally household statistics](#tutorial-t18) | Planned | |

## Brief conventions and editorial checks

Write for UK families and households in warm, practical British English. Use contractions, direct language and realistic household moments. General articles should work without an app; app tutorials should demonstrate the verified Fameally workflow directly. Avoid perfectionism, forced jokes, guaranteed outcomes and repetitive promotional sections.

Every brief below defines an editorial intention; published article briefs also retain their publication evidence. New article and tutorial briefs are not page copy. Proposed URLs are reserved editorial intentions, shown as code rather than links to nonexistent pages. Existing-guide links are usable now. Planned-companion links open other briefs in this document; add public cross-links only after the companion pages publish. Resource briefs describe future downloads without creating them or promising an available file.

- Verify current Fameally behaviour, screen names, platform support, access tiers and sharing limits before drafting instructions. Confirm the relevant released app version; implementation code alone does not establish public availability.
- Treat pantry inventories, food expiry tracking, AI meal generation and automatic serving adjustments as unverified unless released-product evidence supports them. Due Soon is described in the existing product update as purchase-pattern suggestions for regular shopping items; do not turn that into a claim about food expiry or exact stock levels.
- Food safety requires current authoritative UK guidance from the Food Standards Agency or Food Standards Scotland. Use NHS guidance where a topic touches children's eating or dietary health. Verify storage, freezing, reheating, allergies and date-label advice at writing time; do not improvise medical or food-safety rules.
- For waste and savings evidence, check original WRAP research or other relevant primary UK sources. State the population, measurement period and limitations. General food-waste estimates do not establish savings caused by meal planning or by Fameally.
- For AI or competitor comparisons, check current official product information and identify what was actually tested. Record source links and the date checked in the eventual article. Do not infer a feature is absent merely because a landing page does not mention it.
- For priced examples, state retailer, date, household size, meals covered, pack sizes, cupboard assumptions and substitutions. Distinguish ingredient-use cost from the amount paid at checkout.
- Future article production follows the existing README editorial layout, metadata, sharing, publication-date and validation requirements. These documents alone do not add pages to the public site.

SEO opportunities are editorial hypotheses, not measured search demand or promises of traffic. Prioritise original app demonstrations and complete answers to reader tasks, following [Google's guidance on useful content and firsthand expertise](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). Use [crawlable links and descriptive anchors](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) to connect related tasks and context.

### App tutorial production requirements

These requirements apply to **every T1–T18 brief**, including its prerequisites, screenshots and feature checks. Default to text with current screenshots. Video is not required for this programme.

- Test the exact steps against the **released app**. Record the tested app version, platform and verification date in the review evidence, and show the tested version and platform in the tutorial. Source code can help locate functionality but does not establish public availability. If a proposed workflow is not released, revise its brief and target deliberately before drafting; do not invent steps or silently mark it Ready.
- State the subscription requirement, sign-in requirement, household permissions and any prerequisite data or setup. Verify those requirements during production rather than copying old prices or entitlements; link to current pricing where appropriate.
- Show a visible result, numbered steps, common problems and a useful next step. Use exact released screen and control names. Separate iOS, iPadOS and Android instructions only where behaviour differs, and do not claim a platform was tested when it was not.
- Capture current screenshots from demonstration accounts, with meaningful alternative text and accessible captions. Show the important action and resulting state. Do not expose real household information or credentials; demonstrate recovery and restoration only with disposable demonstration data.
- Include one original publication date and, after a meaningful revision, at most one latest update date. Follow the existing metadata, byline, sharing and validation conventions. Recheck affected tutorials after app changes and use the next review to correct outdated screens or steps.
- Explain the supported limitations and a route to support when the task cannot be completed. Do not infer pantry stock, food expiry, dietary suitability, automatic quantity scaling or guaranteed synchronisation from unrelated features.

### Boundaries between related guides

| IDs | Distinct reader jobs |
| --- | --- |
| 1 / 4 / 10 / 20 | Establish a whole-household waste-reduction routine / build a plan from existing food / prioritise food by date / find concrete meals from ingredients. |
| 5 / 7 / L4 | Set up collaboration across devices / prevent duplicate purchases / establish capture and handover habits that prevent omissions. |
| 9 / 18 | Build and maintain a personalised master list / download and customise a ready-made printable checklist. The existing household checklist remains the guide to remembering regular essentials. |
| 8 / 14 | Accommodate picky eating with flexible familiar meals / coordinate broader dietary requirements, preferences and attendance. |
| 6 | Assemble a month from reusable weekly patterns; do not imply Fameally has a dedicated monthly planning interface. |
| 13 / 19 | Explain and measure potential savings / provide fully specified example meal plans and shopping baskets. |
| L3 / L5 | Reduce reliance on memory / choose between categories of recipe, planning and shopping tools. |
| 5 / T2 | Explain the broader iPhone/Android sharing decision / show Fameally owner and invitee steps, requirements and problems. |
| 2 / T6 | Organise the route through a supermarket / configure and use the actual Fameally aisle controls. |
| Due Soon update / T7 | Preserve the product announcement as history / maintain the current operating instructions and troubleshooting reference. Due Soon is never expiry tracking or a measurement of cupboard stock. |
| 12 / T3 / T10 | Establish a general recipe-organisation routine / import and review a recipe in Fameally / use Fameally's supported tags and filtering. |
| T1 / T8 / T9 | Complete the first end-to-end meal-to-list workflow / maintain the underlying meal and ingredient records / change an existing scheduled week and check list effects. |
| T2 / T13 | Collaborate in a shared household workspace / send and receive supported meal or plan content, with any copy/import semantics verified. |

## Article planning briefs

<a id="article-1"></a>

### 1. How to Reduce Food Waste at Home: A Practical UK Family Guide

- **Proposed URL:** `https://fameally.com/articles/how-to-reduce-food-waste-at-home-a-practical-uk-family-guide.html`
- **Reader need:** Reduce the food thrown away during an ordinary family week and make better use of the grocery budget.
- **Distinct angle:** A household-wide routine connecting buying, storage, portions and leftovers. Leave the detailed stock-first planning method to 4 and date-led decisions to 10.
- **Section outline:** Identify recurring waste; establish a visible use-up area; plan realistic meals and portions; check supplies before shopping; review what was still wasted.
- **Practical example:** Follow a household's unused spinach, half a loaf and leftover cooked meal through a weekly review, with safe reuse options verified during writing.
- **Research and feature checks:** Verify any UK waste figures against original WRAP research and all storage/date advice against current FSA guidance. Present waste reduction as a possible benefit of a routine, not a measured Fameally result or automatic pantry feature.
- **Existing links:** [Plan a cheaper family week](articles/cheap-family-meals-for-the-week-plan-before-you-shop.html); [Turn a meal plan into a shopping list](articles/how-to-turn-a-meal-plan-into-a-food-shopping-list.html).
- **Published companions:** [4: plan from existing food](articles/how-to-plan-family-meals-around-what-you-already-have.html); [10: plan around expiry dates](articles/how-to-plan-meals-around-expiry-dates.html).
- **Planned companion:** [20: ingredient-led meal ideas](#article-20).
- **Publication record:** [Live article](https://fameally.com/articles/how-to-reduce-food-waste-at-home-a-practical-uk-family-guide.html), published **22 October 2026** in [release commit 69abebb](https://github.com/ENVentures-LTD/fameally-website/commit/69abebb26620f7a6bd03c85d635e4aebe342baf3). [Deployment and IndexNow notification](https://github.com/ENVentures-LTD/fameally-website/actions/runs/39850612722) succeeded; live content, dates, Guides listing and sitemap were verified before recording the actual date above.
- **Archived review copy (prepared 22 October 2026):** [Excluded draft HTML](articles-upcoming/how-to-reduce-food-waste-at-home-a-practical-uk-family-guide.html); [review notes and checks](output/review/food-waste-20261022/REVIEW.md). These local, Git-ignored files preserve the prepublication review package; the live article is linked in the publication record.

<a id="article-2"></a>

### 2. How to Organise Your Shopping List by Supermarket Aisle

- **Proposed URL:** `https://fameally.com/articles/how-to-organise-your-shopping-list-by-supermarket-aisle.html`
- **Reader need:** Make a completed list easier to follow without repeatedly crossing the supermarket.
- **Distinct angle:** Organise the in-store route after deciding what to buy. The existing meal-plan-to-list guide covers generating the list; this guide concentrates on using it in the shop.
- **Section outline:** Group items by supermarket section; arrange groups around a familiar route; place ambiguous items consistently; adapt the arrangement for another store; review missed sections after the shop.
- **Practical example:** Reorder a mixed list of apples, milk, rice, shampoo and frozen peas into a household's own supermarket sections, without claiming a universal aisle map.
- **Research and feature checks:** Verify current store-aisle configuration, item ordering and access tier in Fameally before giving app steps. Do not promise automatic knowledge of a supermarket's physical layout or quantified time savings.
- **Existing links:** [Build a shopping list from meals](articles/how-to-turn-a-meal-plan-into-a-food-shopping-list.html); [Compare household shopping-list apps](articles/best-shopping-list-apps-for-families-and-households.html).
- **Published companion:** [9: create a master grocery list](articles/how-to-create-a-master-grocery-list-for-your-household.html).
- **Planned companion:** [18: printable shopping checklist](#article-18).
- **Publication record:** [Live article](https://fameally.com/articles/how-to-organise-your-shopping-list-by-supermarket-aisle.html), published **24 October 2026** in [release commit bd20d08](https://github.com/ENVentures-LTD/fameally-website/commit/bd20d08c1a47d8eb0cad7ca1d767c8ff762c2bcc). [Deployment and IndexNow notification](https://github.com/ENVentures-LTD/fameally-website/actions/runs/40127432270) succeeded. The visible publication date, social metadata, structured data, Guides listing and sitemap were aligned to 24 October and verified live; the original 23 October target remains unchanged.
- **Archived review package (prepared 22 October 2026):** [Local draft HTML](articles-upcoming/how-to-organise-your-shopping-list-by-supermarket-aisle.html); [review notes and checks](output/review/aisle-shopping-20261023/REVIEW.md). These Git-ignored local files retain the review history and approved release package; the live article is linked in the publication record.
- **Evidence checked:** Fameally's current published pricing confirms aisle sorting in Individual and Family; the article uses a general workflow without unverified configuration steps or store-map claims. Current FSA shopping guidance supports collecting chilled and frozen food last. Source links and the 22 October check date are recorded in the review copy.

<a id="article-3"></a>

### 3. Should You Use AI to Plan Your Family Meals?

- **Proposed URL:** `https://fameally.com/articles/should-you-use-ai-to-plan-your-family-meals.html`
- **Reader need:** Decide where AI suggestions could help and what still needs household judgement.
- **Distinct angle:** Compare generating ideas with reusing meals the household already knows. Assess both approaches fairly; avoid presenting AI as inherently unsuitable or implying Fameally generates meals with AI.
- **Section outline:** Define the task AI is being asked to do; try a realistic household brief; review ingredients, quantities and suitability; compare with a reusable plan; decide where human checks remain necessary.
- **Practical example:** Compare a suggestion-based week with a saved family week using the same busy evenings, food already available and meal preferences. Label any future trial with its tool, date and method.
- **Research and feature checks:** Verify current capabilities and limitations from official documentation for any named AI tool. Check safety and dietary advice against UK authorities; do not rely on generated claims, prices or allergy assurances. Verify Fameally's actual planning workflow independently.
- **Existing links:** [Compare planning apps with notes](articles/meal-planning-app-vs-notes-app.html); [Build a repeatable family routine](articles/family-meal-planning-for-busy-households-a-simple-repeatable-system.html).
- **Published companion:** [6: reuse weekly patterns across a month](articles/how-to-make-a-monthly-family-meal-plan-without-starting-from-scratch.html).
- **Planned companions:** [14: accommodate different preferences](#article-14); [L5: choose a category of tool](#article-l5).
- **Publication record:** [Live article](https://fameally.com/articles/should-you-use-ai-to-plan-your-family-meals.html), published **26 October 2026** in [release commit c9abd7e](https://github.com/ENVentures-LTD/fameally-website/commit/c9abd7e11fd841d2af9b18e978b3c1b2f9f3dda6). [Deployment and IndexNow notification](https://github.com/ENVentures-LTD/fameally-website/actions/runs/40401256562) succeeded. The visible publication date, social metadata, structured data, Guides listing and sitemap were verified live with the 26 October publication date.
- **Archived review package (prepared 24 October 2026):** [Local draft HTML](articles-upcoming/should-you-use-ai-to-plan-your-family-meals.html); [review notes and checks](output/review/ai-meal-planning-20261026/REVIEW.md). These Git-ignored local files retain the review history and approved release package; the live article is linked in the publication record.
- **Evidence and scope:** Official OpenAI documentation, current FSA/NHS guidance and Fameally's published workflow and access tiers were checked on 24 October. The five-evening comparison is an explicitly labelled illustration, not a live AI product test, a costed basket or a nutritional assessment. No AI-generation feature is attributed to Fameally. Source links, limits and completed website checks are recorded in the review notes.

<a id="article-4"></a>

### 4. How to Plan Family Meals Around What You Already Have

- **Proposed URL:** `https://fameally.com/articles/how-to-plan-family-meals-around-what-you-already-have.html`
- **Reader need:** Turn fridge, freezer and cupboard supplies into a practical plan before buying more food.
- **Distinct angle:** Teach the ingredient-first planning process. Keep long lists of recipe combinations in 20 and the broader waste-reduction routine in 1.
- **Section outline:** Check the three storage areas; identify food to prioritise; match ingredients to familiar meals; allocate meals to suitable evenings; buy the missing ingredients and reassess after changes.
- **Practical example:** Build three dinners around carrots, a freezer portion and a tin of beans, then show a short gaps-only shopping list without writing a complete recipe collection.
- **Research and feature checks:** Verify food-date and storage advice with current FSA guidance. Show inventory checks as a manual routine unless released Fameally evidence confirms otherwise; verify saved-meal and shopping-list steps before describing them.
- **Existing links:** [Keep a weekly plan adaptable](articles/how-to-make-a-weekly-meal-plan-that-survives-a-normal-uk-week.html); [Check supplies when making the list](articles/how-to-turn-a-meal-plan-into-a-food-shopping-list.html).
- **Published companions:** [1: reduce household food waste](articles/how-to-reduce-food-waste-at-home-a-practical-uk-family-guide.html); [10: prioritise dated food](articles/how-to-plan-meals-around-expiry-dates.html).
- **Planned companion:** [20: find ingredient-led meal ideas](#article-20).
- **Publication record:** [Live article](https://fameally.com/articles/how-to-plan-family-meals-around-what-you-already-have.html), published **28 October 2026** in [release commit 6316f53](https://github.com/ENVentures-LTD/fameally-website/commit/6316f53d002027d0cf96bd50f15c299706b06776). [Deployment and IndexNow notification](https://github.com/ENVentures-LTD/fameally-website/actions/runs/40764003503) succeeded. The approved article, visible publication date, social metadata, structured data, Guides listing and sitemap were verified live with the 28 October publication date.
- **Archived review package (prepared 26 October 2026):** [Excluded draft HTML](articles-upcoming/how-to-plan-family-meals-around-what-you-already-have.html); [review notes and checks](output/review/ingredients-first-20261028/REVIEW.md). These Git-ignored local files preserve the approved review copy and publication checks; the live article is linked in the publication record.
- **Evidence and scope:** Current FSA storage, date-label, defrosting and reheating guidance and Fameally's published workflow were checked on 26 October. Inventory checks remain manual. The three-dinner example allocates the existing food once and identifies four shopping gaps; it is illustrative, without tested recipes, prices or nutritional claims. Website checks and source details are recorded in the review notes.

<a id="article-5"></a>

### 5. How to Share a Shopping List Between iPhone and Android

- **Proposed URL:** `https://fameally.com/articles/how-to-share-a-shopping-list-between-iphone-and-android.html`
- **Reader need:** Set up one usable list when household members have different phones.
- **Distinct angle:** A cross-platform setup and verification walkthrough. Leave broader omission-prevention habits to L4 and stock-checking routines to 7.
- **Section outline:** Choose a cross-platform approach; check accounts and sharing access; invite the other household member; confirm both people can edit the same list; test changes and diagnose common setup problems.
- **Practical example:** One person adds milk on an iPhone while another checks the same household list on Android; plan to verify both devices and the correct shared workspace during the future walkthrough.
- **Research and feature checks:** Verify released iOS/Android versions, Family access, invitation acceptance, accounts and permissions. Test synchronisation and any connectivity advice before claiming behaviour; use official sources for alternative apps mentioned.
- **Existing links:** [Understand shared family planning](articles/shared-meal-planning-app-for-families.html); [Compare shared shopping-list apps](articles/best-shopping-list-apps-for-families-and-households.html).
- **Published companion:** [7: prevent duplicate purchases](articles/how-to-stop-buying-duplicate-groceries.html).
- **Planned companions:** [L4: prevent forgotten items](#article-l4); [11: share shopping as a couple](#article-11).
- **Publication record:** [Live article](https://fameally.com/articles/how-to-share-a-shopping-list-between-iphone-and-android.html), published **4 November 2026** in [joint release commit e0cff68](https://github.com/ENVentures-LTD/fameally-website/commit/e0cff688327c6b53426af894602edba420f7ea36). [Deployment and IndexNow notification](https://github.com/ENVentures-LTD/fameally-website/actions/runs/41906397304) succeeded. The approved copy, visible date, metadata, Guides entry, companion links and sitemap were verified live. The original 2026-10-30 target remains unchanged.
- **Archived review package (prepared 4 November 2026):** [Excluded draft HTML](articles-upcoming/how-to-share-a-shopping-list-between-iphone-and-android.html); [batch review notes and checks](output/review/catch-up-20261104/REVIEW.md). These Git-ignored local files preserve the approved three-article package; use the live article linked above.
- **Evidence and scope:** Current official store listings and Fameally support/pricing confirm cross-platform availability, Family access, invited-email sign-in, invitation acceptance and shared-workspace checks. Google Keep instructions were checked for both platforms. The milk example is a reader-run setup check; no physical paired-device test, update-speed result or offline guarantee is claimed.

<a id="article-7"></a>

### 7. How to Stop Buying Duplicate Groceries

- **Proposed URL:** `https://fameally.com/articles/how-to-stop-buying-duplicate-groceries.html`
- **Reader need:** Avoid buying more of something that is already at home or already being bought by someone else.
- **Distinct angle:** Coordinate stock checks and purchasing decisions. Distinguish duplicate purchases from combining repeated recipe ingredients and from forgetting to add an item at all.
- **Section outline:** Identify why duplicates happen; check supplies before adding items; keep one current shopping list; agree who shops and how purchases are marked; review repeat problem items.
- **Practical example:** One person puts rice on the list while another finds an unopened bag, then show the agreed update before either person shops.
- **Research and feature checks:** Verify current shared-list editing and completion behaviour. Do not claim Fameally detects cupboard stock, recognises all duplicate items or prevents simultaneous purchases automatically; treat purchase-pattern suggestions as prompts to check.
- **Existing links:** [Combine meal ingredients carefully](articles/how-to-turn-a-meal-plan-into-a-food-shopping-list.html); [Check regular household supplies](articles/the-easiest-way-to-stop-forgetting-regular-household-shopping-items.html).
- **Published companions:** [5: cross-platform list setup](articles/how-to-share-a-shopping-list-between-iphone-and-android.html); [9: personalised master list](articles/how-to-create-a-master-grocery-list-for-your-household.html).
- **Planned companion:** [L4: prevent omissions](#article-l4).
- **Publication record:** [Live article](https://fameally.com/articles/how-to-stop-buying-duplicate-groceries.html), published **4 November 2026** in [joint release commit e0cff68](https://github.com/ENVentures-LTD/fameally-website/commit/e0cff688327c6b53426af894602edba420f7ea36). [Deployment and IndexNow notification](https://github.com/ENVentures-LTD/fameally-website/actions/runs/41906397304) succeeded. The approved copy, visible date, metadata, Guides entry, companion links and sitemap were verified live. The original 2026-11-02 target remains unchanged.
- **Archived review package (prepared 4 November 2026):** [Excluded draft HTML](articles-upcoming/how-to-stop-buying-duplicate-groceries.html); [batch review notes and checks](output/review/catch-up-20261104/REVIEW.md). These Git-ignored local files preserve the approved three-article package; use the live article linked above.
- **Evidence and scope:** The rice example compares 600 g required with 900 g available, leaving 300 g and no rice purchase. Stock checks and buying responsibilities remain manual. Current sharing and Due Soon guidance was checked; no automatic stock detection, simultaneous-purchase prevention or measured saving is claimed.

<a id="article-9"></a>

### 9. How to Create a Master Grocery List for Your Household

- **Proposed URL:** `https://fameally.com/articles/how-to-create-a-master-grocery-list-for-your-household.html`
- **Reader need:** Build a reusable baseline of groceries and household essentials that reflects the household's actual habits.
- **Distinct angle:** Explain how to create and maintain the personalised master list, separate from this week's purchase list. The existing household checklist addresses things people forget; 18 supplies a ready-made printable.
- **Section outline:** Review regular purchases; group essentials by household use; distinguish baseline items from occasional purchases; select only current needs for the weekly shop; review the master list as routines change.
- **Practical example:** A household builds breakfast, packed-lunch, cleaning and toiletries groups, then chooses only the items that are running low for this week's shop.
- **Research and feature checks:** Verify how Fameally currently represents regular items, categories and reusable lists. Describe a manual master-list method if no direct workflow exists; do not imply permanent stock counts or automatic restocking.
- **Existing links:** [Remember regular household essentials](articles/the-easiest-way-to-stop-forgetting-regular-household-shopping-items.html); [Connect the baseline with meal ingredients](articles/how-to-turn-a-meal-plan-into-a-food-shopping-list.html).
- **Published companions:** [2: organise the current list by aisle](articles/how-to-organise-your-shopping-list-by-supermarket-aisle.html); [7: avoid duplicate buying](articles/how-to-stop-buying-duplicate-groceries.html).
- **Planned companion:** [18: printable checklist](#article-18).
- **Publication record:** [Live article](https://fameally.com/articles/how-to-create-a-master-grocery-list-for-your-household.html), published **4 November 2026** in [joint release commit e0cff68](https://github.com/ENVentures-LTD/fameally-website/commit/e0cff688327c6b53426af894602edba420f7ea36). [Deployment and IndexNow notification](https://github.com/ENVentures-LTD/fameally-website/actions/runs/41906397304) succeeded. The approved copy, visible date, metadata, Guides entry, companion links and sitemap were verified live. The original 2026-11-04 target remains unchanged.
- **Archived review package (prepared 4 November 2026):** [Excluded draft HTML](articles-upcoming/how-to-create-a-master-grocery-list-for-your-household.html); [batch review notes and checks](output/review/catch-up-20261104/REVIEW.md). These Git-ignored local files preserve the approved three-article package; use the live article linked above.
- **Evidence and scope:** Four example groups hold eight regular items, of which three are selected for the current shop. The master remains a manual reference, with verified regular-item features described separately. No dedicated master-list screen, automatic stock counts or downloadable checklist is promised.

<a id="article-10"></a>

### 10. How to Plan Meals Around Expiry Dates

- **Proposed URL:** `https://fameally.com/articles/how-to-plan-meals-around-expiry-dates.html`
- **Reader need:** Decide which food to use first while following food-safety guidance.
- **Distinct angle:** Date-led prioritisation within an existing meal plan. Explain the relevant labels rather than treating every date as the same kind of expiry.
- **Section outline:** Understand use-by and best-before labels; check storage and opening instructions; put priority ingredients into suitable meals; consider safe cooking or freezing options; revise the order when plans change.
- **Practical example:** Plan the order of a dated chilled ingredient, frozen vegetables and cupboard staples, using current official guidance to determine what can safely be moved or stored.
- **Research and feature checks:** Verify every label, storage, freezing and reheating statement with current FSA or Food Standards Scotland guidance. Do not recommend smell tests for use-by decisions. Make date checks manual unless released-product evidence confirms tracking; Due Soon is not evidence of expiry tracking.
- **Existing links:** [Adjust meals when the week changes](articles/how-to-make-a-weekly-meal-plan-that-survives-a-normal-uk-week.html); [Check food before building the shop](articles/how-to-turn-a-meal-plan-into-a-food-shopping-list.html).
- **Published companions:** [4: plan from existing ingredients](articles/how-to-plan-family-meals-around-what-you-already-have.html); [1: wider waste-reduction routine](articles/how-to-reduce-food-waste-at-home-a-practical-uk-family-guide.html).
- **Planned companion:** [17: handle festive leftovers](#article-17).
- **Publication record:** [Live article](https://fameally.com/articles/how-to-plan-meals-around-expiry-dates.html), published **9 November 2026** in [joint release commit 3f748b1](https://github.com/ENVentures-LTD/fameally-website/commit/3f748b1a9691e18d69bd76ba2859bf0db9b3cc4f). [Deployment and IndexNow notification](https://github.com/ENVentures-LTD/fameally-website/actions/runs/42694308147) succeeded. The approved copy, visible publication date, metadata, Guides listing, incoming and companion links and sitemap were verified live. The original 2026-11-06 target remains unchanged.
- **Archived review package (prepared 9 November 2026):** [Excluded draft HTML](articles-upcoming/how-to-plan-meals-around-expiry-dates.html); [review notes and checks](output/review/november-pair-20261109/REVIEW.md). These local, Git-ignored files preserve the approved two-article review package; use the live article linked above.
- **Draft evidence:** Current FSA and GOV.UK date-label, opening, storage, freezing and leftovers guidance checked on 9 November. Food dates are checked manually; Due Soon remains purchase-pattern guidance. The draft includes a three-evening example.


<a id="article-6"></a>

### 6. How to Make a Monthly Family Meal Plan Without Starting From Scratch

- **Proposed URL:** `https://fameally.com/articles/how-to-make-a-monthly-family-meal-plan-without-starting-from-scratch.html`
- **Reader need:** Reduce repeated dinner decisions while keeping enough flexibility for different weeks.
- **Distinct angle:** Assemble a month from reusable weekly patterns and familiar meals. Explain this as a planning method without implying a dedicated monthly Fameally interface.
- **Section outline:** Save a small set of workable weeks; rotate meals and sides; adjust each week for the calendar; check fresh ingredients before each shop; keep useful changes for the next rotation.
- **Practical example:** Combine four weekly patterns for a household with late Mondays and a flexible Friday, then change one week for a school event without rebuilding the whole month.
- **Research and feature checks:** Verify current saved-plan, reuse and editing behaviour in the released app. Distinguish a monthly overview from weekly shopping; do not claim automatic calendar rotation or a monthly screen without evidence.
- **Existing links:** [Reuse a practical seven-day template](articles/a-7-day-family-meal-plan-template-for-a-practical-uk-week.html); [Build a repeatable family system](articles/family-meal-planning-for-busy-households-a-simple-repeatable-system.html).
- **Published companion:** [3: assess AI meal suggestions](articles/should-you-use-ai-to-plan-your-family-meals.html).
- **Planned companions:** [12: organise favourite recipes](#article-12); [14: accommodate household preferences](#article-14).
- **Publication record:** [Live article](https://fameally.com/articles/how-to-make-a-monthly-family-meal-plan-without-starting-from-scratch.html), published **9 November 2026** in [joint release commit 3f748b1](https://github.com/ENVentures-LTD/fameally-website/commit/3f748b1a9691e18d69bd76ba2859bf0db9b3cc4f). [Deployment and IndexNow notification](https://github.com/ENVentures-LTD/fameally-website/actions/runs/42694308147) succeeded. The approved copy, visible publication date, metadata, Guides listing, incoming and companion links and sitemap were verified live. The original 2026-11-09 target remains unchanged.
- **Archived review package (prepared 9 November 2026):** [Excluded draft HTML](articles-upcoming/how-to-make-a-monthly-family-meal-plan-without-starting-from-scratch.html); [review notes and checks](output/review/november-pair-20261109/REVIEW.md). These local, Git-ignored files preserve the approved two-article review package; use the live article linked above.
- **Draft evidence:** Current website and App Store descriptions support reusable weekly plans; Individual and Family include saving full weeks. The draft assembles a four-week manual overview and a weekly food check without claiming a dedicated monthly interface or automatic calendar rotation.


<a id="article-l1"></a>

### L1. Paprika vs Fameally: Recipe Manager or Weekly Household Planner?

- **Proposed URL:** `https://fameally.com/articles/paprika-vs-fameally-recipe-manager-or-weekly-household-planner.html`
- **Reader need:** Decide which product better fits recipe collecting, cooking and household meal coordination.
- **Distinct angle:** Compare the complete workflow using the same household week. Avoid assuming either app lacks planning, sharing or shopping tools based on its positioning.
- **Section outline:** Define the household's main task; compare recipe capture and cooking; compare meal planning and shopping; check sharing, platforms and costs; run a practical choice test.
- **Practical example:** Evaluate saving one recipe, planning three dinners and letting another person shop, recording what each current product actually supports.
- **Research and feature checks:** Check current official Paprika versions, platform purchases, synchronisation and sharing terms alongside Fameally's released capabilities and pricing. Reverify older comparison claims; label hands-on observations and source dates.
- **Existing links:** [Review meal-planning app options](articles/best-meal-planning-apps-for-uk-families.html); [Compare AnyList alternatives](articles/anylist-alternatives-for-family-meal-planning-and-shopping-lists.html).
- **Planned companions:** [12: recipe organisation](#article-12); [L5: choose the category of tool](#article-l5); [L2: compare a family organiser](#article-l2).

<a id="article-8"></a>

### 8. Meal Planning for Picky Eaters: A Flexible Family Approach

- **Proposed URL:** `https://fameally.com/articles/meal-planning-for-picky-eaters-a-flexible-family-approach.html`
- **Reader need:** Plan shared family dinners that accommodate familiar-food preferences without routinely preparing completely separate meals.
- **Distinct angle:** Flexible components and predictable meal choices for picky eating. Keep broader dietary requirements, allergies and differing schedules in 14.
- **Section outline:** Identify familiar meals and components; plan a shared base with flexible sides; offer manageable household choices; account for portions and leftovers; review what was practical to repeat.
- **Practical example:** Plan a pasta meal with sauce, vegetables and other components served separately where appropriate, adapting the example to current age-appropriate guidance during writing.
- **Research and feature checks:** Use current NHS guidance for children's eating and FSA guidance where safety or allergens arise. Avoid promises to resolve feeding difficulties or nutritional claims without support. Verify meal notes or tags before describing them as app features.
- **Existing links:** [Make preferences part of a repeatable routine](articles/family-meal-planning-for-busy-households-a-simple-repeatable-system.html); [Use a flexible weekly template](articles/a-7-day-family-meal-plan-template-for-a-practical-uk-week.html).
- **Planned companions:** [14: broader household differences](#article-14); [15: serving-size decisions](#article-15); [12: save meals that worked](#article-12).

<a id="article-l2"></a>

### L2. Cozi vs Fameally: Family Organiser or Meal Planning App?

- **Proposed URL:** `https://fameally.com/articles/cozi-vs-fameally-family-organiser-or-meal-planning-app.html`
- **Reader need:** Choose between wider family organisation and a more food-focused routine, including where the tools overlap.
- **Distinct angle:** Start with calendars, household coordination and meal/shopping responsibilities. Keep the comparison grounded in workflows rather than implying a family organiser cannot support meals.
- **Section outline:** Identify the coordination problem; compare family-calendar and food workflows; examine sharing and platform access; verify current plans and costs; try one ordinary household week.
- **Practical example:** Compare handling a late club night, a changed dinner and a different shopper using each product's verified workflow.
- **Research and feature checks:** Check current official Cozi feature, plan and regional-availability information, then verify Fameally's released behaviour. Avoid unsupported claims about calendar integration, responsibility assignment, sharing limits or competitor omissions.
- **Existing links:** [Assess shared family meal planning](articles/shared-meal-planning-app-for-families.html); [Compare family meal-planning apps](articles/best-meal-planning-apps-for-uk-families.html).
- **Planned companions:** [L5: choose a tool category](#article-l5); [11: share cooking and shopping](#article-11); [L1: compare recipe management](#article-l1).

<a id="article-11"></a>

### 11. Meal Planning for Couples: Share the Cooking and Shopping

- **Proposed URL:** `https://fameally.com/articles/meal-planning-for-couples-share-the-cooking-and-shopping.html`
- **Reader need:** Share food decisions and practical tasks fairly between two people with different routines.
- **Distinct angle:** Agree who plans, cooks, shops and communicates changes. Cross-platform setup belongs in 5; duplicate-purchase prevention belongs in 7.
- **Section outline:** Agree a realistic week; divide decisions and tasks; make cooking information available; coordinate shopping and handovers; review the arrangement when schedules change.
- **Practical example:** One partner cooks on Tuesday while the other shops on Monday, then show how they communicate a late work finish and use the agreed backup meal.
- **Research and feature checks:** Verify shared access, plan changes and recipe information in Fameally before showing steps. Present task ownership as a household agreement unless the app has a verified assignment feature; do not assume all couples have the same division of work.
- **Existing links:** [Share a family meal plan and list](articles/shared-meal-planning-app-for-families.html); [Build a plan that can change](articles/how-to-make-a-weekly-meal-plan-that-survives-a-normal-uk-week.html).
- **Published companions:** [5: share across phones](articles/how-to-share-a-shopping-list-between-iphone-and-android.html); [7: avoid duplicate groceries](articles/how-to-stop-buying-duplicate-groceries.html).
- **Planned companion:** [14: accommodate different preferences](#article-14).

<a id="article-16"></a>

### 16. Christmas Food Shopping Checklist for UK Families

- **Proposed URL:** `https://fameally.com/articles/christmas-food-shopping-checklist-for-uk-families.html`
- **Reader need:** Organise festive meals and household essentials without overlooking guests, quantities or storage space.
- **Distinct angle:** A seasonal planning checklist and staged shop, distinct from the reusable everyday master list in 9. The target precedes December shopping; leftovers have their own guide in 17.
- **Section outline:** Confirm guests and meals; build ingredient and household-extra groups; check portions and storage capacity; separate advance purchases from fresh shopping; make a final household check.
- **Practical example:** Plan Christmas Day for six and a smaller Boxing Day meal, covering missing breakfast items, household extras and freezer space as well as the main dinner.
- **Research and feature checks:** Use current FSA or Food Standards Scotland festive guidance for storage, preparation, dates and allergens. Date-check any retailer or delivery information if included. Verify Fameally's list organisation before describing it; do not promise a downloadable checklist here.
- **Existing links:** [Remember household essentials](articles/the-easiest-way-to-stop-forgetting-regular-household-shopping-items.html); [Build a shopping list from planned meals](articles/how-to-turn-a-meal-plan-into-a-food-shopping-list.html).
- **Published companion:** [9: master household list](articles/how-to-create-a-master-grocery-list-for-your-household.html).
- **Planned companions:** [17: Christmas leftovers](#article-17); [15: serving sizes](#article-15).

<a id="article-12"></a>

### 12. How to Save and Organise Your Favourite Family Recipes

- **Proposed URL:** `https://fameally.com/articles/how-to-save-and-organise-your-favourite-family-recipes.html`
- **Reader need:** Find trusted meals quickly and stop losing useful recipes across websites, screenshots and notes.
- **Distinct angle:** Build a usable recipe collection and retrieval routine. Monthly rotation belongs in 6; app-category selection belongs in L5.
- **Section outline:** Start with meals already repeated; save sufficient ingredients and method details; review imported recipes; choose useful categories or tags; retrieve meals for planning and maintain the collection.
- **Practical example:** Organise a small collection by quick evenings, freezer-friendly choices and family favourites, verifying which labels and filters the chosen tool actually supports.
- **Research and feature checks:** Verify current recipe-URL import, preview/review, notes, search, categories and tag behaviour in Fameally before giving instructions. Do not imply every website imports successfully or that user-defined tags exist without evidence. Keep attribution and source links for imported recipes.
- **Existing links:** [Choose reusable meal features](articles/what-to-look-for-in-a-family-meal-planning-app.html); [Build a repeatable meal library and routine](articles/family-meal-planning-for-busy-households-a-simple-repeatable-system.html).
- **Published companion:** [6: reuse weekly patterns](articles/how-to-make-a-monthly-family-meal-plan-without-starting-from-scratch.html).
- **Planned companions:** [L1: Paprika comparison](#article-l1); [L5: choose between tool categories](#article-l5).

<a id="article-13"></a>

### 13. How Much Does Meal Planning Actually Save?

- **Proposed URL:** `https://fameally.com/articles/how-much-does-meal-planning-actually-save.html`
- **Reader need:** Assess plausible savings and measure whether planning changes their own household spending.
- **Distinct angle:** Explain the calculation and its limits. Article 19 provides specific example baskets; this guide distinguishes potential savings from evidence of actual savings.
- **Section outline:** Identify possible sources of savings; separate waste, unnecessary purchases and other spending; establish a comparable baseline; work through a transparent illustrative calculation; account for costs and week-to-week variation.
- **Practical example:** Compare two labelled illustrative household weeks using receipts, wasted food and top-up purchases, avoiding double-counting the same food as both waste and an avoided purchase.
- **Research and feature checks:** Verify original WRAP or official UK spending evidence, dates and populations. Do not convert national averages into a guaranteed household saving or attribute causal savings to Fameally without evidence. Include any app cost only if comparing net savings, using current verified prices.
- **Existing links:** [Plan cheaper family meals](articles/cheap-family-meals-for-the-week-plan-before-you-shop.html); [Consider value when choosing an app](articles/what-to-look-for-in-a-family-meal-planning-app.html).
- **Published companions:** [1: reduce food waste](articles/how-to-reduce-food-waste-at-home-a-practical-uk-family-guide.html); [7: avoid duplicate purchases](articles/how-to-stop-buying-duplicate-groceries.html).
- **Planned companion:** [19: budget meal-plan examples](#article-19).

<a id="article-14"></a>

### 14. How to Plan Family Meals When Everyone Has Different Preferences

- **Proposed URL:** `https://fameally.com/articles/how-to-plan-family-meals-when-everyone-has-different-preferences.html`
- **Reader need:** Coordinate dietary requirements, preferences and attendance without rebuilding every dinner separately.
- **Distinct angle:** A whole-household coordination method that distinguishes requirements from preferences and accounts for schedules. Picky eating is the narrower focus of 8.
- **Section outline:** Record requirements and preferences accurately; check who is eating and when; choose adaptable meal components; make substitutions and cooking notes clear; agree changes before the shop.
- **Practical example:** Plan a shared meal base with vegetarian and other suitable options on a night when one adult eats later, treating any allergy requirement separately and checking safety guidance.
- **Research and feature checks:** Use current NHS and FSA guidance for dietary-health or allergen statements. Do not treat preference tags as an allergy safeguard or imply automated dietary filtering. Verify current meal notes, tags and shared-plan behaviour before explaining them.
- **Existing links:** [Coordinate a shared family week](articles/shared-meal-planning-app-for-families.html); [Keep a meal plan adaptable](articles/how-to-make-a-weekly-meal-plan-that-survives-a-normal-uk-week.html).
- **Planned companions:** [8: picky-eater planning](#article-8); [11: share household responsibilities](#article-11); [15: plan quantities](#article-15).

<a id="article-15"></a>

### 15. When Does Tracking Recipe Serving Sizes Matter?

- **Proposed URL:** `https://fameally.com/articles/when-does-tracking-recipe-serving-sizes-matter.html`
- **Reader need:** Decide how much quantity detail is useful for shopping, different household sizes and planned leftovers.
- **Distinct angle:** Connect recipe yield, attendance and ingredient quantities. Keep the guidance about planning quantities rather than prescribing a universal portion or implying automatic recipe scaling.
- **Section outline:** Identify when approximate quantities are enough; compare recipe yield with people eating; plan intentional extra portions; adjust ingredient quantities and pack purchases; review actual leftovers.
- **Practical example:** Adapt a four-serving recipe for two people while deliberately saving a portion, separating the ingredient amounts needed from the packs that must be purchased.
- **Research and feature checks:** Verify whether Fameally stores yields or supports any quantity adjustment before mentioning those capabilities; otherwise explain manual calculation. Use current authoritative guidance for any nutritional or storage advice. Do not suggest cooking time, seasoning or every ingredient scales mechanically.
- **Existing links:** [Combine shopping quantities carefully](articles/how-to-turn-a-meal-plan-into-a-food-shopping-list.html); [Make weekly template quantities your own](articles/a-7-day-family-meal-plan-template-for-a-practical-uk-week.html).
- **Planned companions:** [13: understand savings calculations](#article-13); [19: specified budget plans](#article-19); [17: plan festive leftovers](#article-17).

<a id="article-18"></a>

### 18. The Ultimate Printable Family Shopping Checklist

- **Proposed URL:** `https://fameally.com/articles/the-ultimate-printable-family-shopping-checklist.html`
- **Reader need:** Obtain a ready-made checklist that can be printed and adapted for groceries and household essentials.
- **Distinct angle:** A resource-led guide with a future free A4 download. Article 9 teaches how to build a personalised master list; this provides a practical starting sheet rather than duplicating that process.
- **Section outline:** Explain what the checklist covers; show how to personalise it; separate master prompts from items needed now; demonstrate print-and-shop use; explain an optional shared digital workflow.
- **Practical example:** Describe a future A4 sheet with groceries, toiletries, cleaning and general essentials, tick spaces and blank additions. Demonstrate selecting current needs rather than buying every printed item.
- **Research and feature checks:** Future resource production must verify UK terminology, A4 print legibility, download access without an account and a working public file. Define free access clearly and avoid claiming the download exists during roadmap work. Verify any digital workflow separately.
- **Existing links:** [Use a household essentials checklist](articles/the-easiest-way-to-stop-forgetting-regular-household-shopping-items.html); [Compare paper planning with an app](articles/printable-weekly-meal-planner-vs-meal-planning-app.html).
- **Published companions:** [2: arrange items by aisle](articles/how-to-organise-your-shopping-list-by-supermarket-aisle.html); [9: create a master grocery list](articles/how-to-create-a-master-grocery-list-for-your-household.html).
- **Planned companion:** [16: Christmas-specific checklist](#article-16).

<a id="article-19"></a>

### 19. 7-Day Family Meal Plans for Different Budgets

- **Proposed URL:** `https://fameally.com/articles/7-day-family-meal-plans-for-different-budgets.html`
- **Reader need:** See concrete weekly dinner plans and shopping lists at different illustrative spending levels.
- **Distinct angle:** Worked menus and costed baskets, beyond the existing general budget advice and flexible seven-day template. Explain exactly what each budget covers.
- **Section outline:** State household and pricing assumptions; provide three seven-dinner plans at different budget levels; give each plan a combined shopping list; compare checkout and ingredient-use costs; explain substitutions and planned leftovers.
- **Practical example:** Plan three dinner-only weeks for an illustrative household of two adults and two children, with quantities made explicit and checked during future recipe/resource development. Set budget amounts only after checking current baskets.
- **Research and feature checks:** Record retailer, pricing date, pack sizes, portions, pantry items, meals included and substitutions. Verify recipes, quantities and safe leftovers before publication; do not imply nutritional completeness or guaranteed national prices. No meal-plan download is created by this roadmap.
- **Existing links:** [Read practical budget planning advice](articles/cheap-family-meals-for-the-week-plan-before-you-shop.html); [Use the existing seven-day template](articles/a-7-day-family-meal-plan-template-for-a-practical-uk-week.html).
- **Published companion:** [4: start with existing ingredients](articles/how-to-plan-family-meals-around-what-you-already-have.html).
- **Planned companions:** [13: measure possible savings](#article-13); [15: serving-size decisions](#article-15).

<a id="article-20"></a>

### 20. What Can I Cook With What I Already Have?

- **Proposed URL:** `https://fameally.com/articles/what-can-i-cook-with-what-i-already-have.html`
- **Reader need:** Find a practical dinner idea from a few ingredients currently available.
- **Distinct angle:** An ingredient-led set of meal combinations and sensible substitutions. Link to 4 for the full planning routine instead of repeating its inventory method.
- **Section outline:** Identify a useful meal base; group ideas by rice, pasta, potatoes, eggs and tins; add suitable vegetables or leftovers; identify genuinely missing ingredients; save successful combinations for another week.
- **Practical example:** Outline combinations such as a rice-and-vegetable dish or a bean-based jacket potato, specifying which ingredients are essential, optional or already safely prepared when the future article is developed.
- **Research and feature checks:** Verify ingredient compatibility, preparation and leftover-storage advice. Identify ideas as suggestions rather than tested recipes unless tested. Do not imply Fameally automatically searches pantry contents or generates recipes from available ingredients without released-product evidence.
- **Existing links:** [Keep a realistic backup dinner](articles/how-to-make-a-weekly-meal-plan-that-survives-a-normal-uk-week.html); [Use ingredients across a cheaper week](articles/cheap-family-meals-for-the-week-plan-before-you-shop.html).
- **Published companions:** [4: plan around existing food](articles/how-to-plan-family-meals-around-what-you-already-have.html); [10: use dated ingredients safely](articles/how-to-plan-meals-around-expiry-dates.html).
- **Planned companion:** [12: save favourite combinations](#article-12).

<a id="article-l3"></a>

### L3. Why Use a Meal Planning App Instead of Planning in Your Head?

- **Proposed URL:** `https://fameally.com/articles/why-use-a-meal-planning-app-instead-of-planning-in-your-head.html`
- **Reader need:** Decide whether making an informal mental plan visible would help with repeated questions, forgotten decisions or handovers.
- **Distinct angle:** Diagnose the food-planning tasks currently carried in memory. The existing app-versus-notes comparison assesses tools; L5 explains tool categories.
- **Section outline:** Identify memory-dependent decisions; make one ordinary week visible; connect dinner choices with the shop; share enough information for another person to act; decide whether an app adds useful structure.
- **Practical example:** Map one person's remembered dinners and missing ingredients into a simple visible week, then show the information a second cook or shopper would need.
- **Research and feature checks:** Keep examples illustrative and avoid unsupported psychological, stress-reduction or time-saving claims. Verify the released Fameally workflow used; acknowledge that a simple written plan may meet some households' needs.
- **Existing links:** [Compare an app with a notes-based plan](articles/meal-planning-app-vs-notes-app.html); [Build a repeatable family planning routine](articles/family-meal-planning-for-busy-households-a-simple-repeatable-system.html).
- **Published companion:** [6: reuse a successful week](articles/how-to-make-a-monthly-family-meal-plan-without-starting-from-scratch.html).
- **Planned companions:** [L5: select a tool category](#article-l5); [11: share cooking and shopping](#article-11).

<a id="article-l4"></a>

### L4. Why Shared Shopping List Apps Reduce Forgotten Items

- **Proposed URL:** `https://fameally.com/articles/why-shared-shopping-list-apps-reduce-forgotten-items.html`
- **Reader need:** Establish habits that get household needs onto the shopper's current list before the shop ends.
- **Distinct angle:** Explain capture, visibility and handovers as mechanisms that can prevent omissions. Article 5 handles cross-platform setup; 7 handles unnecessary duplicate purchases.
- **Section outline:** Identify where requests get lost; capture needs in one place; keep changes visible to the shopper; agree handover and completion habits; review what was still missed.
- **Practical example:** Replace a verbal request for washing-up liquid with an agreed list entry and a clear shopping handover, then consider what happens when the shopper has already checked out.
- **Research and feature checks:** Frame the title's benefit as a possible result of consistent use, not a guarantee or quantified causal finding. Verify synchronisation, access and connectivity behaviour before giving app instructions; do not claim instant delivery under every condition.
- **Existing links:** [Remember regular household items](articles/the-easiest-way-to-stop-forgetting-regular-household-shopping-items.html); [Coordinate a shared family list](articles/shared-meal-planning-app-for-families.html).
- **Published companions:** [5: set up iPhone and Android sharing](articles/how-to-share-a-shopping-list-between-iphone-and-android.html); [7: prevent duplicate purchases](articles/how-to-stop-buying-duplicate-groceries.html); [9: build the household baseline](articles/how-to-create-a-master-grocery-list-for-your-household.html).

<a id="article-17"></a>

### 17. How to Avoid Wasting Christmas Leftovers

- **Proposed URL:** `https://fameally.com/articles/how-to-avoid-wasting-christmas-leftovers.html`
- **Reader need:** Prepare for storing, using and freezing festive leftovers safely rather than making vague plans after the meal.
- **Distinct angle:** A seasonal leftovers workflow with meal ideas, following the earlier Christmas shopping guide. The pre-Christmas target allows readers to plan storage and follow-on meals in advance.
- **Section outline:** Plan containers and likely leftovers before the meal; follow current cooling and storage guidance; label and prioritise food; choose suitable follow-on meals; freeze appropriate portions and update the shopping plan.
- **Practical example:** Describe a potential sequence for leftover cooked poultry and vegetables, with timing, storage and reheating details supplied only after checking current official guidance during writing.
- **Research and feature checks:** Check current FSA or Food Standards Scotland Christmas, poultry, chilling, freezing and reheating guidance. Do not extrapolate one storage rule to every food. Verify any Fameally meal-note or plan-editing steps; avoid implying food-safety monitoring by the app.
- **Existing links:** [Adapt a plan when meals change](articles/how-to-make-a-weekly-meal-plan-that-survives-a-normal-uk-week.html); [Plan leftovers as part of a budget week](articles/cheap-family-meals-for-the-week-plan-before-you-shop.html).
- **Published companion:** [10: date-led decisions](articles/how-to-plan-meals-around-expiry-dates.html).
- **Planned companions:** [16: festive shopping checklist](#article-16); [20: ingredient-led meal ideas](#article-20).

<a id="article-l5"></a>

### L5. How to Choose Between Recipe Apps, Meal Planning Apps, and Shopping List Apps

- **Proposed URL:** `https://fameally.com/articles/how-to-choose-between-recipe-apps-meal-planning-apps-and-shopping-list-apps.html`
- **Reader need:** Identify which capability is missing from the household's current routine before comparing individual products.
- **Distinct angle:** A task-based guide to overlapping tool categories. Avoid another broad ranking article or suggesting that each product belongs exclusively to one category.
- **Section outline:** Identify the main task; explain recipe capture, weekly planning and list collaboration; show how capabilities overlap; check household access, platforms and cost; test one ordinary workflow before switching.
- **Practical example:** Compare the needs of a recipe collector, a household repeatedly deciding dinners and two people coordinating a shop, then map each need to capabilities rather than predetermined winners.
- **Research and feature checks:** Use current official information for every named product and verify released Fameally capabilities. Distinguish essential capabilities from optional extras; date-check prices, sharing limits and availability. Avoid treating product marketing categories as evidence of missing features.
- **Existing links:** [Compare meal-planning apps](articles/best-meal-planning-apps-for-uk-families.html); [Compare household shopping-list apps](articles/best-shopping-list-apps-for-families-and-households.html).
- **Planned companions:** [L1: Paprika comparison](#article-l1); [L2: Cozi comparison](#article-l2); [L3: move beyond a mental plan](#article-l3).

## App tutorial planning briefs

The following briefs cover published and planned app tutorials. All titles explicitly name Fameally, and each proposed URL identifies one filename under the `/help/` section. Every brief inherits the [app tutorial production requirements](#app-tutorial-production-requirements); feature availability must be verified before drafting.

<a id="tutorial-t1"></a>

### T1. Get started with Fameally: create your first meal plan and shopping list

- **Proposed URL:** `https://fameally.com/help/getting-started.html`
- **Reader need:** Reach a useful first result without learning every feature at once.
- **Outcome:** One saved meal appears in a weekly plan and its ingredients appear on a usable shopping list.
- **Prerequisites:** Verify released app version, platform, sign-in and access requirements; use a fresh demonstration profile for welcome steps and a dedicated test account for post-setup screens. The help hub and its publishing support must be ready for the first release.
- **Section outline:** Check access; add a familiar meal and ingredients; add it to the week; open and check the food list; add one household extra; choose a next task. Include common first-run problems.
- **Screenshots required:** Meal entry, the scheduled meal and the resulting list, with accessible captions showing the action and result.
- **Research and feature checks:** Test the full sequence in the released app and record version, platform and date. Confirm exact controls, quantities, list-generation behaviour and any differences between supported platforms. Keep advanced setup in companion tutorials.
- **Related content:** [Build a list from a meal plan](articles/how-to-turn-a-meal-plan-into-a-food-shopping-list.html); [T2: household sharing](#tutorial-t2); [T8: maintain meals](#tutorial-t8); [T16: sign-in help](#tutorial-t16).
- **Local review package (9 November 2026):** [Help hub source](help/index.html); [T1 source](help/getting-started.html); [review notes and verification coverage](output/review/help-t1/REVIEW.md); [capture provenance](output/review/help-t1/provenance.json). Preview the built site at `http://127.0.0.1:8767/help/`. These files preserve the original local review.
- **Verification:** Fameally **1.9.77**, version code **78**, on **Android 14**. In a temporary emulator profile, created Beans on toast with Bread and Baked beans, saved it, and verified the first-week preview places the meal on Monday and produces both list entries. Verified Save my list opens the account-creation prompt without creating an account or accepting terms. Inspected the existing signed-in demonstration account's Shopping → Cleaning → + → Add Cleaning Item controls without submitting a household item. The two new screenshots show the same example and preserve the app's first-run appearance. iOS and iPadOS were not tested; the tutorial identifies its Android reference version.
- **Publication record:** Published **11 November 2026**. The [Help hub](https://fameally.com/help/) and [getting-started tutorial](https://fameally.com/help/getting-started.html) are live. Verified the visible date, Help navigation, app screenshots, sharing and sitemap after the [successful deployment and IndexNow run](https://github.com/ENVentures-LTD/fameally-website/actions/runs/43105187498). [Release commit](https://github.com/ENVentures-LTD/fameally-website/commit/294c0088545f32c608a6bd7e45ec829ca54feb59).

<a id="tutorial-t2"></a>

### T2. Invite your household and share meals, plans and shopping lists in Fameally

- **Proposed URL:** `https://fameally.com/help/invite-your-household.html`
- **Reader need:** Give another household member access to the right shared workspace.
- **Outcome:** An owner sends an invitation, the intended person accepts it and both can find the shared content.
- **Prerequisites:** Verify current Family access, owner permissions, membership limits, account requirements and released versions on both demonstration devices.
- **Section outline:** Check eligibility; send an invitation; accept with the intended account; find the shared workspace; check a harmless list change; resolve missing invitations or content; contact support if needed.
- **Screenshots required:** Owner invitation, invitee acceptance and the shared workspace, using demonstration email addresses.
- **Research and feature checks:** Record version, platform and date for both roles. Verify acceptance, permissions, sync and connectivity behaviour; do not promise immediate updates under every condition. The broader cross-platform article retains its own purpose.
- **Related content:** [Share between iPhone and Android](articles/how-to-share-a-shopping-list-between-iphone-and-android.html); [11: planning for couples](#article-11); [T13: share meal or plan content](#tutorial-t13); [Contact support](support.html).

<a id="tutorial-t3"></a>

### T3. Import a recipe from a website into Fameally

- **Proposed URL:** `https://fameally.com/help/import-a-recipe.html`
- **Reader need:** Save an online recipe without retyping information that the app can import.
- **Outcome:** A reviewed recipe is saved with usable ingredients and its original source retained where supported.
- **Prerequisites:** Verify released version, platform, account and access requirements. Choose a publicly accessible recipe that imports successfully and a reproducible failure example.
- **Section outline:** Start the supported URL-import flow; supply the recipe address; review ingredients, quantities and instructions; correct supported fields; save and check the result; handle failed or incomplete imports.
- **Screenshots required:** Import entry, review or correction stage and saved meal, with source attribution.
- **Research and feature checks:** Record version, platform and date. Verify import entry points, review controls, supported edits, failure messages and manual fallback. Do not claim every website imports or that quantities are always interpreted correctly.
- **Related content:** [12: organise family recipes](#article-12); [T8: edit meals and ingredients](#tutorial-t8); [T10: tags and filtering](#tutorial-t10).

<a id="tutorial-t4"></a>

### T4. Save and reuse a weekly meal plan in Fameally

- **Proposed URL:** `https://fameally.com/help/save-and-reuse-meal-plans.html`
- **Reader need:** Start another week from a plan that already worked.
- **Outcome:** A saved weekly plan is reused and adapted for the intended week.
- **Prerequisites:** Verify released version, platform, subscription and workspace permissions. Prepare a demonstration week and a destination with known existing content.
- **Section outline:** Save the week; find the saved plan; select the destination; review the effect on existing meals; apply and adapt it; check the resulting shopping list; handle missing or unavailable plans.
- **Screenshots required:** Saving, selecting the saved plan and the destination week after reuse.
- **Research and feature checks:** Record version, platform and date. Verify save/apply controls, destination and existing-content behaviour, access tier and ingredient effects. Do not imply automatic rotation, a monthly planning screen or overwrite behaviour that has not been tested.
- **Related content:** [Build a month from weekly patterns](articles/how-to-make-a-monthly-family-meal-plan-without-starting-from-scratch.html); [T9: change an existing week](#tutorial-t9); [T13: share content](#tutorial-t13).

<a id="tutorial-t5"></a>

### T5. Set up weekly regulars and household essentials in Fameally

- **Proposed URL:** `https://fameally.com/help/weekly-regulars.html`
- **Reader need:** Add recurring household purchases without rebuilding the same list every week.
- **Outcome:** Selected food and household essentials are configured as regulars and added to the appropriate list.
- **Prerequisites:** Verify released version, platform, access tier and household permissions; prepare demonstration food, cleaning and toiletry items.
- **Section outline:** Find the regular-item controls; choose items and supported default quantities; add weekly regulars; check items already listed; change or remove a regular; resolve missing items.
- **Screenshots required:** Regular-item configuration, the add-regulars action and the resulting food and household entries.
- **Research and feature checks:** Record version, platform and date. Test default quantities, categories, repeated additions and permissions. Distinguish intentional weekly regulars from purchase-pattern suggestions; do not imply automatic restocking or exact stock levels.
- **Related content:** [Create a master grocery list](articles/how-to-create-a-master-grocery-list-for-your-household.html); [Remember household essentials](articles/the-easiest-way-to-stop-forgetting-regular-household-shopping-items.html); [T7: Due Soon](#tutorial-t7).

<a id="tutorial-t6"></a>

### T6. Sort your Fameally shopping list by supermarket aisle

- **Proposed URL:** `https://fameally.com/help/sort-shopping-list-by-aisle.html`
- **Reader need:** Configure Fameally's list ordering for the way the household shops.
- **Outcome:** A mixed demonstration list appears in a verified, chosen aisle order.
- **Prerequisites:** Verify released version, platform, access tier and workspace permissions. Prepare a mixed list and identify the actual supported aisle setup.
- **Section outline:** Find aisle settings; configure the supported order; place or assign items where supported; apply the sorting view; check the result; explain unmatched items and changing stores.
- **Screenshots required:** Relevant configuration controls and the same list before and after sorting.
- **Research and feature checks:** Record version, platform and date. Verify configuration, assignments, ordering and supported store behaviour. Do not promise automatic physical supermarket maps or controls that have not been released.
- **Related content:** [Organise a supermarket trip by aisle](articles/how-to-organise-your-shopping-list-by-supermarket-aisle.html); [T12: list layouts](#tutorial-t12); [T5: regular items](#tutorial-t5).

<a id="tutorial-t7"></a>

### T7. Use Due Soon shopping suggestions in Fameally

- **Proposed URL:** `https://fameally.com/help/due-soon.html`
- **Reader need:** Review recurring purchases that may need attention before the next shop.
- **Outcome:** The reader can open suggestions, decide whether an item is needed and add it deliberately, or understand why the panel is empty.
- **Prerequisites:** Verify released version, platform, access tier and permissions. Use demonstration purchase history that meets the current eligibility rules, plus an account without enough history.
- **Section outline:** Explain what Due Soon uses; open the panel; read an item suggestion; check household supplies; add a needed item; explain an empty panel and excluded items; choose regulars or manual entry when appropriate.
- **Screenshots required:** Populated suggestions, a resulting list entry and the empty state, with explanatory captions.
- **Research and feature checks:** Record version, platform and date. Recheck purchase-count, interval and completed-cycle requirements, quantities and already-listed exclusions. Due Soon is never food-expiry tracking or a measurement of cupboard stock. This tutorial becomes the maintained operating reference.
- **Related content:** [Original Due Soon announcement](updates/due-soon-remember-regular-shopping-items.html); [T5: weekly regulars](#tutorial-t5); [T11: complete a shop and review history](#tutorial-t11).

<a id="tutorial-t8"></a>

### T8. Add and edit your own meals and ingredients in Fameally

- **Proposed URL:** `https://fameally.com/help/add-and-edit-meals.html`
- **Reader need:** Keep a reusable meal accurate as ingredients or the household's version change.
- **Outcome:** A meal's supported details and ingredient quantities are saved and can be found again.
- **Prerequisites:** Verify released version, platform, access tier and edit permissions; prepare a demonstration meal with known ingredient names and units.
- **Section outline:** Create a meal; add supported ingredient and recipe details; edit an existing meal; review names, units and quantities; save and reopen it; handle missing edits or unexpected list effects.
- **Screenshots required:** Meal editing, ingredient entry or correction and the saved result.
- **Research and feature checks:** Record version, platform and date. Verify required fields, supported edits, ingredient matching and effects on saved or scheduled uses. Do not imply automatic serving adjustments, nutrition calculations or retroactive changes without evidence.
- **Related content:** [T1: first complete workflow](#tutorial-t1); [T3: import a recipe](#tutorial-t3); [T9: edit the scheduled week](#tutorial-t9); [15: serving sizes](#article-15).

<a id="tutorial-t9"></a>

### T9. Change your weekly Fameally plan and check the shopping list

- **Proposed URL:** `https://fameally.com/help/change-your-weekly-plan.html`
- **Reader need:** Adapt an existing week when a dinner or shopping requirement changes.
- **Outcome:** The intended scheduled meals are changed and the reader has checked what the shopping list now contains.
- **Prerequisites:** Verify released version, platform, access tier and shared-workspace edit permissions. Use a demonstration week with known meal ingredients and list states.
- **Section outline:** Find the correct week; move, replace or remove a meal through supported controls; review remaining meals; inspect ingredient quantities and household extras; resolve unexpected list contents.
- **Screenshots required:** The original week, a supported change action and the resulting week and shopping list.
- **Research and feature checks:** Record version, platform and date. Test each demonstrated action, list recalculation and treatment of manual or completed entries. Explain verified behaviour without assuming deleted ingredients are always removed or household extras are regenerated.
- **Related content:** [Make a flexible weekly plan](articles/how-to-make-a-weekly-meal-plan-that-survives-a-normal-uk-week.html); [T4: reuse a saved week](#tutorial-t4); [T8: edit the underlying meal](#tutorial-t8).

<a id="tutorial-t10"></a>

### T10. Find and organise saved meals with Fameally tags

- **Proposed URL:** `https://fameally.com/help/organise-meals-with-tags.html`
- **Reader need:** Find suitable saved meals without scrolling through the whole library.
- **Outcome:** Meals have supported tags and the reader can apply and clear the relevant filters.
- **Prerequisites:** Verify released version, platform, access tier and editing permissions; prepare several demonstration meals with different supported tags.
- **Section outline:** Find tag controls; apply or change available tags; save; filter the meal library; combine filters only if supported; clear filters and explain missing results.
- **Screenshots required:** Tag selection, filtered results and the clear-filter action.
- **Research and feature checks:** Record version, platform and date. Verify tag availability, whether custom tags exist, matching rules and shared visibility. Do not imply allergy protection, nutritional suitability or filtering capabilities that have not been tested.
- **Related content:** [12: organise family recipes](#article-12); [14: different household preferences](#article-14); [T3: recipe import](#tutorial-t3); [T8: meal editing](#tutorial-t8).

<a id="tutorial-t11"></a>

### T11. Complete a shop and revisit your Fameally shopping history

- **Proposed URL:** `https://fameally.com/help/shopping-history.html`
- **Reader need:** Finish the current shop correctly and understand the record left behind.
- **Outcome:** A demonstration shopping cycle is completed, its available history is located and the next list's state is understood.
- **Prerequisites:** Verify released version, platform, history access and household permissions; prepare an active list with known bought and remaining items.
- **Section outline:** Distinguish marking an item from completing a shop; use the actual completion control; inspect history; check what remains or resets; begin the next cycle; explain missing history.
- **Screenshots required:** Completion control, resulting history and the next list state.
- **Research and feature checks:** Record version, platform and date. Verify what constitutes a completed cycle, what history records, retention and access limits, and treatment of remaining items. Do not confuse shopping history with current stock or imply unsupported expenditure records.
- **Related content:** [Build a practical food list](articles/how-to-turn-a-meal-plan-into-a-food-shopping-list.html); [T7: Due Soon history requirements](#tutorial-t7); [T18: household statistics](#tutorial-t18).

<a id="tutorial-t12"></a>

### T12. Switch between combined and separate shopping lists in Fameally

- **Proposed URL:** `https://fameally.com/help/shopping-list-layout.html`
- **Reader need:** Choose a supported list presentation that suits the household's shop.
- **Outcome:** The reader can change the relevant setting and understand where food and household items appear.
- **Prerequisites:** Verify released version, platform, access tier and setting permissions. Prepare a list containing food, cleaning, toiletry and general entries.
- **Section outline:** Explain the available layouts; find the control; switch the setting; locate items in the result; switch back; resolve apparently missing sections or entries.
- **Screenshots required:** Layout control and the same demonstration items in both supported presentations.
- **Research and feature checks:** Record version, platform and date. Verify exact labels, category behaviour, persistence and whether the setting affects the device or workspace. Distinguish presentation changes from data merging or deletion; do not assume item quantities or sharing permissions change.
- **Related content:** [T5: household regulars](#tutorial-t5); [T6: aisle ordering](#tutorial-t6); [T11: complete a shopping cycle](#tutorial-t11).

<a id="tutorial-t13"></a>

### T13. Share a saved meal or meal plan from Fameally

- **Proposed URL:** `https://fameally.com/help/share-meals-and-plans.html`
- **Reader need:** Send supported meal or plan content to another person without assuming household collaboration is the same operation.
- **Outcome:** Demonstration content is shared and received through the released app's supported route, with any import or copy behaviour understood.
- **Prerequisites:** Verify released versions, platforms, access tiers and permissions for sender and recipient; use content that can be shared safely from demonstration accounts.
- **Section outline:** Select a meal or saved plan; use the supported sharing flow; receive and review the content; import or open it if supported; check the result; resolve incompatible content or failed sharing.
- **Screenshots required:** Sender action, recipient review and the received result, with platform-specific screens where needed.
- **Research and feature checks:** Record version, platform and date for both sides. Verify the actual format and transport, included fields, access and compatibility requirements, duplicate handling and whether future edits propagate. Do not promise links, particular file formats or live collaboration without evidence.
- **Related content:** [T2: shared household workspace](#tutorial-t2); [T4: saved plans](#tutorial-t4); [T8: maintain a meal](#tutorial-t8); [Contact support](support.html).

<a id="tutorial-t14"></a>

### T14. Recover deleted meals, plans and shopping items in Fameally

- **Proposed URL:** `https://fameally.com/help/recover-deleted-items.html`
- **Reader need:** Restore an eligible accidental deletion without guessing which content can be recovered.
- **Outcome:** A supported demonstration item is recovered and its destination and relationships are checked.
- **Prerequisites:** Verify released version, platform, access tier, recovery permissions and eligible item types; create disposable demonstration deletions.
- **Section outline:** Find deleted items; identify an eligible record; inspect available information; restore it; locate the result; explain unavailable, expired or permanently removed records; contact support where appropriate.
- **Screenshots required:** Recovery list, the restore action and the recovered result for the demonstrated content types.
- **Research and feature checks:** Record version, platform and date. Verify retention, eligible types, relationships, plan and list effects, permissions and permanent-deletion boundaries. Do not promise recovery of every deletion or use a real household to test it.
- **Related content:** [T8: meal records](#tutorial-t8); [T9: scheduled plans](#tutorial-t9); [T15: backups](#tutorial-t15); [Contact support](support.html).

<a id="tutorial-t15"></a>

### T15. Create and restore a password-protected Fameally backup

- **Proposed URL:** `https://fameally.com/help/backup-and-restore.html`
- **Reader need:** Save a supported backup and understand the consequences before restoring one.
- **Outcome:** A demonstration export is created, its contents can be previewed through the supported flow and a disposable destination is restored correctly.
- **Prerequisites:** Verify released version, platform, access tier, workspace and owner restrictions. Use disposable demonstration data, a supported backup file and its password; verify destination compatibility before restoration.
- **Section outline:** Explain included data and limits; export and store the file and password appropriately; select a backup; review its preview; explain replacement or merge effects and confirmation; restore; verify the result; handle wrong passwords, invalid files and blocked restores.
- **Screenshots required:** Export controls, preview and restore confirmation, plus the demonstrated result; never show an actual password.
- **Research and feature checks:** Record version, platform and date. Verify backup coverage, compatibility, password-recovery limits, blocked conditions and exact effects on existing and shared data. Do not describe a replacement as a merge or imply automatic cloud backup or cross-account migration without evidence.
- **Related content:** [T14: recover eligible deletions](#tutorial-t14); [T16: account access](#tutorial-t16); [Contact support](support.html).

<a id="tutorial-t16"></a>

### T16. Sign in to Fameally, verify your email and reset your password

- **Proposed URL:** `https://fameally.com/help/sign-in-and-password-help.html`
- **Reader need:** Access the intended account or resolve a verification or password problem.
- **Outcome:** The reader can follow the supported sign-in or recovery route and check the account and workspace shown on a device.
- **Prerequisites:** Verify released version, platform and supported account methods. Use demonstration accounts and accessible inboxes to test verification and reset messages; establish which actions require an existing account rather than a paid tier.
- **Section outline:** Choose the correct account method; sign in; verify email where required; request and complete a password reset; handle missing or expired messages; check access on another device; escalate unresolved problems.
- **Screenshots required:** Sign-in and recovery controls, the relevant app result and any necessary demonstration email or browser step without credentials or live recovery tokens.
- **Research and feature checks:** Record version, platform and date. Test supported methods and link handling, expiry and resend guidance. Do not imply a new account inherits purchases or content, or that email/password recovery applies to every sign-in method.
- **Related content:** [T1: getting started](#tutorial-t1); [T2: join the intended household](#tutorial-t2); [T17: purchased access](#tutorial-t17); [Contact support](support.html).

<a id="tutorial-t17"></a>

### T17. Manage your Fameally subscription and purchased access

- **Proposed URL:** `https://fameally.com/help/manage-your-subscription.html`
- **Reader need:** Find the correct billing controls or resolve access that does not match a purchase.
- **Outcome:** The reader can identify the billing provider, follow its supported management or cancellation route and use the verified access-recovery or support route.
- **Prerequisites:** Verify released version, platform, Fameally account, purchasing store account and household ownership where relevant. Use approved demonstration or sandbox purchase evidence rather than making a live purchase to produce the guide.
- **Section outline:** Identify the plan and billing provider; open Apple or Google management; review renewal and cancellation information; follow verified restore or access-recovery steps where available; distinguish billing, household access and account deletion; contact the right support channel.
- **Screenshots required:** Fameally's relevant access controls and supported store-management screens, without payment or real account details.
- **Research and feature checks:** Record version, platform and date. Check current official Apple and Google instructions, app access and restoration behaviour, trial terms and cancellation effects during writing. Do not promise refunds, immediate tier changes, cross-store transfers or a restore-purchase control that has not been verified. Link current pricing rather than duplicating amounts.
- **Related content:** [Current plans and pricing](index.html#pricing); [T16: sign-in help](#tutorial-t16); [Contact support](support.html); [Account deletion](account-deletion.html).

<a id="tutorial-t18"></a>

### T18. Understand your Fameally household statistics

- **Proposed URL:** `https://fameally.com/help/household-statistics.html`
- **Reader need:** Understand what the app's available measures represent and when they may be incomplete.
- **Outcome:** The reader can find the statistics view and interpret each demonstrated measure using its verified inputs and period.
- **Prerequisites:** Verify released version, platform, access tier and workspace visibility. Prepare a demonstration household with known activity and a low-history comparison.
- **Section outline:** Open statistics; explain each available measure; identify the covered period and workspace; show what recorded actions contribute; explain empty or incomplete views; choose a practical next check.
- **Screenshots required:** The statistics overview and any supported detail or period controls, with captions tying the figures to known demonstration activity.
- **Research and feature checks:** Record version, platform and date. Verify definitions, calculation inputs, date ranges, updates and permissions for every figure described. Do not infer grocery spending, calories, stock, nutritional adequacy or money saved unless the released product actually measures that quantity with a defensible definition.
- **Related content:** [T11: shopping history](#tutorial-t11); [T7: purchase-pattern suggestions](#tutorial-t7); [13: assessing possible savings](#article-13).

## Roadmap acceptance checks

- Account for **43 unique topics**: the existing 25 articles and T1–T18. Preserve the published calendar rows and all 25 existing article briefs, including publication evidence. The current calendar has **10 published records** and **33 planned entries**, with original article targets retained alongside revised targets.
- Check unique tutorial filenames and brief anchors, matching calendar-to-brief titles, working internal and existing local document links, and correct weekday labels. Future public URLs remain reserved code text, not links to missing pages.
- Confirm revised targets are ordered, occupy Monday/Wednesday/Friday slots, skip **25 December 2026** and **1 January 2027**, and finish on **1 February 2027**. Retain article 16 on **20 November** and article 17 on **14 December**.
- Keep this roadmap, archived ideas and future drafts outside the public build. Maintain the published Help hub and tutorials through the site release workflow.

### Future help-library acceptance checks

These checks govern the first release and later tutorial additions. The local T1 review package records the checks actually completed; preview availability is not evidence of public deployment.

- Verify `/help/` and `/help/<slug>.html` are included in the explicit build boundary, canonical mapping, sitemap, validation and IndexNow handling. Confirm draft locations and this roadmap remain excluded.
- Check `CollectionPage` and its `ItemList` against the hub's visible published links, and check each tutorial's `Article`, breadcrumbs, metadata and visible dates. Hub categories must contain live tutorials; no empty category, draft or reserved URL should be advertised.
- Verify the Help navigation, prominent Contact support route, contextual links, sharing controls and screenshots. Check mobile layouts, keyboard access, dark mode, meaningful alternative text and navigation without JavaScript. Existing article, support, download and app-association URLs must continue to work.
- Run the README's current site validation, article-sharing, publication-boundary, IndexNow and browser checks against the source and built preview as appropriate. Review the preview before any separately authorised release.
- Capture a Search Console baseline for the first release, then review indexing and search performance after four and eight weeks. Check tutorial URLs and branded/task queries without treating sparse data as proof of an uplift. Track tutorial usage and support outcomes separately where measurement exists; Search Console does not measure completed app tasks or installs. New analytics integration and automatic review reminders require separate work.

## Deferred work

Official social URLs have not been supplied. Do not guess handles, render empty Follow sections, add placeholder links or load social widgets. Once confirmed, add direct links to Fameally's footer, Updates index and ENVentures' Fameally page; add those same URLs to the app entity's `sameAs`. Do not add them to ENVentures' global footer or company entity. Check profile backlinks, product naming and store descriptions separately; account edits require their own authorization.

The help hub, T1 and shared navigation are prepared for local review. The first public release and the remaining 17 tutorials remain separate work, following the release checks in [Section purposes](#section-purposes). The cloud reminder extension through **1 February 2027**, with the Christmas Day and New Year's Day pauses, also requires a separate schedule change; keep the desktop reminder paused.

The roadmap itself remains excluded from the public build. Its original documentation-only update did not author or publish pages; the later, separately requested help-library implementation has prepared the source, navigation, sitemap, assets and checks for local review. Article and remaining tutorial production, resource downloads, automations and publication require their own instruction. ENVentures news remains separate work.
