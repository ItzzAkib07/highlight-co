import React from 'react';
import { Link } from 'react-router-dom';
import { MagneticButton } from '../components/common/MagneticButton';
import { Film, Clapperboard, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center select-none pt-24">
      <div className="relative z-10 max-w-xl flex flex-col items-center bg-white text-[#0A1128] p-8 sm:p-14 rounded-3xl border-2 border-[#0A1128] shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#F5C400]/30 border-2 border-[#0A1128] flex items-center justify-center text-[#0A1128] mb-6">
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
            className="bg-[#F5C400] text-[#060B1A] border-2 border-[#0A1128] font-black"
          >
            <ArrowLeft size={16} />
            <span>Return To Main Frame</span>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};
