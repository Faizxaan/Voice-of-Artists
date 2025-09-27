const https = require('https');
const fs = require('fs');
const path = require('path');

// Video IDs from our fallback episodes
const videoIds = [
  'dQw4w9WgXcQ', // Rick Roll
  'jNQXAC9IVRw', // Me at the zoo
  '9bZkp7q19f0', // Gangnam Style
  'kJQP7kiw5Fk', // Despacito
  'L_jWHffIx5E'  // Smosh
];

// Create thumbnails directory if it doesn't exist
const thumbnailsDir = path.join(__dirname, 'public', 'thumbnails');
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

console.log('🚀 Starting thumbnail download...');

// Function to download a single thumbnail
function downloadThumbnail(videoId, quality = 'hqdefault') {
  return new Promise((resolve, reject) => {
    const url = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    const filePath = path.join(thumbnailsDir, `${videoId}.jpg`);
    
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

// Download all thumbnails
async function downloadAllThumbnails() {
  for (const videoId of videoIds) {
    try {
      await downloadThumbnail(videoId);
      // Small delay between downloads to be nice to YouTube's servers
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to download thumbnail for ${videoId}:`, error.message);
    }
  }
  
  console.log('🎉 Thumbnail download complete!');
  console.log('📂 Files saved to:', thumbnailsDir);
  
  // List downloaded files
  const files = fs.readdirSync(thumbnailsDir);
  console.log('📋 Downloaded files:', files);
}

downloadAllThumbnails();
