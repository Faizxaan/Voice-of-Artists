"use client";

import { useState } from "react";
import { Play, Filter, Search, Calendar, Eye } from "lucide-react";
import { VideoThumbnail } from "@/components/ui/VideoPlayer";
import { YouTubePlayer } from "@/components/ui/VideoPlayer";

interface PromoVideo {
  id: string;
  title: string;
  type: "trailer" | "short" | "group-promo";
  videoId: string;
  thumbnail: string;
  duration: string;
  views: string;
  publishedAt: string;
  description: string;
  tags: string[];
}

const PromoMaterialsSection = () => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedVideo, setSelectedVideo] = useState<PromoVideo | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const promoVideos: PromoVideo[] = [
    {
      id: "1",
      title: "Voice of Artist - Platform Trailer",
      type: "trailer",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "/images/promos/platform-trailer.jpg",
      duration: "2:34",
      views: "15.2K",
      publishedAt: "2024-01-15",
      description:
        "Introducing Voice of Artist - where art meets authenticity. Discover emerging artists and their untold stories.",
      tags: ["platform", "introduction", "artists", "music"],
    },
    {
      id: "2",
      title: "Artist Spotlight: Behind the Scenes",
      type: "short",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "/images/promos/behind-scenes.jpg",
      duration: "0:58",
      views: "8.7K",
      publishedAt: "2024-01-22",
      description:
        "Get a glimpse behind the curtain of our artist selection process and what makes VOA different.",
      tags: ["behind-scenes", "process", "selection"],
    },
    {
      id: "3",
      title: "Community Stories - Artist Collective",
      type: "group-promo",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "/images/promos/community-stories.jpg",
      duration: "4:12",
      views: "22.1K",
      publishedAt: "2024-02-01",
      description:
        "Hear from our growing community of artists about their journey with Voice of Artist.",
      tags: ["community", "testimonials", "collective"],
    },
    {
      id: "4",
      title: "What is Voice of Artist?",
      type: "trailer",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "/images/promos/what-is-voa.jpg",
      duration: "1:47",
      views: "31.4K",
      publishedAt: "2024-02-10",
      description:
        "The philosophy behind our platform: Art Above Chart. Understanding our mission and values.",
      tags: ["philosophy", "mission", "art-above-chart"],
    },
    {
      id: "5",
      title: "Artist Application Process",
      type: "short",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "/images/promos/application-process.jpg",
      duration: "1:23",
      views: "12.8K",
      publishedAt: "2024-02-15",
      description:
        "Step-by-step guide for artists looking to join the Voice of Artist platform.",
      tags: ["application", "guide", "process", "artists"],
    },
    {
      id: "6",
      title: "Featured Artists Showcase",
      type: "group-promo",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "/images/promos/featured-showcase.jpg",
      duration: "3:45",
      views: "18.9K",
      publishedAt: "2024-02-20",
      description:
        "A compilation featuring our most impactful artist stories and performances.",
      tags: ["showcase", "compilation", "featured", "performances"],
    },
  ];

  const filterTypes = [
    { value: "all", label: "All Promos", count: promoVideos.length },
    {
      value: "trailer",
      label: "Trailers",
      count: promoVideos.filter((v) => v.type === "trailer").length,
    },
    {
      value: "short",
      label: "Shorts",
      count: promoVideos.filter((v) => v.type === "short").length,
    },
    {
      value: "group-promo",
      label: "Group Promos",
      count: promoVideos.filter((v) => v.type === "group-promo").length,
    },
  ];

  const filteredVideos = promoVideos.filter((video) => {
    const matchesType = selectedType === "all" || video.type === selectedType;
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesType && matchesSearch;
  });

  const handleVideoClick = (video: PromoVideo) => {
    setSelectedVideo(video);
    setIsPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setSelectedVideo(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "trailer":
        return "bg-black text-white";
      case "short":
        return "bg-black/80 text-white";
      case "group-promo":
        return "bg-black/60 text-white";
      default:
        return "bg-black/40 text-white";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "trailer":
        return "Trailer";
      case "short":
        return "Short";
      case "group-promo":
        return "Group Promo";
      default:
        return type;
    }
  };

  return (
    <section id="promo-materials" className="section-wrapper py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="content-panel text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl text-black mb-6">
            Promo Materials
          </h2>
          <p className="font-mono text-lg md:text-xl text-black/70 max-w-3xl mx-auto">
            Behind-the-scenes content, platform trailers, and promotional videos
            showcasing the Voice of Artist experience.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black/40" />
            <input
              type="text"
              placeholder="Search promo videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-black/20 
                       font-mono text-black placeholder-black/40
                       focus:border-black focus:outline-none transition-colors"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 justify-center">
            {filterTypes.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedType(filter.value)}
                className={`inline-flex items-center gap-2 px-6 py-3 border-2 font-mono text-sm
                          transition-all duration-300 ${
                            selectedType === filter.value
                              ? "bg-black text-white border-black"
                              : "bg-white text-black border-black/20 hover:border-black"
                          }`}
              >
                <Filter className="w-4 h-4" />
                {filter.label}
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    selectedType === filter.value
                      ? "bg-white text-black"
                      : "bg-black/10"
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="content-panel border-2 border-black/20 hover:border-black 
                       hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                       transition-all duration-300 group cursor-pointer"
              onClick={() => handleVideoClick(video)}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-black/10 overflow-hidden">
                <VideoThumbnail
                  videoId={video.videoId}
                  title={video.title}
                  onClick={() => handleVideoClick(video)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Play Button Overlay */}
                <div
                  className="absolute inset-0 bg-black/20 flex items-center justify-center 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="bg-white/90 p-4 rounded-full">
                    <Play className="w-8 h-8 text-black fill-current" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div
                  className="absolute bottom-3 right-3 bg-black text-white px-2 py-1 
                              font-mono text-xs"
                >
                  {video.duration}
                </div>

                {/* Type Badge */}
                <div
                  className={`absolute top-3 left-3 px-3 py-1 text-xs font-mono 
                               uppercase tracking-wider ${getTypeColor(video.type)}`}
                >
                  {getTypeLabel(video.type)}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="font-display text-xl text-black mb-3 group-hover:text-black/80">
                  {video.title}
                </h3>

                <p className="font-mono text-sm text-black/70 mb-4">
                  {video.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs font-mono text-black/60 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(video.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {video.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-black/10 text-black px-2 py-1 text-xs font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                  {video.tags.length > 3 && (
                    <span className="text-black/40 text-xs font-mono">
                      +{video.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-black/5 border-2 border-black/20 p-12 max-w-md mx-auto">
              <h3 className="font-display text-2xl text-black mb-4">
                No Videos Found
              </h3>
              <p className="font-mono text-black/70 mb-6">
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSelectedType("all");
                  setSearchTerm("");
                }}
                className="bg-black text-white px-6 py-3 font-mono text-sm 
                         hover:bg-black/90 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Video Player Modal */}
        {isPlayerOpen && selectedVideo && (
          <YouTubePlayer
            videoId={selectedVideo.videoId}
            title={selectedVideo.title}
            onClose={handleClosePlayer}
          />
        )}
      </div>
    </section>
  );
};

export { PromoMaterialsSection };
