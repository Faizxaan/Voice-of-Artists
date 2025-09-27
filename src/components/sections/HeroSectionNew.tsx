"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { VideoLightbox } from "@/components/ui/VideoPlayer";

interface HeroSectionProps {
  featuredVideoId?: string;
}

export const HeroSectionNew: React.FC<HeroSectionProps> = ({
  featuredVideoId = "dQw4w9WgXcQ",
}) => {
  const [showVideoLightbox, setShowVideoLightbox] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, margin: "0px 0px -200px 0px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.3]);

  const handleWatchLatest = () => {
    setShowVideoLightbox(true);
  };

  return (
    <>
      <motion.section 
        ref={ref}
        className="min-h-screen bg-white relative overflow-hidden py-20"
        style={{ opacity }}
      >
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute inset-0"
          style={{ y }}
        >
          {/* Geometric elements with reversible animations */}
          <motion.div 
            className="absolute top-32 right-20 w-px bg-black transform rotate-12"
            initial={{ height: 0, opacity: 0 }}
            animate={isInView ? { height: 160, opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute bottom-40 left-16 w-px bg-gray-400 transform -rotate-45"
            initial={{ height: 0, opacity: 0 }}
            animate={isInView ? { height: 128, opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute top-1/2 right-1/3 w-2 h-2 bg-black transform rotate-45"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "backOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-gray-600"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: "backOut" }}
          />
        </motion.div>

        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left Side - Main Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
            >
              {/* Logo-style Title with Letter Animation */}
              <div className="space-y-4">
                <div className="relative">
                  <motion.h1 
                    className="font-mono text-5xl md:text-6xl lg:text-7xl font-bold text-black uppercase tracking-wider leading-none"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  >
                    {"VOICE OF".split("").map((letter, index) => (
                      <motion.span
                        key={`voice-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.5 + index * 0.1,
                          ease: "easeOut" 
                        }}
                        className="inline-block"
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    ))}
                    <br />
                    {"ARTIST".split("").map((letter, index) => (
                      <motion.span
                        key={`artist-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 1.3 + index * 0.1,
                          ease: "easeOut" 
                        }}
                        className="inline-block"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </motion.h1>
                  <motion.div 
                    className="mt-2 bg-black"
                    initial={{ width: 0, height: 4 }}
                    animate={isInView ? { width: 96, height: 4 } : { width: 0, height: 4 }}
                    transition={{ duration: 1.0, delay: 1.0, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Description with Typewriter Effect */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
              >
                <p className="font-mono text-lg leading-relaxed text-gray-800 max-w-lg">
                  Voice Of Artist is an online platform that publishes #VoiceOfArtist from diverse fields to promote a culture of art in the society. The vision is to make local talent global, build a community of artists to share stories to inspire and grow together.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Side - VOA Logo with Creative Animation */}
            <motion.div 
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -5 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.5, 
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              <motion.div 
                className="bg-white border-2 border-black p-20 text-center relative"
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 1,
                  transition: { duration: 0.3 }
                }}
              >
                {/* New VOA Logo with Reveal Animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 1.0, delay: 0.7, ease: "backOut" }}
                >
                  <Image
                    src="/images/voa-logo-new.svg"
                    alt="VOA Logo"
                    width={350}
                    height={120}
                    className="mx-auto"
                    priority
                  />
                </motion.div>
                
                {/* Animated accent elements */}
                <motion.div 
                  className="flex justify-center items-center mt-12 gap-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.8, delay: 1.0, ease: "backOut" }}
                >
                  <motion.div 
                    className="bg-black"
                    initial={{ width: 0, height: 1 }}
                    animate={isInView ? { width: 64, height: 1 } : {}}
                    transition={{ duration: 0.8, delay: 2.5 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-black transform rotate-45"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={isInView ? { scale: 1, rotate: 45 } : { scale: 0, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 2.7, ease: "backOut" }}
                  />
                  <motion.div 
                    className="bg-black"
                    initial={{ width: 0, height: 1 }}
                    animate={isInView ? { width: 64, height: 1 } : {}}
                    transition={{ duration: 0.8, delay: 2.5 }}
                  />
                </motion.div>
                
                <motion.p 
                  className="font-mono text-sm text-gray-600 uppercase tracking-wider mt-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 3.0 }}
                >
                  PLATFORM BY ARTISTS<br />FOR ARTISTS
                </motion.p>
                
                {/* Brand accent with staggered animation */}
                <motion.div 
                  className="absolute top-4 right-4 w-6 h-6 border border-black transform rotate-45"
                  initial={{ scale: 0, rotate: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, rotate: 45, opacity: 1 } : { scale: 0, rotate: 0, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 3.2, ease: "backOut" }}
                />
                <motion.div 
                  className="absolute bottom-4 left-4 w-4 h-4 bg-black"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 3.4, ease: "backOut" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

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
