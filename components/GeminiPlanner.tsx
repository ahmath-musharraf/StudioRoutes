import React, { useState } from 'react';
import { Sparkles, Loader2, MapPin, Palette, Camera } from 'lucide-react';
import { generateCreativeConcept } from '../services/geminiService';
import { ShootPlan } from '../types';

const GeminiPlanner: React.FC = () => {
  const [eventType, setEventType] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<ShootPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventType) return;

    setIsLoading(true);
    setError(null);
    setPlan(null);

    try {
      const result = await generateCreativeConcept(eventType, notes);
      setPlan(result);
    } catch (err) {
      setError("Unable to generate plan at this moment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="planner" className="py-24 bg-brand-gray relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-brand-gold/10 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-brand-gold mr-2" />
            <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">AI Creative Assistant</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-cream">Plan Your Route</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto font-light">
            Not sure where to start? Describe your event or vision, and let our AI generate a custom mood board and shot list for your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <div className="bg-brand-dark p-8 border border-gray-800 shadow-2xl">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Event Type</label>
                <select 
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-brand-cream px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors"
                  required
                >
                  <option value="">Select Type...</option>
                  <option value="Wedding">Wedding / Engagement</option>
                  <option value="Commercial">Commercial / Brand</option>
                  <option value="Portrait">Personal Portrait</option>
                  <option value="Music Video">Music Video</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Vision Notes</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., A vintage style sunset shoot on a rocky beach, romantic and moody..."
                  className="w-full bg-gray-900 border border-gray-700 text-brand-cream px-4 py-3 h-32 focus:outline-none focus:border-brand-gold transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-gold text-brand-dark font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : 'Generate Concept'}
              </button>

              {error && <p className="text-red-400 text-xs mt-2 text-center">{error}</p>}
            </form>
          </div>

          {/* Results Display */}
          <div className="flex flex-col justify-center">
            {!plan && !isLoading && (
              <div className="border-2 border-dashed border-gray-800 rounded-lg h-full flex flex-col items-center justify-center text-gray-600 min-h-[300px]">
                <Camera className="w-12 h-12 mb-4 opacity-20" />
                <p className="uppercase tracking-widest text-sm">Your concept will appear here</p>
              </div>
            )}

            {isLoading && (
              <div className="h-full flex flex-col items-center justify-center text-brand-gold min-h-[300px]">
                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                <p className="uppercase tracking-widest text-sm animate-pulse">Crafting your vision...</p>
              </div>
            )}

            {plan && (
              <div className="bg-gray-900 p-8 border-l-4 border-brand-gold shadow-2xl animate-fade-in">
                <span className="text-xs text-gray-500 uppercase tracking-widest">Concept Name</span>
                <h3 className="text-2xl font-serif text-white mb-6 italic">{plan.conceptName}</h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center text-brand-gold mb-2">
                      <Sparkles className="w-4 h-4 mr-2" />
                      <span className="text-xs uppercase tracking-widest font-bold">Mood</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{plan.mood}</p>
                  </div>

                  <div>
                    <div className="flex items-center text-brand-gold mb-2">
                      <Palette className="w-4 h-4 mr-2" />
                      <span className="text-xs uppercase tracking-widest font-bold">Color Palette</span>
                    </div>
                    <div className="flex space-x-3">
                      {plan.colorPalette.map((color, idx) => (
                        <div key={idx} className="group relative">
                           <div 
                            className="w-8 h-8 rounded-full border border-gray-600 shadow-md" 
                            style={{ backgroundColor: color }}
                          ></div>
                          <span className="absolute -bottom-6 left-0 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center text-brand-gold mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-xs uppercase tracking-widest font-bold">Location Vibe</span>
                    </div>
                    <p className="text-gray-300 text-sm">{plan.locationIdeas}</p>
                  </div>
                  
                  <div>
                     <div className="flex items-center text-brand-gold mb-2">
                      <Camera className="w-4 h-4 mr-2" />
                      <span className="text-xs uppercase tracking-widest font-bold">Suggested Shots</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                        {plan.suggestedShots.map((shot, i) => (
                            <li key={i}>{shot}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeminiPlanner;