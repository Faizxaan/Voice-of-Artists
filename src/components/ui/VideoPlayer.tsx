"use client";

import React, { useState } from "react";
import YouTube from "react-youtube";
import { X, Play, ExternalLink, Share2 } from "lucide-react";
import { VideoPlayerProps } from "@/types";

interface YouTubePlayerProps extends VideoPlayerProps {
  onClose?: () => void;
  autoplay?: boolean;
  className?: string;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  title,
  description,
  published_at,
  showTranscript = false,
  transcriptUrl,
  onClose,
  autoplay = false,
  className = "",
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const opts = {
    height: "450",
    width: "100%",
    playerVars: {
      autoplay: autoplay ? 1 : 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  const handleShare = async () => {
    const url = `https://youtu.be/${videoId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
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

  const openInYouTube = () => {
    window.open(`https://youtu.be/${videoId}`, "_blank");
  };

  return (
    <div className={`bg-white border-2 border-black ${className}`}>
      {/* Video Player */}
      <div className="relative aspect-video bg-black">
        <YouTube 
          videoId={videoId} 
          opts={opts} 
          className="w-full h-full" 
          iframeClassName="w-full h-full"
        />
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/70 text-white p-2 border-2 border-white hover:bg-white hover:text-black transition-all"
            aria-label="Close video"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Video Info - Brand Style */}
      <div className="p-6 bg-white border-t-2 border-black">
        <h3 className="font-mono text-lg uppercase tracking-wider mb-2">{title}</h3>

        {published_at && (
          <p className="font-mono text-xs uppercase tracking-wider text-gray-600 mb-4">
            Published: {new Date(published_at).toLocaleDateString()}
          </p>
        )}

        {description && (
          <div className="mb-6">
            <p className="font-mono text-sm leading-relaxed text-gray-800">
              {showFullDescription
                ? description
                : `${description.substring(0, 150)}${description.length > 150 ? "..." : ""}`}
            </p>
            {description.length > 150 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="font-mono text-xs uppercase tracking-wider text-black hover:underline mt-2"
              >
                {showFullDescription ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        )}

        {/* Action Buttons - Brand Consistent */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={openInYouTube}
            className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 border-2 border-red-600 hover:bg-white hover:text-red-600 transition-all font-mono text-xs uppercase tracking-wider"
          >
            <ExternalLink size={16} />
            Watch on YouTube
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 bg-black text-white px-4 py-3 border-2 border-black hover:bg-white hover:text-black transition-all font-mono text-xs uppercase tracking-wider"
          >
            <Share2 size={16} />
            Share
          </button>

          {showTranscript && transcriptUrl && (
            <a
              href={transcriptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-black px-4 py-3 border-2 border-black hover:bg-black hover:text-white transition-all font-mono text-xs uppercase tracking-wider"
            >
              View Transcript
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

interface VideoThumbnailProps {
  videoId: string;
  title: string;
  onClick: () => void;
  className?: string;
  thumbnailUrl?: string; // optional remote or provided URL
}

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  videoId,
  title,
  onClick,
  className = "",
  thumbnailUrl,
}) => {
  // If no videoId, show a placeholder immediately
  if (!videoId || videoId.length !== 11) {
    return (
      <div
        className={`relative cursor-pointer group ${className}`}
        onClick={onClick}
      >
        <div className="relative aspect-video bg-red-200 border-2 border-red-500 overflow-hidden transition-all duration-300 group-hover:shadow-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl mb-2 text-red-500">❌</div>
            <div className="font-mono text-xs text-red-500 uppercase tracking-wider">INVALID VIDEO ID</div>
            <div className="font-mono text-xs text-red-400 mt-1">{videoId || 'undefined'}</div>
          </div>
        </div>
      </div>
    );
  }

  // Preferred source order: local cache → provided URL → YouTube fallback
  const sources = [
    `/thumbnails/${videoId}.jpg`,
    thumbnailUrl || '',
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  ].filter(Boolean) as string[];

  const [srcIndex, setSrcIndex] = useState(0);
  const activeSrc = sources[srcIndex];

  return (
    <div
      className={`relative cursor-pointer group ${className}`}
      onClick={onClick}
    >
      <div
        key={activeSrc}
        className="relative aspect-video bg-gray-100 border-2 border-black overflow-hidden transition-all duration-300 group-hover:shadow-lg"
        style={{
          backgroundImage: `url(${activeSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Hidden img to trigger onError/onLoad for fallback chain */}
        <img
          src={activeSrc}
          alt={title}
          className="hidden"
          onError={() => {
            if (srcIndex < sources.length - 1) {
              setSrcIndex((i) => i + 1);
            }
          }}
        />

        {/* Brand-consistent overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
          <div className="bg-white border-2 border-black p-3 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
            <Play size={20} fill="currentColor" className="text-black ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface VideoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  videoProps: VideoPlayerProps;
}

export const VideoLightbox: React.FC<VideoLightboxProps> = ({
  isOpen,
  onClose,
  videoProps,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center overflow-y-auto p-4" onClick={onClose}>
      <div
        className="max-w-5xl w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 bg-white text-black p-3 border-2 border-white hover:bg-black hover:text-white hover:border-white transition-all z-10 font-mono text-xs uppercase tracking-wider lg:-top-16 lg:-right-4"
          aria-label="Close video"
        >
          <X size={20} />
        </button>

        <div className="border-4 border-white shadow-2xl">
          <YouTubePlayer
            {...videoProps}
            onClose={undefined} // Remove duplicate close button
            autoplay={true}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
