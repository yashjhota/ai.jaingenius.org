# PRODUCT REQUIREMENTS DOCUMENT




# Jain AI — ai.jaingenius.org

**Product:** Jain AI, a digital creativity and AI resource hub by Jain Genius  
**Document:** Product Requirements Document (PRD)  
**Version:** 1.0  
**Date:** 7 November 2026  
**Status:** Build specification — Phase 1 ready  
**Project type:** New, independent application in a new folder/repository  
**Primary audience:** Jain community members, temples, trusts, youth groups, event organisers, educators and Jain organisations

> **Product promise:** Make useful AI, creative resources and Jain-culture-specific design support accessible to everyone — including people with no technical or design experience.

---

## JAINGENIUS.ORG - WEBSITE ANALYZE THIS FOR OVERVIEW OF WHAT JAINGENIUS DOES 

## 1. Executive summary

Jain AI is a free-first digital creativity and resource platform for the Jain community. It brings together curated AI prompts, festival design templates, Jain digital assets, AI tool recommendations, practical creative utilities and learning guides in one discoverable website.

The platform is hosted at **ai.jaingenius.org** and presented as **“Jain AI — by Jain Genius.”** It is a separate application and codebase from the existing Jain Genius website. It may share brand assets and visual conventions, but it must not modify or depend on the existing website's source code.

The first release is a fast, content-first resource hub. It does **not** require user accounts, a database, paid AI APIs, image generation or a custom admin dashboard. Initial content lives in version-controlled Markdown/JSON files. Later phases introduce a content-management workflow, structured database, managed asset storage, no-cost creative builders and finally carefully metered AI integrations.

The product must be respectful of Jain traditions, clear about asset permissions and honest about third-party AI tools' changing free plans. “Free-first” means the platform is designed to operate at very low cost; it does not mean every third-party service or AI generation is guaranteed to remain free.

## 2. Product vision and goals

### 2.1 Vision

Become a trusted digital creativity and AI resource centre for the Jain community — a place where a temple volunteer, student, family member or organisation can find a suitable resource and create useful Jain-focused content without needing professional design or technical skills.

### 2.2 Product goals

1. Make Jain-specific creative resources easy to discover, understand, copy and download.
2. Reduce the effort required to prepare festival posters, invitations, greetings, banners and educational content.
3. Provide carefully curated prompts and tutorials that help non-technical users use mainstream AI tools effectively.
4. Build a reusable, maintainable library of Jain digital assets with clear source and usage permissions.
5. Establish a foundation for future AI tools without exposing API keys or creating uncontrolled API costs.
6. Keep the first launch lightweight, fast, accessible and inexpensive to operate.

### 2.3 Non-goals

The initial product is not:

- A general-purpose ChatGPT/Gemini competitor or model-hosting platform.
- An unlimited free image/video generation service.
- A replacement for Jain scholars, acharyas, temple authorities or religious advisers.
- A social network, public discussion forum or open file-sharing service.
- A marketplace for paid design services.
- A redesign or replacement of jaingenius.org.

## 3. Audience and user problems

| Audience | Need / problem | Product response |
|---|---|---|
| Temple organisers and volunteers | Need posters, invitations, banners and event content quickly | Festival kits, templates, prompts and later creative builders |
| Jain youth groups | Need modern social posts, reels concepts and educational content | Social templates, captions, video prompts and tutorials |
| Families and community members | Want appropriate greetings and invitations without design skills | Guided prompt/template workflows and downloadable designs |
| Jain educators | Need quizzes, presentations and learning materials | Quiz prompts, educational templates and learning resources |
| Designers and content creators | Need quality Jain-specific references and assets | Searchable, licensed asset and prompt library |
| Jain organisations | Need consistent, reusable communication material | Curated resource packs and, later, organisation workspaces |

### 3.1 Primary user journeys

**Journey A — Find a prompt:** Visitor opens the site → selects Prompt Library → filters by festival/style/tool → opens prompt detail → copies prompt → uses it in their chosen AI tool.

**Journey B — Download an asset:** Visitor opens Asset Library → filters by type/format → previews an item → checks licence/attribution → downloads the file.

**Journey C — Prepare a festival kit:** Visitor selects a festival → chooses language, style and required formats → receives copy-ready wording and prompts (Phase 3) → copies or downloads the kit.

**Journey D — Learn an AI tool:** Visitor browses AI Tools → opens a tool profile → understands use case, free-plan caveat and steps → visits the provider's official website.

## 4. Product principles

- **Jain authenticity first:** Religious accuracy and respect are more important than visual novelty.
- **Useful before clever:** A visitor should find and use a resource quickly; avoid gimmicky AI features.
- **Free-first, not free-at-any-cost:** Prefer free/open standards and static delivery; clearly disclose costs and quotas.
- **Content before infrastructure:** Do not add a database, authentication or API dependency until a real feature needs it.
- **Progressive enhancement:** Core pages and content work without client-side JavaScript wherever practical.
- **Human-reviewed content:** Religious dates, descriptions, symbols and sensitive imagery require editorial review.
- **Provider independence:** AI providers must be replaceable behind a server-side adapter.
- **Accessible by default:** Support mobile users, readable typography, keyboard access and strong contrast.

## 5. Scope and phased roadmap

### Phase 0 — Project foundation

**Purpose:** Establish a clean, reproducible application in a new folder.

Deliverables:
- New Git repository/folder named `ai-jaingenius` (or equivalent) — not nested inside the existing Jain Genius website repository unless intentionally chosen by the owner.
- Astro + TypeScript baseline, code formatting, lint/type-check scripts and environment example.
- Responsive design system, shared layout, navigation, footer and custom 404 page.
- Local development and production build documented in README.
- Basic deployment configuration for the selected Cloudflare target.

Acceptance criteria:
- `npm run dev` starts successfully on a clean install.
- `npm run build` completes without errors.
- No references to local absolute paths or secrets are committed.
- The new project can be developed and deployed independently.

### Phase 1 — Public Resource Hub (MVP / launch scope)

**Purpose:** Launch a genuinely useful platform without a database or AI API.

Features:
1. Homepage with clear introduction, global search, featured categories and recently added resources.
2. Prompt Library with categories, tags, filters, detail pages and one-click copy.
3. Template Library with preview, description, format, intended use and download/open link.
4. Jain Digital Asset Library with categories, file formats, preview, attribution and licence information.
5. AI Tools Directory with category, description, official provider link, use cases, account/pricing caveat and `lastVerifiedAt` date.
6. Festival and Occasion Directory with educational descriptions and links to relevant prompts/templates. Dates must be editorially verified before publication.
7. Learning Centre with short practical tutorials and beginner-friendly instructions.
8. Search across all published resources.
9. About, editorial guidelines, contact/contribution information, privacy notice and terms/usage page.
10. Responsive design, SEO metadata, sitemap, robots.txt, social preview metadata and accessible navigation.

Content implementation:
- Use Astro Content Collections with Markdown/MDX and schema validation, or typed JSON for records that need structured fields.
- Keep initial images/downloads in the repository under `public/` only when file size and repository size are reasonable.
- No database, account system, uploads, admin dashboard, AI API or payment integration in Phase 1.

Phase 1 acceptance criteria:
- A visitor can discover, filter, open and copy prompts on mobile and desktop.
- A visitor can preview and download/open assets and templates with visible licence/attribution details.
- AI tool cards clearly link to official websites and show when free-plan information was last checked.
- Search returns relevant results across prompts, templates, assets, tools and guides.
- Empty states, no-results states, broken-link handling and 404 page are implemented.
- Core content pages render with JavaScript disabled or without requiring client-side JavaScript for basic reading/navigation.
- No broken internal links; no console errors in the core user journeys.
- Core pages meet the performance, SEO and accessibility targets in Section 13.

### Phase 2 — Admin CMS and managed content

**Purpose:** Allow approved Jain Genius admins/editors to publish and maintain content without editing source files for every change.

Features:
- Admin-only access; roles initially `admin` and `editor`.
- Create, edit, preview, publish, unpublish and archive content.
- Manage prompts, assets, templates, AI tools, festivals and guides.
- Draft/published status, slug validation, timestamps and audit metadata.
- Upload assets to Cloudflare R2; store metadata and object keys in D1.
- Search/filter/sort content in the admin dashboard.
- Import/export structured content for backup and portability.
- Admin activity log for publish/update/delete actions.

Security requirement: Protect admin routes and APIs at the server/edge layer. Prefer Cloudflare Access for a small internal admin team where suitable; validate identity on every protected API request. Do not rely on hiding an admin URL or frontend-only role checks. Never store passwords or API secrets in client code.

Phase 2 acceptance criteria:
- Unauthenticated visitors cannot access admin pages or mutation APIs.
- Editors can create and edit drafts but only authorised roles can publish/delete.
- Uploaded file type, size and filename are validated server-side.
- D1 migrations are versioned and repeatable.
- Content can be backed up/exported and restored using documented steps.

### Phase 3 — No-API Creative Builders

**Purpose:** Deliver interactive creation workflows without paying for model inference.

Features:
- Festival Kit Builder: festival, language, audience, style and output selection.
- Prompt Builder: guided fields generate a structured, reusable prompt.
- Invitation Text Builder: produces editable invitation wording from validated templates.
- Social Caption Builder: produces captions and hashtag suggestions from curated patterns.
- Poster Brief Builder: creates design briefs/prompts with layout, palette, text placement and aspect ratio.
- Copy, download as text/Markdown and shareable URL where safe.

Important: Phase 3 tools are guided template/prompt builders, not generative AI. The UI must not imply that an image or AI response has been generated when it has only assembled text.

Acceptance criteria:
- Builders work without third-party AI credentials.
- Output is deterministic for the same inputs where practical.
- Users can edit, copy and reset output.
- Content templates are validated and reviewed for Jain appropriateness.

### Phase 4 — Text AI integrations

**Purpose:** Add optional AI assistance for selected workflows after the core platform is useful.

Possible tools:
- Jain-event caption and greeting assistant.
- Invitation and speech draft assistant.
- Jain educational quiz/MCQ draft assistant.
- Translation and rewriting assistant for English, Hindi and Gujarati.
- Prompt refinement assistant.

Requirements:
- Provider adapter interface; provider-specific SDKs stay behind server-side modules.
- API keys stored only as server secrets.
- Explicit usage limits, request length limits, timeout, retries with backoff and error handling.
- Rate limiting and abuse protection (for example, Cloudflare Turnstile plus server-side rate limits).
- Usage logging with minimal personal data; configurable daily/monthly quotas.
- User-facing notice that generated content may be inaccurate and needs review.
- No AI-generated religious facts, ritual instructions or festival dates published automatically.

Acceptance criteria:
- No API key appears in browser bundles, source maps, network responses or repository history.
- Quotas and rate limits are enforced server-side.
- Provider failure produces a helpful message and does not lose user input.
- Estimated or actual usage/cost is recorded sufficiently to enforce budget limits.
- AI-generated religious content is clearly labelled as a draft.

### Phase 5 — Image generation and advanced features

**Purpose:** Introduce image generation only after operational controls and demand are proven.

Potential features:
- Poster/image generation using a selected provider.
- Reference-image-assisted designs where provider terms and consent permit.
- Background and decorative asset generation.
- Saved projects and downloadable output packs.

Requirements:
- Explicit generation cost/credit display before submission.
- Hard account/project spending cap and daily/monthly limits.
- File scanning/validation and private-by-default user uploads.
- Clear content policy and Jain religious review rules.
- Provider terms, retention and training policies reviewed before enabling uploads.
- Never promise unlimited free image generation.

### Phase 6 — Community contributions (future / optional)

- Submit a resource for review.
- Contributor profiles/attribution where appropriate.
- Community resource packs and organisation collections.
- Report incorrect content or broken links.
- Moderation queue and takedown workflow.

Do not build public comments, open uploads or social feeds unless there is a clear moderation owner and operating process.

## 6. Information architecture and routes

| Route | Purpose | Phase |
|---|---|---|
| `/` | Homepage, search, featured resources | 1 |
| `/prompts` | Prompt catalogue | 1 |
| `/prompts/[slug]` | Prompt detail and copy action | 1 |
| `/templates` | Template catalogue | 1 |
| `/templates/[slug]` | Template detail, preview and download | 1 |
| `/assets` | Digital asset catalogue | 1 |
| `/assets/[slug]` | Asset detail, licence and download | 1 |
| `/tools` | AI tools directory | 1 |
| `/tools/[slug]` | Tool profile and official link | 1 |
| `/festivals` | Festival/occasion directory | 1 |
| `/festivals/[slug]` | Festival information and related resources | 1 |
| `/learn` and `/learn/[slug]` | Tutorials and learning guides | 1 |
| `/about` | About Jain AI and Jain Genius | 1 |
| `/guidelines` | Editorial, religious and asset guidelines | 1 |
| `/privacy` and `/terms` | Privacy and use terms | 1 |
| `/admin/*` | Protected content management | 2 |
| `/studio/*` | Prompt and festival builders | 3 |
| `/api/ai/*` | Server-side AI endpoints | 4+ |

Navigation should prioritise: **Explore** (Prompts, Templates, Assets, AI Tools), **Create** (Builders when available), **Learn**, and **About**. On mobile use a compact menu and preserve a visible search entry point.

## 7. Content model and editorial rules

### 7.1 Required content types

**Prompt**
- `id`, `title`, `slug`, `summary`, `body`, `category`, `tags[]`
- `intendedTool` (optional), `language[]`, `style`, `aspectRatio` (optional)
- `referenceImageNotes` (optional), `religiousReviewStatus`
- `createdAt`, `updatedAt`, `publishedAt`, `featured`, `status`

**Template**
- `id`, `title`, `slug`, `description`, `category`, `previewImage`
- `downloadUrl` or `assetId`, `fileFormat[]`, `dimensions` (optional)
- `editableWith` (optional), `licence`, `attribution`, `status`, timestamps

**Asset**
- `id`, `title`, `slug`, `description`, `category`, `tags[]`
- `fileUrl/objectKey`, `previewUrl`, `fileType`, `fileSize`
- `licence`, `source`, `attribution`, `creator`, `status`, timestamps

**AI Tool**
- `id`, `name`, `slug`, `description`, `category`, `officialUrl`
- `freePlanStatus` (Free / Limited free / Trial / Paid / Unknown)
- `freePlanNotes`, `accountRequired`, `lastVerifiedAt`, `reviewedBy`, `status`

**Festival/Occasion**
- `id`, `name`, `slug`, `traditions[]`, `summary`, `significance`
- `dateDescription`, `dateSources[]`, `lastDateVerifiedAt`
- `relatedPromptSlugs[]`, `relatedTemplateSlugs[]`, `status`

**Guide**
- `id`, `title`, `slug`, `summary`, `body`, `topic`, `difficulty`
- `language`, `publishedAt`, `updatedAt`, `status`

### 7.2 Editorial and religious accuracy

- Clearly distinguish Jain traditions, sects, regions and local calendar variations when relevant.
- Do not publish an observance date as universal if credible calendars differ. State the source and date checked.
- No Hindu deities, symbols or rituals should be inserted into Jain-specific templates or prompts unless the content is explicitly comparative/educational and clearly labelled.
- Tirthankara depictions must be dignified and consistent with the reviewed reference/style guidance. Do not use a Tirthankara as a generic fictional character or decorative prop.
- Do not invent scripture quotations, mantras, historical facts, ritual steps or doctrinal claims.
- Mark AI-generated religious copy as a draft requiring human review.
- Every downloadable asset must have a known licence/permission status. Do not label an asset “free” merely because it is accessible online.
- Provide takedown/contact process for disputed copyrighted or religiously inappropriate material.

## 8. Recommended technology and architecture

### 8.1 Phase 1 stack

| Layer | Recommendation | Reason |
|---|---|---|
| Web framework | Astro (current stable major) + TypeScript | Fast content-first pages; ships little/no client JS by default |
| Interactive UI | React islands only where needed | Search controls and builders can be interactive without making every page a SPA |
| Styling | CSS variables/design tokens; Tailwind optional | Keep design system simple and avoid unnecessary dependencies |
| Content | Astro Content Collections with Markdown/MDX + schema validation | Version-controlled, editable, typed content without a DB |
| Search | Pagefind or an equivalent static search index | Search works without a database or search API |
| Hosting | Cloudflare Workers Static Assets (recommended) or Cloudflare Pages static deployment | CDN/static hosting and a path to server-side functions |
| Package manager | npm initially | Simple setup on Windows and broad compatibility |
| Testing | Astro check/TypeScript, Vitest for pure logic, Playwright for key journeys | Catch build, logic and browser regressions |

Use the current Node.js version required by the selected Astro release. Pin dependencies through the lockfile. Do not hard-code a specific version from an old tutorial; check the official Astro compatibility page when creating the project.

### 8.2 Phase 2+ backend stack

| Need | Recommendation | Use when |
|---|---|---|
| Relational database | Cloudflare D1 (SQLite) | CMS records, users/roles metadata, audit log and quotas |
| Object/file storage | Cloudflare R2 | Uploaded or managed image/design downloads |
| Server-side API | Cloudflare Workers / Pages Functions | Protected mutations and AI proxy endpoints |
| Admin protection | Cloudflare Access or an equivalent server-verified identity layer | Before exposing admin mutation APIs |
| Abuse protection | Cloudflare Turnstile + server-side rate limits | Public forms and AI endpoints |
| AI model provider | Pluggable provider adapter | Phase 4 only |

**Important architecture decision:** Do not add D1, R2, authentication or AI SDKs to Phase 1 simply because they may be needed later. Keep data access behind small interfaces so local content can be replaced by D1 later without rewriting page components.

### 8.3 Hosting decision

Prefer Cloudflare Workers for new Cloudflare deployments. For Phase 1, build a static Astro site and deploy the generated assets. When dynamic APIs are introduced, use the Cloudflare-supported Astro/Workers integration and prerender content pages where possible. Confirm the current deployment guide and adapter requirements at implementation time. Do not assume static asset requests and Worker/API requests have identical billing or limits.

### 8.4 AI provider abstraction (Phase 4)

Define an internal interface such as:
- `generateText(input, options) -> result`
- `estimateUsage(input, model) -> estimate` (where provider supports it)
- `getProviderStatus() -> status`

Implement provider-specific modules behind this interface. API routes call the internal service; browser code never calls a provider directly with a secret. Provider names, model IDs, budgets and enabled features are configuration, not hard-coded UI assumptions.

## 9. New-folder project structure

Create a completely new directory, for example:

```text
ai-jaingenius/
├── PRD.md                  # This document; product source of truth
├── CLAUDE.md               # AI coding-agent rules and project guardrails
├── README.md               # Setup, scripts, deployment and contribution guide
├── package.json
├── package-lock.json
├── astro.config.mjs
├── tsconfig.json
├── .gitignore
├── .env.example            # Names/placeholders only; never real secrets
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── assets/             # Small, approved static files for Phase 1
├── src/
│   ├── components/         # Shared Astro components; React only when interactive
│   ├── layouts/
│   ├── pages/
│   ├── content/
│   │   ├── config.ts
│   │   ├── prompts/
│   │   ├── templates/
│   │   ├── assets/
│   │   ├── tools/
│   │   ├── festivals/
│   │   └── guides/
│   ├── lib/                # Search, formatting, validation and shared helpers
│   ├── styles/
│   └── types/
├── tests/
└── migrations/             # Add only in Phase 2 when D1 is introduced
```

Do not create empty future-phase directories unless needed. The structure above is the target direction; evolve it only for a clear reason.

## 10. Design and user experience requirements

### 10.1 Brand direction

- Product name: **Jain AI**.
- Endorsement: **by Jain Genius**.
- Suggested tagline: **Create. Explore. Celebrate. AI for the Jain Community.**
- Visual approach: modern SaaS clarity with a restrained Jain/Indian cultural identity.
- Suggested palette: deep maroon, warm cream, muted saffron, antique gold and charcoal. Use gold as an accent, not as body-text colour.
- Avoid a cluttered religious-poster appearance for the application UI. Save ornate decoration for festival content and visual previews.
- Use real, reviewed Jain imagery and symbols; do not create unofficial marks that could be mistaken for official Jain Genius or temple logos.

### 10.2 Usability requirements

- Mobile-first responsive layout; many users will arrive from WhatsApp and Instagram.
- Prominent search and obvious category navigation.
- Cards must explain what a resource does before the user opens it.
- Copy buttons show a visible success state and remain keyboard accessible.
- Download pages display format, file size, licence and attribution before download.
- Use clear labels such as “Prompt”, “Template”, “Download”, “External tool” and “AI-generated draft”.
- Do not use fake loading states or buttons that do nothing.
- Show an honest empty state when a category has no content.

## 11. Search, SEO and content discovery

- Search title, summary, body, category and tags across published content.
- Provide category filters and useful sort order (featured, newest, alphabetical where appropriate).
- Search results should be accessible by keyboard and have a clear no-results state.
- Every content detail page has a unique title, description, canonical URL and Open Graph metadata.
- Generate sitemap and robots.txt; use semantic headings and descriptive link text.
- Use structured data only when accurate and relevant; do not manufacture ratings, reviews or event dates.
- Add related resources to prompt, festival, guide and template detail pages.
- Use optimised AVIF/WebP previews, explicit image dimensions and lazy loading for below-the-fold images.

## 12. Security, privacy and operational safeguards

Phase 1:
- No accounts and no unnecessary personal-data collection.
- Do not commit credentials, private keys, tokens or `.env` files.
- External links should be recognisable and opened safely (`rel="noopener noreferrer"` when opening a new tab).
- Avoid rendering untrusted HTML from content files.

Phase 2+:
- Validate every API input on the server.
- Enforce role checks on every admin API call, not only in the UI.
- Apply file size/type restrictions and generate safe object keys; never trust uploaded filenames.
- Keep private uploads private unless explicitly approved for public distribution.
- Add rate limits to all public mutation and AI endpoints.
- Store only the minimum personal information required; publish a privacy notice before collecting it.
- Define backup, restore, error monitoring and incident-response steps before production CMS launch.

## 13. Quality attributes and measurable targets

| Area | Target |
|---|---|
| Performance | Aim for Lighthouse 90+ on Performance, Accessibility, Best Practices and SEO for core public pages on representative mobile/desktop runs |
| Core Web Vitals | Aim for LCP ≤ 2.5s, INP ≤ 200ms and CLS ≤ 0.1 in field data where measurable |
| Accessibility | WCAG 2.2 AA as the design and test target |
| Reliability | Static content pages remain readable if a future AI provider is unavailable |
| Responsiveness | Support small mobile screens through wide desktop screens without horizontal overflow |
| Maintainability | TypeScript strict mode, typed content schemas, small components and documented scripts |
| Security | No secrets in client code; protected server endpoints; dependency and input validation |
| SEO | Unique metadata, sitemap, canonical URLs, semantic HTML and crawlable content |

These are targets to test, not guarantees. Lighthouse scores vary with environment and must be measured consistently.

## 14. Analytics and success metrics

Do not add intrusive tracking in Phase 1. Prefer privacy-conscious aggregate analytics if needed.

Measure:
- Visits to resource categories and detail pages.
- Search queries with no personal information.
- Prompt copies and asset/template downloads.
- Click-throughs to official AI tool websites.
- Most-used festival kits and resource categories.
- Return visits and contribution submissions (after contribution flow exists).
- AI tool usage, failure rate and cost per successful generation (Phase 4+).

Initial success definition: visitors can find a relevant Jain resource and successfully copy/download it; the library grows consistently; broken links and unlicensed assets remain low; and the platform runs within an explicitly chosen monthly budget.

## 15. Testing and release gates

Before each phase is considered complete:
- Run clean install, type check, lint and production build.
- Test all primary routes and navigation on mobile and desktop.
- Test search, filters, copy actions, downloads and external links.
- Check keyboard-only navigation, visible focus, labels and contrast.
- Check 404, empty, loading and error states.
- Verify metadata, canonical URLs, sitemap and robots rules.
- Check image size, alt text and layout stability.
- Run Playwright journeys for critical flows once the test suite exists.
- Confirm no secrets or personal data were committed.
- Review religious content and asset permissions before publication.

No phase is “done” because the page merely looks finished. Its acceptance criteria and regression checks must pass.

## 16. Claude Code implementation protocol

This PRD is the product source of truth. Claude Code must follow these rules:

1. Work only inside the new `ai-jaingenius` folder. Do not inspect, edit, reformat, delete or commit changes to the existing Jain Genius website repository unless explicitly instructed in a separate request.
2. Before coding, inspect the current folder, package files and this PRD. Do not assume a framework or dependency has already been installed.
3. Implement one milestone/feature per coding session. Do not silently jump to later phases.
4. Start each milestone by stating the files expected to change and the acceptance criteria being addressed.
5. Prefer the smallest implementation that satisfies the requirement. Avoid premature abstractions and unnecessary dependencies.
6. Do not add a database, authentication, storage service, AI provider, payment system or analytics SDK before its planned phase.
7. Do not expose secrets in client code, commits, screenshots or logs.
8. Use real content examples, but label unverified religious dates and claims. Never invent source/permission details for assets.
9. After changes, run type checks, lint and build; fix failures rather than suppressing them. Add/update tests for non-trivial logic.
10. Report files changed, commands run, test/build results, known limitations and the next milestone. Do not claim a feature is complete if its acceptance criteria are not met.
11. Keep `PRD.md`, `README.md`, schemas and implementation aligned. When a requirement genuinely changes, propose the PRD change instead of quietly contradicting it.
12. Do not create placeholder buttons or dead links. Hide unfinished features or mark them clearly as coming later.

### Suggested first Claude Code instruction

```text
Read PRD.md completely before doing anything. This is a new, independent project for ai.jaingenius.org. First inspect the current folder and report its state. Do not modify any other repository or folder. Do not implement the whole product in one pass.

Begin with Phase 0 only. Propose a short milestone plan for Phase 0, identify the minimum dependencies, and explain the Cloudflare static deployment approach. Wait for my approval before making code changes. Respect every phase boundary and acceptance criterion in PRD.md.
```

## 17. Risks, decisions and open items

| Risk / decision | Mitigation or default |
|---|---|
| AI generation becomes expensive | Keep AI out of MVP; add explicit quotas and hard budgets before Phase 4/5 |
| Third-party “free” plans change | Store `lastVerifiedAt`; re-check provider pages; label limitations and link official sources |
| Religious inaccuracies | Human review, source tracking and clear tradition/region distinctions |
| Copyright or unclear asset rights | Publish licence/attribution metadata; reject unclear assets; provide takedown contact |
| Scope creep | Enforce phase boundaries and “one feature per session” |
| Content becomes stale | Assign an owner and review cadence for tools, dates and external links |
| Backend complexity too early | Start with static content; add D1/R2 only when Phase 2 needs them |
| User uploads introduce abuse | Defer public uploads until moderation, storage and security controls exist |

### Decisions fixed for the initial build

- New independent folder/repository: `ai-jaingenius`.
- Product/brand: Jain AI — by Jain Genius.
- Framework: Astro + TypeScript; React only for interactive islands.
- Phase 1 content: Markdown/MDX and typed local content collections.
- Search: static search index (Pagefind or equivalent).
- Hosting direction: Cloudflare static assets/Workers; verify current Astro deployment guide during setup.
- Database: none in Phase 1; Cloudflare D1 in Phase 2 if CMS is approved.
- File storage: repository assets in Phase 1; Cloudflare R2 in Phase 2 when managed uploads are needed.
- AI: no provider integration before Phase 4; image generation no earlier than Phase 5.
- Accounts: none in Phase 1; admin-only identity protection in Phase 2.
- Payments: out of scope for the foreseeable first release.

## 18. Official technical references

Check current documentation during implementation because framework and platform requirements can change:

- Astro documentation: https://docs.astro.build/
- Astro Cloudflare deployment guide: https://docs.astro.build/en/guides/deploy/cloudflare/
- Cloudflare Workers — Astro framework guide: https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
- Cloudflare Workers Static Assets billing and limitations: https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
- Cloudflare Workers platform limits: https://developers.cloudflare.com/workers/platform/limits/
- Cloudflare D1 documentation: https://developers.cloudflare.com/d1/
- Cloudflare R2 documentation: https://developers.cloudflare.com/r2/
- Pagefind documentation: https://pagefind.app/
- Web Content Accessibility Guidelines: https://www.w3.org/TR/WCAG22/

---

**End of PRD — Jain AI v1.0**
