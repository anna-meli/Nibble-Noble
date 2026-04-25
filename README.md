<div align="center">

# Nibble & Noble

_A dark, editorial food journal for date-night verdicts._
_Written like a notebook, not a press release._

[**Visit the live site →**](https://anna-meli.github.io/Nibble-Noble/)

</div>

---

A dark, editorial food journal built for long-form restaurant criticism, date-night notes, and honest verdicts. This is not a recipe site and it does not pretend to be one. The writing model here is venue, context, meal, verdict.

## What It Is

Nibble & Noble is a static Astro site for publishing restaurant reviews in a critic's voice. Reviews are written in MDX, collected through Astro Content Collections, and rendered into a cozy dark interface with sage accents, Literata display type, and a reading-first layout.

## Stack

- `Astro` with static output
- `TypeScript`
- `Tailwind CSS`
- `MDX` for reviews
- `Astro Content Collections` with `zod` validation
- `RSS` via `@astrojs/rss`

## Quick Start

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run check
npm run build
npm run preview
```

## Content Model

Reviews live in:

```text
src/content/reviews/
```

Each review is an `.mdx` file with frontmatter validated in `src/content/config.ts`.

Required fields:

- `title`
- `description`
- `pubDate`
- `venue`
- `location`

Optional fields:

- `rating`
- `priceBand`
- `cuisine`
- `heroImage`
- `tags`
- `featured`

Suggested review body structure:

```md
## Setting

## The meal

## Verdict
```

## Routes

- `/` home page
- `/reviews` reviews index
- `/reviews/:slug` individual review
- `/about` about page
- `/rss.xml` feed

## Project Shape

```text
src/
  components/
  content/reviews/
  layouts/
  pages/
  styles/
public/
.codex/skills/
```

Key files:

- `src/pages/index.astro` homepage
- `src/pages/reviews/index.astro` reviews listing
- `src/pages/reviews/[...slug].astro` individual review page
- `src/components/Header.astro` top navigation and search
- `src/styles/global.css` theme tokens and global styling
- `agents.md` maintainer context for working on the repo

## Design Notes

- Dark-only palette
- Literata for display, Source Sans 3 for interface/body
- Warm stone backgrounds with sage accents
- Reading-first layout over marketing layout
- Critic voice over SEO filler

## Review Workflow

To add a review manually:

1. Create a new file in `src/content/reviews/your-slug.mdx`
2. Add valid frontmatter
3. Write the review body
4. Run `npm run check`

There is also a repo-local Codex skill for this:

```text
.codex/skills/add-review/SKILL.md
```

It is intended to gather the missing details and draft a review file in the house style.

## Deployment

The site is set up for static deployment, including GitHub Pages.

Environment variables used at build time:

- `SITE_URL`
- `BASE_PATH`

If deploying under a repo subpath, set `BASE_PATH` accordingly.

## Tone

Nibble & Noble is written like a shared date-night notebook: specific, opinionated, affectionate when earned, and willing to call a miss when a meal does not land.
