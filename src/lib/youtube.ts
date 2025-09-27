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
  }

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
  {
    id: "fallback-1",
    title: "Voice of Artist - Finding Your Creative Voice | Episode 1",
    slug: "voice-of-artist-finding-your-creative-voice-episode-1",
    excerpt: "Welcome to Voice of Artist! In our inaugural episode, we dive deep into what it means to find your unique creative voice as an artist.",
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Rick Roll - reliable test video
    thumbnail_url: "/thumbnails/dQw4w9WgXcQ.jpg", // Local thumbnail
    category: "Storytellers",
    tags: ["creative", "voice", "journey", "art", "authentic"],
    published_at: "2024-09-15",
    featured: true,
    assets: []
  },
  {
    id: "fallback-2", 
    title: "The Art of Storytelling - Independent Filmmaker's Journey",
    slug: "the-art-of-storytelling-independent-filmmakers-journey",
    excerpt: "Exploring narrative techniques and visual storytelling with independent filmmaker Sarah Chen, who quit her corporate job to pursue authentic storytelling.",
    youtube_url: "https://www.youtube.com/watch?v=jNQXAC9IVRw", // Me at the zoo - first YouTube video
    thumbnail_url: "/thumbnails/jNQXAC9IVRw.jpg", // Local thumbnail
    category: "Filmmakers",
    tags: ["storytelling", "filmmaker", "indie", "narrative", "visual"],
    published_at: "2024-09-08",
    featured: true,
    assets: []
  },
  {
    id: "fallback-3",
    title: "Colors of Expression - Abstract Painter's Creative Process",
    slug: "colors-of-expression-abstract-painters-creative-process",
    excerpt: "Join abstract painter Marcus Rivera in his studio as he shares his unique approach to color and form.",
    youtube_url: "https://www.youtube.com/watch?v=9bZkp7q19f0", // Gangnam Style - reliable test video
    thumbnail_url: "/thumbnails/9bZkp7q19f0.jpg", // Local thumbnail
    category: "Painters",
    tags: ["painting", "abstract", "color", "expression", "studio"],
    published_at: "2024-09-01",
    featured: true,
    assets: []
  },
  {
    id: "fallback-4",
    title: "Rhythm and Soul - Musicians Breaking Genre Boundaries",
    slug: "rhythm-and-soul-musicians-breaking-genre-boundaries",
    excerpt: "Meet indie musician Elena Rodriguez, who blends classical training with experimental electronic sounds to create something entirely unique.",
    youtube_url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk", // Despacito - popular video
    thumbnail_url: "/thumbnails/kJQP7kiw5Fk.jpg", // Local thumbnail
    category: "Musicians",
    tags: ["music", "indie", "electronic", "experimental", "genre"],
    published_at: "2024-08-25",
    featured: false,
    assets: []
  },
  {
    id: "fallback-5",
    title: "Written Words, Spoken Truths - Poetry as Social Commentary",
    slug: "written-words-spoken-truths-poetry-as-social-commentary",
    excerpt: "Spoken word poet and author James Thompson discusses how he uses poetry as a tool for social change and personal healing.",
    youtube_url: "https://www.youtube.com/watch?v=L_jWHffIx5E", // Smosh - reliable test video
    thumbnail_url: "/thumbnails/L_jWHffIx5E.jpg", // Local thumbnail
    category: "Writers",
    tags: ["poetry", "social", "spoken-word", "change", "healing"],
    published_at: "2024-08-18",
    featured: false,
    assets: []
  },
  {
    id: "fallback-6",
    title: "Digital Canvas - Modern Photography Perspectives",
    slug: "digital-canvas-modern-photography-perspectives",
    excerpt: "Documentary photographer Lisa Chang shares her journey from street photography to international exhibitions and social impact projects.",
    youtube_url: "https://www.youtube.com/watch?v=0fqhWkeaTWg", 
    thumbnail_url: "/thumbnails/0fqhWkeaTWg.jpg", // Local thumbnail
    category: "Photographers",
    tags: ["photography", "documentary", "street", "exhibition"],
    published_at: "2024-08-11",
    featured: false,
    assets: []
  },
  {
    id: "fallback-7",
    title: "Form and Function - Designer's Aesthetic Philosophy",
    slug: "form-and-function-designers-aesthetic-philosophy",
    excerpt: "Interior designer Michael Torres explains how he creates spaces that tell stories while maintaining functionality and emotional resonance.",
    youtube_url: "https://www.youtube.com/watch?v=0MHnZEBEbXo",
    thumbnail_url: "/thumbnails/0MHnZEBEbXo.jpg", // Local thumbnail
    category: "Designers",
    tags: ["design", "interior", "aesthetic", "functionality"],
    published_at: "2024-08-04",
    featured: false,
    assets: []
  },
  {
    id: "fallback-8",
    title: "Movement and Meaning - Contemporary Dance Expression",
    slug: "movement-and-meaning-contemporary-dance-expression",
    excerpt: "Choreographer and dancer Ana Gutierrez discusses how movement becomes a universal language that transcends cultural boundaries.",
    youtube_url: "https://www.youtube.com/watch?v=2FxuPe4BZvc",
    thumbnail_url: "/thumbnails/2FxuPe4BZvc.jpg", // Local thumbnail
    category: "Storytellers",
    tags: ["dance", "movement", "choreography", "expression"],
    published_at: "2024-07-28",
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
