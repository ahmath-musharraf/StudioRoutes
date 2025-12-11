import React, { useState } from 'react';
import { Play, Film, Clock, Facebook, Youtube, Instagram } from 'lucide-react';

interface VideoProject {
  id: number;
  type: 'youtube' | 'facebook' | 'instagram';
  url: string; // YouTube ID, Facebook URL, or Instagram ID
  title: string;
  category: string;
  duration: string;
  thumbnail?: string;
}

const videos: VideoProject[] = [
    {
    id: 1,
    type: 'facebook',
    url: "https://www.facebook.com/share/p/1Acx3Hp3tG/",
    title: "Sattar Elite Wedding Hall & Rooms",
    category: "Promation Shoot",
    duration: "Watch",
  },
  {
    id: 102,
    type: 'instagram',
    url: "DOxsFmKjRKM", 
    title: "Collaboration Series II",
    category: "Reel",
    duration: "Watch"
  },
  {
    id: 103,
    type: 'instagram',
    url: "DOi5lgmj8GO", 
    title: "Collaboration Series III",
    category: "Reel",
    duration: "Watch"
  },
  {
    id: 3,
    type: 'youtube',
    url: "ysz5S6P_cNY", 
    title: "Cinematic Wedding",
    category: "Wedding Film",
    duration: "4:12"
  },
  {
    id: 2,
    type: 'facebook',
    url: "https://www.facebook.com/share/v/1HFvERAT5m/",
    title: "Studio Routes Highlight",
    category: "Featured Film",
    duration: "Watch",
    thumbnail: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    type: 'youtube',
    url: "LXb3EKWsInQ", 
    title: "Island of Serenity",
    category: "Travel Documentary",
    duration: "3:45"
  },
  {
    id: 104,
    type: 'instagram',
    url: "DPazprkDZB_", 
    title: "Collaboration Series IV",
    category: "Reel",
    duration: "Watch"
  },
];

// Reusable Logo Placeholder Component to match branding
const LogoPlaceholder: React.FC<{ small?: boolean }> = ({ small }) => (
  <div className="w-full h-full bg-zinc-900 flex items-center justify-center border border-zinc-800 relative overflow-hidden group-hover:bg-zinc-800 transition-colors">
    {/* 
        Replaced text format with Image Logo.
        Ensure you have a 'logo.png' file in your public folder. 
        If not, the alt text will show or it will be empty.
    */}
    <img 
      src="https://raw.githubusercontent.com/ahmath-musharraf/StudioRoutes/refs/heads/main/StudioRoutesLogo.png" 
      alt="Studio Routes Logo"
      className={`${small ? 'w-8 h-8' : 'w-24 h-24'} object-contain opacity-90 drop-shadow-lg`}
      onError={(e) => {
        // Simple fallback if logo.png is missing to avoid broken image icon
        e.currentTarget.style.display = 'none';
        e.currentTarget.parentElement?.classList.add('after:content-["Studio_Routes"]', 'after:text-gray-500', 'after:text-xs');
      }} 
    />
  </div>
);

const VideoShowcase: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoProject>(videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Cache for resolved thumbnail URLs and retry state
  // Key: video.id, Value: { url: string | null (null indicates final failure -> use logo), retryCount: number }
  const [thumbnailCache, setThumbnailCache] = useState<Record<number, { url: string | null; retryCount: number }>>({});

  const getVideoSrc = (video: VideoProject) => {
    if (video.type === 'youtube') {
        // playsinline=1 prevents iOS from opening the native full-screen player automatically
        return `https://www.youtube.com/embed/${video.url}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    }
    if (video.type === 'facebook') {
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url)}&show_text=false&t=0&autoplay=1`;
    }
    if (video.type === 'instagram') {
        return `https://www.instagram.com/reel/${video.url}/embed/`;
    }
    return '';
  };

  // Determine the best URL to use based on cache state or initial priority
  const getOptimizedThumbnail = (video: VideoProject): string | null => {
    // 1. Check Cache
    if (thumbnailCache && video.id in thumbnailCache) {
        return thumbnailCache[video.id].url;
    }

    // 2. Initial Strategy (Highest Quality)
    if (video.thumbnail) return video.thumbnail;
    
    if (video.type === 'youtube') {
      // Prioritize Max Resolution
      return `https://img.youtube.com/vi/${video.url}/maxresdefault.jpg`;
    }
    if (video.type === 'instagram') {
      return `https://www.instagram.com/p/${video.url}/media/?size=l`;
    }
    
    return null; // Fallback to logo immediately if type unknown
  };

  // Handle fallback logic when an image fails to load
  const handleImageError = (video: VideoProject) => {
    setThumbnailCache(prev => {
        const currentRetry = prev[video.id]?.retryCount ?? 0;
        
        // Strategy for YouTube: maxresdefault (init) -> hqdefault (retry 1) -> Logo (retry 2)
        if (video.type === 'youtube' && !video.thumbnail) {
            if (currentRetry === 0) {
                 return {
                     ...prev,
                     [video.id]: { 
                         url: `https://img.youtube.com/vi/${video.url}/hqdefault.jpg`,
                         retryCount: 1 
                     }
                 };
            }
        }

        // Default / Final Fallback: Mark as failed (null url) so LogoPlaceholder renders
        return {
            ...prev,
            [video.id]: { url: null, retryCount: currentRetry + 1 }
        };
    });
  };

  const getPlatformIcon = (type: string, className: string = "w-3 h-3 text-brand-gold") => {
    switch (type) {
        case 'youtube': return <Youtube className={className} />;
        case 'facebook': return <Facebook className={className} />;
        case 'instagram': return <Instagram className={className} />;
        default: return <Film className={className} />;
    }
  };

  const isVertical = activeVideo.type === 'instagram';
  const activeThumbUrl = getOptimizedThumbnail(activeVideo);

  return (
    <section id="films" className="py-24 bg-brand-dark border-t border-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-brand-gold uppercase tracking-[0.2em] text-xs font-bold flex items-center justify-center gap-2">
            <Film className="w-4 h-4" />
            Motion Pictures
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-cream mt-4">Cinematic Stories</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Player (Theater Mode) */}
          <div className="lg:col-span-2 flex items-start justify-center bg-black/20 rounded-lg p-2 min-h-[300px] transition-all duration-300">
            <div className={`relative w-full bg-black shadow-2xl border border-gray-800 rounded-sm overflow-hidden group transition-all duration-500 ease-in-out ${
              isVertical ? 'aspect-[9/16] max-w-sm' : 'aspect-video'
            }`}>
              {isPlaying ? (
                <iframe
                  src={getVideoSrc(activeVideo)}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              ) : (
                // Thumbnail Overlay (Before Play)
                <div 
                  className="absolute inset-0 cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                >
                  {!activeThumbUrl ? (
                    <LogoPlaceholder />
                  ) : (
                    <img 
                      src={activeThumbUrl} 
                      alt={activeVideo.title} 
                      onError={() => handleImageError(activeVideo)}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                    />
                  )}
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                    <div className="w-20 h-20 bg-brand-red/90 rounded-full flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(139,0,0,0.5)] group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                    <h3 className="text-white font-serif text-2xl mt-6 tracking-wide drop-shadow-lg text-center px-4">{activeVideo.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                        {getPlatformIcon(activeVideo.type)}
                        <p className="text-brand-gold uppercase text-xs tracking-widest">{activeVideo.category}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Playlist (Side Bar) */}
          <div className="lg:col-span-1 flex flex-col gap-4 h-full overflow-y-auto max-h-[500px] lg:max-h-[700px] pr-2 scrollbar-hide">
            <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-2 sticky top-0 bg-brand-dark z-10 py-2 border-b border-gray-800">
              Now Screening
            </h3>
            
            {videos.map((video) => {
               const vidThumbUrl = getOptimizedThumbnail(video);
               return (
              <div 
                key={video.id}
                onClick={() => {
                  setActiveVideo(video);
                  setIsPlaying(true);
                }}
                className={`flex gap-4 p-3 rounded-md cursor-pointer transition-all duration-300 border ${
                  activeVideo.id === video.id 
                    ? 'bg-gray-900 border-brand-red' 
                    : 'bg-transparent border-transparent hover:bg-gray-900/50 hover:border-gray-800'
                }`}
              >
                {/* Small Thumbnail */}
                <div className="relative w-24 h-16 flex-shrink-0 bg-black overflow-hidden rounded-sm group">
                   {!vidThumbUrl ? (
                     <LogoPlaceholder small />
                   ) : (
                    <img 
                      src={vidThumbUrl} 
                      alt={video.title}
                      onError={() => handleImageError(video)}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                   )}
                  
                  {/* Platform Icon Badge */}
                  <div className="absolute bottom-1 right-1 bg-black/70 p-0.5 rounded z-10">
                     {getPlatformIcon(video.type, "w-3 h-3 text-white")}
                  </div>

                  {activeVideo.id === video.id && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse ml-1 delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse ml-1 delay-150"></div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center">
                  <h4 className={`text-sm font-medium transition-colors line-clamp-1 ${activeVideo.id === video.id ? 'text-brand-cream' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    {video.title}
                  </h4>
                  <span className="text-[10px] text-brand-gold uppercase tracking-wider mt-1">{video.category}</span>
                  <div className="flex items-center gap-1 mt-1 text-gray-600 text-[10px]">
                    <Clock className="w-3 h-3" />
                    <span>{video.duration}</span>
                  </div>
                </div>
              </div>
            );})}
          </div>

        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
