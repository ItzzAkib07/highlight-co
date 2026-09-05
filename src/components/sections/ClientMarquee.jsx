import React from 'react';
import { clientBrands, awardsData } from '../../data/testimonialsData';
import { Award, Trophy } from 'lucide-react';

export const ClientMarquee = () => {
  return (
    <section className="relative py-20 bg-white border-y border-[#0A1128]/10 overflow-hidden select-none text-[#0A1128]">
      {/* Dynamic Background Studio Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-[#F5C400]/12 via-amber-300/8 to-transparent rounded-full blur-[160px] animate-float-slow pointer-events-none" />
        <div className="absolute inset-0 bg-cinema-grid opacity-35" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 mb-12 text-center relative z-10">
        <span className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black">
          // TRUSTED BY BRANDS & FESTIVALS WORLDWIDE
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#0A1128] mt-2">
          Recognized For Visual Excellence
        </h3>
      </div>

      {/* Awards Laurels Grid */}
      <div className="max-w-6xl mx-auto px-6 mb-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {awardsData.map((award, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-50 border border-[#0A1128]/15 text-center flex flex-col items-center justify-center shadow-sm hover:border-[#0A1128]/30 transition-all"
          >
            <Trophy size={22} className="text-[#D4A100] mb-2" />
            <span className="text-xs font-mono text-[#0A1128] font-bold">{award.year} Laurels</span>
            <h4 className="text-sm font-serif font-black text-[#0A1128] mt-1">{award.title}</h4>
            <p className="text-[11px] text-[#0A1128] font-heading font-black tracking-wider uppercase mt-1">
              {award.festival}
            </p>
          </div>
        ))}
      </div>

      {/* Infinite Brand Partner Marquee */}
      <div className="relative w-full overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...clientBrands, ...clientBrands, ...clientBrands].map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-8 py-3.5 mx-3 rounded-full border border-[#0A1128]/15 bg-white hover:bg-[#F5C400] transition-all shadow-sm"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5C400]" />
              <span className="text-sm font-serif font-black text-[#0A1128] tracking-wide">
                {brand.name}
              </span>
              <span className="text-[10px] font-mono text-[#0A1128] uppercase font-bold">
                [{brand.category}]
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
