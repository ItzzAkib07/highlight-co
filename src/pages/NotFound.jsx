import React from 'react';
import { Link } from 'react-router-dom';
import { MagneticButton } from '../components/common/MagneticButton';
import { Film, Clapperboard, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center select-none pt-24 overflow-hidden">
      {/* Dynamic Animated Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-cinema-grid opacity-35" />
        <div className="absolute inset-0 bg-cinema-lines opacity-20" />
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#F5C400]/20 via-[#F5C400]/5 to-transparent blur-[140px] animate-float-slow" />
        <div className="absolute -bottom-20 -right-20 w-[550px] h-[550px] rounded-full bg-gradient-to-tl from-[#0A1128]/10 via-[#F5C400]/15 to-transparent blur-[160px] animate-float-reverse" />
      </div>

      <div className="relative z-10 max-w-xl flex flex-col items-center bg-white/90 backdrop-blur-xl text-[#0A1128] p-8 sm:p-14 rounded-3xl border border-[#0A1128]/15 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#F5C400]/30 border border-[#0A1128]/20 flex items-center justify-center text-[#0A1128] mb-6">
          <Clapperboard size={32} />
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-[#0A1128] font-black mb-2">
          SCENE 404 // TAKE 01 — CUT!
        </span>

        <h1 className="text-4xl sm:text-6xl font-serif font-black text-[#0A1128] leading-tight">
          Lost In The Cutting Room
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#0A1128] font-medium leading-relaxed">
          The scene or frame you are looking for has been trimmed from the final timeline or relocated to the director's vault.
        </p>

        <div className="mt-8">
          <MagneticButton
            to="/"
            variant="primary"
            size="md"
            className="bg-[#F5C400] text-[#060B1A] border border-[#0A1128]/20 font-black"
          >
            <ArrowLeft size={16} />
            <span>Return To Main Frame</span>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};
