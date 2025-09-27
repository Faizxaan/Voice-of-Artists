const https = require('https');
const fs = require('fs');
const path = require('path');

// Extract video IDs from the terminal logs
const videoIds = [
  'CwmMs5GdtAM', 'g4egHJK53iQ', 'AaLkO_x1f_0', '7aqmAPJk4LE', 'IbM9r21Uejc',
  'aluiGvpVwzA', 'ppSGeRHvGEk', 'BOVYv0SAKgE', 'zK5efA-Qnxs', 'qtV13Kn3hAM',
  'BPsA0rSZqhw', 'A8o75XkEKcU', 'XuvwybcizXw', 'xq9ldzGN7q0', 'NVcDU76XuQA',
  '-p9nVdBmdAY', '2FxuPe4BZvc', '_Wi_D3jUrqg', 'dX0FyLkdPss', 'RdYh_JEVD7c',
  'rlbHXIi74mc', 'xQ5nM1JNp-U', 'VuX4AAnOQ0Q', '0o3zn4WsjTw', 'W0HqckkVNx0',
  'KVOGFjpv3OY', '70MCwRfIyqQ', 'nn5jim6e1bE', 'tkVoLeCEvP0', 'OeayVMw-R9A',
  'GESK-djAQHY', 'svBLVafaZwk', '0fqhWkeaTWg', 'ONA-Qcx_weI', 'bS5d67lePSw',
  '8QntHghyidw', '4-gS7LDWW0Y', 'qWKgwxtbAwo', 'mUA33yYZJEU', 'ZRQAIoZ8lJs',
  'cSgPr0_rfoM', 'yFltWfTfKfg', 'yhqNprfYCrs', 'J8v_RUc7NWw', '0MHnZEBEbXo',
  '44T7gvWpCL4', 'lO8PczIo9jg', 'fox-RAfNjUE', 'AaT0YcIfomA', 'k0W64RDT1VU'
];

// Create thumbnails directory if it doesn't exist
const thumbnailsDir = path.join(__dirname, 'public', 'thumbnails');
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

console.log(`🚀 Starting download of ${videoIds.length} YouTube thumbnails...`);

// Function to download a single thumbnail
function downloadThumbnail(videoId, quality = 'hqdefault') {
  return new Promise((resolve, reject) => {
    const url = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    const filePath = path.join(thumbnailsDir, `${videoId}.jpg`);
    
    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping existing: ${videoId}.jpg`);
      resolve(filePath);
      return;
    }
    
    console.log(`📥 Downloading: ${videoId} from ${url}`);
    
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
        reject(new Error(`HTTP ${response.statusCode} for ${videoId}`));
      }
    }).on('error', (error) => {
      console.error(`❌ Error downloading ${videoId}:`, error.message);
      fs.unlink(filePath, () => {}); // Delete empty file
      reject(error);
    });
  });
}

// Download all thumbnails with rate limiting
async function downloadAllThumbnails() {
  let successful = 0;
  let failed = 0;
  let skipped = 0;
  
  for (let i = 0; i < videoIds.length; i++) {
    const videoId = videoIds[i];
    
    try {
      const filePath = path.join(thumbnailsDir, `${videoId}.jpg`);
      if (fs.existsSync(filePath)) {
        skipped++;
        console.log(`⏭️  Skipping existing: ${videoId}.jpg`);
      } else {
        await downloadThumbnail(videoId);
        successful++;
      }
      
      // Small delay between downloads to be nice to YouTube's servers
      if (i < videoIds.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
    } catch (error) {
      console.error(`Failed to download thumbnail for ${videoId}:`, error.message);
      failed++;
    }
    
    // Progress update every 10 downloads
    if ((i + 1) % 10 === 0 || i === videoIds.length - 1) {
      console.log(`📊 Progress: ${i + 1}/${videoIds.length} processed`);
    }
  }
  
  console.log('\n🎉 Thumbnail download complete!');
  console.log(`📂 Files saved to: ${thumbnailsDir}`);
  console.log(`📋 Summary:`);
  console.log(`  ✅ Successfully downloaded: ${successful}`);
  console.log(`  ⏭️  Already existed: ${skipped}`);
  console.log(`  ❌ Failed: ${failed}`);
  
  // List all files in directory
  const allFiles = fs.readdirSync(thumbnailsDir);
  console.log(`\n📁 Total thumbnails in directory: ${allFiles.length}`);
}

downloadAllThumbnails().catch(console.error);
