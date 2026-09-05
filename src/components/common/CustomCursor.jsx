import React, { useEffect, useState, useRef } from 'react';
import { useCursor } from '../../context/CursorContext';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { Play, ArrowLeftRight, Eye } from 'lucide-react';

export const CustomCursor = () => {
  const { cursorType, cursorText } = useCursor();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState([]);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Position and velocity refs for 60-120fps RAF loop
  const mousePos = useRef({ x: -100, y: -100 });
  const smoothPos = useRef({ x: -100, y: -100 });
  const prevPos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ speed: 0, angle: 0 });

  useEffect(() => {
    if (isMobile) return;

    let animId;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth physics loop
    const render = () => {
      // Direct instant position for precision center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Smooth trailing inertia for outer tracker ring
      const dx = mousePos.current.x - smoothPos.current.x;
      const dy = mousePos.current.y - smoothPos.current.y;
      smoothPos.current.x += dx * 0.18;
      smoothPos.current.y += dy * 0.18;

      // Velocity & direction calculation
      const moveX = mousePos.current.x - prevPos.current.x;
      const moveY = mousePos.current.y - prevPos.current.y;
      const speed = Math.min(Math.sqrt(moveX * moveX + moveY * moveY), 30);
      const angle = Math.atan2(moveY, moveX) * (180 / Math.PI);

      velocity.current.speed = speed;
      velocity.current.angle = angle;

      prevPos.current.x = mousePos.current.x;
      prevPos.current.y = mousePos.current.y;

      if (ringRef.current) {
        const stretchX = 1 + speed * 0.006;
        const stretchY = 1 - speed * 0.004;
        ringRef.current.style.transform = `translate3d(${smoothPos.current.x}px, ${smoothPos.current.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${stretchX}, ${stretchY})`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isMobile, isVisible]);

  // Clean up ripples after 500ms
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.filter((r) => Date.now() - r.id < 500));
    }, 500);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (isMobile || !isVisible) return null;

  const isView = cursorType === 'view';
  const isPlay = cursorType === 'play';
  const isHover = cursorType === 'hover' || cursorType === 'link';
  const isDrag = cursorType === 'drag';
  const hasCustomText = Boolean(cursorText);
  const isInteractiveBadge = isView || isPlay || hasCustomText || isDrag;

  return (
    <>
      {/* 1. Precision Center Solid Black Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <div
          className={`rounded-full bg-[#0A1128] transition-all duration-200 ${
            isInteractiveBadge
              ? 'opacity-0 scale-0'
              : isHover
              ? 'w-1.5 h-1.5 opacity-90'
              : 'w-2 h-2 opacity-100'
          } ${isClicking ? 'scale-150' : 'scale-100'}`}
        />
      </div>

      {/* 2. Sleek Black Trailing Ring / Interactive Mode Badge */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center will-change-transform transition-all duration-300 ease-out ${
          isPlay || isView
            ? 'w-20 h-20 bg-[#0A1128] text-white rounded-full shadow-2xl border border-white/20'
            : hasCustomText
            ? 'px-4 py-2 bg-[#0A1128] text-white rounded-full shadow-2xl border border-white/20'
            : isDrag
            ? 'px-4 py-2 bg-[#0A1128] text-[#F5C400] rounded-full shadow-xl border border-white/20'
            : isHover
            ? 'w-11 h-11 bg-[#0A1128]/[0.04] border border-[#0A1128]/45 rounded-full'
            : 'w-7 h-7 bg-transparent border border-[#0A1128]/35 rounded-full'
        }`}
      >
        {/* Play Mode Content */}
        {isPlay && (
          <div className="flex flex-col items-center justify-center gap-0.5 select-none animate-fade-in text-white">
            <Play size={16} className="fill-[#F5C400] text-[#F5C400] ml-0.5" />
            <span className="text-[9px] font-mono font-black tracking-widest uppercase text-white">
              {cursorText || 'PLAY'}
            </span>
          </div>
        )}

        {/* View Mode Content */}
        {isView && (
          <div className="flex flex-col items-center justify-center gap-0.5 select-none animate-fade-in text-white">
            <Eye size={16} className="text-[#F5C400] stroke-[2.5]" />
            <span className="text-[9px] font-mono font-black tracking-widest uppercase text-white">
              {cursorText || 'VIEW'}
            </span>
          </div>
        )}

        {/* Custom Text Mode (if not Play/View) */}
        {!isPlay && !isView && hasCustomText && (
          <span className="text-white text-[10px] font-mono font-black tracking-widest uppercase select-none px-2 text-center leading-none">
            {cursorText}
          </span>
        )}

        {/* Drag Mode Content */}
        {isDrag && (
          <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-widest text-[#F5C400]">
            <ArrowLeftRight size={14} />
            <span>DRAG</span>
          </div>
        )}
      </div>

      {/* 3. Subtle Click Shockwave Ripple */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0A1128]/40 animate-[ripple_0.5s_cubic-bezier(0.1,0.8,0.3,1)_forwards]"
          style={{
            top: ripple.y,
            left: ripple.x
          }}
        />
      ))}
    </>
  );
};
