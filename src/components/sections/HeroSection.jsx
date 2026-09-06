import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { HeroScene } from '../three/HeroScene';
import { MagneticButton } from '../common/MagneticButton';
import { VideoModal } from '../common/VideoModal';
import { useCursor } from '../../context/CursorContext';
import { useSound } from '../../context/SoundContext';
import { Play, ArrowDown, Sparkles, ArrowUpRight, Film, Award, Aperture } from 'lucide-react';

export const HeroSection = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const modelDeckRef = useRef(null);

  const [showreelOpen, setShowreelOpen] = useState(false);
  const { setCursor, resetCursor } = useCursor();
  const { playClickTone, playWhoosh } = useSound();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05 });

      // 1. Reveal Left Side Headline & Elements
      tl.fromTo(
        '.hero-pill-badge',
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      )
      .fromTo(
        '.hero-split-line',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        '.hero-tag-pill',
        { opacity: 0, scale: 0.95, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        statsRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      // 2. Reveal Right Side 3D Model Deck
      .fromTo(
        modelDeckRef.current,
        { opacity: 0, scale: 0.92, x: 30 },
        { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power3.out' },
        '-=1.0'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden bg-white select-none text-brand-navy"
    >
      {/* 1. Ambient Dynamic Cinema Background Image & Lighting Flares */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Subtle Cinematic Studio Atmosphere Background Image */}
        <div className="absolute inset-0 opacity-[0.16] mix-blend-multiply filter contrast-110">
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=80"
            alt="Cinema Set Backdrop"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>

        {/* Ambient Warm Golden & Cool Navy Mesh Light Flares with Floating Animations */}
        <div className="absolute -top-10 -left-10 w-[750px] h-[750px] bg-gradient-to-br from-[#F5C400]/40 via-[#FFE042]/20 to-transparent rounded-full blur-[130px] animate-float-slow" />
        <div className="absolute top-1/3 -right-10 w-[700px] h-[700px] bg-gradient-to-bl from-amber-300/35 via-[#F5C400]/20 to-transparent rounded-full blur-[130px] animate-float-reverse" />
        <div className="absolute -bottom-10 left-1/4 w-[600px] h-[600px] bg-[#F5C400]/20 rounded-full blur-[120px] animate-pulse-glow" />

        {/* Anamorphic Lens Flare Beam Sweep */}
        <div className="absolute top-1/3 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#F5C400]/80 to-transparent blur-[1px] animate-beam-streak pointer-events-none" />

        {/* Elegant Cinema Blueprint Dot Grid & Rule of Thirds Viewfinder */}
        <div className="absolute inset-0 bg-cinema-grid opacity-75" />
        <div className="absolute inset-0 bg-cinema-lines opacity-45" />
        <div className="absolute inset-8 sm:inset-12 border border-[#0A1128]/15 rounded-3xl pointer-events-none" />

        {/* Viewfinder Corner Bracket Crosshairs */}
        <div className="absolute top-8 left-8 w-7 h-7 border-t-2 border-l-2 border-[#F5C400] opacity-100 shadow-sm" />
        <div className="absolute top-8 right-8 w-7 h-7 border-t-2 border-r-2 border-[#F5C400] opacity-100 shadow-sm" />
        <div className="absolute bottom-8 left-8 w-7 h-7 border-b-2 border-l-2 border-[#F5C400] opacity-100 shadow-sm" />
        <div className="absolute bottom-8 right-8 w-7 h-7 border-b-2 border-r-2 border-[#F5C400] opacity-100 shadow-sm" />

        {/* Top/Bottom Cinematic Safe Frame Marks */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[10px] font-mono tracking-[0.3em] uppercase text-[#0A1128]/80 font-black">
          <span>FRAME 2.39:1</span>
          <span className="text-[#F5C400]">•</span>
          <span>ARRI ALEXA MINI LF</span>
          <span className="text-[#F5C400]">•</span>
          <span>8K PRORES 4444 XQ</span>
        </div>
      </div>

      {/* 2. Main Hero Content: Two-Column Split Layout */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto my-auto py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: All Cinematic Details & Editorial Typography */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Live Production Radar Badge */}
            <div className="hero-pill-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#0A1128]/15 bg-white text-[#0A1128] shadow-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5C400] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5C400]" />
              </span>
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#0A1128] font-black">
                HIGHLIGHT CO. // 2026 PRODUCTION REEL
              </span>
            </div>

            {/* Monumental Editorial Headline with 3D Split Reveal */}
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-6xl md:text-7xl xl:text-[5.2rem] 2xl:text-[5.8rem] font-serif font-black text-[#0A1128] leading-[1.02] tracking-tight uppercase"
            >
              <div className="overflow-hidden py-0.5">
                <span className="hero-split-line block text-[#0A1128] font-black">
                  Craft Films
                </span>
              </div>
              <div className="overflow-hidden py-0.5">
                <span className="hero-split-line block text-[#0A1128] font-black">
                  & Campaigns
                </span>
              </div>
              <div className="overflow-hidden py-0.5">
                <span className="hero-split-line block text-[#0A1128] font-black">
                  That{' '}
                  <span className="relative inline-block ml-1 group/heroHighlight cursor-default">
                    <span className="relative z-10 text-[#060B1A] px-3.5 py-0.5 inline-block italic font-serif font-black transition-transform duration-300 group-hover/heroHighlight:scale-105">
                      <span className="absolute inset-0 bg-[#F5C400] rounded-sm -rotate-1 shadow-lg shadow-[#F5C400]/40 group-hover/heroHighlight:rotate-0 group-hover/heroHighlight:shadow-xl group-hover/heroHighlight:shadow-[#F5C400]/60 transition-all duration-300" />
                      <span className="relative z-10 text-[#060B1A] font-serif italic font-black">Matter.</span>
                    </span>
                  </span>
                </span>
              </div>
            </h1>

            {/* Subtext Paragraph */}
            <div ref={subtextRef} className="mt-6 max-w-2xl">
              <p className="text-base sm:text-lg md:text-xl font-sans text-[#0A1128] font-semibold leading-relaxed">
                We partner with visionary enterprises, luxury brands, and global causes to translate bold ideas into award-winning visual cinema.
              </p>
            </div>

            {/* Featured Capabilities Tag Strip */}
            <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
              {[
                'Brand Commercials',
                'CSR Documentaries',
                'Michelin F&B Cinema',
                'Anamorphic 8K VFX'
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="hero-tag-pill px-3.5 py-1.5 rounded-full text-xs font-mono font-black text-[#0A1128] bg-white border border-[#0A1128]/15 hover:bg-[#F5C400] transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>

            {/* Dual High-Impact Action CTAs */}
            <div
              ref={ctaRef}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6 w-full sm:w-auto"
            >
              <MagneticButton
                to="/work"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-md shadow-[#F5C400]/25 bg-[#F5C400] text-[#060B1A] font-black border border-[#0A1128]/20 hover:bg-[#FFE042]"
              >
                <span>Explore Selected Work</span>
                <ArrowUpRight size={18} />
              </MagneticButton>

              {/* Watch Showreel Button */}
              <button
                onClick={() => {
                  playClickTone();
                  setShowreelOpen(true);
                }}
                onMouseEnter={() => {
                  setCursor('play', 'PLAY');
                  playWhoosh();
                }}
                onMouseLeave={resetCursor}
                className="flex items-center gap-3.5 px-6 py-4 rounded-full border border-[#0A1128]/15 bg-white hover:bg-slate-50 transition-all duration-300 text-[#0A1128] group w-full sm:w-auto justify-center shadow-sm backdrop-blur-xl font-bold"
              >
                <div className="w-9 h-9 rounded-full bg-[#F5C400] text-[#060B1A] border border-[#0A1128]/20 flex items-center justify-center shadow-sm shadow-[#F5C400]/30 group-hover:scale-110 transition-transform">
                  <Play size={15} className="ml-0.5 fill-current" />
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs uppercase font-heading tracking-widest font-black text-[#0A1128] group-hover:text-[#060B1A] transition-colors">
                    Watch 2026 Showreel
                  </span>
                  <span className="text-[10px] font-mono text-[#0A1128] font-bold">
                    02:15 MIN // 4K MASTER HDR
                  </span>
                </div>
              </button>
            </div>

            {/* Live Proof Metrics Strip */}
            <div
              ref={statsRef}
              className="mt-10 pt-6 border-t border-[#0A1128]/10 grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-xl"
            >
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-black text-[#0A1128]">
                  50+
                </div>
                <div className="text-[11px] font-mono text-[#0A1128] uppercase tracking-wider mt-0.5 font-bold">
                  Films Produced
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-black text-[#0A1128]">
                  18M+
                </div>
                <div className="text-[11px] font-mono text-[#0A1128] uppercase tracking-wider mt-0.5 font-bold">
                  Global Impressions
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-black text-[#0A1128]">
                  12
                </div>
                <div className="text-[11px] font-mono text-[#0A1128] uppercase tracking-wider mt-0.5 font-bold">
                  Cannes & Film Laurels
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: 3D Interactive Model & Holographic Deck    */}
          {/* ========================================================= */}
          <div
            ref={modelDeckRef}
            className="lg:col-span-5 relative w-full flex flex-col items-center justify-center mt-6 lg:mt-0"
          >
            {/* Holographic 3D Viewport Deck Frame */}
            <div className="relative w-full max-w-[540px] lg:max-w-none aspect-square sm:aspect-[4/3] lg:aspect-[4/4.2] rounded-3xl overflow-hidden bg-white border border-[#0A1128]/15 shadow-xl transition-all duration-500 group">
              
              {/* Top Camera HUD Overlay */}
              <div className="absolute top-0 inset-x-0 z-20 px-5 py-4 flex items-center justify-between border-b border-[#0A1128]/10 bg-white/95 backdrop-blur-md text-[11px] font-mono text-[#0A1128]">
                <div className="flex items-center gap-2 text-rose-600">
                  <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                  <span className="font-black tracking-wider">● REC [00:24:18:09]</span>
                </div>
                <div className="flex items-center gap-3 text-[#0A1128] font-black">
                  <span className="bg-[#F5C400]/30 px-2 py-0.5 rounded border border-[#0A1128]/20">8K RAW // 120 FPS</span>
                  <span>•</span>
                  <span>T1.3 ANAMORPHIC</span>
                </div>
              </div>

              {/* Center 3D Interactive Canvas Scene */}
              <div className="w-full h-full pt-10 pb-16 flex items-center justify-center">
                <HeroScene />
              </div>

              {/* Viewport Tech Corner Markers */}
              <div className="absolute top-14 left-4 w-4 h-4 border-t border-l border-[#0A1128]/30 pointer-events-none" />
              <div className="absolute top-14 right-4 w-4 h-4 border-t border-r border-[#0A1128]/30 pointer-events-none" />
              <div className="absolute bottom-20 left-4 w-4 h-4 border-b border-l border-[#0A1128]/30 pointer-events-none" />
              <div className="absolute bottom-20 right-4 w-4 h-4 border-b border-r border-[#0A1128]/30 pointer-events-none" />

              {/* Bottom Interactive Floating HUD Card */}
              <div className="absolute bottom-0 inset-x-0 z-20 px-5 py-3.5 border-t border-[#0A1128]/10 bg-white/95 backdrop-blur-xl flex items-center justify-between text-[#0A1128]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F5C400]/30 border border-[#0A1128]/20 text-[#0A1128] flex items-center justify-center">
                    <Aperture size={16} className="animate-[spin_8s_linear_infinite]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-mono font-black text-[#0A1128]">
                      CINEMA RIG // ARRI ALEXA MINI LF
                    </div>
                    <div className="text-[10px] font-mono text-[#0A1128]/80 font-bold">
                      INTERACTIVE 3D CAMERA • HOVER & ORBIT
                    </div>
                  </div>
                </div>

                {/* Animated Audio Equalizer Bars */}
                <div className="flex items-end gap-0.5 h-4">
                  <span className="w-1 bg-[#0A1128] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
                  <span className="w-1 bg-[#0A1128] rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-4" />
                  <span className="w-1 bg-[#0A1128] rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-2" />
                  <span className="w-1 bg-[#0A1128] rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-3.5" />
                </div>
              </div>

            </div>

            {/* Glowing Backdrop Aura underneath the 3D frame */}
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-yellow/20 via-amber-400/10 to-brand-navy/10 rounded-3xl blur-2xl -z-10 opacity-70 pointer-events-none" />
          </div>

        </div>
      </div>

      {/* 3. Bottom Status Ticker & Global Commission Availability */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto pt-4 border-t border-[#0A1128]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#0A1128]">
        <div className="flex items-center gap-4">
          <span className="text-[#0A1128] font-black flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F5C400] animate-pulse" />
            MUMBAI & PUNE STUDIOS
          </span>
          <span className="hidden sm:inline text-[#0A1128]/30">|</span>
          <span className="text-[#0A1128] font-bold">AVAILABLE FOR WORLDWIDE COMMISSIONS</span>
        </div>

        <div className="flex items-center gap-2 text-[#0A1128] font-black animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-heading font-black text-[#0A1128]">
            Scroll To Explore
          </span>
          <ArrowDown size={14} className="text-[#0A1128]" />
        </div>
      </div>

      {/* Master Showreel Modal */}
      <VideoModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        videoUrl="https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-with-care-42867-large.mp4"
        title="Highlight Co. Master Showreel 2026"
        category="Studio Showreel"
      />
    </section>
  );
};
