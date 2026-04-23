---
name: add-review
description: Add a new Nibble & Noble review in src/content/reviews. Use when the user wants to create, draft, or publish a new restaurant review, or has dining notes that should be turned into a review MDX file. Ask for any missing frontmatter and review details before writing.
---

# Add Review

Use this skill when the user wants to add a new review to Nibble & Noble.

## Goal

Create a valid review file under `src/content/reviews/<slug>.mdx` that matches the local content schema and the site's critic voice.

## Required repo facts

- Reviews live in `src/content/reviews/`.
- The `reviews` collection schema is defined in `src/content/config.ts`.
- Required frontmatter:
  - `title`
  - `description`
  - `pubDate`
  - `venue`
  - `location`
- Optional frontmatter:
  - `rating` from `1` to `5`
  - `priceBand` from `$`, `$$`, `$$$`, `$$$$`
  - `cuisine`
  - `heroImage`
  - `tags`
  - `featured`

## Intake workflow

First, inspect what the user already gave you. Do not ask for fields they already supplied clearly.

If information is missing, ask one concise grouped follow-up that collects everything needed to write the review well. Prefer direct questions over a long form.

Collect these details before drafting:

- Venue name
- Location
- Publication date, if the user wants a specific one
- Review title, if they already have one
- One-sentence description/dek, if they already have one
- Rating out of 5, if they want one shown
- Price band
- Cuisine
- Whether the review should be featured
- Hero image path under `public/`, if any
- Tags
- The occasion or context: date night, quick stop, tasting menu, takeaway, etc.
- The setting: room, service, pace, mood
- What was ordered
- Best dish or standout moment
- Weakest dish or main criticism
- Value for money
- Final verdict: who it is for, whether to return, and the core takeaway

If the user only has rough notes, ask specifically for:

- where they went
- what they ate
- what worked
- what missed
- the overall feeling leaving the meal

## Writing guidance

Write in Nibble & Noble's critic voice:

- clear, opinionated, concrete
- specific about dishes, service, texture, pacing, and atmosphere
- avoids recipe-blog phrasing
- sounds like a date-night critic diary, not a press release

Suggested structure for the body:

```md
## Setting

## The meal

## Verdict
```

These headings are optional, but they fit the repo well.

## File creation rules

Choose a slug from the venue or title in lowercase kebab-case.

Examples:

- `marlowe-osteria.mdx`
- `late-window-tacos.mdx`

Before writing, check whether a nearby slug already exists in `src/content/reviews/` and avoid collisions.

## Frontmatter rules

- `pubDate` should be an ISO-style date string when possible, e.g. `2026-04-23`
- `heroImage` should start with `/`
- `tags` should be a short list of useful labels, not a paragraph
- `description` should read like a dek: one strong sentence
- If the user does not provide `rating`, omit it rather than inventing one
- If the user does not provide `featured`, omit it unless they explicitly want it featured

## Execution steps

1. Read the user's notes.
2. Ask one grouped follow-up for missing review information.
3. Draft `title`, `description`, and a slug if the user did not provide them.
4. Create the MDX review file under `src/content/reviews/`.
5. Keep frontmatter aligned with `src/content/config.ts`.
6. If the environment is ready, run `npm run check` or `npm run build` to validate.

## Output preference

When drafting from sparse notes, offer a confident first pass instead of forcing the user to over-specify every sentence. Ask only for information that materially affects accuracy or the frontmatter.
