"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export const AboutVOASection: React.FC = () => {
  const ref = useRef(null);
  const headerRef = useRef(null);
  const aboutVOARef = useRef(null);
  
  const isHeaderInView = useInView(headerRef, { amount: 0.3, margin: "0px 0px -100px 0px" });
  const isAboutVOAInView = useInView(aboutVOARef, { amount: 0.3, margin: "0px 0px -100px 0px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  return (
    <motion.section
      id="about-us"
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
          animate={isHeaderInView ? { height: 128, opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute bottom-32 left-16 w-px bg-black transform -rotate-12"
          initial={{ height: 0, opacity: 0 }}
          animate={isHeaderInView ? { height: 96, opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-px h-16 bg-gray-300"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isHeaderInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
        />
      </motion.div>

      <motion.div
        ref={ref}
        className="container mx-auto px-6 lg:px-12 relative z-10"
        style={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Enhanced Section Header with Reversible Scroll Animations */}
        <motion.div
          ref={headerRef}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 100 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-block relative mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isHeaderInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "backOut" }}
          >
            <motion.h2 
              className="font-mono text-5xl md:text-6xl text-black uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {"ABOUT VOA".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.7 + index * 0.05,
                    ease: "easeOut" 
                  }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.h2>
            <motion.div 
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-black"
              initial={{ width: 0, height: 1 }}
              animate={isHeaderInView ? { width: 96, height: 1 } : { width: 0, height: 1 }}
              transition={{ duration: 1.0, delay: 1.5, ease: "easeOut" }}
            />
          </motion.div>
          <motion.p 
            className="font-mono text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
          >
            Voice Of Artist is more than a platform—it's a movement to make local talent global through authentic storytelling
          </motion.p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Enhanced Main About Section */}
          <motion.div
            ref={aboutVOARef}
            className="mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isAboutVOAInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Logo Side with 3D Effect */}
              <motion.div 
                className="text-center lg:text-left"
                initial={{ opacity: 0, x: -100, rotateY: -20 }}
                animate={isAboutVOAInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -100, rotateY: -20 }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              >
                <motion.div 
                  className="bg-white border-2 border-black p-12 inline-block"
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 2,
                    boxShadow: "10px 10px 0px rgba(0,0,0,0.1)",
                    transition: { duration: 0.3 }
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isAboutVOAInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ duration: 1.0, delay: 0.6, ease: "backOut" }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isAboutVOAInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: "backOut" }}
                  >
                    <Image
                      src="/images/voa-logo-4.svg"
                      alt="VOA Logo"
                      width={280}
                      height={100}
                      className="mx-auto lg:mx-0"
                    />
                  </motion.div>
                  <motion.div 
                    className="mt-6 border-t-2 border-black pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isAboutVOAInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    <motion.div 
                      className="border-2 border-black bg-white px-4 py-2 inline-block"
                      whileHover={{ 
                        backgroundColor: "#000000", 
                        color: "#ffffff",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <span className="font-mono text-sm uppercase tracking-wider">
                        #ART ABOVE CHART
                      </span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Content Side with Staggered Animations */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: 100 }}
                animate={isAboutVOAInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
              >
                <motion.h3
                  className="font-mono text-3xl text-black uppercase tracking-wider"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isAboutVOAInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                >
                  What is VOA?
                </motion.h3>

                <motion.div
                  className="text-left"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isAboutVOAInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                >
                  <motion.p 
                    className="font-mono text-lg leading-relaxed text-gray-800 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isAboutVOAInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    Voice of Artist is an online platform for all artists to:
                  </motion.p>
                  <ul className="font-mono text-lg text-gray-800 space-y-3 ml-6">
                    {[
                      "explore their artist-self",
                      "inspire the art pursuit in others through their journeys", 
                      "contribute towards building a positive culture in the society"
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isAboutVOAInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ 
                          duration: 0.8, 
                          delay: 1.4 + index * 0.2, 
                          ease: "easeOut" 
                        }}
                      >
                        <motion.span 
                          className="w-2 h-2 bg-black transform rotate-45 mt-3 mr-4 flex-shrink-0"
                          initial={{ scale: 0, rotate: 0 }}
                          animate={isAboutVOAInView ? { scale: 1, rotate: 45 } : { scale: 0, rotate: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 1.5 + index * 0.2,
                            ease: "backOut" 
                          }}
                        />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  className="flex gap-4 items-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isAboutVOAInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.8, delay: 2.3, ease: "backOut" }}
                >
                  <motion.div 
                    className="bg-black"
                    initial={{ width: 0, height: 1 }}
                    animate={isAboutVOAInView ? { width: 48, height: 1 } : { width: 0, height: 1 }}
                    transition={{ duration: 0.8, delay: 2.5 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-black transform rotate-45"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={isAboutVOAInView ? { scale: 1, rotate: 45 } : { scale: 0, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 2.7, ease: "backOut" }}
                  />
                  <motion.div 
                    className="bg-black"
                    initial={{ width: 0, height: 1 }}
                    animate={isAboutVOAInView ? { width: 48, height: 1 } : { width: 0, height: 1 }}
                    transition={{ duration: 0.8, delay: 2.5 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};