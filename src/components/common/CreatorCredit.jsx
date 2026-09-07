import React, { useState, useEffect, useRef } from 'react';
import { Heart, ArrowUpRight, Sparkles } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

const HEART_ICONS = ['❤️', '💖', '💕', '💗', '💓', '✨'];

export const CreatorCredit = ({ className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hearts, setHearts] = useState([]);
  const heartIdRef = useRef(0);
  const { playClickTone, playWhoosh } = useSound();

  useEffect(() => {
    if (!isHovered) return;

    // Continuously spawn hearts while hovered
    const interval = setInterval(() => {
      const id = ++heartIdRef.current;
      const newHeart = {
        id,
        emoji: HEART_ICONS[Math.floor(Math.random() * HEART_ICONS.length)],
        left: Math.random() * 80 + 10, // 10% to 90% across badge width
        bottom: 10,
        driftX: (Math.random() - 0.5) * 60, // -30px to +30px drift
        rot: (Math.random() - 0.5) * 45, // -22.5deg to +22.5deg
        size: Math.random() * 8 + 14, // 14px to 22px
        duration: Math.random() * 0.6 + 1.2, // 1.2s to 1.8s
      };

      setHearts((prev) => [...prev.slice(-25), newHeart]);

      // Auto remove this heart after its animation completes
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, newHeart.duration * 1000);
    }, 140);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    playWhoosh();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Floating Popping Hearts Container */}
      <div className="absolute inset-0 pointer-events-none overflow-visible z-50">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="absolute animate-heart-pop select-none pointer-events-none drop-shadow-sm"
            style={{
              left: `${h.left}%`,
              bottom: `${h.bottom}px`,
              fontSize: `${h.size}px`,
              '--drift-x': `${h.driftX}px`,
              '--rot': `${h.rot}deg`,
              '--duration': `${h.duration}s`,
            }}
          >
            {h.emoji}
          </span>
        ))}
      </div>

      {/* Light Heart Themed Creator Box */}
      <a
        href="https://dezifolio.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={playClickTone}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50/90 hover:bg-rose-100/95 border border-rose-200/80 hover:border-rose-300 shadow-sm hover:shadow-md transition-all duration-300 text-rose-950 select-none backdrop-blur-md active:scale-95"
        title="Visit Akib's Portfolio (dezifolio.netlify.app)"
      >
        {/* Pulsing Heart Icon */}
        <span className="relative flex items-center justify-center">
          <Heart
            size={13}
            className="text-rose-500 fill-rose-500 group-hover:scale-125 transition-transform duration-300 animate-pulse"
          />
        </span>

        {/* Text Details */}
        <span className="text-[11px] font-sans font-medium tracking-wide flex items-center gap-1 text-rose-900">
          <span>Crafted with</span>
          <span className="font-semibold text-rose-600 group-hover:text-rose-700">love</span>
          <span>by</span>
          <strong className="font-black text-rose-950 underline decoration-rose-400/60 underline-offset-2 group-hover:decoration-rose-600 transition-colors">
            Akib
          </strong>
        </span>

        {/* Mini External Indicator */}
        <ArrowUpRight
          size={12}
          className="text-rose-400 group-hover:text-rose-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
        />
      </a>
    </div>
  );
};
