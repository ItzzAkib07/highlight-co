import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { studioStats } from '../data/teamData';
import { ContactCTA } from '../components/sections/ContactCTA';
import { Film, Award, HeartHandshake, Eye, Sparkles, Camera, Sliders, Check } from 'lucide-react';
import { MagneticButton } from '../components/common/MagneticButton';

export const About = () => {
  const gearInventory = [
    { name: "ARRI Alexa Mini LF", category: "Large Format Cinema Sensor", note: "Signature organic skin tones & wide dynamic range" },
    { name: "RED V-Raptor 8K VV", category: "High-Speed Dynamic Cinema", note: "Ultra-fast frame rates & raw sensor latitude" },
    { name: "Phantom Flex 4K", category: "1000fps Ultra High-Speed", note: "Microscopic food textures & fluid dynamics" },
    { name: "Cooke Anamorphic /i Primes", category: "Full-Frame Anamorphic Glass", note: "Classic oval bokeh & warm optical flares" },
    { name: "DaVinci Resolve Studio & Flanders", category: "DCI-P3 Mastering Suite", note: "Color science calibrated to theater standards" },
    { name: "Dolby Atmos 7.1.4 Monitoring", category: "Spatial Audio Foley Suite", note: "Multi-layered immersive soundscapes" }
  ];

  return (
    <div className="relative w-full bg-white min-h-screen pt-32 pb-16 overflow-hidden select-none">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-gradient-to-br from-[#F5C400]/15 via-amber-200/10 to-transparent rounded-full blur-[170px] animate-float-slow pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-[650px] h-[650px] bg-gradient-to-bl from-[#0A1128]/5 via-[#F5C400]/10 to-transparent rounded-full blur-[160px] animate-float-reverse pointer-events-none" />
        <div className="absolute inset-0 bg-cinema-grid opacity-35" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        {/* Page Header */}
        <SectionHeader
          number="THE STUDIO // IDENTITY"
          badge="Philosophy & Ethos"
          title="Films That Leave"
          highlightWord="A Mark."
          subtitle="Highlight Co is a creative film and media production agency creating films and campaigns for brands, enterprises, and causes that have something worth saying."
          className="mb-16"
        />

        {/* Hero Image Showcase */}
        <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden bg-white border border-[#0A1128]/15 mb-20 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
            alt="Highlight Co Studio Production"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 z-10 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#0A1128]/15 text-xs font-mono text-[#0A1128] font-black shadow-sm">
            HIGHLIGHT CO // MUMBAI & PUNE SETS
          </div>
        </div>

        {/* The Manifesto Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 text-[#0A1128]">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0A1128] font-black block">
              // OUR CONVICTION
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#0A1128] leading-tight uppercase">
              "Good films show. <br />
              <span className="relative inline-block mt-1">
                <span className="relative z-10 text-[#060B1A] px-3.5 py-0.5 inline-block italic font-serif font-black">
                  <span className="absolute inset-0 bg-[#F5C400] rounded-sm -rotate-1 shadow-md shadow-[#F5C400]/40" />
                  <span className="relative z-10 text-[#060B1A] font-serif italic font-black">Great films stay."</span>
                </span>
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#0A1128] font-bold leading-relaxed">
              We started Highlight Co because we were exhausted by corporate video that felt sterile, cookie-cutter, and forgettable.
            </p>
            <p className="text-sm sm:text-base text-[#0A1128] font-medium leading-relaxed">
              Every company has human beings behind it. Every CSR initiative impacts a family with a heartbeat. Every culinary dish represents hundreds of hours of obsession. Our mission is simple: to strip away the artificial fluff and highlight the truth that moves audiences to act.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-[#0A1128]/15 shadow-sm space-y-3">
              <Eye size={24} className="text-[#0A1128]" />
              <h4 className="font-serif font-black text-lg text-[#0A1128]">Visual Dignity</h4>
              <p className="text-xs text-[#0A1128] font-medium leading-relaxed">
                Whether we film in a high-tech cleanroom or an arid drought village, we treat every subject with reverence and aesthetic beauty.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-[#0A1128]/15 shadow-sm space-y-3">
              <HeartHandshake size={24} className="text-[#0A1128]" />
              <h4 className="font-serif font-black text-lg text-[#0A1128]">Collaborative Trust</h4>
              <p className="text-xs text-[#0A1128] font-medium leading-relaxed">
                We act as embedded creative partners, advising founders, CMOs, and sustainability directors at every step.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-[#0A1128]/15 shadow-sm space-y-3">
              <Camera size={24} className="text-[#0A1128]" />
              <h4 className="font-serif font-black text-lg text-[#0A1128]">Hollywood Optics</h4>
              <p className="text-xs text-[#0A1128] font-medium leading-relaxed">
                Full-frame anamorphic lenses, specialized lighting, and calibrated color grading that rival feature films.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-[#0A1128]/15 shadow-sm space-y-3">
              <Award size={24} className="text-[#0A1128]" />
              <h4 className="font-serif font-black text-lg text-[#0A1128]">Guaranteed Impact</h4>
              <p className="text-xs text-[#0A1128] font-medium leading-relaxed">
                Films built with strategic clarity to achieve tangible investor, customer, and public engagement.
              </p>
            </div>
          </div>
        </div>

        {/* Studio Equipment & Standards */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black block">
              // STUDIO INFRASTRUCTURE
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-black text-[#0A1128] mt-2">
              Cinema Hardware & Color Science
            </h3>
            <p className="text-sm text-[#0A1128] font-medium mt-2">
              We own and operate cinema packages designed for extreme versatility, high dynamic range, and sensory precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gearInventory.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white text-[#0A1128] border border-[#0A1128]/15 shadow-sm hover:shadow-xl transition-all"
              >
                <span className="text-[10px] font-mono text-[#0A1128] uppercase tracking-wider block font-black bg-[#F5C400]/30 px-2 py-0.5 rounded w-fit border border-[#0A1128]/20">
                  {item.category}
                </span>
                <h4 className="text-lg font-serif font-black text-[#0A1128] mt-2">
                  {item.name}
                </h4>
                <p className="text-xs text-[#0A1128] font-medium mt-2 leading-relaxed">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Studio Counters */}
        <div className="p-10 rounded-3xl bg-white border border-[#0A1128]/15 text-[#0A1128] grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center shadow-xl">
          {studioStats.map((stat, i) => (
            <div key={i}>
              <span className="font-serif text-4xl sm:text-5xl font-black text-[#0A1128] block">
                {stat.value}<span className="text-[#F5C400]">{stat.suffix}</span>
              </span>
              <span className="text-xs font-heading uppercase font-black tracking-wider text-[#0A1128] mt-1 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <ContactCTA />
    </div>
  );
};
