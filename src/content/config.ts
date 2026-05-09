import { defineCollection, z } from 'astro:content';

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    venue: z.string(),
    location: z.string(),
    /** 1–5 scale; see agents.md */
    rating: z.number().min(1).max(5).optional(),
    priceBand: z.enum(['$', '$$', '$$$', '$$$$']).optional(),
    cuisine: z.string().optional(),
    /** Path under `/public`, e.g. `/images/hero.svg` */
    heroImage: z.string().optional(),
    /** CSS object-position for the hero image (e.g. `center bottom`, `center 70%`). Defaults to center. */
    heroImagePosition: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = { reviews };
