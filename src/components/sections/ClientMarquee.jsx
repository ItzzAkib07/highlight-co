import React from 'react';
import { clientBrands, awardsData } from '../../data/testimonialsData';
import { Award, Trophy } from 'lucide-react';

export const ClientMarquee = () => {
  return (
    <section className="py-20 bg-white border-y-2 border-[#0A1128]/20 overflow-hidden select-none text-[#0A1128]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 mb-12 text-center">
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
            className="p-5 rounded-2xl bg-slate-50 border-2 border-[#0A1128] text-center flex flex-col items-center justify-center shadow-md hover:border-[#D4A100] transition-all"
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
              className="flex items-center gap-3 px-8 py-3.5 mx-3 rounded-full border-2 border-[#0A1128] bg-white hover:bg-[#F5C400] transition-all shadow-sm"
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
