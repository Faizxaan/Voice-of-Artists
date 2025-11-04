# Article System Setup Guide

## Overview
The Voice of Artists Article system allows you to create, publish, and manage editorial content. Articles support rich markdown content, featured images, categories, tags, and full publishing control.

## Features
- ✅ Markdown-based content editing
- ✅ Featured images with upload support
- ✅ Category and tag organization
- ✅ Draft/Published status control
- ✅ Full CRUD operations via admin dashboard
- ✅ Responsive article listing with search and filters
- ✅ SEO-optimized with OpenGraph and Twitter cards
- ✅ Social sharing integration
- ✅ Related articles suggestions

## File Structure

```
Voice-of-Artists/
├── data/
│   └── article-posts.json          # Article data storage
├── public/
│   └── images/
│       └── articles/                # Uploaded article images
├── src/
│   ├── app/
│   │   ├── article/                 # Public article pages
│   │   │   ├── page.tsx            # Article listing
│   │   │   └── [slug]/
│   │   │       ├── page.tsx        # Article detail (server)
│   │   │       └── ArticleDetailClient.tsx
│   │   ├── api/
│   │   │   ├── article/            # Public article API
│   │   │   │   ├── route.ts        # GET articles
│   │   │   │   └── [slug]/
│   │   │   │       └── route.ts    # GET single article
│   │   │   └── admin/
│   │   │       ├── article/        # Admin article management
│   │   │       │   └── route.ts    # POST/PUT/DELETE
│   │   │       └── upload/
│   │   │           └── route.ts    # Image upload
│   │   └── admin/
│   │       └── dashboard/
│   │           └── page.tsx        # Article management UI
│   ├── components/
│   │   └── article/
│   │       ├── ArticleCard.tsx     # Article preview card
│   │       └── ShareButtons.tsx    # Social sharing
│   ├── lib/
│   │   └── article.ts              # Article business logic
│   └── types/
│       └── index.ts                # TypeScript types
```

## Article Data Schema

### ArticlePost Interface
```typescript
interface ArticlePost {
  id: string;
  slug: string;                     // URL-friendly identifier
  title: string;
  excerpt: string;                  // Short summary
  content: string;                  // Markdown content
  featured_image: string;           // Image URL
  author: {
    name: string;
    bio?: string;
    avatar?: string;
  };
  category: CategoryType;           // Artist category
  tags: string[];
  published_at: string;             // ISO date
  updated_at?: string;
  read_time?: number;               // Auto-calculated
  published: boolean;
}
```

## API Endpoints

### Public Endpoints

#### GET /api/article
List all published articles with optional filters.

**Query Parameters:**
- `search` - Keyword search
- `category` - Filter by category
- `tag` - Filter by tag
- `meta=true` - Get tags and categories metadata

**Response:**
```json
{
  "posts": [
    {
      "id": "1",
      "slug": "article-title",
      "title": "Article Title",
      "excerpt": "Brief description...",
      "published": true,
      ...
    }
  ]
}
```

#### GET /api/article/[slug]
Get a single published article by slug.

**Response:**
```json
{
  "post": {
    "id": "1",
    "slug": "article-title",
    "title": "Article Title",
    "content": "# Full markdown content...",
    ...
  }
}
```

### Admin Endpoints (Authentication Required)

#### POST /api/admin/article
Create a new article.

**Request Body:**
```json
{
  "title": "Article Title",
  "excerpt": "Brief description",
  "content": "# Markdown content",
  "featured_image": "/images/articles/image.jpg",
  "category": "Musicians",
  "tags": ["tag1", "tag2"],
  "published": false
}
```

**Response:**
```json
{
  "post": {
    "id": "5",
    "slug": "article-title",
    ...
  }
}
```

#### PUT /api/admin/article
Update an existing article.

**Request Body:**
```json
{
  "id": "5",
  "title": "Updated Title",
  "published": true,
  ...
}
```

#### DELETE /api/admin/article?id=5
Delete an article.

**Response:**
```json
{
  "success": true
}
```

#### POST /api/admin/upload
Upload an article image.

**Request:** multipart/form-data with `image` file
**Response:**
```json
{
  "url": "/images/articles/1234567890-filename.jpg"
}
```

**Constraints:**
- Max file size: 5MB
- Allowed types: JPEG, PNG, WebP, GIF

## Admin Dashboard Usage

### Accessing the Dashboard
1. Navigate to `/admin/login`
2. Enter credentials
3. Access dashboard at `/admin/dashboard`

### Creating an Article
1. Click "New Post" button
2. Fill in required fields:
   - Title (required)
   - Excerpt (required)
   - Content in Markdown (required)
3. Upload or link featured image
4. Select category and add tags
5. Check "Publish Immediately" or save as draft
6. Click "Save Post"

### Editing an Article
1. Find article in dashboard table
2. Click edit icon (pencil)
3. Modify fields as needed
4. Click "Save Post"

### Deleting an Article
1. Find article in dashboard table
2. Click delete icon (trash)
3. Confirm deletion

## Frontend Usage

### Article Listing Page
Access at: `/article`

**Features:**
- Grid view of all published articles
- Search by keyword
- Filter by category
- Filter by tag
- Results count and clear filters

### Article Detail Page
Access at: `/article/[slug]`

**Features:**
- Full markdown content rendering
- Author information
- Related articles
- Social sharing buttons
- Category badge
- Tag links
- Read time estimate

## Library Functions

Located in `src/lib/article.ts`:

```typescript
// Read operations
getAllArticlePosts(): Promise<ArticlePost[]>
getPublishedArticlePosts(): Promise<ArticlePost[]>
getArticlePostBySlug(slug: string): Promise<ArticlePost | null>
getArticlePostsByCategory(category: string): Promise<ArticlePost[]>
getArticlePostsByTag(tag: string): Promise<ArticlePost[]>
searchArticlePosts(keyword: string): Promise<ArticlePost[]>
getRelatedArticlePosts(postId: string, category: string, limit?: number): Promise<ArticlePost[]>

// Metadata
getAllTags(): Promise<string[]>
getAllCategories(): Promise<string[]>

// Utility
calculateReadTime(content: string): number
generateSlug(title: string): string

// Admin operations (authentication required)
createArticlePost(post: Omit<ArticlePost, 'id'>): Promise<ArticlePost>
updateArticlePost(id: string, updates: Partial<ArticlePost>): Promise<ArticlePost | null>
deleteArticlePost(id: string): Promise<boolean>
```

## Categories

Available artist categories:
- Writers
- Directors
- Painters
- Musicians
- Filmmakers
- Designers
- Photographers
- Storytellers
- Curators
- Actors
- Dancers
- Cinematographers

## Markdown Support

Articles support full GitHub-Flavored Markdown (GFM):

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet list
- Item 2

1. Numbered list
2. Item 2

[Link text](https://example.com)

![Image alt text](/images/articles/image.jpg)

> Blockquote

`inline code`

\`\`\`javascript
// Code block
const example = true;
\`\`\`
```

## SEO Configuration

Articles automatically generate:
- Page title: `{article.title} | Voice of Artist Articles`
- Meta description from excerpt
- OpenGraph tags for social sharing
- Twitter Card metadata
- Canonical URLs
- Structured data (coming soon)

## Best Practices

### Writing Articles
1. **Title**: Keep under 60 characters for SEO
2. **Excerpt**: 150-160 characters, compelling summary
3. **Content**: Use headings, lists, and images for readability
4. **Images**: Optimize before upload (< 500KB recommended)
5. **Tags**: 3-5 relevant tags per article
6. **Categories**: Choose the most relevant artist category

### Image Management
1. Upload images through admin dashboard
2. Images saved to `/public/images/articles/`
3. Use descriptive filenames
4. Optimize images before upload
5. Fallback: `/images/articles/default.jpg`

### Publishing Workflow
1. Create article as draft
2. Review and edit
3. Upload featured image
4. Add appropriate tags/category
5. Publish when ready

## Troubleshooting

### Article Not Showing
- Check `published: true` in data
- Verify article has required fields
- Check file permissions on `data/article-posts.json`

### Image Upload Failing
- Check file size (< 5MB)
- Verify file type (JPEG, PNG, WebP, GIF)
- Ensure `/public/images/articles/` directory exists
- Check admin authentication

### API Errors
- Verify authentication for admin endpoints
- Check request body format
- Review server logs for details

## Data Backup

Important files to backup:
- `data/article-posts.json` - All article content
- `public/images/articles/` - All uploaded images

## Migration from Blog

If migrating from the old blog system:
1. Data file already copied: `blog-posts.json` → `article-posts.json`
2. Old URLs redirect automatically: `/blog` → `/article`
3. Old components deprecated but functional via type aliases
4. Old files can be safely deleted after verification

## Future Enhancements

Planned features:
- [ ] Article versioning/revision history
- [ ] Collaborative editing
- [ ] Comment system
- [ ] Article analytics
- [ ] Content scheduling
- [ ] Advanced rich text editor
- [ ] Image optimization pipeline
- [ ] Multi-language support

## Support

For issues or questions:
1. Check this documentation
2. Review `docs/ARTICLE_REBRAND_SUMMARY.md`
3. Check console/server logs
4. Contact development team
