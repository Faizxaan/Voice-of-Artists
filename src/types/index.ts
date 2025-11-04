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

// Article Types
export interface ArticlePost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or rich text
  featured_image: string;
  author: {
    name: string;
    bio?: string;
    avatar?: string;
  };
  category: CategoryType;
  tags: string[];
  published_at: string; // ISO date string
  updated_at?: string;
  read_time?: number; // minutes
  published: boolean;
}

export interface ArticleCategory {
  id: string;
  name: CategoryType;
  slug: string;
  description?: string;
}

export interface ArticleTag {
  id: string;
  name: string;
  slug: string;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: "admin" | "editor";
}
