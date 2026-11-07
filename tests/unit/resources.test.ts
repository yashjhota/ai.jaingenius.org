import { describe, expect, it } from 'vitest';
import {
  addedDate,
  countByCategory,
  displayName,
  isPublished,
  pickRelated,
  relatedScore,
  sortNewest,
  sortResources,
  type ResourceData,
  type ResourceLike,
} from '../../src/lib/resources';

const data = (overrides: Partial<ResourceData> = {}): ResourceData => ({
  status: 'published',
  featured: false,
  tags: [],
  createdAt: new Date('2026-01-01'),
  title: 'Untitled',
  ...overrides,
});

const entry = (id: string, overrides: Partial<ResourceData> = {}): ResourceLike => ({
  id,
  data: data({ title: id, ...overrides }),
});

describe('isPublished', () => {
  it('is true only for published status', () => {
    expect(isPublished({ status: 'published' })).toBe(true);
    expect(isPublished({ status: 'draft' })).toBe(false);
    expect(isPublished({ status: 'archived' })).toBe(false);
  });
});

describe('displayName', () => {
  it('prefers title, falls back to name, then empty string', () => {
    expect(displayName({ title: 'A', name: 'B' })).toBe('A');
    expect(displayName({ name: 'B' })).toBe('B');
    expect(displayName({})).toBe('');
  });
});

describe('addedDate', () => {
  it('uses publishedAt when present, else createdAt', () => {
    const created = new Date('2026-01-01');
    const published = new Date('2026-02-01');
    expect(addedDate({ createdAt: created, publishedAt: published })).toBe(published);
    expect(addedDate({ createdAt: created })).toBe(created);
  });
});

describe('sortResources', () => {
  it('puts featured first, then newest, then alphabetical', () => {
    const list = [
      entry('b-old', { createdAt: new Date('2026-01-01') }),
      entry('a-old', { createdAt: new Date('2026-01-01') }),
      entry('new', { createdAt: new Date('2026-03-01') }),
      entry('featured-old', { featured: true, createdAt: new Date('2025-01-01') }),
    ];
    expect(sortResources(list).map((e) => e.id)).toEqual(['featured-old', 'new', 'a-old', 'b-old']);
  });

  it('does not mutate the input', () => {
    const list = [entry('b'), entry('a')];
    sortResources(list);
    expect(list.map((e) => e.id)).toEqual(['b', 'a']);
  });
});

describe('sortNewest', () => {
  it('ignores featured', () => {
    const list = [
      entry('featured-old', { featured: true, createdAt: new Date('2025-01-01') }),
      entry('new', { createdAt: new Date('2026-03-01') }),
    ];
    expect(sortNewest(list).map((e) => e.id)).toEqual(['new', 'featured-old']);
  });
});

describe('relatedScore', () => {
  it('scores 2 for same category plus 1 per shared tag, case-insensitive', () => {
    const a = data({ category: 'poster', tags: ['Paryushan', 'greeting'] });
    const b = data({ category: 'poster', tags: ['paryushan', 'other'] });
    expect(relatedScore(a, b)).toBe(3);
  });

  it('does not count a missing category as a match', () => {
    expect(relatedScore(data(), data())).toBe(0);
  });
});

describe('pickRelated', () => {
  it('excludes itself and unrelated entries, orders by score, respects limit', () => {
    const self = entry('self', { category: 'poster', tags: ['x', 'y'] });
    const pool = [
      self,
      entry('weak', { category: 'other', tags: ['x'] }),
      entry('strong', { category: 'poster', tags: ['x', 'y'] }),
      entry('none', { category: 'other', tags: ['z'] }),
      entry('mid', { category: 'poster' }),
    ];
    expect(pickRelated(self, pool).map((e) => e.id)).toEqual(['strong', 'mid', 'weak']);
    expect(pickRelated(self, pool, 1).map((e) => e.id)).toEqual(['strong']);
  });
});

describe('countByCategory', () => {
  it('counts per category in taxonomy order and drops empty categories', () => {
    const list = [
      { data: { category: 'b' } },
      { data: { category: 'a' } },
      { data: { category: 'b' } },
      { data: {} },
    ];
    expect(countByCategory(list, ['a', 'b', 'c'] as const)).toEqual([
      { category: 'a', count: 1 },
      { category: 'b', count: 2 },
    ]);
  });
});
