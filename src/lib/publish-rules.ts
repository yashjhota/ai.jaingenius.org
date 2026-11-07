/**
 * Rules a content entry must meet before it can be published.
 *
 * Drafts may be incomplete. Once `status: published`, the fields visitors rely on
 * (licence, verification dates, sources) must be present (PRD §7.2, §10.2).
 * Schemas in src/content.config.ts run these checks, so a breach fails the build.
 */
import { ATTRIBUTION_REQUIRED, type ContentStatus, type LicenceType } from './taxonomy';

export interface RuleIssue {
  path: string;
  message: string;
}

interface Base {
  status: ContentStatus;
  publishedAt?: Date | undefined;
}

interface Licence {
  type: LicenceType;
}

const isPublished = (d: Base) => d.status === 'published';

function baseIssues(d: Base): RuleIssue[] {
  return isPublished(d) && !d.publishedAt
    ? [{ path: 'publishedAt', message: 'Published entries need a publishedAt date.' }]
    : [];
}

/** Applies to drafts too: a CC BY licence without credit is never valid. */
export function licenceIssues(licence?: Licence, attribution?: string): RuleIssue[] {
  if (licence && ATTRIBUTION_REQUIRED.includes(licence.type) && !attribution?.trim()) {
    return [{ path: 'attribution', message: `${licence.type} requires an attribution line.` }];
  }
  return [];
}

function requireFields(d: Base & Record<string, unknown>, fields: string[]): RuleIssue[] {
  if (!isPublished(d)) return [];
  return fields
    .filter((f) => {
      const v = d[f];
      return v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);
    })
    .map((f) => ({ path: f, message: `Published entries need "${f}".` }));
}

export function promptIssues(d: Base): RuleIssue[] {
  return baseIssues(d);
}

export function guideIssues(d: Base): RuleIssue[] {
  return baseIssues(d);
}

export interface TemplateRuleInput extends Base {
  previewImage?: unknown;
  downloadUrl?: string | undefined;
  asset?: unknown;
  fileFormat: string[];
  licence?: Licence | undefined;
  attribution?: string | undefined;
}

export function templateIssues(d: TemplateRuleInput): RuleIssue[] {
  const issues = [
    ...baseIssues(d),
    ...requireFields({ ...d }, ['previewImage', 'fileFormat', 'licence']),
    ...licenceIssues(d.licence, d.attribution),
  ];
  if (isPublished(d) && !d.downloadUrl && !d.asset) {
    issues.push({
      path: 'downloadUrl',
      message: 'Published templates need a downloadUrl or asset.',
    });
  }
  return issues;
}

export interface AssetRuleInput extends Base {
  file?: string | undefined;
  fileType?: string | undefined;
  fileSize?: number | undefined;
  licence?: Licence | undefined;
  source?: string | undefined;
  creator?: string | undefined;
  attribution?: string | undefined;
}

export function assetIssues(d: AssetRuleInput): RuleIssue[] {
  return [
    ...baseIssues(d),
    ...requireFields({ ...d }, ['file', 'fileType', 'fileSize', 'licence', 'source', 'creator']),
    ...licenceIssues(d.licence, d.attribution),
  ];
}

export interface ToolRuleInput extends Base {
  accountRequired?: boolean | undefined;
  lastVerifiedAt?: Date | undefined;
  reviewedBy?: string | undefined;
}

export function toolIssues(d: ToolRuleInput): RuleIssue[] {
  return [
    ...baseIssues(d),
    ...requireFields({ ...d }, ['accountRequired', 'lastVerifiedAt', 'reviewedBy']),
  ];
}

export interface FestivalRuleInput extends Base {
  dateSources: unknown[];
  lastDateVerifiedAt?: Date | undefined;
}

export function festivalIssues(d: FestivalRuleInput): RuleIssue[] {
  return [...baseIssues(d), ...requireFields({ ...d }, ['dateSources', 'lastDateVerifiedAt'])];
}
