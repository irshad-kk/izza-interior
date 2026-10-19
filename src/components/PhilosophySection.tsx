import React from 'react';

export const PhilosophySection: React.FC = () => {
  const principles = [
    {
      number: "01",
      title: "Form & Function",
      description: "Architecture must serve the rhythm of daily life. We balance fluid human circulation and practical storage with pure, uncluttered proportions."
    },
    {
      number: "02",
      title: "Materials & Texture",
      description: "We honor genuine, tactile substances: honed natural stone, solid timber, brushed brass, and natural linens that develop character over time."
    },
    {
      number: "03",
      title: "Light & Atmosphere",
      description: "Natural illumination shapes how spaces feel. We choreograph morning daylight, cross-ventilation, and warm evening lighting to evoke serene calm."
    }
  ];

  return (
    <section className="relative py-28 sm:py-36 bg-[#161514] text-[#FAF8F5] overflow-hidden">
      {/* Background Architectural Atmosphere Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/projects/modern_master_suite_cove.jpg"
          alt="Architectural cove lighting and minimalist materiality - Izza Interior completed project"
          className="w-full h-full object-cover opacity-30 filter brightness-95"
          loading="lazy"
        />
        {/* Editorial scrim overlays for pristine contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161514] via-[#161514]/75 to-[#161514]" />
        <div className="absolute inset-0 bg-[#161514]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Content */}
        <div className="max-w-3xl space-y-5 mb-20 sm:mb-24">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C2A676] font-sans font-semibold">
            Our Design Philosophy
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF8F5] font-normal leading-[1.12]">
            Every Detail Has a Purpose.
          </h2>
          <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed font-sans pt-2">
            We believe exceptional interiors are created through a balance of aesthetics, functionality, materials, and light. Every design decision should contribute to a space that feels natural, purposeful, and uniquely yours.
          </p>
        </div>

        {/* Three Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pt-8 border-t border-white/15">
          {principles.map((principle) => (
            <div key={principle.number} className="space-y-4 relative">
              <span className="font-mono text-xs tracking-widest text-[#C2A676]">
                {principle.number}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-normal">
                {principle.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed font-sans font-light">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
