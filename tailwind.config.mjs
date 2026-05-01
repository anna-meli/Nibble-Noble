/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        nn: {
          bg: 'var(--nn-bg)',
          surface: 'var(--nn-surface)',
          muted: 'var(--nn-muted)',
          text: 'var(--nn-text)',
          cream: 'var(--nn-cream)',
          sage: 'var(--nn-sage)',
          border: 'var(--nn-border)',
          copper: 'var(--nn-copper)',
          'bg-deep': 'var(--nn-bg-deep)',
          'accent-border': 'var(--nn-accent-border)',
        },
      },
      fontFamily: {
        display: ['"Literata"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        cozy: '0 2px 12px rgba(0, 0, 0, 0.35)',
        'cozy-lg': '0 22px 60px -18px rgba(0, 0, 0, 0.6), 0 6px 20px -8px rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
};
