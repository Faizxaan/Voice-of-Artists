"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export const FromOurFoundersSection: React.FC = () => {
  const ref = useRef(null);
  const foundersRef = useRef(null);
  
  const isFoundersInView = useInView(foundersRef, { amount: 0.2, margin: "0px 0px -150px 0px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  return (
    <motion.section
      id="from-our-founders"
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
          animate={isFoundersInView ? { height: 128, opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute bottom-32 left-16 w-px bg-black transform -rotate-12"
          initial={{ height: 0, opacity: 0 }}
          animate={isFoundersInView ? { height: 96, opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-px h-16 bg-gray-300"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isFoundersInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
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
          {/* Enhanced Founders Message with 3D Cards */}
          <motion.div
            ref={foundersRef}
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 150 }}
            animate={isFoundersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 150 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
            {/* Animated Header */}
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isFoundersInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.0, delay: 0.5, ease: "backOut" }}
            >
              <motion.div 
                className="inline-flex items-center bg-black text-white px-8 py-3 font-mono text-sm uppercase tracking-wider"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "#333333",
                  transition: { duration: 0.3 }
                }}
              >
                FROM OUR FOUNDERS
              </motion.div>
            </motion.div>

            {/* Enhanced Vertical Founder Quotes Layout */}
            <div className="space-y-10">
              {/* Ranaksh's Quote - Top with Right Space for Image */}
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <motion.div
                  className="lg:col-span-2 bg-white border-2 border-black p-8 relative"
                  initial={{ 
                    opacity: 0, 
                    x: -150, 
                    rotateY: -45,
                    scale: 0.8
                  }}
                  animate={isFoundersInView ? { 
                    opacity: 1, 
                    x: 0, 
                    rotateY: 0,
                    scale: 1
                  } : { 
                    opacity: 0, 
                    x: -150, 
                    rotateY: -45,
                    scale: 0.8
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.7,
                    ease: "backOut"
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    boxShadow: "20px 20px 0px rgba(0,0,0,0.1)",
                    transition: { duration: 0.4 }
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                {/* Quote Content with Typewriter Effect */}
                <blockquote className="font-mono text-lg leading-relaxed text-black mb-8 relative">
                  <motion.span 
                    className="text-3xl absolute -top-1 -left-1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isFoundersInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.8, delay: 1.0, ease: "backOut" }}
                  >
                    "
                  </motion.span>
                  <div className="relative z-10 pl-6">
                    {[
                      "#VoiceOfArtist for me is not a platform, it is a zoom-out button.",
                      "When you see the world from a larger perspective, you see a clear purpose and then there are no distractions.",
                      "All that remains is true focus and emerges then a circle in which everyone uplifts each other.",
                      "That's what I wanted to do and that's the thought I went to Megha with."
                    ].map((paragraph, index) => (
                      <motion.p
                        key={index}
                        className="mb-4"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isFoundersInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ 
                          duration: 0.8, 
                          delay: 1.2 + index * 0.3,
                          ease: "easeOut"
                        }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                  <motion.span 
                    className="text-3xl absolute -bottom-4 -right-1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isFoundersInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.8, delay: 2.7, ease: "backOut" }}
                  >
                    "
                  </motion.span>
                </blockquote>

                {/* Author Attribution */}
                <motion.footer 
                  className="text-left border-t-2 border-black pt-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isFoundersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 3.0 }}
                >
                  <cite className="font-mono text-lg text-black block mb-1 uppercase tracking-wider">
                    — Ranaksh
                  </cite>
                  <p className="font-mono text-sm text-gray-600 uppercase tracking-wide">
                    Co-Founder, Voice of Artist
                  </p>
                </motion.footer>

                {/* Decorative Corner Elements */}
                <motion.div
                  className="absolute top-2 right-2 w-6 h-6 border border-black opacity-30"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={isFoundersInView ? { scale: 1, rotate: 45 } : { scale: 0, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 3.2, ease: "backOut" }}
                />
              </motion.div>

              {/* Ranaksh's Image */}
              <motion.div
                className="relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isFoundersInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 1.0, delay: 1.0, ease: "easeOut" }}
              >
                <motion.div 
                  className="bg-white border-2 border-black p-4 h-80 overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "15px 15px 0px rgba(0,0,0,0.1)",
                    transition: { duration: 0.4 }
                  }}
                >
                  <Image
                    src="/images/ranaksh-founder.JPG"
                    alt="Ranaksh - Co-Founder"
                    width={280}
                    height={320}
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-2 -right-2 bg-black text-white px-3 py-1 font-mono text-xs uppercase tracking-wider"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isFoundersInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                >
                  Co-Founder
                </motion.div>
              </motion.div>
            </div>

            {/* Megha's Quote - Bottom with Left Space for Image */}
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Megha's Image */}
              <motion.div
                className="relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isFoundersInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 1.0, delay: 1.5, ease: "easeOut" }}
              >
                <motion.div 
                  className="bg-white border-2 border-black p-4 h-80 overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "-15px 15px 0px rgba(0,0,0,0.1)",
                    transition: { duration: 0.4 }
                  }}
                >
                  <Image
                    src="/images/megha-founder.JPEG"
                    alt="Megha - Co-Founder"
                    width={280}
                    height={320}
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-2 -left-2 bg-black text-white px-3 py-1 font-mono text-xs uppercase tracking-wider"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isFoundersInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                >
                  Co-Founder
                </motion.div>
              </motion.div>

              <motion.div
                className="lg:col-span-2 bg-white border-2 border-black p-8 relative"
                initial={{ 
                  opacity: 0, 
                  x: 150, 
                  rotateY: 45,
                  scale: 0.8
                }}
                animate={isFoundersInView ? { 
                  opacity: 1, 
                  x: 0, 
                  rotateY: 0,
                  scale: 1
                } : { 
                  opacity: 0, 
                  x: 150, 
                  rotateY: 45,
                  scale: 0.8
                }}
                transition={{ 
                  duration: 1.2, 
                  delay: 2.0,
                  ease: "backOut"
                }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: -5,
                  boxShadow: "-20px 20px 0px rgba(0,0,0,0.1)",
                  transition: { duration: 0.4 }
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Quote Content */}
                <blockquote className="font-mono text-lg leading-relaxed text-black mb-8 relative">
                  <motion.span 
                    className="text-3xl absolute -top-1 -left-1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isFoundersInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.8, delay: 2.2, ease: "backOut" }}
                  >
                    "
                  </motion.span>
                  <div className="relative z-10 pl-6">
                    <motion.p 
                      className="mb-4"
                      initial={{ opacity: 0, x: 30 }}
                      animate={isFoundersInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                      transition={{ duration: 0.8, delay: 2.4 }}
                    >
                      When our minds came together, the idea became bigger - we realized that art is limitless and that's how we expanded the definition of art.
                    </motion.p>
                    <motion.p 
                      className="mb-4"
                      initial={{ opacity: 0, x: 30 }}
                      animate={isFoundersInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                      transition={{ duration: 0.8, delay: 2.7 }}
                    >
                      We want to make art a way of life, to be celebrated each day. I had once written a poem -
                    </motion.p>
                    
                    {/* Poem Section with Special Animation */}
                    <motion.div 
                      className="italic text-gray-700 mb-4 pl-4 border-l-2 border-gray-300"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={isFoundersInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                      transition={{ duration: 1.0, delay: 3.0, ease: "easeOut" }}
                    >
                      {[
                        '"If I ever make a museum,',
                        'it will not be a rosy ordeal',
                        'but sure would be real',
                        'uncensored, untouched',
                        'maybe deeply touching.',
                        "It won't host only happy memories",
                        'but life as we know it."'
                      ].map((line, index) => (
                        <motion.p
                          key={index}
                          className="mb-2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={isFoundersInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: 3.2 + index * 0.15,
                            ease: "easeOut"
                          }}
                        >
                          {line}
                        </motion.p>
                      ))}
                    </motion.div>
                    
                    <motion.p 
                      className="mb-4"
                      initial={{ opacity: 0, x: 30 }}
                      animate={isFoundersInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                      transition={{ duration: 0.8, delay: 4.4 }}
                    >
                      #VoiceOfArtist for me is a museum and it is very much real.
                    </motion.p>
                  </div>
                  <motion.span 
                    className="text-3xl absolute -bottom-4 -right-1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isFoundersInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.8, delay: 4.7, ease: "backOut" }}
                  >
                    "
                  </motion.span>
                </blockquote>

                {/* Author Attribution */}
                <motion.footer 
                  className="text-left border-t-2 border-black pt-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isFoundersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 5.0 }}
                >
                  <cite className="font-mono text-lg text-black block mb-1 uppercase tracking-wider">
                    — Megha
                  </cite>
                  <p className="font-mono text-sm text-gray-600 uppercase tracking-wide">
                    Co-Founder, Voice of Artist
                  </p>
                </motion.footer>

                {/* Decorative Corner Elements */}
                <motion.div
                  className="absolute bottom-2 left-2 w-4 h-4 bg-black opacity-30"
                  initial={{ scale: 0 }}
                  animate={isFoundersInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.6, delay: 5.2, ease: "backOut" }}
                />
              </motion.div>
            </div>
            </div>
          </motion.div>

          {/* Enhanced Platform Philosophy - Grand Finale */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={isFoundersInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 1.2, delay: 5.5, ease: "backOut" }}
          >
            <motion.div 
              className="bg-white border-2 border-black p-12 max-w-4xl mx-auto relative overflow-hidden"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "25px 25px 0px rgba(0,0,0,0.1)",
                transition: { duration: 0.4 }
              }}
            >
              {/* Background Animation Elements */}
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-black origin-left"
                initial={{ scaleX: 0 }}
                animate={isFoundersInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 2.0, delay: 6.0, ease: "easeOut" }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-full h-1 bg-black origin-right"
                initial={{ scaleX: 0 }}
                animate={isFoundersInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 2.0, delay: 6.2, ease: "easeOut" }}
              />

              {/* Main Title with Perspective Animation */}
              <motion.h4 
                className="font-mono text-3xl mb-6 text-black uppercase tracking-wider"
                initial={{ opacity: 0, rotateX: -90, y: 50 }}
                animate={isFoundersInView ? { opacity: 1, rotateX: 0, y: 0 } : { opacity: 0, rotateX: -90, y: 50 }}
                transition={{ duration: 1.0, delay: 5.7, ease: "backOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {"Platform by Artists of Artists for Artists".split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isFoundersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 5.9 + index * 0.1,
                      ease: "easeOut" 
                    }}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h4>

              {/* Quote with Typewriter Effect */}
              <motion.p 
                className="font-mono text-xl leading-relaxed text-gray-800 italic mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isFoundersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 7.0 }}
              >
                "Our platform is black and white - like your clarity of purpose. Your art adds color to it."
              </motion.p>
              
              {/* Final Badge with Celebration Animation */}
              <motion.div 
                className="border-2 border-black bg-black text-white px-8 py-4 inline-block relative overflow-hidden"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={isFoundersInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
                transition={{ duration: 1.0, delay: 7.5, ease: "backOut" }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#333333",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={isFoundersInView ? { x: '100%' } : { x: '-100%' }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 8.0,
                    ease: "easeInOut",
                    repeat: isFoundersInView ? Infinity : 0,
                    repeatDelay: 3
                  }}
                />
                
                <motion.span 
                  className="font-mono text-lg uppercase tracking-wider relative z-10"
                  initial={{ opacity: 0 }}
                  animate={isFoundersInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 7.8 }}
                >
                  {"#THINKINGPERSONSSOCIALMEDIA".split("").map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isFoundersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 8.0 + index * 0.03,
                        ease: "easeOut" 
                      }}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.div>

              {/* Corner Decorations */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 border border-black opacity-20"
                initial={{ scale: 0, rotate: 0 }}
                animate={isFoundersInView ? { scale: 1, rotate: 45 } : { scale: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 8.5, ease: "backOut" }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-6 h-6 bg-black opacity-20"
                initial={{ scale: 0 }}
                animate={isFoundersInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 8.7, ease: "backOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};