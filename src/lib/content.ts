/**
 * The only way pages read content. Returns published entries only.
 * In Phase 2 this file can switch from local files to D1 without page changes.
 */
import { getCollection, getEntry, render, type CollectionEntry } from 'astro:content';
import { isPublished, pickRelated, sortNewest, sortResources } from './resources';

export type ResourceType = 'prompts' | 'templates' | 'assets' | 'tools' | 'festivals' | 'guides';
export type Resource<T extends ResourceType> = CollectionEntry<T>;

/** All published entries of a type, featured first, then newest. */
export async function getPublished<T extends ResourceType>(type: T): Promise<Resource<T>[]> {
  const entries = (await getCollection(type)) as Resource<T>[];
  return sortResources(entries.filter((e) => isPublished(e.data)));
}

/** One published entry by slug, or undefined if missing or not published. */
export async function getBySlug<T extends ResourceType>(
  type: T,
  slug: string,
): Promise<Resource<T> | undefined> {
  const entry = (await getEntry(type, slug)) as Resource<T> | undefined;
  return entry && isPublished(entry.data) ? entry : undefined;
}

/** Published entries for a list of references (e.g. a festival's related prompts). */
export async function getPublishedRefs<T extends ResourceType>(
  type: T,
  refs: readonly { id: string }[],
): Promise<Resource<T>[]> {
  const entries = await Promise.all(refs.map((ref) => getBySlug(type, ref.id)));
  return entries.filter((e): e is Awaited<Resource<T>> => e !== undefined);
}

/** Published entries of the same type most related to `entry` by category and tags. */
export async function getRelated<T extends ResourceType>(
  type: T,
  entry: Resource<T>,
  limit = 3,
): Promise<Resource<T>[]> {
  const pool = await getPublished(type);
  return pickRelated(entry, pool, limit);
}

/** Most recently added published entries across the given types. */
export async function getRecent(types: readonly ResourceType[], limit = 6) {
  const all = (await Promise.all(types.map((t) => getPublished(t)))).flat();
  return sortNewest(all).slice(0, limit);
}

/** Renders an entry's Markdown body. Returns the <Content /> component. */
export async function renderBody<T extends ResourceType>(entry: Resource<T>) {
  const { Content } = await render(entry);
  return Content;
}
