import React from 'react';
import { MagneticButton } from '../common/MagneticButton';
import { ArrowUpRight, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export const ContactCTA = () => {
  return (
    <section className="relative py-28 sm:py-36 px-6 sm:px-8 md:px-12 bg-white overflow-hidden select-none border-t-2 border-[#0A1128] text-[#0A1128]">
      {/* Dynamic Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#F5C400]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <span className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black mb-4 inline-block px-4 py-1.5 rounded-full bg-[#F5C400]/20 border-2 border-[#0A1128]">
          // INITIATE NEXT PROJECT
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black text-[#0A1128] leading-[1.02] tracking-tight uppercase">
          Let's Make <br />
          Something <span className="relative inline-block text-[#060B1A] px-3.5 py-0.5 italic font-serif font-black ml-1"><span className="absolute inset-0 bg-[#F5C400] rounded-sm -rotate-1 shadow-md shadow-[#F5C400]/40" /><span className="relative z-10">Matter.</span></span>
        </h2>

        <p className="mt-8 text-lg sm:text-xl font-sans text-[#0A1128] font-semibold max-w-2xl mx-auto leading-relaxed">
          Whether you need a flagship corporate film, a moving CSR documentary, or a high-speed culinary campaign, our directors and producers are ready to craft your story.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <MagneticButton
            to="/contact"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            <span>Start a Project Brief</span>
            <ArrowUpRight size={18} />
          </MagneticButton>

          <a
            href="mailto:hello@highlightco.in"
            className="px-8 py-4 rounded-full border-2 border-[#0A1128] bg-white hover:bg-[#F5C400] transition-all duration-300 text-[#0A1128] text-sm font-heading font-black tracking-wider uppercase flex items-center gap-2 shadow-sm"
          >
            <Mail size={16} className="text-[#0A1128]" />
            <span>hello@highlightco.in</span>
          </a>
        </div>
      </div>
    </section>
  );
};
