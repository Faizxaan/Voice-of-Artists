"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Linkedin, Facebook, Youtube, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/voauniverse?igsh=bjUycjNwODdqbXU2",
      icon: Instagram,
      color: "hover:text-pink-400"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/showcase/voice-of-artist/",
      icon: Linkedin,
      color: "hover:text-blue-400"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/jmRoYBRBkQmvPiSP/?mibextid=LQQJ4d",
      icon: Facebook,
      color: "hover:text-blue-500"
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@voauniverse",
      icon: Youtube,
      color: "hover:text-red-500"
    }
  ];

  return (
    <footer className="bg-black text-white py-16 border-t-2 border-white">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Enhanced Brand Section with Social Media */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="text-center md:text-left">
            <div className="mb-6">
              <Image
                src="/images/Voice of Artist Logo-2.png"
                alt="VOA Logo"
                width={200}
                height={60}
                className="h-16 w-auto mx-auto md:mx-0"
                priority
              />
            </div>
            <div className="inline-block border border-white bg-black px-4 py-2 mb-6">
              <span className="font-mono text-xs uppercase tracking-wider">#VoiceOfArtist</span>
            </div>
            <p className="font-mono text-sm text-gray-300 leading-relaxed max-w-sm mx-auto md:mx-0">
              An online platform that publishes #VoiceOfArtist from diverse fields to promote a culture of art in society.
            </p>
          </div>

          {/* Social Media Column */}
          <div className="text-center">
            <h3 className="font-mono text-lg uppercase tracking-wider mb-6 text-white">
              Follow Us
            </h3>
            <p className="font-mono text-sm text-gray-300 mb-6">
              Voice of Artist across social media:
            </p>
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group transition-all duration-300 ${social.color} hover:scale-110`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <div className="w-12 h-12 border-2 border-white group-hover:border-current flex items-center justify-center transition-all duration-300 group-hover:bg-white/10">
                      <IconComponent size={20} className="transition-colors duration-300" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Column */}
          <div className="text-center md:text-right">
            <h3 className="font-mono text-lg uppercase tracking-wider mb-6 text-white">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:curator@voiceofartist.com"
                className="group inline-flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300"
              >
                <Mail size={18} className="transition-colors duration-300" />
                <span className="font-mono text-sm group-hover:underline">
                  curator@voiceofartist.com
                </span>
              </a>
              <div className="pt-4">
                <div className="border border-white bg-black px-4 py-2 inline-block">
                  <span className="font-mono text-xs uppercase tracking-wider text-white">
                    Art Above Chart
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-white pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="font-mono text-xs uppercase tracking-wider text-gray-300">
              <span>© {currentYear} Voice Of Artist. All rights reserved.</span>
            </div>
            
            {/* Platform Credit */}
            <div className="bg-white text-black p-3 transition-all duration-300 hover:bg-gray-100">
              <p className="font-mono text-xs uppercase tracking-wider">
                Platform by Artists of Artists for Artists
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
