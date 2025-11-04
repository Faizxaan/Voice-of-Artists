import { promises as fs } from 'fs';
import path from 'path';
import { ArticlePost } from '@/types';
import { READ_TIME_WORDS_PER_MINUTE } from './constants';

const ARTICLE_DATA_PATH = path.join(process.cwd(), 'data', 'article-posts.json');

export interface ArticleData {
  posts: ArticlePost[];
}

/**
 * Read all article posts from JSON storage
 */
export async function getAllArticlePosts(): Promise<ArticlePost[]> {
  try {
    const fileContents = await fs.readFile(ARTICLE_DATA_PATH, 'utf8');
    const data: ArticleData = JSON.parse(fileContents);
    return data.posts || [];
  } catch {
    return [];
  }
}

/**
 * Get published article posts only
 */
export async function getPublishedArticlePosts(): Promise<ArticlePost[]> {
  const allPosts = await getAllArticlePosts();
  return allPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
}

/**
 * Get a single article post by slug
 */
export async function getArticlePostBySlug(slug: string): Promise<ArticlePost | null> {
  const allPosts = await getAllArticlePosts();
  return allPosts.find(post => post.slug === slug) || null;
}

/**
 * Get article posts by category
 */
export async function getArticlePostsByCategory(category: string): Promise<ArticlePost[]> {
  const publishedPosts = await getPublishedArticlePosts();
  return publishedPosts.filter(post => post.category === category);
}

/**
 * Get article posts by tag
 */
export async function getArticlePostsByTag(tag: string): Promise<ArticlePost[]> {
  const publishedPosts = await getPublishedArticlePosts();
  return publishedPosts.filter(post => post.tags.includes(tag));
}

/**
 * Search article posts by keyword
 */
export async function searchArticlePosts(keyword: string): Promise<ArticlePost[]> {
  const publishedPosts = await getPublishedArticlePosts();
  const lowerKeyword = keyword.toLowerCase();
  
  return publishedPosts.filter(post =>
    post.title.toLowerCase().includes(lowerKeyword) ||
    post.excerpt.toLowerCase().includes(lowerKeyword) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * Get related article posts (same category, excluding current post)
 */
export async function getRelatedArticlePosts(postId: string, category: string, limit: number = 4): Promise<ArticlePost[]> {
  const publishedPosts = await getPublishedArticlePosts();
  
  return publishedPosts
    .filter(post => post.id !== postId && post.category === category)
    .slice(0, limit);
}

/**
 * Get all unique tags from article posts
 */
export async function getAllTags(): Promise<string[]> {
  const publishedPosts = await getPublishedArticlePosts();
  const tagsSet = new Set<string>();
  
  publishedPosts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet).sort();
}

/**
 * Get all unique categories from article posts
 */
export async function getAllCategories(): Promise<string[]> {
  const publishedPosts = await getPublishedArticlePosts();
  const categoriesSet = new Set<string>();
  
  publishedPosts.forEach(post => {
    categoriesSet.add(post.category);
  });
  
  return Array.from(categoriesSet).sort();
}

/**
 * Calculate read time based on content length
 */
export function calculateReadTime(content: string): number {
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / READ_TIME_WORDS_PER_MINUTE);
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Create a new article post (Admin only)
 */
export async function createArticlePost(post: Omit<ArticlePost, 'id'>): Promise<ArticlePost> {
  const allPosts = await getAllArticlePosts();
  
  // Generate new ID
  const newId = String(Math.max(...allPosts.map(p => parseInt(p.id)), 0) + 1);
  
  const newPost: ArticlePost = {
    ...post,
    id: newId,
    updated_at: new Date().toISOString(),
  };
  
  // Add to posts array
  allPosts.push(newPost);
  
  // Save to file
  await saveArticlePosts(allPosts);
  
  return newPost;
}

/**
 * Update an existing article post (Admin only)
 */
export async function updateArticlePost(id: string, updates: Partial<ArticlePost>): Promise<ArticlePost | null> {
  const allPosts = await getAllArticlePosts();
  const postIndex = allPosts.findIndex(p => p.id === id);
  
  if (postIndex === -1) {
    return null;
  }
  
  allPosts[postIndex] = {
    ...allPosts[postIndex],
    ...updates,
    id, // Ensure ID doesn't change
    updated_at: new Date().toISOString(),
  };
  
  await saveArticlePosts(allPosts);
  
  return allPosts[postIndex];
}

/**
 * Delete an article post (Admin only)
 */
export async function deleteArticlePost(id: string): Promise<boolean> {
  const allPosts = await getAllArticlePosts();
  const filteredPosts = allPosts.filter(p => p.id !== id);
  
  if (filteredPosts.length === allPosts.length) {
    return false; // Post not found
  }
  
  await saveArticlePosts(filteredPosts);
  return true;
}

/**
 * Save article posts to JSON file
 */
async function saveArticlePosts(posts: ArticlePost[]): Promise<void> {
  const data: ArticleData = { posts };
  await fs.writeFile(ARTICLE_DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
}
