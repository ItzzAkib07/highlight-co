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
    cardW: 860,
    cardH: 500,
    stageHeight: 740,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Calculate stage height and card dimensions to cover the parent stage area
      const stageHeight = Math.min(840, Math.max(540, Math.round(h * 0.74)));
      
      // Calculate responsive card dimensions filling ~75-85% of stage area
      let cardH = Math.round(stageHeight * 0.82);
      let cardW = Math.round(cardH * 1.72);

      // Bound cardW to fit within container with balanced side breathing room
      const maxW = Math.min(1160, Math.max(540, w - 140));
      if (cardW > maxW) {
        cardW = maxW;
        cardH = Math.round(cardW / 1.72);
      }

      setMetrics({ cardW, cardH, stageHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP ScrollTrigger Pinned Scroll Locking via matchMedia (Desktop Only)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const scrollDistance = cardCount * 600;

      const st = ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: 0.6,
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

      return () => {
        if (st) st.kill();
        scrollTriggerRef.current = null;
      };
    });

    return () => mm.revert();
  }, [cardCount]);

  // Mouse movement tracking for 3D parallax tilt (Desktop Only)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 769) return;
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

  // Smooth scroll / jump to specific card index
  const scrollToProject = useCallback(
    (index) => {
      playClickTone();
      const targetIdx = Math.max(0, Math.min(cardCount - 1, index));
      setActiveProjectIdx(targetIdx);

      const isDesktop = window.innerWidth >= 769;
      if (isDesktop) {
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

  // Drag interaction handlers (Desktop Only)
  const handleMouseDown = (e) => {
    if (window.innerWidth < 769) return;
    isDragging.current = true;
    dragStartY.current = e.clientY || 0;
    dragStartScroll.current = window.scrollY;
  };

  const handleMouseMoveDrag = (e) => {
    if (!isDragging.current || window.innerWidth < 769) return;
    const clientY = e.clientY || 0;
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

  // 60FPS Continuous Render Loop for Desktop 3D Cylinder
  const renderLoop = useCallback(() => {
    if (window.innerWidth < 769) return;

    // Smoothly interpolate current progress towards targetProgress driven by scroll
    progress.current += (targetProgress.current - progress.current) * 0.14;

    // Inertia damping for mouse tilt
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

    const cards = cardsRefs.current;
    const h = metrics.stageHeight || 740;
    const effectiveCardHeight = metrics.cardH || 500;
    const continuousProgress = progress.current;

    for (let i = 0; i < cardCount; i++) {
      const card = cards[i];
      if (!card) continue;

      // Continuous distance offset from current scroll position
      const offset = i - continuousProgress;
      const absOffset = Math.abs(offset);

      // Hide distant cards outside the visible frustum
      if (absOffset > 2.2) {
        card.style.visibility = 'hidden';
        card.style.opacity = '0';
        continue;
      } else {
        card.style.visibility = 'visible';
      }

      // Smooth, continuous vertical motion for exit and entry
      const yPos = offset * (effectiveCardHeight * 0.84 + 36);
      const yPercent = (yPos / h) * 100;

      // 3D Depth Push: active center sits forward (+30px), receding cards push back (-200px)
      const zPos = 30 - Math.pow(absOffset, 1.28) * 200;

      // Perspective Rotation: tilts gracefully as it exits / enters + cursor parallax
      const rotX = -offset * 10 + mouse.current.y * 5;
      const rotY = mouse.current.x * 6 - offset * 1.5;

      // Gentle scale falloff on receding cards
      const scale = Math.max(0.72, 1 - absOffset * 0.12);

      // Graceful exponential opacity falloff for clean exit
      const opacity = Math.max(0, 1 - Math.pow(absOffset / 1.75, 2.2));

      // Layer stacking: active card stays frontmost
      const zIndex = Math.round((10 - absOffset) * 10);

      card.style.transform = `translate3d(0, ${yPercent}%, ${zPos}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
      card.style.opacity = opacity.toFixed(3);
      card.style.zIndex = `${zIndex}`;
    }
  }, [cardCount, metrics]);

  useEffect(() => {
    let animId;
    const loop = () => {
      renderLoop();
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, [renderLoop]);

  const thicknessLayers = [-1.5, -0.75, 0, 0.75, 1.5];

  return (
    <section
      ref={sectionRef}
      className="relative bg-white border-b border-[#0A1128]/10 overflow-hidden select-none text-[#0A1128] py-12 sm:py-16 md:py-0 md:h-screen md:min-h-[720px] md:max-h-[1080px] md:flex md:flex-col md:justify-between"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute inset-0 opacity-[0.14] mix-blend-multiply filter contrast-110">
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=80"
            alt="Cinema Set Ambiance"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute top-1/4 -left-20 w-[700px] h-[700px] bg-gradient-to-tr from-[#F5C400]/35 via-amber-300/20 to-transparent rounded-full blur-[140px] animate-float-slow" />
        <div className="absolute top-1/3 right-10 w-[650px] h-[650px] bg-gradient-to-bl from-[#0A1128]/8 via-[#F5C400]/25 to-transparent rounded-full blur-[140px] animate-float-reverse" />
        <div className="absolute inset-0 bg-cinema-grid opacity-60" />
        <div className="absolute inset-0 bg-cinema-lines opacity-35" />
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-[#0A1128]/15 animate-spin-slow pointer-events-none">
          <div className="absolute inset-16 rounded-full border border-dashed border-[#F5C400]/40" />
          <div className="absolute inset-32 rounded-full border border-[#0A1128]/15" />
          <div className="absolute inset-48 rounded-full border border-dotted border-[#F5C400]/50" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#F5C400]/25 via-amber-200/10 to-transparent blur-3xl" />
      </div>

      <div className="hidden md:block absolute top-0 left-0 right-0 h-[2px] bg-slate-200 z-30">
        <div
          className="h-full bg-gradient-to-r from-brand-yellow via-amber-300 to-brand-yellow transition-all duration-150"
          style={{ width: `${Math.max(3, scrollPercent)}%` }}
        />
      </div>

      <div className="max-w-[1600px] w-full mx-auto relative z-10 flex flex-col justify-between h-full px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2 sm:pt-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full bg-white border border-[#0A1128]/15 text-[#0A1128] font-mono text-[11px] font-black tracking-wider shadow-sm">
                01 // SELECTED WORKS
              </span>
              <span className="text-[#0A1128] font-mono text-xs font-bold hidden sm:inline">
                SPATIAL FILM SHOWCASE
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

          <div className="flex items-center gap-2 sm:gap-4 self-start md:self-end">
            <div className="flex items-center gap-1 p-1 rounded-full bg-white border border-[#0A1128]/15 shadow-sm backdrop-blur-xl overflow-x-auto max-w-full">
              {projectsData.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => scrollToProject(idx)}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={resetCursor}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
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

            <div className="flex items-center gap-1.5">
              <button
                onClick={stepPrev}
                disabled={activeProjectIdx === 0}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#0A1128]/15 bg-white hover:bg-[#F5C400] text-[#0A1128] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all shadow-sm active:scale-95 font-bold"
                aria-label="Previous film"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>

              <button
                onClick={stepNext}
                disabled={activeProjectIdx === cardCount - 1}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#0A1128]/15 bg-white hover:bg-[#F5C400] text-[#0A1128] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all shadow-sm active:scale-95 font-bold"
                aria-label="Next film"
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        <div
          className="hidden md:flex relative w-full flex-1 my-2 items-center justify-center overflow-hidden rounded-3xl border border-[#0A1128]/15 bg-slate-100 shadow-2xl backdrop-blur-xl cursor-grab active:cursor-grabbing"
          style={{ minHeight: `${metrics.stageHeight}px` }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMoveDrag}
          onMouseUp={handleMouseUp}
        >
          <div
            className="relative w-full h-full flex items-center justify-center pointer-events-none"
            style={{ perspective: '1350px' }}
          >
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
                  {thicknessLayers.map((zOffset, layerIdx) => {
                    const isFrontFace = layerIdx === thicknessLayers.length - 1;
                    const isBackFace = layerIdx === 0;
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
                          <div className="relative w-full h-full overflow-hidden">
                            <img
                              src={project.heroImage}
                              alt={project.title}
                              loading="eager"
                              className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-700 ease-out filter brightness-95 contrast-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/85 via-transparent to-black/20" />
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
                          <div className="relative z-10 my-auto py-1">
                            <h4 className="text-base sm:text-lg font-serif font-black text-[#0A1128] mb-1">
                              {project.title}
                            </h4>
                            <p className="text-xs text-[#0A1128] font-medium line-clamp-3 leading-relaxed">
                              {project.synopsis}
                            </p>
                          </div>
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

          <div className="absolute bottom-3 inset-x-0 z-20 px-6 flex items-center justify-between text-xs font-mono text-[#0A1128] pointer-events-none">
            <div className="flex items-center gap-2 bg-white/95 px-3 py-1 rounded-full border border-[#0A1128]/15 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400] animate-pulse" />
              <span>
                CURRENT FILM: <strong className="text-[#0A1128] font-heading font-black">{projectsData[activeProjectIdx]?.title}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#0A1128] bg-white/95 px-3.5 py-1.5 rounded-full border border-[#0A1128]/15 shadow-sm backdrop-blur-md font-bold">
              <Sparkles size={11} className="text-[#0A1128]" />
              <span>SCROLL TO EXPLORE FILMS ↕</span>
            </div>
          </div>
        </div>

        <div className="block md:hidden my-4">
          {projectsData[activeProjectIdx] && (
            <div className="w-full rounded-2xl overflow-hidden bg-white border border-[#0A1128]/15 shadow-xl transition-all duration-300">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0A1128]">
                <img
                  src={projectsData[activeProjectIdx].heroImage}
                  alt={projectsData[activeProjectIdx].title}
                  loading="eager"
                  className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/90 via-transparent to-black/20" />
                <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-[#0A1128]/15 text-[#0A1128] text-[10px] font-mono font-black uppercase tracking-wider shadow-sm">
                      {projectsData[activeProjectIdx].category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-[#0A1128]/15 text-[#0A1128] text-[10px] font-mono font-bold shadow-sm">
                      {projectsData[activeProjectIdx].year}
                    </span>
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-[#0A1128]/15 text-[#0A1128] font-mono text-[10px] font-bold shadow-sm">
                    {projectsData[activeProjectIdx].duration}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    playClickTone();
                    setActiveVideo(projectsData[activeProjectIdx]);
                  }}
                  className="absolute bottom-3 right-3 z-10 w-11 h-11 rounded-full bg-[#F5C400] text-[#060B1A] border border-[#0A1128]/20 flex items-center justify-center shadow-lg active:scale-95"
                  aria-label={`Play preview for ${projectsData[activeProjectIdx].title}`}
                >
                  <Play size={18} className="ml-0.5 fill-current" />
                </button>
              </div>
              <div className="p-4 sm:p-5 bg-white text-[#0A1128]">
                <div className="text-[10px] font-mono text-[#0A1128] mb-1 font-bold">
                  CLIENT: <strong className="text-[#0A1128] font-black">{projectsData[activeProjectIdx].client}</strong>
                </div>
                <Link
                  to={`/work/${projectsData[activeProjectIdx].slug}`}
                  onClick={playClickTone}
                  className="hover:text-[#D4A100] transition-colors block"
                >
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-[#0A1128] leading-tight">
                    {projectsData[activeProjectIdx].title}
                  </h3>
                </Link>
                <p className="mt-2 text-xs text-[#0A1128]/80 font-medium line-clamp-2 leading-relaxed">
                  {projectsData[activeProjectIdx].tagline}
                </p>
                {projectsData[activeProjectIdx].impactMetrics && projectsData[activeProjectIdx].impactMetrics.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-2 pt-2.5 border-t border-[#0A1128]/10 text-left">
                    {projectsData[activeProjectIdx].impactMetrics.slice(0, 2).map((metric, mIdx) => (
                      <div key={mIdx} className="bg-slate-50 p-2 rounded-xl border border-[#0A1128]/10">
                        <div className="font-serif text-xs font-black text-[#0A1128]">{metric.value}</div>
                        <div className="text-[9px] font-mono text-[#0A1128]/70 uppercase truncate font-bold">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4 pt-3 border-t border-[#0A1128]/10 flex items-center justify-between">
                  <Link
                    to={`/work/${projectsData[activeProjectIdx].slug}`}
                    onClick={playClickTone}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-black uppercase tracking-wider text-[#0A1128] hover:text-[#D4A100]"
                  >
                    <span>Explore Case Study</span>
                    <ArrowUpRight size={13} />
                  </Link>
                  <span className="font-mono text-xs text-[#0A1128] font-black">
                    0{activeProjectIdx + 1} / 0{cardCount}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 pb-2 sm:pb-1 text-xs font-mono text-[#0A1128] border-t border-[#0A1128]/15">
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
                ? 'Select or swipe to explore'
                : activeProjectIdx === cardCount - 1
                ? 'Explore all films or continue'
                : 'Select film to preview'}
            </span>
          </div>
        </div>
      </div>

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
