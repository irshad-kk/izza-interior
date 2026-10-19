import React, { useState } from 'react';
import { MessageCircle, MapPin, ArrowUpRight, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [projectType, setProjectType] = useState(preselectedService || 'Residential');
  const [projectDetails, setProjectDetails] = useState('');

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  // Update projectType if preselectedService changes
  React.useEffect(() => {
    if (preselectedService) {
      if (preselectedService.includes('Residential')) setProjectType('Residential');
      else if (preselectedService.includes('Villa')) setProjectType('Villa');
      else if (preselectedService.includes('Kitchen')) setProjectType('Kitchen');
      else if (preselectedService.includes('Commercial')) setProjectType('Commercial');
      else setProjectType('Other');
    }
  }, [preselectedService]);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!fullName.trim()) {
      errors.fullName = 'Please provide your full name.';
    }
    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Please provide your phone number.';
    } else if (!/^[0-9+() -]{8,16}$/.test(phoneNumber.trim())) {
      errors.phoneNumber = 'Please enter a valid phone number (e.g. +91 7907225262).';
    }
    return errors;
  };

  const formattedWhatsAppText = () => {
    return encodeURIComponent(
      `*New Interior Design Enquiry — Izza Interior*\n\n` +
      `• *Client Name:* ${fullName}\n` +
      `• *Phone:* ${phoneNumber}\n` +
      `• *Email:* ${emailAddress || 'Not specified'}\n` +
      `• *Project Type:* ${projectType}\n` +
      `• *Location:* Kasaragod / Kerala\n` +
      `• *Project Scope / Details:* ${projectDetails || 'Discussing interior concepts and requirements.'}`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    
    // Open WhatsApp directly with prefilled parameters
    const waUrl = `${COMPANY_INFO.whatsappUrl}?text=${formattedWhatsAppText()}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setSubmissionStatus('success');
  };

  const copyDetailsToClipboard = () => {
    const rawText = 
      `New Interior Design Enquiry — Izza Interior\n` +
      `Client Name: ${fullName}\n` +
      `Phone: ${phoneNumber}\n` +
      `Email: ${emailAddress || 'N/A'}\n` +
      `Project Type: ${projectType}\n` +
      `Details: ${projectDetails || 'N/A'}`;
    
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 sm:mb-20">
          <p className="text-xs tracking-[0.28em] uppercase text-[#8C8275] font-sans font-semibold">
            Let's Create Something Meaningful
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161514] font-normal leading-[1.15]">
            Have a Space in Mind?
          </h2>
          <p className="text-[#48443E] text-base sm:text-lg font-light leading-relaxed">
            Planning a new home, refreshing an existing interior, or designing a commercial space? Tell us about your project, and let's explore the possibilities together.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Studio Details & Direct Action Buttons */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 sm:p-10 bg-[#FAF8F5] border border-[#161514]/15 space-y-6">
              <div>
                <p className="text-[10px] tracking-[0.24em] uppercase text-[#8A8278] mb-1">Office Location</p>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#C2A676] shrink-0 mt-1" />
                  <div>
                    <p className="font-serif text-xl text-[#161514]">Kasaragod, Kerala, India</p>
                    <p className="text-xs text-[#69635B] mt-1 font-sans">
                      Serving Kasaragod, Kannur, Mangalore & Northern Kerala regions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#161514]/10 space-y-4">
                <p className="text-[10px] tracking-[0.24em] uppercase text-[#8A8278]">Telephone Inquiries</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#8A8278] uppercase block">Primary Contact</span>
                      <a
                        href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                        className="font-serif text-lg text-[#161514] hover:text-[#C2A676] transition-colors"
                      >
                        {COMPANY_INFO.primaryPhone}
                      </a>
                    </div>
                    <a
                      href={`tel:${COMPANY_INFO.primaryPhoneRaw}`}
                      className="text-xs uppercase tracking-wider px-3 py-1.5 border border-[#161514]/20 hover:bg-[#161514] hover:text-[#FAF8F5] transition-colors"
                    >
                      Call Now
                    </a>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[11px] text-[#8A8278] uppercase block">Alternative Contact</span>
                      <a
                        href={`tel:${COMPANY_INFO.altPhoneRaw}`}
                        className="font-serif text-lg text-[#161514] hover:text-[#C2A676] transition-colors"
                      >
                        {COMPANY_INFO.altPhone}
                      </a>
                    </div>
                    <a
                      href={`tel:${COMPANY_INFO.altPhoneRaw}`}
                      className="text-xs uppercase tracking-wider px-3 py-1.5 border border-[#161514]/20 hover:bg-[#161514] hover:text-[#FAF8F5] transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Buttons */}
              <div className="pt-6 border-t border-[#161514]/10 space-y-3">
                <p className="text-[10px] tracking-[0.24em] uppercase text-[#8A8278]">Instant Consultation</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`${COMPANY_INFO.whatsappUrl}?text=Hello%20Izza%20Interior%2C%20I%20would%20like%20to%20consult%20regarding%20an%20interior%20project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 py-3 bg-[#161514] text-[#FAF8F5] text-xs uppercase tracking-wider hover:bg-[#32302C] transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#C2A676]" />
                    <span>WhatsApp 1</span>
                  </a>
                  <a
                    href={`${COMPANY_INFO.altWhatsappUrl}?text=Hello%20Izza%20Interior%2C%20I%20would%20like%20to%20consult%20regarding%20an%20interior%20project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 py-3 border border-[#161514]/30 text-[#161514] text-xs uppercase tracking-wider hover:bg-[#FAF8F5] transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#8C8275]" />
                    <span>WhatsApp 2</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#FAF8F5] border border-[#161514]/10">
              <h4 className="font-serif text-lg text-[#161514] mb-1">Direct Principal Attention</h4>
              <p className="text-xs text-[#69635B] leading-relaxed">
                Every project begins with a personal discussion regarding your architectural layout, aesthetic inclinations, and budgetary scope.
              </p>
            </div>
          </div>

          {/* Right Column: Project Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 bg-[#FAF8F5] border border-[#161514]/15 shadow-[0_12px_40px_rgba(22,21,20,0.03)]">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#161514] font-normal mb-2">
                Project Enquiry Form
              </h3>
              <p className="text-xs text-[#69635B] mb-8">
                Share a few details below. Your submission directly configures an architectural enquiry dispatched to our studio principal.
              </p>

              {submissionStatus === 'success' ? (
                <div className="p-6 sm:p-8 bg-[#FAF8F5] border border-[#C2A676] space-y-4 animate-fadeIn">
                  <div className="flex items-center space-x-3 text-[#161514]">
                    <CheckCircle2 className="w-6 h-6 text-[#C2A676]" />
                    <h4 className="font-serif text-2xl">Enquiry Prepared Successfully</h4>
                  </div>
                  <p className="text-sm text-[#48443E] leading-relaxed">
                    WhatsApp has been initiated with your project parameters. If your browser blocked the window or you prefer to send it manually, you can copy the specifications below:
                  </p>
                  
                  <div className="p-4 bg-[#FAF8F5] border border-[#161514]/10 text-xs font-mono text-[#32302C] space-y-1">
                    <p><strong>Name:</strong> {fullName}</p>
                    <p><strong>Phone:</strong> {phoneNumber}</p>
                    <p><strong>Project:</strong> {projectType}</p>
                    {emailAddress && <p><strong>Email:</strong> {emailAddress}</p>}
                    {projectDetails && <p><strong>Notes:</strong> {projectDetails}</p>}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={copyDetailsToClipboard}
                      className="inline-flex items-center space-x-2 px-4 py-2 border border-[#161514]/30 text-xs uppercase tracking-wider text-[#161514] hover:bg-[#FAF8F5] transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied to Clipboard' : 'Copy Message'}</span>
                    </button>
                    <a
                      href={`${COMPANY_INFO.whatsappUrl}?text=${formattedWhatsAppText()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-[#161514] text-[#FAF8F5] text-xs uppercase tracking-wider hover:bg-[#32302C] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#C2A676]" />
                      <span>Open WhatsApp Again</span>
                    </a>
                    <button
                      onClick={() => setSubmissionStatus('idle')}
                      className="text-xs text-[#8A8278] underline hover:text-[#161514] px-2 py-2"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-[#161514] font-medium">
                      Full Name <span className="text-[#C2A676]">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Nambiar"
                      className={`w-full px-4 py-3 bg-[#FAF8F5] border text-sm text-[#161514] placeholder-[#8A8278]/60 focus:bg-white focus:outline-none transition-colors ${
                        formErrors.fullName ? 'border-red-400' : 'border-[#161514]/20 focus:border-[#161514]'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-500 flex items-center space-x-1 pt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label htmlFor="phoneNumber" className="block text-xs uppercase tracking-wider text-[#161514] font-medium">
                        Phone Number <span className="text-[#C2A676]">*</span>
                      </label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g. +91 7907225262"
                        className={`w-full px-4 py-3 bg-[#FAF8F5] border text-sm text-[#161514] placeholder-[#8A8278]/60 focus:bg-white focus:outline-none transition-colors ${
                          formErrors.phoneNumber ? 'border-red-400' : 'border-[#161514]/20 focus:border-[#161514]'
                        }`}
                      />
                      {formErrors.phoneNumber && (
                        <p className="text-[11px] text-red-500 flex items-center space-x-1 pt-0.5">
                          <AlertCircle className="w-3 h-3" />
                          <span>{formErrors.phoneNumber}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="emailAddress" className="block text-xs uppercase tracking-wider text-[#161514] font-medium">
                        Email Address <span className="text-[#8A8278] font-normal">(Optional)</span>
                      </label>
                      <input
                        id="emailAddress"
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#161514]/20 text-sm text-[#161514] placeholder-[#8A8278]/60 focus:bg-white focus:border-[#161514] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="space-y-1.5">
                    <label htmlFor="projectType" className="block text-xs uppercase tracking-wider text-[#161514] font-medium">
                      Project Type <span className="text-[#C2A676]">*</span>
                    </label>
                    <select
                      id="projectType"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#161514]/20 text-sm text-[#161514] focus:bg-white focus:border-[#161514] focus:outline-none transition-colors"
                    >
                      <option value="Residential">Residential Interiors (Individual Home)</option>
                      <option value="Villa">Villa Interiors</option>
                      <option value="Apartment">Apartment Interiors</option>
                      <option value="Kitchen">Kitchen & Wardrobe Design</option>
                      <option value="Commercial">Commercial & Studio Interiors</option>
                      <option value="Other">Other / Full Renovation</option>
                    </select>
                  </div>

                  {/* Brief Project Details */}
                  <div className="space-y-1.5">
                    <label htmlFor="projectDetails" className="block text-xs uppercase tracking-wider text-[#161514] font-medium">
                      Brief Project Details
                    </label>
                    <textarea
                      id="projectDetails"
                      rows={4}
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder="Tell us about the property location, approximate square footage, timeline, or preferred design mood..."
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#161514]/20 text-sm text-[#161514] placeholder-[#8A8278]/60 focus:bg-white focus:border-[#161514] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Notice about direct WhatsApp fallback & submission handling */}
                  <div className="text-[11px] text-[#8A8278] leading-relaxed pt-1">
                    * Submitting this form prepares your specifications and connects directly to our design principal via WhatsApp for immediate review. No spam, guaranteed privacy.
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#161514] hover:bg-[#32302C] text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Submit Enquiry &amp; Connect On WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C2A676]" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
