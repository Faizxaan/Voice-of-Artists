# YouTube Data API Setup Guide for Voice of Artists

## Quick Setup

### Step 1: Get YouTube API Key

1. **Go to Google Cloud Console**: https://console.developers.google.com/
2. **Create or select a project**
3. **Enable YouTube Data API v3**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. **Create credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key

### Step 2: Find YouTube Channel ID

For @Voauniverse channel:

**Method 1: From YouTube URL**
- Visit: https://www.youtube.com/@Voauniverse
- Look for the channel URL or use browser tools to find the channel ID
- The ID format is: `UC[22-character-string]`

**Method 2: Using online tools**
- Visit: https://commentpicker.com/youtube-channel-id.php
- Enter: @Voauniverse or the channel URL

**Method 3: Using YouTube API**
```bash
curl "https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=Voauniverse&key=YOUR_API_KEY"
```

### Step 3: Update Environment Variables

Replace the values in `.env.local`:

```env
# Replace with your actual API key
NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Replace with the actual @Voauniverse channel ID  
NEXT_PUBLIC_VOA_CHANNEL_ID=UCAbCdEfGhIjKlMnOpQrStUv
```

### Step 4: Restart Development Server

```bash
npm run dev
```

## Current Status

✅ **YouTube API Service**: Fully implemented with TypeScript interfaces
✅ **API Flow**: channels.list → playlistItems.list → videos.list  
✅ **Fallback System**: Displays dummy data when API key is missing
✅ **Error Handling**: Comprehensive error states and user feedback
⚠️ **API Key**: Needs to be configured in `.env.local`

## Features Implemented

### YouTube Data Integration
- **Channel Details**: Fetches channel info, subscriber count, video count
- **Playlist Videos**: Gets all videos from uploads playlist
- **Video Metadata**: Title, description, thumbnails, publication date
- **Statistics**: View count, like count, comment count (if available)
- **Real-time Data**: Fresh data from YouTube API on each request

### TypeScript Interfaces
```typescript
interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: YouTubeThumbnails;
  channelTitle: string;
  tags?: string[];
  statistics?: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
}
```

### Component Features
- **Loading States**: Spinner and progress indicators
- **Error Handling**: User-friendly error messages
- **Fallback Data**: Dummy episodes when API unavailable
- **Refresh Function**: Manual data refresh capability
- **YouTube Links**: Direct links to original videos

## Testing the Integration

### 1. Demo Page
Visit: http://localhost:3000/youtube-demo

Features:
- API key input and testing
- Channel information display
- Video grid with search
- Real-time API calls

### 2. Episodes Section
Visit: http://localhost:3000/#episodes

Expected behavior:
- **Without API key**: Shows dummy data with fallback message
- **With API key**: Loads real episodes from @Voauniverse
- **Error state**: Clear error message and YouTube channel link

## API Limits & Considerations

### YouTube API Quotas
- **Daily quota**: 10,000 units (default)
- **Cost per request**:
  - channels.list: 1 unit
  - playlistItems.list: 1 unit  
  - videos.list: 1 unit
- **Optimization**: Service caches channel ID to minimize API calls

### Rate Limiting
The service includes built-in rate limiting and error handling for:
- Quota exceeded errors
- Network timeouts
- Invalid API keys
- Deleted or private videos

## Troubleshooting

### Common Issues

**1. "Loading..." never ends**
- Check API key in `.env.local`
- Verify API key is valid in Google Console
- Check browser console for errors

**2. "Failed to load episodes" error**
- API key might be invalid or expired
- YouTube Data API v3 might not be enabled
- Channel ID might be incorrect

**3. Empty results**
- Channel might have no public videos
- Channel ID might be wrong
- Videos might be private/unlisted

### Debugging Steps

1. **Check environment variables**:
```bash
# In your terminal
echo $NEXT_PUBLIC_YOUTUBE_API_KEY
echo $NEXT_PUBLIC_VOA_CHANNEL_ID
```

2. **Test API key manually**:
```bash
curl "https://www.googleapis.com/youtube/v3/channels?part=snippet&id=YOUR_CHANNEL_ID&key=YOUR_API_KEY"
```

3. **Check browser console**:
- Open DevTools (F12)
- Look for error messages
- Check network tab for failed requests

## Production Deployment

### Environment Variables
Set these in your deployment platform:

```env
NEXT_PUBLIC_YOUTUBE_API_KEY=your_production_api_key
NEXT_PUBLIC_VOA_CHANNEL_ID=actual_channel_id
```

### Security Considerations
- API key is public (NEXT_PUBLIC_*) - this is normal for client-side YouTube API
- Restrict API key to your domain in Google Console
- Monitor usage to prevent quota abuse
- Consider implementing server-side caching for production

### Monitoring
- Set up alerts for quota usage
- Monitor API response times
- Track error rates and failed requests

## Next Steps

1. **Get actual API credentials** from Google Cloud Console
2. **Find @Voauniverse channel ID** using the methods above
3. **Update .env.local** with real values
4. **Test the integration** on http://localhost:3000
5. **Deploy to production** with proper environment variables

## Support

- **YouTube API Documentation**: https://developers.google.com/youtube/v3
- **Google Cloud Console**: https://console.developers.google.com/
- **API Key Restrictions**: https://developers.google.com/youtube/v3/getting-started#before-you-start
