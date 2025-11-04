import { CategoryType } from '@/types';

/**
 * All available artist categories used throughout the application
 */
export const ARTIST_CATEGORIES: CategoryType[] = [
  'Writers',
  'Directors',
  'Painters',
  'Musicians',
  'Filmmakers',
  'Designers',
  'Photographers',
  'Storytellers',
  'Curators',
  'Actors',
  'Dancers',
  'Cinematographers',
];

/**
 * Default featured image for articles
 */
export const DEFAULT_ARTICLE_IMAGE = '/images/articles/default.jpg';

/**
 * Image upload constraints
 */
export const IMAGE_UPLOAD_CONSTRAINTS = {
  MAX_SIZE_BYTES: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
} as const;

/**
 * Read time calculation settings
 */
export const READ_TIME_WORDS_PER_MINUTE = 200;
