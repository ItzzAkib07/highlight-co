import React, { useState } from 'react';
import { testimonialsData } from '../../data/testimonialsData';
import { SectionHeader } from '../common/SectionHeader';
import { useSound } from '../../context/SoundContext';
import { useCursor } from '../../context/CursorContext';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';

export const Testimonials = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { playClickTone, playWhoosh } = useSound();
  const { setCursor, resetCursor } = useCursor();

  const handleNext = () => {
    playWhoosh();
    playClickTone();
    setCurrentIdx((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    playWhoosh();
    playClickTone();
    setCurrentIdx((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const current = testimonialsData[currentIdx];

  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-8 md:px-12 bg-white overflow-hidden select-none border-t border-[#0A1128]/10">
      {/* Ambient background studio lighting, projector atmosphere & acoustic soundwaves */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Subtle Cinema Theater Auditorium Background Texture */}
        <div className="absolute inset-0 opacity-[0.14] mix-blend-multiply filter contrast-110">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80"
            alt="Theater Auditorium Backdrop"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Ambient Pulsing Studio Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[600px] bg-gradient-to-r from-[#F5C400]/35 via-amber-200/20 to-[#0A1128]/8 rounded-full blur-[140px] animate-pulse-glow" />

        {/* Projector Light Beam Cone from Top Center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#F5C400]/25 via-amber-200/10 to-transparent blur-2xl pointer-events-none" />

        {/* Acoustic Soundwave Equalizer Bars along bottom */}
        <div className="absolute bottom-4 inset-x-0 flex items-end justify-center gap-1.5 opacity-40 pointer-events-none">
          {[16, 28, 12, 36, 20, 44, 18, 30, 14, 40, 22, 16, 32, 24, 12, 38, 26, 18, 42, 14].map((h, i) => (
            <div
              key={i}
              className="w-1.5 bg-[#0A1128] rounded-full animate-pulse"
              style={{
                height: `${h}px`,
                animationDelay: `${(i % 5) * 0.2}s`,
                animationDuration: '1.8s'
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-cinema-grid opacity-50" />
        <div className="absolute inset-0 bg-cinema-lines opacity-25" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader
          number="03 // PERSPECTIVES"
          badge="Client Partnerships"
          title="Words From"
          highlightWord="Collaborators."
          alignment="center"
          className="mb-16"
        />

        {/* Editorial Quote Card */}
        <div className="relative bg-slate-50 p-8 sm:p-12 md:p-16 rounded-3xl border border-[#0A1128]/15 shadow-sm transition-all duration-500 text-[#0A1128]">
          {/* Quote icon mark */}
          <div className="w-12 h-12 rounded-full bg-[#F5C400]/20 border border-[#0A1128]/15 flex items-center justify-center text-[#0A1128] mb-8 shadow-sm">
            <Quote size={24} className="fill-[#F5C400]/40 text-[#0A1128]" />
          </div>

          {/* Large Quote Statement */}
          <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-black text-[#0A1128] leading-relaxed italic">
            "{current.quote}"
          </blockquote>

          {/* Author & Project Metadata */}
          <div className="mt-10 pt-8 border-t border-[#0A1128]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h4 className="font-serif font-black text-lg sm:text-xl text-[#0A1128]">
                {current.author}
              </h4>
              <p className="text-xs sm:text-sm text-[#0A1128] font-sans font-semibold">
                {current.position}, <strong className="text-[#0A1128] font-black underline decoration-[#F5C400] decoration-2">{current.company}</strong>
              </p>
              <span className="text-[11px] font-mono text-[#0A1128] font-bold mt-1 block">
                Film: {current.project} ({current.year})
              </span>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className="w-12 h-12 rounded-full border border-[#0A1128]/15 bg-white hover:bg-[#F5C400] text-[#0A1128] shadow-sm transition-all flex items-center justify-center font-black active:scale-95"
                aria-label="Previous Testimonial"
              >
                <ArrowLeft size={18} />
              </button>

              <button
                onClick={handleNext}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className="w-12 h-12 rounded-full border border-[#0A1128]/15 bg-white hover:bg-[#F5C400] text-[#0A1128] shadow-sm transition-all flex items-center justify-center font-black active:scale-95"
                aria-label="Next Testimonial"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonialsData.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`h-2.5 rounded-full transition-all duration-300 border border-[#0A1128]/20 ${
                currentIdx === i ? 'w-8 bg-[#0A1128]' : 'w-2.5 bg-white hover:bg-[#F5C400]'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
