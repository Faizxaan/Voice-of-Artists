"use client";

import React, { useState } from "react";
import Image from "next/image";
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
    height: "390",
    width: "640",
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
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  const openInYouTube = () => {
    window.open(`https://youtu.be/${videoId}`, "_blank");
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-poster overflow-hidden ${className}`}
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Video Player */}
      <div className="relative aspect-video bg-black rounded-t-xl overflow-hidden">
        <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-60 backdrop-blur-sm text-white p-2.5 rounded-full hover:bg-opacity-80 transition-all border border-white border-opacity-20"
            aria-label="Close video"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Video Info */}
      <div className="p-8 bg-gradient-to-br from-white to-gray-50">
        <h3 className="font-display text-xl mb-2">{title}</h3>

        {published_at && (
          <p className="body-text text-sm text-gray-600 mb-4">
            Published: {new Date(published_at).toLocaleDateString()}
          </p>
        )}

        {description && (
          <div className="mb-4">
            <p className="body-text text-sm">
              {showFullDescription
                ? description
                : `${description.substring(0, 150)}${description.length > 150 ? "..." : ""}`}
            </p>
            {description.length > 150 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 hover:text-blue-800 text-sm mt-1"
              >
                {showFullDescription ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={openInYouTube}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg font-medium"
          >
            <ExternalLink size={16} />
            Watch on YouTube
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg font-medium"
          >
            <Share2 size={16} />
            Share
          </button>

          {showTranscript && transcriptUrl && (
            <a
              href={transcriptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 cta-button-outline text-sm px-4 py-2"
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
}

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  videoId,
  title,
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`relative cursor-pointer group ${className}`}
      onClick={onClick}
    >
      <div className="relative aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
        <Image
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          width={480}
          height={360}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm p-4 rounded-full group-hover:bg-opacity-100 group-hover:scale-110 transition-all duration-300 shadow-xl">
            <Play size={32} fill="currentColor" className="text-red-600 ml-1" />
          </div>
        </div>
      </div>
      <h4 className="font-display text-lg mt-3 group-hover:text-blue-600 transition-colors duration-300">
        {title}
      </h4>
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
    <div className="lightbox-backdrop" onClick={onClose}>
      <div
        className="max-w-5xl w-full mx-4 my-8 relative lg:mx-8 xl:mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 bg-white bg-opacity-20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-opacity-30 transition-all z-10 border border-white border-opacity-20 lg:-top-16 lg:-right-4"
          aria-label="Close video"
        >
          <X size={24} />
        </button>

        <YouTubePlayer
          {...videoProps}
          onClose={undefined} // Remove duplicate close button
          autoplay={true}
          className="w-full shadow-2xl"
        />
      </div>
    </div>
  );
};
