"use client";

import React, { useState, useEffect } from "react";
import { 
  YouTubeAPIService, 
  getDemoEpisodes, 
  searchYouTubeVideos, 
  getChannelInfo, 
  DEMO_CHANNELS,
  formatDuration,
  YouTubeVideo,
  YouTubeChannel
} from "@/lib/youtube";
import { Episode } from "@/types";
import { VideoThumbnail } from "@/components/ui/VideoPlayer";

export default function YouTubeAPIDemo() {
  const [apiKey, setApiKey] = useState('');
  const [channelId, setChannelId] = useState('UC_x5XG1OV2P6uZZ5FSM9Ttw');
  const [searchQuery, setSearchQuery] = useState('');
  const [channelSearchQuery, setChannelSearchQuery] = useState('Voauniverse');
  const [foundChannels, setFoundChannels] = useState<any[]>([]);
  const [findingChannels, setFindingChannels] = useState(false);
  
  const [channelInfo, setChannelInfo] = useState<YouTubeChannel | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [searchResults, setSearchResults] = useState<Episode[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'channel' | 'search' | 'finder'>('channel');

  // Check for API key in environment
  useEffect(() => {
    const envApiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    if (envApiKey && envApiKey !== 'your_youtube_api_key_here') {
      setApiKey(envApiKey);
    }
  }, []);

  const handleGetChannelInfo = async () => {
    if (!apiKey) {
      setError('Please enter your YouTube API key');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const info = await getChannelInfo(channelId);
      setChannelInfo(info);
      
      if (info) {
        console.log('Channel stats:', info.statistics);
        console.log('Upload playlist:', info.contentDetails.relatedPlaylists.uploads);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching channel info');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetChannelVideos = async () => {
    if (!apiKey) {
      setError('Please enter your YouTube API key');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const youtubeService = new YouTubeAPIService(apiKey);
      const videos = await youtubeService.getChannelVideos(channelId, 20);
      
      // Convert to episodes
      const episodeList = videos.map((video: any, index: number) => ({
        id: video.id,
        title: video.snippet.title,
        slug: video.snippet.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt: video.snippet.description.substring(0, 150) + '...',
        youtube_url: `https://www.youtube.com/watch?v=${video.id}`,
        thumbnail_url: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url || '',
        category: 'Storytellers' as const,
        tags: video.snippet.tags?.slice(0, 3) || [],
        published_at: video.snippet.publishedAt.split('T')[0],
        featured: index < 3,
        assets: []
      }));
      
      setEpisodes(episodeList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching videos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!apiKey || !searchQuery) {
      setError('Please enter your YouTube API key and search query');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const results = await searchYouTubeVideos(searchQuery, 15);
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error searching videos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUseDemoChannel = (demoKey: keyof typeof DEMO_CHANNELS) => {
    setChannelId(DEMO_CHANNELS[demoKey]);
  };

  const handleFindChannels = async () => {
    if (!apiKey) {
      setError('Please enter your YouTube API key');
      return;
    }

    setFindingChannels(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/youtube/find-channel?channel=${encodeURIComponent(channelSearchQuery)}&key=${apiKey}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to find channels');
      }
      
      setFoundChannels(data.channels);
      
      // If we find a suggested VOA channel, auto-select it
      if (data.suggestions?.voauniverse) {
        setChannelId(data.suggestions.voauniverse.id);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to find channels');
    } finally {
      setFindingChannels(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl mb-4">YouTube Data API Demo</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            This page demonstrates the complete YouTube Data API v3 integration following the official flow:
            <span className="font-mono bg-gray-100 px-2 py-1 rounded mx-1">
              channels.list → playlistItems.list → videos.list
            </span>
          </p>
        </div>

        {/* API Key Input */}
        <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200 p-6 mb-8">
          <h2 className="font-display text-xl mb-4">🔑 API Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">YouTube Data API v3 Key:</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSyB..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Get your key from <a href="https://console.developers.google.com/" target="_blank" className="text-blue-600 hover:underline">Google Cloud Console</a>
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Channel ID:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={channelId}
                  onChange={(e) => setChannelId(e.target.value)}
                  placeholder="UC..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                />
              </div>
              
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleUseDemoChannel('googleDev')} className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded">
                  Google Developers
                </button>
                <button onClick={() => handleUseDemoChannel('tedx')} className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded">
                  TEDx Talks
                </button>
                <button onClick={() => handleUseDemoChannel('nasa')} className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded">
                  NASA
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-red-600">❌</span>
              <span className="font-medium text-red-800">Error:</span>
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('channel')}
            className={`px-6 py-3 font-display ${
              activeTab === 'channel' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📺 Channel Analysis
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-6 py-3 font-display ${
              activeTab === 'search' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🔍 Video Search
          </button>
          <button
            onClick={() => setActiveTab('finder')}
            className={`px-6 py-3 font-display ${
              activeTab === 'finder' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🔎 Channel Finder
          </button>
        </div>

        {/* Channel Tab */}
        {activeTab === 'channel' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="font-display text-xl">Channel Information</h2>
                <button
                  onClick={handleGetChannelInfo}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded font-display text-sm"
                >
                  {loading ? '⏳ Loading...' : '1️⃣ Get Channel Info'}
                </button>
                <button
                  onClick={handleGetChannelVideos}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded font-display text-sm"
                >
                  {loading ? '⏳ Loading...' : '2️⃣ Get Channel Videos'}
                </button>
              </div>

              {channelInfo && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h3 className="font-display text-lg mb-2">{channelInfo.snippet.title}</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>Subscribers:</strong> {parseInt(channelInfo.statistics.subscriberCount).toLocaleString()}
                    </div>
                    <div>
                      <strong>Videos:</strong> {parseInt(channelInfo.statistics.videoCount).toLocaleString()}
                    </div>
                    <div>
                      <strong>Total Views:</strong> {parseInt(channelInfo.statistics.viewCount).toLocaleString()}
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <strong>Uploads Playlist:</strong> 
                    <code className="ml-1 bg-gray-200 px-1 rounded text-xs">
                      {channelInfo.contentDetails.relatedPlaylists.uploads}
                    </code>
                  </div>
                </div>
              )}
            </div>

            {/* Videos Grid */}
            {episodes.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200 p-6">
                <h3 className="font-display text-xl mb-4">Channel Videos ({episodes.length})</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {episodes.slice(0, 9).map((episode) => (
                    <div key={episode.id} className="border border-gray-200 rounded-lg p-3">
                      <VideoThumbnail
                        videoId={episode.youtube_url.split('v=')[1]}
                        title={episode.title}
                        className="mb-2"
                        onClick={() => window.open(episode.youtube_url, '_blank')}
                      />
                      <h4 className="font-display text-sm line-clamp-2 mb-2">{episode.title}</h4>
                      <p className="text-xs text-gray-600">{episode.published_at}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {episode.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs bg-gray-100 px-1 rounded">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search Tab */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="font-display text-xl">YouTube Search</h2>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for videos..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded font-display text-sm"
                >
                  {loading ? '⏳ Searching...' : '🔍 Search'}
                </button>
              </div>

              {searchResults.length > 0 && (
                <div>
                  <h3 className="font-display text-lg mb-4">Search Results ({searchResults.length})</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((episode) => (
                      <div key={episode.id} className="border border-gray-200 rounded-lg p-3">
                        <VideoThumbnail
                          videoId={episode.youtube_url.split('v=')[1]}
                          title={episode.title}
                          className="mb-2"
                          onClick={() => window.open(episode.youtube_url, '_blank')}
                        />
                        <h4 className="font-display text-sm line-clamp-2 mb-2">{episode.title}</h4>
                        <p className="text-xs text-gray-600">{episode.published_at}</p>
                        <a
                          href={episode.youtube_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 mt-2"
                        >
                          <span>▶️</span> Watch
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Channel Finder Tab */}
        {activeTab === 'finder' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200 p-6">
              <h2 className="font-display text-xl mb-4">Channel Finder</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={channelSearchQuery}
                  onChange={(e) => setChannelSearchQuery(e.target.value)}
                  placeholder="Enter channel name..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={handleFindChannels}
                  disabled={findingChannels}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded font-display text-sm"
                >
                  {findingChannels ? '⏳ Finding...' : '🔍 Find Channel'}
                </button>
              </div>

              {foundChannels.length > 0 && (
                <div>
                  <h3 className="font-display text-lg mb-4">Found Channels ({foundChannels.length})</h3>
                  <div className="space-y-4">
                    {foundChannels.map((channel) => (
                      <div key={channel.id} className="border border-gray-200 rounded-lg p-4 flex gap-4">
                        <div className="flex-shrink-0">
                          <img src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} className="w-16 h-16 rounded-full" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-display text-sm line-clamp-2 mb-1">{channel.snippet.title}</h4>
                          <p className="text-xs text-gray-600 mb-2">{channel.id}</p>
                          <button
                            onClick={() => setChannelId(channel.id)}
                            className="text-xs px-3 py-1 bg-green-100 hover:bg-green-200 rounded"
                          >
                            Select Channel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* API Flow Documentation */}
        <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200 p-6 mt-8">
          <h2 className="font-display text-xl mb-4">📚 API Flow Documentation</h2>
          <div className="space-y-4 text-sm">
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-semibold mb-2">1️⃣ Channel Details (channels.list)</h3>
              <code className="block bg-white p-2 rounded text-xs overflow-x-auto">
                {`GET https://www.googleapis.com/youtube/v3/channels
?part=contentDetails,snippet,statistics
&id=${channelId}
&key=YOUR_API_KEY`}
              </code>
              <p className="mt-2 text-xs">Returns: channel metadata, statistics, and uploads playlist ID</p>
            </div>

            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-semibold mb-2">2️⃣ Playlist Videos (playlistItems.list)</h3>
              <code className="block bg-white p-2 rounded text-xs overflow-x-auto">
                {`GET https://www.googleapis.com/youtube/v3/playlistItems
?part=snippet,contentDetails
&playlistId=UPLOADS_PLAYLIST_ID
&maxResults=50
&key=YOUR_API_KEY`}
              </code>
              <p className="mt-2 text-xs">Returns: list of video IDs in the uploads playlist</p>
            </div>

            <div className="bg-purple-50 p-4 rounded">
              <h3 className="font-semibold mb-2">3️⃣ Video Details (videos.list)</h3>
              <code className="block bg-white p-2 rounded text-xs overflow-x-auto">
                {`GET https://www.googleapis.com/youtube/v3/videos
?part=snippet,statistics,contentDetails
&id=VIDEO_ID1,VIDEO_ID2,VIDEO_ID3
&key=YOUR_API_KEY`}
              </code>
              <p className="mt-2 text-xs">Returns: complete video metadata, statistics, and content details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
