"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui";
import { Waves, Flame, Users, Target, Sparkles } from "lucide-react";

export const WhatIsVOASection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section
      id="about"
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Minimal Background Elements - Black & White Foundation */}
      <div className="absolute inset-0">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent"></div>
        
        {/* Geometric elements representing movement */}
        <div className="absolute top-20 right-20 w-px h-32 bg-black transform rotate-45"></div>
        <div className="absolute bottom-32 left-16 w-px h-24 bg-black transform -rotate-12"></div>
        <div className="absolute top-1/2 right-1/3 w-px h-16 bg-gray-300"></div>
      </div>

      <motion.div
        ref={ref}
        className="container mx-auto px-6 lg:px-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionHeading withTape={false} className="mb-16 text-black font-mono text-4xl uppercase tracking-wider">
            what is VOA
          </SectionHeading>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Section 1: What is VOA - Expanded Content */}
          <motion.div
            className="mb-20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="bg-white border-2 border-black p-12 max-w-6xl mx-auto relative"
              whileHover={{
                scale: 1.01,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.h3
                className="font-mono text-4xl mb-8 text-black uppercase tracking-wider text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                What is VOA?
              </motion.h3>

              <motion.div
                className="text-left mb-12"
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <p className="text-lg leading-relaxed text-gray-800 mb-6 font-mono">
                  Voice of Artist is an online platform for all artists to:
                </p>
                <ul className="font-mono text-lg text-gray-800 space-y-3 ml-8">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-black transform rotate-45 mt-3 mr-4 flex-shrink-0"></span>
                    <span>explore their artist-self</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-black transform rotate-45 mt-3 mr-4 flex-shrink-0"></span>
                    <span>inspire the art pursuit in others through their journeys</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-black transform rotate-45 mt-3 mr-4 flex-shrink-0"></span>
                    <span>contribute towards building a positive culture in the society</span>
                  </li>
                </ul>
              </motion.div>

              {/* Why is VOA Needed Section */}
              <motion.div
                className="border-t-2 border-black pt-12 mb-12"
                initial={{ y: 40, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h4 className="font-mono text-3xl mb-8 text-black uppercase tracking-wider text-center">
                  Why is VOA Needed?
                </h4>
                
                <div className="text-center mb-8">
                  <div className="font-mono text-lg text-gray-800 leading-relaxed space-y-2">
                    <p>To change the collective, the individual needs to change.</p>
                    <p>To change an individual, their attitude needs to change.</p>
                    <p>To change attitude, behavior needs to change.</p>
                    <p>To change behavior, action needs to change.</p>
                    <p>To change action, habits need to change.</p>
                    <p>To change habits, the environment needs to change.</p>
                    <p>To change the environment, opportunities need to change.</p>
                  </div>
                  
                  <div className="mt-8 p-6 bg-black text-white">
                    <p className="font-mono text-xl mb-4">After all, Transformation begins with opportunities.</p>
                    <p className="font-mono text-lg mb-2">So why not create opportunities?</p>
                    <p className="font-mono text-lg">Opportunities begin with alignment. So why not bring people together?</p>
                  </div>
                </div>

                <div className="text-center bg-gray-100 p-8 border-2 border-black">
                  <p className="font-mono text-2xl text-black mb-4 uppercase tracking-wider">
                    Voice of Artist brings people together
                  </p>
                  <p className="font-mono text-lg text-gray-800 mb-6">
                    who have the intent to keep art above chart
                  </p>
                  
                  <div className="bg-white p-6 border-2 border-black mx-auto max-w-2xl">
                    <p className="font-mono text-lg text-gray-800 leading-relaxed">
                      The purpose to make art is not to top charts. The purpose to make art is to make art. 
                      If you top charts in the process, of course we will celebrate it!
                    </p>
                    <p className="font-mono text-xl text-black mt-4 font-semibold">
                      But the one who is an artist at heart keeps art above chart.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex justify-center items-center gap-6 text-black"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <div className="w-20 h-px bg-black"></div>
                <div className="w-2 h-2 bg-black transform rotate-45"></div>
                <div className="w-20 h-px bg-black"></div>
              </motion.div>

              {/* Art Above Chart Badge */}
              <motion.div
                className="mt-8 text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                <div className="border-2 border-black bg-white px-6 py-2 font-mono text-sm uppercase tracking-wider inline-block">
                  #ART ABOVE CHART
                </div>
              </motion.div>
            </motion.div>
          </motion.div>



          {/* Section 2: The VOA Vision - Four Pillars */}
          <motion.div
            className="mb-20"
            initial={{ y: 100, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div 
              className="text-center mb-16"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="inline-block relative mb-8">
                <h3 className="font-mono text-5xl text-black mb-4 uppercase tracking-wider">
                  The VOA Vision
                </h3>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-px bg-black"></div>
              </div>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-mono mb-6">
                To create a platform for appreciating artists and bringing to the world diverse #VoiceOfArtist who have
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "A Passion for Art",
                  description:
                    "Whether you are a full-time artist or you pursue art along with your any other responsibility (work, home, life) - a consistent and passionate pursuit of art is all we need.",
                  icon: Flame,
                  element: "fire",
                },
                {
                  title: "A Desire for Positive Change",
                  description:
                    "You have a belief that art can bring about a positive change and contribute towards your family, society, country, and the world!",
                  icon: Sparkles,
                  element: "air",
                },
                {
                  title: "Commitment to Professionalism",
                  description:
                    "You have a holistic outlook towards art and people look up to you for your passion, commitment, discipline, and professional conduct.",
                  icon: Target,
                  element: "earth",
                },
                {
                  title: "Respect for others' Voices",
                  description:
                    "You appreciate different perspectives and are willing to learn and grow in the process.",
                  icon: Users,
                  element: "water",
                },
              ].map((pillar, index) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white p-8 border-2 border-black relative group cursor-pointer overflow-hidden"
                    initial={{ y: 80, opacity: 0, scale: 0.9 }}
                    animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.7, 
                      delay: 1.0 + index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                    }}
                    onHoverStart={() => setActiveCard(index)}
                    onHoverEnd={() => setActiveCard(null)}
                  >
                    {/* Subtle hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      initial={false}
                      animate={{ opacity: activeCard === index ? 0.1 : 0 }}
                    />

                    <motion.div
                      className="relative z-10"
                      animate={{ 
                        scale: activeCard === index ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="w-16 h-16 mx-auto mb-6 border-2 border-black bg-white flex items-center justify-center text-black relative"
                        whileHover={{ 
                          scale: 1.1,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent size={24} />
                      </motion.div>

                      <motion.h4 
                        className="font-mono text-xl mb-6 text-center text-black uppercase tracking-wide leading-tight"
                        animate={{ 
                          color: activeCard === index ? "#000000" : "#000000"
                        }}
                      >
                        {pillar.title}
                      </motion.h4>

                      <motion.p 
                        className="text-sm text-center leading-relaxed text-gray-700 font-mono"
                        animate={{
                          scale: activeCard === index ? 1.01 : 1
                        }}
                      >
                        {pillar.description}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>



          {/* Section 3: Founder's Message - Clean Typography */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ y: 100, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <motion.div
              className="bg-white border-2 border-black p-12 relative overflow-hidden"
              whileHover={{
                scale: 1.01,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-4 bg-black text-white px-8 py-3 mb-6 font-mono text-sm uppercase tracking-wider">
                  FROM OUR FOUNDERS
                </div>
              </div>

              {/* Quote - Minimalist Style */}
              <motion.blockquote 
                className="font-mono text-xl text-center leading-relaxed text-black mb-10 relative"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                <span className="text-4xl text-black absolute -top-2 -left-2">"</span>
                <span className="relative z-10 block px-8">
                  Art has the power to transcend boundaries, heal wounds, and inspire change. 
                  Through VOA, we're creating a space where every artist's journey becomes 
                  a beacon of hope and transformation for others. We believe that when artists share 
                  their authentic selves, they give others permission to do the same.
                </span>
                <span className="text-4xl text-black absolute -bottom-6 -right-2">"</span>
              </motion.blockquote>

              {/* Signature */}
              <motion.footer 
                className="text-center border-t-2 border-black pt-8"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 2.0 }}
              >
                <cite className="font-mono text-lg text-black block mb-2 uppercase tracking-wider">
                  — Megha Das & Ranaksh Rana
                </cite>
                <p className="font-mono text-sm text-gray-600 uppercase tracking-wide">Founders, Voice of Artist</p>
              </motion.footer>

              {/* Decorative elements - minimal */}
              <div className="absolute top-0 left-0 w-full h-px bg-black"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-black"></div>
              <div className="absolute top-0 left-0 w-px h-full bg-black"></div>
              <div className="absolute top-0 right-0 w-px h-full bg-black"></div>
            </motion.div>

            {/* Philosophy Statement */}
            <motion.div
              className="mt-12 text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              <div className="bg-black text-white p-8 relative">
                <h4 className="font-mono text-2xl mb-4 uppercase tracking-wider">
                  Platform by Artists of Artists for Artists
                </h4>
                <p className="font-mono text-lg leading-relaxed max-w-2xl mx-auto">
                  "Our platform is black and white - like your clarity of purpose. Your art adds color to it."
                </p>
                
                {/* Movement symbols */}
                <div className="flex justify-center items-center mt-6 gap-4">
                  <div className="w-6 h-px bg-white"></div>
                  <Waves className="w-6 h-6 text-white" />
                  <div className="w-6 h-px bg-white"></div>
                  <Flame className="w-6 h-6 text-white" />
                  <div className="w-6 h-px bg-white"></div>
                  <Sparkles className="w-6 h-6 text-white" />
                  <div className="w-6 h-px bg-white"></div>
                </div>
                
                <p className="font-mono text-sm mt-4 uppercase tracking-wider">
                  Fire → Water → Wave → Universal
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
