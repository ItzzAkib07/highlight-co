import React from 'react';
import { InteractivePrism } from '../three/InteractivePrism';
import { SectionHeader } from '../common/SectionHeader';
import { Sliders, Camera, Sparkles, Layers } from 'lucide-react';

export const ThreeDSection = () => {
  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-8 md:px-12 bg-white border-y border-[#0A1128]/10 overflow-hidden text-[#0A1128]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Context & Optics Details */}
          <div className="lg:col-span-6">
            <SectionHeader
              number="03 // OPTICAL PRECISION"
              badge="Cinematography Science"
              title="Where Artistry Meets"
              highlightWord="Optics."
              subtitle="We believe camera glass is not just a tool—it is the emotional prism through which your brand's soul is projected."
              className="mb-8"
            />

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-[#0A1128]/15 shadow-sm hover:border-[#0A1128]/30 transition-all">
                <div className="p-3 rounded-xl bg-[#F5C400]/20 border border-[#0A1128]/15 text-[#0A1128] flex-shrink-0">
                  <Camera size={22} className="text-[#0A1128]" />
                </div>
                <div>
                  <h4 className="text-base font-serif font-black text-[#0A1128]">Cooke & Leica Anamorphic Heritage</h4>
                  <p className="text-xs text-[#0A1128] font-medium mt-1 leading-relaxed">
                    Organic cinematic bokeh, horizontal optical flares, and tactile organic textures unmatched by digital filters.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-[#0A1128]/15 shadow-sm hover:border-[#0A1128]/30 transition-all">
                <div className="p-3 rounded-xl bg-[#F5C400]/20 border border-[#0A1128]/15 text-[#0A1128] flex-shrink-0">
                  <Layers size={22} className="text-[#0A1128]" />
                </div>
                <div>
                  <h4 className="text-base font-serif font-black text-[#0A1128]">Full-Frame DCI-P3 Color Grading</h4>
                  <p className="text-xs text-[#0A1128] font-medium mt-1 leading-relaxed">
                    DaVinci Resolve Studio color calibration tuned specifically for high dynamic range HDR broadcast and cinema screens.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-slate-50 p-2 border border-[#0A1128]/15 shadow-xl overflow-hidden">
              <InteractivePrism />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
