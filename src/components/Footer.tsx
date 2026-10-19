import React from 'react';
import { ArrowUp, MessageCircle, MapPin } from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/content';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#11100F] text-[#FAF8F5] pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="#home"
              className="inline-block bg-white/95 backdrop-blur-sm p-2 rounded shadow-sm hover:opacity-95 transition-opacity"
              aria-label="Izza Interior Home"
            >
              <img
                src="/images/logo.png"
                alt="Izza Interior"
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </a>
            
            <p className="text-[#ADA498] text-sm leading-relaxed max-w-sm font-light pt-2">
              Thoughtfully designed interiors that bring together architecture, functionality, and timeless aesthetics — led by founders Abdul Shareef T &amp; Mohammed Noufal Y.
            </p>

            <div className="flex items-center space-x-2 text-xs text-[#8A8278] pt-2">
              <MapPin className="w-3.5 h-3.5 text-[#C2A676]" />
              <span>Kasaragod, Kerala, India</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#C2A676] font-medium">
              Navigation
            </p>
            <ul className="space-y-2.5 text-xs text-[#ADA498]">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#FAF8F5] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#C2A676] font-medium">
              Services
            </p>
            <ul className="space-y-2.5 text-xs text-[#ADA498]">
              {SERVICES.map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="hover:text-[#FAF8F5] transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Numbers & WhatsApp */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#C2A676] font-medium">
              Get in Touch
            </p>
            <div className="space-y-3 text-xs text-[#ADA498]">
              <div>
                <span className="text-[10px] uppercase text-[#8A8278] block">Call Us</span>
                <a
                  href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                  className="hover:text-[#FAF8F5] transition-colors block text-sm font-serif"
                >
                  {COMPANY_INFO.primaryPhone}
                </a>
                <a
                  href={`tel:${COMPANY_INFO.altPhoneRaw}`}
                  className="hover:text-[#FAF8F5] transition-colors block text-sm font-serif mt-0.5"
                >
                  {COMPANY_INFO.altPhone}
                </a>
              </div>

              <div className="pt-2">
                <span className="text-[10px] uppercase text-[#8A8278] block">WhatsApp Consultation</span>
                <a
                  href={`${COMPANY_INFO.whatsappUrl}?text=Hello%20Izza%20Interior%2C%20I%20would%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-[#C2A676] hover:underline mt-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A8278] gap-4">
          <p>
            &copy; 2026 Izza Interior. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <span className="text-[11px] tracking-wider uppercase">
              Kasaragod &bull; Kannur &bull; Mangalore
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1 text-xs text-[#ADA498] hover:text-[#FAF8F5] transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
