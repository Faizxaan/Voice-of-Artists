# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Tech stack: Next.js 15 (App Router), TypeScript, ESLint (flat config), Tailwind CSS 4
- Purpose: “Voice of Artist” website with YouTube-driven Episodes and brand-focused UI

Common commands
- Install dependencies
  - npm install
- Run locally (Turbopack)
  - npm run dev
- Build and serve production
  - npm run build
  - npm run start
- Lint the repo
  - npm run lint
- Lint a single file
  - npx eslint src/path/to/file.tsx
- Auto-fix lint issues
  - npx eslint --fix "src/**/*.{ts,tsx,js,jsx}"
- Type-check (no script defined; runs during build too)
  - npx tsc --noEmit

Environment setup
- Create .env.local with the following (no values committed):
  - NEXT_PUBLIC_YOUTUBE_API_KEY={{YOUR_YOUTUBE_API_KEY}}
  - NEXT_PUBLIC_VOA_CHANNEL_ID={{YOUR_CHANNEL_ID}}
- Behavior without API key: getVOAEpisodes() falls back to curated demo episodes.

Key run targets
- App: http://localhost:3000/
- YouTube demo page: http://localhost:3000/youtube-demo
- API route (Channel finder): GET /api/youtube/find-channel?channel={name}&key={apiKey}

High-level architecture
- App router (src/app)
  - layout.tsx defines global metadata, SEO, and HTML skeleton
  - page.tsx composes the homepage from brand “sections” components and adds JSON-LD via StructuredData
  - app/api/youtube/find-channel/route.ts: serverless route that searches channels (YouTube Data API v3) given channel and key query params
  - youtube-demo/page.tsx: client demo to explore the full YouTube API workflow and search
- Components
  - sections/*: Page-level, brand-styled sections (Header, HeroSectionNew, EpisodesHub, etc.)
  - ui/*: Reusable UI (VideoPlayer/VideoThumbnail, StructuredData, EpisodeDetailModal, index.tsx aggregator)
- Data and domain
  - src/lib/youtube.ts: Core integration with YouTube Data API v3
    - YouTubeAPIService implements official flow: channels.list → playlistItems.list → videos.list
    - getVOAEpisodes(): Loads real episodes if env key present; otherwise yields fallbackEpisodes
    - convertYouTubeToEpisode(): Normalizes YouTube video into internal Episode type with smart category/tag extraction and thumbnail selection
    - DEMO_CHANNELS for development
  - src/types/index.ts: Episode and related domain types
- Styling
  - Global CSS in app/globals.css, design tokens in src/styles/design-tokens.css
- Images and optimization
  - next.config.ts: Remote image allowlist for img.youtube.com and voiceofartist.com; CSP for images; performance/security headers; WebP/AVIF formats; compression enabled

Episodes data flow (big picture)
1) UI (EpisodesHub) mounts on the client, calls getVOAEpisodes()
2) getVOAEpisodes() decides between demo fallback vs. real channel based on env
3) If real, YouTubeAPIService fetches channel → uploads playlist → videos, then convertYouTubeToEpisode() produces Episode[]
4) EpisodesHub renders a horizontally scrollable gallery, with client-side filter/sort and a modal
5) Video thumbnails try local cache first (/thumbnails/{id}.jpg), then fall back to https://img.youtube.com/vi/{id}/hqdefault.jpg

YouTube thumbnails utility
- src/lib/thumbnailManager.js provides a Node utility to cache thumbnails locally
  - Run ad hoc: node src/lib/thumbnailManager.js (lists cached)
  - Programmatic: const TM = require('./src/lib/thumbnailManager'); new TM().processEpisodes(episodes)
  - Note: The utility writes to a public/thumbnails folder relative to the script’s directory; verify or adjust paths before bulk use

ESLint
- ESLint flat config extends next/core-web-vitals and next/typescript
- Ignores: node_modules, .next, out, build, next-env.d.ts

Testing
- No test runner or test scripts are configured in package.json at this time

Notes from README
- Core lifecycle: npm run dev, npm run build, npm run start, npm run lint
- Local development URL: http://localhost:3000
- Optional YouTube API integration via environment variables; without a key, curated fallback data is used
