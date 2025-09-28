/**
 * YouTube Data API Service for Voice of Artist Channel
 * Complete implementation using official YouTube Data API v3
 * 
 * Flow: channels.list → playlistItems.list → videos.list
 */

// YouTube API interfaces based on official documentation
export interface YouTubeChannel {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: YouTubeThumbnails;
    publishedAt: string;
    defaultLanguage?: string;
    country?: string;
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
  contentDetails: {
    relatedPlaylists: {
      uploads: string;
      watchHistory?: string;
      watchLater?: string;
    };
  };
}

export interface YouTubePlaylistItem {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: YouTubeThumbnails;
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
  };
  contentDetails: {
    videoId: string;
    note?: string;
    videoPublishedAt: string;
  };
}

export interface YouTubeVideo {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: YouTubeThumbnails;
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultLanguage?: string;
    defaultAudioLanguage?: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    regionRestriction?: {
      allowed?: string[];
      blocked?: string[];
    };
  };
}

export interface YouTubeThumbnails {
  default: {
    url: string;
    width: number;
    height: number;
  };
  medium: {
    url: string;
    width: number;
    height: number;
  };
  high: {
    url: string;
    width: number;
    height: number;
  };
  standard?: {
    url: string;
    width: number;
    height: number;
  };
  maxres?: {
    url: string;
    width: number;
    height: number;
  };
}

export interface YouTubeAPIResponse<T> {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: T[];
}

// YouTube API configuration
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';
const VOA_CHANNEL_ID = process.env.NEXT_PUBLIC_VOA_CHANNEL_ID || 'UCYourChannelIdHere';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Popular demo channels for development/testing
export const DEMO_CHANNELS = {
  googleDev: 'UC_x5XG1OV2P6uZZ5FSM9Ttw', // Google Developers
  tedx: 'UCsT0YIqwnpJCM-mx7-gSA4Q',      // TEDx Talks  
  nasa: 'UCLA_DiR1FfKNvjuUpBHmylQ',      // NASA
  voauniverse: 'UCYourVOAChannelIdHere'    // Replace with actual VOA channel
};

// Curated category overrides by YouTube video ID (11 chars)
// These ensure correct categorization regardless of title/tags
const CATEGORY_OVERRIDES: Record<string, import('@/types').CategoryType> = {
  // Writers (full + shorts)
  IbM9r21Uejc: 'Writers',
  BPsA0rSZqhw: 'Writers',
  ZElSHSq2Sg0: 'Writers',
  g4egHJK53iQ: 'Writers',
  'zK5efA-Qnxs': 'Writers',
  A8o75XkEKcU: 'Writers',

  // Curators → Storytellers
  AaLkO_x1f_0: 'Storytellers',
  yFltWfTfKfg: 'Storytellers',
  cSgPr0_rfoM: 'Storytellers',
  '7mLbrxz57Lg': 'Storytellers',
  NfP2uemARjs: 'Storytellers',
  CwmMs5GdtAM: 'Storytellers',
  '7aqmAPJk4LE': 'Storytellers',
  BPI_2hUxDdk: 'Storytellers',

  // Actors → Storytellers
  BOVYv0SAKgE: 'Storytellers',
  '-p9nVdBmdAY': 'Storytellers',
  'Cj1-5D5GdNk': 'Storytellers',
  aluiGvpVwzA: 'Storytellers',
  ppSGeRHvGEk: 'Storytellers',
  qtV13Kn3hAM: 'Storytellers',
  NVcDU76XuQA: 'Storytellers',
  'z7CUYOtXUCU': 'Storytellers',

  // Directors
  xq9ldzGN7q0: 'Directors',
  VuX4AAnOQ0Q: 'Directors',
  J8v_RUc7NWw: 'Directors',
  lO8PczIo9jg: 'Directors',
  uix1RXXbyME: 'Directors',
  lelWbbCjS7s: 'Directors',
  '56kLUPN_oXU': 'Directors',
  pg7berXFuV0: 'Directors',
  XuvwybcizXw: 'Directors',
  'xQ5nM1JNp-U': 'Directors',
  yhqNprfYCrs: 'Directors',
  '44T7gvWpCL4': 'Directors',
  AaT0YcIfomA: 'Directors',
  'k0W64RDT1VU': 'Directors',
  Ab1IeuRbcxs: 'Directors',

  // Designers
  rlbHXIi74mc: 'Designers',
  'GESK-djAQHY': 'Designers',
  '2FxuPe4BZvc': 'Designers',
  _Wi_D3jUrqg: 'Designers',
  dX0FyLkdPss: 'Designers',

  // Painter
  RdYh_JEVD7c: 'Painters',

  // Glimpses (group promos) → Storytellers
  '0o3zn4WsjTw': 'Storytellers',
  qWKgwxtbAwo: 'Storytellers',
  ZRQAIoZ8lJs: 'Storytellers',
  '0MHnZEBEbXo': 'Storytellers',
  'fox-RAfNjUE': 'Storytellers',
  'aUNj_KhqlxI': 'Storytellers',
  jXeUjPKQW_s: 'Storytellers',
  DnExq_M6gu8: 'Storytellers',

  // Classical Dancers → Storytellers
  W0HqckkVNx0: 'Storytellers',
  '70MCwRfIyqQ': 'Storytellers',
  KVOGFjpv3OY: 'Storytellers',
  tkVoLeCEvP0: 'Storytellers',
  nn5jim6e1bE: 'Storytellers',

  // Cinematographers → Filmmakers
  '0fqhWkeaTWg': 'Filmmakers',
  '4-gS7LDWW0Y': 'Filmmakers',
  svBLVafaZwk: 'Filmmakers',
  bS5d67lePSw: 'Filmmakers',

  // Musicians
  FzhRGM4auII: 'Musicians',
  l198eDIe0Jg: 'Musicians',

  // VOA Launch → Storytellers
  wP2cv9xcRwo: 'Storytellers',
  HvPZnaTPZbQ: 'Storytellers',
  '7rL31XK3sWo': 'Storytellers',
  'i-buXDCrjsI': 'Storytellers',
};

/**
 * YouTube Data API Service Class
 * Implements the recommended flow: channels.list → playlistItems.list → videos.list
 */
export class YouTubeAPIService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || YOUTUBE_API_KEY;
    this.baseUrl = BASE_URL;
  }

  /**
   * Step 1: Get channel details including uploads playlist ID
   * Example: fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`)
   */
  async getChannelDetails(channelId: string): Promise<YouTubeChannel | null> {
    if (!this.apiKey) {
      throw new Error('YouTube API key is required');
    }

    try {
      const url = `${this.baseUrl}/channels?part=contentDetails,snippet,statistics&id=${channelId}&key=${this.apiKey}`;
      console.log('🔍 Fetching channel details:', channelId);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }

      const data: YouTubeAPIResponse<YouTubeChannel> = await response.json();
      
      if (data.items && data.items.length > 0) {
        console.log('✅ Channel found:', data.items[0].snippet.title);
        return data.items[0];
      }
      
      return null;
    } catch (error) {
      console.error('❌ Error fetching channel details:', error);
      throw error;
    }
  }

  /**
   * Step 2: Get videos from uploads playlist (paginated)
   * Example: fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&key=${API_KEY}`)
   */
  async getPlaylistVideos(
    playlistId: string, 
    maxResults: number = 50,
    pageToken?: string
  ): Promise<YouTubeAPIResponse<YouTubePlaylistItem>> {
    if (!this.apiKey) {
      throw new Error('YouTube API key is required');
    }

    try {
      let url = `${this.baseUrl}/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=${maxResults}&key=${this.apiKey}`;
      
      if (pageToken) {
        url += `&pageToken=${pageToken}`;
      }

      console.log('🎵 Fetching playlist videos:', playlistId);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`📋 Found ${data.items?.length || 0} videos in playlist`);
      return data;
    } catch (error) {
      console.error('❌ Error fetching playlist videos:', error);
      throw error;
    }
  }

  /**
   * Step 3: Get full video details for a list of video IDs
   * Example: fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=VIDEO_ID1,VIDEO_ID2&key=${API_KEY}`)
   */
  async getVideoDetails(videoIds: string[]): Promise<YouTubeVideo[]> {
    if (!this.apiKey) {
      throw new Error('YouTube API key is required');
    }

    if (videoIds.length === 0) {
      return [];
    }

    try {
      // YouTube API supports up to 50 video IDs per request
      const chunks = this.chunkArray(videoIds, 50);
      const allVideos: YouTubeVideo[] = [];

      for (const chunk of chunks) {
        const url = `${this.baseUrl}/videos?part=snippet,statistics,contentDetails&id=${chunk.join(',')}&key=${this.apiKey}`;
        console.log(`🎥 Fetching details for ${chunk.length} videos`);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
        }

        const data: YouTubeAPIResponse<YouTubeVideo> = await response.json();
        if (data.items) {
          allVideos.push(...data.items);
          console.log(`✅ Got ${data.items.length} video details`);
        }
      }

      return allVideos;
    } catch (error) {
      console.error('❌ Error fetching video details:', error);
      throw error;
    }
  }

  /**
   * Complete workflow: Get all channel videos with full details
   */
  async getChannelVideos(channelId: string, maxResults: number = 50): Promise<YouTubeVideo[]> {
    try {
      console.log(`🎬 Starting complete workflow for channel: ${channelId}`);
      
      // Step 1: Get channel details
      const channel = await this.getChannelDetails(channelId);
      if (!channel) {
        throw new Error('Channel not found or invalid channel ID');
      }

      const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;
      console.log(`📋 Uploads playlist ID: ${uploadsPlaylistId}`);

      // Step 2: Get video IDs from uploads playlist
      const playlistResponse = await this.getPlaylistVideos(uploadsPlaylistId, maxResults);
      const videoIds = playlistResponse.items.map(item => item.contentDetails.videoId);
      console.log(`🎥 Found ${videoIds.length} video IDs`);

      if (videoIds.length === 0) {
        console.log('⚠️ No videos found in uploads playlist');
        return [];
      }

      // Step 3: Get full video details
      const videos = await this.getVideoDetails(videoIds);
      console.log(`✅ Retrieved ${videos.length} complete video details`);

      return videos;
    } catch (error) {
      console.error('❌ Error in complete workflow:', error);
      throw error;
    }
  }

  /**
   * Helper method to chunk arrays for batch processing
   */
  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
}

/**
 * Convert YouTube duration (ISO 8601) to readable format
 * PT15M30S → 15:30
 * PT1H23M45S → 1:23:45
 */
export function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';

  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  if (hours) {
    return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }
  
  return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
}

/**
 * Convert YouTube API video data to Episode format
 */
export function convertYouTubeToEpisode(video: YouTubeVideo, index: number): import('@/types').Episode {
  // Determine category based on title keywords and tags
  const title = video.snippet.title.toLowerCase();
  const description = video.snippet.description.toLowerCase();
  const tags = video.snippet.tags || [];
  
  let category: import('@/types').CategoryType = 'Storytellers';

  // Curated override first
  if (CATEGORY_OVERRIDES[video.id]) {
    category = CATEGORY_OVERRIDES[video.id];
  } else {
    // Smart category detection
  // Smart category detection
  if (title.includes('paint') || title.includes('color') || title.includes('canvas') || 
      tags.some(tag => ['paint', 'painting', 'artist', 'canvas'].some(keyword => tag.toLowerCase().includes(keyword)))) {
    category = 'Painters';
  } else if (title.includes('music') || title.includes('rhythm') || title.includes('sound') || title.includes('song') ||
             tags.some(tag => ['music', 'musician', 'song', 'audio'].some(keyword => tag.toLowerCase().includes(keyword)))) {
    category = 'Musicians';
  } else if (title.includes('film') || title.includes('director') || title.includes('cinema') || title.includes('movie') ||
             tags.some(tag => ['film', 'movie', 'cinema', 'director'].some(keyword => tag.toLowerCase().includes(keyword)))) {
    category = 'Directors';
  } else if (title.includes('photo') || title.includes('lens') || title.includes('camera') || title.includes('photograph') ||
             tags.some(tag => ['photo', 'photography', 'camera'].some(keyword => tag.toLowerCase().includes(keyword)))) {
    category = 'Photographers';
  } else if (title.includes('write') || title.includes('poet') || title.includes('word') || title.includes('story') ||
             tags.some(tag => ['writing', 'writer', 'poet', 'poetry'].some(keyword => tag.toLowerCase().includes(keyword)))) {
    category = 'Writers';
  } else if (title.includes('design') || title.includes('visual') || title.includes('graphic') ||
             tags.some(tag => ['design', 'designer', 'graphic'].some(keyword => tag.toLowerCase().includes(keyword)))) {
    category = 'Designers';
  } else if (title.includes('filmmaker') || title.includes('documentary') ||
             tags.some(tag => ['filmmaker', 'documentary'].some(keyword => tag.toLowerCase().includes(keyword)))) {
    category = 'Filmmakers';
  } else if (title.includes('curator') || title.includes('curation') || title.includes('exhibition') ||
             tags.some(tag => ['curator', 'curation', 'exhibition'].some(keyword => tag.toLowerCase().includes(keyword)))) {
    category = 'Curators';
  } else if (title.includes('actor') || title.includes('acting') || title.includes('performance') || title.includes('theater') ||
             tags.some(tag => ['actor', 'acting', 'performance', 'theater'].some(keyword => tag.toLowerCase().includes(keyword)))) {
    category = 'Actors';
  } else if (title.includes('dance') || title.includes('dancer') || title.includes('choreography') || title.includes('ballet') ||
             tags.some(tag => ['dance', 'dancer', 'choreography', 'ballet', 'classical'].some(keyword => tag.toLowerCase().includes(keyword)))) {
    category = 'Dancers';
  } else if (title.includes('cinematographer') || title.includes('cinematography') || title.includes('camera work') ||
             tags.some(tag => ['cinematographer', 'cinematography', 'camera work'].some(keyword => tag.toLowerCase().includes(keyword)))) {
    category = 'Cinematographers';
  }
  }
  
  // end override/detection block
  
  // Extract meaningful tags from title, description, and YouTube tags
  const extractedTags: string[] = [];
  const content = `${video.snippet.title} ${video.snippet.description}`.toLowerCase();
  
  const keywordMap = {
    'creative': 'creative',
    'creativity': 'creative',
    'art': 'art',
    'artistic': 'art',
    'voice': 'voice',
    'journey': 'journey',
    'story': 'storytelling',
    'storytelling': 'storytelling',
    'narrative': 'storytelling',
    'expression': 'expression',
    'authentic': 'authentic',
    'authenticity': 'authentic',
    'independent': 'indie',
    'indie': 'indie',
    'original': 'original',
    'originality': 'original',
    'passion': 'passion',
    'passionate': 'passion',
    'inspiration': 'inspiration',
    'inspiring': 'inspiration',
    'behind the scenes': 'bts',
    'interview': 'interview',
    'process': 'creative-process',
    'technique': 'technique',
    'skill': 'skill',
    'tutorial': 'tutorial'
  };

  Object.entries(keywordMap).forEach(([keyword, tag]) => {
    if (content.includes(keyword) && !extractedTags.includes(tag)) {
      extractedTags.push(tag);
    }
  });

  // Add cleaned YouTube tags (limit and filter)
  if (video.snippet.tags) {
    video.snippet.tags.slice(0, 3).forEach(tag => {
      const cleanTag = tag.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      
      if (cleanTag.length > 2 && cleanTag.length < 20 && !extractedTags.includes(cleanTag)) {
        extractedTags.push(cleanTag);
      }
    });
  }

  // Get best available thumbnail
  const thumbnails = video.snippet.thumbnails;
  const thumbnailUrl = thumbnails.maxres?.url || 
                      thumbnails.high?.url || 
                      thumbnails.medium?.url || 
                      thumbnails.default?.url ||
                      '';

  // Create excerpt from description
  const maxExcerptLength = 150;
  let excerpt = video.snippet.description;
  
  // Remove URLs from excerpt
  excerpt = excerpt.replace(/https?:\/\/[^\s]+/g, '');
  
  // Trim to length
  if (excerpt.length > maxExcerptLength) {
    excerpt = excerpt.substring(0, maxExcerptLength);
    // Try to end at a word boundary
    const lastSpace = excerpt.lastIndexOf(' ');
    if (lastSpace > maxExcerptLength - 20) {
      excerpt = excerpt.substring(0, lastSpace);
    }
    excerpt += '...';
  }

  return {
    id: video.id,
    title: video.snippet.title,
    slug: video.snippet.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
    excerpt: excerpt.trim(),
    youtube_url: `https://www.youtube.com/watch?v=${video.id}`,
    thumbnail_url: thumbnailUrl,
    category,
    tags: extractedTags.slice(0, 5), // Limit to 5 tags
    published_at: video.snippet.publishedAt.split('T')[0], // Convert to YYYY-MM-DD format
    featured: index < 3, // Mark first 3 as featured
    assets: []
  };
}

/**
 * Fallback episodes data for development/demo
 */
export const fallbackEpisodes: import('@/types').Episode[] = [
  // Writers Full Episodes
  {
    id: "writers-1",
    title: "Writer's Creative Journey - Expressing Through Words",
    slug: "writer-creative-journey-expressing-through-words",
    excerpt: "Discover the power of written expression with a talented writer who transforms personal experiences into universal stories.",
    youtube_url: "https://youtu.be/IbM9r21Uejc",
    thumbnail_url: "/thumbnails/IbM9r21Uejc.jpg",
    category: "Writers",
    tags: ["writing", "creativity", "storytelling", "expression", "journey"],
    published_at: "2024-09-15",
    featured: true,
    assets: []
  },
  {
    id: "writers-2",
    title: "The Art of Storytelling - Writer's Perspective",
    slug: "art-of-storytelling-writers-perspective",
    excerpt: "Explore narrative techniques and creative writing processes with an accomplished storyteller.",
    youtube_url: "https://youtu.be/BPsA0rSZqhw",
    thumbnail_url: "/thumbnails/BPsA0rSZqhw.jpg",
    category: "Writers",
    tags: ["storytelling", "narrative", "writing", "creative-process", "craft"],
    published_at: "2024-09-10",
    featured: true,
    assets: []
  },
  {
    id: "writers-3",
    title: "Literary Voice - Modern Writing Techniques",
    slug: "literary-voice-modern-writing-techniques",
    excerpt: "A contemporary writer shares insights into developing a unique literary voice and modern storytelling approaches.",
    youtube_url: "https://youtu.be/ZElSHSq2Sg0",
    thumbnail_url: "/thumbnails/ZElSHSq2Sg0.jpg",
    category: "Writers",
    tags: ["literary", "modern", "techniques", "voice", "contemporary"],
    published_at: "2024-09-05",
    featured: false,
    assets: []
  },

  // Curators
  {
    id: "curators-1", 
    title: "Curator's Vision - Bringing Art to Life",
    slug: "curators-vision-bringing-art-to-life",
    excerpt: "Meet a passionate curator who bridges the gap between artists and audiences, creating meaningful cultural experiences.",
    youtube_url: "https://youtu.be/AaLkO_x1f_0",
    thumbnail_url: "/thumbnails/AaLkO_x1f_0.jpg",
    category: "Curators",
    tags: ["curation", "art", "cultural", "exhibition", "vision"],
    published_at: "2024-08-30",
    featured: true,
    assets: []
  },
  {
    id: "curators-2",
    title: "Dance and Curation - Movement in Art",
    slug: "dance-and-curation-movement-in-art", 
    excerpt: "A curator-dancer explores the intersection of movement and curatorial practice in contemporary art spaces.",
    youtube_url: "https://youtu.be/yFltWfTfKfg",
    thumbnail_url: "/thumbnails/yFltWfTfKfg.jpg",
    category: "Curators",
    tags: ["dance", "curation", "movement", "contemporary", "art-spaces"],
    published_at: "2024-08-25",
    featured: false,
    assets: []
  },

  // Actors
  {
    id: "actors-1",
    title: "Actor's Craft - Bringing Characters to Life",
    slug: "actors-craft-bringing-characters-to-life",
    excerpt: "Dive into the world of acting with a seasoned performer who shares the art of character development and emotional truth.",
    youtube_url: "https://youtu.be/BOVYv0SAKgE",
    thumbnail_url: "/thumbnails/BOVYv0SAKgE.jpg",
    category: "Actors",
    tags: ["acting", "character", "performance", "craft", "theater"],
    published_at: "2024-08-20",
    featured: true,
    assets: []
  },
  {
    id: "actors-2",
    title: "Performance Art - Actor's Journey",
    slug: "performance-art-actors-journey",
    excerpt: "An accomplished actor discusses the journey from training to professional performance and the dedication required.",
    youtube_url: "https://youtu.be/-p9nVdBmdAY",
    thumbnail_url: "/thumbnails/-p9nVdBmdAY.jpg",
    category: "Actors",
    tags: ["performance", "journey", "training", "dedication", "professional"],
    published_at: "2024-08-15",
    featured: false,
    assets: []
  },

  // Directors
  {
    id: "directors-1",
    title: "Director's Vision - Cinematic Storytelling",
    slug: "directors-vision-cinematic-storytelling",
    excerpt: "Explore the creative process behind filmmaking with a visionary director who brings stories to life on screen.",
    youtube_url: "https://youtu.be/xq9ldzGN7q0",
    thumbnail_url: "/thumbnails/xq9ldzGN7q0.jpg",
    category: "Directors",
    tags: ["directing", "cinema", "storytelling", "filmmaking", "vision"],
    published_at: "2024-08-10",
    featured: true,
    assets: []
  },
  {
    id: "directors-2",
    title: "Film Direction - Creative Leadership",
    slug: "film-direction-creative-leadership",
    excerpt: "A multi-talented director-actor shares insights into leading creative teams and bringing cinematic visions to reality.",
    youtube_url: "https://youtu.be/VuX4AAnOQ0Q",
    thumbnail_url: "/thumbnails/VuX4AAnOQ0Q.jpg",
    category: "Directors",
    tags: ["direction", "leadership", "creative-teams", "cinema", "collaboration"],
    published_at: "2024-08-05",
    featured: false,
    assets: []
  },

  // Designers
  {
    id: "designers-1",
    title: "Design Philosophy - Form Meets Function",
    slug: "design-philosophy-form-meets-function",
    excerpt: "A talented designer explores the balance between aesthetic beauty and practical functionality in contemporary design.",
    youtube_url: "https://youtu.be/rlbHXIi74mc",
    thumbnail_url: "/thumbnails/rlbHXIi74mc.jpg",
    category: "Designers",
    tags: ["design", "philosophy", "function", "aesthetic", "contemporary"],
    published_at: "2024-07-30",
    featured: false,
    assets: []
  },
  {
    id: "designers-2",
    title: "Creative Design Process - Innovation in Action",
    slug: "creative-design-process-innovation-in-action",
    excerpt: "Discover innovative design approaches and creative problem-solving techniques with a forward-thinking designer.",
    youtube_url: "https://youtu.be/GESK-djAQHY",
    thumbnail_url: "/thumbnails/GESK-djAQHY.jpg",
    category: "Designers",
    tags: ["innovation", "design-process", "problem-solving", "creativity", "techniques"],
    published_at: "2024-07-25",
    featured: false,
    assets: []
  },

  // Painters
  {
    id: "painters-1",
    title: "Painter's Expression - Color and Emotion",
    slug: "painters-expression-color-and-emotion",
    excerpt: "Enter the vibrant world of painting where color becomes emotion and canvas transforms into windows of the soul.",
    youtube_url: "https://youtu.be/RdYh_JEVD7c",
    thumbnail_url: "/thumbnails/RdYh_JEVD7c.jpg",
    category: "Painters",
    tags: ["painting", "color", "emotion", "expression", "canvas"],
    published_at: "2024-07-20",
    featured: true,
    assets: []
  },

  // Classical Dancers
  {
    id: "dancers-1",
    title: "Classical Dance - Tradition in Motion",
    slug: "classical-dance-tradition-in-motion",
    excerpt: "Experience the grace and discipline of classical dance with a master performer who embodies centuries of tradition.",
    youtube_url: "https://youtu.be/W0HqckkVNx0",
    thumbnail_url: "/thumbnails/W0HqckkVNx0.jpg",
    category: "Dancers",
    tags: ["classical", "dance", "tradition", "grace", "discipline"],
    published_at: "2024-07-15",
    featured: false,
    assets: []
  },
  {
    id: "dancers-2",
    title: "Dance Heritage - Cultural Movement",
    slug: "dance-heritage-cultural-movement", 
    excerpt: "A classical dancer shares the rich cultural heritage and spiritual dimensions of traditional dance forms.",
    youtube_url: "https://youtu.be/70MCwRfIyqQ",
    thumbnail_url: "/thumbnails/70MCwRfIyqQ.jpg",
    category: "Dancers",
    tags: ["heritage", "cultural", "traditional", "spiritual", "forms"],
    published_at: "2024-07-10",
    featured: false,
    assets: []
  },

  // Cinematographers
  {
    id: "cinematographers-1",
    title: "Cinematography - Visual Storytelling",
    slug: "cinematography-visual-storytelling",
    excerpt: "Explore the art of visual storytelling through the lens of a skilled cinematographer who paints with light.",
    youtube_url: "https://youtu.be/0fqhWkeaTWg",
    thumbnail_url: "/thumbnails/0fqhWkeaTWg.jpg",
    category: "Cinematographers",
    tags: ["cinematography", "visual", "storytelling", "light", "camera"],
    published_at: "2024-07-05",
    featured: false,
    assets: []
  },

  // Musicians
  {
    id: "musicians-1",
    title: "Musical Journey - Portugal's Artistic Voice",
    slug: "musical-journey-portugal-artistic-voice",
    excerpt: "Discover the musical heritage and contemporary sounds of Portugal through the voice of a talented musician.",
    youtube_url: "https://youtu.be/FzhRGM4auII",
    thumbnail_url: "/thumbnails/FzhRGM4auII.jpg",
    category: "Musicians",
    tags: ["music", "portugal", "heritage", "contemporary", "sounds"],
    published_at: "2024-06-30",
    featured: true,
    assets: []
  },

  // VOA Launch/Glimpses Videos
  {
    id: "voa-launch-1",
    title: "Voice of Artist - Platform Launch",
    slug: "voice-of-artist-platform-launch",
    excerpt: "The official launch of Voice of Artist - a platform by artists, of artists, for artists. Art Above Chart.",
    youtube_url: "https://youtu.be/i-buXDCrjsI",
    thumbnail_url: "/thumbnails/i-buXDCrjsI.jpg",
    category: "Storytellers",
    tags: ["launch", "platform", "voa", "art-above-chart", "community"],
    published_at: "2024-06-25",
    featured: true,
    assets: []
  },
  {
    id: "voa-glimpse-1",
    title: "Glimpses of VOA - Artist Community",
    slug: "glimpses-of-voa-artist-community",
    excerpt: "A glimpse into the diverse community of artists that make up the Voice of Artist ecosystem.",
    youtube_url: "https://youtu.be/0o3zn4WsjTw",
    thumbnail_url: "/thumbnails/0o3zn4WsjTw.jpg",
    category: "Storytellers",
    tags: ["glimpses", "community", "diverse", "ecosystem", "artists"],
    published_at: "2024-06-20",
    featured: false,
    assets: []
  }
];

/**
 * Main function to get VOA episodes using YouTube Data API
 */
export async function getVOAEpisodes(): Promise<import('@/types').Episode[]> {
  console.log('🚀 Starting getVOAEpisodes');
  console.log('📺 VOA_CHANNEL_ID:', VOA_CHANNEL_ID);
  console.log('🔑 YOUTUBE_API_KEY available:', !!YOUTUBE_API_KEY);
  
  // Use fallback if no API key
  if (!YOUTUBE_API_KEY) {
    console.log('⚠️ No YouTube API key found, using fallback episodes');
    return fallbackEpisodes;
  }

  try {
    const youtubeService = new YouTubeAPIService(YOUTUBE_API_KEY);
    
    // Determine which channel to use
    const channelId = VOA_CHANNEL_ID !== 'UCYourChannelIdHere' 
      ? VOA_CHANNEL_ID 
      : DEMO_CHANNELS.googleDev; // Use Google Developers as demo
      
    console.log('🎯 Using channel ID:', channelId);
    
    // Fetch videos using the complete YouTube API workflow
    const videos = await youtubeService.getChannelVideos(channelId, 50);
    console.log('📹 Raw YouTube videos received:', videos.length);
    
    if (videos.length === 0) {
      console.log('⚠️ No videos found, using fallback episodes');
      return fallbackEpisodes;
    }
    
    // Convert to Episode format
    const episodes = videos.map((video, index) => convertYouTubeToEpisode(video, index));
    console.log('✨ Converted to episodes:', episodes.length);
    
    return episodes;
  } catch (error) {
    console.error('❌ Error loading episodes from YouTube API:', error);
    console.log('🔄 Falling back to demo episodes');
    return fallbackEpisodes;
  }
}

/**
 * Get episodes from a specific demo channel
 */
export async function getDemoEpisodes(channelKey: keyof typeof DEMO_CHANNELS): Promise<import('@/types').Episode[]> {
  if (!YOUTUBE_API_KEY) {
    console.log('⚠️ No YouTube API key, using fallback episodes');
    return fallbackEpisodes;
  }

  try {
    const youtubeService = new YouTubeAPIService(YOUTUBE_API_KEY);
    const channelId = DEMO_CHANNELS[channelKey];
    console.log(`🎯 Getting demo episodes from ${channelKey}:`, channelId);
    
    const videos = await youtubeService.getChannelVideos(channelId, 20);
    return videos.map((video, index) => convertYouTubeToEpisode(video, index));
  } catch (error) {
    console.error(`❌ Error loading demo episodes from ${channelKey}:`, error);
    return fallbackEpisodes;
  }
}

/**
 * Search videos across YouTube (requires API key)
 * Uses search endpoint instead of channel-specific workflow
 */
export async function searchYouTubeVideos(query: string, maxResults: number = 25): Promise<import('@/types').Episode[]> {
  if (!YOUTUBE_API_KEY) {
    throw new Error('YouTube API key required for search functionality');
  }

  const youtubeService = new YouTubeAPIService(YOUTUBE_API_KEY);
  
  try {
    console.log(`🔍 Searching YouTube for: "${query}"`);
    
    const url = `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
    }

    const data: YouTubeAPIResponse<any> = await response.json();
    console.log(`🎥 Found ${data.items?.length || 0} search results`);
    
    if (!data.items || data.items.length === 0) {
      return [];
    }
    
    const videoIds = data.items.map((item: any) => item.id.videoId);
    const videos = await youtubeService.getVideoDetails(videoIds);
    
    return videos.map((video, index) => convertYouTubeToEpisode(video, index));
  } catch (error) {
    console.error('❌ Error searching YouTube videos:', error);
    throw error;
  }
}

/**
 * Get channel statistics and info
 */
export async function getChannelInfo(channelId?: string): Promise<YouTubeChannel | null> {
  if (!YOUTUBE_API_KEY) {
    console.log('⚠️ No YouTube API key for channel info');
    return null;
  }

  try {
    const youtubeService = new YouTubeAPIService(YOUTUBE_API_KEY);
    const targetChannelId = channelId || VOA_CHANNEL_ID || DEMO_CHANNELS.googleDev;
    
    return await youtubeService.getChannelDetails(targetChannelId);
  } catch (error) {
    console.error('❌ Error getting channel info:', error);
    return null;
  }
}
