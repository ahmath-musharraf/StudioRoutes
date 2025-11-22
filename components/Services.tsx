import React from 'react';
import { Camera, Video, Aperture, PenTool } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Photography",
      description: "From intimate portraits to grand wedding celebrations, we freeze time with an artistic eye and attention to light."
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Cinematography",
      description: "Cinematic storytelling that captures the movement, sound, and emotion of your special day or brand narrative."
    },
    {
      icon: <Aperture className="w-8 h-8" />,
      title: "Drone Aerials",
      description: "Elevate your perspective with breathtaking 4K aerial footage that adds grandeur and context to your story."
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Creative Direction",
      description: "We don't just shoot; we plan. Mood boarding, location scouting, and styling assistance to ensure a cohesive look."
    }
  ];

  return (
    <section id="services" className="py-24 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="text-brand-gold uppercase tracking-[0.2em] text-xs font-bold">What We Do</span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-cream mt-4 mb-8 leading-tight">
              We Create Timeless <br/>
              <span className="italic text-gray-400">Visual Narratives</span>
            </h2>
            <p className="text-gray-300 font-light text-lg mb-12 leading-relaxed">
              At Studio Routes, we believe every client has a unique journey. Our mission is to document that path with authenticity and artistic flair. We combine modern technology with classic storytelling techniques.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="group cursor-default">
                  <div className="inline-block text-brand-gold mb-4 transition-all duration-500 ease-out transform group-hover:scale-110 group-hover:-translate-y-1 group-hover:text-brand-cream group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                    {service.icon}
                  </div>
                  <h3 className="text-brand-cream font-sans font-medium uppercase tracking-wide text-sm mb-2 group-hover:text-brand-gold transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Decorative Image Grid */}
          <div className="relative h-[600px] hidden lg:block">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 z-10 border border-gray-800 p-2">
               <img src="https://picsum.photos/id/342/600/800" alt="Service Highlight" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 z-20 border-4 border-brand-dark shadow-2xl">
               <img src="https://picsum.photos/id/453/400/400" alt="Detail Shot" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-10 left-10 w-24 h-24 border border-brand-gold/30 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;