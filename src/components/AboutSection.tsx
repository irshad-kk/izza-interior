import React from 'react';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { FOUNDERS } from '../data/content';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      title: "Personalized Design Approach",
      detail: "Shaped closely around your individual living patterns and spatial aspirations."
    },
    {
      title: "Functional Space Planning",
      detail: "Harmonizing seamless room flow, natural ventilation, and ergonomic utility."
    },
    {
      title: "Refined Material Selection",
      detail: "Curating authentic stone, warm timber, and architectural finishes that age with grace."
    },
    {
      title: "Attention to Detail",
      detail: "Meticulous focus on subtle shadow reveals, tactile transitions, and layered light."
    }
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#FAF8F5] relative border-b border-[#161514]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24 sm:space-y-32">
        
        {/* Top Part: Studio Story & Architectural Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Editorial Architectural Photograph */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden bg-[#EFEBE5] shadow-[0_20px_50px_rgba(22,21,20,0.06)] border border-[#161514]/10">
              <img
                src="/images/projects/dining_island_stone_feature.jpg"
                alt="Izza Interior Realized Dining Space with Natural Stone Feature Wall in Kasaragod, Kerala"
                className="w-full h-[520px] sm:h-[620px] object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                loading="lazy"
              />
              {/* Subtle architectural badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#FAF8F5]/90 backdrop-blur-md p-4 border border-[#161514]/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#8A8278]">Studio Location</p>
                  <p className="font-serif text-lg text-[#161514]">Kasaragod, Kerala, India</p>
                </div>
                <div className="h-8 w-[1px] bg-[#161514]/15" />
                <div className="text-right">
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#8A8278]">Discipline</p>
                  <p className="text-xs uppercase tracking-wider text-[#161514] font-medium">Architecture & Interiors</p>
                </div>
              </div>
            </div>
            
            {/* Architectural Grid Line Ornament */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-[#C2A676]/40 pointer-events-none" />
          </div>

          {/* Right Column: Editorial Text & Highlights */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              {/* Eyebrow */}
              <p className="text-xs tracking-[0.28em] uppercase text-[#8C8275] font-sans font-semibold">
                About Izza Interior
              </p>

              {/* Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161514] font-normal leading-[1.18]">
                Thoughtful Design. <br className="hidden sm:inline" />
                <span className="italic font-light text-[#48443E]">Timeless Living.</span>
              </h2>

              {/* Description */}
              <p className="text-[#48443E] text-base sm:text-lg leading-relaxed font-sans font-normal pt-2">
                Izza Interior is an interior architecture and design firm based in Kasaragod, dedicated to transforming spaces into beautiful, functional, and meaningful environments. We bring together thoughtful planning, refined aesthetics, and practical design solutions to create interiors that reflect each client's lifestyle and vision.
              </p>
            </div>

            {/* Supporting Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[#161514]/10">
              {highlights.map((item) => (
                <div key={item.title} className="space-y-1.5 p-3 rounded-none bg-[#FAF8F5] border-l border-[#C2A676]">
                  <h3 className="font-sans text-xs tracking-wider uppercase font-semibold text-[#161514]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#69635B] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Subtle Text Link: Discover Our Approach */}
            <div className="pt-2">
              <a
                href="#process"
                className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#161514] hover:text-[#C2A676] transition-colors"
              >
                <span>Discover Our Approach</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Part: Founders & Leadership Showcase */}
        <div className="pt-16 sm:pt-20 border-t border-[#161514]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-14 sm:mb-16 items-end">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center space-x-2.5">
                <span className="w-8 h-[1px] bg-[#C2A676]" />
                <p className="text-xs tracking-[0.28em] uppercase text-[#8C8275] font-sans font-semibold">
                  Founders &amp; Leadership
                </p>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161514] font-normal leading-[1.16]">
                The Minds Shaping <br className="hidden sm:inline" />
                <span className="italic font-light text-[#48443E]">Every Detail</span>
              </h3>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[#69635B] text-sm sm:text-base leading-relaxed font-sans font-light">
                Co-founded with a united vision to combine architectural clarity with tailored Kerala living, our principals oversee every phase from first concept to final handover.
              </p>
            </div>
          </div>

          {/* Founders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {FOUNDERS.map((founder, index) => (
              <div
                key={founder.name}
                className="group relative bg-[#F7F4EE] border border-[#161514]/10 p-6 sm:p-8 transition-all duration-500 hover:border-[#C2A676] hover:shadow-[0_20px_50px_rgba(22,21,20,0.06)]"
              >
                {/* Architectural Corner Accents */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-[#C2A676] transition-colors duration-500 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-transparent group-hover:border-[#C2A676] transition-colors duration-500 pointer-events-none" />

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-center">
                  
                  {/* Portrait Column */}
                  <div className="sm:col-span-5 relative">
                    <div className="relative overflow-hidden aspect-[3/4] bg-[#EAE4D9] border border-[#161514]/10 shadow-[0_8px_24px_rgba(22,21,20,0.06)]">
                      <img
                        src={founder.image}
                        alt={`${founder.name} — ${founder.role} at Izza Interior`}
                        className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.03] group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      {/* Subtle Vignette Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/40 via-transparent to-transparent opacity-60" />
                      
                      {/* Corner Number Index */}
                      <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-[#FAF8F5]/90 backdrop-blur-sm border border-[#161514]/10">
                        <span className="text-[10px] tracking-widest uppercase font-mono text-[#161514]">
                          0{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Editorial Details Column */}
                  <div className="sm:col-span-7 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Badge / Role */}
                      <span className="text-[10px] tracking-[0.24em] uppercase font-sans font-semibold text-[#8C8275] block mb-1">
                        {founder.role}
                      </span>
                      
                      {/* Founder Name */}
                      <h4 className="font-serif text-2xl sm:text-3xl text-[#161514] font-medium tracking-normal leading-snug">
                        {founder.name}
                      </h4>
                      
                      <div className="w-10 h-[1.5px] bg-[#C2A676] my-3" />
                      
                      {/* Bio */}
                      <p className="text-xs sm:text-sm text-[#5C554D] leading-relaxed font-sans font-light">
                        {founder.bio}
                      </p>
                    </div>

                    {/* Direct Contact Links */}
                    <div className="pt-2 border-t border-[#161514]/10 flex flex-wrap items-center gap-3">
                      {founder.whatsappUrl && (
                        <a
                          href={`${founder.whatsappUrl}?text=${encodeURIComponent(`Hello ${founder.name}, I would like to discuss an interior architecture project with Izza Interior.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-wider px-3 py-2 bg-[#161514] text-[#FAF8F5] hover:bg-[#2C2926] hover:text-[#C2A676] transition-colors"
                          aria-label={`Chat with ${founder.name} on WhatsApp`}
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#C2A676]" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                      
                      {founder.phone && (
                        <a
                          href={`tel:${founder.phoneRaw || founder.phone}`}
                          className="inline-flex items-center space-x-1.5 text-[11px] uppercase tracking-wider px-3 py-2 border border-[#161514]/20 text-[#161514] hover:border-[#161514] hover:bg-white transition-colors"
                          aria-label={`Call ${founder.name} at ${founder.phone}`}
                        >
                          <Phone className="w-3.5 h-3.5 text-[#8C8275]" />
                          <span>{founder.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Collaborative Design Vision Banner */}
          <div className="mt-12 p-6 sm:p-8 bg-[#FAF8F5] border border-[#C2A676]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="text-[10px] tracking-[0.24em] uppercase text-[#8C8275] font-semibold">
                Direct Principal Engagement
              </p>
              <p className="font-serif text-lg sm:text-xl text-[#161514] italic font-light">
                &ldquo;Every project at Izza is guided personally by our founders to safeguard design purity and quality.&rdquo;
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#161514] hover:text-[#C2A676] transition-colors whitespace-nowrap"
            >
              <span>Schedule a Meeting</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

