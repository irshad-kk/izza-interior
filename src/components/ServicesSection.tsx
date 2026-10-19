import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../data/content';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-24 sm:py-32 bg-[#FAF8F5] relative border-b border-[#161514]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-4 mb-16 sm:mb-20">
          <p className="text-xs tracking-[0.28em] uppercase text-[#8C8275] font-sans font-semibold">
            Our Services
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161514] font-normal leading-[1.15]">
            Designed for the Way You Live.
          </h2>
          <p className="text-[#48443E] text-base sm:text-lg font-light leading-relaxed">
            From the first concept to the finishing touches, we create considered interiors that balance visual appeal with everyday functionality.
          </p>
        </div>

        {/* Refined Grid of Four Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="group bg-[#FAF8F5] border border-[#161514]/10 overflow-hidden flex flex-col justify-between hover:shadow-[0_16px_40px_rgba(22,21,20,0.06)] hover:border-[#161514]/25 transition-all duration-500"
            >
              {/* Image Container with subtle zoom */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EFEBE5]">
                <img
                  src={service.image}
                  alt={`${service.title} - Izza Interior`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-[#FAF8F5]/90 backdrop-blur-md px-3 py-1 border border-[#161514]/10 text-xs font-mono tracking-widest text-[#161514]">
                  {service.number}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#161514] font-normal group-hover:text-[#8C8275] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#69635B] text-sm sm:text-base leading-relaxed font-sans">
                    {service.description}
                  </p>
                </div>

                {/* Features list */}
                <div className="pt-4 border-t border-[#161514]/10">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#48443E]">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C2A676]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Link */}
                <div className="pt-2 flex items-center justify-between">
                  <a
                    href="#contact"
                    onClick={() => onSelectService && onSelectService(service.title)}
                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#161514] hover:text-[#C2A676] transition-colors"
                  >
                    <span>Enquire for {service.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`${COMPANY_INFO.whatsappUrl}?text=Hello%20Izza%20Interior%2C%20I%20am%20interested%20in%20${encodeURIComponent(service.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-wider text-[#8A8278] hover:text-[#161514] transition-colors hidden sm:inline-block"
                  >
                    Quick WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
