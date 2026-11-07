/**
 * Allowed values for categorised content fields, with display labels.
 * The schemas in src/content.config.ts validate against these lists, so a typo
 * in a content file fails the build instead of creating a stray category.
 */

export const CONTENT_STATUSES = ['draft', 'published', 'archived'] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export const REVIEW_STATUSES = ['pending', 'approved', 'not-required'] as const;
export type ReviewStatus = (typeof REVIEW_STATUSES)[number];

export const LANGUAGES = ['en', 'hi', 'gu', 'mr', 'kn'] as const;
export type Language = (typeof LANGUAGES)[number];
export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  hi: 'Hindi',
  gu: 'Gujarati',
  mr: 'Marathi',
  kn: 'Kannada',
};

export const PROMPT_CATEGORIES = [
  'festival-poster',
  'greeting',
  'invitation',
  'social-media',
  'video',
  'education',
  'presentation',
  'other',
] as const;
export type PromptCategory = (typeof PROMPT_CATEGORIES)[number];
export const PROMPT_CATEGORY_LABELS: Record<PromptCategory, string> = {
  'festival-poster': 'Festival posters',
  greeting: 'Greetings',
  invitation: 'Invitations',
  'social-media': 'Social media',
  video: 'Video and reels',
  education: 'Education and quizzes',
  presentation: 'Presentations',
  other: 'Other',
};

export const TEMPLATE_CATEGORIES = [
  'poster',
  'invitation',
  'social-post',
  'banner',
  'presentation',
  'certificate',
  'other',
] as const;
export type TemplateCategory = (typeof TEMPLATE_CATEGORIES)[number];
export const TEMPLATE_CATEGORY_LABELS: Record<TemplateCategory, string> = {
  poster: 'Posters',
  invitation: 'Invitations',
  'social-post': 'Social posts',
  banner: 'Banners',
  presentation: 'Presentations',
  certificate: 'Certificates',
  other: 'Other',
};

export const ASSET_CATEGORIES = [
  'symbol',
  'border-frame',
  'background',
  'illustration',
  'icon',
  'pattern',
  'other',
] as const;
export type AssetCategory = (typeof ASSET_CATEGORIES)[number];
export const ASSET_CATEGORY_LABELS: Record<AssetCategory, string> = {
  symbol: 'Symbols',
  'border-frame': 'Borders and frames',
  background: 'Backgrounds',
  illustration: 'Illustrations',
  icon: 'Icons',
  pattern: 'Patterns',
  other: 'Other',
};

export const FILE_TYPES = ['svg', 'png', 'jpg', 'webp', 'pdf', 'pptx', 'docx', 'zip'] as const;
export type FileType = (typeof FILE_TYPES)[number];

/** Licence types we accept. "Free to view online" is not a licence (PRD §7.2). */
export const LICENCE_TYPES = [
  'CC0-1.0',
  'CC-BY-4.0',
  'CC-BY-SA-4.0',
  'public-domain',
  'jain-genius-original',
  'used-with-permission',
] as const;
export type LicenceType = (typeof LICENCE_TYPES)[number];
export const LICENCE_LABELS: Record<LicenceType, string> = {
  'CC0-1.0': 'CC0 1.0 (no rights reserved)',
  'CC-BY-4.0': 'CC BY 4.0 (credit required)',
  'CC-BY-SA-4.0': 'CC BY-SA 4.0 (credit and share-alike required)',
  'public-domain': 'Public domain',
  'jain-genius-original': 'Jain Genius original (free for community use)',
  'used-with-permission': 'Used with permission',
};
/** Licences that legally require visible attribution. */
export const ATTRIBUTION_REQUIRED: readonly LicenceType[] = ['CC-BY-4.0', 'CC-BY-SA-4.0'];

export const TOOL_CATEGORIES = [
  'chat-assistant',
  'image',
  'video',
  'design',
  'writing',
  'translation',
  'presentation',
  'audio',
  'other',
] as const;
export type ToolCategory = (typeof TOOL_CATEGORIES)[number];
export const TOOL_CATEGORY_LABELS: Record<ToolCategory, string> = {
  'chat-assistant': 'Chat assistants',
  image: 'Image generation',
  video: 'Video',
  design: 'Design',
  writing: 'Writing',
  translation: 'Translation',
  presentation: 'Presentations',
  audio: 'Audio and voice',
  other: 'Other',
};

export const FREE_PLAN_STATUSES = ['free', 'limited-free', 'trial', 'paid', 'unknown'] as const;
export type FreePlanStatus = (typeof FREE_PLAN_STATUSES)[number];
export const FREE_PLAN_LABELS: Record<FreePlanStatus, string> = {
  free: 'Free',
  'limited-free': 'Limited free',
  trial: 'Free trial',
  paid: 'Paid',
  unknown: 'Unknown',
};

/** Jain traditions, used to state who observes something (PRD §7.2). */
export const TRADITIONS = [
  'shvetambar-murtipujak',
  'sthanakvasi',
  'terapanthi',
  'digambar',
  'all',
] as const;
export type Tradition = (typeof TRADITIONS)[number];
export const TRADITION_LABELS: Record<Tradition, string> = {
  'shvetambar-murtipujak': 'Shvetambar Murtipujak',
  sthanakvasi: 'Sthanakvasi',
  terapanthi: 'Terapanthi',
  digambar: 'Digambar',
  all: 'All traditions',
};

export const GUIDE_TOPICS = [
  'getting-started',
  'prompting',
  'image-tools',
  'design',
  'video',
  'responsible-use',
  'other',
] as const;
export type GuideTopic = (typeof GUIDE_TOPICS)[number];
export const GUIDE_TOPIC_LABELS: Record<GuideTopic, string> = {
  'getting-started': 'Getting started',
  prompting: 'Writing prompts',
  'image-tools': 'Image tools',
  design: 'Design basics',
  video: 'Video',
  'responsible-use': 'Responsible use',
  other: 'Other',
};

export const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];
