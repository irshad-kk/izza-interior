import React from 'react';
import { WHY_CHOOSE_POINTS } from '../data/content';

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F5] relative border-b border-[#161514]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Description & Four Benefits */}
          <div className="lg:col-span-6 space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <p className="text-xs tracking-[0.28em] uppercase text-[#8C8275] font-sans font-semibold">
                Why Izza Interior
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161514] font-normal leading-[1.18]">
                Design That Feels <br className="hidden sm:inline" />
                <span className="italic font-light text-[#48443E]">Like You.</span>
              </h2>
              <p className="text-[#48443E] text-base sm:text-lg leading-relaxed font-sans font-normal pt-2">
                Every space has its own character. Our approach begins with understanding yours, creating interiors that feel considered, cohesive, and suited to the way you live or work.
              </p>
            </div>

            {/* Four Benefits List */}
            <div className="space-y-6 pt-4 border-t border-[#161514]/10">
              {WHY_CHOOSE_POINTS.map((point) => (
                <div key={point.title} className="flex items-start space-x-4">
                  <div className="w-5 h-5 rounded-full border border-[#C2A676] flex items-center justify-center shrink-0 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C2A676]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-sans text-sm tracking-wider uppercase font-semibold text-[#161514]">
                      {point.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#69635B] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center space-x-3 px-6 py-3 bg-[#161514] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] hover:bg-[#32302C] transition-colors"
              >
                <span>Start A Conversation</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

          {/* Right Column: Supporting Tactile Craftsmanship Imagery */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative overflow-hidden bg-[#EFEBE5] shadow-[0_20px_50px_rgba(22,21,20,0.06)] border border-[#161514]/10">
              <img
                src="/images/projects/foyer_slatted_timber_partition.jpg"
                alt="Bespoke solid teak slatted louvers, architectural downlighting, and curated foyer greenery by Izza Interior"
                className="w-full h-[480px] sm:h-[580px] object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                loading="lazy"
              />

              {/* Editorial label */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#FAF8F5]/90 backdrop-blur-md p-4 border border-[#161514]/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] tracking-[0.24em] uppercase text-[#8A8278]">Completed Execution</p>
                    <p className="font-serif text-lg text-[#161514]">Solid Teak Louvers &amp; Architectural Partitioning</p>
                  </div>
                  <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest px-2 py-1 bg-[#161514] text-[#C2A676]">
                    Kasaragod
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
