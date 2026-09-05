import React from 'react';

export const MarqueeTicker = ({ reverse = false }) => {
  const items = [
    "CORPORATE FILMS",
    "CSR IMPACT STORIES",
    "F&B GASTRONOMY CINEMA",
    "ARRI ALEXA MINI LF",
    "COOKE ANAMORPHIC /i",
    "CRAFT FILMS THAT MATTER",
    "DAVINCI COLOR SCIENCE",
    "4K HDR MASTERING",
    "CANNES CORPORATE WINNERS",
    "HIGHLIGHT CO."
  ];

  return (
    <div className="relative w-full py-4 sm:py-5 bg-white border-y border-[#0A1128]/10 overflow-hidden select-none shadow-sm">
      {/* Soft gradient masks at edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-4">
            <span className="text-xs md:text-sm font-heading font-black uppercase tracking-[0.25em] text-[#0A1128] hover:text-[#D4A100] transition-colors">
              {text}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#F5C400]" />
          </div>
        ))}
      </div>
    </div>
  );
};

