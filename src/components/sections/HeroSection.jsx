import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { HeroScene } from '../three/HeroScene';
import { MagneticButton } from '../common/MagneticButton';
import { VideoModal } from '../common/VideoModal';
import { useCursor } from '../../context/CursorContext';
import { useSound } from '../../context/SoundContext';
import { Play, ArrowDown, Sparkles, ArrowUpRight, Film, Rotate3d, Aperture } from 'lucide-react';

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

      // Reveal Left Side Headline & Elements smoothly
      tl.fromTo(
        '.hero-split-line',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' }
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        '.hero-tag-pill',
        { opacity: 0, scale: 0.95, y: 8 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(
        statsRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      )
      // Reveal 3D Model Deck
      .fromTo(
        modelDeckRef.current,
        { opacity: 0, scale: 0.95, x: 20 },
        { opacity: 1, scale: 1, x: 0, duration: 1.0, ease: 'power3.out' },
        '-=0.8'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-6 sm:pb-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden bg-white select-none text-brand-navy"
    >
      {/* 1. Ambient Dynamic Cinema Background: Atmospheric Lens Optical Suite */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Subtle Cinema Studio Stage Atmosphere */}
        <div className="absolute inset-0 opacity-[0.16] mix-blend-multiply filter contrast-125">
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=80"
            alt="Cinema Set Backdrop"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>

        {/* Dynamic Warm Golden Optical Glows & Prismatic Flares */}
        <div className="absolute -top-20 -left-20 w-[750px] h-[750px] bg-gradient-to-br from-[#F5C400]/30 via-amber-300/15 to-transparent rounded-full blur-[140px] animate-float-slow" />
        <div className="absolute top-1/4 -right-16 w-[700px] h-[700px] bg-gradient-to-bl from-amber-200/25 via-[#F5C400]/20 to-transparent rounded-full blur-[140px] animate-float-reverse" />
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[600px] bg-[#F5C400]/15 rounded-full blur-[130px] animate-pulse-glow" />

        {/* Optical Lens Blueprint Rings & Aperture Geometry */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full border border-[#0A1128]/10 animate-spin-slow pointer-events-none opacity-70">
          <div className="absolute inset-16 rounded-full border border-dashed border-[#F5C400]/35" />
          <div className="absolute inset-36 rounded-full border border-dotted border-[#0A1128]/15" />
          <div className="absolute inset-56 rounded-full border border-[#F5C400]/25" />
        </div>

        {/* Anamorphic Lens Flare Beam Sweep */}
        <div className="absolute top-1/3 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F5C400]/75 to-transparent blur-[0.5px] animate-beam-streak pointer-events-none" />

        {/* Technical Film Camera Viewfinder Overlays & Crosshairs */}
        <div className="absolute inset-6 sm:inset-10 border border-[#0A1128]/10 rounded-3xl pointer-events-none hidden md:block">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-white text-[10px] font-mono uppercase tracking-[0.25em] text-[#0A1128]/60 font-black">
            2.39:1 CINEMASCOPE • MASTER APERTURE T1.3
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-3 bg-white text-[10px] font-mono uppercase tracking-[0.2em] text-[#0A1128]/60 font-bold">
            ARRI RAW 8K • 24.000 FPS • TIME: 00:04:18:22
          </div>
        </div>

        {/* Vertical Film Edge Perforation Metadata */}
        <div className="hidden lg:flex absolute left-4 inset-y-0 flex-col justify-around py-16 text-[9px] font-mono text-[#0A1128]/35 uppercase tracking-[0.3em] font-black pointer-events-none select-none">
          <span className="rotate-90">● 35MM 5219</span>
          <span className="rotate-90">16+ STOPS</span>
          <span className="rotate-90">● REC.709</span>
        </div>

        {/* Viewfinder Corner Crosshairs */}
        <div className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-[#F5C400] opacity-80" />
        <div className="absolute top-6 right-6 w-5 h-5 border-t-2 border-r-2 border-[#F5C400] opacity-80" />
        <div className="absolute bottom-6 left-6 w-5 h-5 border-b-2 border-l-2 border-[#F5C400] opacity-80" />
        <div className="absolute bottom-6 right-6 w-5 h-5 border-b-2 border-r-2 border-[#F5C400] opacity-80" />

        {/* Grid & Cinema Lines */}
        <div className="absolute inset-0 bg-cinema-grid opacity-50" />
        <div className="absolute inset-0 bg-cinema-lines opacity-25" />
      </div>

      {/* 2. Main Hero Content: Two-Column Split Layout */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto my-auto py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Minimal & Meaningful Editorial Content       */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            
            {/* Monumental Editorial Headline */}
            <h1
              ref={headlineRef}
              className="text-3xl sm:text-5xl md:text-6xl xl:text-[4.4rem] 2xl:text-[4.8rem] font-serif font-black text-[#0A1128] leading-[1.04] tracking-tight uppercase"
            >
              <div className="overflow-hidden py-0.5">
                <span className="hero-split-line block text-[#0A1128] font-black">
                  Visual Cinema
                </span>
              </div>
              <div className="overflow-hidden py-0.5">
                <span className="hero-split-line block text-[#0A1128] font-black">
                  & Campaigns That{' '}
                  <span className="relative inline-block ml-1 group/heroHighlight cursor-default">
                    <span className="relative z-10 text-[#060B1A] px-2.5 sm:px-3 py-0.5 inline-block italic font-serif font-black transition-transform duration-300 group-hover/heroHighlight:scale-105">
                      <span className="absolute inset-0 bg-[#F5C400] rounded-sm -rotate-1 shadow-md shadow-[#F5C400]/40 group-hover/heroHighlight:rotate-0 transition-all duration-300" />
                      <span className="relative z-10 text-[#060B1A] font-serif italic font-black">Matter.</span>
                    </span>
                  </span>
                </span>
              </div>
            </h1>

            {/* Meaningful, Clear Subtitle */}
            <div ref={subtextRef} className="mt-3.5 sm:mt-4 max-w-xl">
              <p className="text-sm sm:text-base font-sans text-[#0A1128]/85 font-medium leading-relaxed">
                We direct high-impact commercials, branded documentaries, and digital experiences with optical precision and cinematic craft.
              </p>
            </div>

            {/* Streamlined Capabilities Tags */}
            <div className="mt-3.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
              {[
                'Commercials',
                'Documentaries',
                'Anamorphic 8K',
                'Color Grading'
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="hero-tag-pill px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold text-[#0A1128] bg-slate-50 border border-[#0A1128]/10 hover:bg-[#F5C400]/20 hover:border-[#0A1128]/20 transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>

            {/* Responsive, Minimal Action CTAs */}
            <div
              ref={ctaRef}
              className="mt-5 sm:mt-6 flex flex-row flex-wrap items-center gap-2.5 sm:gap-3 w-auto"
            >
              <MagneticButton
                to="/work"
                variant="primary"
                size="sm"
                className="shadow-sm shadow-[#F5C400]/25 bg-[#F5C400] text-[#060B1A] font-black border border-[#0A1128]/20 hover:bg-[#FFE042] px-3.5 sm:px-4.5 py-2 sm:py-2.5 text-xs font-heading uppercase tracking-wider whitespace-nowrap"
              >
                <span>Explore Work</span>
                <ArrowUpRight size={13} className="flex-shrink-0" />
              </MagneticButton>

              {/* Minimal Watch Showreel Button */}
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
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-[#0A1128]/15 bg-white hover:bg-slate-50 transition-all duration-300 text-[#0A1128] shadow-xs font-bold active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#F5C400] text-[#060B1A] flex items-center justify-center shadow-xs flex-shrink-0">
                  <Play size={10} className="ml-0.5 fill-current" />
                </div>
                <span className="text-xs font-heading font-black tracking-wider uppercase text-[#0A1128]">
                  Watch Reel
                </span>
                <span className="text-[10px] font-mono text-[#0A1128]/60 font-bold hidden xs:inline sm:inline">
                  02:15
                </span>
              </button>
            </div>

            {/* Minimalist Metrics Strip */}
            <div
              ref={statsRef}
              className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-[#0A1128]/10 grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-md text-left"
            >
              <div>
                <div className="font-serif text-lg sm:text-xl font-black text-[#0A1128]">
                  50+
                </div>
                <div className="text-[10px] font-mono text-[#0A1128]/70 uppercase tracking-wider mt-0.5 font-bold">
                  Films Produced
                </div>
              </div>

              <div>
                <div className="font-serif text-lg sm:text-xl font-black text-[#0A1128]">
                  18M+
                </div>
                <div className="text-[10px] font-mono text-[#0A1128]/70 uppercase tracking-wider mt-0.5 font-bold">
                  Impressions
                </div>
              </div>

              <div>
                <div className="font-serif text-lg sm:text-xl font-black text-[#0A1128]">
                  12
                </div>
                <div className="text-[10px] font-mono text-[#0A1128]/70 uppercase tracking-wider mt-0.5 font-bold">
                  Global Laurels
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: 360-Degree Interactive 3D Camera Model Deck */}
          {/* ========================================================= */}
          <div
            ref={modelDeckRef}
            className="lg:col-span-6 xl:col-span-6 relative w-full flex flex-col items-center justify-center mt-4 lg:mt-0"
          >
            {/* Viewport Deck Frame */}
            <div className="relative w-full max-w-[580px] lg:max-w-none aspect-[4/3.2] sm:aspect-[4/3] lg:aspect-[4/3.4] xl:aspect-[1.18/1] rounded-3xl overflow-hidden bg-white border border-[#0A1128]/15 shadow-2xl transition-all duration-500 group">
              
              {/* Top Camera HUD Overlay */}
              <div className="absolute top-0 inset-x-0 z-20 px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between border-b border-[#0A1128]/10 bg-white/95 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-[#0A1128]">
                <div className="flex items-center gap-2 text-rose-600 font-black">
                  <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                  <span>● REC 8K RAW</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-[#0A1128]">
                  <span className="bg-[#F5C400]/25 px-2 py-0.5 rounded border border-[#0A1128]/15 font-black text-[10px]">
                    120 FPS
                  </span>
                  <span>•</span>
                  <span>T1.3 ANAMORPHIC</span>
                </div>
              </div>

              {/* Center 3D Interactive Canvas with 360 Drag & Orbit Controls */}
              <div className="w-full h-full pt-8 pb-12 flex items-center justify-center cursor-grab active:cursor-grabbing">
                <HeroScene />
              </div>

              {/* Viewport Tech Corner Markers */}
              <div className="absolute top-12 left-3.5 w-3.5 h-3.5 border-t border-l border-[#0A1128]/30 pointer-events-none" />
              <div className="absolute top-12 right-3.5 w-3.5 h-3.5 border-t border-r border-[#0A1128]/30 pointer-events-none" />
              <div className="absolute bottom-14 left-3.5 w-3.5 h-3.5 border-b border-l border-[#0A1128]/30 pointer-events-none" />
              <div className="absolute bottom-14 right-3.5 w-3.5 h-3.5 border-b border-r border-[#0A1128]/30 pointer-events-none" />

              {/* Bottom 360 Interactive HUD Bar */}
              <div className="absolute bottom-0 inset-x-0 z-20 px-4 sm:px-5 py-2.5 sm:py-3 border-t border-[#0A1128]/10 bg-white/95 backdrop-blur-xl flex items-center justify-between text-[#0A1128]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#F5C400]/30 border border-[#0A1128]/15 text-[#0A1128] flex items-center justify-center">
                    <Rotate3d size={15} className="animate-spin-slow" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] sm:text-xs font-mono font-black text-[#0A1128]">
                      ARRI ALEXA MINI LF
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-[#0A1128]/70 font-bold">
                      360° INTERACTIVE • DRAG TO ROTATE
                    </div>
                  </div>
                </div>

                {/* Animated Audio Equalizer Bars */}
                <div className="flex items-end gap-0.5 h-3.5">
                  <span className="w-0.5 bg-[#0A1128] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2.5" />
                  <span className="w-0.5 bg-[#0A1128] rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-3.5" />
                  <span className="w-0.5 bg-[#0A1128] rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-1.5" />
                  <span className="w-0.5 bg-[#0A1128] rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-3" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 3. Bottom Status Ticker & Global Commission Availability */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto pt-3 sm:pt-4 border-t border-[#0A1128]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#0A1128]">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-[#0A1128] font-black flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-[#F5C400] animate-pulse" />
            MUMBAI & PUNE STUDIOS
          </span>
          <span className="hidden sm:inline text-[#0A1128]/30">|</span>
          <span className="hidden sm:inline text-[#0A1128]/70 font-bold text-[11px]">
            WORLDWIDE PRODUCTION COMMISSIONS
          </span>
        </div>

        <div className="flex items-center gap-2 text-[#0A1128] font-black animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-heading font-black text-[#0A1128]">
            Scroll To Explore
          </span>
          <ArrowDown size={13} className="text-[#0A1128]" />
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
