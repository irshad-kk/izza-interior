import React, { useState } from 'react';
import { ArrowUpRight, Eye } from 'lucide-react';
import { PROJECTS, type Project } from '../data/content';
import { ProjectLightboxModal } from './ProjectLightboxModal';

interface ProjectsGalleryProps {
  onSelectProjectForEnquiry?: (projectName: string) => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ onSelectProjectForEnquiry }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    'All',
    'Living Spaces',
    'Bedroom Interiors',
    'Luxury Residential Interiors'
  ];

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 sm:py-32 bg-[#FAF8F5] relative border-b border-[#161514]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header and Filter Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2">
              <span className="w-6 h-[1.5px] bg-[#C2A676]" />
              <p className="text-xs tracking-[0.28em] uppercase text-[#8C8275] font-sans font-semibold">
                Completed Commissions
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161514] font-normal leading-[1.15]">
              Real Spaces. <br className="hidden sm:inline" />
              <span className="italic font-light text-[#48443E]">Exquisite Execution.</span>
            </h2>
            <p className="text-[#48443E] text-base sm:text-lg font-light leading-relaxed">
              Explore our completed residential and interior architecture projects across Kasaragod and Kerala, showcasing bespoke craftsmanship, honest materiality, and atmospheric lighting.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300 border ${
                  activeFilter === cat
                    ? 'border-[#161514] bg-[#161514] text-[#FAF8F5]'
                    : 'border-[#161514]/15 bg-transparent text-[#69635B] hover:text-[#161514] hover:border-[#161514]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Editorial Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {filteredProjects.map((project, index) => {
            // Balanced editorial layout: top 2 items (7/5 split), next 3 items (4/4/4 equal split)
            const colSpan = (filteredProjects.length === 5 && (index === 0 || index === 1))
              ? (index === 0 ? 'md:col-span-7' : 'md:col-span-5')
              : (filteredProjects.length === 5 ? 'md:col-span-4' : (index % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4'));

            return (
              <div
                key={project.id}
                className={`${colSpan} group cursor-pointer flex flex-col justify-between`}
                onClick={() => setSelectedProject(project)}
              >
                {/* Image Container with portrait framing */}
                <div className="relative overflow-hidden bg-[#EFEBE5] border border-[#161514]/10 h-[440px] sm:h-[500px] lg:h-[540px]">
                  <img
                    src={project.image}
                    alt={`${project.title} - Izza Interior completed project`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Subtle dark gradient on hover */}
                  <div className="absolute inset-0 bg-[#161514]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center space-x-2 px-4 py-2 bg-[#FAF8F5]/95 backdrop-blur-md text-xs uppercase tracking-widest text-[#161514] font-medium border border-[#161514]/15 shadow-lg">
                      <Eye className="w-3.5 h-3.5 text-[#C2A676]" />
                      <span>View Project Details</span>
                    </span>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 bg-[#FAF8F5]/90 backdrop-blur-md px-3 py-1 text-[10px] tracking-widest text-[#69635B] uppercase font-sans border border-[#161514]/10">
                    {project.category}
                  </div>

                  {/* Realized Tag */}
                  <div className="absolute top-4 right-4 bg-[#161514]/85 backdrop-blur-md px-2.5 py-1 text-[9px] tracking-widest text-[#C2A676] uppercase font-sans font-medium">
                    Completed Project
                  </div>
                </div>

                {/* Project Metadata */}
                <div className="pt-4 pb-2 flex items-baseline justify-between border-b border-[#161514]/10">
                  <div>
                    <h3 className="font-serif text-2xl text-[#161514] font-normal group-hover:text-[#8C8275] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#8A8278] tracking-wider uppercase mt-0.5">
                      {project.location}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-[#161514]/15 flex items-center justify-center group-hover:bg-[#161514] group-hover:text-[#FAF8F5] transition-colors shrink-0 ml-4">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Completed Notice */}
        <div className="mt-16 pt-8 border-t border-[#161514]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#8A8278] gap-4">
          <p className="italic">
            * Authentic completed interior architecture commissions executed on-site by Izza Interior across Kasaragod and surrounding Kerala districts.
          </p>
          <a
            href="#contact"
            className="uppercase tracking-widest text-[#161514] hover:text-[#C2A676] font-medium transition-colors inline-flex items-center space-x-1"
          >
            <span>Commission a Project with Our Founders</span>
            <span>&rarr;</span>
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      <ProjectLightboxModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEnquire={(title) => {
          if (onSelectProjectForEnquiry) {
            onSelectProjectForEnquiry(title);
          }
        }}
      />
    </section>
  );
};
