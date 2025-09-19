"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Play, Pause } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui";
import { Artist } from "@/types";

interface ArtistQuotesCarouselProps {
  artists?: Artist[];
  className?: string;
}

// Mock artist quotes data
const mockArtists: Artist[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    discipline: ["Painter"],
    bio: "Contemporary abstract artist with 15 years of experience.",
    quote:
      "My voice is the collision of chaos and harmony, where paint becomes emotion and canvas transforms into a window to the soul.",
    social_links: [],
    featured_works: [],
    level: 1,
    status: "active",
  },
  {
    id: "2",
    name: "Marcus Williams",
    discipline: ["Writer", "Poet"],
    bio: "Spoken word artist and social activist.",
    quote:
      "Words are my weapons against injustice, my voice is the bridge between pain and healing, between silence and revolution.",
    social_links: [],
    featured_works: [],
    level: 2,
    status: "active",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    discipline: ["Musician", "Composer"],
    bio: "Classical composer specializing in emotional soundscapes.",
    quote:
      "Music is the language of memories. My voice speaks through melodies that carry the weight of forgotten dreams.",
    social_links: [],
    featured_works: [],
    level: 1,
    status: "active",
  },
  {
    id: "4",
    name: "James Chen",
    discipline: ["Photographer"],
    bio: "Documentary photographer focused on authentic storytelling.",
    quote:
      "Every frame I capture is a voice crying out to be heard. My lens is simply the amplifier for untold stories.",
    social_links: [],
    featured_works: [],
    level: 3,
    status: "active",
  },
  {
    id: "5",
    name: "Maya Patel",
    discipline: ["Designer", "Filmmaker"],
    bio: "Visual storyteller bridging design and cinema.",
    quote:
      "Design is democracy in action. My voice advocates for inclusive beauty that speaks to every soul.",
    social_links: [],
    featured_works: [],
    level: 2,
    status: "active",
  },
  {
    id: "6",
    name: "David Kim",
    discipline: ["Storyteller", "Director"],
    bio: "Independent filmmaker with a passion for human stories.",
    quote:
      "Stories are the DNA of humanity. My voice weaves narratives that remind us of our shared existence.",
    social_links: [],
    featured_works: [],
    level: 1,
    status: "active",
  },
];

export const ArtistQuotesCarousel: React.FC<ArtistQuotesCarouselProps> = ({
  artists = mockArtists,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const maxIndex = Math.max(0, artists.length - visibleCards);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        return next > maxIndex ? 0 : next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  // Responsive card count
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    setIsAutoPlaying(false);
  };

  const handleQuoteClick = (artist: Artist) => {
    console.log("Selected artist:", artist);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section
      ref={sectionRef}
      className={`py-20 bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-100 relative overflow-hidden ${className}`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <motion.div
        className="container mx-auto px-6 lg:px-12 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionHeading withTape className="mb-16">
            What is my Voice of Artist?
          </SectionHeading>
        </motion.div>

        {/* Enhanced Carousel Container */}
        <motion.div
          className="relative"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Enhanced Navigation Buttons */}
          <motion.button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-4 bg-white/90 backdrop-blur-sm border-2 border-cyan-200 rounded-full shadow-lg transition-all duration-300 ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-cyan-50 hover:border-cyan-300 hover:scale-110"
            }`}
            whileHover={{ scale: currentIndex === 0 ? 1 : 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous quotes"
          >
            <ChevronLeft size={24} className="text-cyan-600" />
          </motion.button>

          <motion.button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-4 bg-white/90 backdrop-blur-sm border-2 border-cyan-200 rounded-full shadow-lg transition-all duration-300 ${
              currentIndex >= maxIndex
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-cyan-50 hover:border-cyan-300 hover:scale-110"
            }`}
            whileHover={{ scale: currentIndex >= maxIndex ? 1 : 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next quotes"
          >
            <ChevronRight size={24} className="text-cyan-600" />
          </motion.button>

          {/* Auto-play Control */}
          <motion.button
            onClick={toggleAutoPlay}
            className="absolute top-4 right-4 z-20 p-3 bg-white/90 backdrop-blur-sm border-2 border-cyan-200 rounded-full shadow-lg hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {isAutoPlaying ? (
              <Pause size={16} className="text-cyan-600" />
            ) : (
              <Play size={16} className="text-cyan-600" />
            )}
          </motion.button>

          {/* Enhanced Carousel Content */}
          <div ref={carouselRef} className="overflow-hidden mx-16 rounded-2xl">
            <motion.div
              className="flex gap-8"
              animate={{
                x: `-${currentIndex * (100 / visibleCards)}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.6,
              }}
              style={{
                width: `${(artists.length / visibleCards) * 100}%`,
              }}
            >
              {artists.map((artist, index) => (
                <motion.div
                  key={artist.id}
                  className="flex-shrink-0"
                  style={{ width: `${100 / artists.length}%` }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: hoveredCard === artist.id ? 1.05 : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    scale: { duration: 0.3 },
                  }}
                  onHoverStart={() => setHoveredCard(artist.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative group">
                    {/* Enhanced Quote Card */}
                    <motion.div
                      className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-cyan-200 shadow-xl h-full relative overflow-hidden cursor-pointer"
                      whileHover={{
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                        borderColor: "rgb(103 232 249)",
                      }}
                      onClick={() => handleQuoteClick(artist)}
                    >
                      {/* Animated background gradient */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                        animate={{
                          opacity: hoveredCard === artist.id ? 0.1 : 0,
                        }}
                      />

                      {/* Quote Icon */}
                      <motion.div
                        className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center"
                        animate={{
                          rotate: hoveredCard === artist.id ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Quote size={14} className="text-white" />
                      </motion.div>

                      <div className="relative z-10">
                        {/* Quote Text */}
                        <motion.p
                          className="text-gray-700 italic text-lg leading-relaxed mb-6 font-script"
                          animate={{
                            scale: hoveredCard === artist.id ? 1.02 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          &ldquo;{artist.quote}&rdquo;
                        </motion.p>

                        {/* Author Info */}
                        <motion.div
                          className="border-t border-cyan-200 pt-4"
                          initial={{ opacity: 0.8 }}
                          animate={{
                            opacity: hoveredCard === artist.id ? 1 : 0.8,
                          }}
                        >
                          <h4 className="font-display text-xl font-bold text-gray-800 mb-1">
                            {artist.name}
                          </h4>
                          <p className="text-cyan-600 font-medium text-sm">
                            {artist.discipline.join(", ")}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Enhanced Progress Indicators */}
          <motion.div
            className="flex justify-center mt-8 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-12 h-3 bg-gradient-to-r from-cyan-400 to-blue-500"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentIndex && isAutoPlaying && (
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Featured Quote Highlight */}
        <motion.div
          className="mt-20 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden"
              style={{ backgroundColor: "var(--color-neon-lime)" }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              <div className="relative z-10">
                <motion.h3
                  className="font-display text-4xl md:text-5xl mb-8 text-black"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  The Power of Artistic Voice
                </motion.h3>

                <motion.p
                  className="font-script text-xl md:text-2xl italic leading-relaxed text-gray-800"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  &ldquo;Every artist carries within them a unique voice—a
                  perspective that has never existed before and will never exist
                  again. When we share our authentic selves through our art, we
                  give others permission to find and express their own voices.
                  This is the true power of artistic expression: not just to
                  create, but to inspire creation in others.&rdquo;
                </motion.p>

                <motion.footer
                  className="mt-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.6 }}
                >
                  <cite className="font-display text-xl text-gray-700">
                    — The VOA Community
                  </cite>
                </motion.footer>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
