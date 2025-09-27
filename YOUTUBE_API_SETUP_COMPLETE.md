# 🚀 Complete YouTube Data API Setup Guide

## Quick Start (2 minutes)

### Step 1: Get YouTube API Key

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing one
3. Enable "YouTube Data API v3":
   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create API Key:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy your API key (starts with `AIzaSy...`)

### Step 2: Find Voice of Artist Channel ID

**Option A: Search for @Voauniverse**
1. Visit: http://localhost:3000/youtube-demo
2. Enter your API key
3. Go to "Channel Finder" tab
4. Search for "Voauniverse" or "Voice of Artist"
5. Copy the channel ID (starts with `UC...`)

**Option B: Manual Method**
1. Go to the YouTube channel page
2. Right-click → "View Page Source"
3. Search for `"channelId":"` or `"externalId":"`
4. Copy the ID (format: `UCAbCdEfGhIjKlMnOp...`)

### Step 3: Configure Environment

1. Copy your API key and channel ID
2. Edit `.env.local` file:

```bash
NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_VOA_CHANNEL_ID=UCAbCdEfGhIjKlMnOpQrStUv
```

3. Restart the development server:
```bash
npm run dev
```

### Step 4: Test Integration

1. Visit: http://localhost:3000/#episodes
2. You should see real YouTube data instead of fallback episodes
3. Check the status indicator - it should show "Live API Data"

---

## Demo Channels (for testing)

If you don't have the actual VOA channel ID, you can test with these popular channels:

```bash
# Google Developers
NEXT_PUBLIC_VOA_CHANNEL_ID=UC_x5XG1OV2P6uZZ5FSM9Ttw

# TEDx Talks
NEXT_PUBLIC_VOA_CHANNEL_ID=UCsT0YIqwnpJCM-mx7-gSA4Q

# NASA
NEXT_PUBLIC_VOA_CHANNEL_ID=UCLA_DiR1FfKNvjuUpBHmylQ
```

---

## Testing the Integration

### ✅ Success Indicators:
- Episodes section shows "Live API Data" status
- Real video titles and thumbnails appear
- Published dates are recent
- Video count matches the actual YouTube channel

### ❌ Fallback Data Indicators:
- Status shows "Using Fallback Data"
- Episodes have titles like "Voice of Artist - Finding Your Creative Voice"
- All episodes show the same publication date
- Video IDs are "fallback-1", "fallback-2", etc.

### 🧪 Advanced Testing:
1. Visit `/youtube-demo` page
2. Test all three tabs:
   - **Channel Analysis**: Get channel stats and videos
   - **Video Search**: Search across YouTube
   - **Channel Finder**: Find channels by name

---

## API Quotas & Limits

- **Free Tier**: 10,000 units/day
- **Channel Info**: ~1 unit
- **Video List**: ~100 units
- **Video Details**: ~1 unit per video
- **Search**: ~100 units

**Typical usage for 50 episodes**: ~150 units (well within limits)

---

## Troubleshooting

### "API key not valid"
- Check your API key is correct
- Ensure YouTube Data API v3 is enabled
- Verify API restrictions (if any)

### "Channel not found"
- Verify channel ID format (starts with `UC`)
- Try using demo channel IDs first
- Use the Channel Finder tool

### "Quota exceeded"
- You've hit daily limits (rare for development)
- Wait 24 hours or request quota increase

### Still showing fallback data?
- Check `.env.local` file exists and has correct values
- Restart development server: `npm run dev`
- Clear browser cache
- Check browser console for errors

---

## Production Deployment

For Vercel/Netlify deployment:

1. Add environment variables in dashboard
2. Don't commit `.env.local` to git
3. Consider API key restrictions by domain
4. Implement caching for better performance

---

## Security Notes

- Never commit API keys to git
- Use environment variables only
- Consider IP/domain restrictions for production
- Monitor API usage in Google Cloud Console

---

**Need Help?** 
- Test page: http://localhost:3000/youtube-demo  
- Check console logs for detailed error messages
- The fallback system ensures the site always works, even without API keys
