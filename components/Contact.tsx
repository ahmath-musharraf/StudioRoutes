import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Calendar, Clock, Users, CheckCircle, AlertCircle, Link as LinkIcon } from 'lucide-react';

const Contact: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'booking'>('contact');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Form States
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    service: 'Wedding Photography',
    message: ''
  });

  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    attendees: '',
    type: 'Portrait Session',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, formType: 'contact' | 'booking') => {
    const { id, value } = e.target;
    // Extract field name from id (e.g., "contact-name" -> "name")
    const fieldName = id.split('-')[1];
    
    if (formType === 'contact') {
      setContactData(prev => ({ ...prev, [fieldName]: value }));
      // Clear error when user types
      if (errors[`contact-${fieldName}`]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[`contact-${fieldName}`];
          return newErrors;
        });
      }
    } else {
      setBookingData(prev => ({ ...prev, [fieldName]: value }));
      if (errors[`booking-${fieldName}`]) {
         setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[`booking-${fieldName}`];
          return newErrors;
        });
      }
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!contactData.name.trim()) newErrors['contact-name'] = 'Name is required';
    if (!contactData.email.trim()) {
      newErrors['contact-email'] = 'Email is required';
    } else if (!validateEmail(contactData.email)) {
      newErrors['contact-email'] = 'Please enter a valid email';
    }
    if (!contactData.message.trim()) newErrors['contact-message'] = 'Message is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Construct WhatsApp Message
      const message = `*New Website Inquiry*%0A%0A*Name:* ${contactData.name}%0A*Email:* ${contactData.email}%0A*Service:* ${contactData.service}%0A*Message:* ${contactData.message}`;
      const whatsappUrl = `https://wa.me/94777436629?text=${message}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      setSuccessMessage('Redirecting to WhatsApp...');
      setContactData({ name: '', email: '', service: 'Wedding Photography', message: '' });
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!bookingData.name.trim()) newErrors['booking-name'] = 'Name is required';
    if (!bookingData.email.trim()) {
      newErrors['booking-email'] = 'Email is required';
    } else if (!validateEmail(bookingData.email)) {
      newErrors['booking-email'] = 'Please enter a valid email';
    }
    if (!bookingData.date) newErrors['booking-date'] = 'Date is required';
    if (!bookingData.time) newErrors['booking-time'] = 'Time is required';
    if (!bookingData.attendees || parseInt(bookingData.attendees) < 1) newErrors['booking-attendees'] = 'Valid number of attendees required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Construct WhatsApp Booking Message
      const message = `*New Booking Request*%0A%0A*Name:* ${bookingData.name}%0A*Email:* ${bookingData.email}%0A*Date:* ${bookingData.date}%0A*Time:* ${bookingData.time}%0A*Attendees:* ${bookingData.attendees}%0A*Type:* ${bookingData.type}%0A*Notes:* ${bookingData.notes}`;
      const whatsappUrl = `https://wa.me/94777436629?text=${message}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      setSuccessMessage('Redirecting to WhatsApp...');
      setBookingData({ name: '', email: '', date: '', time: '', attendees: '', type: 'Portrait Session', notes: '' });
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const getInputClass = (errorKey: string) => `
    w-full bg-black border p-3 text-white transition-all duration-300
    focus:outline-none focus:ring-1 
    ${errors[errorKey] 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-800 focus:border-brand-red focus:ring-brand-red'}
  `;

  return (
    <section id="contact" className="py-24 bg-black text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Info */}
          <div>
            <span className="text-brand-gold uppercase tracking-[0.2em] text-xs font-bold">Get in Touch</span>
            <h2 className="text-3xl md:text-5xl font-serif mt-4 mb-8">Start Your Journey</h2>
            <p className="text-gray-400 font-light mb-12 max-w-md">
              Ready to capture your moments? Reach out to us for bookings, collaborations, or just to say hello.
            </p>

            <div className="space-y-6">
              <div className="flex items-center group">
                <div className="w-12 h-12 border border-gray-800 flex items-center justify-center mr-4 group-hover:border-brand-gold transition-colors">
                  <Phone className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500 tracking-widest">Call Us</p>
                  <a href="tel:+94777436629" className="text-lg font-serif hover:text-brand-gold transition-colors">+94 77 743 6629</a>
                </div>
              </div>

              <div className="flex items-center group">
                 <div className="w-12 h-12 border border-gray-800 flex items-center justify-center mr-4 group-hover:border-brand-gold transition-colors">
                  <Mail className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500 tracking-widest">Email Us</p>
                  <a href="mailto:teamstudioroutes@gmail.com" className="text-lg font-serif hover:text-brand-gold transition-colors">teamstudioroutes@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center group">
                 <div className="w-12 h-12 border border-gray-800 flex items-center justify-center mr-4 group-hover:border-brand-gold transition-colors">
                  <MapPin className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500 tracking-widest">Visit Us</p>
                  <p className="text-lg font-serif">Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-6 mt-12 items-center">
              {/* WhatsApp */}
              <a href="https://wa.me/94777436629" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-gold transition-colors focus:outline-none focus:text-brand-gold transform hover:scale-110 duration-300">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              
              {/* Facebook */}
              <a href="https://www.facebook.com/routes.lk" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-gold transition-colors focus:outline-none focus:text-brand-gold transform hover:scale-110 duration-300">
                <Facebook />
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/studioroutes/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-gold transition-colors focus:outline-none focus:text-brand-gold transform hover:scale-110 duration-300">
                <Instagram />
              </a>
              
              {/* TikTok */}
              <a href="https://www.tiktok.com/@studioroutes" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-gold transition-colors focus:outline-none focus:text-brand-gold transform hover:scale-110 duration-300" aria-label="TikTok">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>

              {/* Linktree */}
              <a href="https://linktr.ee/studioroutes" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-gold transition-colors focus:outline-none focus:text-brand-gold transform hover:scale-110 duration-300 flex items-center" aria-label="Linktree">
                <LinkIcon className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-brand-gray p-8 md:p-12 relative">
            {/* Success Message Overlay */}
            {successMessage && (
              <div className="absolute inset-0 z-10 bg-brand-gray/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                <CheckCircle className="w-16 h-16 text-brand-gold mb-4" />
                <h3 className="text-2xl font-serif text-white mb-2">Redirecting...</h3>
                <p className="text-gray-400">{successMessage}</p>
                <button 
                  onClick={() => setSuccessMessage(null)}
                  className="mt-6 text-xs uppercase tracking-widest text-brand-gold hover:text-white underline"
                >
                  Close
                </button>
              </div>
            )}

            {/* Tabs */}
            <div className="flex items-center space-x-8 mb-10 border-b border-gray-800 pb-4">
              <button
                onClick={() => { setActiveTab('contact'); setErrors({}); }}
                className={`text-sm font-bold uppercase tracking-widest pb-1 relative transition-colors ${activeTab === 'contact' ? 'text-brand-red' : 'text-gray-500 hover:text-brand-cream'}`}
              >
                Contact Us
                {activeTab === 'contact' && <span className="absolute bottom-[-17px] left-0 w-full h-0.5 bg-brand-red"></span>}
              </button>
              <button
                onClick={() => { setActiveTab('booking'); setErrors({}); }}
                className={`text-sm font-bold uppercase tracking-widest pb-1 relative transition-colors ${activeTab === 'booking' ? 'text-brand-red' : 'text-gray-500 hover:text-brand-cream'}`}
              >
                Book Session
                {activeTab === 'booking' && <span className="absolute bottom-[-17px] left-0 w-full h-0.5 bg-brand-red"></span>}
              </button>
            </div>

            {activeTab === 'contact' ? (
              <form onSubmit={handleContactSubmit} className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Name *</label>
                    <input 
                      type="text" 
                      id="contact-name"
                      value={contactData.name}
                      onChange={(e) => handleInputChange(e, 'contact')}
                      className={getInputClass('contact-name')}
                    />
                    {errors['contact-name'] && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors['contact-name']}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email *</label>
                    <input 
                      type="email" 
                      id="contact-email"
                      value={contactData.email}
                      onChange={(e) => handleInputChange(e, 'contact')}
                      className={getInputClass('contact-email')}
                    />
                    {errors['contact-email'] && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors['contact-email']}</p>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="contact-service" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Service Interest</label>
                  <select 
                    id="contact-service"
                    value={contactData.service}
                    onChange={(e) => handleInputChange(e, 'contact')}
                    className="w-full bg-black border border-gray-800 p-3 text-white focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none transition-all duration-300"
                  >
                    <option>Wedding Photography</option>
                    <option>Wedding Cinematography</option>
                    <option>Commercial Shoot</option>
                    <option>Portrait Session</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message *</label>
                  <textarea 
                    id="contact-message"
                    rows={4} 
                    value={contactData.message}
                    onChange={(e) => handleInputChange(e, 'contact')}
                    className={getInputClass('contact-message')}
                  ></textarea>
                  {errors['contact-message'] && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors['contact-message']}</p>}
                </div>

                <button 
                  type="submit"
                  className="px-10 py-4 bg-brand-red text-white font-bold uppercase tracking-widest hover:bg-red-900 focus:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red focus:ring-offset-brand-gray transition-all duration-300 w-full md:w-auto"
                >
                  Send on WhatsApp
                </button>
              </form>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6 animate-fade-in">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="booking-name" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Name *</label>
                    <input 
                      type="text" 
                      id="booking-name"
                      value={bookingData.name}
                      onChange={(e) => handleInputChange(e, 'booking')}
                      className={getInputClass('booking-name')}
                    />
                    {errors['booking-name'] && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors['booking-name']}</p>}
                  </div>
                  <div>
                    <label htmlFor="booking-email" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email *</label>
                    <input 
                      type="email" 
                      id="booking-email"
                      value={bookingData.email}
                      onChange={(e) => handleInputChange(e, 'booking')}
                      className={getInputClass('booking-email')}
                    />
                    {errors['booking-email'] && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors['booking-email']}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="booking-date" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Date *</label>
                     <div className="relative">
                        <input 
                          type="date" 
                          id="booking-date"
                          value={bookingData.date}
                          onChange={(e) => handleInputChange(e, 'booking')}
                          className={`${getInputClass('booking-date')} appearance-none`}
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
                     </div>
                     {errors['booking-date'] && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors['booking-date']}</p>}
                  </div>
                   <div>
                    <label htmlFor="booking-time" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Time *</label>
                     <div className="relative">
                        <input 
                          type="time" 
                          id="booking-time"
                          value={bookingData.time}
                          onChange={(e) => handleInputChange(e, 'booking')}
                          className={`${getInputClass('booking-time')} appearance-none`}
                        />
                        <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
                    </div>
                    {errors['booking-time'] && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors['booking-time']}</p>}
                  </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="booking-attendees" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Attendees *</label>
                     <div className="relative">
                      <input 
                        type="number" 
                        id="booking-attendees"
                        min="1"
                        placeholder="Ex: 2"
                        value={bookingData.attendees}
                        onChange={(e) => handleInputChange(e, 'booking')}
                        className={getInputClass('booking-attendees')}
                      />
                       <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
                    </div>
                    {errors['booking-attendees'] && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors['booking-attendees']}</p>}
                  </div>
                   <div>
                    <label htmlFor="booking-type" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Session Type</label>
                    <select 
                      id="booking-type"
                      value={bookingData.type}
                      onChange={(e) => handleInputChange(e, 'booking')}
                      className="w-full bg-black border border-gray-800 p-3 text-white focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none transition-all duration-300"
                    >
                      <option>Portrait Session</option>
                      <option>Couple Shoot</option>
                      <option>Family Session</option>
                      <option>Event Coverage</option>
                      <option>Commercial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="booking-notes" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Notes / Special Requests</label>
                   <textarea 
                    id="booking-notes"
                    rows={2} 
                    value={bookingData.notes}
                    onChange={(e) => handleInputChange(e, 'booking')}
                    className="w-full bg-black border border-gray-800 p-3 text-white focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none transition-all duration-300"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="px-10 py-4 bg-brand-red text-white font-bold uppercase tracking-widest hover:bg-red-900 focus:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red focus:ring-offset-brand-gray transition-all duration-300 w-full md:w-auto"
                >
                  Request on WhatsApp
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;