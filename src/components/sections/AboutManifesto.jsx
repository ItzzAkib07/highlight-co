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
      className="relative py-24 sm:py-32 px-6 sm:px-8 md:px-12 bg-white border-t border-[#0A1128]/10 overflow-hidden text-[#0A1128] select-none"
    >
      {/* Background dynamic cinema lighting, storyboard imagery & viewfinder crosshairs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Subtle Cinema Studio & Architecture Texture */}
        <div className="absolute inset-0 opacity-[0.14] mix-blend-multiply filter contrast-110">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
            alt="Studio Architecture"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Ambient Warm Golden & Navy Light Flares */}
        <div className="absolute -top-20 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-[#F5C400]/35 via-amber-300/20 to-transparent rounded-full blur-[140px] animate-float-slow" />
        <div className="absolute bottom-0 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-[#0A1128]/8 via-[#F5C400]/25 to-transparent rounded-full blur-[140px] animate-float-reverse" />

        {/* Viewfinder Crosshair & Corner Marks */}
        <div className="absolute top-10 left-10 w-6 h-6 border-t-2 border-l-2 border-[#F5C400] opacity-100 shadow-sm" />
        <div className="absolute top-10 right-10 w-6 h-6 border-t-2 border-r-2 border-[#F5C400] opacity-100 shadow-sm" />
        <div className="absolute bottom-10 left-10 w-6 h-6 border-b-2 border-l-2 border-[#F5C400] opacity-100 shadow-sm" />
        <div className="absolute bottom-10 right-10 w-6 h-6 border-b-2 border-r-2 border-[#F5C400] opacity-100 shadow-sm" />

        {/* Center Rule-of-Thirds Grid */}
        <div className="absolute inset-0 bg-cinema-grid opacity-60" />
        <div className="absolute inset-0 bg-cinema-lines opacity-35" />
      </div>

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
                className="bg-[#F5C400] text-[#060B1A] font-black border border-[#0A1128]/20 shadow-lg shadow-[#F5C400]/30 hover:bg-[#FFE042]"
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
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-[#0A1128]/15 space-y-3.5 hover:border-[#0A1128]/30 transition-all shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#F5C400]/20 border border-[#0A1128]/15 flex items-center justify-center text-[#0A1128]">
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

            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-[#0A1128]/15 space-y-3.5 hover:border-[#0A1128]/30 transition-all shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#F5C400]/20 border border-[#0A1128]/15 flex items-center justify-center text-[#0A1128]">
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

            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-[#0A1128]/15 space-y-3.5 hover:border-[#0A1128]/30 transition-all shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#F5C400]/20 border border-[#0A1128]/15 flex items-center justify-center text-[#0A1128]">
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
        <div className="mt-20 pt-16 border-t border-[#0A1128]/10 grid grid-cols-2 md:grid-cols-4 gap-8">
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
