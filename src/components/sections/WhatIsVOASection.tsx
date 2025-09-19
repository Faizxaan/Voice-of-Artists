"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SectionHeading, TapeOverlay } from "@/components/ui";
import { Sparkles, Target, Heart, Users } from "lucide-react";

export const WhatIsVOASection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [manifestoExpanded, setManifestoExpanded] = useState(false);

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-100 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-sky-200/10 rounded-full blur-3xl animate-pulse delay-4000"></div>
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
          <SectionHeading withTape className="mb-16">
            What is VOA
          </SectionHeading>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Interactive Mission Statement */}
          <motion.div
            className="mb-16 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-cyan-200 shadow-xl max-w-4xl mx-auto relative group cursor-pointer"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              onClick={() => setManifestoExpanded(!manifestoExpanded)}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="absolute -top-4 left-8 bg-gradient-to-r from-lime-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                Our Manifesto
              </div>

              <motion.h3
                className="font-display text-4xl mb-6 bg-gradient-to-r from-lime-600 to-green-700 bg-clip-text text-transparent"
                animate={{ scale: manifestoExpanded ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
              >
                Art Above Chart
              </motion.h3>

              <AnimatePresence>
                <motion.p
                  className="text-lg mb-6 text-gray-700 leading-relaxed"
                  initial={{ height: "auto" }}
                  animate={{
                    height: manifestoExpanded ? "auto" : "3rem",
                    opacity: manifestoExpanded ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ overflow: "hidden" }}
                >
                  Voice of Artist is an online platform for all artists to:
                  explore their artist-self, inspire the art pursuit in others
                  through their journeys, contribute towards building a positive
                  culture in the society.
                  {manifestoExpanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="block mt-4 text-cyan-600 font-medium"
                    >
                      We believe in the transformative power of authentic
                      artistic expression.
                    </motion.span>
                  )}
                </motion.p>
              </AnimatePresence>

              <motion.div
                className="text-2xl font-script italic text-cyan-600 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.1 }}
              >
                <Sparkles className="w-6 h-6" />
                Art Above Chart
                <Sparkles className="w-6 h-6" />
              </motion.div>

              <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                Click to {manifestoExpanded ? "collapse" : "expand"}
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Vision Pillars */}
          <motion.div
            className="mb-16"
            initial={{ y: 100, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="font-display text-5xl text-center mb-12 bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
              Our Vision
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Passion for Art",
                  description:
                    "Celebrating the pure love and dedication artists have for their craft",
                  icon: Heart,
                  color: "from-cyan-400 to-blue-500",
                  bgColor: "bg-cyan-50",
                },
                {
                  title: "Desire for Positive Change",
                  description:
                    "Using art as a catalyst for meaningful transformation in society",
                  icon: Sparkles,
                  color: "from-sky-400 to-cyan-600",
                  bgColor: "bg-sky-50",
                },
                {
                  title: "Commitment to Professionalism",
                  description:
                    "Maintaining high standards and integrity in all artistic endeavors",
                  icon: Target,
                  color: "from-blue-400 to-cyan-600",
                  bgColor: "bg-blue-50",
                },
                {
                  title: "Respect for Others' Voices",
                  description:
                    "Honoring the unique perspectives and stories of every artist",
                  icon: Users,
                  color: "from-cyan-500 to-blue-600",
                  bgColor: "bg-cyan-50",
                },
              ].map((pillar, index) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={index}
                    className={`${pillar.bgColor} p-6 rounded-2xl border border-gray-200 shadow-lg relative group cursor-pointer overflow-hidden`}
                    initial={{ y: 50, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      y: -10,
                      boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.25)",
                    }}
                    onHoverStart={() => setActiveCard(index)}
                    onHoverEnd={() => setActiveCard(null)}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      initial={false}
                      animate={{ opacity: activeCard === index ? 0.1 : 0 }}
                    />

                    <motion.div
                      className="relative z-10"
                      animate={{ scale: activeCard === index ? 1.05 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent size={28} />
                      </motion.div>

                      <h4 className="font-display text-xl mb-3 text-center text-gray-800">
                        {pillar.title}
                      </h4>

                      <p className="text-sm text-center leading-relaxed text-gray-600">
                        {pillar.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Enhanced Transformation Message */}
          <motion.div
            className="text-center mb-16"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <TapeOverlay>
              <motion.div
                className="bg-gradient-to-r from-gray-900 to-black text-white p-8 rounded-2xl max-w-3xl mx-auto shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <h3 className="font-display text-4xl mb-6 text-white">
                  Why VOA?
                </h3>
                <div className="space-y-4 font-mono text-lg">
                  <motion.p
                    initial={{ x: -50, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ delay: 1.2 }}
                  >
                    To change the collective, the individual needs to change...
                  </motion.p>
                  <motion.p
                    initial={{ x: 50, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ delay: 1.4 }}
                  >
                    Transformation begins with opportunities...
                  </motion.p>
                  <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 1.6 }}
                  >
                    Every voice matters in the symphony of change.
                  </motion.p>
                </div>
              </motion.div>
            </TapeOverlay>
          </motion.div>

          {/* Enhanced Founder's Notes */}
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-start"
            initial={{ y: 100, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            {/* Left - Founder's Quote */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-cyan-200 shadow-xl"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-display text-2xl text-gray-800">
                  Founder&rsquo;s Note
                </h4>
              </div>

              <blockquote className="font-script text-lg italic mb-6 leading-relaxed text-gray-700">
                &ldquo;Art has the power to transcend boundaries, heal wounds,
                and inspire change. Through VOA, we&rsquo;re creating a space
                where every artist&rsquo;s journey becomes a beacon of hope and
                transformation for others. We believe that when artists share
                their authentic selves, they give others permission to do the
                same.&rdquo;
              </blockquote>

              <footer className="text-right border-t border-gray-200 pt-4">
                <cite className="font-display text-lg text-cyan-600">
                  — Megha Das & Ranaksh Rana
                </cite>
                <p className="text-sm text-gray-500 mt-1">Founders, VOA</p>
              </footer>
            </motion.div>

            {/* Right - Creator's Note */}
            <motion.div
              className="lg:mt-12"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 border-2 border-cyan-200 rounded-2xl shadow-xl">
                <motion.h3
                  className="font-display text-4xl text-center mb-6 bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent"
                  animate={{ rotate: [-1, 1, -1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  Creator&rsquo;s Note
                </motion.h3>

                <div className="space-y-4 text-gray-700">
                  <p>
                    Every artist has a story. Every story has the power to
                    change lives. VOA exists to amplify these stories and create
                    ripples of positive change.
                  </p>
                  <p>
                    Join us in this movement where art meets purpose, and
                    individual voices collectively create a symphony of
                    transformation.
                  </p>
                </div>

                <motion.div
                  className="mt-6 flex justify-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
