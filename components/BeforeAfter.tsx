import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal, Wand2 } from 'lucide-react';

const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      setSliderPosition(percent);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  const handleInteractionStart = () => setIsDragging(true);
  
  // Global event listeners for drag release outside component
  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  // Robust width calculation to prevent image squashing
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setImageWidth(containerRef.current.offsetWidth);
      }
    };

    // Initial calculation
    updateWidth();

    // Observe changes (responsive support)
    const observer = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-black relative overflow-hidden border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-brand-gold uppercase tracking-[0.2em] text-xs font-bold flex items-center justify-center gap-2">
            <Wand2 className="w-4 h-4" />
            Post-Production
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-brand-cream mt-4">The Magic of the Edit</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto font-light">
            We don't just capture moments; we polish them. Drag the slider to see how we transform raw footage into cinematic masterpieces through color grading and retouching.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative shadow-2xl border-4 border-gray-900 rounded-sm overflow-hidden">
          
          {/* Container */}
          <div 
            ref={containerRef}
            className="relative w-full h-[400px] md:h-[600px] cursor-ew-resize select-none group bg-gray-900"
            onMouseDown={handleInteractionStart}
            onTouchStart={handleInteractionStart}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* AFTER Image (Background - The Final Result) */}
            <div className="absolute inset-0">
              <img 
                src="https://raw.githubusercontent.com/ahmath-musharraf/StudioRoutes/refs/heads/main/RoutesImage/after.jpg" 
                alt="Color Graded Final" 
                className="w-full h-full object-cover"
                draggable={false}
              />
              <span className="absolute top-4 right-4 bg-brand-gold text-brand-dark px-3 py-1 text-xs font-bold uppercase tracking-widest rounded z-10 pointer-events-none">
                Final Edit
              </span>
            </div>

            {/* BEFORE Image (Foreground - Clipped) */}
            <div 
              className="absolute inset-0 overflow-hidden border-r-2 border-brand-red"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src="https://raw.githubusercontent.com/ahmath-musharraf/StudioRoutes/refs/heads/main/RoutesImage/Before.png" 
                alt="Raw Footage" 
                className="h-full object-cover max-w-none"
                // Force width to match the container, preventing squashing
                style={{ 
                   width: imageWidth ? `${imageWidth}px` : '100vw',
                   filter: 'grayscale(60%) contrast(85%) brightness(90%) sepia(20%) saturate(50%)' 
                }}
                draggable={false}
              />
              <span className="absolute top-4 left-4 bg-gray-800 text-gray-400 px-3 py-1 text-xs font-bold uppercase tracking-widest rounded border border-gray-600 z-10 pointer-events-none">
                Raw / LOG
              </span>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-transparent cursor-ew-resize z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-brand-red rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] border-2 border-white hover:scale-110 transition-transform">
                <MoveHorizontal className="w-5 h-5 text-white" />
              </div>
            </div>
            
            {/* Hint overlay that disappears on interaction */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest pointer-events-none transition-opacity duration-500 ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
                Drag to Compare
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
