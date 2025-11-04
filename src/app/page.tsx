import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { StructuredData } from "@/components/ui/StructuredData";
import { HomeClient } from "./HomeClient";

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

      <HomeClient />

      <Footer />
    </>
  );
}
