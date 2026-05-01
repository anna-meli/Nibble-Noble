---
name: add-review
description: Add a new Nibble & Noble review in src/content/reviews. Use when the user wants to create, draft, or publish a new restaurant review, or has dining notes that should be turned into a review MDX file. Ask for any missing frontmatter and review details before writing.
---

# Add Review

Use this skill when the user wants to add a new review to Nibble & Noble.

## Goal

Create a valid review file under `src/content/reviews/<slug>.mdx` that matches the local content schema, the site's critic voice, and the per-dish + polaroid layout established by the Glasshouse Lounge review.

## Required repo facts

- Reviews live in `src/content/reviews/`.
- The `reviews` collection schema is defined in `src/content/config.ts`.
- Per-dish polaroids use the `Polaroid.astro` component at `src/components/Polaroid.astro`.
- Inline polaroid row styles live in `src/styles/global.css` under `.nn-polaroid-row`.
- The single-review template (`src/pages/reviews/[...slug].astro`) auto-renders a "verdict card" after the MDX body when `rating` is set in frontmatter. The card pulls `venue`, `location`, and `rating` (formatted as `x.x / 5`) from frontmatter — so those fields are doing double duty (header + verdict card). The reviewer never adds this card by hand; it appears automatically.
- Required frontmatter:
  - `title`
  - `description`
  - `pubDate`
  - `venue`
  - `location`
- Optional frontmatter:
  - `rating` from `1` to `5` (decimals allowed, e.g. `4.8`)
  - `priceBand` from `$`, `$$`, `$$$`, `$$$$`
  - `cuisine`
  - `heroImage`
  - `tags`
  - `featured`

## Reviewers

Reviews are written from the perspective of two diners, **S** and **A**, who score and comment on each dish independently. Default to this pair unless the user names different reviewers. Their per-dish scores are independent — the overall `rating` in frontmatter is an editorial call, not the arithmetic average.

## Image convention

Place all dish images for a review under:

```
public/reviews/<slug>/<image-name>
```

- The slug folder uses kebab-case to match the MDX slug (e.g. `glasshouse-lounge-restaurant`).
- If the user uploaded images into `src/content/reviews/<something>/`, move them to `public/reviews/<slug>/` and remove the source folder.
- `heroImage` in frontmatter references `/reviews/<slug>/<file>` (path under `/public/`).
- Pick whichever dish photo best represents the meal as the hero, unless the user specifies one.

## Intake workflow

First, inspect what the user already gave you. Do not ask for fields they already supplied clearly. Use `AskUserQuestion` for grouped follow-ups when several pieces are missing.

Collect these details before drafting:

- Venue name
- Location (include the building/hotel/landmark if relevant)
- Publication date
- Rating out of 5 (decimals allowed) and whether it should be shown
- Price band
- Cuisine
- Whether the review should be featured
- Tags
- The setting: room, service, view, music, dress code, mood
- The list of dishes in the order they were served
- For each dish: a short description (ingredients/preparation), an S score, an A score, an S note, an A note
- Reviewer initials if not S/A
- Final verdict: who it's for, whether to return, the core takeaway

If the user only has rough notes, draft a confident first pass per the "Output preference" section rather than asking for every detail.

## Body structure

Always use this structure:

```mdx
---
{frontmatter}
---

import Polaroid from '../../components/Polaroid.astro';

<div class="nn-polaroid-row" style="--row-count: 4;">
  <Polaroid src="/reviews/<slug>/<file>" alt="..." tilt={-6} />
  <Polaroid src="/reviews/<slug>/<file>" alt="..." tilt={4} />
  <Polaroid src="/reviews/<slug>/<file>" alt="..." tilt={-3} />
  <Polaroid src="/reviews/<slug>/<file>" alt="..." tilt={5} />
</div>

## Setting

{One paragraph: room, view, lighting, music, service, dress code, mood.}

## The meal

### {Dish 1}

<Polaroid
  src="/reviews/<slug>/<file>"
  alt="{Dish 1}"
  tilt={-3}
/>

{One short paragraph describing the dish — ingredients, preparation, plating.}

- **S {x.x} · A {x.x}**
- **S** — {S's note in critic voice.}
- **A** — {A's note in critic voice.}

### {Dish 2}

{No polaroid if there's no photo for this dish — go straight to the description.}

{Description paragraph.}

- **S {x.x} · A {x.x}**
- **S** — {note}
- **A** — {note}

## Verdict

{Closing paragraph: who it's for, whether to return, the core takeaway.}
```

> The MDX `## Verdict` heading is the **prose** conclusion. The page template *also* renders a separate auto-generated verdict card (with the numeric `rating / 5`, venue, and location) immediately below this section. Keep the prose verdict — the two complement each other.

## Polaroid component rules

- Import once at the top of the MDX: `import Polaroid from '../../components/Polaroid.astro';`
- Props: `src` (path under `/public/`), `alt`, optional `tilt` (degrees, default `-2`), optional `size` (px, default `320`), optional `caption`.
- **Do not pass `caption`** unless the user explicitly asks for it — captions were removed from the established layout.
- Inline body polaroids use the default size (320px) and a small varied `tilt` like `-3`, `2`, `-2`, `3`.
- The polaroid row at the top auto-fits: **do not set `size` on row polaroids**. Set `--row-count: <N>` on the wrapping `<div class="nn-polaroid-row">` matching the number of polaroids inside. The CSS scales each frame down as count goes up so the row never overflows; overlap stays constant.
- Use stronger varied tilts in the row (e.g. `-6`, `4`, `-3`, `5`, `-5`, `3`, `-4`, `6` …). Always include all photographed dishes, in the order they were served.
- The `.nn-polaroid-row` class breaks out of the article column to span up to 1200px / 100vw, overlaps each polaroid by ~2rem onto its neighbour, and clamps frame size between 80px and 224px on desktop (50px–140px on phone screens).

## Per-dish list block

Use this exact pattern for the score + notes block, as a markdown list:

```md
- **S 4.7 · A 4.8**
- **S** — {one or two sentences in critic voice}
- **A** — {one or two sentences in critic voice}
```

- Scores are out of 5 with one decimal allowed (e.g. `4.8`, `2.0`, `5.0`).
- S and A score independently — they often disagree, and their disagreements are part of the review's character.
- If a dish has no photo, omit the `<Polaroid>` for it but keep the description + score block.

## Writing guidance

Write in Nibble & Noble's critic voice:

- clear, opinionated, concrete
- specific about dishes, service, texture, pacing, and atmosphere
- avoids recipe-blog phrasing
- sounds like a date-night critic diary, not a press release
- S and A should sound like two distinct diners — let them disagree where the user's notes suggest disagreement (different scores)

## File creation rules

Choose a slug from the venue or title in lowercase kebab-case.

Examples:

- `marlowe-osteria.mdx`
- `late-window-tacos.mdx`
- `glasshouse-lounge-restaurant.mdx`

The image folder under `public/reviews/` must use the same slug.

Before writing, check whether a slug already exists in `src/content/reviews/` and avoid collisions.

## Frontmatter rules

- `pubDate` should be an ISO-style date string, e.g. `2026-04-23`
- `heroImage` starts with `/` and points at `/reviews/<slug>/<file>`
- `tags` should be a short list of useful labels, not a paragraph
- `description` reads like a dek: one strong sentence
- `rating` is the user's editorial overall (not necessarily the arithmetic average of per-dish scores). If the per-dish average diverges noticeably from the editorial rating, flag it to the user — don't silently overwrite either number. This number is what the auto-rendered verdict card displays as `x.x / 5`; omitting `rating` hides the card entirely.
- If the user does not provide `rating`, omit it rather than inventing one
- If the user does not provide `featured`, omit it unless they explicitly want it featured

## Execution steps

1. Read the user's notes and inspect the working directory for any pre-uploaded images.
2. Ask one grouped follow-up (`AskUserQuestion`) for missing review information — especially per-dish descriptions, scores, and S/A notes.
3. Draft `title`, `description`, and the slug if the user did not provide them.
4. If images were uploaded outside `public/reviews/<slug>/`, move them into that folder and remove the source location.
5. Create the MDX review file under `src/content/reviews/<slug>.mdx` following the body structure above.
6. Run `npm run check` (and optionally `npm run build`) to validate.
7. Offer to start `npm run dev` so the user can preview the page at `/reviews/<slug>/`.

## Output preference

When drafting from sparse notes, offer a confident first pass instead of forcing the user to over-specify every sentence. Ask only for information that materially affects accuracy or the frontmatter — chiefly the per-dish ingredient lists and the S/A scores, since those can't be invented credibly.
