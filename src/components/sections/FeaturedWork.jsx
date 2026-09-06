import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../../data/projectsData';
import { SectionHeader } from '../common/SectionHeader';
import { VideoModal } from '../common/VideoModal';
import { useCursor } from '../../context/CursorContext';
import { useSound } from '../../context/SoundContext';
import { Play, ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, Film, ArrowDown, MousePointer } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedWork = () => {
  const cardCount = projectsData.length;
  const sectionRef = useRef(null);
  const cardsRefs = useRef([]);
  const frameId = useRef(0);
  const scrollTriggerRef = useRef(null);

  const { setCursor, resetCursor } = useCursor();
  const { playWhoosh, playClickTone } = useSound();

  // Active video modal preview state
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Scroll and continuous progress
  const targetProgress = useRef(0);
  const progress = useRef(0);

  // Mouse tracking with inertia damping for 3D parallax tilt
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Drag interaction refs
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);

  // Responsive card metrics tailored for cylinder visibility
  const [metrics, setMetrics] = useState({
    cardW: 440,
    cardH: 278,
    stageHeight: 760,
  });

  // Responsive calculations
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Calculate Card Metrics (scale proportionally to screen size)
      let cardW = Math.round(w * 0.23 + 140);
      const heightFactor = Math.min(1.0, Math.max(0.68, h / 900));
      cardW = Math.round(cardW * heightFactor);
      cardW = Math.min(480, Math.max(280, cardW));
      const cardH = Math.round(cardW / 1.58);

      const stageHeight = Math.min(820, Math.max(540, Math.round(h * 0.72)));

      setMetrics({ cardW, cardH, stageHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP ScrollTrigger Pinned Scroll Locking
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx;

    const initScrollTrigger = () => {
      ctx = gsap.context(() => {
        const isMobileScreen = window.innerWidth < 768;
        const scrollDistance = isMobileScreen ? cardCount * 380 : cardCount * 650;

        const st = ScrollTrigger.create({
          trigger: section,
          pin: true,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: isMobileScreen ? 0.3 : 0.6,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawProgress = self.progress;
            setScrollPercent(rawProgress * 100);

            // Map scroll progress [0, 1] directly to [0, cardCount - 1]
            const targetVal = rawProgress * (cardCount - 1);
            targetProgress.current = targetVal;

            // Derive active project index for indicators
            const activeIndex = Math.min(
              cardCount - 1,
              Math.max(0, Math.round(targetVal))
            );
            setActiveProjectIdx(activeIndex);
          },
        });

        scrollTriggerRef.current = st;
      }, section);
    };

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
  }, [cardCount]);

  // Direct Mouse Wheel Trigger when cursor is inside work section
  const isMouseInsideSection = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleNativeWheel = (e) => {
      if (!isMouseInsideSection.current) return;

      const delta = e.deltaY;
      const currentVal = targetProgress.current;

      // Scrolling DOWN -> cards move UP towards next card
      if (delta > 0) {
        if (currentVal < cardCount - 1 - 0.05) {
          e.preventDefault();
          const stepDelta = Math.min(0.6, Math.max(0.12, delta * 0.0018));
          const nextVal = Math.min(cardCount - 1, currentVal + stepDelta);
          targetProgress.current = nextVal;
          setActiveProjectIdx(Math.round(nextVal));

          const st = scrollTriggerRef.current;
          if (st) {
            const scrollRange = st.end - st.start;
            const targetScroll = st.start + (nextVal / (cardCount - 1)) * scrollRange;
            window.scrollTo({ top: targetScroll, behavior: 'auto' });
          }
        }
        // If at last card, do not preventDefault: normal page scroll continues downwards!
      }
      // Scrolling UP -> cards move DOWN towards previous card
      else if (delta < 0) {
        if (currentVal > 0.05) {
          e.preventDefault();
          const stepDelta = Math.max(-0.6, Math.min(-0.12, delta * 0.0018));
          const nextVal = Math.max(0, currentVal + stepDelta);
          targetProgress.current = nextVal;
          setActiveProjectIdx(Math.round(nextVal));

          const st = scrollTriggerRef.current;
          if (st) {
            const scrollRange = st.end - st.start;
            const targetScroll = st.start + (nextVal / (cardCount - 1)) * scrollRange;
            window.scrollTo({ top: targetScroll, behavior: 'auto' });
          }
        }
        // If at top card, do not preventDefault: normal page scroll continues upwards!
      }
    };

    section.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => section.removeEventListener('wheel', handleNativeWheel);
  }, [cardCount]);

  // Mouse movement tracking for 3D parallax tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ry = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouse.current.targetX = Math.max(-1, Math.min(1, rx));
      mouse.current.targetY = Math.max(-1, Math.min(1, ry));
    };

    const handleMouseLeave = () => {
      mouse.current.targetX = 0;
      mouse.current.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Smooth scroll to specific card index
  const scrollToProject = useCallback(
    (index) => {
      playClickTone();
      const targetIdx = Math.max(0, Math.min(cardCount - 1, index));
      setActiveProjectIdx(targetIdx);

      const st = scrollTriggerRef.current;
      if (st) {
        const scrollRange = st.end - st.start;
        const targetScroll = st.start + (targetIdx / (cardCount - 1)) * scrollRange;
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth',
        });
      } else {
        targetProgress.current = targetIdx;
      }
    },
    [cardCount, playClickTone]
  );

  const stepNext = () => {
    scrollToProject(activeProjectIdx + 1);
  };

  const stepPrev = () => {
    scrollToProject(activeProjectIdx - 1);
  };

  // Drag interaction handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStartY.current = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    dragStartScroll.current = window.scrollY;
  };

  const handleMouseMoveDrag = (e) => {
    if (!isDragging.current) return;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaY = clientY - dragStartY.current;
    const st = scrollTriggerRef.current;
    if (st) {
      const deltaScroll = -deltaY * 3.2;
      window.scrollTo({
        top: Math.max(st.start, Math.min(st.end, dragStartScroll.current + deltaScroll)),
        behavior: 'auto',
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // 60FPS Continuous Render Loop
  const renderLoop = useCallback(() => {
    // Smoothly interpolate current progress towards targetProgress driven by scroll
    progress.current += (targetProgress.current - progress.current) * 0.12;

    // Inertia damping for mouse tilt
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

    const cards = cardsRefs.current;
    const h = metrics.stageHeight || 760;
    const { cardH } = metrics;

    const continuousProgress = progress.current;
    const roundedIndex = Math.round(continuousProgress);
    const diffFromRound = continuousProgress - roundedIndex;

    // Magnetic dwell step logic at front center
    const easedDiff = (Math.sign(diffFromRound) * Math.pow(Math.abs(diffFromRound) * 2, 4.2)) / 2;
    const virtualActiveIndex = roundedIndex + easedDiff;

    for (let i = 0; i < cardCount; i++) {
      const card = cards[i];
      if (!card) continue;

      const offset = i - virtualActiveIndex;
      const absOffset = Math.abs(offset);
      const sign = Math.sign(offset);

      if (absOffset > 3.0) {
        card.style.visibility = 'hidden';
        continue;
      } else {
        card.style.visibility = 'visible';
      }

      const gap = 38;
      const peekAmount = -60;
      const D = 1350;

      let y = 0;
      let z = 0;
      let rot = 0;

      if (absOffset <= 1) {
        const t = absOffset;
        const easedT = t * t * (3 - 2 * t);
        const targetY = cardH + gap;
        // Natural direction: offset > 0 (next card) is below center (+Y), offset < 0 is above (-Y)
        y = sign * (easedT * targetY);
        z = 380 + easedT * (200 - 380);
        rot = easedT * 128;
      } else if (absOffset <= 2) {
        const t = absOffset - 1;
        const easedT = t * t * (3 - 2 * t);
        const yStart = cardH + gap;
        const zStart = 200;
        const rotStart = 128;
        const zEnd = -70;
        const rotEnd = 172;

        const sEnd = D / (D - zEnd);
        const yEnd = (h / 2 - peekAmount) / sEnd - cardH / 2;

        const currentY = yStart + easedT * (yEnd - yStart);
        y = sign * currentY;
        z = zStart + easedT * (zEnd - zStart);
        rot = rotStart + easedT * (rotEnd - rotStart);
      } else {
        const t = Math.min(absOffset - 2, 1);
        const easedT = t * t * (3 - 2 * t);
        const zStart = -70;
        const rotStart = 172;
        const zEnd3 = -260;
        const rotEnd3 = 195;

        const sEnd2 = D / (D - zStart);
        const yEnd2 = (h / 2 - peekAmount) / sEnd2 - cardH / 2;
        const sEnd3 = D / (D - zEnd3);
        const yEnd3 = (h / 2 + 120) / sEnd3 + cardH / 2;

        const currentY = yEnd2 + easedT * (yEnd3 - yEnd2);
        y = sign * currentY;
        z = zStart + easedT * (zEnd3 - zStart);
        rot = rotStart + easedT * (rotEnd3 - rotStart);
      }

      const localCardRotation = -sign * rot;
      const centerFactor = Math.max(0, 1 - absOffset);

      const maxTiltY = 16;
      const maxTiltX = 14;

      const activeTiltX = -mouse.current.y * maxTiltX * centerFactor;
      const activeTiltY = mouse.current.x * maxTiltY * centerFactor;

      const totalRotX = localCardRotation + activeTiltX;
      const totalRotY = activeTiltY;

      card.style.zIndex = Math.round(z).toString();
      card.style.opacity = '1';
      card.style.transform = `translateY(${y.toFixed(2)}px) translateZ(${z.toFixed(2)}px) rotateX(${totalRotX.toFixed(2)}deg) rotateY(${totalRotY.toFixed(2)}deg) rotateZ(-2.5deg)`;
    }
  }, [cardCount, metrics]);

  useEffect(() => {
    const tick = () => {
      renderLoop();
      frameId.current = requestAnimationFrame(tick);
    };

    frameId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId.current);
  }, [renderLoop]);

  // 5 parallel volumetric thickness slices
  const thicknessLayers = [-1.5, -0.75, 0, 0.75, 1.5];

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => {
        isMouseInsideSection.current = true;
      }}
      onMouseLeave={() => {
        isMouseInsideSection.current = false;
      }}
      className="relative w-full h-screen min-h-[700px] max-h-[1080px] bg-white flex flex-col justify-between overflow-hidden select-none px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 text-brand-navy"
    >
      {/* Background Ambient Studio Lighting, Film Perforations & Optical Lens Guides */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Top & Bottom 35mm Film Sprocket Ticker Stripes */}
        <div className="absolute top-0 inset-x-0 h-6 bg-film-sprockets opacity-70 z-10" />
        <div className="absolute bottom-0 inset-x-0 h-6 bg-film-sprockets opacity-70 z-10" />

        {/* Ambient Warm Golden & Cool Studio Flares */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-[#F5C400]/35 via-amber-300/20 to-transparent rounded-full blur-[140px] animate-float-slow" />
        <div className="absolute top-1/3 right-10 w-[650px] h-[650px] bg-gradient-to-bl from-[#0A1128]/8 via-[#F5C400]/25 to-transparent rounded-full blur-[140px] animate-float-reverse" />
        
        {/* Subtle Cinema Blueprint Dot Grid */}
        <div className="absolute inset-0 bg-cinema-grid opacity-60" />
        <div className="absolute inset-0 bg-cinema-lines opacity-35" />

        {/* Giant Optical Lens Aperture Ring Concentric Graphic in Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-[#0A1128]/15 animate-spin-slow pointer-events-none">
          <div className="absolute inset-16 rounded-full border border-dashed border-[#F5C400]/40" />
          <div className="absolute inset-32 rounded-full border border-[#0A1128]/15" />
          <div className="absolute inset-48 rounded-full border border-dotted border-[#F5C400]/50" />
        </div>
        
        {/* Soft Stage Spotlight Cones from Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#F5C400]/25 via-amber-200/10 to-transparent blur-3xl" />
      </div>

      {/* Thin Top Section Progress Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate-200 z-30">
        <div
          className="h-full bg-gradient-to-r from-brand-yellow via-amber-300 to-brand-yellow transition-all duration-150"
          style={{ width: `${Math.max(3, scrollPercent)}%` }}
        />
      </div>

      <div className="max-w-[1600px] w-full mx-auto relative z-10 flex flex-col justify-between h-full">
        {/* ========================================================= */}
        {/* 1. SECTION HEADER & INTERACTIVE NAVIGATION CONTROLS       */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2 sm:pt-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full bg-white border border-[#0A1128]/15 text-[#0A1128] font-mono text-[11px] font-black tracking-wider shadow-sm">
                01 // SELECTED WORKS
              </span>
              <span className="text-[#0A1128] font-mono text-xs font-bold hidden sm:inline">
                SCROLL LOCKED SPATIAL RUNWAY
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-[#0A1128] tracking-tight uppercase">
              Stories Crafted In{' '}
              <span className="relative inline-block text-[#060B1A] px-2.5 py-0.5 italic font-serif font-black">
                <span className="absolute inset-0 bg-[#F5C400] rounded-sm -rotate-1 shadow-md shadow-[#F5C400]/40" />
                <span className="relative z-10">Cinema.</span>
              </span>
            </h2>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 self-start md:self-end">
            {/* Project Quick Jump Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-[#0A1128]/15 shadow-sm backdrop-blur-xl">
              {projectsData.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => scrollToProject(idx)}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={resetCursor}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                    activeProjectIdx === idx
                      ? 'bg-[#F5C400] text-[#060B1A] font-black shadow-md shadow-[#F5C400]/30 scale-105 border border-[#0A1128]/15'
                      : 'text-[#0A1128] hover:bg-[#F5C400]/20 font-bold'
                  }`}
                  title={`Jump to film 0${idx + 1}: ${project.title}`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            {/* Carousel Control Buttons (Prev / Next) */}
            <div className="flex items-center gap-2">
              <button
                onClick={stepPrev}
                disabled={activeProjectIdx === 0}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className="w-10 h-10 rounded-full border border-[#0A1128]/15 bg-white hover:bg-[#F5C400] text-[#0A1128] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all shadow-sm active:scale-95 font-bold"
                aria-label="Previous film"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>

              <button
                onClick={stepNext}
                disabled={activeProjectIdx === cardCount - 1}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className="w-10 h-10 rounded-full border border-[#0A1128]/15 bg-white hover:bg-[#F5C400] text-[#0A1128] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all shadow-sm active:scale-95 font-bold"
                aria-label="Next film"
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. 3D INTERACTIVE VOLUMETRIC CYLINDER STAGE               */}
        {/* ========================================================= */}
        <div
          className="relative w-full flex-1 my-2 flex items-center justify-center overflow-hidden rounded-3xl border border-[#0A1128]/15 bg-slate-100 shadow-2xl backdrop-blur-xl cursor-grab active:cursor-grabbing"
          style={{ minHeight: `${metrics.stageHeight}px` }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMoveDrag}
          onMouseUp={handleMouseUp}
        >
          {/* 3D Camera Perspective Space */}
          <div
            className="relative w-full h-full flex items-center justify-center pointer-events-none"
            style={{ perspective: '1350px' }}
          >
            {/* Dynamic 3D Coordinate Stage */}
            <div
              className="absolute"
              style={{
                width: `${metrics.cardW}px`,
                height: `${metrics.cardH}px`,
                transformStyle: 'preserve-3d',
              }}
            >
              {projectsData.map((project, i) => (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardsRefs.current[i] = el;
                  }}
                  className="absolute inset-0 pointer-events-auto"
                  style={{
                    width: `${metrics.cardW}px`,
                    height: `${metrics.cardH}px`,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'visible',
                  }}
                >
                  {/* Dense 3D Physical Volumetric Thickness Layering */}
                  {thicknessLayers.map((zOffset, layerIdx) => {
                    const isFrontFace = layerIdx === thicknessLayers.length - 1;
                    const isBackFace = layerIdx === 0;

                    // Middle edge slice
                    if (!isFrontFace && !isBackFace) {
                      return (
                        <div
                          key={layerIdx}
                          className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-[#0A1128]/15 bg-[#CBD5E1] pointer-events-none"
                          style={{
                            transform: `translateZ(${zOffset}px)`,
                          }}
                        />
                      );
                    }

                    // =========================================================
                    // FRONT FACE: High-Production Cinematic Showcase Card
                    // =========================================================
                    if (isFrontFace) {
                      return (
                        <div
                          key={layerIdx}
                          className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-[#0A1128]/15 bg-white overflow-hidden shadow-[0_20px_50px_rgba(10,17,40,0.3)] pointer-events-auto group/card"
                          style={{
                            transform: `translateZ(${zOffset}px)`,
                            backfaceVisibility: 'hidden',
                          }}
                        >
                          {/* Project Hero Media Frame */}
                          <div className="relative w-full h-full overflow-hidden">
                            <img
                              src={project.heroImage}
                              alt={project.title}
                              loading="eager"
                              className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-700 ease-out filter brightness-95 contrast-105"
                            />

                            {/* Cinema Gradient Vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/85 via-transparent to-black/20" />

                            {/* Top Badges & Timecode Pill */}
                            <div className="absolute top-3.5 sm:top-4 left-4 sm:left-5 right-4 sm:right-5 z-20 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#0A1128]/15 text-[#0A1128] text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider shadow-sm">
                                  {project.category}
                                </span>
                                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#0A1128]/15 text-[#0A1128] text-[10px] sm:text-xs font-mono font-bold shadow-sm">
                                  {project.year}
                                </span>
                              </div>

                              <div className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#0A1128]/15 text-[#0A1128] font-mono text-[10px] font-bold shadow-sm">
                                {project.duration}
                              </div>
                            </div>

                            {/* Center Play Button Overlay */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                playClickTone();
                                setActiveVideo(project);
                              }}
                              onMouseEnter={() => {
                                setCursor('play', 'PLAY');
                                playWhoosh();
                              }}
                              onMouseLeave={resetCursor}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F5C400] text-[#060B1A] border border-[#0A1128]/15 flex items-center justify-center shadow-2xl shadow-[#F5C400]/50 group-hover/card:scale-110 transition-transform duration-300 active:scale-95"
                              aria-label={`Play preview for ${project.title}`}
                            >
                              <Play size={20} className="ml-1 fill-current" />
                            </button>

                            {/* Bottom Card Content Info Strip */}
                            <div className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-5 flex flex-col justify-end bg-white/95 backdrop-blur-md border-t border-[#0A1128]/15 text-[#0A1128] shadow-lg">
                              <div className="text-[10px] font-mono text-[#0A1128] mb-0.5 font-bold">
                                CLIENT: <strong className="text-[#0A1128] font-black">{project.client}</strong>
                              </div>

                              <Link
                                to={`/work/${project.slug}`}
                                onClick={playClickTone}
                                className="hover:text-[#D4A100] transition-colors block"
                              >
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-black text-[#0A1128] leading-tight">
                                  {project.title}
                                </h3>
                              </Link>

                              <p className="mt-1 text-xs text-[#0A1128] font-medium line-clamp-1">
                                {project.tagline}
                              </p>

                              <div className="mt-2.5 pt-2.5 border-t border-[#0A1128]/15 flex items-center justify-between">
                                <Link
                                  to={`/work/${project.slug}`}
                                  onClick={playClickTone}
                                  className="inline-flex items-center gap-1.5 text-[11px] font-heading font-black uppercase tracking-widest text-[#0A1128] hover:text-[#D4A100] transition-colors"
                                >
                                  <span>Explore Story & BTS</span>
                                  <ArrowUpRight size={13} className="text-[#0A1128]" />
                                </Link>

                                <span className="font-mono text-xs font-black text-[#0A1128]">
                                  0{i + 1} / 0{cardCount}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // =========================================================
                    // BACK FACE: Tactical Editorial Film Slate & Credits
                    // =========================================================
                    if (isBackFace) {
                      return (
                        <div
                          key={layerIdx}
                          className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-[#0A1128]/15 bg-white overflow-hidden shadow-[0_20px_50px_rgba(10,17,40,0.3)] pointer-events-auto p-4 sm:p-5 flex flex-col justify-between text-[#0A1128]"
                          style={{
                            transform: `translateZ(${zOffset}px) rotateX(180deg)`,
                            backfaceVisibility: 'hidden',
                          }}
                        >
                          {/* Top Slate Film Header */}
                          <div className="relative z-10 flex items-center justify-between border-b border-[#0A1128]/15 pb-2">
                            <div className="flex items-center gap-2">
                              <Film size={13} className="text-[#0A1128]" />
                              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0A1128] font-black">
                                PRODUCTION ARCHIVE // BTS
                              </span>
                            </div>
                            <span className="text-xs font-mono font-black text-[#0A1128]">
                              {project.categoryShort || 'FILM'}
                            </span>
                          </div>

                          {/* Middle Synopsis & Deliverables */}
                          <div className="relative z-10 my-auto py-1">
                            <h4 className="text-base sm:text-lg font-serif font-black text-[#0A1128] mb-1">
                              {project.title}
                            </h4>
                            <p className="text-xs text-[#0A1128] font-medium line-clamp-3 leading-relaxed">
                              {project.synopsis}
                            </p>

                            {/* Impact Metric Strip */}
                            {project.impactMetrics && project.impactMetrics.length > 0 && (
                              <div className="mt-2.5 grid grid-cols-3 gap-2 pt-2 border-t border-[#0A1128]/15">
                                {project.impactMetrics.slice(0, 3).map((metric, mIdx) => (
                                  <div key={mIdx} className="text-left">
                                    <div className="font-serif text-xs sm:text-sm font-black text-[#0A1128]">
                                      {metric.value}
                                    </div>
                                    <div className="text-[9px] font-mono text-[#0A1128] uppercase truncate font-bold">
                                      {metric.label}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Bottom Action */}
                          <div className="relative z-10 pt-2 border-t border-[#0A1128]/15 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-[#0A1128] font-bold">
                              DIRECTOR: <strong className="text-[#0A1128] font-black">{project.credits?.director || 'Aarav Mehta'}</strong>
                            </span>
                            <Link
                              to={`/work/${project.slug}`}
                              onClick={playClickTone}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5C400] text-[#060B1A] border border-[#0A1128]/15 text-[10px] font-heading font-black uppercase tracking-wider shadow-md hover:scale-105 transition-transform"
                            >
                              <span>Case Study</span>
                              <ArrowUpRight size={12} />
                            </Link>
                          </div>
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Viewport Interactive Cue */}
          <div className="absolute bottom-3 inset-x-0 z-20 px-6 flex items-center justify-between text-xs font-mono text-[#0A1128] pointer-events-none">
            <div className="flex items-center gap-2 bg-white/95 px-3 py-1 rounded-full border border-[#0A1128]/15 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400] animate-pulse" />
              <span>
                CURRENT FILM: <strong className="text-[#0A1128] font-heading font-black">{projectsData[activeProjectIdx]?.title}</strong>
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#0A1128] bg-white/95 px-3.5 py-1.5 rounded-full border border-[#0A1128]/15 shadow-sm backdrop-blur-md font-bold">
              <Sparkles size={11} className="text-[#0A1128]" />
              <span>
                {activeProjectIdx === 0 && 'SCROLL DOWN TO EXPLORE FILMS ↓'}
                {activeProjectIdx > 0 && activeProjectIdx < cardCount - 1 && `FILM 0${activeProjectIdx + 1} OF 0${cardCount} • SCROLL ↕`}
                {activeProjectIdx === cardCount - 1 && 'SCROLL DOWN TO PROCEED ↓'}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. BOTTOM RUNWAY STATUS & DIRECTIONAL SCROLL INDICATOR    */}
        {/* ========================================================= */}
        <div className="flex items-center justify-between pt-2 pb-1 text-xs font-mono text-[#0A1128] border-t border-[#0A1128]/15">
          <div className="flex items-center gap-4">
            <span className="text-[#0A1128] font-black">
              0{activeProjectIdx + 1} / 0{cardCount}
            </span>
            <span className="text-[#0A1128] hidden md:inline font-bold">
              CATEGORY: <strong className="text-[#0A1128] font-black">{projectsData[activeProjectIdx]?.category}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#0A1128] font-black">
            <MousePointer size={12} className="text-[#0A1128] animate-bounce" />
            <span className="text-[11px] uppercase tracking-wider">
              {activeProjectIdx === 0
                ? 'Scroll down to rotate cards'
                : activeProjectIdx === cardCount - 1
                ? 'Scroll down to continue page'
                : 'Scroll up / down to navigate'}
            </span>
          </div>
        </div>
      </div>

      {/* Video Modal Preview */}
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

