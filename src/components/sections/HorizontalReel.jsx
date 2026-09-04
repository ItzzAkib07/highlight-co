import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../../data/projectsData';
import { useCursor } from '../../context/CursorContext';
import { useSound } from '../../context/SoundContext';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { ArrowUpRight, Play, Film, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { VideoModal } from '../common/VideoModal';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalReel = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const isMobile = useIsMobile();
  const { setCursor, resetCursor } = useCursor();
  const { playWhoosh, playClickTone } = useSound();
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);

  const reelProjects = projectsData.filter((p) => p.featuredInReel);

  // Navigate to specific project index via ScrollTrigger or scrollIntoView
  const scrollToProject = useCallback((index) => {
    playClickTone();
    const targetIdx = Math.max(0, Math.min(reelProjects.length - 1, index));
    setActiveIdx(targetIdx);

    if (isMobile) {
      if (containerRef.current && containerRef.current.children[targetIdx]) {
        containerRef.current.children[targetIdx].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
      return;
    }

    const st = ScrollTrigger.getAll().find((s) => s.trigger === sectionRef.current);
    if (st) {
      const scrollDistance = st.end - st.start;
      const step = scrollDistance / (reelProjects.length - 1);
      const targetScroll = st.start + targetIdx * step;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  }, [isMobile, playClickTone, reelProjects.length]);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    let ctx;

    const initScrollTrigger = () => {
      // Calculate how far container needs to travel horizontally
      const getScrollAmount = () => {
        if (!container) return 0;
        const total = container.scrollWidth - window.innerWidth + 140;
        return Math.max(0, total);
      };

      ctx = gsap.context(() => {
        gsap.to(container, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.8,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
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
            }
          }
        });
      }, section);
    };

    // Give DOM time to layout images and fonts
    const timer = setTimeout(() => {
      initScrollTrigger();
      ScrollTrigger.refresh();
    }, 150);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (ctx) ctx.revert();
    };
  }, [isMobile, reelProjects.length]);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-white border-y-2 border-[#0A1128]/20 overflow-hidden select-none text-[#0A1128] ${
        isMobile ? 'py-16' : 'h-screen min-h-[680px] max-h-[1080px] flex flex-col justify-between'
      }`}
    >
      {/* Ambient subtle background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-[#F5C400]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* 1. Pinned Top Navigation Bar & Progress Indicator */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-20 sm:pt-24 md:pt-24 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Header Tag */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F5C400]/20 border-2 border-[#0A1128] flex items-center justify-center text-[#0A1128] shadow-sm">
            <Film size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black">
                CINEMATIC REEL
              </span>
              <span className="text-[10px] font-mono text-[#0A1128] font-bold">// HORIZONTAL RUNWAY</span>
            </div>
            <span className="text-[11px] font-mono text-[#0A1128] block sm:hidden font-semibold">
              Swipe to explore selected projects
            </span>
          </div>
        </div>

        {/* Center Pill Switcher & Counter for Desktop */}
        <div className="flex items-center gap-6 self-end sm:self-auto">
          {/* Quick Indicator Pills */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-white border-2 border-[#0A1128] shadow-sm backdrop-blur-md">
            {reelProjects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => scrollToProject(idx)}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                  activeIdx === idx
                    ? 'bg-[#F5C400] text-[#0A1128] font-black shadow-md shadow-[#F5C400]/30 scale-105'
                    : 'text-[#0A1128] hover:bg-slate-100 font-bold'
                }`}
                title={`Go to project 0${idx + 1}: ${p.title}`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>

          {/* Quick Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToProject(activeIdx - 1)}
              disabled={activeIdx === 0}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className={`w-9 h-9 rounded-full border-2 border-[#0A1128] flex items-center justify-center transition-all ${
                activeIdx === 0
                  ? 'text-[#0A1128]/30 cursor-not-allowed opacity-30 bg-white'
                  : 'bg-white text-[#0A1128] hover:bg-[#F5C400] active:scale-95 shadow-sm font-black'
              }`}
              aria-label="Previous project"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Counter display */}
            <div className="px-3.5 py-1 rounded-full bg-white border-2 border-[#0A1128] font-mono text-xs flex items-center gap-1.5 shadow-sm">
              <span className="text-[#0A1128] font-black text-sm">
                0{activeIdx + 1}
              </span>
              <span className="text-[#0A1128]/40 font-bold">/</span>
              <span className="text-[#0A1128] font-black">0{reelProjects.length}</span>
            </div>

            <button
              onClick={() => scrollToProject(activeIdx + 1)}
              disabled={activeIdx === reelProjects.length - 1}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className={`w-9 h-9 rounded-full border-2 border-[#0A1128] flex items-center justify-center transition-all ${
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

      {/* 3. Horizontal Strip / Runway */}
      <div className="relative z-10 my-auto py-6 sm:py-8 overflow-hidden">
        <div
          ref={containerRef}
          className={`flex items-center gap-6 sm:gap-8 lg:gap-12 px-6 sm:px-12 md:px-16 ${
            isMobile
              ? 'overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6'
              : 'w-max will-change-transform'
          }`}
        >
          {reelProjects.map((project, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={project.id}
                className={`w-[85vw] sm:w-[520px] md:w-[640px] lg:w-[720px] xl:w-[780px] flex-shrink-0 snap-center group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 transition-all duration-500 ${
                  isActive
                    ? 'border-[#0A1128] shadow-2xl shadow-[#0A1128]/15 ring-2 ring-[#F5C400]'
                    : 'border-[#0A1128]/30 hover:border-[#0A1128] shadow-lg shadow-[#0A1128]/5'
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
                    loading="eager"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/90 via-transparent to-black/20" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#0A1128] text-[#0A1128] text-[11px] sm:text-xs font-mono font-black uppercase tracking-wider shadow-sm">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#0A1128] text-[#0A1128] text-[11px] sm:text-xs font-mono font-bold shadow-sm">
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
                    className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F5C400] text-[#060B1A] border-2 border-[#0A1128] flex items-center justify-center shadow-xl shadow-[#F5C400]/40 group-hover:scale-110 transition-transform duration-300"
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

                  <div className="mt-6 pt-4 border-t-2 border-[#0A1128]/10 flex items-center justify-between">
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

      {/* 4. Bottom Runway Status Bar */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-2 pb-6 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-[#0A1128]/20 text-xs font-mono text-[#0A1128]">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#F5C400] animate-pulse" />
          <span className="text-[#0A1128] font-bold">
            NOW FEATURING:{' '}
            <strong className="text-[#0A1128] font-heading font-black uppercase tracking-wider">
              {reelProjects[activeIdx]?.title}
            </strong>
          </span>
          <span className="hidden md:inline text-[#0A1128]/30">|</span>
          <span className="hidden md:inline text-[#0A1128] font-bold">{reelProjects[activeIdx]?.category}</span>
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
