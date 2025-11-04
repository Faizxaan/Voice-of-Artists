import { NextResponse } from 'next/server';
import { getArticlePostBySlug } from '@/lib/article';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await getArticlePostBySlug(slug);

    if (!post) {
      return NextResponse.json(
        { error: 'Article post not found' },
        { status: 404 }
      );
    }

    // Only return published posts to public
    if (!post.published) {
      return NextResponse.json(
        { error: 'Article post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch article post' },
      { status: 500 }
    );
  }
}
