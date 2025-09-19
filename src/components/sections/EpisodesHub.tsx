"use client";

import React, { useState, useMemo } from "react";
import { VideoThumbnail } from "@/components/ui/VideoPlayer";
import { EpisodeDetailModal } from "@/components/ui/EpisodeDetailModal";
import { SectionHeading } from "@/components/ui";
import { Episode, CategoryType } from "@/types";
import { Filter, Calendar, User, Tag } from "lucide-react";

interface EpisodesHubProps {
  episodes?: Episode[];
  className?: string;
}

// Mock data - this would come from CMS in real implementation
const mockEpisodes: Episode[] = [
  {
    id: "1",
    title: "Finding My Voice Through Paint",
    slug: "finding-voice-paint",
    excerpt:
      "Artist Sarah Johnson shares her journey from traditional techniques to abstract expression, discovering her unique voice in the world of contemporary art.",
    youtube_url: "https://youtu.be/dQw4w9WgXcQ",
    thumbnail_url: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    category: "Painters",
    tags: ["abstract", "contemporary", "journey"],
    published_at: "2024-01-15",
    featured: true,
    assets: [],
  },
  {
    id: "2",
    title: "Words That Move Mountains",
    slug: "words-move-mountains",
    excerpt:
      "Poet and author Marcus Williams discusses the power of spoken word and how poetry became his tool for social change.",
    youtube_url: "https://youtu.be/dQw4w9WgXcQ",
    thumbnail_url: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    category: "Writers",
    tags: ["poetry", "social-change", "spoken-word"],
    published_at: "2024-01-10",
    featured: false,
    assets: [],
  },
  {
    id: "3",
    title: "Melodies of Memory",
    slug: "melodies-memory",
    excerpt:
      "Composer Elena Rodriguez explores how childhood memories shaped her musical style and her approach to creating emotional soundscapes.",
    youtube_url: "https://youtu.be/dQw4w9WgXcQ",
    thumbnail_url: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    category: "Musicians",
    tags: ["classical", "memory", "composition"],
    published_at: "2024-01-05",
    featured: true,
    assets: [],
  },
  {
    id: "4",
    title: "Through the Lens of Truth",
    slug: "lens-of-truth",
    excerpt:
      "Documentary photographer James Chen talks about capturing authentic moments and the responsibility that comes with visual storytelling.",
    youtube_url: "https://youtu.be/dQw4w9WgXcQ",
    thumbnail_url: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    category: "Photographers",
    tags: ["documentary", "storytelling", "authenticity"],
    published_at: "2024-01-01",
    featured: false,
    assets: [],
  },
];

const categories: CategoryType[] = [
  "Writers",
  "Directors",
  "Painters",
  "Musicians",
  "Filmmakers",
  "Designers",
  "Photographers",
  "Storytellers",
];

export const EpisodesHub: React.FC<EpisodesHubProps> = ({
  episodes = mockEpisodes,
  className = "",
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | "All"
  >("All");
  const [sortBy, setSortBy] = useState<"newest" | "featured">("newest");
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAndSortedEpisodes = useMemo(() => {
    let filtered = episodes;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (episode) => episode.category === selectedCategory
      );
    }

    // Sort episodes
    return filtered.sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
      }
      // Default to newest first
      return (
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );
    });
  }, [episodes, selectedCategory, sortBy]);

  const handleEpisodeClick = (episode: Episode) => {
    setSelectedEpisode(episode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEpisode(null);
  };

  const getVideoId = (url: string) => {
    const regex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  return (
    <>
      <section
        id="episodes"
        className={`py-20 bg-raindrops relative ${className}`}
      >
        {/* Background texture */}
        <div className="absolute inset-0 bg-raindrops opacity-5"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <SectionHeading withTape className="mb-16">
            Episodes
          </SectionHeading>

          {/* Filters and Controls */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`px-4 py-2 font-display text-sm border-2 border-black transition-all duration-300 ${
                    selectedCategory === "All"
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  All Episodes
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 font-display text-sm border-2 border-black transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort Controls */}
              <div className="flex items-center gap-4">
                <span className="body-text text-sm flex items-center gap-2">
                  <Filter size={16} />
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "newest" | "featured")
                  }
                  className="px-3 py-2 border-2 border-black font-mono text-sm bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="featured">Featured First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Episodes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAndSortedEpisodes.map((episode) => (
              <div
                key={episode.id}
                className="episode-card p-4 bg-white border-2 border-black cursor-pointer"
                onClick={() => handleEpisodeClick(episode)}
              >
                {/* Episode Thumbnail */}
                <VideoThumbnail
                  videoId={getVideoId(episode.youtube_url)}
                  title={episode.title}
                  onClick={() => handleEpisodeClick(episode)}
                  className="mb-4"
                />

                {/* Episode Info */}
                <div className="space-y-3">
                  {/* Featured Badge */}
                  {episode.featured && (
                    <span className="inline-block bg-black text-white px-2 py-1 text-xs font-display">
                      FEATURED
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="font-display text-lg leading-tight line-clamp-2">
                    {episode.title}
                  </h3>

                  {/* Category and Date */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {episode.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(episode.published_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Excerpt */}
                  <p className="body-text text-sm text-gray-700 line-clamp-3">
                    {episode.excerpt}
                  </p>

                  {/* Tags */}
                  {episode.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag size={14} />
                      <div className="flex flex-wrap gap-2">
                        {episode.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 px-2 py-1 rounded font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                        {episode.tags.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{episode.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredAndSortedEpisodes.length === 0 && (
            <div className="text-center py-12">
              <h3 className="font-display text-xl mb-4">No Episodes Found</h3>
              <p className="body-text text-gray-600">
                No episodes match your current filter. Try selecting a different
                category.
              </p>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-8 text-center">
            <p className="body-text text-sm text-gray-600">
              Showing {filteredAndSortedEpisodes.length} of {episodes.length}{" "}
              episodes
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>
        </div>
      </section>

      {/* Episode Detail Modal */}
      <EpisodeDetailModal
        episode={selectedEpisode}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        relatedEpisodes={filteredAndSortedEpisodes
          .filter(
            (ep) =>
              ep.id !== selectedEpisode?.id &&
              ep.category === selectedEpisode?.category
          )
          .slice(0, 3)}
      />
    </>
  );
};
