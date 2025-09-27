import { Header } from "@/components/sections/Header";
import { HeroSectionNew } from "@/components/sections/HeroSectionNew";
import { AboutUsVOASection } from "@/components/sections/AboutUsVOASection";
import { EpisodesHub } from "@/components/sections/EpisodesHub";
import { ArtistsAroundTheWorld } from "@/components/sections/ArtistsAroundTheWorldNew";
import { Footer } from "@/components/sections/Footer";
import { StructuredData } from "@/components/ui/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData type="website" />
      <StructuredData type="organization" />

      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="min-h-screen">
        <HeroSectionNew />
        <AboutUsVOASection />
        <EpisodesHub />
        <ArtistsAroundTheWorld />
      </main>

      <Footer />
    </>
  );
}
