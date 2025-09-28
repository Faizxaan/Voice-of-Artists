export interface Episode {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  youtube_url: string;
  thumbnail_url: string;
  category: string;
  tags: string[];
  published_at: string;
  featured: boolean;
  transcript?: string;
  created_by?: string;
  assets: string[];
}

export interface Artist {
  id: string;
  name: string;
  discipline: string[];
  bio: string;
  profile_image?: string;
  quote: string; // "What is my Voice of Artist"
  social_links: {
    platform: string;
    url: string;
  }[];
  featured_works: string[];
  level: 1 | 2 | 3;
  status: "active" | "inactive" | "pending";
}

export interface PRItem {
  id: string;
  title: string;
  source: string;
  url: string;
  excerpt: string;
  date: string;
}

export interface Promo {
  id: string;
  title: string;
  youtube_url: string;
  type: "Trailer" | "Short" | "GroupPromo";
  description: string;
  thumbnail: string;
}

export interface VideoPlayerProps {
  videoId: string;
  title: string;
  description?: string;
  published_at?: string;
  showTranscript?: boolean;
  transcriptUrl?: string;
}

export type CategoryType =
  | "Writers"
  | "Directors"
  | "Painters"
  | "Musicians"
  | "Filmmakers"
  | "Designers"
  | "Photographers"
  | "Storytellers"
  | "Curators"
  | "Actors"
  | "Dancers"
  | "Cinematographers";
