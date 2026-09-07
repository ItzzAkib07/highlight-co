import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../common/SectionHeader';
import { servicesData } from '../../data/servicesData';
import { useCursor } from '../../context/CursorContext';
import { useSound } from '../../context/SoundContext';
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';

export const InteractiveServices = () => {
  const [activeService, setActiveService] = useState(servicesData[0]);
  const { setCursor, resetCursor } = useCursor();
  const { playWhoosh, playClickTone } = useSound();

  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-8 md:px-12 bg-white text-[#0A1128] overflow-hidden select-none border-b border-[#0A1128]/10">
      {/* Dynamic Background Media Glow, Aperture Blades & Optical Blueprints */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Subtle Camera Rig & Color Suite Backdrop */}
        <div className="absolute inset-0 opacity-[0.14] mix-blend-multiply filter contrast-110">
          <img
            src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=2000&q=80"
            alt="Color Grading Console Backdrop"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Ambient Light Flares */}
        <div className="absolute top-1/3 -right-10 w-[700px] h-[700px] bg-gradient-to-bl from-[#F5C400]/35 via-amber-300/20 to-transparent rounded-full blur-[140px] animate-float-slow" />
        <div className="absolute bottom-10 -left-10 w-[600px] h-[600px] bg-gradient-to-tr from-[#0A1128]/8 via-[#F5C400]/25 to-transparent rounded-full blur-[140px] animate-float-reverse" />
        
        {/* Rotating Optical Aperture Iris Blueprint Ring */}
        <div className="absolute -bottom-20 right-1/4 w-[750px] h-[750px] rounded-full border border-[#0A1128]/15 animate-spin-slow-reverse pointer-events-none">
          <div className="absolute inset-12 rounded-full border border-dashed border-[#F5C400]/40" />
          <div className="absolute inset-28 rounded-full border border-dotted border-[#0A1128]/20" />
          {/* Aperture Crosshairs */}
          <div className="absolute top-1/2 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F5C400]/40 to-transparent" />
          <div className="absolute inset-y-0 left-1/2 w-[1.5px] bg-gradient-to-b from-transparent via-[#F5C400]/40 to-transparent" />
        </div>

        <div className="absolute inset-0 bg-cinema-grid opacity-60" />
        <div className="absolute inset-0 bg-cinema-lines opacity-35" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20">
          <SectionHeader
            number="02 // CAPABILITIES"
            badge="Production Offerings"
            title="What We"
            highlightWord="Make."
            subtitle="From boardrooms to remote grassroots communities and culinary tasting menus, we build tailored cinematic solutions."
            className="mb-0"
          />

          <MagneticButton
            to="/services"
            variant="outline"
            size="md"
            className="self-start md:self-end border border-[#0A1128]/20 text-[#0A1128] hover:bg-[#F5C400] hover:text-[#060B1A] font-black shadow-sm"
          >
            <span>All Capabilities & Specs</span>
            <ArrowUpRight size={16} />
          </MagneticButton>
        </div>

        {/* Services Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Interactive List */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[#0A1128]/10 border-y border-[#0A1128]/10">
            {servicesData.map((service) => {
              const isCurrent = activeService.id === service.id;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => {
                    setActiveService(service);
                    playWhoosh();
                    setCursor('hover');
                  }}
                  onMouseLeave={resetCursor}
                  onClick={() => {
                    setActiveService(service);
                    playClickTone();
                  }}
                  className={`py-6 sm:py-8 transition-all duration-300 cursor-pointer flex flex-col group ${
                    isCurrent ? 'pl-4 sm:pl-6 border-l-2 border-[#0A1128] bg-slate-50 rounded-r-2xl shadow-sm' : 'hover:pl-2'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className={`font-mono text-sm sm:text-base font-black transition-colors ${
                        isCurrent ? 'text-[#0A1128]' : 'text-[#0A1128]/70 group-hover:text-[#0A1128]'
                      }`}>
                        {service.number}
                      </span>

                      <h3 className={`text-2xl sm:text-3xl md:text-4xl font-serif font-black transition-colors ${
                        isCurrent ? 'text-[#0A1128]' : 'text-[#0A1128] group-hover:text-[#D4A100]'
                      }`}>
                        {service.title}
                      </h3>
                    </div>

                    <ArrowUpRight
                      size={20}
                      className={`transition-all duration-300 ${
                        isCurrent ? 'text-[#0A1128] rotate-45 scale-110 font-bold' : 'text-[#0A1128]/60 group-hover:text-[#0A1128]'
                      }`}
                    />
                  </div>

                  {/* Mobile expansion: Rich Image, Headline, Specs, Capabilities & Direct Link */}
                  {isCurrent && (
                    <div className="mt-4 pt-4 border-t border-[#0A1128]/10 animate-fade-in lg:hidden flex flex-col space-y-4">
                      {/* Live Media Thumbnail */}
                      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#0A1128] shadow-md">
                        <img
                          src={service.image}
                          alt={service.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 via-[#0A1128]/20 to-transparent" />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0A1128]/95 backdrop-blur-md border border-[#F5C400]/50 text-[#F5C400] font-mono text-[11px] font-black shadow-sm">
                          {service.number} // ACTIVE SPEC
                        </div>
                      </div>

                      {/* Headline & Narrative */}
                      <div>
                        <h4 className="text-lg sm:text-xl font-serif font-black text-[#0A1128] leading-snug mb-1.5">
                          {service.headline}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#0A1128]/85 font-medium leading-relaxed">
                          {service.longDescription || service.shortDescription}
                        </p>
                      </div>

                      {/* Capability Bullets */}
                      {service.capabilities && service.capabilities.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-[#0A1128]/10">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-[#0A1128] font-black block">
                            Deliverables & Standards
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {service.capabilities.slice(0, 4).map((cap, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-[#0A1128] font-sans font-bold">
                                <CheckCircle2 size={14} className="text-[#0A1128] flex-shrink-0" />
                                <span>{cap}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Direct Action Link */}
                      <Link
                        to="/services"
                        onClick={playClickTone}
                        className="w-full py-3 rounded-full bg-[#F5C400] text-[#060B1A] font-heading font-black text-xs uppercase tracking-widest text-center hover:bg-[#FFE042] border border-[#0A1128]/20 transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#F5C400]/25 active:scale-95"
                      >
                        <span>Explore {service.title} Specs</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Interactive Showcase Card (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col rounded-3xl overflow-hidden bg-slate-50 border border-[#0A1128]/15 p-8 sticky top-28 shadow-xl animate-fade-in text-[#0A1128]">
            {/* Live Media Thumbnail with Clip Reveal */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 bg-[#0A1128]">
              <img
                src={activeService.image}
                alt={activeService.title}
                className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/70 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#0A1128]/95 backdrop-blur-md border border-[#F5C400]/50 text-[#F5C400] font-mono text-xs font-black">
                {activeService.number} // ACTIVE FOCUS
              </div>
            </div>

            {/* Headline & Narrative */}
            <h4 className="text-xl font-serif font-black text-[#0A1128] mb-2">
              {activeService.headline}
            </h4>

            <p className="text-sm text-[#0A1128] font-medium leading-relaxed mb-6">
              {activeService.longDescription}
            </p>

            {/* Capability Bullets */}
            <div className="space-y-2.5 mb-6 border-t border-[#0A1128]/10 pt-4">
              <span className="text-[11px] uppercase font-mono tracking-widest text-[#0A1128] font-black block">
                Deliverables & Rig Standards
              </span>
              {activeService.capabilities.slice(0, 3).map((cap, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#0A1128] font-sans font-bold">
                  <CheckCircle2 size={14} className="text-[#0A1128] flex-shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>

            {/* Direct Link */}
            <Link
              to="/services"
              onClick={playClickTone}
              className="w-full py-3.5 rounded-full bg-[#F5C400] text-[#060B1A] font-heading font-black text-xs uppercase tracking-widest text-center hover:bg-[#FFE042] border border-[#0A1128]/20 transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#F5C400]/25"
            >
              <span>Explore {activeService.title} Specs</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

