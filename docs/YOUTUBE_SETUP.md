# YouTube Integration Setup Guide

This guide will help you set up YouTube API integration for the VOA project during development.

## Quick Setup (5 minutes)

### Step 1: Get a YouTube API Key

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create a new project** (or select existing):
   - Click "Select a project" → "New Project"
   - Name it something like "VOA-YouTube-Integration"
   - Click "Create"

3. **Enable YouTube Data API v3**:
   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click on it and press "Enable"

4. **Create API Key**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the generated API key

5. **Secure your API Key** (Recommended):
   - Click on your API key to edit it
   - Under "API restrictions", select "Restrict key"
   - Choose "YouTube Data API v3"
   - Save

### Step 2: Find a YouTube Channel ID

**Option A: Use Your Own Channel**
1. Go to your YouTube channel
2. Right-click → "View Page Source"
3. Search for `"channelId":"` or `"externalId":"`
4. Copy the ID (starts with `UC`)

**Option B: Use a Demo Channel**
For development/testing, you can use these public channels:
- **Google Developers**: `UC_x5XG1OV2P6uZZ5FSM9Ttw`
- **TEDx Talks**: `UCsT0YIqwnpJCM-mx7-gSA4Q`
- **NASA**: `UCLA_DiR1FfKNvjuUpBHmylQ`

### Step 3: Configure Environment

1. **Copy the example file**:
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local`** with your credentials:
   ```bash
   NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   NEXT_PUBLIC_VOA_CHANNEL_ID=UC_x5XG1OV2P6uZZ5FSM9Ttw
   ```

3. **Restart the development server**:
   ```bash
   npm run dev
   ```

## Testing the Integration

1. **Visit the Episodes section** on your local site
2. **Check the browser console** for any API errors
3. **Verify episodes load** from the real YouTube channel
4. **Test different channels** by changing the channel ID

## Troubleshooting

### API Key Issues
- **"API key not valid"**: Make sure you copied the full key
- **"API key restricted"**: Check that YouTube Data API v3 is allowed
- **"Quota exceeded"**: You've hit the daily limit (10,000 requests/day free)

### Channel ID Issues
- **"Channel not found"**: Double-check the channel ID format (starts with UC)
- **"No videos found"**: The channel might not have any public videos

### Fallback Behavior
- **If API fails**: The app automatically uses curated VOA-style episodes
- **No API key**: Uses fallback episodes (this is perfectly fine for development)

## API Quota Management

The YouTube API has a daily quota of 10,000 units (free tier):
- **Search request**: ~100 units
- **Video details**: ~1 unit per video
- **Channel info**: ~1 unit

For development, this is more than enough. In production, consider:
- Caching responses
- Using webhooks for real-time updates
- Implementing incremental sync

## Production Deployment

When deploying to Vercel/Netlify:

1. **Add environment variables** in your deployment dashboard
2. **Don't commit** `.env.local` to git
3. **Consider API restrictions** by domain/IP for security

## Alternative: RSS Feed Method

If you prefer not to use YouTube API, you can also:
1. Use the channel's RSS feed: `https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID`
2. Parse XML instead of using API
3. This doesn't require API keys but has limited data

---

**Need help?** The app works perfectly with fallback data, so YouTube API is optional for demonstrating the project functionality.
