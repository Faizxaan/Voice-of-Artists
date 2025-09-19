"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";

const MediaInquiries = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-cyan-900 via-blue-800 to-sky-900 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-128 h-128 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 40, 0],
            scale: [1, 0.7, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <motion.div
        className="container mx-auto px-6 lg:px-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main container with glassmorphism effect */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg border border-white/20 p-12 rounded-3xl shadow-2xl relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Animated background pattern */}
            <motion.div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 25%, white 2px, transparent 2px)",
                backgroundSize: "40px 40px",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <div className="relative z-10">
              {/* Header */}
              <motion.div
                className="mb-10"
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="font-display text-5xl md:text-7xl mb-6 text-white">
                  Media Inquiries
                </h2>
                <p className="text-xl md:text-2xl text-blue-200 leading-relaxed">
                  For interviews, features, or partnership opportunities
                </p>
              </motion.div>

              {/* Contact Methods */}
              <motion.div
                className="grid md:grid-cols-2 gap-8 mb-10"
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {/* Email Contact */}
                <motion.a
                  href="mailto:press@voiceofartist.com"
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 block"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Mail className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Email
                  </h3>
                  <p className="text-cyan-200 text-lg group-hover:text-white transition-colors">
                    press@voiceofartist.com
                  </p>
                </motion.a>

                {/* Phone Contact */}
                <motion.a
                  href="tel:+1-555-0123"
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 block"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-sky-500 to-cyan-600 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Phone className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Phone
                  </h3>
                  <p className="text-cyan-200 text-lg group-hover:text-white transition-colors">
                    +1 (555) 012-3456
                  </p>
                </motion.a>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 p-8 rounded-2xl border border-blue-500/20"
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Quick Response
                </h3>
                <p className="text-cyan-200 leading-relaxed">
                  We typically respond to media inquiries within 24 hours. For
                  urgent requests, please mention &ldquo;URGENT&rdquo; in your
                  subject line or call directly.
                </p>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                className="mt-10"
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <p className="text-lg text-cyan-200 italic">
                  &ldquo;Every story shared amplifies the voice of artistic
                  expression worldwide.&rdquo;
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export { MediaInquiries };
