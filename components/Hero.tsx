import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop",
    alt: "Elegant Wedding",
    style: "Wedding"
  },
  {
    url: "https://images.unsplash.com/photo-1609010697446-11f2155278f0?q=80&w=2070&auto=format&fit=crop",
    alt: "Studio Portrait",
    style: "Portrait"
  },
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    alt: "Cinematic Landscape",
    style: "Travel"
  },
  {
    url: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?q=80&w=1887&auto=format&fit=crop",
    alt: "Fashion & Lifestyle",
    style: "Commercial"
  }
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Slower rotation (6 seconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-brand-dark">
      {/* Background Carousel */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-[2500ms] ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow" // Slight scale for cinematic feel
          />
        </div>
      ))}

      {/* Static Overlay for Readability - Adjusted for better contrast */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/60 to-brand-dark/95 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-brand-gold uppercase tracking-[0.5em] text-sm md:text-base mb-4 animate-slide-up font-sans font-medium">
          Photography & Videography
        </h2>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-brand-cream mb-6 animate-slide-up leading-tight drop-shadow-2xl">
          Capturing Your <br />
          <span className="italic text-brand-gold">Journey</span>
        </h1>
        <p className="text-gray-100 font-light text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-slide-up opacity-95 drop-shadow-md tracking-wide">
          From the first step to the finest detail. We tell your story through cinematic lens and creative vision.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up mb-6">
          <a 
            href="#portfolio"
            className="px-8 py-3 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 uppercase text-sm tracking-widest font-medium backdrop-blur-sm"
          >
            View Portfolio
          </a>
          <a 
            href="#contact"
            className="px-8 py-3 bg-brand-cream text-brand-dark hover:bg-white transition-all duration-300 uppercase text-sm tracking-widest font-medium"
          >
            Contact Us
          </a>
        </div>

        <div className="animate-slide-up mt-2">
          <a 
            href="#contact"
            className="inline-block px-12 py-4 bg-brand-red text-white font-bold text-lg uppercase tracking-[0.25em] hover:bg-red-900 hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(139,0,0,0.4)] hover:shadow-[0_0_35px_rgba(139,0,0,0.6)]"
          >
            Book Now
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-brand-gold/50 z-20">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;