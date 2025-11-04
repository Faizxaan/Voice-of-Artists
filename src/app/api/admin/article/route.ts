import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromCookies } from '@/lib/auth';
import { createArticlePost, updateArticlePost, deleteArticlePost, generateSlug, calculateReadTime } from '@/lib/article';
import { ArticlePost } from '@/types';
import { DEFAULT_ARTICLE_IMAGE } from '@/lib/constants';

// Middleware to verify admin authentication
async function verifyAdmin(request: NextRequest) {
  const token = getTokenFromCookies(request.headers.get('cookie') || '');
  
  if (!token) {
    return null;
  }
  
  return await verifyToken(token);
}

// Create new article post
export async function POST(request: NextRequest) {
  const user = await verifyAdmin(request);
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content || !body.excerpt) {
      return NextResponse.json(
        { error: 'Title, content, and excerpt are required' },
        { status: 400 }
      );
    }
    
    // Generate slug if not provided
    const slug = body.slug || generateSlug(body.title);
    
    // Calculate read time
    const read_time = calculateReadTime(body.content);
    
    const newPost: Omit<ArticlePost, 'id'> = {
      slug,
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      featured_image: body.featured_image || DEFAULT_ARTICLE_IMAGE,
      author: body.author || {
        name: user.name || user.username,
        bio: '',
      },
      category: body.category || 'Storytellers',
      tags: body.tags || [],
      published_at: body.published_at || new Date().toISOString(),
      read_time,
      published: body.published !== undefined ? body.published : false,
    };
    
    const createdPost = await createArticlePost(newPost);
    
    return NextResponse.json({ post: createdPost }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create article post' },
      { status: 500 }
    );
  }
}

// Update article post
export async function PUT(request: NextRequest) {
  const user = await verifyAdmin(request);
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }
    
    // Update read time if content changed
    if (body.content) {
      body.read_time = calculateReadTime(body.content);
    }
    
    const updatedPost = await updateArticlePost(body.id, body);
    
    if (!updatedPost) {
      return NextResponse.json(
        { error: 'Article post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ post: updatedPost });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update article post' },
      { status: 500 }
    );
  }
}

// Delete article post
export async function DELETE(request: NextRequest) {
  const user = await verifyAdmin(request);
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }
    
    const success = await deleteArticlePost(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Article post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete article post' },
      { status: 500 }
    );
  }
}
