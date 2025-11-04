"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArticlePost } from '@/types';
import { ShareButtons } from '@/components/article/ShareButtons';
import { ArticleCard } from '@/components/article/ArticleCard';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Calendar, User, Clock, Tag, ArrowLeft } from 'lucide-react';
import { marked } from 'marked';

interface ArticleDetailClientProps {
  post: ArticlePost;
  relatedPosts: ArticlePost[];
}

export const ArticleDetailClient: React.FC<ArticleDetailClientProps> = ({ post, relatedPosts }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [imageError, setImageError] = useState(false);
  const fallbackImage = '/images/Voice of Artist Logo-4.png';

  useEffect(() => {
    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    // Convert markdown to HTML
    const html = marked(post.content);
    setHtmlContent(html as string);
  }, [post.content]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="container max-w-7xl mx-auto px-6 py-6">
        <Link
          href="/article"
          className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-black hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Articles
        </Link>
      </div>

      {/* Featured Image */}
      <div className="relative w-full bg-gray-200 border-y-4 border-black overflow-hidden">
        <div className="relative w-full flex items-center justify-center" style={{ maxHeight: '500px', minHeight: '300px' }}>
          <img
            src={imageError ? fallbackImage : post.featured_image}
            alt={post.title}
            className="w-full h-auto object-contain"
            style={{ maxHeight: '500px' }}
            onError={() => setImageError(true)}
            loading="eager"
          />
        </div>
        {/* Category Badge */}
        <div className="absolute bottom-8 left-8 bg-black text-white px-4 py-2 font-mono text-sm uppercase tracking-wider">
          {post.category}
        </div>
      </div>

      {/* Article Content */}
      <article className="container max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12 space-y-6">
          <h1 className="font-mono text-3xl md:text-5xl uppercase tracking-wider leading-tight">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 font-mono uppercase tracking-wider pb-6 border-b-2 border-black">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>
                {new Date(post.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            {post.read_time && (
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.read_time} min read</span>
              </div>
            )}
          </div>

          {/* Excerpt */}
          <p className="text-lg font-mono leading-relaxed text-gray-700 border-l-4 border-black pl-6">
            {post.excerpt}
          </p>
        </header>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none font-mono leading-relaxed mb-12"
          style={{
            fontSize: '1rem',
            lineHeight: '1.8',
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-12 pb-12 border-b-2 border-black">
            <div className="flex items-start gap-3 mb-4">
              <Tag size={16} className="mt-1" />
              <span className="font-mono text-sm uppercase tracking-wider">Topics:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/article?tag=${tag}`}
                  className="bg-gray-100 border border-gray-300 text-black px-3 py-2 font-mono text-xs uppercase tracking-wider hover:bg-black hover:text-white hover:border-black transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        {post.author.bio && (
          <div className="mb-12 p-6 bg-gray-50 border-2 border-black">
            <h3 className="font-mono text-lg uppercase tracking-wider mb-4">About the Author</h3>
            <div className="flex items-start gap-4">
              {post.author.avatar && (
                <div className="w-16 h-16 bg-gray-200 border-2 border-black flex-shrink-0">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${post.author.avatar})`,
                    }}
                  />
                </div>
              )}
              <div>
                <h4 className="font-mono text-base uppercase tracking-wider mb-2">{post.author.name}</h4>
                <p className="font-mono text-sm text-gray-700 leading-relaxed">{post.author.bio}</p>
              </div>
            </div>
          </div>
        )}

        {/* Share Buttons */}
        <div className="mb-16 pb-16 border-b-2 border-black">
          <ShareButtons
            title={post.title}
            url={`/article/${post.slug}`}
            excerpt={post.excerpt}
          />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-mono text-2xl uppercase tracking-wider mb-8">
              More Articles in {post.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <ArticleCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </article>

      {/* CTA Section */}
      <section className="bg-black text-white py-16 border-t-4 border-black">
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-mono text-3xl uppercase tracking-wider mb-4">
            Explore More VOA Content
          </h2>
          <p className="font-mono text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover artist stories, watch episodes, and join our growing community
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/article"
              className="inline-block bg-white text-black px-8 py-4 border-2 border-white font-mono text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all"
            >
              All Articles
            </Link>
            <Link
              href="/#episodes"
              className="inline-block bg-black text-white px-8 py-4 border-2 border-white font-mono text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all"
            >
              Watch Episodes
            </Link>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};
