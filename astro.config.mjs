import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// Replace with your production URL before deploy (also noted in agents.md).
export default defineConfig({
  site: 'https://example.com',
  integrations: [tailwind({ applyBaseStyles: false }), mdx()],
});
