# Jain AI — ai.jaingenius.org

**Jain AI, by Jain Genius.** A free-first digital creativity and AI resource hub for the Jain
community: prompts, festival templates, Jain digital assets, AI tool guides and tutorials.

`PRD.md` is the product source of truth. `CLAUDE.md` holds the rules for AI coding agents.
This is an independent project. It does not share code with the main jaingenius.org website.

## Status

| Phase                   | State       |
| ----------------------- | ----------- |
| 0 — Project foundation  | Done        |
| 1 — Public Resource Hub | Next        |
| 2+ — CMS, builders, AI  | Not started |

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

| Script                 | What it does                                      |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | Start the local dev server                        |
| `npm run build`        | Type-check (`astro check`), then build to `dist/` |
| `npm run preview`      | Serve the built `dist/` locally                   |
| `npm run check`        | Type-check Astro and TypeScript files only        |
| `npm run lint`         | Run ESLint                                        |
| `npm run format`       | Format all files with Prettier                    |
| `npm run format:check` | Check formatting without changing files           |
| `npm run deploy`       | Build, then deploy to Cloudflare with Wrangler    |

Before every commit, run: `npm run check && npm run lint && npm run format:check && npm run build`.

## Project structure

```text
public/              Static files copied as-is (favicon, robots.txt, small approved assets)
src/components/      Shared Astro components (React only for interactive islands, later)
src/layouts/         Page layouts (BaseLayout handles SEO meta, header, footer)
src/lib/site.ts      Site name, tagline and navigation (add nav items only when pages exist)
src/pages/           Routes (file-based)
src/styles/          Design tokens (tokens.css) and global styles
astro.config.mjs     Astro config (static output, MDX, sitemap)
wrangler.jsonc       Cloudflare Workers Static Assets config
```

## Deployment (Cloudflare Workers Static Assets)

The site is a fully static Astro build. Cloudflare serves the files in `dist/` through Workers
Static Assets. No Worker script runs and no server adapter is needed yet. `wrangler.jsonc` sets
`not_found_handling: "404-page"`, so unknown URLs get `dist/404.html` with a 404 status.

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
