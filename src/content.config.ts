/**
 * Content collections (PRD §7.1). Each entry's id is its filename, used as the URL slug.
 * Markdown body: prompt text (prompts), description/details (others), tutorial (guides).
 */
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import {
  ASSET_CATEGORIES,
  CONTENT_STATUSES,
  DIFFICULTIES,
  FILE_TYPES,
  FREE_PLAN_STATUSES,
  GUIDE_TOPICS,
  LANGUAGES,
  LICENCE_TYPES,
  PROMPT_CATEGORIES,
  REVIEW_STATUSES,
  TEMPLATE_CATEGORIES,
  TOOL_CATEGORIES,
  TRADITIONS,
} from './lib/taxonomy';
import {
  assetIssues,
  festivalIssues,
  guideIssues,
  promptIssues,
  templateIssues,
  toolIssues,
  type RuleIssue,
} from './lib/publish-rules';

/** Turns publish-rule issues into Zod validation errors. */
const report = (issues: RuleIssue[], ctx: z.RefinementCtx) => {
  for (const issue of issues) {
    ctx.addIssue({ code: 'custom', path: [issue.path], message: issue.message });
  }
};

const md = (base: string) => glob({ pattern: '**/[^_]*.{md,mdx}', base });

/** Fields shared by every content type. */
const common = {
  status: z.enum(CONTENT_STATUSES).default('draft'),
  featured: z.boolean().default(false),
  tags: z.array(z.string().min(1)).default([]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  publishedAt: z.coerce.date().optional(),
};

const licence = z.object({
  type: z.enum(LICENCE_TYPES),
  /** Link to the licence text or written permission record. */
  url: z.url().optional(),
  notes: z.string().optional(),
});

/** Local file under public/ (starts with "/") or an https URL. */
const fileLink = z
  .string()
  .refine((v) => v.startsWith('/') || v.startsWith('https://'), 'Use a /path or https:// URL.');

const prompts = defineCollection({
  loader: md('./src/content/prompts'),
  schema: z
    .object({
      ...common,
      title: z.string().min(3),
      summary: z.string().min(10).max(200),
      category: z.enum(PROMPT_CATEGORIES),
      intendedTool: z.string().optional(),
      language: z.array(z.enum(LANGUAGES)).min(1).default(['en']),
      style: z.string().optional(),
      aspectRatio: z
        .string()
        .regex(/^\d+:\d+$/, 'Use a ratio like 4:5.')
        .optional(),
      referenceImageNotes: z.string().optional(),
      religiousReviewStatus: z.enum(REVIEW_STATUSES),
    })
    .superRefine((d, ctx) => report(promptIssues(d), ctx)),
});

const templates = defineCollection({
  loader: md('./src/content/templates'),
  schema: ({ image }) =>
    z
      .object({
        ...common,
        title: z.string().min(3),
        description: z.string().min(10).max(300),
        category: z.enum(TEMPLATE_CATEGORIES),
        previewImage: image().optional(),
        previewAlt: z.string().optional(),
        downloadUrl: fileLink.optional(),
        asset: reference('assets').optional(),
        fileFormat: z.array(z.enum(FILE_TYPES)).default([]),
        dimensions: z.string().optional(),
        editableWith: z.string().optional(),
        licence: licence.optional(),
        attribution: z.string().optional(),
        religiousReviewStatus: z.enum(REVIEW_STATUSES),
      })
      .superRefine((d, ctx) => report(templateIssues(d), ctx)),
});

const assets = defineCollection({
  loader: md('./src/content/assets'),
  schema: ({ image }) =>
    z
      .object({
        ...common,
        title: z.string().min(3),
        description: z.string().min(10).max(300),
        category: z.enum(ASSET_CATEGORIES),
        file: fileLink.optional(),
        previewImage: image().optional(),
        previewAlt: z.string().optional(),
        fileType: z.enum(FILE_TYPES).optional(),
        /** Bytes. Only needed for external files; local files are measured at build. */
        fileSize: z.number().int().positive().optional(),
        dimensions: z.string().optional(),
        licence: licence.optional(),
        source: z.string().optional(),
        attribution: z.string().optional(),
        creator: z.string().optional(),
        religiousReviewStatus: z.enum(REVIEW_STATUSES),
      })
      .superRefine((d, ctx) => report(assetIssues(d), ctx)),
});

const tools = defineCollection({
  loader: md('./src/content/tools'),
  schema: z
    .object({
      ...common,
      name: z.string().min(2),
      description: z.string().min(10).max(200),
      category: z.enum(TOOL_CATEGORIES),
      officialUrl: z.url({ protocol: /^https$/ }),
      provider: z.string().optional(),
      useCases: z.array(z.string()).default([]),
      freePlanStatus: z.enum(FREE_PLAN_STATUSES),
      freePlanNotes: z.string().optional(),
      accountRequired: z.boolean().optional(),
      lastVerifiedAt: z.coerce.date().optional(),
      reviewedBy: z.string().optional(),
    })
    .superRefine((d, ctx) => report(toolIssues(d), ctx)),
});

const festivals = defineCollection({
  loader: md('./src/content/festivals'),
  schema: z
    .object({
      ...common,
      name: z.string().min(2),
      summary: z.string().min(10).max(300),
      traditions: z.array(z.enum(TRADITIONS)).min(1),
      dateDescription: z.string().min(5),
      dateSources: z
        .array(z.object({ name: z.string().min(2), url: z.url().optional() }))
        .default([]),
      lastDateVerifiedAt: z.coerce.date().optional(),
      relatedPrompts: z.array(reference('prompts')).default([]),
      relatedTemplates: z.array(reference('templates')).default([]),
      religiousReviewStatus: z.enum(REVIEW_STATUSES),
    })
    .superRefine((d, ctx) => report(festivalIssues(d), ctx)),
});

const guides = defineCollection({
  loader: md('./src/content/guides'),
  schema: z
    .object({
      ...common,
      title: z.string().min(3),
      summary: z.string().min(10).max(200),
      topic: z.enum(GUIDE_TOPICS),
      difficulty: z.enum(DIFFICULTIES).default('beginner'),
      language: z.enum(LANGUAGES).default('en'),
    })
    .superRefine((d, ctx) => report(guideIssues(d), ctx)),
});

export const collections = { prompts, templates, assets, tools, festivals, guides };
