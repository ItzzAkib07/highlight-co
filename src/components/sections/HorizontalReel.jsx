import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../../data/projectsData';
import { useCursor } from '../../context/CursorContext';
import { useSound } from '../../context/SoundContext';
import { ArrowUpRight, Play, Film, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { VideoModal } from '../common/VideoModal';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalReel = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const { setCursor, resetCursor } = useCursor();
  const { playWhoosh, playClickTone } = useSound();
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);

  const reelProjects = projectsData.filter((p) => p.featuredInReel);

  // Navigate to specific project index
  const scrollToProject = useCallback(
    (index) => {
      playClickTone();
      const targetIdx = Math.max(0, Math.min(reelProjects.length - 1, index));
      setActiveIdx(targetIdx);

      const isDesktop = window.innerWidth >= 769;
      if (isDesktop && sectionRef.current) {
        const st = ScrollTrigger.getAll().find((s) => s.trigger === sectionRef.current);
        if (st) {
          const scrollDistance = st.end - st.start;
          const step = scrollDistance / (reelProjects.length - 1);
          const targetScroll = st.start + targetIdx * step;
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth',
          });
        }
      }
    },
    [playClickTone, reelProjects.length]
  );

  // Responsive GSAP matchMedia
  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop: Smooth Pinned Horizontal Scrub
    mm.add('(min-width: 769px)', () => {
      const section = sectionRef.current;
      const container = containerRef.current;
      if (!section || !container) return;

      const getScrollAmount = () => {
        const total = container.scrollWidth - window.innerWidth + 160;
        return Math.max(0, total);
      };

      const tween = gsap.to(container, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.7,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          anticipatePin: 0,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.max(4, progress * 100)}%`;
            }
            const currentItem = Math.min(
              reelProjects.length - 1,
              Math.floor(progress * reelProjects.length)
            );
            setActiveIdx(currentItem);
          },
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [reelProjects.length]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white border-y border-[#0A1128]/10 overflow-hidden select-none text-[#0A1128] py-12 sm:py-16 md:py-0 md:h-screen md:min-h-[680px] md:max-h-[1080px] md:flex md:flex-col md:justify-between"
    >
      {/* Ambient dynamic cinematic background lighting & studio set imagery */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Subtle Film Soundstage Atmosphere Background Image */}
        <div className="absolute inset-0 opacity-[0.14] mix-blend-multiply filter contrast-110">
          <img
            src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=2000&q=80"
            alt="Film Studio Atmosphere"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Ambient Warm Golden & Cool Flares */}
        <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-[#F5C400]/35 via-amber-300/20 to-transparent rounded-full blur-[140px] animate-float-slow" />
        <div className="absolute top-1/3 -right-20 w-[700px] h-[700px] bg-gradient-to-bl from-[#0A1128]/8 via-[#F5C400]/25 to-transparent rounded-full blur-[140px] animate-float-reverse" />

        {/* Horizontal Anamorphic Lens Flare Beam */}
        <div className="absolute top-1/2 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#F5C400]/70 to-transparent blur-[1px] animate-beam-streak pointer-events-none" />

        {/* 35mm Sprocket Track at the base */}
        <div className="absolute bottom-0 inset-x-0 h-6 bg-film-sprockets opacity-70" />

        {/* Blueprint grids */}
        <div className="absolute inset-0 bg-cinema-grid opacity-60" />
        <div className="absolute inset-0 bg-cinema-lines opacity-35" />
      </div>

      {/* 1. Header & Navigation Controls */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-4 sm:pt-6 md:pt-24 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Header Tag */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F5C400]/20 border border-[#0A1128]/15 flex items-center justify-center text-[#0A1128] shadow-sm">
            <Film size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black">
                CINEMATIC REEL
              </span>
              <span className="text-[10px] font-mono text-[#0A1128] font-bold">// FEATURED RUNWAY</span>
            </div>
            <span className="text-[11px] font-mono text-[#0A1128]/70 block font-semibold">
              Explore highlighted productions
            </span>
          </div>
        </div>

        {/* Pill Switcher & Quick Arrows */}
        <div className="flex items-center gap-3 sm:gap-6 self-start sm:self-auto">
          {/* Quick Indicator Pills */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-white border border-[#0A1128]/15 shadow-sm backdrop-blur-md overflow-x-auto max-w-full">
            {reelProjects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => scrollToProject(idx)}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                  activeIdx === idx
                    ? 'bg-[#F5C400] text-[#0A1128] font-black shadow-md shadow-[#F5C400]/30 scale-105 border border-[#0A1128]/15'
                    : 'text-[#0A1128] hover:bg-slate-100 font-bold'
                }`}
                title={`Go to project 0${idx + 1}: ${p.title}`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollToProject(activeIdx - 1)}
              disabled={activeIdx === 0}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#0A1128]/15 flex items-center justify-center transition-all ${
                activeIdx === 0
                  ? 'text-[#0A1128]/30 cursor-not-allowed opacity-30 bg-white'
                  : 'bg-white text-[#0A1128] hover:bg-[#F5C400] active:scale-95 shadow-sm font-black'
              }`}
              aria-label="Previous project"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Counter display */}
            <div className="px-2.5 sm:px-3.5 py-1 rounded-full bg-white border border-[#0A1128]/15 font-mono text-xs flex items-center gap-1 shadow-sm">
              <span className="text-[#0A1128] font-black text-xs sm:text-sm">
                0{activeIdx + 1}
              </span>
              <span className="text-[#0A1128]/40 font-bold">/</span>
              <span className="text-[#0A1128] font-black text-xs sm:text-sm">0{reelProjects.length}</span>
            </div>

            <button
              onClick={() => scrollToProject(activeIdx + 1)}
              disabled={activeIdx === reelProjects.length - 1}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#0A1128]/15 flex items-center justify-center transition-all ${
                activeIdx === reelProjects.length - 1
                  ? 'text-[#0A1128]/30 cursor-not-allowed opacity-30 bg-white'
                  : 'bg-white text-[#0A1128] hover:bg-[#F5C400] active:scale-95 shadow-sm font-black'
              }`}
              aria-label="Next project"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Progress Line */}
      <div className="relative z-20 w-full h-[3px] bg-slate-200 overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-[#F5C400] transition-all duration-150"
          style={{ width: `${((activeIdx + 1) / reelProjects.length) * 100}%` }}
        />
      </div>

      {/* 3. DESKTOP Horizontal Strip Runway (Screen >= 769px) */}
      <div className="hidden md:block relative z-10 my-auto py-6 sm:py-8 overflow-hidden">
        <div
          ref={containerRef}
          className="flex items-center gap-8 lg:gap-12 px-6 sm:px-12 md:px-16 w-max will-change-transform"
        >
          {reelProjects.map((project, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={project.id}
                className={`w-[520px] md:w-[640px] lg:w-[720px] xl:w-[780px] flex-shrink-0 group relative rounded-3xl overflow-hidden bg-white border transition-all duration-500 ${
                  isActive
                    ? 'border-[#0A1128]/30 shadow-2xl ring-2 ring-[#F5C400]'
                    : 'border-[#0A1128]/15 hover:border-[#0A1128]/30 shadow-md'
                }`}
                onMouseEnter={() => {
                  setCursor('view', 'VIEW');
                  playWhoosh();
                }}
                onMouseLeave={resetCursor}
              >
                {/* Cinematic Image Frame (16:9) */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0A1128]">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/90 via-transparent to-black/20" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#0A1128]/15 text-[#0A1128] text-xs font-mono font-black uppercase tracking-wider shadow-sm">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#0A1128]/15 text-[#0A1128] text-xs font-mono font-bold shadow-sm">
                      {project.year}
                    </span>
                  </div>

                  {/* Play Video Trigger Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      playClickTone();
                      setActiveVideo(project);
                    }}
                    onMouseEnter={() => setCursor('play', 'PLAY')}
                    onMouseLeave={resetCursor}
                    className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F5C400] text-[#060B1A] border border-[#0A1128]/20 flex items-center justify-center shadow-lg shadow-[#F5C400]/40 group-hover:scale-110 transition-transform duration-300"
                    aria-label={`Play preview for ${project.title}`}
                  >
                    <Play size={20} className="ml-1 fill-current" />
                  </button>
                </div>

                {/* Project Details Strip */}
                <div className="p-6 sm:p-8 flex flex-col justify-between bg-white text-[#0A1128]">
                  <div className="flex items-center justify-between text-xs font-mono text-[#0A1128] mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="font-semibold text-[#0A1128]/70">CLIENT:</span>
                      <strong className="text-[#0A1128] font-black">{project.client}</strong>
                    </span>
                    <span className="text-[#0A1128] font-mono font-black">{project.duration}</span>
                  </div>

                  <Link
                    to={`/work/${project.slug}`}
                    onClick={playClickTone}
                    className="hover:text-[#D4A100] transition-colors block mt-1"
                  >
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-[#0A1128] leading-tight">
                      {project.title}
                    </h3>
                  </Link>

                  <p className="mt-2.5 text-xs sm:text-sm text-[#0A1128] font-medium line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>

                  <div className="mt-6 pt-4 border-t border-[#0A1128]/10 flex items-center justify-between">
                    <Link
                      to={`/work/${project.slug}`}
                      onClick={playClickTone}
                      className="inline-flex items-center gap-2 text-xs font-heading font-black uppercase tracking-widest text-[#0A1128] hover:text-[#D4A100] transition-colors group-hover:translate-x-1 duration-300"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight size={14} className="text-[#0A1128]" />
                    </Link>

                    <span className="font-mono text-xs sm:text-sm text-[#0A1128] font-black tracking-widest">
                      {project.reelNumber || `0${idx + 1}`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. MOBILE Showcase Card Layout (Screen < 769px) */}
      <div className="block md:hidden relative z-10 px-4 py-4">
        {reelProjects[activeIdx] && (
          <div className="w-full rounded-2xl overflow-hidden bg-white border border-[#0A1128]/15 shadow-xl transition-all duration-300">
            {/* 16:9 Media Frame */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0A1128]">
              <img
                src={reelProjects[activeIdx].heroImage}
                alt={reelProjects[activeIdx].title}
                loading="eager"
                className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/90 via-transparent to-black/20" />

              {/* Mobile Top Badges */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-[#0A1128]/15 text-[#0A1128] text-[10px] font-mono font-black uppercase tracking-wider shadow-sm">
                  {reelProjects[activeIdx].category}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-[#0A1128]/15 text-[#0A1128] text-[10px] font-mono font-bold shadow-sm">
                  {reelProjects[activeIdx].year}
                </span>
              </div>

              {/* Mobile Video Play Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  playClickTone();
                  setActiveVideo(reelProjects[activeIdx]);
                }}
                className="absolute bottom-3 right-3 z-10 w-11 h-11 rounded-full bg-[#F5C400] text-[#060B1A] border border-[#0A1128]/20 flex items-center justify-center shadow-lg active:scale-95"
                aria-label={`Play preview for ${reelProjects[activeIdx].title}`}
              >
                <Play size={18} className="ml-0.5 fill-current" />
              </button>
            </div>

            {/* Mobile Project Info */}
            <div className="p-4 sm:p-5 bg-white text-[#0A1128]">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#0A1128] mb-1.5">
                <span>
                  CLIENT: <strong>{reelProjects[activeIdx].client}</strong>
                </span>
                <span className="font-bold">{reelProjects[activeIdx].duration}</span>
              </div>

              <Link
                to={`/work/${reelProjects[activeIdx].slug}`}
                onClick={playClickTone}
                className="hover:text-[#D4A100] transition-colors block"
              >
                <h3 className="text-xl sm:text-2xl font-serif font-black text-[#0A1128] leading-tight">
                  {reelProjects[activeIdx].title}
                </h3>
              </Link>

              <p className="mt-2 text-xs text-[#0A1128]/80 font-medium line-clamp-2 leading-relaxed">
                {reelProjects[activeIdx].tagline}
              </p>

              <div className="mt-4 pt-3 border-t border-[#0A1128]/10 flex items-center justify-between">
                <Link
                  to={`/work/${reelProjects[activeIdx].slug}`}
                  onClick={playClickTone}
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-black uppercase tracking-wider text-[#0A1128] hover:text-[#D4A100]"
                >
                  <span>Explore Case Study</span>
                  <ArrowUpRight size={13} />
                </Link>

                <span className="font-mono text-xs text-[#0A1128] font-black">
                  0{activeIdx + 1} / 0{reelProjects.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Bottom Runway Status Bar (Desktop) */}
      <div className="hidden md:flex relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-2 pb-6 sm:pb-8 items-center justify-between gap-4 border-t border-[#0A1128]/10 text-xs font-mono text-[#0A1128]">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#F5C400] animate-pulse" />
          <span className="text-[#0A1128] font-bold">
            NOW FEATURING:{' '}
            <strong className="text-[#0A1128] font-heading font-black uppercase tracking-wider">
              {reelProjects[activeIdx]?.title}
            </strong>
          </span>
          <span className="text-[#0A1128]/30">|</span>
          <span className="text-[#0A1128] font-bold">{reelProjects[activeIdx]?.category}</span>
        </div>

        <div className="flex items-center gap-2 text-[#0A1128] text-[11px] tracking-widest uppercase font-black">
          <Sparkles size={13} className="text-[#D4A100]" />
          <span>SCROLL DOWN TO ADVANCE RUNWAY</span>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal
          isOpen={Boolean(activeVideo)}
          onClose={() => setActiveVideo(null)}
          videoUrl={activeVideo.videoUrl}
          title={activeVideo.title}
          category={activeVideo.category}
        />
      )}
    </section>
  );
};
