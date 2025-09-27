"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Waves, Flame, Users, Sparkles } from "lucide-react";

export const VOAVisionSection: React.FC = () => {
  const ref = useRef(null);
  const visionRef = useRef(null);
  
  const isVisionInView = useInView(visionRef, { amount: 0.2, margin: "0px 0px -150px 0px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  return (
    <motion.section
      id="the-voa-vision"
      ref={ref}
      className="py-12 bg-white relative overflow-hidden"
      style={{ opacity }}
    >
      {/* Enhanced Background Elements with Scroll Animations */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/20 to-transparent"></div>
        <motion.div 
          className="absolute top-20 right-20 w-px bg-black transform rotate-45"
          initial={{ height: 0, opacity: 0 }}
          animate={isVisionInView ? { height: 128, opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute bottom-32 left-16 w-px bg-black transform -rotate-12"
          initial={{ height: 0, opacity: 0 }}
          animate={isVisionInView ? { height: 96, opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-px h-16 bg-gray-300"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isVisionInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
        />
      </motion.div>

      <motion.div
        className="container mx-auto px-6 lg:px-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Enhanced VOA Vision Grid with Box Rotation Animations */}
          <motion.div
            ref={visionRef}
            className="mb-12"
            initial={{ opacity: 0, y: 60 }}
            animate={isVisionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Vision Header with Smooth Animation */}
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <motion.h3 
                className="font-mono text-4xl text-black mb-6 uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={isVisionInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {"THE VOA VISION".split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.6 + index * 0.03,
                      ease: "easeOut" 
                    }}
                    className="inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.h3>
              <motion.p 
                className="font-mono text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6"
                initial={{ opacity: 0, y: 15 }}
                animate={isVisionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                To create a platform for appreciating artists and bringing to the world diverse #VoiceOfArtist who have
              </motion.p>
              <motion.div 
                className="bg-black mx-auto"
                initial={{ width: 0, height: 1 }}
                animate={isVisionInView ? { width: 64, height: 1 } : { width: 0, height: 1 }}
                transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
              />
            </motion.div>

            {/* Enhanced Vision Cards Grid with Improved Spacing */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "A Passion for Art",
                  description: "Whether you are a full-time artist or you pursue art along with your any other responsibility (work, home, life) - a consistent and passionate pursuit of art is all we need.",
                  icon: Flame,
                },
                {
                  title: "A Desire for Positive Change", 
                  description: "You have a belief that art can bring about a positive change and contribute towards your family, society, country, and the world!",
                  icon: Sparkles,
                },
                {
                  title: "Commitment to Professionalism",
                  description: "You have a holistic outlook towards art and people look up to you for your passion, commitment, discipline, and professional conduct.",
                  icon: Users,
                },
                {
                  title: "Respect for others' Voices",
                  description: "You appreciate different perspectives and are willing to learn and grow in the process.",
                  icon: Waves,
                },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white border-2 border-black p-6 relative group cursor-pointer min-h-[420px] flex flex-col overflow-hidden"
                    initial={{ 
                      opacity: 0, 
                      rotateY: -90,
                      scale: 0.8
                    }}
                    animate={isVisionInView ? { 
                      opacity: 1, 
                      rotateY: 0,
                      scale: 1
                    } : { 
                      opacity: 0, 
                      rotateY: -90,
                      scale: 0.8
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 1.4 + index * 0.15,
                      ease: "backOut"
                    }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.03,
                      borderColor: "#333333",
                      boxShadow: "12px 12px 0px rgba(0,0,0,0.08)",
                      backgroundColor: "#fafafa",
                      transition: { duration: 0.4, ease: "easeOut" }
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Icon with Smooth Hover Animation */}
                    <motion.div 
                      className="w-16 h-16 mx-auto mb-6 border-2 border-black bg-white flex items-center justify-center relative group"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isVisionInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 1.8 + index * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "#f8f8f8",
                        borderColor: "#333333",
                        transition: { duration: 0.4, ease: "easeOut" }
                      }}
                    >
                      <motion.div
                        className="relative z-10 text-black"
                        whileHover={{
                          scale: 1.2,
                          color: "#333333",
                          transition: { duration: 0.4, ease: "easeOut" }
                        }}
                      >
                        <IconComponent size={24} />
                      </motion.div>
                    </motion.div>

                    {/* Title with Better Spacing and Word Wrapping */}
                    <motion.h4 
                      className="font-mono text-base mb-4 text-center text-black uppercase tracking-wide leading-tight font-semibold break-words hyphens-auto"
                      initial={{ opacity: 0, y: 15 }}
                      animate={isVisionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                      transition={{ duration: 0.5, delay: 2.0 + index * 0.1 }}
                    >
                      {item.title}
                    </motion.h4>

                    {/* Description with Better Typography and Text Wrapping */}
                    <motion.p 
                      className="font-mono text-xs leading-relaxed text-gray-700 text-center break-words hyphens-auto flex-grow"
                      initial={{ opacity: 0, y: 15 }}
                      animate={isVisionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                      transition={{ duration: 0.5, delay: 2.1 + index * 0.1 }}
                    >
                      {item.description}
                    </motion.p>

                    {/* Refined Decorative Corner Elements */}
                    <motion.div
                      className="absolute top-3 right-3 w-1 h-1 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      animate={isVisionInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.3, delay: 2.3 + index * 0.1 }}
                    />
                    <motion.div
                      className="absolute bottom-3 left-3 w-1 h-1 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      animate={isVisionInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.3, delay: 2.4 + index * 0.1 }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};