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

[`astro.config.mjs`](astro.config.mjs) reads **environment variables** at build time:

| Variable | Example | Purpose |
|----------|---------|---------|
| `SITE_URL` | `https://yourname.github.io` | Astro `site` — origin for RSS, canonicals, OG. |
| `BASE_PATH` | `/Nibble-Noble` or unset | Astro `base` — required for **project** GitHub Pages (`/repo/`). Omit or leave empty for a **user** site repo named `yourname.github.io` (site at domain root). |

Local `npm run dev` / `npm run build` without these vars uses defaults (`https://example.com`, no subpath).

- **Manifest:** [`public/site.webmanifest`](public/site.webmanifest) uses relative `start_url` / `scope` / `icons` so it works under a repo subpath.

## GitHub Pages (GitHub Actions)

Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). On each push to `main`, it installs dependencies, builds with `SITE_URL` and `BASE_PATH`, uploads `dist/`, and deploys via **GitHub Pages**.

**One-time repo setup**

1. GitHub → **Settings** → **Pages** → **Build and deployment** → Source: **GitHub Actions**.
2. Push to `main` (or run the workflow manually). The site URL will be `https://<owner>.github.io/<repo>/` for normal repos, or `https://<owner>.github.io/` if the repository is `<owner>.github.io`.

**Path helpers:** internal links and static assets use [`src/utils/site.ts`](src/utils/site.ts) (`sitePath`, `absoluteUrl`) so navigation, RSS, and images stay correct when `base` is set.

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

- **Background:** `--nn-bg` — warm charcoal. Deep panel surface `--nn-bg-deep` (used in the single-review verdict card gradient).
- **Surfaces:** `--nn-surface`, `--nn-elevated`.
- **Text:** `--nn-text`, muted `--nn-muted`, highlight `--nn-cream`.
- **Accent:** `--nn-sage` (links, chips, focus, verdict card numerals). `--nn-copper` is reserved as a warm accent (defined but currently unused after the sage-first verdict styling).
- **Borders:** `--nn-border`, `--nn-accent-border` (sage-tinted).
- **Shadows:** `shadow-cozy` (default cards) and `shadow-cozy-lg` (heavier elevation for the verdict card).

**Typography:** Google Fonts in `BaseLayout.astro` — **Literata** (display) and **Source Sans 3** (UI/body). Prose for MDX uses the `.nn-prose` class via `Prose.astro`. The `.nn-eyebrow` utility (also in `global.css`) renders a small caps + leading-rule label and is used by the verdict card; reuse it for any future section eyebrows.

**Aesthetic:** Cozy rustic — rounded cards (`rounded-2xl`), soft shadow (`shadow-cozy`), sage + cream on dark stone.

## Key components

- `Header.astro` — brand, nav, disabled search stub.
- `Footer.astro` — footer copy.
- `ReviewCard.astro` — list card for a collection entry.
- `RatingStars.astro` — 1–5 display.
- `TagList.astro` — tag pills.
- `Prose.astro` — wraps MDX body with `.nn-prose`.

## Single review page anatomy

`src/pages/reviews/[...slug].astro` renders, in order:

1. **Header block** — venue · location · price band, title, dek, date, cuisine, `RatingStars`, tags.
2. **Hero image** — optional, when `heroImage` is set.
3. **Prose body** — the MDX `<Content />` wrapped in `Prose.astro`.
4. **Verdict card** — auto-rendered when `rating != null`. Pulls `venue`, `location`, and `rating.toFixed(1)` from frontmatter, rendered inside an `<aside>` styled with `border-nn-accent-border`, the `from-nn-surface to-nn-bg-deep` gradient, `shadow-cozy-lg`, and the `.nn-eyebrow` "The verdict" label. Reviewers do not author it — it's part of the page template.
5. **Footer** — "← Back to all reviews" link.

## Images

- Static files live in `public/` (e.g. `public/images/review-hero.svg` → `/images/review-hero.svg`).
- Optional per-review `heroImage`. If omitted, cards use a gradient placeholder.
- Default Open Graph image: `/og-default.svg`.

## Deployment (other hosts)

Build output is static (`dist/`). For hosts other than the Actions workflow above, set `SITE_URL` and (if the site is not at the domain root) `BASE_PATH` when running `npm run build`, or adjust `astro.config.mjs` defaults.

## Out of scope (scaffold)

CMS, comments, analytics, auth, JSON-LD `Review`/`Restaurant` schema — optional follow-ups.
