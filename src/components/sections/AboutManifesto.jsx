import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { studioStats } from '../../data/teamData';
import { MagneticButton } from '../common/MagneticButton';
import { ArrowUpRight, Award, Compass, Eye, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AboutManifesto = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-number',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-6 sm:px-8 md:px-12 bg-white border-t-2 border-[#0A1128]/20 overflow-hidden text-[#0A1128] select-none"
    >
      {/* Background glow & subtle film geometry */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#F5C400]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Manifesto Headline */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black mb-4 block">
              // STUDIO ETHOS & MANIFESTO
            </span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-[#0A1128] leading-[1.08] tracking-tight uppercase">
              We Don't Just Make Films. <br />
              We Make Them{' '}
              <span className="relative inline-block text-[#060B1A] px-3.5 py-0.5 italic font-serif font-black ml-1">
                <span className="absolute inset-0 bg-[#F5C400] rounded-sm -rotate-1 shadow-lg shadow-[#F5C400]/40" />
                <span className="relative z-10">Matter.</span>
              </span>
            </h2>

            <p className="mt-8 text-lg sm:text-xl font-sans text-[#0A1128] font-semibold leading-relaxed">
              Highlight Co is a creative film and media production agency creating films and campaigns for brands, enterprises, and causes that have something worth saying.
            </p>

            <p className="mt-4 text-base text-[#0A1128] font-normal leading-relaxed">
              In an era overwhelmed by disposable digital noise, we believe stories deserve more than fleeting attention—they deserve enduring emotional impact. We combine world-class cinematic craftsmanship with deep commercial insight to turn complex narratives into unforgettable visual milestones.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <MagneticButton
                to="/about"
                variant="primary"
                size="md"
                className="bg-[#F5C400] text-[#060B1A] font-black border-2 border-[#0A1128] shadow-lg shadow-[#F5C400]/30 hover:bg-[#FFE042]"
              >
                <span>The Highlight Method</span>
                <ArrowUpRight size={16} />
              </MagneticButton>

              <Link
                to="/team"
                className="text-xs uppercase font-heading tracking-widest font-black text-[#0A1128] hover:text-[#D4A100] transition-colors flex items-center gap-2"
              >
                <span>Meet The Directors</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Key Tenets & Interactive Matrix */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border-2 border-[#0A1128] space-y-3.5 hover:border-[#D4A100] transition-all shadow-md">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#F5C400]/20 border-2 border-[#0A1128] flex items-center justify-center text-[#0A1128]">
                  <Compass size={22} />
                </div>
                <div>
                  <h4 className="font-serif font-black text-lg text-[#0A1128]">Narrative Authenticity</h4>
                  <span className="text-[11px] font-mono text-[#0A1128] font-bold">Zero Superficial Corporate Tropes</span>
                </div>
              </div>
              <p className="text-xs text-[#0A1128] font-medium leading-relaxed">
                We spend time embedded on the ground, uncovering the human pulse that turns a corporate statement into an emotional movement.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border-2 border-[#0A1128] space-y-3.5 hover:border-[#D4A100] transition-all shadow-md">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#F5C400]/20 border-2 border-[#0A1128] flex items-center justify-center text-[#0A1128]">
                  <Eye size={22} />
                </div>
                <div>
                  <h4 className="font-serif font-black text-lg text-[#0A1128]">Cinema-Grade Production</h4>
                  <span className="text-[11px] font-mono text-[#0A1128] font-bold">ARRI • RED • Anamorphic Glass</span>
                </div>
              </div>
              <p className="text-xs text-[#0A1128] font-medium leading-relaxed">
                Every frame is treated as a piece of art. High dynamic range color grading, spatial sound design, and master-level optics.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border-2 border-[#0A1128] space-y-3.5 hover:border-[#D4A100] transition-all shadow-md">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#F5C400]/20 border-2 border-[#0A1128] flex items-center justify-center text-[#0A1128]">
                  <Award size={22} />
                </div>
                <div>
                  <h4 className="font-serif font-black text-lg text-[#0A1128]">Measurable Cultural Reach</h4>
                  <span className="text-[11px] font-mono text-[#0A1128] font-bold">From Cannes to Global Boardrooms</span>
                </div>
              </div>
              <p className="text-xs text-[#0A1128] font-medium leading-relaxed">
                Our films don’t just win global awards—they drive tangible capital, galvanize workforces, and reshape brand equity.
              </p>
            </div>
          </div>
        </div>

        {/* Live Animated Metric Counters */}
        <div className="mt-20 pt-16 border-t-2 border-[#0A1128]/20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {studioStats.map((stat, idx) => (
            <div key={idx} className="stat-number flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-[#0A1128]">
                  {stat.value}
                </span>
                <span className="font-serif text-3xl font-black text-[#F5C400]">
                  {stat.suffix}
                </span>
              </div>
              <span className="mt-2 text-sm font-heading font-black uppercase tracking-wider text-[#0A1128]">
                {stat.label}
              </span>
              <span className="text-xs font-mono text-[#0A1128] font-bold mt-0.5">
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
