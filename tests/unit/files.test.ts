import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { resolveDownload } from '../../src/lib/files';

const publicDir = mkdtempSync(join(tmpdir(), 'jain-ai-files-'));
mkdirSync(join(publicDir, 'downloads'));
writeFileSync(join(publicDir, 'downloads', 'lotus icon.svg'), 'x'.repeat(1500));
afterAll(() => rmSync(publicDir, { recursive: true, force: true }));

describe('resolveDownload', () => {
  it('reads the size and name of a local file', () => {
    expect(resolveDownload('/downloads/lotus%20icon.svg', { publicDir })).toEqual({
      url: '/downloads/lotus%20icon.svg',
      fileName: 'lotus icon.svg',
      local: true,
      size: 1500,
    });
  });

  it('throws for a missing local file', () => {
    expect(() => resolveDownload('/downloads/missing.svg', { publicDir })).toThrow(
      /not found: public\/downloads\/missing\.svg/,
    );
  });

  it('throws when the path is a folder', () => {
    expect(() => resolveDownload('/downloads', { publicDir })).toThrow(/not found/);
  });

  it('passes external links through with the declared size', () => {
    expect(
      resolveDownload('https://example.org/files/poster.pdf', { publicDir, declaredSize: 2048 }),
    ).toEqual({
      url: 'https://example.org/files/poster.pdf',
      fileName: 'poster.pdf',
      local: false,
      size: 2048,
    });
  });
});
