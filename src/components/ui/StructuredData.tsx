import Script from "next/script";

interface StructuredDataProps {
  type: "website" | "organization" | "musicEvent" | "person";
  data?: Record<string, unknown>;
}

export const StructuredData: React.FC<StructuredDataProps> = ({
  type,
  data,
}) => {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
    };

    switch (type) {
      case "website":
        return {
          ...baseData,
          "@type": "WebSite",
          name: "Voice of Artist",
          description:
            "Voice of Artist (VOA) is a platform where art meets authenticity. Discover emerging artists, their untold stories, and experience music through a cinematic, black-and-white aesthetic.",
          url: "https://voiceofartist.com",
          publisher: {
            "@type": "Organization",
            name: "Voice of Artist",
            logo: {
              "@type": "ImageObject",
              url: "https://voiceofartist.com/images/logo.png",
              width: 600,
              height: 60,
            },
          },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate:
                "https://voiceofartist.com/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        };

      case "organization":
        return {
          ...baseData,
          "@type": "Organization",
          name: "Voice of Artist",
          description:
            "A platform where art meets authenticity. Art Above Chart.",
          url: "https://voiceofartist.com",
          logo: {
            "@type": "ImageObject",
            url: "https://voiceofartist.com/images/logo.png",
            width: 600,
            height: 60,
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-555-0123",
            contactType: "customer service",
            email: "hello@voiceofartist.com",
          },
          sameAs: [
            "https://twitter.com/voiceofartist",
            "https://instagram.com/voiceofartist",
            "https://www.youtube.com/@Voauniverse",
          ],
        };

      case "musicEvent":
        return {
          ...baseData,
          "@type": "MusicEvent",
          ...data,
        };

      case "person":
        return {
          ...baseData,
          "@type": "Person",
          ...data,
        };

      default:
        return { ...baseData, ...data };
    }
  };

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
};
