import { describe, expect, it } from 'vitest';
import {
  assetIssues,
  festivalIssues,
  licenceIssues,
  previewIssues,
  promptIssues,
  templateIssues,
  toolIssues,
} from '../../src/lib/publish-rules';

const paths = (issues: { path: string }[]) => issues.map((i) => i.path).sort();
const publishedAt = new Date('2026-11-07');

describe('drafts', () => {
  it('may be incomplete', () => {
    expect(promptIssues({ status: 'draft' })).toEqual([]);
    expect(assetIssues({ status: 'draft' })).toEqual([]);
    expect(toolIssues({ status: 'draft' })).toEqual([]);
    expect(festivalIssues({ status: 'draft', dateSources: [] })).toEqual([]);
    expect(templateIssues({ status: 'draft', fileFormat: [] })).toEqual([]);
  });
});

describe('published entries', () => {
  it('need publishedAt', () => {
    expect(paths(promptIssues({ status: 'published' }))).toEqual(['publishedAt']);
    expect(promptIssues({ status: 'published', publishedAt })).toEqual([]);
  });

  it('assets need file, preview, type, licence, source and creator', () => {
    expect(paths(assetIssues({ status: 'published', publishedAt }))).toEqual([
      'creator',
      'file',
      'fileType',
      'licence',
      'previewImage',
      'source',
    ]);
  });

  it('templates need a preview, format, licence and a download link or asset', () => {
    expect(paths(templateIssues({ status: 'published', publishedAt, fileFormat: [] }))).toEqual([
      'downloadUrl',
      'fileFormat',
      'licence',
      'previewImage',
    ]);
    expect(
      templateIssues({
        status: 'published',
        publishedAt,
        fileFormat: ['pdf'],
        previewImage: {},
        previewAlt: 'Poster preview',
        asset: { id: 'x' },
        licence: { type: 'jain-genius-original' },
      }),
    ).toEqual([]);
  });

  it('tools need account info and verification details', () => {
    expect(paths(toolIssues({ status: 'published', publishedAt }))).toEqual([
      'accountRequired',
      'lastVerifiedAt',
      'reviewedBy',
    ]);
    // false is a valid answer, not a missing one
    expect(
      toolIssues({
        status: 'published',
        publishedAt,
        accountRequired: false,
        lastVerifiedAt: publishedAt,
        reviewedBy: 'Editor',
      }),
    ).toEqual([]);
  });

  it('festivals need date sources and a verification date', () => {
    expect(paths(festivalIssues({ status: 'published', publishedAt, dateSources: [] }))).toEqual([
      'dateSources',
      'lastDateVerifiedAt',
    ]);
  });
});

describe('licenceIssues', () => {
  it('requires attribution for CC BY licences, even on drafts', () => {
    expect(paths(licenceIssues({ type: 'CC-BY-4.0' }))).toEqual(['attribution']);
    expect(paths(licenceIssues({ type: 'CC-BY-SA-4.0' }, '  '))).toEqual(['attribution']);
    expect(licenceIssues({ type: 'CC-BY-4.0' }, 'Photo by A. Person')).toEqual([]);
  });

  it('does not require attribution for CC0 or no licence', () => {
    expect(licenceIssues({ type: 'CC0-1.0' })).toEqual([]);
    expect(licenceIssues(undefined)).toEqual([]);
  });
});

describe('previewIssues', () => {
  it('requires alt text whenever a preview image is set, even on drafts', () => {
    expect(paths(previewIssues({}, undefined))).toEqual(['previewAlt']);
    expect(paths(previewIssues({}, ' '))).toEqual(['previewAlt']);
    expect(previewIssues({}, 'A lotus')).toEqual([]);
    expect(previewIssues(undefined)).toEqual([]);
  });

  it('is applied to draft assets and templates', () => {
    expect(paths(assetIssues({ status: 'draft', previewImage: {} }))).toEqual(['previewAlt']);
    expect(paths(templateIssues({ status: 'draft', fileFormat: [], previewImage: {} }))).toEqual([
      'previewAlt',
    ]);
  });
});
