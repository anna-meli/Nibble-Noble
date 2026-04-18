/**
 * Site-root-relative path including `base` (for GitHub project Pages).
 * Pass without a leading slash, e.g. `reviews/my-slug`, `favicon.svg`, `rss.xml`.
 */
export function sitePath(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const rel = path.replace(/^\/+/, '');
  const joined = `${base}${rel}`;
  return joined.startsWith('/') ? joined : `/${joined}`;
}

/** Absolute `https://origin/...` for a path that already starts with `/`. */
export function absoluteUrl(site: URL | undefined, pathname: string): string {
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (!site) return p;
  return new URL(p, site.origin).href;
}
