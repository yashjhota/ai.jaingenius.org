/** Maps content entries to ResourceCard props and listing filters, so every list looks alike. */
import type { Props as CardProps } from '../components/ResourceCard.astro';
import type { CategoryOption } from '../components/CategoryFilter.astro';
import type { Resource } from './content';
import { countByCategory } from './resources';
import {
  ASSET_CATEGORY_LABELS,
  FILE_TYPE_LABELS,
  LANGUAGE_LABELS,
  PROMPT_CATEGORY_LABELS,
  TEMPLATE_CATEGORY_LABELS,
} from './taxonomy';

export const promptPath = (slug: string) => `/prompts/${slug}`;
export const promptCategoryPath = (category: string) => `/prompts/category/${category}`;
export const templatePath = (slug: string) => `/templates/${slug}`;
export const templateCategoryPath = (category: string) => `/templates/category/${category}`;
export const assetPath = (slug: string) => `/assets/${slug}`;
export const assetCategoryPath = (category: string) => `/assets/category/${category}`;

/** Filter options for the categories that have entries, in taxonomy order. */
export function categoryOptions<C extends string>(
  entries: readonly { data: { category?: string } }[],
  categories: readonly C[],
  labels: Record<C, string>,
  path: (category: C) => string,
): CategoryOption[] {
  return countByCategory(entries, categories).map(({ category, count }) => ({
    href: path(category),
    label: labels[category],
    count,
  }));
}

const formatLabel = (formats: readonly (keyof typeof FILE_TYPE_LABELS)[]) =>
  formats.map((f) => f.toUpperCase()).join(', ');

export function promptCard(entry: Resource<'prompts'>): CardProps {
  const d = entry.data;
  return {
    href: promptPath(entry.id),
    title: d.title,
    summary: d.summary,
    typeLabel: 'Prompt',
    typeVariant: 'prompt',
    pendingReview: d.religiousReviewStatus === 'pending',
    meta: [
      PROMPT_CATEGORY_LABELS[d.category],
      d.aspectRatio,
      d.language.map((l) => LANGUAGE_LABELS[l]).join(', '),
    ].filter((m): m is string => Boolean(m)),
  };
}

export function templateCard(entry: Resource<'templates'>): CardProps {
  const d = entry.data;
  return {
    href: templatePath(entry.id),
    title: d.title,
    summary: d.description,
    typeLabel: 'Template',
    typeVariant: 'template',
    pendingReview: d.religiousReviewStatus === 'pending',
    image: d.previewImage,
    imageAlt: d.previewAlt,
    meta: [TEMPLATE_CATEGORY_LABELS[d.category], d.dimensions, formatLabel(d.fileFormat)].filter(
      (m): m is string => Boolean(m),
    ),
  };
}

export function assetCard(entry: Resource<'assets'>): CardProps {
  const d = entry.data;
  return {
    href: assetPath(entry.id),
    title: d.title,
    summary: d.description,
    typeLabel: 'Asset',
    typeVariant: 'asset',
    pendingReview: d.religiousReviewStatus === 'pending',
    image: d.previewImage,
    imageAlt: d.previewAlt,
    meta: [ASSET_CATEGORY_LABELS[d.category], d.fileType?.toUpperCase(), d.dimensions].filter(
      (m): m is string => Boolean(m),
    ),
  };
}
