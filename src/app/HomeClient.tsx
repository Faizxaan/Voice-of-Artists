"use client";

import { useScrollToHash } from "@/hooks/useScrollToHash";
import { HeroSectionNew } from "@/components/sections/HeroSectionNew";
import { AboutVOASection } from "@/components/sections/AboutVOASection";
import { EpisodesHub } from "@/components/sections/EpisodesHub";
import { FromOurFoundersSection } from "@/components/sections/FromOurFoundersSection";
import { VOAVisionSection } from "@/components/sections/VOAVisionSection";
import { ArtistsAroundTheWorld } from "@/components/sections/ArtistsAroundTheWorldNew";

export const HomeClient: React.FC = () => {
  // Handle direct hash navigation on page load
  useScrollToHash();

  return (
    <main id="main-content" className="min-h-screen">
      <HeroSectionNew />
      <AboutVOASection />
      <EpisodesHub />
      <FromOurFoundersSection />
      <VOAVisionSection />
      <ArtistsAroundTheWorld />
    </main>
  );
};
