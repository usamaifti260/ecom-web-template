import { useState } from 'react';
import Image from 'next/image';
import { isYouTubeVideo, getYouTubeVideoId, getYouTubeThumbnail, getYouTubeEmbedUrl, isYouTubeShort } from '@/lib/mediaUtils';

const MediaViewer = ({ 
  url, 
  alt, 
  index, 
  productName,
  className = "",
  aspectRatio = "square", // "square" | "video" | "auto"
  showPlayButton = true,
  autoPlay = false,
  onClick = null,
  priority = false,
  ...props 
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(autoPlay);
  const [videoError, setVideoError] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [currentThumbnailQuality, setCurrentThumbnailQuality] = useState('maxresdefault');
  
  const isVideo = isYouTubeVideo(url);
  
  // Get aspect ratio classes
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case 'video': return 'aspect-video';
      case 'auto': return '';
      default: return 'aspect-square';
    }
  };

  // Handle video play
  const handleVideoPlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Playing video:', url);
    setIsVideoPlaying(true);
  };

  // Handle video error
  const handleVideoError = () => {
    setVideoError(true);
  };

  // Handle thumbnail error with fallback qualities
  const handleThumbnailError = () => {
    const qualities = ['maxresdefault', 'hqdefault', 'mqdefault', 'default'];
    const currentIndex = qualities.indexOf(currentThumbnailQuality);
    
    if (currentIndex < qualities.length - 1) {
      // Try next quality
      setCurrentThumbnailQuality(qualities[currentIndex + 1]);
    } else {
      // All qualities failed
      setThumbnailError(true);
    }
  };

  if (isVideo) {
    const videoId = getYouTubeVideoId(url);
    const isShort = isYouTubeShort(url);
    
    // Use current thumbnail quality, defaulting based on video type
    const getInitialQuality = () => {
      return isShort ? 'maxresdefault' : 'hqdefault';
    };
    
    // Reset thumbnail error and quality when URL changes
    if (currentThumbnailQuality === 'maxresdefault' && !isShort) {
      setCurrentThumbnailQuality('hqdefault');
    }
    
    const thumbnailUrl = getYouTubeThumbnail(videoId, currentThumbnailQuality);
    const embedUrl = getYouTubeEmbedUrl(videoId, {
      autoplay: isVideoPlaying ? 1 : 0,
      controls: 1,
      modestbranding: 1,
      rel: 0
    });

    if (!videoId || (videoError && thumbnailError)) {
      // Fallback for invalid video or complete thumbnail failure
      return (
        <div className={`${getAspectRatioClass()} bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
          <div className="text-center p-4">
            <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-gray-500">{isShort ? 'YouTube Short unavailable' : 'Video unavailable'}</p>
          </div>
        </div>
      );
    }

         return (
       <div 
         className={`${getAspectRatioClass()} bg-gray-100 rounded-lg overflow-hidden relative group cursor-pointer ${className}`}
         onClick={!isVideoPlaying ? handleVideoPlay : onClick}
         {...props}
       >
         {!isVideoPlaying ? (
           // Video Thumbnail with Play Button
           <>
             <div
               className="absolute inset-0 cursor-pointer"
               onClick={handleVideoPlay}
               title="Click to play video"
             >
                               <Image
                  src={thumbnailUrl}
                  alt={alt || `${productName} - ${isShort ? 'YouTube Short' : 'Video'} ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={priority}
                  onError={handleThumbnailError}
                />
             </div>
             
                           {/* Video Duration Badge (optional) */}
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
                {isShort ? 'Short' : 'Video'}
              </div>
             
             {/* Hover Overlay */}
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
             
             {/* Play Button Overlay */}
             {showPlayButton && (
               <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                 <div className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg pointer-events-none">
                   <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M8 5v14l11-7z"/>
                   </svg>
                 </div>
               </div>
             )}
           </>
         ) : (
          // YouTube Embed
          <iframe
            src={embedUrl}
            title={alt || `${productName} - Video ${index + 1}`}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={handleVideoError}
          />
        )}
      </div>
    );
  }

  // Regular Image
  return (
    <div 
      className={`${getAspectRatioClass()} bg-gray-100 rounded-lg overflow-hidden relative group cursor-pointer ${className}`}
      onClick={onClick}
      {...props}
    >
      <Image
        src={url}
        alt={alt || `${productName} - Image ${index + 1}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority={priority}
        onError={(e) => {
          // Fallback for broken images - just hide the image
          console.warn('Failed to load image:', url);
        }}
      />
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
    </div>
  );
};

export default MediaViewer; 