import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { ContactForm } from '../components/forms/ContactForm';
import { Mail, Phone, MapPin, Clock, Copy, Check, Sparkles, Film } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

export const Contact = () => {
  const { setCursor, resetCursor } = useCursor();
  const [copiedField, setCopiedField] = useState('');

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2000);
  };

  return (
    <div className="relative w-full bg-white min-h-screen pt-32 pb-20 select-none overflow-hidden">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 right-1/4 w-[750px] h-[750px] bg-gradient-to-bl from-[#F5C400]/15 via-amber-200/10 to-transparent rounded-full blur-[180px] animate-float-slow pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-[#0A1128]/5 via-[#F5C400]/10 to-transparent rounded-full blur-[160px] animate-float-reverse pointer-events-none" />
        <div className="absolute inset-0 bg-cinema-grid opacity-35" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        {/* Page Header */}
        <SectionHeader
          number="COMMISSIONS // 2026"
          badge="Initiate Production"
          title="Let's Make Something"
          highlightWord="Matter."
          subtitle="Have a story worth telling, a corporate milestone to celebrate, or a culinary brand to elevate? Let's start the conversation."
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Studio Information */}
          <div className="lg:col-span-5 space-y-8 text-[#0A1128]">
            <div className="p-8 rounded-3xl bg-slate-50 border border-[#0A1128]/15 shadow-sm space-y-6">
              <span className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black block">
                // DIRECT COMMUNICATIONS
              </span>

              {/* Email item */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#0A1128]/80 uppercase font-bold">General & Client Inquiries</span>
                <div className="flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-white border border-[#0A1128]/15 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-[#0A1128]" />
                    <a
                      href="mailto:hello@highlightco.in"
                      className="text-sm font-black text-[#0A1128] hover:text-[#D4A100] transition-colors font-sans"
                    >
                      hello@highlightco.in
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy('hello@highlightco.in', 'email')}
                    onMouseEnter={() => setCursor('hover')}
                    onMouseLeave={resetCursor}
                    className="text-[#0A1128] hover:bg-[#F5C400] p-1.5 rounded transition-colors"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? <Check size={14} className="text-[#0A1128]" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Production Line */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#0A1128]/80 uppercase font-bold">Producer Direct Line / WhatsApp</span>
                <div className="flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-white border border-[#0A1128]/15 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-[#0A1128]" />
                    <a
                      href="tel:+919820012345"
                      className="text-sm font-black text-[#0A1128] hover:text-[#D4A100] transition-colors font-sans"
                    >
                      +91 98200 12345
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy('+919820012345', 'phone')}
                    onMouseEnter={() => setCursor('hover')}
                    onMouseLeave={resetCursor}
                    className="text-[#0A1128] hover:bg-[#F5C400] p-1.5 rounded transition-colors"
                    title="Copy Phone"
                  >
                    {copiedField === 'phone' ? <Check size={14} className="text-[#0A1128]" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Studio Locations */}
              <div className="pt-4 border-t border-[#0A1128]/10 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#0A1128] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif font-black text-[#0A1128] text-base">Mumbai Studio & Sound Stage</h4>
                    <p className="text-xs text-[#0A1128] font-medium mt-0.5 leading-relaxed">
                      Hill Road, Bandra West, Mumbai, Maharashtra 400050
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#0A1128] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif font-black text-[#0A1128] text-base">Pune Production & Color Suite</h4>
                    <p className="text-xs text-[#0A1128] font-medium mt-0.5 leading-relaxed">
                      Lane 5, Koregaon Park, Pune, Maharashtra 411001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SLA / Response Promise */}
            <div className="p-6 rounded-3xl bg-white text-[#0A1128] border border-[#0A1128]/15 flex items-center gap-4 shadow-xl">
              <Clock size={24} className="text-[#0A1128] flex-shrink-0" />
              <div>
                <h4 className="font-serif font-black text-[#0A1128] text-sm">24-Hour Brief Response</h4>
                <p className="text-xs text-[#0A1128] font-medium mt-0.5 leading-relaxed">
                  Our executive producer personally reviews every submission with an initial treatment and ballpark schedule within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: React Hook Form Inquiry Portal */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
