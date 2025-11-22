import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah & James",
    role: "Wedding",
    image: "https://picsum.photos/id/1027/150/150",
    quote: "The team at Studio Routes didn't just take photos; they captured the very soul of our wedding day. Every time we look at our album, we relive those emotions."
  },
  {
    id: 2,
    name: "Elena M.",
    role: "Fashion Brand",
    image: "https://picsum.photos/id/338/150/150",
    quote: "Creativity, professionalism, and speed. They understood our brand vision immediately and elevated it with their cinematic approach. Highly recommended."
  },
  {
    id: 3,
    name: "Michael T.",
    role: "Portrait",
    image: "https://picsum.photos/id/1012/150/150",
    quote: "I usually hate being in front of a camera, but the session was so relaxed and fun. The results were beyond anything I expected."
  },
  {
    id: 4,
    name: "David & Chloe",
    role: "Destination Wedding",
    image: "https://picsum.photos/id/1011/150/150",
    quote: "Traveling to Italy with Studio Routes was the best decision. They handled everything perfectly and the film looks like a Hollywood movie."
  },
  {
    id: 5,
    name: "Priyanka S.",
    role: "Corporate Headshots",
    image: "https://picsum.photos/id/64/150/150",
    quote: "Professional, efficient, and they made our entire team look approachable yet authoritative. The lighting work was exceptional."
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="py-24 bg-brand-dark relative overflow-hidden border-t border-gray-900">
       {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" 
            alt="Wedding Atmosphere" 
            className="w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-dark"></div>
      </div>

       {/* Decorative Blurs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-gold uppercase tracking-[0.2em] text-xs font-bold">Client Love</span>
          <h2 className="text-3xl md:text-4xl font-serif text-brand-cream mt-2">Stories from Our Journey</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Controls - Absolute Center Y */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-24 z-20 p-3 rounded-full border border-gray-700 text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-all duration-300 focus:outline-none hover:scale-105 bg-brand-dark/50 backdrop-blur-md"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-24 z-20 p-3 rounded-full border border-gray-700 text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-all duration-300 focus:outline-none hover:scale-105 bg-brand-dark/50 backdrop-blur-md"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Track */}
          <div className="relative min-h-[420px] md:min-h-[350px]">
            {testimonials.map((item, index) => (
              <div 
                key={item.id} 
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out transform 
                  ${index === currentIndex 
                    ? 'opacity-100 translate-y-0 pointer-events-auto scale-100 blur-0' 
                    : 'opacity-0 translate-y-8 pointer-events-none scale-95 blur-sm'
                  }`}
              >
                <div className={`bg-white/5 p-8 md:p-12 border border-white/10 relative text-center max-w-2xl mx-auto backdrop-blur-md shadow-2xl rounded-sm ${index === currentIndex ? 'animate-fade-in' : ''}`}>
                  <Quote className="w-8 h-8 text-brand-red mx-auto mb-6 opacity-80" />
                  
                  <div className="flex justify-center gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>

                  <p className="text-gray-200 font-serif text-lg md:text-2xl italic mb-8 leading-relaxed tracking-wide">
                    "{item.quote}"
                  </p>
                  
                  <div className="flex flex-col items-center justify-center border-t border-white/10 pt-6 w-full">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-brand-dark ring-2 ring-brand-red mb-3 shadow-lg"
                    />
                    <h4 className="text-brand-cream font-serif text-xl tracking-wide">{item.name}</h4>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mt-1 font-medium">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-3 mt-6 md:mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                  index === currentIndex ? 'bg-brand-red w-12' : 'bg-gray-700 w-3 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;