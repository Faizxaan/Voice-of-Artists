"use client";

import React, { useState } from "react";
import { Play, Globe, MapPin } from "lucide-react";
import { VideoLightbox } from "@/components/ui/VideoPlayer";

interface Artist                   <img
                    src="/images/world-map.jpg"
                    alt="World Map showing global reach of Voice of Artist"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      console.error('Image failed to load:', e);
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                    onLoad={() => console.log('Image loaded successfully')}
                  />ring;
  country: string;
  region: string;
  videoUrl: string;
  videoId: string;
  title: string;
  description: string;
  flag: string;
  coordinates: {
    x: number; // Percentage from left
    y: number; // Percentage from top
  };
}

const artistsData: Artist[] = [
  {
    id: "1",
    country: "Germany",
    region: "Europe",
    videoUrl: "https://youtu.be/AaLkO_x1f_0?si=2bxWSrW0AzuSe_qV",
    videoId: "AaLkO_x1f_0",
    title: "German Artist Feature",
    description: "Exploring the creative scene in Germany",
    flag: "🇩🇪",
    coordinates: { x: 51, y: 35 }, // Central Europe
  },
  {
    id: "2",
    country: "Russia",
    region: "Europe/Asia",
    videoUrl: "https://youtu.be/cSgPr0_rfoM?si=4c4FKFLmow8k0nAb",
    videoId: "cSgPr0_rfoM",
    title: "Russian Artist Spotlight",
    description: "Artistic expression from Russia",
    flag: "🇷🇺",
    coordinates: { x: 70, y: 30 }, // Central Russia
  },
  {
    id: "3",
    country: "United States",
    region: "North America",
    videoUrl: "https://youtu.be/uix1RXXbyME?si=2sVIgplc1-6r6lHI",
    videoId: "uix1RXXbyME",
    title: "US/Dubai Artist Feature",
    description: "Cross-cultural artistic collaboration",
    flag: "🇺🇸",
    coordinates: { x: 25, y: 45 }, // Central United States
  },
  {
    id: "4",
    country: "Spain",
    region: "Europe",
    videoUrl: "https://youtu.be/lelWbbCjS7s?si=tw5NV8EhUR4YF5B2",
    videoId: "lelWbbCjS7s",
    title: "Spanish Artist Journey",
    description: "Passionate artistry from Spain",
    flag: "🇪🇸",
    coordinates: { x: 48, y: 38 }, // Iberian Peninsula
  },
  {
    id: "5",
    country: "Portugal",
    region: "Europe",
    videoUrl: "https://youtu.be/lelWbbCjS7s?si=tw5NV8EhUR4YF5B2",
    videoId: "lelWbbCjS7s",
    title: "Portuguese Artist Story",
    description: "Creative voices from Portugal",
    flag: "🇵🇹",
    coordinates: { x: 46, y: 40 }, // Western Iberia
  },
  {
    id: "6",
    country: "India",
    region: "Asia",
    videoUrl: "https://youtu.be/VuX4AAnOQ0Q?si=aFyuEpPx2-1Ua71x",
    videoId: "VuX4AAnOQ0Q",
    title: "Indian Artist Feature #1",
    description: "Rich cultural artistry from India",
    flag: "🇮🇳",
    coordinates: { x: 72, y: 55 }, // Indian Subcontinent
  },
  {
    id: "7",
    country: "India",
    region: "Asia",
    videoUrl: "https://youtu.be/BPsA0rSZqhw?si=UkWHNYoSZbDj0cQ1",
    videoId: "BPsA0rSZqhw",
    title: "Indian Artist Feature #2",
    description: "Diverse artistic expressions from India",
    flag: "🇮🇳",
    coordinates: { x: 74, y: 57 }, // Indian Subcontinent (offset)
  },
  {
    id: "8",
    country: "Laos",
    region: "Asia",
    videoUrl: "",
    videoId: "",
    title: "Laotian Artist (Coming Soon)",
    description: "Upcoming feature from Laos",
    flag: "🇱🇦",
    coordinates: { x: 78, y: 52 }, // Southeast Asia
  },
];

const regionColors = {
  Europe: "#3b82f6",
  "Europe/Asia": "#8b5cf6",
  "North America": "#10b981",
  Asia: "#f59e0b",
};

export const ArtistsAroundTheWorld: React.FC = () => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [showVideoLightbox, setShowVideoLightbox] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleMarkerClick = (artist: Artist) => {
    if (artist.videoId) {
      setSelectedArtist(artist);
      setShowVideoLightbox(true);
    }
  };

  const handleCardClick = (artist: Artist) => {
    if (artist.videoId) {
      setSelectedArtist(artist);
      setShowVideoLightbox(true);
    }
  };

  const groupedArtists = artistsData.reduce(
    (acc, artist) => {
      if (!acc[artist.region]) {
        acc[artist.region] = [];
      }
      acc[artist.region].push(artist);
      return acc;
    },
    {} as Record<string, Artist[]>
  );

  const filteredArtists = selectedRegion
    ? artistsData.filter((artist) => artist.region === selectedRegion)
    : artistsData;

  return (
    <>
      <section
        id="artists-world"
        className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      >
        <div className="container max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Globe className="text-neon-lime" size={32} />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-deep-navy">
                Artists Around the World
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the global reach of Voice of Artist. Our platform
              showcases talented creators from every corner of the world,
              sharing their unique stories and cultural perspectives through
              art.
            </p>
          </div>

          {/* World Map Visualization */}
          <div className="mb-16">
            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-lg border-2 border-gray-200">
              <h3 className="font-display text-2xl font-bold text-center mb-8 text-deep-navy">
                Global Artist Network
              </h3>

              {/* Real World Map */}
              <div className="relative w-full h-96 rounded-xl overflow-hidden border-2 border-blue-400 shadow-xl bg-gray-100">
                {/* World Map Image */}
                <div className="relative w-full h-full">
                  <img
                    src="/images/world-map.jpg"
                    alt="World Map showing global reach of Voice of Artist"
                    className="w-full h-full object-cover object-center"
                  />
                  
                  {/* Fallback if image doesn't load */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 opacity-50" style={{zIndex: -1}}>
                    <div className="flex items-center justify-center h-full text-gray-600 font-medium">
                      World Map
                    </div>
                  </div>
                  
                  {/* Overlay for better marker visibility */}
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>

                {/* Artist Markers */}
                {artistsData.map((artist) => (
                  <div
                    key={artist.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-125 z-10 ${
                      artist.videoId ? "hover:z-20" : "opacity-85"
                    }`}
                    style={{
                      left: `${artist.coordinates.x}%`,
                      top: `${artist.coordinates.y}%`,
                    }}
                    onClick={() => handleMarkerClick(artist)}
                    title={`${artist.country} - ${artist.title}`}
                  >
                    {/* Marker with enhanced visibility */}
                    <div
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-xl border-2 border-white ${
                        artist.videoId
                          ? "bg-red-500 hover:bg-red-600 animate-pulse"
                          : "bg-gray-500"
                      }`}
                      style={{
                        boxShadow:
                          "0 4px 15px rgba(0,0,0,0.3), 0 0 0 3px rgba(255,255,255,0.8)",
                      }}
                    >
                      {artist.videoId ? <Play size={16} /> : "•"}
                    </div>

                    {/* Enhanced tooltip */}
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-gray-700">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{artist.flag}</span>
                        <span className="font-medium">{artist.country}</span>
                      </div>
                      <div className="text-xs text-gray-300 mt-1">
                        {artist.videoId
                          ? "Click to watch episode"
                          : "Coming soon"}
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-gray-700"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Legend */}
              <div className="mt-6 flex justify-center">
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium">
                      Episodes Available
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="text-sm font-medium">Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Region Filter */}
          <div className="mb-12">
            <div className="flex justify-center">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedRegion(null)}
                  className={`px-6 py-3 rounded-full font-display text-sm uppercase tracking-wider transition-all duration-300 ${
                    selectedRegion === null
                      ? "bg-deep-navy text-white"
                      : "bg-white text-deep-navy border-2 border-deep-navy hover:bg-deep-navy hover:text-white"
                  }`}
                >
                  All Regions
                </button>
                {Object.keys(groupedArtists).map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-6 py-3 rounded-full font-display text-sm uppercase tracking-wider transition-all duration-300 ${
                      selectedRegion === region
                        ? "text-white"
                        : "bg-white text-deep-navy border-2 hover:text-white"
                    }`}
                    style={{
                      backgroundColor:
                        selectedRegion === region
                          ? regionColors[region as keyof typeof regionColors]
                          : undefined,
                      borderColor:
                        regionColors[region as keyof typeof regionColors],
                      color:
                        selectedRegion === region
                          ? "white"
                          : regionColors[region as keyof typeof regionColors],
                    }}
                  >
                    {region} ({groupedArtists[region].length})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Artists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredArtists.map((artist) => (
              <div
                key={artist.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
                  artist.videoId
                    ? "border-gray-200 hover:border-neon-lime cursor-pointer hover:-translate-y-2"
                    : "border-gray-300 opacity-75"
                }`}
                onClick={() => handleCardClick(artist)}
              >
                <div
                  className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative"
                  style={{
                    background: `linear-gradient(135deg, ${regionColors[artist.region as keyof typeof regionColors]}20, ${regionColors[artist.region as keyof typeof regionColors]}40)`,
                  }}
                >
                  <div className="text-6xl">{artist.flag}</div>
                  {artist.videoId && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <Play
                        className="text-white opacity-0 hover:opacity-100 transition-opacity"
                        size={32}
                      />
                    </div>
                  )}
                  {!artist.videoId && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      Coming Soon
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">
                      {artist.region}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-deep-navy mb-2">
                    {artist.country}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {artist.description}
                  </p>
                  {artist.videoId ? (
                    <div className="flex items-center text-neon-lime text-sm font-medium">
                      <Play size={14} className="mr-2" />
                      Watch Episode
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm font-medium">
                      Episode in Production
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Statistics */}
          <div className="mt-16 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
                <div className="text-3xl font-bold text-deep-navy mb-2">
                  {artistsData.length}
                </div>
                <div className="text-gray-600 font-medium">
                  Countries Featured
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
                <div className="text-3xl font-bold text-deep-navy mb-2">
                  {Object.keys(groupedArtists).length}
                </div>
                <div className="text-gray-600 font-medium">Regions Covered</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
                <div className="text-3xl font-bold text-deep-navy mb-2">
                  {artistsData.filter((a) => a.videoId).length}
                </div>
                <div className="text-gray-600 font-medium">
                  Episodes Available
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
                <div className="text-3xl font-bold text-deep-navy mb-2">
                  {artistsData.filter((a) => !a.videoId).length}
                </div>
                <div className="text-gray-600 font-medium">Episodes Coming</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Lightbox */}
      {selectedArtist && (
        <VideoLightbox
          isOpen={showVideoLightbox}
          onClose={() => {
            setShowVideoLightbox(false);
            setSelectedArtist(null);
          }}
          videoProps={{
            videoId: selectedArtist.videoId,
            title: selectedArtist.title,
            description: selectedArtist.description,
          }}
        />
      )}
    </>
  );
};
