"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Waves, Flame, Sparkles, Users } from "lucide-react";

export const BrandPhilosophySection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="py-20 bg-black text-white relative overflow-hidden"
    >
      {/* Minimal geometric elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-px h-20 bg-white transform rotate-30"></div>
        <div className="absolute bottom-20 right-20 w-px h-16 bg-gray-400 transform -rotate-45"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Philosophy Statement */}
          <motion.div
            className="text-center mb-20"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="border-2 border-white bg-black p-12 relative"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="mb-8">
                <h2 className="font-mono text-3xl md:text-4xl uppercase tracking-wider mb-6">
                  Our Philosophy
                </h2>
                <div className="w-24 h-px bg-white mx-auto"></div>
              </div>

              <blockquote className="font-mono text-xl md:text-2xl leading-relaxed mb-8 relative">
                <span className="text-4xl absolute -top-4 -left-4">"</span>
                <span className="relative z-10 block px-8">
                  Our platform is black and white - like your clarity of purpose. 
                  Your art adds color to it.
                </span>
                <span className="text-4xl absolute -bottom-4 -right-4">"</span>
              </blockquote>

              <div className="border-t border-white pt-6">
                <p className="font-mono text-lg">
                  Life has no theme, and nor does #VoiceOfArtist. We are giving you space 
                  to be who you are – in whatever form, font, frame, or feel.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Universal Imagery Section */}
          <motion.div
            className="mb-20"
            initial={{ y: 100, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center mb-12">
              <h3 className="font-mono text-2xl md:text-3xl uppercase tracking-wider mb-4">
                Universal Imagery
              </h3>
              <p className="font-mono text-lg text-gray-300 max-w-3xl mx-auto">
                We believe that an artist is strengthened by the heat of the fire and then 
                balanced with the fluidity of the water, eventually expanding like a wave across the universe.
              </p>
            </div>

            {/* Elements: Fire → Water → Wave → Universal */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  title: "Fire",
                  description: "Strengthened by heat",
                  icon: Flame,
                  stage: "1",
                },
                {
                  title: "Water",
                  description: "Balanced with fluidity",
                  icon: Waves,
                  stage: "2",
                },
                {
                  title: "Wave",
                  description: "Expanding across",
                  icon: Sparkles,
                  stage: "3",
                },
                {
                  title: "Universal",
                  description: "Reaching everyone",
                  icon: Users,
                  stage: "4",
                },
              ].map((element, index) => {
                const IconComponent = element.icon;
                return (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ y: 80, opacity: 0, scale: 0.9 }}
                    animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.8 + index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <div className="border border-white p-6 mb-4 group hover:bg-white hover:text-black transition-colors">
                      <div className="text-2xl font-mono mb-2">{element.stage}</div>
                      <IconComponent className="w-12 h-12 mx-auto mb-4" />
                      <h4 className="font-mono text-lg uppercase tracking-wide mb-2">
                        {element.title}
                      </h4>
                      <p className="font-mono text-sm">
                        {element.description}
                      </p>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-4 w-4 h-px bg-white"></div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Who We Are Section */}
          <motion.div
            className="grid md:grid-cols-3 gap-12"
            initial={{ y: 100, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {[
              {
                title: "Artists",
                description: "You have shown passion and perseverance in the art form of your choice.",
                criteria: "Passion for Art • Desire for Positive Change • Commitment to Professionalism • Respect for others' Voices"
              },
              {
                title: "Advisors",
                description: "You have gained expertise in a field that offers you a valuable lens to share your perspective on #VoiceOfArtist.",
                criteria: "Expert Knowledge • Mentorship Skills • Vision Alignment • Community Building"
              },
              {
                title: "Ally",
                description: "You believe in the vision of #VoiceOfArtist and want to support the universal movement.",
                criteria: "Vision Believer • Art Patron • Community Supporter • Change Catalyst"
              }
            ].map((role, index) => (
              <motion.div
                key={index}
                className="border border-white p-8 hover:bg-white hover:text-black transition-colors group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <h4 className="font-mono text-xl uppercase tracking-wider mb-4">
                  {role.title}
                </h4>
                <p className="font-mono text-sm leading-relaxed mb-6">
                  {role.description}
                </p>
                <div className="border-t border-gray-400 group-hover:border-black pt-4">
                  <p className="font-mono text-xs leading-relaxed text-gray-300 group-hover:text-gray-600">
                    {role.criteria}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-20"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="bg-white text-black p-8">
              <h3 className="font-mono text-2xl uppercase tracking-wider mb-4">
                Platform by Artists of Artists for Artists
              </h3>
              <p className="font-mono text-lg mb-6">
                You are welcome to be a VOA artist if you have an innate desire to:
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-mono uppercase tracking-wider">
                <span className="border border-black px-4 py-2">Unlock the artist within</span>
                <span className="border border-black px-4 py-2">Unlock the next level</span>
                <span className="border border-black px-4 py-2">Unlock the artist in others</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
