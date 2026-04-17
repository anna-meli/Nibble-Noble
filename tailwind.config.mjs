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
        },
      },
      fontFamily: {
        display: ['"Literata"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        cozy: '0 2px 12px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
};
