
import React, { useState } from 'react';
import { PortfolioItem, ServiceType } from '../types';
import { Instagram, Heart, Layers, Play, AlertCircle } from 'lucide-react';

const portfolioData: PortfolioItem[] = [
  { id: 1, title: "Beach Wedding", category: ServiceType.WEDDING, imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop", width: 'half' },
  { id: 2, title: "Urban Fashion", category: ServiceType.COMMERCIAL, imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop", width: 'half' }, // tall
  { id: 3, title: "Golden Hour Portrait", category: ServiceType.PORTRAIT, imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop", width: 'third' },
  { id: 4, title: "Corporate Event", category: ServiceType.EVENT, imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop", width: 'third' },
  { id: 5, title: "Travel Documentary", category: ServiceType.COMMERCIAL, imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop", width: 'third' },
  { id: 6, title: "Intimate Elopement", category: ServiceType.WEDDING, imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop", width: 'full' },
  { id: 7, title: "Studio Session", category: ServiceType.PORTRAIT, imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop", width: 'half' },
  { id: 8, title: "Product Launch", category: ServiceType.COMMERCIAL, imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop", width: 'half' },
];

// Type definition for the Instagram Post
interface InstagramDisplayPost {
  id: string | number;
  category: string;
  image: string;
  likes: string;
  type: 'image' | 'carousel' | 'video';
  permalink: string;
}

/**
 * MANUAL INSTAGRAM FEED CONFIGURATION
 * 
 * We use the /media/?size=l trick to attempt to get the image.
 * If this fails due to Instagram CORS/Blocking, manual image hosting is required.
 */
const instagramPosts: InstagramDisplayPost[] = [
  { 
    id: 1, 
    category: 'Wedding', 
    // Appending 'media/?size=l' to the post URL attempts to fetch the direct image
    image: 'https://www.instagram.com/p/DN70tX_DWNw/', 
    likes: '2,431', 
    type: 'carousel', 
    permalink: 'https://www.instagram.com/p/DSEh8PQiP1v/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' 
  },
  { 
    id: 2, 
    category: 'Wedding', 
    image: 'https://www.instagram.com/p/DN70QBRjf2o/media/?size=l', 
    likes: '1,856', 
    type: 'carousel', 
    permalink: 'https://www.instagram.com/p/DRednhbjeHo/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' 
  },
  { 
    id: 3, 
    category: 'Wedding', 
    image: 'https://www.instagram.com/p/DRM9b52DSp8/media/?size=l', 
    likes: '1,204', 
    type: 'carousel', 
    permalink: 'https://www.instagram.com/p/DQ3W0cqjYve/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' 
  },
  { 
    id: 4, 
    category: 'Wedding', 
    image: 'https://www.instagram.com/p/DQ3dtTZDegy/media/?size=l', 
    likes: '943', 
    type: 'carousel', 
    permalink: 'https://www.instagram.com/p/DQrMRHajRlJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' 
  },
  { 
    id: 5, 
    category: 'Wedding', 
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400&auto=format&fit=crop', 
    likes: '3,102', 
    type: 'carousel', 
    permalink: 'https://www.instagram.com/p/DQgbMxLjekd/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' 
  },
  { 
    id: 6, 
    category: 'Wedding', 
    image: 'https://images.unsplash.com/photo-1521119989659-a83eee488058?q=80&w=400&auto=format&fit=crop', 
    likes: '1,567', 
    type: 'carousel', 
    permalink: 'https://www.instagram.com/p/DP5erchiJI3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' 
  },
  { 
    id: 7, 
    category: 'Wedding', 
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400&auto=format&fit=crop', 
    likes: '2,090', 
    type: 'carousel', 
    permalink: 'https://www.instagram.com/p/DPYOA0BDcTb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' 
  },
  { 
    id: 8, 
    category: 'Wedding', 
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=400&auto=format&fit=crop', 
    likes: '720', 
    type: 'carousel', 
    permalink: 'https://www.instagram.com/p/DPOG7sQDXAq/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' 
  },
  { 
    id: 9, 
    category: 'Wedding', 
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop', 
    likes: '2,940', 
    type: 'carousel', 
    permalink: 'https://www.instagram.com/p/DOtDHSqDRO4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' 
  },
];

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop";

// Sub-component for handling individual portfolio image loading state
const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setImageLoaded(true);
    console.warn(`[Portfolio Report] Failed to optimize/load image for: ${item.title}`);
  };

  return (
    <figure 
      tabIndex={0}
      className={`relative group overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-red bg-gray-900
        ${item.width === 'full' ? 'md:col-span-6' : ''}
        ${item.width === 'half' ? 'md:col-span-3' : ''}
        ${item.width === 'third' ? 'md:col-span-2' : ''}
        row-span-1 ${item.id === 2 || item.id === 7 ? 'md:row-span-2' : ''}
      `}
    >
      {/* Skeleton / Loading State */}
      <div className={`absolute inset-0 bg-gray-800 animate-pulse transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />
      
      <img 
        src={hasError ? FALLBACK_IMAGE : item.imageUrl} 
        alt={item.title}
        loading="lazy"
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transform transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-90
          ${imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}
        `}
      />
      
      {/* Error Notification for User */}
      {hasError && (
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-red-900/80 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm border border-red-500/50 shadow-lg pointer-events-none">
            <AlertCircle className="w-3 h-3" />
            <span className="uppercase tracking-wider font-bold">Image Error</span>
        </div>
      )}

      <figcaption className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
        <span className="text-brand-gold text-xs uppercase tracking-widest mb-1">{item.category}</span>
        <h3 className="text-white font-serif text-xl italic">{item.title}</h3>
      </figcaption>
    </figure>
  );
};

// Sub-component for handling individual Instagram image loading state
const InstagramCard: React.FC<{ post: InstagramDisplayPost }> = ({ post }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Fallback if Instagram blocks the image request
  const handleError = () => {
    setHasError(true);
    setImageLoaded(true);
    console.warn(`[Instagram Report] Failed to load media for post ID: ${post.id}. Using fallback.`);
  };

  const displayImage = hasError ? FALLBACK_IMAGE : post.image;

  return (
    <a 
      href={post.permalink}
      target="_blank" 
      rel="noopener noreferrer"
      className="block"
    >
      <figure 
        tabIndex={0}
        className="relative group overflow-hidden aspect-square cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-red bg-gray-900"
      >
        {/* Skeleton / Loading State */}
        <div className={`absolute inset-0 bg-gray-800 animate-pulse transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />

        <img 
          src={displayImage} 
          alt={`Instagram post showing ${post.category}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={handleError}
          className={`w-full h-full object-cover transform transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-90
            ${imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}
          `}
        />

        {/* Type Indicator (Carousel / Video) */}
        {post.type === 'carousel' && (
          <div className="absolute top-2 right-2 z-10">
            <Layers className="w-4 h-4 text-white drop-shadow-md" strokeWidth={2.5} />
          </div>
        )}
        {post.type === 'video' && (
          <div className="absolute top-2 right-2 z-10">
            <Play className="w-4 h-4 text-white drop-shadow-md fill-white" />
          </div>
        )}

        {/* Error Notification for User (only if fallback active) */}
        {hasError && (
            <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded backdrop-blur-sm pointer-events-none">
                <AlertCircle className="w-3 h-3 text-brand-red" />
                <span className="opacity-80">Preview Unavailable</span>
            </div>
        )}

        {/* Overlay */}
        <figcaption className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
          <div className="flex items-center text-white gap-2">
            <Heart className="w-6 h-6 fill-white text-white" />
            {post.likes && <span className="font-bold text-sm">{post.likes}</span>}
            <span className="sr-only">View on Instagram</span>
          </div>
        </figcaption>
      </figure>
    </a>
  );
};

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeInstaFilter, setActiveInstaFilter] = useState<string>('All');

  const filteredItems = activeFilter === 'All' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeFilter);

  // Dynamic generation of Instagram categories based on posts
  const instaCategories = ['All', ...Array.from(new Set(instagramPosts.map(post => post.category)))];

  const filteredInstaPosts = activeInstaFilter === 'All'
    ? instagramPosts
    : instagramPosts.filter(post => post.category === activeInstaFilter);

  return (
    <section id="portfolio" className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-brand-gold uppercase tracking-[0.2em] text-xs font-bold">Selected Works</span>
          <h2 className="text-3xl md:text-4xl font-serif text-brand-cream mt-2">Our Visual Journey</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {['All', ...Object.values(ServiceType)].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-sm uppercase tracking-widest pb-1 transition-all duration-300 border-b-2 ${
                activeFilter === filter 
                  ? 'text-brand-red border-brand-red' 
                  : 'text-gray-400 border-transparent hover:text-brand-cream'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[300px] mb-24">
          {filteredItems.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>

        {/* Instagram Section */}
        <div className="border-t border-gray-800 pt-16">
          <div className="flex flex-col items-center mb-10">
            <a href="https://www.instagram.com/studioroutes/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-brand-gold mb-2 hover:text-brand-cream transition-colors group">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="uppercase tracking-widest text-xs font-bold">@studioroutes</span>
            </a>
            <h3 className="text-2xl font-serif text-brand-cream">Latest Moments</h3>
          </div>

          {/* Insta Filters */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {instaCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveInstaFilter(cat)}
                className={`text-xs px-3 py-1 rounded-full border transition-all duration-300 uppercase tracking-wider ${
                  activeInstaFilter === cat
                    ? 'bg-brand-red border-brand-red text-white'
                    : 'border-gray-700 text-gray-500 hover:border-brand-gold hover:text-brand-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Insta Grid - 3 Columns for Authentic Feed Look */}
          <div key={activeInstaFilter} className="grid grid-cols-3 gap-0.5 md:gap-1 max-w-4xl mx-auto animate-fade-in">
            {filteredInstaPosts.map((post) => (
              <InstagramCard key={post.id} post={post} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
