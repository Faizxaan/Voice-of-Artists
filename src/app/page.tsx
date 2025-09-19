import { Header } from "@/components/sections/Header";
import { HeroSectionNew } from "@/components/sections/HeroSectionNew";
import { WhatIsVOASection } from "@/components/sections/WhatIsVOASection";
import { EpisodesHub } from "@/components/sections/EpisodesHub";
import { ArtistQuotesCarousel } from "@/components/sections/ArtistQuotesCarousel";
import { PromoMaterialsSection } from "@/components/sections/PromoMaterialsSection";
import { ArtistApplicationForm } from "@/components/sections/ArtistApplicationForm";
import { MediaInquiries } from "@/components/sections/MediaInquiries";
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
        <WhatIsVOASection />
        <EpisodesHub />
        <ArtistQuotesCarousel />
        <PromoMaterialsSection />
        <ArtistApplicationForm />

        {/* Green Lights Section - Placeholder */}
        <section className="green-lights">
          <div className="container text-center">
            <h2 className="text-white">
              Final Steps & <span className="highlight">Green Lights</span>
            </h2>
            <p className="body-text text-xl text-white max-w-2xl mx-auto">
              CMS Integration and Admin Dashboard are now live and ready for
              content management.
            </p>
            <div className="mt-8">
              <a href="/admin" className="btn btn-electric">
                Access Admin Dashboard
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Media Inquiries Section - moved to end of page */}
      <MediaInquiries />

      <Footer />
    </>
  );
}
