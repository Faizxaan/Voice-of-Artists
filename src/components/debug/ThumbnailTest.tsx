import React, { useState } from 'react';

interface ThumbnailTestProps {
  videoId: string;
  title: string;
}

export const ThumbnailTest: React.FC<ThumbnailTestProps> = ({ videoId, title }) => {
  const [imageError, setImageError] = useState(false);
  const [loadStatus, setLoadStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  
  const localImageUrl = `/thumbnails/${videoId}.jpg`;
  const youtubeUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  
  console.log('🧪 ThumbnailTest:', { videoId, localImageUrl, youtubeUrl, imageError, loadStatus });
  
  return (
    <div className="border-2 border-blue-500 p-4 m-2">
      <h3 className="font-mono text-sm mb-2">🧪 Test: {title}</h3>
      <div className="text-xs font-mono mb-2">
        VideoID: {videoId} | Status: {loadStatus} | Error: {imageError.toString()}
      </div>
      
      {/* Method 1: Direct img tag */}
      <div className="mb-4">
        <div className="font-mono text-xs mb-1">Method 1: Direct &lt;img&gt; tag</div>
        <div className="relative aspect-video w-48 border border-gray-300">
          <img
            src={imageError ? youtubeUrl : localImageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onLoad={() => {
              console.log('✅ Direct img loaded:', imageError ? youtubeUrl : localImageUrl);
              setLoadStatus('loaded');
            }}
            onError={() => {
              console.error('❌ Direct img failed:', imageError ? youtubeUrl : localImageUrl);
              if (!imageError) {
                console.log('🔄 Switching to YouTube fallback');
                setImageError(true);
                setLoadStatus('loading');
              } else {
                setLoadStatus('error');
              }
            }}
          />
        </div>
      </div>
      
      {/* Method 2: Background image */}
      <div className="mb-4">
        <div className="font-mono text-xs mb-1">Method 2: Background image</div>
        <div 
          className="aspect-video w-48 border border-gray-300 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${imageError ? youtubeUrl : localImageUrl}')`
          }}
        />
      </div>
      
      {/* Method 3: Next.js Image (if available) */}
      <div className="mb-4">
        <div className="font-mono text-xs mb-1">Method 3: Fallback test</div>
        <div className="aspect-video w-48 border border-gray-300 bg-red-100 flex items-center justify-center">
          <div className="text-center text-xs font-mono">
            {loadStatus === 'loaded' ? '✅ SUCCESS' : loadStatus === 'error' ? '❌ FAILED' : '⏳ LOADING'}
          </div>
        </div>
      </div>
      
      {/* Raw URLs for debugging */}
      <div className="text-xs font-mono text-gray-600">
        <div>Local: {localImageUrl}</div>
        <div>YouTube: {youtubeUrl}</div>
      </div>
    </div>
  );
};
