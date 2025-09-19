"use client";

import React from "react";
import { X, Calendar, User, Tag, ExternalLink, Share2 } from "lucide-react";
import { YouTubePlayer } from "@/components/ui/VideoPlayer";
import { QuoteCard } from "@/components/ui";
import { Episode } from "@/types";

interface EpisodeDetailModalProps {
  episode: Episode | null;
  isOpen: boolean;
  onClose: () => void;
  relatedEpisodes?: Episode[];
}

export const EpisodeDetailModal: React.FC<EpisodeDetailModalProps> = ({
  episode,
  isOpen,
  onClose,
  relatedEpisodes = [],
}) => {
  if (!isOpen || !episode) return null;

  const getVideoId = (url: string) => {
    const regex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/episodes/${episode.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: episode.title,
          text: episode.excerpt,
          url,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div
        className="max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-white rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-2 border-black p-6 flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h1 className="font-display text-display-md mb-2">
              {episode.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <User size={14} />
                {episode.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(episode.published_at).toLocaleDateString()}
              </span>
              {episode.featured && (
                <span className="bg-black text-white px-2 py-1 text-xs font-display">
                  FEATURED
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
              aria-label="Share episode"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Video Player */}
          <div className="mb-8">
            <YouTubePlayer
              videoId={getVideoId(episode.youtube_url)}
              title={episode.title}
              description={episode.excerpt}
              published_at={episode.published_at}
              showTranscript={!!episode.transcript}
              transcriptUrl={
                episode.transcript
                  ? `/transcripts/${episode.slug}.txt`
                  : undefined
              }
              className="w-full"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div>
                <h3 className="font-display text-xl mb-4">
                  Episode Description
                </h3>
                <p className="body-text text-gray-700 leading-relaxed">
                  {episode.excerpt}
                </p>
              </div>

              {/* Tags */}
              {episode.tags.length > 0 && (
                <div>
                  <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                    <Tag size={20} />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {episode.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 px-3 py-2 font-mono text-sm border border-gray-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Transcript */}
              {episode.transcript && (
                <div>
                  <h3 className="font-display text-xl mb-4">Transcript</h3>
                  <div className="bg-gray-50 p-6 border border-gray-200 max-h-96 overflow-y-auto">
                    <p className="body-text text-sm leading-relaxed whitespace-pre-wrap">
                      {episode.transcript}
                    </p>
                  </div>
                  <div className="mt-4">
                    <a
                      href={`/transcripts/${episode.slug}.txt`}
                      download
                      className="flex items-center gap-2 cta-button-outline text-sm px-4 py-2"
                    >
                      <ExternalLink size={16} />
                      Download Transcript
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Artist Quote */}
              <div>
                <h3 className="font-display text-xl mb-4">
                  Artist&apos;s Voice
                </h3>
                <QuoteCard
                  quote="Art is my way of speaking truth to the world. Every piece I create carries a part of my soul and a message for those who need to hear it."
                  author="Artist Name"
                  discipline={episode.category}
                  className="w-full"
                />
              </div>

              {/* Related Episodes */}
              {relatedEpisodes.length > 0 && (
                <div>
                  <h3 className="font-display text-xl mb-4">
                    Related Episodes
                  </h3>
                  <div className="space-y-4">
                    {relatedEpisodes.slice(0, 3).map((relatedEpisode) => (
                      <div
                        key={relatedEpisode.id}
                        className="border border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <h4 className="font-display text-lg mb-2 line-clamp-2">
                          {relatedEpisode.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <User size={12} />
                          {relatedEpisode.category}
                        </div>
                        <p className="body-text text-sm text-gray-700 line-clamp-2">
                          {relatedEpisode.excerpt}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <a
                  href={episode.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-lime-500 text-white px-4 py-3 hover:bg-lime-600 transition-colors w-full justify-center"
                >
                  <ExternalLink size={16} />
                  Watch on YouTube
                </a>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 cta-button-outline w-full justify-center px-4 py-3"
                >
                  <Share2 size={16} />
                  Share Episode
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
