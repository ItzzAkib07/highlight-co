import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from '../common/MagneticButton';
import { ArrowUpRight, Film, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ParallaxStory = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.fromTo(
        textRef.current,
        { y: 60, opacity: 0.2 },
        {
          y: -40,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] py-32 px-6 sm:px-8 md:px-12 bg-brand-navyDark overflow-hidden flex items-center justify-center select-none"
    >
      {/* Parallax Background Media Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div ref={imageRef} className="w-full h-[120%] -top-[10%] relative">
          <img
            src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=2000&q=85"
            alt="Cinematic Parallax Story"
            className="w-full h-full object-cover object-center filter brightness-50 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navyDark via-brand-navyDark/60 to-brand-navyDark/80" />
        </div>
      </div>

      {/* Foreground Content Card */}
      <div
        ref={textRef}
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center bg-white/95 backdrop-blur-2xl p-8 sm:p-12 md:p-16 rounded-3xl border-2 border-[#0A1128] shadow-2xl text-[#0A1128]"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5C400]/20 border-2 border-[#0A1128] text-[#0A1128] text-xs font-mono font-black tracking-widest uppercase mb-6">
          <Film size={14} className="text-[#0A1128]" />
          <span>CINEMATIC CASE STUDY // CSR SPOTLIGHT</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-[#0A1128] leading-tight tracking-tight uppercase">
          "Every Brand Has A Story. <br />
          We Find The One <span className="relative inline-block text-[#060B1A] px-2.5 py-0.5 italic font-serif font-black ml-1"><span className="absolute inset-0 bg-[#F5C400] rounded-sm -rotate-1 shadow-md shadow-[#F5C400]/40" /><span className="relative z-10">Worth Telling."</span></span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-[#0A1128] font-medium max-w-2xl leading-relaxed">
          In 'Every Drop Matters', we embedded our film crew across 120 drought-hit villages in western India. What emerged was not a narrative of hardship, but an unforgettable chronicle of women who engineered a water revolution.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#0A1128] font-bold">
          <span>CLIENT: <strong className="text-[#0A1128] font-black">Jal Jeevan Foundation</strong></span>
          <span>•</span>
          <span>LOCATION: <strong className="text-[#0A1128] font-black">Western Ghats</strong></span>
          <span>•</span>
          <span>IMPACT: <strong className="text-[#D4A100] font-black">$12M Raised</strong></span>
        </div>

        <div className="mt-10">
          <MagneticButton
            to="/work/every-drop-matters"
            variant="primary"
            size="md"
          >
            <span>Explore Full Case Study</span>
            <ArrowUpRight size={16} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
