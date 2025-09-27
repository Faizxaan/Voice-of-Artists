# VOA (Voice Of Artist) Website

A black & white platform that elevates artists and allied patrons. Built with Next.js, TypeScript, and Tailwind CSS, featuring a cinematic, tactile, ha## 📺 YouTube Integration

The Episodes section dynamically loads real YouTube content with smart categorization!

### ✅ Current Features:
- **Live YouTube Integration**: Pulls real videos from any YouTube channel
- **Development Ready**: Works with your own channel for testing
- **Smart Categorization**: Auto-categorizes videos (Painters, Musicians, etc.)
- **Fallback System**: Beautiful curated episodes when API unavailable
- **Real Thumbnails**: Direct YouTube thumbnail integration
- **Responsive Design**: Optimized for all devices

### 🚀 Quick Setup (5 minutes):
1. **Get YouTube API Key**: [Follow our setup guide](./YOUTUBE_SETUP.md)
2. **Use Any Channel**: Your own channel or demo channels for testing
3. **Configure Environment**:
   ```bash
   cp .env.example .env.local
   # Add your API key and channel ID
   npm run dev
   ```

### 🎯 For Development:
- **No API Key?** → Uses curated VOA-style episodes automatically
- **Demo Channels**: Pre-configured with Google Developers, TEDx, NASA
- **Your Channel**: Perfect for demonstrating real API integration
- **Freelance Ready**: Easy to switch to client's channel later

**See [YOUTUBE_SETUP.md](./YOUTUBE_SETUP.md) for detailed instructions**c with poster imagery and monospaced typography.

## 🚀 Quick Setup for Collaborators

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/Faizxaan/Voice-of-Artists.git
cd Voice-of-Artists

# Install dependencies
npm install

# (Optional) Set up YouTube API integration
cp .env.example .env.local
# Edit .env.local with your YouTube API key and channel ID

# Start development server
npm run dev
```

### 2. Open in Browser

Visit [http://localhost:3000](http://localhost:3000) to see the website.

### 3. Development Commands

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Check code quality
```

## 🎨 Design Philosophy

**Manifesto:** Art Above Chart

**Visual Language:**

- Black & white color palette (#000000 and #FFFFFF)
- Textured paper, tape, and torn edges
- Large hero poster displays
- Monospaced body text (Roboto Mono, Courier Prime)
- Chunky hand-drawn display headings (Bangers, Luckiest Guy)
- Editorial layout inspired by knoxandjamie.com

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd voa-website
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
voa-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   └── sections/           # Page sections
│   ├── lib/                    # Utility functions
│   └── types/                  # TypeScript type definitions
├── public/
│   └── assets/                 # Static assets (images, fonts, etc.)
├── sanity/                     # Sanity CMS configuration
└── README.md
```

## 🎯 Features Implemented

### ✅ Core Sections

- [x] **Hero Section** - Split-screen with tagline and poster art
- [x] **What is VOA** - Mission statement with founder's notes
- [x] **Episodes Hub** - Filterable grid of video episodes
- [x] **Artist Quotes Carousel** - "What is my Voice of Artist" quotes
- [ ] **PR & Press** - Press mentions with downloadable kit
- [ ] **Promo Materials** - YouTube trailers and promotional content
- [ ] **Artist Application Form** - Public application with file uploads
- [ ] **Admin Dashboard** - Content management interface

### ✅ Technical Features

- [x] **Responsive Design** - Desktop, tablet, and mobile optimized
- [x] **YouTube Integration** - Lazy-loaded video players with lightbox
- [x] **Design System** - Consistent VOA brand components
- [x] **Accessibility** - WCAG AA compliant components
- [ ] **CMS Integration** - Sanity headless CMS
- [ ] **SEO Optimization** - Meta tags and sitemap
- [ ] **Performance** - Image optimization and lazy loading

## 🎨 Required Assets

The following assets need to be provided and placed in the `public/assets/` directory:

### Brand Assets

- `voa_logo_dark.svg` - Dark version of VOA logo
- `voa_logo_light.svg` - Light version of VOA logo

### Background Textures

- `backgrounds/stars.png` - Star pattern background
- `backgrounds/clouds.png` - Cloud texture background
- `backgrounds/raindrops.png` - Raindrop pattern background
- `backgrounds/paper-texture.png` - Paper texture overlay

### Tape & Paper Elements

- `tape/tape-horizontal.png` - Horizontal tape overlay (transparent PNG)
- `tape/tape-vertical.png` - Vertical tape overlay (transparent PNG)
- `paper/torn-edge.png` - Torn paper frame effect (transparent PNG)

### Poster Artwork

- `posters/hero-poster.jpg` - Main hero section poster (3000px wide)
- `posters/featured-episode-[n].jpg` - Featured episode artwork

### Artist & Founder Images

- `people/megha-das.jpg` - Founder headshot
- `people/ranaksh-rana.jpg` - Co-founder headshot
- `artists/[artist-name].jpg` - Artist portrait images (optimized)

### Typography

If brand fonts are available, add them to `public/fonts/` and update the font configuration in `tailwind.config.ts`.

## 🛠 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 🎨 Design System

### Colors

```css
--voa-black: #000000 --voa-white: #ffffff --voa-gray-100: #111111
  --voa-gray-200: #222222 --voa-gray-300: #333333;
```

### Typography

- **Display**: Bangers, Luckiest Guy, Fredoka One
- **Body**: Roboto Mono, Courier Prime, Space Mono
- **Script**: Dancing Script, Pacifico (for quotes)

## � YouTube Integration

The Episodes section now pulls real content from the @Voauniverse YouTube channel!

### Current Features:
- ✅ **Automatic Episode Loading**: Displays real episodes from the YouTube channel
- ✅ **Fallback Data**: Uses curated episode data when API is unavailable  
- ✅ **Smart Categorization**: Automatically categorizes videos by content
- ✅ **Responsive Thumbnails**: Uses YouTube's thumbnail API
- ✅ **Real Video Links**: Direct links to actual YouTube videos

### Setup YouTube API (Optional):
1. Get a YouTube Data API v3 key from [Google Cloud Console](https://console.developers.google.com/)
2. Find your channel ID from the YouTube channel page
3. Copy `.env.example` to `.env.local` 
4. Add your API key and channel ID to the environment file

**Note**: If no API key is provided, the site will use curated fallback episodes that match the VOA style and branding.

## �🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard (including YouTube API key if desired)
3. Deploy automatically on push to main branch

---

**Built with ❤️ for the VOA Community**

_Art Above Chart - Every voice matters in the symphony of change._
