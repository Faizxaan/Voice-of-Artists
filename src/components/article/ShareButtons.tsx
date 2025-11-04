"use client";

import React from 'react';
import { Share2, Linkedin, Facebook, Twitter } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
  excerpt?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, excerpt }) => {
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;
  const text = excerpt || title;

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch {
        // Share cancelled or failed
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="font-mono text-sm uppercase tracking-wider text-black">Share This Article</h4>
      <div className="flex flex-wrap gap-3">
        {/* Native Share Button (mobile) */}
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-2 bg-black text-white px-4 py-3 border-2 border-black hover:bg-white hover:text-black transition-all font-mono text-xs uppercase tracking-wider"
          aria-label="Share article"
        >
          <Share2 size={16} />
          Share
        </button>

        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white text-black px-4 py-3 border-2 border-black hover:bg-black hover:text-white transition-all font-mono text-xs uppercase tracking-wider"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={16} />
          LinkedIn
        </a>

        {/* Twitter/X */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white text-black px-4 py-3 border-2 border-black hover:bg-black hover:text-white transition-all font-mono text-xs uppercase tracking-wider"
          aria-label="Share on Twitter"
        >
          <Twitter size={16} />
          Twitter
        </a>

        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white text-black px-4 py-3 border-2 border-black hover:bg-black hover:text-white transition-all font-mono text-xs uppercase tracking-wider"
          aria-label="Share on Facebook"
        >
          <Facebook size={16} />
          Facebook
        </a>
      </div>
    </div>
  );
};
