/**
 * Fallback cache for Strapi responses.
 *
 * Render's free tier spins the CMS down after ~15 min idle and the first
 * request after that pays a cold-start penalty (sometimes a timeout on a
 * slow connection). This persists the last successful response for each
 * query to localStorage and serves it back if a live fetch fails, so a
 * returning visitor (or the same visitor hitting a cold start) sees real
 * content instead of an error state. Per-viewer only — not a substitute
 * for the CMS actually being up.
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
