import React from 'react';

export const SectionHeader = ({
  number,
  badge,
  title,
  subtitle,
  highlightWord,
  alignment = "left", // 'left', 'center', 'right'
  isDarkTheme = false,
  className = ""
}) => {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto"
  };

  return (
    <div className={`flex flex-col mb-12 sm:mb-16 md:mb-20 max-w-4xl ${alignClasses[alignment]} ${className}`}>
      {/* Editorial Number & Category Badge */}
      <div className="flex items-center gap-3 mb-4">
        {number && (
          <span className="font-mono text-xs tracking-widest font-black px-3.5 py-1 rounded-full text-[#0A1128] bg-white border border-[#0A1128]/15 shadow-sm">
            {number}
          </span>
        )}
        {badge && (
          <span className="text-xs uppercase tracking-[0.25em] font-heading font-black text-[#0A1128]">
            {badge}
          </span>
        )}
      </div>

      {/* Main Large Title */}
      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black text-[#0A1128] leading-[1.08] tracking-tight uppercase">
        {title}
        {highlightWord && (
          <span className="relative inline-block ml-3 group/highlight cursor-default">
            <span className="relative z-10 text-[#060B1A] px-3.5 py-0.5 inline-block italic font-serif font-black transition-transform duration-300 group-hover/highlight:scale-105">
              <span className="absolute inset-0 bg-[#F5C400] rounded-sm -rotate-1 shadow-md shadow-[#F5C400]/40 group-hover/highlight:rotate-0 group-hover/highlight:shadow-lg group-hover/highlight:shadow-[#F5C400]/60 transition-all duration-300" />
              <span className="relative z-10 text-[#060B1A] font-serif italic font-black">{highlightWord}</span>
            </span>
          </span>
        )}
      </h2>

      {/* Subtitle / Narrative Description */}
      {subtitle && (
        <p className="mt-5 text-base sm:text-lg md:text-xl font-sans text-[#0A1128] leading-relaxed max-w-2xl font-semibold">
          {subtitle}
        </p>
      )}
    </div>
  );
};
