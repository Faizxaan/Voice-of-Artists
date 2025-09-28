"use client";

import React, { useState, useMemo, useEffect } from "react";
import { VideoThumbnail } from "@/components/ui/VideoPlayer";
import { EpisodeDetailModal } from "@/components/ui/EpisodeDetailModal";
import { SectionHeading } from "@/components/ui";
import { Episode, CategoryType } from "@/types";
import { Filter, Calendar, User, Tag } from "lucide-react";
import { getVOAEpisodes } from "@/lib/youtube";

interface EpisodesHubProps {
  episodes?: Episode[];
  className?: string;
}

const categories: CategoryType[] = [
  "Writers",
  "Directors",
  "Painters",
  "Musicians",
  "Filmmakers",
  "Designers",
  "Photographers",
  "Storytellers",
  "Curators",
  "Actors",
  "Dancers",
  "Cinematographers",
];

export const EpisodesHub: React.FC<EpisodesHubProps> = ({
  episodes: propEpisodes,
  className = "",
}) => {
  const [episodes, setEpisodes] = useState<Episode[]>(propEpisodes || []);
  const [loading, setLoading] = useState<boolean>(!propEpisodes);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | "All"
  >("All");
  const [sortBy, setSortBy] = useState<"newest" | "featured">("newest");
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch YouTube episodes on component mount
  useEffect(() => {
    if (!propEpisodes) {
      const fetchEpisodes = async () => {
        try {
          setLoading(true);
          setError(null);
          const voaEpisodes = await getVOAEpisodes();
          setEpisodes(voaEpisodes);
        } catch (err) {
          setError('Failed to load episodes');
          console.error('❌ Error loading episodes:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchEpisodes();
    } else {
      // Using provided episodes
    }
  }, [propEpisodes]);

  const filteredAndSortedEpisodes = useMemo(() => {
    let filtered = episodes;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (episode: Episode) => episode.category === selectedCategory
      );
    }

    // Sort episodes
    return filtered.sort((a: Episode, b: Episode) => {
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
    if (!url) {
      console.warn('Empty URL provided to getVideoId');
      return "";
    }
    
    console.log('🎬 Processing YouTube URL:', url);
    
    // More comprehensive regex to handle different YouTube URL formats
    const regexPatterns = [
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
      /youtube\.com\/watch\?v=([^"&?\/\s]{11})/,
      /youtu\.be\/([^"&?\/\s]{11})/,
      /youtube\.com\/embed\/([^"&?\/\s]{11})/,
      /youtube\.com\/v\/([^"&?\/\s]{11})/
    ];
    
    let videoId = "";
    for (const regex of regexPatterns) {
      const match = url.match(regex);
      if (match && match[1]) {
        videoId = match[1];
        break;
      }
    }
    
    if (!videoId) {
      console.warn('Failed to extract video ID from URL:', url);
      return "";
    }
    
    // Validate video ID format (should be 11 characters, alphanumeric + underscores/hyphens)
    if (videoId.length !== 11 || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      console.warn('Invalid video ID format:', videoId);
      return "";
    }
    
    console.log('✅ Extracted video ID:', videoId);
    return videoId;
  };

  return (
    <>
      <section
        id="episodes"
        className={`py-20 bg-white relative overflow-hidden ${className}`}
      >
        {/* Black & White Brand Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/20 to-transparent"></div>
          <div className="absolute top-20 right-20 w-px h-32 bg-black transform rotate-45"></div>
          <div className="absolute bottom-32 left-16 w-px h-24 bg-black transform -rotate-12"></div>
          <div className="absolute top-1/2 left-1/4 w-px h-16 bg-gray-300"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-mono text-5xl md:text-6xl text-black uppercase tracking-wider mb-4">
              Episodes
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-6"></div>
            <p className="font-mono text-lg text-gray-700 max-w-2xl mx-auto">
              Discover authentic artist stories from around the world
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="font-mono text-lg text-black">Loading episodes from @Voauniverse...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-white border-2 border-black text-black px-6 py-4 max-w-md mx-auto mb-4">
                <p className="font-mono text-sm">{error}</p>
              </div>
              <a
                href="https://www.youtube.com/@Voauniverse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-mono text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                <span>📺</span>
                View on YouTube Instead
              </a>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Filters and Controls */}
              <div className="mb-12">
                <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className={`px-4 py-2 font-mono text-sm border-2 border-black transition-all duration-300 ${
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
                        className={`px-4 py-2 font-mono text-sm border-2 border-black transition-all duration-300 ${
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
                    <span className="font-mono text-sm flex items-center gap-2 text-black">
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

              {/* Episodes Horizontal Scroll */}
              <div className="relative">
                {/* Scroll container */}
                <div className="overflow-x-auto scrollbar-hide pb-4">
                  <div className="flex gap-6 w-max">
                    {filteredAndSortedEpisodes.map((episode: Episode) => {
                      const videoId = getVideoId(episode.youtube_url);
                      
                      return (
                        <div
                          key={episode.id}
                          className="episode-card bg-white border-2 border-black cursor-pointer hover:shadow-lg transition-all duration-300 group w-80 flex-shrink-0"
                          onClick={() => handleEpisodeClick(episode)}
                        >
                          {/* Episode Thumbnail */}
                          <div className="relative mb-4">
                            <VideoThumbnail
                              videoId={videoId}
                              title={episode.title}
                              onClick={() => handleEpisodeClick(episode)}
                              className="mb-0"
                              thumbnailUrl={episode.thumbnail_url}
                            />
                            
                            {/* YouTube Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none">
                              <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center opacity-0 group-hover:opacity-90 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                                <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* Episode Info */}
                          <div className="p-4 space-y-3">
                            {/* Featured Badge */}
                            {episode.featured && (
                              <span className="inline-block bg-black text-white px-2 py-1 text-xs font-mono uppercase tracking-wider">
                                ⭐ Featured
                              </span>
                            )}

                            {/* Title */}
                            <h3 className="font-mono text-base leading-tight line-clamp-2 group-hover:underline transition-all uppercase tracking-wider text-black">
                              {episode.title}
                            </h3>

                            {/* Category and Date */}
                            <div className="flex items-center gap-4 text-xs text-gray-600 font-mono uppercase tracking-wider">
                              <span className="flex items-center gap-1">
                                <User size={12} />
                                {episode.category}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {new Date(episode.published_at).toLocaleDateString()}
                              </span>
                            </div>

                            {/* Excerpt */}
                            <p className="font-mono text-xs text-gray-700 line-clamp-3 leading-relaxed tracking-wide">
                              {episode.excerpt}
                            </p>

                            {/* Tags */}
                            {episode.tags.length > 0 && (
                              <div className="flex items-start gap-2">
                                <Tag size={12} className="mt-1 text-gray-400 flex-shrink-0" />
                                <div className="flex flex-wrap gap-1">
                                  {episode.tags.slice(0, 2).map((tag: string) => (
                                    <span
                                      key={tag}
                                      className="text-xs bg-gray-100 border border-gray-300 px-2 py-1 font-mono uppercase tracking-wider transition-colors cursor-pointer hover:bg-black hover:text-white hover:border-black"
                                      title={`Filter by #${tag}`}
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                  {episode.tags.length > 2 && (
                                    <span className="text-xs text-gray-500 px-2 py-1 font-mono uppercase tracking-wider">
                                      +{episode.tags.length - 2} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* YouTube Link */}
                            <div className="pt-3 border-t border-gray-200">
                              <a
                                href={episode.youtube_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-xs font-mono uppercase tracking-wider transition-colors"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23.498 6.186a2.56 2.56 0 0 0-1.855-1.767C19.73 4 12.228 4 12.228 4s-7.502 0-9.415.419a2.56 2.56 0 0 0-1.855 1.767C.539 7.714.539 12.265.539 12.265s0 4.551.419 6.079a2.56 2.56 0 0 0 1.855 1.767c1.913.419 9.415.419 9.415.419s7.502 0 9.415-.419a2.56 2.56 0 0 0 1.855-1.767c.419-1.528.419-6.079.419-6.079s0-4.551-.419-6.079zM9.879 15.623V8.907l6.264 3.358-6.264 3.358z"/>
                                </svg>
                                Watch on YouTube
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Scroll indicators for mobile */}
                <div className="flex justify-center mt-4 lg:hidden">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                    <span>Swipe to see more episodes</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* No Results */}
              {filteredAndSortedEpisodes.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="font-mono text-xl mb-4 uppercase tracking-wider">No Episodes Found</h3>
                  <p className="font-mono text-sm text-gray-600 tracking-wide">
                    No episodes match your current filter. Try selecting a different
                    category.
                  </p>
                </div>
              )}

              {/* Results Count */}
              <div className="mt-8 text-center">
                <p className="font-mono text-sm text-gray-600 mb-4 uppercase tracking-wider">
                  Showing {filteredAndSortedEpisodes.length} of {episodes.length}{" "}
                  episodes
                  {selectedCategory !== "All" && ` in ${selectedCategory}`}
                </p>

                {/* YouTube Channel Link */}
                <a
                  href="https://www.youtube.com/@Voauniverse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-mono text-sm uppercase tracking-wider transition-all duration-300 border-2 border-red-600 hover:border-red-700"
                >
                  <span>📺</span>
                  Visit YouTube Channel
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Episode Detail Modal */}
      <EpisodeDetailModal
        episode={selectedEpisode}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        relatedEpisodes={filteredAndSortedEpisodes
          .filter(
            (ep: Episode) =>
              ep.id !== selectedEpisode?.id &&
              ep.category === selectedEpisode?.category
          )
          .slice(0, 3)}
      />
    </>
  );
};
