# Nibble & Noble — agent and maintainer context

## What this project is

**Nibble & Noble** is a static **food critic blog** (dining reviews and long-form criticism), **not** a recipe site. Sample copy and navigation use a critic’s voice: venue, setting, meal, verdict.

## Stack

- **Astro** (static output) with **TypeScript** (strict base via `astro/tsconfigs/strict`).
- **Tailwind CSS** via `@astrojs/tailwind` (`tailwind.config.mjs`, `src/styles/global.css`).
- **MDX** via `@astrojs/mdx` for review bodies under `src/content/reviews/`.
- **Content Collections** with Zod schemas in `src/content/config.ts`.
- **RSS** at `/rss.xml` from `src/pages/rss.xml.ts` (`@astrojs/rss`).

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve dist
npm run check    # astro check
```

## Site configuration

- **Production URL:** set `site` in [`astro.config.mjs`](astro.config.mjs) (placeholder `https://example.com`). RSS and canonical URLs depend on this.
- **Manifest:** [`public/site.webmanifest`](public/site.webmanifest) — name/theme for installable hinting.

## Routes

| Path | File | Purpose |
|------|------|---------|
| `/` | `src/pages/index.astro` | Hero, featured reviews, recent list |
| `/reviews` | `src/pages/reviews/index.astro` | All reviews |
| `/reviews/:slug` | `src/pages/reviews/[...slug].astro` | Single review (MDX) |
| `/about` | `src/pages/about.astro` | Editorial about page |
| `/404` | `src/pages/404.astro` | Not found |
| `/rss.xml` | `src/pages/rss.xml.ts` | Feed |

## Content: reviews collection

- **Location:** `src/content/reviews/*.mdx`
- **Schema:** `src/content/config.ts` (`reviews` collection).

### Frontmatter (required unless noted optional)

| Field | Type | Notes |
|-------|------|--------|
| `title` | string | Headline |
| `description` | string | Dek / SEO description |
| `pubDate` | date (ISO string) | Publication date |
| `venue` | string | Restaurant or establishment |
| `location` | string | City / neighborhood |
| `rating` | number, optional | **1–5** scale (stars + numeric in UI) |
| `priceBand` | optional | One of `$`, `$$`, `$$$`, `$$$$` |
| `cuisine` | optional | Short label |
| `heroImage` | optional | URL path under site root, e.g. `/images/review-hero.svg` |
| `tags` | optional | string array |
| `featured` | optional | `true` to prefer on home “Featured reviews” |

### Body

Write the critique in MDX/Markdown. Suggested section headings (optional): `## Setting`, `## The meal`, `## Verdict`.

### Adding a review

1. Add `your-slug.mdx` under `src/content/reviews/`.
2. Fill frontmatter to match the schema.
3. Run `npm run build` (or `npm run check`) to validate.

The public URL is `/reviews/<slug>/` where `<slug>` is the filename without extension.

## Design tokens (dark-only)

Defined as CSS variables in `src/styles/global.css` and exposed to Tailwind as `nn.*` colors in `tailwind.config.mjs`:

- **Background:** `--nn-bg` — warm charcoal.
- **Surfaces:** `--nn-surface`, `--nn-elevated`.
- **Text:** `--nn-text`, muted `--nn-muted`, highlight `--nn-cream`.
- **Accent:** `--nn-sage` (links, chips, focus).
- **Borders:** `--nn-border`, `--nn-accent-border`.

**Typography:** Google Fonts in `BaseLayout.astro` — **Literata** (display) and **Source Sans 3** (UI/body). Prose for MDX uses the `.nn-prose` class via `Prose.astro`.

**Aesthetic:** Cozy rustic — rounded cards (`rounded-2xl`), soft shadow (`shadow-cozy`), sage + cream on dark stone.

## Key components

- `Header.astro` — brand, nav, disabled search stub.
- `Footer.astro` — footer copy.
- `ReviewCard.astro` — list card for a collection entry.
- `RatingStars.astro` — 1–5 display.
- `TagList.astro` — tag pills.
- `Prose.astro` — wraps MDX body with `.nn-prose`.

## Images

- Static files live in `public/` (e.g. `public/images/review-hero.svg` → `/images/review-hero.svg`).
- Optional per-review `heroImage`. If omitted, cards use a gradient placeholder.
- Default Open Graph image: `/og-default.svg`.

## Deployment

Build output is static (`dist/`). Host on any static host (Netlify, Vercel, GitHub Pages, S3, etc.). Remember to set `site` in `astro.config.mjs` for correct absolute URLs in RSS and meta.

## Out of scope (scaffold)

CMS, comments, analytics, auth, JSON-LD `Review`/`Restaurant` schema — optional follow-ups.
