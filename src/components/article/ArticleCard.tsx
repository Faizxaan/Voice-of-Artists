"use client";

import React from 'react';
import Link from 'next/link';
import { ArticlePost } from '@/types';
import { Calendar, User, Clock, Tag } from 'lucide-react';

interface ArticleCardProps {
  post: ArticlePost;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  return (
    <Link href={`/article/${post.slug}`} className="group block h-full">
      <article className="bg-white border-2 border-black hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Featured Image */}
        <div className="relative aspect-video bg-gray-200 border-b-2 border-black overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundImage: `url(${post.featured_image})`,
            }}
          />
          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-mono text-xs uppercase tracking-wider">
            {post.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="font-mono text-lg uppercase tracking-wider leading-tight line-clamp-2 group-hover:underline transition-all">
            {post.title}
          </h3>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 font-mono uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <User size={12} />
              {post.author.name}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            {post.read_time && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.read_time} min read
              </span>
            )}
          </div>

          {/* Excerpt */}
          <p className="font-mono text-sm text-gray-700 line-clamp-3 leading-relaxed flex-1">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex items-start gap-2 pt-2">
              <Tag size={12} className="mt-1 text-gray-400 flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 border border-gray-300 px-2 py-1 font-mono uppercase tracking-wider hover:bg-black hover:text-white hover:border-black transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-gray-500 px-2 py-1 font-mono">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Read More */}
          <div className="pt-4 border-t border-gray-200">
            <span className="font-mono text-xs uppercase tracking-wider text-black group-hover:underline">
              Read Full Article →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
