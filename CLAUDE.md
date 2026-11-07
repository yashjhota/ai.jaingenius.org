# CLAUDE.md — Jain AI (ai.jaingenius.org)

`PRD.md` is the product source of truth. Read the relevant sections before each milestone.

## Guardrails (from PRD §16)

1. Work only inside this folder. Never touch the main jaingenius.org website repository.
2. One milestone per session. At the start, state the files expected to change and the
   acceptance criteria being addressed. Do not jump to later phases.
3. Smallest implementation that meets the requirement. No speculative abstractions or extra
   dependencies.
4. No database, auth, storage service, AI provider, payments or analytics SDK before its phase
   (D1/R2/Access: Phase 2; AI text: Phase 4; images: Phase 5).
5. No secrets in code, commits, logs or screenshots.
6. Religious content: never invent dates, scripture, mantras, ritual steps or doctrine. Mark
   unverified religious content `religiousReviewStatus: pending` and show it as "Pending review".
   Never invent asset sources or licences.
7. No placeholder buttons or dead links. Add a nav item to `src/lib/site.ts` only once its page
   exists. Label unfinished features "Coming soon" without a link.
8. Core pages must work for reading and navigation without client-side JavaScript.
9. After every change, run `npm run check && npm run lint && npm run format:check && npm test && npm run build`
   and fix failures. Do not suppress them. Add tests for non-trivial logic.
10. Report files changed, commands run, results, known limitations and the next milestone.
11. Keep `PRD.md`, `README.md`, schemas and code aligned. If a requirement changes, propose a
    PRD edit instead of quietly contradicting it.

## Conventions

- Astro + TypeScript strict. Static output. React only for interactive islands.
- Styling: CSS custom properties in `src/styles/tokens.css`, component-scoped `<style>`. No
  Tailwind. Gold (`--accent`) is an accent only, never body text.
- Pages read content only through `src/lib/content.ts` (never `getCollection` directly), so
  Phase 2 can swap the source to D1. Keep logic in `src/lib/resources.ts` and unit-test it.
- New categories, licences or traditions go in `src/lib/taxonomy.ts`. Publish requirements go
  in `src/lib/publish-rules.ts`, with tests.
- Every page uses `BaseLayout` and passes a unique `title` and `description`.
- External links that open a new tab use `rel="noopener noreferrer"` and say so to screen
  readers.
- Pin TypeScript to `~6.0` until `@astrojs/check` and `typescript-eslint` support 7.

## Implementation plan

Phase 1 milestones: M1.1 content schemas and data layer → M1.2 shared UI → M1.3 prompts →
M1.4 templates and assets → M1.5 AI tools → M1.6 festivals and learn → M1.7 Pagefind search →
M1.8 static pages, homepage and SEO → M1.9 QA gate (Playwright, axe, Lighthouse).
