import { NextRequest, NextResponse } from 'next/server';
import {
  getPublishedArticlePosts,
  getAllArticlePosts,
  searchArticlePosts,
  getArticlePostsByCategory,
  getArticlePostsByTag,
  getAllTags,
  getAllCategories,
} from '@/lib/article';
import { verifyToken, getTokenFromCookies } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const includeUnpublished = searchParams.get('includeUnpublished') === 'true';
  const meta = searchParams.get('meta') === 'true';

  try {
    // Check auth for unpublished posts
    if (includeUnpublished) {
      const token = getTokenFromCookies(request.headers.get('cookie') || '');
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const user = await verifyToken(token);
      if (!user) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    }

    // Return metadata (tags, categories)
    if (meta) {
      const [tags, categories] = await Promise.all([
        getAllTags(),
        getAllCategories(),
      ]);
      return NextResponse.json({ tags, categories });
    }

    let posts;

    if (search) {
      posts = await searchArticlePosts(search);
    } else if (category) {
      posts = await getArticlePostsByCategory(category);
    } else if (tag) {
      posts = await getArticlePostsByTag(tag);
    } else if (includeUnpublished) {
      posts = await getAllArticlePosts();
    } else {
      posts = await getPublishedArticlePosts();
    }

    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch article posts' },
      { status: 500 }
    );
  }
}
