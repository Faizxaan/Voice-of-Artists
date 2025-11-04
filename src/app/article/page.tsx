"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArticlePost, CategoryType } from '@/types';
import { ArticleCard } from '@/components/article/ArticleCard';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Search, Filter } from 'lucide-react';
import { ARTIST_CATEGORIES } from '@/lib/constants';

export default function ArticlePage() {
  const [posts, setPosts] = useState<ArticlePost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<ArticlePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Fetch article posts
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch('/api/article');
        const data = await response.json();
        setPosts(data.posts || []);
        setFilteredPosts(data.posts || []);

        // Extract unique tags
        const tags = new Set<string>();
        data.posts?.forEach((post: ArticlePost) => {
          post.tags.forEach(tag => tags.add(tag));
        });
        setAllTags(Array.from(tags).sort());
      } catch {
        // Silently handle error
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Filter posts based on search, category, and tag
  useEffect(() => {
    let filtered = posts;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, selectedTag, posts]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-black text-white py-20 border-b-4 border-black">
        <div className="container max-w-7xl mx-auto px-6">
          <h1 className="font-mono text-4xl md:text-6xl uppercase tracking-wider mb-6">
            VOA Articles
          </h1>
          <div className="w-24 h-px bg-white mb-6"></div>
          <p className="font-mono text-lg max-w-2xl leading-relaxed">
            Stories, insights, and inspiration from the world of art. Explore the creative journeys of artists, industry trends, and the VOA community.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 border-b-2 border-black">
        <div className="container max-w-7xl mx-auto px-6 space-y-8">
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-black font-mono text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Category Filters */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Filter size={16} className="text-black" />
              <span className="font-mono text-sm uppercase tracking-wider">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedTag(null);
                }}
                className={`px-4 py-2 font-mono text-sm border-2 border-black transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                All Categories
              </button>
              {ARTIST_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedTag(null);
                  }}
                  className={`px-4 py-2 font-mono text-sm border-2 border-black transition-all ${
                    selectedCategory === category
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-black hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm uppercase tracking-wider">Popular Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTag(selectedTag === tag ? null : tag);
                      setSelectedCategory('All');
                    }}
                    className={`px-3 py-1 font-mono text-xs uppercase tracking-wider border border-gray-300 transition-all ${
                      selectedTag === tag
                        ? 'bg-black text-white border-black'
                        : 'bg-gray-100 text-black hover:bg-black hover:text-white hover:border-black'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="font-mono text-sm uppercase tracking-wider text-gray-600">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            {(searchQuery || selectedCategory !== 'All' || selectedTag) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedTag(null);
                }}
                className="ml-4 text-black underline hover:no-underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Article Posts Grid */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="font-mono text-lg text-black uppercase tracking-wider">Loading articles...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="font-mono text-xl mb-4 uppercase tracking-wider">No Articles Found</h3>
              <p className="font-mono text-sm text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16 border-t-4 border-black">
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-mono text-3xl uppercase tracking-wider mb-4">
            Join the VOA Community
          </h2>
          <p className="font-mono text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Connect with artists worldwide, share your story, and be part of a platform that celebrates #ArtAboveChart
          </p>
          <Link
            href="/#about-us"
            className="inline-block bg-white text-black px-8 py-4 border-2 border-white font-mono text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all"
          >
            Learn More About VOA
          </Link>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
