import React from 'react';
import { Link } from 'react-router-dom';

export const BrandLogo = ({ className = "", size = "default", showMediaText = true, isLight = false }) => {
  // size can be 'sm', 'default', 'lg', 'xl'
  const sizeClasses = {
    sm: "text-lg md:text-xl",
    default: "text-xl md:text-2xl",
    lg: "text-2xl md:text-3xl",
    xl: "text-4xl md:text-6xl"
  };

  return (
    <Link 
      to="/" 
      className={`inline-flex items-center gap-1.5 font-serif select-none group transition-transform duration-300 hover:scale-[1.02] ${className}`}
      aria-label="Highlight Co Home"
    >
      <div className="relative inline-flex items-baseline">
        {/* The signature yellow highlighter bar behind 'highlight' */}
        <span className="relative z-10 font-bold tracking-tight lowercase text-[#0A1128]">
          <span className="relative px-1.5 py-0.5 inline-block">
            <span className="absolute inset-0 bg-[#F5C400] rounded-sm -rotate-0.5 shadow-sm shadow-[#F5C400]/30 group-hover:bg-[#FFE042] transition-colors duration-300"></span>
            <span className="relative z-10 text-[#060B1A] font-serif italic font-bold">
              highlight
            </span>
          </span>
        </span>
        
        {/* The serif 'Co.' */}
        <span className="ml-1.5 font-serif font-black tracking-normal text-[#0A1128] group-hover:text-[#F5C400] transition-colors duration-300">
          Co.
        </span>

        {/* Optional 'Media' text as in the logo */}
        {showMediaText && (
          <span className="ml-1 text-[0.85em] font-serif font-bold italic tracking-wider text-[#0A1128]/80">
            Media
          </span>
        )}
      </div>
    </Link>
  );
};
