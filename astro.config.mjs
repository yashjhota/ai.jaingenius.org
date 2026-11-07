// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Static build for Cloudflare Workers Static Assets (Phase 0/1).
// No server adapter until a phase actually needs server-side code.
export default defineConfig({
  site: 'https://ai.jaingenius.org',
  output: 'static',
  // Clean URLs without trailing slashes (/prompts/x). Pages build to x.html, which
  // Cloudflare's auto-trailing-slash handling serves at /prompts/x with no redirect.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [mdx(), sitemap()],
});
