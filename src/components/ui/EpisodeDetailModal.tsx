"use client";

import React from "react";
import { X, Calendar, User, Tag, ExternalLink, Share2 } from "lucide-react";
import { YouTubePlayer } from "@/components/ui/VideoPlayer";
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-85 backdrop-blur-sm flex items-start justify-center overflow-y-auto" onClick={onClose}>
      <div
        className="w-full max-w-6xl mx-4 my-8 bg-white border-4 border-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Brand Black & White */}
        <div className="bg-black text-white p-6 border-b-2 border-black">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h1 className="font-mono text-lg uppercase tracking-wider mb-2 leading-tight">
                {episode.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-wider">
                <span className="flex items-center gap-1 bg-white text-black px-2 py-1">
                  <User size={12} />
                  {episode.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(episode.published_at).toLocaleDateString()}
                </span>
                {episode.featured && (
                  <span className="bg-white text-black px-2 py-1 font-mono text-xs uppercase">
                    ⭐ Featured
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-3 border-2 border-white hover:bg-white hover:text-black transition-all font-mono text-xs uppercase"
                aria-label="Share episode"
              >
                <Share2 size={16} />
              </button>
              <button
                onClick={onClose}
                className="p-3 border-2 border-white hover:bg-white hover:text-black transition-all font-mono text-xs uppercase"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white">
          {/* Video Player */}
          <div className="mb-8">
            <div className="border-4 border-black bg-black">
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
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="border-2 border-black p-6">
                <h3 className="font-mono text-xl uppercase tracking-wider mb-4 border-b-2 border-black pb-2">
                  Episode Description
                </h3>
                <p className="font-mono text-sm leading-relaxed text-gray-800">
                  {episode.excerpt}
                </p>
              </div>

              {/* Tags */}
              {episode.tags.length > 0 && (
                <div className="border-2 border-black p-6">
                  <h3 className="font-mono text-xl uppercase tracking-wider mb-4 flex items-center gap-2 border-b-2 border-black pb-2">
                    <Tag size={20} />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {episode.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-black text-white px-3 py-2 font-mono text-xs uppercase tracking-wider border-2 border-black hover:bg-white hover:text-black transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Transcript */}
              {episode.transcript && (
                <div className="border-2 border-black p-6">
                  <h3 className="font-mono text-xl uppercase tracking-wider mb-4 border-b-2 border-black pb-2">
                    Transcript
                  </h3>
                  <div className="bg-gray-50 p-4 border-2 border-black max-h-96 overflow-y-auto">
                    <p className="font-mono text-xs leading-relaxed whitespace-pre-wrap text-gray-800">
                      {episode.transcript}
                    </p>
                  </div>
                  <div className="mt-4">
                    <a
                      href={`/transcripts/${episode.slug}.txt`}
                      download
                      className="inline-flex items-center gap-2 bg-black text-white px-4 py-3 border-2 border-black font-mono text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                    >
                      <ExternalLink size={14} />
                      Download Transcript
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Artist Quote */}
              <div className="border-2 border-black p-6">
                <h3 className="font-mono text-lg uppercase tracking-wider mb-4 border-b-2 border-black pb-2">
                  Artist&apos;s Voice
                </h3>
                <div className="bg-black text-white p-4 relative">
                  <div className="absolute top-2 left-2 text-2xl opacity-50">&ldquo;</div>
                  <p className="font-mono text-sm italic leading-relaxed mb-3 pl-6">
                    Art is my way of speaking truth to the world. Every piece I create carries a part of my soul and a message for those who need to hear it.
                  </p>
                  <div className="border-t border-white pt-2">
                    <p className="font-mono text-xs uppercase tracking-wider">
                      — {episode.category} Artist
                    </p>
                  </div>
                  <div className="absolute bottom-2 right-2 text-2xl opacity-50 rotate-180">&ldquo;</div>
                </div>
              </div>

              {/* Related Episodes */}
              {relatedEpisodes.length > 0 && (
                <div className="border-2 border-black p-6">
                  <h3 className="font-mono text-lg uppercase tracking-wider mb-4 border-b-2 border-black pb-2">
                    Related Episodes
                  </h3>
                  <div className="space-y-4">
                    {relatedEpisodes.slice(0, 3).map((relatedEpisode) => (
                      <div
                        key={relatedEpisode.id}
                        className="border border-black p-3 cursor-pointer hover:bg-black hover:text-white transition-colors"
                      >
                        <h4 className="font-mono text-sm uppercase tracking-wider mb-2 line-clamp-2">
                          {relatedEpisode.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs font-mono uppercase mb-2 opacity-80">
                          <User size={10} />
                          {relatedEpisode.category}
                        </div>
                        <p className="font-mono text-xs leading-relaxed line-clamp-2 opacity-80">
                          {relatedEpisode.excerpt}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-4">
                <a
                  href={episode.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-4 hover:bg-red-700 transition-colors w-full justify-center font-mono text-xs uppercase tracking-wider border-2 border-red-600"
                >
                  <ExternalLink size={16} />
                  Watch on YouTube
                </a>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-white text-black border-2 border-black px-4 py-4 hover:bg-black hover:text-white transition-colors w-full justify-center font-mono text-xs uppercase tracking-wider"
                >
                  <Share2 size={16} />
                  Share Episode
                </button>
              </div>

              {/* Art Above Chart Badge */}
              <div className="text-center">
                <div className="inline-block border-2 border-black bg-white px-4 py-2 transform rotate-2 hover:rotate-0 transition-transform">
                  <span className="font-mono text-xs uppercase tracking-wider font-bold">
                    #ART ABOVE CHART
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
