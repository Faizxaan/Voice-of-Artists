import React from "react";

const artists = [
  { id: "1", country: "Germany", title: "German Artist Feature", flag: "🇩🇪" },
  { id: "2", country: "Russia", title: "Russian Artist Spotlight", flag: "🇷🇺" },
  {
    id: "3",
    country: "United States",
    title: "US/Dubai Artist Feature",
    flag: "🇺🇸",
  },
  { id: "4", country: "Spain", title: "Spanish Artist Journey", flag: "🇪🇸" },
  {
    id: "5",
    country: "Portugal",
    title: "Portuguese Artist Story",
    flag: "🇵🇹",
  },
  { id: "6", country: "India", title: "Indian Artist Feature #1", flag: "🇮🇳" },
  { id: "7", country: "India", title: "Indian Artist Feature #2", flag: "🇮🇳" },
  {
    id: "8",
    country: "Laos",
    title: "Laotian Artist (Coming Soon)",
    flag: "🇱🇦",
  },
];

export const ArtistsAroundTheWorld: React.FC = () => (
  <section className="py-24">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold mb-8">Artists Around the World</h2>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            {artist.flag} {artist.country} - {artist.title}
          </li>
        ))}
      </ul>
    </div>
  </section>
);
