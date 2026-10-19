import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CinematicWalkthrough } from './components/CinematicWalkthrough';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsGallery } from './components/ProjectsGallery';
import { PhilosophySection } from './components/PhilosophySection';
import { ProcessSection } from './components/ProcessSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from './data/content';

export const App: React.FC = () => {
  const [selectedServiceForEnquiry, setSelectedServiceForEnquiry] = useState<string>('');

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForEnquiry(serviceName);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#161514] selection:bg-[#DDD3C1] selection:text-[#161514]">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main>
        {/* Section 2 — Cinematic Interior Walkthrough Experience */}
        <CinematicWalkthrough />

        {/* Section 3 — About Izza Interior */}
        <AboutSection />

        {/* Section 4 — Our Services */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Section 5 — Featured Projects */}
        <ProjectsGallery onSelectProjectForEnquiry={handleSelectService} />

        {/* Section 6 — Our Design Philosophy */}
        <PhilosophySection />

        {/* Section 7 — Our Process */}
        <ProcessSection />

        {/* Section 8 — Why Choose Izza Interior? */}
        <WhyChooseUsSection />

        {/* Section 9 — Contact & Project Enquiry */}
        <ContactSection preselectedService={selectedServiceForEnquiry} />
      </main>

      {/* Section 10 — Footer */}
      <Footer />

      {/* Floating Instant WhatsApp Button */}
      <aside aria-label="Instant consultation" className="fixed bottom-6 right-6 z-40 flex items-center space-x-2">
        <a
          href={`${COMPANY_INFO.whatsappUrl}?text=Hello%20Izza%20Interior%2C%20I%20would%20like%20to%20discuss%20an%20interior%20architecture%20project.`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2.5 px-4 py-3 bg-[#161514] text-[#FAF8F5] border border-[#C2A676]/40 shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:bg-[#2C2926] hover:border-[#C2A676] transition-all duration-300"
          aria-label="Chat with Izza Interior on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-4 h-4 text-[#C2A676]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <span className="text-xs uppercase tracking-widest font-sans hidden sm:inline-block">
            Consult Principal
          </span>
        </a>
      </aside>
    </div>
  );
};

export default App;
