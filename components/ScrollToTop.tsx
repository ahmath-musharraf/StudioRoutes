import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-6 z-40 p-3 rounded-full shadow-2xl transition-all duration-500 ease-in-out flex items-center justify-center focus:outline-none border border-brand-gold/20
        ${isVisible 
          ? 'opacity-100 translate-y-0 bg-brand-dark text-brand-gold hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold hover:scale-110' 
          : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      aria-label="Scroll to Top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTop;