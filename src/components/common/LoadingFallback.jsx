import React from 'react';

export const LoadingFallback = () => {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-white text-brand-navy select-none p-6">
      <div className="relative inline-flex items-baseline font-serif text-3xl sm:text-4xl mb-4 animate-pulse">
        <div className="relative inline-block">
          <div className="absolute inset-x-[-6px] top-[40%] bottom-[12%] bg-brand-yellow -rotate-1 rounded-sm shadow-sm" />
          <span className="relative z-10 font-bold lowercase text-brand-navy italic pr-1">
            highlight
          </span>
        </div>
        <span className="ml-2 font-medium text-brand-navy">Co.</span>
      </div>

      <div className="w-32 h-[3px] bg-slate-100 rounded-full overflow-hidden mb-3">
        <div className="w-full h-full bg-brand-yellow origin-left animate-marquee" />
      </div>

      <span className="text-[10px] font-mono uppercase tracking-widest text-[#0A1128] font-black">
        Loading Production...
      </span>
    </div>
  );
};
