import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#161514]/10 shadow-[0_4px_24px_rgba(22,21,20,0.04)] py-4'
          : 'bg-gradient-to-b from-[#161514]/40 via-[#161514]/15 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Left: Brand Identity / Logo */}
        <a
          href="#home"
          className="group flex items-center focus:outline-none"
          aria-label="Izza Interior Home"
        >
          <div
            className={`transition-all duration-300 rounded-sm p-1.5 flex items-center ${
              isScrolled
                ? 'bg-transparent'
                : 'bg-white/95 backdrop-blur-md shadow-sm ring-1 ring-black/5'
            }`}
          >
            <img
              src={isScrolled ? '/images/logo-transparent.png' : '/images/logo.png'}
              alt="Izza Interior"
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-300 relative py-1 hover:opacity-100 ${
                isScrolled
                  ? 'text-[#48443E] hover:text-[#161514]'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C2A676] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          {/* Highlighted "Discuss Your Project" button */}
          <a
            href={`${COMPANY_INFO.whatsappUrl}?text=Hello%20Izza%20Interior%2C%20I%20would%20like%20to%20discuss%20an%20interior%20design%20project.`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-2 text-xs uppercase tracking-[0.16em] px-5 py-2.5 rounded-none border transition-all duration-300 ${
              isScrolled
                ? 'border-[#161514] text-[#161514] hover:bg-[#161514] hover:text-[#FAF8F5]'
                : 'border-white/80 text-white bg-white/10 hover:bg-white hover:text-[#161514]'
            }`}
          >
            <span>Discuss Your Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center space-x-3">
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full border transition-colors ${
              isScrolled ? 'border-[#161514]/20 text-[#161514]' : 'border-white/30 text-white'
            }`}
            aria-label="WhatsApp Us"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 transition-colors ${
              isScrolled ? 'text-[#161514]' : 'text-white'
            }`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[76px] bg-[#FAF8F5] z-40 lg:hidden flex flex-col justify-between p-8 border-t border-[#161514]/10 animate-fadeIn">
          <div className="space-y-6 pt-2">
            <div className="pb-2 border-b border-[#161514]/10">
              <img
                src="/images/logo-transparent.png"
                alt="Izza Interior"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-[10px] tracking-[0.25em] text-[#8A8278] uppercase">Navigation</p>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl text-[#161514] hover:text-[#8C8275] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-[#161514]/10 pt-6 space-y-4">
            <p className="text-[10px] tracking-[0.25em] text-[#8A8278] uppercase">Kasaragod, Kerala</p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                className="flex items-center justify-center space-x-2 py-3 border border-[#161514]/20 text-xs tracking-wider uppercase text-[#161514]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
              <a
                href={`${COMPANY_INFO.whatsappUrl}?text=Hello%20Izza%20Interior%2C%20I%20would%20like%20to%20discuss%20an%20interior%20design%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 py-3 bg-[#161514] text-xs tracking-wider uppercase text-[#FAF8F5]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C2A676]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
