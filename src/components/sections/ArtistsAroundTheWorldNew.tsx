"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { VideoLightbox } from "@/components/ui/VideoPlayer";

// Map-based "Artists Around the World" with clickable markers.
// Uses a world map image from public/images/world-map.png and overlays markers positioned by percentage.

type Region = "Europe" | "Asia" | "North America" | "Europe/Asia";

interface Artist {
  id: string;
  country: string;
  title: string;
  flag: string;
  region: Region;
  // percentage coords relative to the map container
  x: number; // 0-100 from left
  y: number; // 0-100 from top
  videoId?: string; // if missing → Coming Soon
}

const ARTISTS: Artist[] = [
  { id: "de", country: "Germany", title: "German Artist Feature", flag: "🇩🇪", region: "Europe", x: 49, y: 33, videoId: "AaLkO_x1f_0" },
  { id: "ru", country: "Russia", title: "Russian Artist Spotlight", flag: "🇷🇺", region: "Europe/Asia", x: 65, y: 25, videoId: "cSgPr0_rfoM" },
  { id: "us", country: "USA", title: "USA Artist Feature", flag: "🇺🇸", region: "North America", x: 21, y: 40, videoId: "uix1RXXbyME" },
  { id: "ae", country: "Dubai", title: "Dubai Artist Feature", flag: "🇦🇪", region: "Asia", x: 62, y: 50, videoId: "uix1RXXbyME" },
  { id: "es", country: "Spain", title: "Spanish Artist Journey", flag: "🇪🇸", region: "Europe", x: 46, y: 43, videoId: "lelWbbCjS7s" },
  { id: "pt", country: "Portugal", title: "Portuguese Artist Story", flag: "🇵🇹", region: "Europe", x: 44, y: 44, videoId: "FzhRGM4auII" },
  { id: "in1", country: "India", title: "Indian Artist Feature #1", flag: "🇮🇳", region: "Asia", x: 73, y: 55, videoId: "VuX4AAnOQ0Q" },
  { id: "in2", country: "India", title: "Indian Artist Feature #2", flag: "🇮🇳", region: "Asia", x: 75, y: 58, videoId: "BPsA0rSZqhw" },
  { id: "la", country: "Laos", title: "Laotian Artist (Coming Soon)", flag: "🇱🇦", region: "Asia", x: 78, y: 53 },
];

const REGION_COLORS: Record<Region, string> = {
  Europe: "#111827", // deep blackish for brand
  "Europe/Asia": "#6b7280", // gray
  "North America": "#1f2937",
  Asia: "#111827",
};

export const ArtistsAroundTheWorld: React.FC = () => {
  const [openVideoId, setOpenVideoId] = useState<string | null>(null);
  const [openMeta, setOpenMeta] = useState<Pick<Artist, "title" | "country"> | null>(null);

  const stats = useMemo(() => ({
    countries: ARTISTS.length,
    regions: new Set(ARTISTS.map((a) => a.region)).size,
    withVideo: ARTISTS.filter((a) => !!a.videoId).length,
    comingSoon: ARTISTS.filter((a) => !a.videoId).length,
  }), []);

  return (
    <section id="artists-around-the-world" className="py-20 bg-white relative overflow-hidden">
      {/* Subtle brand background lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-px h-32 bg-black rotate-45" />
        <div className="absolute bottom-32 left-16 w-px h-24 bg-black -rotate-12" />
        <div className="absolute top-1/2 left-1/4 w-px h-16 bg-gray-300" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-mono text-5xl md:text-6xl text-black uppercase tracking-wider mb-4">Artists Around the World</h2>
          <div className="w-24 h-px bg-black mx-auto mb-6" />
          <p className="font-mono text-lg text-gray-700 max-w-2xl mx-auto">Global voices, local stories — click a pin to watch.</p>
        </div>

        {/* Map canvas */}
        <div className="relative w-full max-w-6xl mx-auto border-2 border-black bg-white">
          <div
            className="relative w-full"
            style={{
              paddingTop: "56.25%", // 16:9 aspect
              backgroundImage: "url(/images/world-map.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Pins */}
            {ARTISTS.map((a, idx) => (
              <motion.button
                key={a.id}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="absolute -translate-x-1/2 -translate-y-full"
                style={{ left: `${a.x}%`, top: `${a.y}%` }}
                onClick={() => {
                  if (a.videoId) {
                    setOpenVideoId(a.videoId);
                    setOpenMeta({ title: a.title, country: a.country });
                  }
                }}
                aria-label={`${a.country}: ${a.title}`}
              >
                {/* pin stem */}
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-4 bg-black" />
                  {/* head */}
                  <div
                    className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-black bg-white shadow-md hover:scale-110 transition-transform"
                    style={{ boxShadow: "4px 4px 0 rgba(0,0,0,1)" }}
                  >
                    <span className="text-lg leading-none select-none">{a.flag}</span>
                    {/* small dot for region color */}
                    <span
                      className="absolute -right-1 -bottom-1 w-3 h-3 rounded-full border border-black"
                      style={{ backgroundColor: REGION_COLORS[a.region] }}
                    />
                  </div>
                </div>

                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
                  <div className="bg-white border-2 border-black px-3 py-1 font-mono text-xs uppercase tracking-wider">
                    {a.country}
                    {!a.videoId && <span className="ml-2 text-gray-500">(Coming Soon)</span>}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { label: "Countries Featured", value: stats.countries },
            { label: "Regions Covered", value: stats.regions },
            { label: "Episodes Available", value: stats.withVideo },
            { label: "Episodes Coming", value: stats.comingSoon },
          ].map((s) => (
            <div key={s.label} className="bg-white border-2 border-black p-4 text-center">
              <div className="font-mono text-2xl">{s.value}</div>
              <div className="font-mono text-xs uppercase tracking-wider text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {openVideoId && (
        <VideoLightbox
          isOpen={!!openVideoId}
          onClose={() => {
            setOpenVideoId(null);
            setOpenMeta(null);
          }}
          videoProps={{
            videoId: openVideoId,
            title: openMeta?.title || "Artist Video",
            description: `${openMeta?.country || ""} • Voice of Artist`,
          }}
        />
      )}
    </section>
  );
};
