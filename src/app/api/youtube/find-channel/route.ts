import { NextRequest, NextResponse } from 'next/server';

// YouTube Channel ID Finder API Route
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const channelName = searchParams.get('channel');
  const apiKey = searchParams.get('key');

  if (!channelName || !apiKey) {
    return NextResponse.json(
      { error: 'Missing channel name or API key' },
      { status: 400 }
    );
  }

  try {
    // Search for the channel using YouTube API
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(channelName)}&maxResults=5&key=${apiKey}`
    );

    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      return NextResponse.json(
        { error: 'YouTube API error', details: errorData },
        { status: searchResponse.status }
      );
    }

    const searchData = await searchResponse.json();
    
    if (!searchData.items || searchData.items.length === 0) {
      return NextResponse.json(
        { error: 'No channels found for this search term' },
        { status: 404 }
      );
    }

    // Get detailed information for each found channel
    const channelIds = searchData.items.map((item: any) => item.snippet.channelId);
    const channelsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds.join(',')}&key=${apiKey}`
    );

    if (!channelsResponse.ok) {
      const errorData = await channelsResponse.json();
      return NextResponse.json(
        { error: 'Failed to get channel details', details: errorData },
        { status: channelsResponse.status }
      );
    }

    const channelsData = await channelsResponse.json();
    
    const channels = channelsData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      customUrl: item.snippet.customUrl || '',
      publishedAt: item.snippet.publishedAt,
      thumbnails: item.snippet.thumbnails,
      statistics: {
        subscriberCount: item.statistics.subscriberCount || '0',
        videoCount: item.statistics.videoCount || '0',
        viewCount: item.statistics.viewCount || '0',
      }
    }));

    return NextResponse.json({
      query: channelName,
      channels,
      suggestions: {
        voauniverse: channels.find((ch: any) => 
          ch.title.toLowerCase().includes('voice') && 
          ch.title.toLowerCase().includes('artist')
        ) || channels.find((ch: any) => 
          ch.title.toLowerCase().includes('voa')
        ) || channels[0]
      }
    });

  } catch (error) {
    console.error('Error finding channel:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
