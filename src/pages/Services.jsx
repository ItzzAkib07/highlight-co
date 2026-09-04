import React from 'react';
import { servicesData, productionProcess } from '../data/servicesData';
import { SectionHeader } from '../components/common/SectionHeader';
import { ContactCTA } from '../components/sections/ContactCTA';
import { MagneticButton } from '../components/common/MagneticButton';
import { CheckCircle2, Film, Camera, Sparkles, Sliders, ArrowUpRight, Cpu } from 'lucide-react';

export const Services = () => {
  return (
    <div className="relative w-full bg-white min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Page Header */}
        <SectionHeader
          number="PRODUCTION SUITE // 2026"
          badge="End-to-End Capabilities"
          title="Bespoke Cinema For"
          highlightWord="Every Scale."
          subtitle="From commercial high-fashion gastronomy to complex industrial infrastructure and grassroots humanitarian stories."
          className="mb-16"
        />

        {/* Detailed Services Grid */}
        <div className="space-y-16 mb-28 text-[#0A1128]">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 sm:p-12 rounded-3xl bg-slate-50 border-2 border-[#0A1128] shadow-md transition-all items-center"
            >
              {/* Left Media Thumbnail */}
              <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border-2 border-[#0A1128]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#0A1128] text-[#0A1128] font-mono text-xs font-black shadow-md">
                  SPEC {service.number}
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#0A1128] font-black">
                    {service.number} // {service.title}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-[#0A1128] mt-1">
                    {service.headline}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#0A1128] font-medium leading-relaxed">
                    {service.longDescription}
                  </p>
                </div>

                {/* Capabilities grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t-2 border-[#0A1128]/15">
                  {service.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#0A1128] font-sans font-bold">
                      <CheckCircle2 size={16} className="text-[#0A1128] flex-shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                {/* Camera / Rig standard */}
                {service.gear && (
                  <div className="p-3.5 rounded-2xl bg-white border-2 border-[#0A1128] flex items-center gap-2.5 text-xs font-mono text-[#0A1128] font-bold">
                    <Camera size={16} className="text-[#0A1128] flex-shrink-0" />
                    <span>Rig Standard: <strong className="text-[#0A1128] font-black">{service.gear}</strong></span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 4-Step Production Pipeline */}
        <div className="mb-28 text-[#0A1128]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black">
              // THE HIGHLIGHT ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#0A1128] mt-2">
              Our 4-Phase Production Method
            </h2>
            <p className="text-sm sm:text-base text-[#0A1128] font-semibold mt-3">
              How we take an abstract strategic brief and deliver award-caliber cinema on time and on budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productionProcess.map((step, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white text-[#0A1128] border-2 border-[#0A1128] flex flex-col justify-between hover:shadow-xl transition-all duration-300 shadow-md"
              >
                <div>
                  <span className="font-serif text-4xl sm:text-5xl font-black text-[#0A1128] block mb-4">
                    {step.step}
                  </span>
                  <h4 className="text-xl font-serif font-black text-[#0A1128] mb-3">
                    {step.phase}
                  </h4>
                  <p className="text-xs text-[#0A1128] font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <ContactCTA />
    </div>
  );
};
