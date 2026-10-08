/**
 * Stale-while-revalidate cache for Strapi responses.
 *
 * Render's free tier spins the CMS down after ~15 min idle (cold starts
 * take 30-60s+) and can go fully offline until manually restarted. This
 * cache has no expiry — once a query succeeds, its result is kept in
 * localStorage indefinitely and served instantly on every subsequent
 * load, while a fresh fetch happens in the background and silently
 * replaces it (and re-renders) if it succeeds. If the live fetch fails,
 * the cached copy just stays — so a visitor never sees a loading
 * skeleton or an error state for content that's already been seen once
 * by someone on this device, no matter how long the CMS is down.
 *
 * Per-viewer only (localStorage), not a CDN or server-side cache — a
 * visitor's very first-ever load still needs a successful live fetch.
 */

const PREFIX = 'strapi-cache:';

interface CacheEntry<T> {
  data: T;
  cachedAt: number;
}

function keyFor(cacheKey: string) {
  return `${PREFIX}${cacheKey}`;
}

export function readCache<T>(cacheKey: string): CacheEntry<T> | null {
  try {
    const raw = localStorage.getItem(keyFor(cacheKey));
    if (!raw) return null;
    return JSON.parse(raw) as CacheEntry<T>;
  } catch {
    return null;
  }
}

export function writeCache<T>(cacheKey: string, data: T): void {
  try {
    const entry: CacheEntry<T> = { data, cachedAt: Date.now() };
    localStorage.setItem(keyFor(cacheKey), JSON.stringify(entry));
  } catch {
    // Storage full, disabled, or private mode — fine to skip caching.
  }
}

/**
 * Wraps a fetcher: on success, caches the result and returns it. On
 * failure, returns a cached copy if one exists (re-throwing the original
 * error only when there's nothing to fall back to).
 */
export async function withStrapiFallback<T>(cacheKey: string, fetcher: () => Promise<T>): Promise<T> {
  try {
    const data = await fetcher();
    writeCache(cacheKey, data);
    return data;
  } catch (err) {
    const cached = readCache<T>(cacheKey);
    if (cached) return cached.data;
    throw err;
  }
}

export function getCacheAge(cacheKey: string): number | null {
  const cached = readCache(cacheKey);
  return cached ? Date.now() - cached.cachedAt : null;
}

/**
 * Synchronous read for use as React Query's `placeholderData` — shows
 * cached content immediately on mount (no loading skeleton) while a
 * fresh fetch happens in the background. Returns undefined (React
 * Query's "no placeholder" signal) if nothing is cached yet.
 */
export function cachePlaceholder<T>(cacheKey: string): T | undefined {
  return readCache<T>(cacheKey)?.data;
}

/** Clears every strapi-cache: entry — call after a successful admin write if you ever add one client-side. */
export function clearAllStrapiCache(): void {
  try {
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith(PREFIX)) localStorage.removeItem(key);
    }
  } catch {
    // ignore
  }
}
