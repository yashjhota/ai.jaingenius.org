import { describe, expect, it } from 'vitest';
import { formatDate, formatFileSize, isoDate } from '../../src/lib/format';

describe('formatDate', () => {
  it('formats a content date without timezone drift', () => {
    expect(formatDate(new Date('2026-11-07'))).toBe('7 Nov 2026');
    expect(formatDate(new Date('2026-01-01'))).toBe('1 Jan 2026');
  });
});

describe('isoDate', () => {
  it('returns YYYY-MM-DD', () => {
    expect(isoDate(new Date('2026-11-07'))).toBe('2026-11-07');
  });
});

describe('formatFileSize', () => {
  it.each([
    [0, '0 B'],
    [512, '512 B'],
    [1024, '1 KB'],
    [1536, '1.5 KB'],
    [3.25 * 1024 * 1024, '3.3 MB'],
    [2 * 1024 ** 3, '2 GB'],
  ])('%d bytes → %s', (bytes, expected) => {
    expect(formatFileSize(bytes)).toBe(expected);
  });

  it('handles invalid input', () => {
    expect(formatFileSize(-1)).toBe('Unknown size');
    expect(formatFileSize(Number.NaN)).toBe('Unknown size');
  });
});
