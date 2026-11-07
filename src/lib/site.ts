/** Site-wide settings and navigation. */

export const SITE = {
  name: 'Jain AI',
  endorsement: 'by Jain Genius',
  tagline: 'Create. Explore. Celebrate. AI for the Jain Community.',
  description:
    'Jain AI is a free-first hub of AI prompts, festival templates, Jain digital assets, AI tool guides and tutorials for the Jain community.',
  url: 'https://ai.jaingenius.org',
  parentSite: { name: 'Jain Genius', url: 'https://jaingenius.org' },
  locale: 'en_IN',
} as const;

export interface NavItem {
  label: string;
  href: string;
  group: 'explore' | 'create' | 'learn' | 'about';
}

/**
 * Primary navigation. Only add an item once its page exists, so the site has no
 * dead links (PRD §16 rule 12). Order follows PRD §6: Explore, Create, Learn, About.
 */
export const NAV: NavItem[] = [];
