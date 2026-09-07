import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { ContactForm } from '../components/forms/ContactForm';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Copy,
  Check,
  Sparkles,
  Film,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  MessageCircle,
  Radio
} from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { useSound } from '../context/SoundContext';

export const Contact = () => {
  const { setCursor, resetCursor } = useCursor();
  const { playClickTone, playWhoosh } = useSound();
  const [copiedField, setCopiedField] = useState('');

  const handleCopy = (text, fieldName) => {
    playClickTone();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2500);
  };

  return (
    <div className="relative w-full bg-white min-h-screen pt-28 sm:pt-32 pb-20 sm:pb-24 overflow-hidden text-[#0A1128]">
      {/* 1. Cinematic Background: Atmospheric Viewfinder & Transmission Radar */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Cinema Studio Texture */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-multiply filter contrast-125">
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=80"
            alt="Cinema Studio Texture"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>

        {/* Dynamic Warm Golden & Amber Flares */}
        <div className="absolute -top-32 right-1/4 w-[850px] h-[850px] bg-gradient-to-bl from-[#F5C400]/30 via-amber-200/15 to-transparent rounded-full blur-[140px] animate-float-slow" />
        <div className="absolute bottom-10 -left-20 w-[750px] h-[750px] bg-gradient-to-tr from-[#0A1128]/8 via-[#F5C400]/20 to-transparent rounded-full blur-[140px] animate-float-reverse" />
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-amber-300/10 rounded-full blur-[120px] animate-pulse-glow" />

        {/* Rotating Optical Aperture Rings Blueprint */}
        <div className="absolute top-1/4 right-10 w-[700px] h-[700px] rounded-full border border-[#0A1128]/10 animate-spin-slow pointer-events-none opacity-60">
          <div className="absolute inset-16 rounded-full border border-dashed border-[#F5C400]/40" />
          <div className="absolute inset-32 rounded-full border border-dotted border-[#0A1128]/20" />
          <div className="absolute inset-48 rounded-full border border-[#F5C400]/25" />
        </div>

        {/* Anamorphic Flare Beam Sweep */}
        <div className="absolute top-40 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F5C400]/60 to-transparent blur-[0.5px] animate-beam-streak pointer-events-none" />

        {/* Technical Film Camera Viewfinder Overlays & Crosshairs */}
        <div className="absolute top-28 left-6 sm:left-10 w-5 h-5 border-t-2 border-l-2 border-[#F5C400] opacity-80" />
        <div className="absolute top-28 right-6 sm:right-10 w-5 h-5 border-t-2 border-r-2 border-[#F5C400] opacity-80" />
        <div className="absolute bottom-10 left-6 sm:left-10 w-5 h-5 border-b-2 border-l-2 border-[#F5C400] opacity-80" />
        <div className="absolute bottom-10 right-6 sm:right-10 w-5 h-5 border-b-2 border-r-2 border-[#F5C400] opacity-80" />

        {/* Cinema Blueprint Dot Grid */}
        <div className="absolute inset-0 bg-cinema-grid opacity-50" />
        <div className="absolute inset-0 bg-cinema-lines opacity-25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Page Header */}
        <SectionHeader
          number="COMMISSIONS // 2026"
          badge="Initiate Production"
          title="Let's Make Something"
          highlightWord="Matter."
          subtitle="Have a story worth telling, a corporate milestone to celebrate, or a culinary brand to elevate? Direct inquiries connect straight to our executive producer desk."
          className="mb-10 sm:mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Studio Command Hub & Direct Access           */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-6 text-[#0A1128]">
            
            {/* Live Studio Production Status Terminal */}
            <div className="p-6 rounded-3xl bg-amber-50/80 border-2 border-[#F5C400]/60 text-[#0A1128] shadow-sm space-y-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5C400]/20 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-widest text-[#0A1128]">
                    STUDIO STATUS: LIVE
                  </span>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#0A1128]/15 text-[10px] font-mono text-[#0A1128] font-black shadow-xs">
                  Q2-Q3 2026 SLOTS
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-serif font-black text-[#0A1128] leading-snug">
                Accepting Commercial, CSR & Gastronomy Commissions
              </h4>

              <div className="pt-2 border-t border-[#0A1128]/15 flex items-center justify-between text-[11px] font-mono text-[#0A1128] font-bold">
                <span>ACTIVE PRODUCTION SLOTS</span>
                <span className="text-[#060B1A] font-black bg-[#F5C400] px-2.5 py-0.5 rounded-full border border-[#0A1128]/15 shadow-xs">
                  3 / 6 AVAILABLE
                </span>
              </div>
            </div>

            {/* Direct Communications Box */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-sm border-2 border-[#0A1128]/15 shadow-md space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black block">
                  // DIRECT COMMUNICATIONS
                </span>
                <span className="text-[10px] font-mono text-[#0A1128]/60 font-bold">
                  INSTANT DISPATCH
                </span>
              </div>

              {/* Email item */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-[#0A1128] uppercase font-black tracking-wide">
                  Executive Producer & Client Inquiries
                </span>
                <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50/90 border-2 border-[#0A1128]/15 shadow-xs hover:border-[#F5C400] hover:bg-amber-50/40 transition-all duration-200">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#F5C400]/30 text-[#0A1128] flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-[#0A1128]" />
                    </div>
                    <a
                      href="mailto:hello@highlightco.in"
                      className="text-xs sm:text-sm font-black text-[#0A1128] hover:text-[#D4A100] transition-colors truncate font-mono"
                    >
                      hello@highlightco.in
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy('hello@highlightco.in', 'email')}
                    onMouseEnter={() => {
                      setCursor('hover');
                      playWhoosh();
                    }}
                    onMouseLeave={resetCursor}
                    className="p-2 rounded-xl bg-white hover:bg-[#F5C400] border border-[#0A1128]/15 text-[#0A1128] transition-colors flex-shrink-0 cursor-pointer shadow-2xs"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                        <Check size={12} />
                        <span>Copied</span>
                      </span>
                    ) : (
                      <Copy size={15} className="text-[#0A1128]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Production Line / Hotline */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-[#0A1128] uppercase font-black tracking-wide">
                  Hotline / WhatsApp Desk
                </span>
                <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50/90 border-2 border-[#0A1128]/15 shadow-xs hover:border-[#F5C400] hover:bg-amber-50/40 transition-all duration-200">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#F5C400]/30 text-[#0A1128] flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-[#0A1128]" />
                    </div>
                    <a
                      href="tel:+919820012345"
                      className="text-xs sm:text-sm font-black text-[#0A1128] hover:text-[#D4A100] transition-colors truncate font-mono"
                    >
                      +91 98200 12345
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleCopy('+919820012345', 'phone')}
                      onMouseEnter={() => {
                        setCursor('hover');
                        playWhoosh();
                      }}
                      onMouseLeave={resetCursor}
                      className="p-2 rounded-xl bg-white hover:bg-[#F5C400] border border-[#0A1128]/15 text-[#0A1128] transition-colors cursor-pointer shadow-2xs"
                      title="Copy Phone"
                    >
                      {copiedField === 'phone' ? (
                        <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                          <Check size={12} />
                          <span>Copied</span>
                        </span>
                      ) : (
                        <Copy size={15} className="text-[#0A1128]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* WhatsApp Action CTA */}
              <a
                href="https://wa.me/919820012345?text=Hi%20Highlight%20Co.%20team,%20I%20would%20like%20to%20discuss%20a%20new%20film%20project."
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  setCursor('hover');
                  playWhoosh();
                }}
                onMouseLeave={resetCursor}
                className="w-full py-3.5 rounded-2xl bg-[#F5C400] text-[#060B1A] hover:bg-[#FFE042] border-2 border-[#0A1128]/20 transition-all text-xs font-heading font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#F5C400]/25 cursor-pointer"
              >
                <MessageCircle size={16} className="text-[#060B1A]" />
                <span>Chat Direct on WhatsApp</span>
                <ArrowUpRight size={14} className="text-[#060B1A]" />
              </a>

              {/* Physical Soundstages */}
              <div className="pt-4 border-t border-[#0A1128]/10 space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/70 border border-[#0A1128]/10">
                  <div className="w-8 h-8 rounded-xl bg-white border border-[#0A1128]/15 text-[#0A1128] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                    <MapPin size={15} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-black text-[#0A1128] text-sm">
                        Mumbai Studio & Soundstage
                      </h4>
                      <span className="text-[9px] font-mono bg-amber-100 text-[#0A1128] border border-amber-300/80 px-1.5 py-0.2 rounded font-black">
                        HQ
                      </span>
                    </div>
                    <p className="text-xs text-[#0A1128] font-medium mt-0.5 leading-relaxed">
                      Hill Road, Bandra West, Mumbai, Maharashtra 400050
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/70 border border-[#0A1128]/10">
                  <div className="w-8 h-8 rounded-xl bg-white border border-[#0A1128]/15 text-[#0A1128] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                    <MapPin size={15} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-black text-[#0A1128] text-sm">
                        Pune Production & Color Suite
                      </h4>
                      <span className="text-[9px] font-mono bg-slate-200 text-[#0A1128] border border-slate-300 px-1.5 py-0.2 rounded font-black">
                        DAVINCI 8K
                      </span>
                    </div>
                    <p className="text-xs text-[#0A1128] font-medium mt-0.5 leading-relaxed">
                      Lane 5, Koregaon Park, Pune, Maharashtra 411001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SLA / Response Promise & NDA Guarantee */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 sm:p-5 rounded-2xl bg-white text-[#0A1128] border-2 border-[#0A1128]/15 flex flex-col justify-between shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-[#F5C400]/30 border border-[#0A1128]/10 text-[#0A1128] flex items-center justify-center mb-2 font-bold">
                  <Clock size={16} />
                </div>
                <div>
                  <h4 className="font-serif font-black text-[#0A1128] text-xs sm:text-sm">
                    24-Hour Treatment
                  </h4>
                  <p className="text-[11px] text-[#0A1128] font-medium mt-1 leading-snug">
                    Initial creative treatment & ballpark timeline within 1 business day.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white text-[#0A1128] border-2 border-[#0A1128]/15 flex flex-col justify-between shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-700 flex items-center justify-center mb-2 font-bold">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="font-serif font-black text-[#0A1128] text-xs sm:text-sm">
                    Full NDA Standards
                  </h4>
                  <p className="text-[11px] text-[#0A1128] font-medium mt-1 leading-snug">
                    Strict intellectual property protection for unreleased campaigns.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Interactive Production Brief Portal         */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
