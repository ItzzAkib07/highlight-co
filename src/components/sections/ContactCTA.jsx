import React from 'react';
import { MagneticButton } from '../common/MagneticButton';
import { ArrowUpRight, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export const ContactCTA = () => {
  return (
    <section className="relative py-28 sm:py-36 px-6 sm:px-8 md:px-12 bg-white overflow-hidden select-none border-t border-[#0A1128]/10 text-[#0A1128]">
      {/* Dynamic Golden Spotlight, Film Studio Imagery & Ambient Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Subtle Cinema Rig Studio Background */}
        <div className="absolute inset-0 opacity-[0.14] mix-blend-multiply filter contrast-110">
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=80"
            alt="Film Studio Rig"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Dramatic Overhead Golden Studio Spotlight Cone */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-gradient-to-b from-[#F5C400]/40 via-amber-200/20 to-transparent blur-[80px]" />

        {/* Floating Warm Golden Flare */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[650px] bg-gradient-to-tr from-[#F5C400]/30 via-[#FFE042]/20 to-transparent rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute -bottom-20 right-10 w-[550px] h-[550px] bg-amber-300/20 rounded-full blur-[140px] animate-float-slow" />

        {/* Viewfinder Corner Crosshairs */}
        <div className="absolute top-10 left-10 w-7 h-7 border-t-2 border-l-2 border-[#F5C400] opacity-100 shadow-sm" />
        <div className="absolute top-10 right-10 w-7 h-7 border-t-2 border-r-2 border-[#F5C400] opacity-100 shadow-sm" />
        <div className="absolute bottom-10 left-10 w-7 h-7 border-b-2 border-l-2 border-[#F5C400] opacity-100 shadow-sm" />
        <div className="absolute bottom-10 right-10 w-7 h-7 border-b-2 border-r-2 border-[#F5C400] opacity-100 shadow-sm" />

        <div className="absolute inset-0 bg-cinema-grid opacity-60" />
        <div className="absolute inset-0 bg-cinema-lines opacity-35" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <span className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black mb-4 inline-block px-4 py-1.5 rounded-full bg-[#F5C400]/20 border border-[#0A1128]/15">
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
            className="px-8 py-4 rounded-full border border-[#0A1128]/15 bg-white hover:bg-[#F5C400] transition-all duration-300 text-[#0A1128] text-sm font-heading font-black tracking-wider uppercase flex items-center gap-2 shadow-sm"
          >
            <Mail size={16} className="text-[#0A1128]" />
            <span>hello@highlightco.in</span>
          </a>
        </div>
      </div>
    </section>
  );
};
