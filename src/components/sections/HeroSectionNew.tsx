"use client";

import React, { useState } from "react";
import Image from "next/image";
import { VideoLightbox } from "@/components/ui/VideoPlayer";

interface HeroSectionProps {
  featuredVideoId?: string;
}

export const HeroSectionNew: React.FC<HeroSectionProps> = ({
  featuredVideoId = "dQw4w9WgXcQ",
}) => {
  const [showVideoLightbox, setShowVideoLightbox] = useState(false);

  const handleApply = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWatchLatest = () => {
    setShowVideoLightbox(true);
  };

  return (
    <>
      <section className="hero-new">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="hero-grid">
            {/* Left Side - Main Content */}
            <div className="hero-main-content">
              {/* Logo-style Title */}
              <div className="hero-title-section">
                <div className="voa-title-container">
                  <h1 className="voa-main-title">VOICE OF ARTIST</h1>
                  <div className="green-accent-line"></div>
                </div>
              </div>

              {/* Description */}
              <p className="hero-description">
                An online platform for artists to explore their creative self,
                inspire others through their journeys, and contribute towards
                building a positive culture in society.
              </p>

              {/* Call to Action Buttons */}
              <div className="hero-cta-buttons">
                <button onClick={handleApply} className="btn-primary-hero">
                  Apply Now
                </button>
                <button
                  onClick={handleWatchLatest}
                  className="btn-secondary-hero"
                >
                  Watch Episodes
                </button>
              </div>

              {/* Art Above Chart Badge */}
              <div className="art-above-chart">
                <span>ART ABOVE CHART</span>
              </div>
            </div>

            {/* Right Side - Featured Content Card */}
            <div className="hero-featured-content">
              <div className="featured-card-main">
                {/* Card Header with Logo */}
                <div className="card-header">
                  <Image
                    src="/images/Voice of Artist Logo-2.png"
                    alt="VOA Logo"
                    width={80}
                    height={24}
                    className="card-logo"
                  />
                </div>

                {/* Microphone Icon with Animation */}
                <div className="mic-section">
                  <div className="mic-waves">
                    <span className="wave wave-1"></span>
                    <span className="wave wave-2"></span>
                    <span className="wave wave-3"></span>
                  </div>
                  <div className="microphone-icon">🎤</div>
                </div>

                {/* Featured Content */}
                <div className="featured-episode-content">
                  <span className="featured-label">FEATURED TRANSMISSION</span>
                  <h3 className="featured-title">Latest Artist Story</h3>
                  <p className="featured-description">
                    Discover emerging artists and their authentic creative
                    journeys
                  </p>

                  <button onClick={handleWatchLatest} className="watch-button">
                    Click to Watch
                  </button>
                </div>

                {/* Art Above Chart Button */}
                <div className="art-chart-button">
                  <button>ART ABOVE CHART</button>
                </div>
              </div>

              {/* Featured Episode Banner */}
              <div className="episode-banner">
                <span className="banner-text">FEATURED EPISODE</span>
                <p className="banner-subtext">click to watch</p>
              </div>

              {/* Latest Updates Card */}
              <div className="updates-card">
                <h3 className="updates-title">LATEST UPDATES</h3>
                <div className="updates-list">
                  <div className="update-item">
                    <span className="update-label">NEW EPISODE</span>
                    <p>Artist Spotlight: Creative Journey</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="hero-bg-elements">
          <div className="bg-circle bg-circle-1"></div>
          <div className="bg-circle bg-circle-2"></div>
        </div>
      </section>

      {/* Video Lightbox */}
      {featuredVideoId && (
        <VideoLightbox
          isOpen={showVideoLightbox}
          onClose={() => setShowVideoLightbox(false)}
          videoProps={{
            videoId: featuredVideoId,
            title: "Latest VOA Episode",
            description: "Watch our latest featured artist episode",
            showTranscript: true,
          }}
        />
      )}
    </>
  );
};
