import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSound } from '../../context/SoundContext';

export const IntroSplash = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const highlightBarRef = useRef(null);
  const phraseRef = useRef(null);
  const counterRef = useRef(null);
  const { playCinemaChord } = useSound();
  const [hasSeen, setHasSeen] = useState(false);

  useEffect(() => {
    // Check session storage
    const seen = sessionStorage.getItem('highlight_intro_seen');
    if (seen) {
      setHasSeen(true);
      if (onComplete) onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('highlight_intro_seen', 'true');
          setHasSeen(true);
          if (onComplete) onComplete();
        }
      });

      // Step 1: Initial state
      gsap.set(logoRef.current, { opacity: 0, y: 20, scale: 0.95 });
      gsap.set(highlightBarRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('.intro-word', { y: '100%', opacity: 0 });
      gsap.set(counterRef.current, { opacity: 0 });

      // Step 2: Play sound & animate logo reveal
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        onStart: () => playCinemaChord()
      })
      .to(highlightBarRef.current, {
        scaleX: 1,
        duration: 0.5,
        ease: 'expo.out'
      }, '-=0.3')
      .to(counterRef.current, {
        opacity: 1,
        duration: 0.3
      }, '-=0.3')
      // Step 3: Animate individual words
      .to('.intro-word', {
        y: '0%',
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out'
      }, '-=0.2')
      // Pause briefly for impact
      .to({}, { duration: 0.8 })
      // Step 4: Cinematic curtain slide up
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete, playCinemaChord]);

  const handleSkip = () => {
    sessionStorage.setItem('highlight_intro_seen', 'true');
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setHasSeen(true);
        if (onComplete) onComplete();
      }
    });
  };

  if (hasSeen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-white text-[#0A1128] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
    >
      {/* Subtle warm golden ambient glow */}
      <div className="absolute w-[650px] h-[650px] bg-[#F5C400]/15 rounded-full blur-[160px] pointer-events-none -translate-y-12" />

      {/* Film slate corner indicator */}
      <div className="absolute top-8 left-8 flex items-center gap-3 text-xs tracking-widest text-[#0A1128] font-mono font-bold">
        <span className="w-2.5 h-2.5 rounded-full bg-[#F5C400] animate-pulse" />
        <span>HIGHLIGHT CO. // REEL 2026</span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        {/* Animated Brand Logo */}
        <div ref={logoRef} className="mb-10 inline-flex items-baseline font-serif text-4xl sm:text-6xl md:text-7xl">
          <div className="relative inline-block">
            <div
              ref={highlightBarRef}
              className="absolute inset-x-[-8px] top-[40%] bottom-[12%] bg-[#F5C400] -rotate-1 rounded-sm shadow-lg shadow-[#F5C400]/30"
            />
            <span className="relative z-10 font-bold lowercase text-[#060B1A] italic pr-1">
              highlight
            </span>
          </div>
          <span className="ml-3 font-bold text-[#0A1128] tracking-tight">Co.</span>
          <span className="ml-2 text-[0.8em] font-bold italic text-[#0A1128]/80">Media</span>
        </div>

        {/* Cinematic Manifesto Tagline */}
        <div ref={phraseRef} className="flex flex-wrap justify-center gap-x-3.5 gap-y-2 text-2xl sm:text-3xl md:text-4xl font-heading font-black tracking-tight text-[#0A1128] overflow-hidden">
          {["CRAFT", "FILMS", "&", "CAMPAIGNS", "THAT"].map((word, idx) => (
            <span key={idx} className="overflow-hidden inline-block py-1">
              <span className="intro-word inline-block text-[#0A1128] font-black">
                {word}
              </span>
            </span>
          ))}
          <span className="overflow-hidden inline-block py-1">
            <span className="intro-word inline-block relative px-3 py-0.5 ml-1">
              <span className="absolute inset-0 bg-[#F5C400] rounded-sm -rotate-1 shadow-md shadow-[#F5C400]/40" />
              <span className="relative z-10 text-[#060B1A] font-serif italic font-black">MATTER.</span>
            </span>
          </span>
        </div>

        {/* Minimal Progress Line */}
        <div ref={counterRef} className="mt-12 flex flex-col items-center gap-2">
          <div className="w-32 h-[3px] bg-[#0A1128]/20 rounded-full overflow-hidden">
            <div className="w-full h-full bg-[#F5C400] origin-left animate-[marquee_1.8s_ease-in-out_infinite]" />
          </div>
          <span className="text-[10px] tracking-widest text-[#0A1128] uppercase font-mono font-black">
            CINEMATIC OPENING // 2026
          </span>
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 px-5 py-2.5 text-xs tracking-widest uppercase font-heading font-black text-[#0A1128] hover:text-[#060B1A] hover:bg-[#F5C400] border-2 border-[#0A1128] rounded-full transition-all duration-300 bg-white shadow-md cursor-pointer"
      >
        Skip Intro ↵
      </button>
    </div>
  );
};
