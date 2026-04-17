import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

/**
 * GitHub Actions sets SITE_URL + BASE_PATH for project Pages
 * (e.g. SITE_URL=https://owner.github.io, BASE_PATH=/Nibble-Noble).
 * Local dev: omit env vars; defaults keep paths at `/`.
 */
const site = process.env.SITE_URL || 'https://example.com';
const rawBase = process.env.BASE_PATH?.trim();
const base =
  rawBase && rawBase !== '/'
    ? (rawBase.startsWith('/') ? rawBase : `/${rawBase}`).replace(/\/$/, '')
    : undefined;

export default defineConfig({
  site,
  ...(base ? { base } : {}),
  integrations: [tailwind({ applyBaseStyles: false }), mdx()],
});
