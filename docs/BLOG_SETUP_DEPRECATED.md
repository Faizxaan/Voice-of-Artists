# VOA Blog Setup & Usage Guide

## Overview

The Voice of Artist website now includes a fully functional blog system with an admin interface for managing blog posts.

## Features Implemented

### Public Blog Features
- ✅ Blog home page at `/blog` with post grid layout
- ✅ Search functionality (search by title, excerpt, or tags)
- ✅ Category filters (Writers, Directors, Musicians, etc.)
- ✅ Tag filters (click tags to filter posts)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Blog detail pages at `/blog/[slug]` with:
  - Full markdown content rendering
  - Author bio section
  - Social share buttons (LinkedIn, Twitter, Facebook)
  - Related posts section
  - SEO meta tags (OpenGraph, Twitter Cards)

### Admin Features
- ✅ Admin login at `/admin/login`
- ✅ Admin dashboard at `/admin/dashboard`
- ✅ Create new blog posts
- ✅ Edit existing blog posts
- ✅ Delete blog posts
- ✅ Publish/unpublish posts
- ✅ Markdown content editor
- ✅ Category and tag management
- ✅ Secure authentication with JWT tokens

### Navigation
- ✅ "BLOG" menu item added to main navigation (after "Artists Around World")

## Quick Start

### Access the Blog

1. **View Blog Posts**: Visit `http://localhost:3000/blog`
2. **Admin Login**: Visit `http://localhost:3000/admin/login`
   - **Username**: `admin`
   - **Password**: `admin123`

### Admin Dashboard

Once logged in at `/admin/dashboard`, you can:

- **Create New Post**: Click "New Post" button
- **Edit Post**: Click the edit icon on any post
- **Delete Post**: Click the trash icon on any post
- **View Site**: Click "View Site" to open the main site in a new tab
- **Logout**: Click "Logout" to end your session

## Data Storage

Blog posts are stored in JSON format at `/data/blog-posts.json`. This file contains:
- All blog posts (published and unpublished)
- Post metadata (title, excerpt, content, author, tags, etc.)

### Sample Post Structure

```json
{
  "id": "1",
  "slug": "welcome-to-voa-blog",
  "title": "Welcome to VOA Blog",
  "excerpt": "A short summary of the post",
  "content": "# Full markdown content here",
  "featured_image": "/images/blog/welcome.jpg",
  "author": {
    "name": "Author Name",
    "bio": "Author bio",
    "avatar": "/images/authors/author.jpg"
  },
  "category": "Storytellers",
  "tags": ["welcome", "community"],
  "published_at": "2025-01-15T10:00:00Z",
  "read_time": 3,
  "published": true
}
```

## Creating Blog Posts

### Using the Admin Dashboard

1. Login to `/admin/login`
2. Click "New Post" in the dashboard
3. Fill in the required fields:
   - **Title**: Post title (required)
   - **Excerpt**: Short summary (required, 1-2 sentences)
   - **Content**: Full post content in Markdown (required)
   - **Featured Image URL**: URL to post image
   - **Category**: Select from dropdown
   - **Tags**: Comma-separated list (e.g., "art, creativity, tips")
   - **Publish**: Check to publish immediately, uncheck to save as draft
4. Click "Save Post"

### Markdown Support

The content field supports standard Markdown:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

> Blockquote

[Link text](https://example.com)
```

## API Endpoints

### Public Endpoints

- `GET /api/blog` - Get all published posts
  - Query params: `?search=keyword`, `?category=Writers`, `?tag=art`
- `GET /api/blog/[slug]` - Get single post by slug

### Admin Endpoints (Requires Authentication)

- `POST /api/admin/blog` - Create new post
- `PUT /api/admin/blog` - Update existing post
- `DELETE /api/admin/blog?id={postId}` - Delete post

### Authentication Endpoints

- `POST /api/auth/login` - Login with username/password
- `POST /api/auth/logout` - Logout and clear session
- `GET /api/auth/verify` - Verify current session

## Authentication

### How It Works

1. Admin logs in with credentials
2. Server creates a JWT token and sets it as an HTTP-only cookie
3. Token is valid for 24 hours
4. All admin routes verify the token before allowing access
5. Token is cleared on logout

### Security Features

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with 24-hour expiration
- HTTP-only cookies (not accessible via JavaScript)
- Server-side session verification
- Protected admin routes

### Demo Credentials

For development/testing:
- **Username**: admin
- **Password**: admin123

**⚠️ IMPORTANT**: Change these credentials in production!

## Image Management

### Blog Post Images

Place blog post featured images in:
```
/public/images/blog/
```

Example:
```
/public/images/blog/welcome-post.jpg
/public/images/blog/creative-process.jpg
```

### Author Images

Place author avatars in:
```
/public/images/authors/
```

Example:
```
/public/images/authors/voa-team.jpg
/public/images/authors/sarah-mitchell.jpg
```

### Image URLs in Posts

Use relative paths in the admin dashboard:
```
/images/blog/my-post-image.jpg
/images/authors/my-avatar.jpg
```

## SEO Features

Each blog post page includes:
- Dynamic page title and meta description
- OpenGraph tags for social sharing
- Twitter Card tags
- Structured data (article schema)
- Author information
- Published date
- Tags as keywords

## Styling & Design

The blog follows the VOA brand guidelines:
- Black & white color scheme
- Monospace typography (JetBrains Mono)
- 2px borders with sharp edges
- Minimal geometric elements
- High contrast for readability
- Responsive grid layouts

## Development

### File Structure

```
Voice-of-Artists/
├── data/
│   ├── blog-posts.json          # Blog post data storage
│   └── admin-users.json         # Admin user credentials
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   ├── page.tsx         # Blog home page
│   │   │   └── [slug]/
│   │   │       ├── page.tsx     # Blog detail page (server)
│   │   │       └── BlogDetailClient.tsx  # Client component
│   │   ├── admin/
│   │   │   ├── login/page.tsx   # Admin login
│   │   │   └── dashboard/page.tsx  # Admin dashboard
│   │   └── api/
│   │       ├── blog/            # Blog API routes
│   │       ├── admin/blog/      # Admin blog CRUD
│   │       └── auth/            # Authentication routes
│   ├── components/
│   │   └── blog/
│   │       ├── BlogCard.tsx     # Post preview card
│   │       └── ShareButtons.tsx # Social sharing
│   ├── lib/
│   │   ├── blog.ts              # Blog utilities
│   │   └── auth.ts              # Auth utilities
│   └── types/
│       └── index.ts             # TypeScript types
```

### Dependencies Added

- `bcryptjs` - Password hashing
- `jose` - JWT token handling
- `marked` - Markdown to HTML conversion

## Deployment

### Environment Variables (Optional)

For production, set these environment variables:

```bash
JWT_SECRET=your-secure-random-secret-key
```

If not set, a default key is used (only for development).

### Production Checklist

- [ ] Change admin password in `/data/admin-users.json`
- [ ] Set strong JWT_SECRET environment variable
- [ ] Review and update CORS settings if needed
- [ ] Ensure `/data` directory has proper write permissions
- [ ] Add real blog post images to `/public/images/blog/`
- [ ] Test all admin functionality
- [ ] Test blog post creation and editing
- [ ] Verify social sharing links work
- [ ] Check SEO meta tags in production

## Troubleshooting

### Common Issues

**Q: Can't login to admin dashboard**
- Check credentials: username `admin`, password `admin123`
- Check browser console for errors
- Verify cookies are enabled

**Q: Blog posts not showing**
- Check `/data/blog-posts.json` exists and is valid JSON
- Verify posts have `published: true`
- Check browser console for API errors

**Q: Images not loading**
- Verify image files exist in `/public/images/`
- Check file paths are correct (use relative paths)
- Ensure image URLs don't have typos

**Q: Can't create/edit posts**
- Verify you're logged in as admin
- Check browser console for errors
- Verify `/data/blog-posts.json` has write permissions

## Future Enhancements

Potential features to add:
- [ ] Image upload functionality
- [ ] Rich text editor (WYSIWYG)
- [ ] Post scheduling (publish at specific date/time)
- [ ] Comments system
- [ ] Post views/analytics
- [ ] Multiple admin users with roles
- [ ] Email notifications
- [ ] RSS feed
- [ ] Newsletter integration
- [ ] Database migration (from JSON to PostgreSQL/MongoDB)

## Support

For issues or questions:
1. Check this documentation
2. Review code comments in source files
3. Check browser console for errors
4. Review API responses in Network tab

---

**Built with ❤️ for the VOA Community**

*Art Above Chart - Every voice matters in the symphony of change.*
