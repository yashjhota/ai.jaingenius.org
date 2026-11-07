# Jain AI — ai.jaingenius.org

**Jain AI, by Jain Genius.** A free-first digital creativity and AI resource hub for the Jain
community: prompts, festival templates, Jain digital assets, AI tool guides and tutorials.

`PRD.md` is the product source of truth. `CLAUDE.md` holds the rules for AI coding agents.
This is an independent project. It does not share code with the main jaingenius.org website.

## Status

| Phase                   | State                        |
| ----------------------- | ---------------------------- |
| 0 — Project foundation  | Done                         |
| 1 — Public Resource Hub | In progress (M1.1–M1.4 done) |
| 2+ — CMS, builders, AI  | Not started                  |

## Requirements

- Node.js **22.23.4 or newer** (the minimum for the Astro 7 release in use; see the `engines`
  field in `package.json`)
- npm 9.6.5 or newer

## Getting started

```bash
npm ci          # clean install from package-lock.json
npm run dev     # local dev server at http://localhost:4321
```

## Scripts

| Script                 | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start the local dev server                          |
| `npm run build`        | Type-check (`astro check`), then build to `dist/`   |
| `npm run preview`      | Serve the built `dist/` locally                     |
| `npm run check`        | Type-check Astro and TypeScript files only          |
| `npm run lint`         | Run ESLint                                          |
| `npm run format`       | Format all files with Prettier                      |
| `npm run format:check` | Check formatting without changing files             |
| `npm run test`         | Run unit tests (Vitest) once                        |
| `npm run previews`     | Render PNG previews for SVGs in `public/downloads/` |
| `npm run test:watch`   | Run unit tests in watch mode                        |
| `npm run deploy`       | Build, then deploy to Cloudflare with Wrangler      |

Before every commit, run:
`npm run check && npm run lint && npm run format:check && npm test && npm run build`.

## Adding content

Content lives in `src/content/<type>/` as Markdown files. The filename becomes the URL slug,
for example `src/content/prompts/paryushan-greeting-poster.md` → `/prompts/paryushan-greeting-poster`.
Files starting with `_` are ignored.

| Folder       | Type                | Markdown body holds              |
| ------------ | ------------------- | -------------------------------- |
| `prompts/`   | Prompt              | The prompt text visitors copy    |
| `templates/` | Template            | Extra details and how to edit    |
| `assets/`    | Digital asset       | Extra details and usage notes    |
| `tools/`     | AI tool             | How to get started with the tool |
| `festivals/` | Festival / occasion | Significance and observances     |
| `guides/`    | Learning guide      | The tutorial                     |

Fields are defined and validated in `src/content.config.ts`. Allowed categories, licences and
traditions are in `src/lib/taxonomy.ts`. A bad value fails the build.

**Draft vs published.** New entries default to `status: draft` and never appear on the site.
Drafts may be incomplete. Setting `status: published` makes the build check that the entry has
what visitors rely on (`src/lib/publish-rules.ts`):

- Every type: `publishedAt`.
- Templates: preview image, file format, licence, and a download link or linked asset.
- Assets: file, file type, file size, licence, source and creator.
- AI tools: `accountRequired`, `lastVerifiedAt` and `reviewedBy`.
- Festivals: at least one entry in `dateSources` and `lastDateVerifiedAt`.
- CC BY / CC BY-SA licences always need an `attribution` line.

Religious content (prompts, templates, assets, festivals) carries `religiousReviewStatus`.
Leave it `pending` until a knowledgeable reviewer approves it.

**Templates and assets (downloads).**

1. Put the downloadable file in `public/downloads/` (keep files small; large files move to R2
   in Phase 2).
2. For SVG files, run `npm run previews` to create a PNG preview in `src/assets/previews/`.
   For other formats, add a PNG or JPG preview there yourself.
3. Create the Markdown entry with `downloadUrl` (templates) or `file` (assets),
   `previewImage: ../../assets/previews/<name>.png`, `previewAlt`, and a `licence`.

File sizes are read from the file at build time. If a download file is missing, the build fails.
Every preview needs `previewAlt` text.

Pages read content only through `src/lib/content.ts` (`getPublished`, `getBySlug`,
`getRelated`, `getRecent`, `getPublishedRefs`), which returns published entries only.

## Project structure

```text
public/              Static files copied as-is (favicon, robots.txt, small approved assets)
src/components/      Shared Astro components (React only for interactive islands, later)
src/layouts/         Page layouts (BaseLayout handles SEO meta, header, footer)
src/content/         Content entries (Markdown), one folder per type
src/content.config.ts  Content schemas and publish rules wiring
src/lib/site.ts      Site name, tagline and navigation (add nav items only when pages exist)
src/lib/content.ts   Data layer used by pages (published entries only)
src/lib/resources.ts Sorting, filtering and "related" logic (plain TypeScript, unit-tested)
src/lib/publish-rules.ts  What an entry needs before it can be published
src/lib/taxonomy.ts  Allowed categories, licences, traditions and their labels
src/lib/format.ts    Date and file-size formatting
src/pages/           Routes (file-based)
src/styles/          Design tokens (tokens.css) and global styles
tests/unit/          Vitest unit tests
astro.config.mjs     Astro config (static output, MDX, sitemap)
wrangler.jsonc       Cloudflare Workers Static Assets config
```

## Deployment (Cloudflare Workers Static Assets)

The site is a fully static Astro build. Cloudflare serves the files in `dist/` through Workers
Static Assets. No Worker script runs and no server adapter is needed yet. `wrangler.jsonc` sets
`not_found_handling: "404-page"`, so unknown URLs get `dist/404.html` with a 404 status.

URLs have no trailing slash (`/prompts/paryushan-greeting-poster`). Astro builds each page to an
`.html` file (`build.format: 'file'`), and Cloudflare serves it at the clean URL. Requests ending
in `.html` or `/` redirect to the clean URL. Test this locally with `npx wrangler dev` after a build.

First-time setup (once per machine):

```bash
npx wrangler login            # opens a browser to authorise your Cloudflare account
```

Deploy:

```bash
npm run deploy                # astro check + astro build + wrangler deploy
```

Custom domain: in the Cloudflare dashboard, go to **Workers & Pages → ai-jaingenius → Settings →
Domains & Routes → Add → Custom domain** and enter `ai.jaingenius.org`. The `jaingenius.org` zone
must be on the same Cloudflare account.

Alternative: connect the Git repository in the Cloudflare dashboard (Workers Builds) with build
command `npm run build` and deploy command `npx wrangler deploy`.

References: [Astro on Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/) ·
[Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) ·
[Billing and limits](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)

## Environment and secrets

Phases 0–1 need no environment variables. `.env.example` lists placeholder names only.
Never commit `.env`, `.dev.vars` or any real keys.

## Known notes

- TypeScript is pinned to `~6.0` because `@astrojs/check` and `typescript-eslint` do not support
  TypeScript 7 yet.
- `npm audit` reports a moderate `minimatch` advisory that comes in through the ESLint dev
  toolchain. It is dev-only and not shipped to the site. Recheck when ESLint updates.
