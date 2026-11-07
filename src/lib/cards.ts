/** Maps content entries to ResourceCard props, so every listing shows them the same way. */
import type { Props as CardProps } from '../components/ResourceCard.astro';
import type { Resource } from './content';
import { LANGUAGE_LABELS, PROMPT_CATEGORY_LABELS } from './taxonomy';

export const promptPath = (slug: string) => `/prompts/${slug}`;
export const promptCategoryPath = (category: string) => `/prompts/category/${category}`;

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
