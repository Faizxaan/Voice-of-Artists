"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Mail, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "YouTube", url: "https://youtube.com/@voiceofartist", icon: "📺" },
    {
      name: "Instagram",
      url: "https://instagram.com/voiceofartist",
      icon: "📷",
    },
    { name: "Twitter", url: "https://twitter.com/voiceofartist", icon: "🐦" },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/voiceofartist",
      icon: "💼",
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Image
                src="/images/Voice of Artist Logo-2.png"
                alt="Voice of Artist Logo"
                width={200}
                height={60}
                className="h-16 w-auto"
              />
            </div>
            <p className="body-text text-white mb-6 max-w-md">
              Art Above Chart. A platform for all artists to explore their
              artist-self, inspire others through their journeys, and contribute
              towards building a positive culture in society.
            </p>
            <div className="flex items-center gap-2">
              <span className="mono-text text-neon-lime">#VoiceOfArtist</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3>Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Episodes", href: "#episodes" },
                { name: "Apply to VOA", href: "#apply" },
                { name: "About Us", href: "#about" },
                { name: "Press Kit", href: "#press" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="body-text hover:text-sky-blue transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3>Connect</h3>

            {/* Contact Email */}
            <div className="mb-6">
              <a
                href="mailto:hello@voiceofartist.com"
                className="flex items-center gap-2 body-text hover:text-sky-blue transition-colors"
              >
                <Mail size={16} />
                hello@voiceofartist.com
              </a>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 body-text hover:text-sky-blue transition-colors"
                >
                  <span className="text-lg">{social.icon}</span>
                  {social.name}
                  <ExternalLink size={14} className="opacity-50" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="newsletter">
          <div className="newsletter-content">
            <h2>Stay Inspired</h2>
            <p className="body-text text-white mb-6 text-lg">
              Subscribe to our newsletter for the latest episodes and artist
              stories.
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-form input"
                required
              />
              <button type="submit" className="btn btn-electric">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-white body-text text-sm">
              <span>
                © {currentYear} Voice Of Artist. All rights reserved.
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="/privacy"
                className="body-text text-sm text-white hover:text-sky-blue transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="body-text text-sm text-white hover:text-sky-blue transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>

          {/* Credit */}
          <div className="text-center mt-6">
            <p className="body-text text-xs text-white flex items-center justify-center gap-2">
              Built with <Heart size={12} className="text-red-500" /> for the
              VOA Community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
