import React, { useEffect } from 'react';
import { X, ArrowRight, MapPin, Layers, Palette } from 'lucide-react';
import { type Project, COMPANY_INFO } from '../data/content';

interface ProjectLightboxModalProps {
  project: Project | null;
  onClose: () => void;
  onEnquire?: (projectName: string) => void;
}

export const ProjectLightboxModal: React.FC<ProjectLightboxModalProps> = ({
  project,
  onClose,
  onEnquire,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#161514]/85 backdrop-blur-md animate-fadeIn">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-5xl bg-[#FAF8F5] border border-[#161514]/15 shadow-[0_25px_60px_rgba(0,0,0,0.3)] overflow-hidden max-h-[92vh] flex flex-col lg:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-[#FAF8F5]/90 hover:bg-[#161514] text-[#161514] hover:text-[#FAF8F5] rounded-full border border-[#161514]/10 transition-colors"
          aria-label="Close project view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: High-res project photograph */}
        <div className="w-full lg:w-3/5 relative bg-[#11100F] min-h-[360px] lg:min-h-[580px] overflow-hidden flex items-center justify-center p-2 sm:p-4">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full max-h-[72vh] object-contain"
          />
          <div className="absolute bottom-4 left-4 bg-[#161514]/90 text-[#FAF8F5] text-[10px] tracking-widest px-3 py-1 uppercase backdrop-blur-sm border border-white/10">
            {project.category}
          </div>
          <div className="absolute top-4 left-4 bg-[#C2A676] text-[#161514] text-[9px] font-semibold tracking-widest px-2.5 py-1 uppercase">
            Completed Project
          </div>
        </div>

        {/* Right: Project details & Materiality */}
        <div className="w-full lg:w-2/5 p-6 sm:p-8 lg:p-10 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <div className="flex items-center space-x-1.5 text-xs text-[#8A8278] tracking-widest uppercase mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#C2A676]" />
                <span>{project.location}</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#161514] font-normal">
                {project.title}
              </h3>
            </div>

            <p className="text-sm text-[#48443E] leading-relaxed font-sans">
              {project.description}
            </p>

            {/* Real project attribution tag */}
            <div className="p-3 bg-[#FAF8F5] border border-[#C2A676]/40 text-[#48443E] space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-[#C2A676] font-semibold">
                Executed by Izza Interior
              </p>
              <p className="text-[11px] text-[#5C554D] leading-relaxed font-sans">
                Realized on-site project designed and delivered by founders Abdul Shareef T &amp; Mohammed Noufal Y in Kasaragod, Kerala.
              </p>
            </div>

            {/* Architectural Materials */}
            <div className="space-y-2 pt-2 border-t border-[#161514]/10">
              <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-[#161514] uppercase">
                <Layers className="w-3.5 h-3.5 text-[#C2A676]" />
                <span>Specified Materials</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.materials.map((mat) => (
                  <span
                    key={mat}
                    className="text-[11px] px-2.5 py-1 bg-[#FAF8F5] border border-[#161514]/15 text-[#48443E]"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-[#161514] uppercase">
                <Palette className="w-3.5 h-3.5 text-[#C2A676]" />
                <span>Palette Inspiration</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.palette.map((color) => (
                  <span
                    key={color}
                    className="text-[11px] px-2.5 py-1 bg-[#EAE2D5]/50 border border-[#161514]/10 text-[#161514]"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-[#161514]/10 space-y-3">
            <a
              href="#contact"
              onClick={() => {
                onClose();
                if (onEnquire) onEnquire(project.title);
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-[#161514] text-[#FAF8F5] text-xs tracking-widest uppercase hover:bg-[#32302C] transition-colors"
            >
              <span>Enquire For Similar Interior</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C2A676]" />
            </a>

            <a
              href={`${COMPANY_INFO.whatsappUrl}?text=Hello%20Izza%20Interior%2C%20I%20love%20the%20design%20of%20${encodeURIComponent(project.title)}%20and%20want%20to%20discuss%20a%20similar%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-2.5 border border-[#161514]/20 text-[#161514] text-xs tracking-widest uppercase hover:bg-[#FAF8F5] transition-colors"
            >
              <span>Discuss On WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
