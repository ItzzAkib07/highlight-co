import React, { useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export const VideoModal = ({ isOpen, onClose, videoUrl, title, category }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-brand-black/95 backdrop-blur-2xl animate-fade-in select-none">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5C400] hover:bg-[#FFE042] text-[#060B1A] border-2 border-[#0A1128] transition-all duration-300 font-heading text-xs font-black uppercase tracking-widest shadow-xl cursor-pointer"
      >
        <span>Close Reel</span>
        <X size={16} />
      </button>

      {/* Video title watermark */}
      <div className="absolute top-6 left-6 z-20 hidden sm:flex items-center gap-3 bg-white/95 px-4 py-2 rounded-full border-2 border-[#0A1128] text-[#0A1128] font-mono text-xs font-black shadow-xl">
        <span className="w-2 h-2 rounded-full bg-[#F5C400] animate-ping" />
        <span className="text-[#0A1128] font-serif font-black">{title}</span>
        {category && <span className="text-[#D4A100]">[{category}]</span>}
      </div>

      {/* Video Container */}
      <div className="relative w-full max-w-5xl max-h-[85vh] aspect-video bg-black rounded-2xl overflow-hidden border-2 border-[#0A1128] shadow-2xl shadow-brand-yellow/10 flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          controls
          playsInline
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};
