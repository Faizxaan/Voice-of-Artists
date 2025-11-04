import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticlePostBySlug, getRelatedArticlePosts } from '@/lib/article';
import { ArticleDetailClient } from './ArticleDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticlePostBySlug(slug);

  if (!post || !post.published) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Voice of Artist Articles`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featured_image],
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featured_image],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getArticlePostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const relatedPosts = await getRelatedArticlePosts(post.id, post.category, 4);

  return <ArticleDetailClient post={post} relatedPosts={relatedPosts} />;
}
