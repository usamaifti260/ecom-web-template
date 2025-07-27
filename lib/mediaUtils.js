// Media Utilities for handling images and YouTube videos in gallery

/**
 * Check if a URL is a YouTube video
 * @param {string} url - The URL to check
 * @returns {boolean} - True if it's a YouTube URL
 */
export const isYouTubeVideo = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  const youtubePatterns = [
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /^https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/,
    /^https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
    /^https?:\/\/(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/
  ];
  
  return youtubePatterns.some(pattern => pattern.test(url));
};

/**
 * Extract YouTube video ID from various YouTube URL formats
 * @param {string} url - YouTube URL
 * @returns {string|null} - Video ID or null if not found
 */
export const getYouTubeVideoId = (url) => {
  if (!url || typeof url !== 'string') return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]+)/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

/**
 * Check if a URL is a YouTube Short
 * @param {string} url - The URL to check
 * @returns {boolean} - True if it's a YouTube Short URL
 */
export const isYouTubeShort = (url) => {
  if (!url || typeof url !== 'string') return false;
  return /^https?:\/\/(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/.test(url);
};

/**
 * Get YouTube thumbnail URL
 * @param {string} videoId - YouTube video ID
 * @param {string} quality - Thumbnail quality (default, mqdefault, hqdefault, sddefault, maxresdefault)
 * @returns {string} - Thumbnail URL
 */
export const getYouTubeThumbnail = (videoId, quality = 'hqdefault') => {
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

/**
 * Get YouTube embed URL
 * @param {string} videoId - YouTube video ID
 * @param {object} options - Embed options
 * @returns {string} - Embed URL
 */
export const getYouTubeEmbedUrl = (videoId, options = {}) => {
  if (!videoId) return '';
  
  const {
    autoplay = 0,
    controls = 1,
    modestbranding = 1,
    rel = 0,
    showinfo = 0
  } = options;
  
  const params = new URLSearchParams({
    autoplay: autoplay.toString(),
    controls: controls.toString(),
    modestbranding: modestbranding.toString(),
    rel: rel.toString(),
    showinfo: showinfo.toString()
  });
  
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

/**
 * Check if media item is an image
 * @param {string} url - The URL to check
 * @returns {boolean} - True if it's an image
 */
export const isImage = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  // Check for image file extensions
  const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i;
  if (imageExtensions.test(url)) return true;
  
  // Check for image hosting services patterns
  const imageHostingPatterns = [
    /unsplash\.com/,
    /pexels\.com/,
    /pixabay\.com/,
    /images\.unsplash\.com/,
    /cdn\.shop/,
    /shopify\.com.*\.(jpg|jpeg|png|gif|webp)/i
  ];
  
  return imageHostingPatterns.some(pattern => pattern.test(url));
};

/**
 * Get media type for gallery item
 * @param {string} url - Media URL
 * @returns {string} - 'youtube' | 'image' | 'unknown'
 */
export const getMediaType = (url) => {
  if (isYouTubeVideo(url)) return 'youtube';
  if (isImage(url)) return 'image';
  return 'unknown';
};

/**
 * Process gallery array to add media type information
 * @param {Array<string>} gallery - Array of media URLs
 * @returns {Array<object>} - Array of media objects with type and metadata
 */
export const processGalleryItems = (gallery) => {
  if (!Array.isArray(gallery)) return [];
  
  return gallery.map((url, index) => {
    const mediaType = getMediaType(url);
    const item = {
      id: index,
      url,
      type: mediaType,
      isYouTube: mediaType === 'youtube',
      isImage: mediaType === 'image'
    };
    
    // Add YouTube-specific data
    if (mediaType === 'youtube') {
      const videoId = getYouTubeVideoId(url);
      const isShort = isYouTubeShort(url);
      item.videoId = videoId;
      item.isYouTubeShort = isShort;
      item.thumbnail = getYouTubeThumbnail(videoId);
      item.embedUrl = getYouTubeEmbedUrl(videoId);
    }
    
    return item;
  });
}; 