import React from 'react';
import { Map, Camera, MonitorPlay, Gift, MapPin } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: <Map className="w-6 h-6" />,
    title: "The Map",
    subtitle: "Consultation & Planning",
    description: "Every journey begins with a map. We sit down to understand your vision, scout locations, and plan the creative direction for your story."
  },
  {
    id: 2,
    icon: <Camera className="w-6 h-6" />,
    title: "The Journey",
    subtitle: "Production Day",
    description: "We hit the road. Whether it's a studio session or a mountain peak, we guide the action, capturing authentic moments with cinematic precision."
  },
  {
    id: 3,
    icon: <MonitorPlay className="w-6 h-6" />,
    title: "The scenic Route",
    subtitle: "Post-Production",
    description: "The magic happens in the edit. We carefully select, color grade, and weave your footage into a cohesive narrative that evokes emotion."
  },
  {
    id: 4,
    icon: <Gift className="w-6 h-6" />,
    title: "The Destination",
    subtitle: "Final Delivery",
    description: "Your story, delivered. We present your high-resolution gallery or film in a beautiful digital format, ready to be shared with the world."
  }
];

const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background Map Texture (Abstract) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,25 50,50 T100,50" stroke="white" strokeWidth="0.5" fill="none" />
          <path d="M0,30 Q25,80 50,30 T100,30" stroke="white" strokeWidth="0.5" fill="none" />
          <path d="M0,70 Q25,10 50,70 T100,70" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-brand-gold uppercase tracking-[0.2em] text-xs font-bold flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-cream mt-4">Follow The Route</h2>
        </div>

        <div className="relative">
          {/* Central Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-800 border-r border-dashed border-gray-600"></div>
          
          {/* Left Line (Mobile) */}
          <div className="md:hidden absolute left-6 h-full w-0.5 bg-gray-800 border-r border-dashed border-gray-600"></div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <div key={step.id} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Empty Space for alignment */}
                <div className="flex-1 hidden md:block"></div>

                {/* Icon Node */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-brand-dark border-2 border-brand-red text-brand-red shadow-[0_0_15px_rgba(139,0,0,0.5)] z-10">
                  {step.icon}
                </div>

                {/* Content Card */}
                <div className={`flex-1 w-full pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                  <div className="group cursor-default">
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2 block group-hover:text-brand-red transition-colors">Step 0{step.id}</span>
                    <h3 className="text-2xl font-serif text-brand-gold mb-1">{step.title}</h3>
                    <h4 className="text-sm font-sans text-brand-cream mb-4 font-medium uppercase tracking-wide">{step.subtitle}</h4>
                    <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base group-hover:text-gray-300 transition-colors">
                      {step.description}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>
          
          {/* End Marker */}
          <div className="absolute bottom-0 left-6 md:left-1/2 transform -translate-x-1/2 translate-y-full pt-8">
             <div className="w-3 h-3 bg-brand-red rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
