import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 tracking-widest uppercase gap-4 md:gap-0">
        {/* Left */}
        <p>&copy; {new Date().getFullYear()} Studio Routes. All rights reserved.</p>
        
        {/* Center */}
        <p className="text-center">
          Website created by{' '}
          <a 
            href="https://mushieditz.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-bold hover:text-brand-gold transition-colors border-b border-transparent hover:border-brand-gold pb-0.5"
          >
            Mushi Editz
          </a>
        </p>

        {/* Right */}
        <p className="text-right">Capturing Life's Journeys</p>
      </div>
    </footer>
  );
};

export default Footer;