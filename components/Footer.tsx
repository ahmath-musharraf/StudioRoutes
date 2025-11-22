import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 tracking-widest uppercase">
        <p>&copy; {new Date().getFullYear()} Studio Routes. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Capturing Life's Journeys</p>
      </div>
    </footer>
  );
};

export default Footer;