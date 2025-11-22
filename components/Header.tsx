import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'The Route', href: '#process' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-brand-dark/95 backdrop-blur-sm py-3 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <div className="group cursor-pointer" onClick={() => window.location.href = '#'}>
           
           {/* 
              -----------------------------------------------------------------
              HOW TO CHANGE LOGO:
              1. Add your logo image (e.g., 'logo.png') to your public/assets folder.
              2. UNCOMMENT the <img /> tag below.
              3. COMMENT OUT the CSS Badge <div> section below it.
              -----------------------------------------------------------------
           */}

           {/* OPTION 1: IMAGE LOGO (Uncomment this block to use your file) */}
           
           <img 
             src="https://raw.githubusercontent.com/ahmath-musharraf/StudioRoutes/refs/heads/main/StudioRoutesLogo.png" 
             alt="Studio Routes" 
             className="w-16 h-16 md:w-20 md:h-20 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-md" 
           />
           

           {/* OPTION 2: CSS BADGE (Current - Comment this out if using image) */}
          
           <div className="w-16 h-16 bg-brand-red rounded-full flex flex-col items-center justify-center text-white shadow-xl border border-white/10 transition-transform duration-300 group-hover:scale-110 relative overflow-hidden">
                {/* Subtle Shine */}
                {/* <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-full pointer-events-none"></div> */}
                
                {/* Studio */}
               {/* <span className="font-script text-[11px] leading-none mt-1 text-white relative z-10 transform -rotate-3">Studio</span> */}
                
                {/* Routes */}
               {/* <span className="font-serif text-xl leading-none tracking-tight relative z-10 font-medium -mt-1">Routes</span> */}
                
                {/* Slogan */}
              {/*   <span className="font-sans text-[3px] tracking-[0.15em] mt-0.5 uppercase text-gray-200 relative z-10">Everything has beauty</span> */}
            </div>

        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-widest text-gray-300 hover:text-brand-gold transition-colors duration-200 font-light"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-brand-cream hover:text-brand-gold transition-colors"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-dark border-t border-gray-800">
          <div className="flex flex-col py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-3 text-gray-300 hover:text-brand-gold hover:bg-gray-900 transition-colors uppercase text-sm tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
