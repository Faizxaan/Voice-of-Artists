"use client";

import React from "react";
import Image from "next/image";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16 border-t-2 border-white">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Simple Brand Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <Image
              src="/images/voa-logo-new.svg"
              alt="VOA Logo"
              width={200}
              height={60}
              className="h-16 w-auto mx-auto filter invert"
            />
          </div>
          <div className="inline-block border border-white bg-black px-4 py-2">
            <span className="font-mono text-xs uppercase tracking-wider">#VoiceOfArtist</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white pt-8">
          <div className="text-center">
            <div className="font-mono text-xs uppercase tracking-wider mb-4">
              <span>© {currentYear} Voice Of Artist. All rights reserved.</span>
            </div>
            
            {/* Platform Credit */}
            <div className="bg-white text-black p-4 inline-block">
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
