/**
 * Plain helpers for filtering, sorting and relating content entries.
 * Kept free of astro:content so they can be unit-tested and reused when
 * content moves to a database in Phase 2.
 */
import type { ContentStatus } from './taxonomy';

export interface ResourceData {
  status: ContentStatus;
  featured: boolean;
  tags: string[];
  createdAt: Date;
  publishedAt?: Date | undefined;
  category?: string;
  title?: string;
  name?: string;
}

export interface ResourceLike {
  id: string;
  data: ResourceData;
}

export const isPublished = (data: Pick<ResourceData, 'status'>) => data.status === 'published';

/** Title for display: "title" for most types, "name" for tools and festivals. */
export const displayName = (data: Pick<ResourceData, 'title' | 'name'>) =>
  data.title ?? data.name ?? '';

/** The date a visitor would consider "added": publication date, else creation date. */
export const addedDate = (data: Pick<ResourceData, 'publishedAt' | 'createdAt'>) =>
  data.publishedAt ?? data.createdAt;

/** Featured first, then newest, then alphabetical. Returns a new array. */
export function sortResources<T extends ResourceLike>(list: readonly T[]): T[] {
  return [...list].sort(
    (a, b) =>
      Number(b.data.featured) - Number(a.data.featured) ||
      addedDate(b.data).getTime() - addedDate(a.data).getTime() ||
      displayName(a.data).localeCompare(displayName(b.data)),
  );
}

/** Newest first, ignoring "featured". Used for "recently added" lists. */
export function sortNewest<T extends ResourceLike>(list: readonly T[]): T[] {
  return [...list].sort((a, b) => addedDate(b.data).getTime() - addedDate(a.data).getTime());
}

/** How related two entries are: 2 points for the same category, 1 per shared tag. */
export function relatedScore(a: ResourceData, b: ResourceData): number {
  const sameCategory = a.category !== undefined && a.category === b.category ? 2 : 0;
  const tagsA = new Set(a.tags.map((t) => t.toLowerCase()));
  const sharedTags = b.tags.filter((t) => tagsA.has(t.toLowerCase())).length;
  return sameCategory + sharedTags;
}

/** Up to `limit` entries from `pool` most related to `entry`, excluding itself. */
export function pickRelated<T extends ResourceLike>(
  entry: ResourceLike,
  pool: readonly T[],
  limit = 3,
): T[] {
  return pool
    .filter((other) => other.id !== entry.id)
    .map((other) => ({ other, score: relatedScore(entry.data, other.data) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ other }) => other);
}
