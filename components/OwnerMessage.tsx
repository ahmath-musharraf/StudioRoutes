import React from 'react';
import { Quote } from 'lucide-react';

const OwnerMessage: React.FC = () => {
  return (
    <section className="py-24 bg-brand-gray relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Image Side */}
          <div className="relative order-2 md:order-1">
            <div className="relative z-10 border-2 border-brand-gold p-2">
              {/* 
                NOTE: Please ensure your image file is named 'founder.jpg' and placed in the public/assets folder, 
                or replace the src below with your specific image URL.
              */}
              <img 
                src="/founder.jpg" 
                alt="Founder of Studio Routes" 
                className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-10 -left-4 w-full h-full border border-gray-700 z-0 opacity-50"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-red/20 rounded-full blur-2xl"></div>
          </div>

          {/* Text Side */}
          <div className="order-1 md:order-2 md:pl-12">
            <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-brand-gold"></div>
                <span className="text-brand-gold uppercase tracking-[0.2em] text-xs font-bold">From the Founder</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif text-brand-cream mb-8 leading-tight">
              Art is not just what you see, but <span className="italic text-brand-red">what you make others feel.</span>
            </h2>

            <div className="relative">
                <Quote className="absolute -top-4 -left-6 w-12 h-12 text-brand-gold/10 rotate-180" />
                <p className="text-gray-400 font-light text-lg leading-relaxed mb-8 relative z-10">
                "When I started Studio Routes, my vision was never about just taking pictures. It was about documenting the route of life. Every smile, every tear, and every fleeting glance tells a story that deserves to be preserved with authenticity and grace.
                <br /><br />
                We don't just capture events; we capture the atmosphere, the emotion, and the soul of the moment. My promise to you is that when you look back at our work decades from now, you won't just remember how it looked—you'll remember exactly how it felt."
                </p>
            </div>

            <div className="mt-10">
                <p className="font-script text-4xl text-brand-gold transform -rotate-2">Studio Routes Team</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-2 font-bold">Creative Director & Founder</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OwnerMessage;