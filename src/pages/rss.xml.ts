import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async (context) => {
  const site = context.site ?? new URL('https://example.com');
  const reviews = await getCollection('reviews');
  const sorted = [...reviews].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Nibble & Noble',
    description: 'Dining reviews and food criticism.',
    site,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: new URL(`/reviews/${post.slug}/`, site).href,
    })),
  });
};
