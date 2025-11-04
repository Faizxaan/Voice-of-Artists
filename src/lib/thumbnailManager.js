/**
 * Thumbnail Manager - Automatically download and cache YouTube thumbnails
 * This script can be run to download thumbnails for any new episodes
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

class ThumbnailManager {
  constructor() {
    this.thumbnailsDir = path.join(__dirname, 'public', 'thumbnails');
    this.ensureThumbnailsDirectory();
  }

  ensureThumbnailsDirectory() {
    if (!fs.existsSync(this.thumbnailsDir)) {
      fs.mkdirSync(this.thumbnailsDir, { recursive: true });
      console.log('📁 Created thumbnails directory');
    }
  }

  /**
   * Extract video ID from YouTube URL
   */
  extractVideoId(url) {
    const regexPatterns = [
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
      /youtube\.com\/watch\?v=([^"&?\/\s]{11})/,
      /youtu\.be\/([^"&?\/\s]{11})/,
      /youtube\.com\/embed\/([^"&?\/\s]{11})/,
      /youtube\.com\/v\/([^"&?\/\s]{11})/
    ];
    
    for (const regex of regexPatterns) {
      const match = url.match(regex);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  }

  /**
   * Check if thumbnail already exists locally
   */
  thumbnailExists(videoId) {
    const filePath = path.join(this.thumbnailsDir, `${videoId}.jpg`);
    return fs.existsSync(filePath);
  }

  /**
   * Download a single thumbnail
   */
  downloadThumbnail(videoId, quality = 'hqdefault') {
    return new Promise((resolve, reject) => {
      const url = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
      const filePath = path.join(this.thumbnailsDir, `${videoId}.jpg`);
      
      console.log(`📥 Downloading: ${url}`);
      
      const file = fs.createWriteStream(filePath);
      
      https.get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          
          file.on('finish', () => {
            file.close();
            console.log(`✅ Downloaded: ${videoId}.jpg`);
            resolve(filePath);
          });
        } else {
          console.log(`❌ Failed to download ${videoId}: Status ${response.statusCode}`);
          fs.unlink(filePath, () => {}); // Delete empty file
          reject(new Error(`HTTP ${response.statusCode}`));
        }
      }).on('error', (error) => {
        console.error(`❌ Error downloading ${videoId}:`, error.message);
        fs.unlink(filePath, () => {}); // Delete empty file
        reject(error);
      });
    });
  }

  /**
   * Process episodes and download missing thumbnails
   */
  async processEpisodes(episodes) {
    console.log(`🎬 Processing ${episodes.length} episodes...`);
    
    const downloadPromises = [];
    
    for (const episode of episodes) {
      const videoId = this.extractVideoId(episode.youtube_url);
      
      if (!videoId) {
        console.warn(`⚠️ Could not extract video ID from: ${episode.youtube_url}`);
        continue;
      }

      if (this.thumbnailExists(videoId)) {
        console.log(`✅ Thumbnail already exists for: ${videoId}`);
        continue;
      }

      // Add download promise with delay
      downloadPromises.push(
        new Promise(async (resolve) => {
          try {
            await new Promise(r => setTimeout(r, downloadPromises.length * 500)); // Staggered downloads
            await this.downloadThumbnail(videoId);
            resolve({ success: true, videoId });
          } catch (error) {
            console.error(`Failed to download ${videoId}:`, error.message);
            resolve({ success: false, videoId, error: error.message });
          }
        })
      );
    }

    if (downloadPromises.length === 0) {
      console.log('🎉 All thumbnails already exist!');
      return;
    }

    console.log(`⬇️ Downloading ${downloadPromises.length} missing thumbnails...`);
    const results = await Promise.all(downloadPromises);
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log(`\n📊 Download Summary:`);
    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);
    
    if (failed > 0) {
      console.log('\n❌ Failed downloads:');
      results.filter(r => !r.success).forEach(r => {
        console.log(`  - ${r.videoId}: ${r.error}`);
      });
    }
    
    return results;
  }

  /**
   * Get local thumbnail URL for a video ID
   */
  getLocalThumbnailUrl(videoId) {
    if (this.thumbnailExists(videoId)) {
      return `/thumbnails/${videoId}.jpg`;
    }
    return null;
  }

  /**
   * List all cached thumbnails
   */
  listCachedThumbnails() {
    const files = fs.readdirSync(this.thumbnailsDir);
    const jpgFiles = files.filter(file => file.endsWith('.jpg'));
    
    console.log(`📋 Cached thumbnails (${jpgFiles.length}):`);
    jpgFiles.forEach(file => {
      const videoId = file.replace('.jpg', '');
      console.log(`  - ${videoId}: /thumbnails/${file}`);
    });
    
    return jpgFiles;
  }
}

module.exports = ThumbnailManager;

// If run directly
if (require.main === module) {
  const manager = new ThumbnailManager();
  manager.listCachedThumbnails();
}
