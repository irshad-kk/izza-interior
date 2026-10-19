import React from 'react';
import { PROCESS_STEPS } from '../data/content';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 sm:py-32 bg-[#FAF8F5] relative border-b border-[#161514]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="max-w-2xl space-y-4 mb-16 sm:mb-24">
          <p className="text-xs tracking-[0.28em] uppercase text-[#8C8275] font-sans font-semibold">
            Our Process
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161514] font-normal leading-[1.15]">
            From Vision to Reality.
          </h2>
          <p className="text-[#48443E] text-base sm:text-lg font-light leading-relaxed">
            A structured, collaborative design methodology developed to translate your ideas into coherent, finely executed interior environments.
          </p>
        </div>

        {/* Process Timeline: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-[28px] left-0 right-0 h-[1px] bg-[#161514]/15 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 relative z-10">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.number}
                className="group relative flex flex-col justify-between p-6 sm:p-8 bg-[#FAF8F5] border border-[#161514]/10 hover:border-[#161514]/30 hover:shadow-[0_12px_30px_rgba(22,21,20,0.04)] transition-all duration-300"
              >
                {/* Step Marker Badge */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 bg-[#FAF8F5] border border-[#161514] flex items-center justify-center font-mono text-sm text-[#161514] group-hover:bg-[#161514] group-hover:text-[#FAF8F5] transition-colors duration-300">
                    {step.number}
                  </div>
                  <span className="text-[10px] tracking-[0.25em] text-[#8A8278] uppercase">
                    Stage 0{index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl text-[#161514] font-normal group-hover:text-[#8C8275] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[#69635B] text-sm leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#161514]/10">
                  <span className="text-[11px] tracking-wider uppercase text-[#C2A676] font-medium">
                    Phase {step.number} Complete Alignment
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote reassurance */}
        <div className="mt-14 text-center">
          <p className="text-xs text-[#8A8278] tracking-wider uppercase">
            Clear Communication &bull; Design Precision &bull; Architectural Integrity
          </p>
        </div>

      </div>
    </section>
  );
};
