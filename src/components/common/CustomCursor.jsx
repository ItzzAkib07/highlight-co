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
  const cornersRef = useRef(null);

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

      // Smooth trailing inertia for outer cinema viewfinder
      const dx = mousePos.current.x - smoothPos.current.x;
      const dy = mousePos.current.y - smoothPos.current.y;
      smoothPos.current.x += dx * 0.16;
      smoothPos.current.y += dy * 0.16;

      // Velocity & direction calculation
      const moveX = mousePos.current.x - prevPos.current.x;
      const moveY = mousePos.current.y - prevPos.current.y;
      const speed = Math.min(Math.sqrt(moveX * moveX + moveY * moveY), 40);
      const angle = Math.atan2(moveY, moveX) * (180 / Math.PI);

      velocity.current.speed = speed;
      velocity.current.angle = angle;

      prevPos.current.x = mousePos.current.x;
      prevPos.current.y = mousePos.current.y;

      if (ringRef.current) {
        const stretchX = 1 + speed * 0.008;
        const stretchY = 1 - speed * 0.005;
        ringRef.current.style.transform = `translate3d(${smoothPos.current.x}px, ${smoothPos.current.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${stretchX}, ${stretchY})`;
      }

      if (cornersRef.current) {
        cornersRef.current.style.transform = `translate3d(${smoothPos.current.x}px, ${smoothPos.current.y}px, 0) translate(-50%, -50%)`;
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
  const isExpanded = isView || isPlay || isHover || isDrag || hasCustomText;

  return (
    <>
      {/* 1. Precision Center Focus Laser Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isExpanded ? 'w-1 h-1 bg-brand-yellow/80' : 'w-2 h-2 bg-brand-yellow shadow-[0_0_8px_#F5C400]'
          } ${isClicking ? 'scale-150' : 'scale-100'}`}
        />
      </div>

      {/* 2. Trailing Cinema Viewfinder Lens Ring / Reticle */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center will-change-transform transition-all duration-300 ease-out ${
          isView || isPlay || hasCustomText
            ? 'w-24 h-24 bg-gradient-to-tr from-brand-yellow via-amber-300 to-brand-yellow text-brand-black shadow-[0_0_35px_rgba(245,196,0,0.5)] rounded-full'
            : isHover
            ? 'w-14 h-14 bg-brand-yellow/15 border border-brand-yellow/60 backdrop-blur-sm rounded-full shadow-[0_0_20px_rgba(245,196,0,0.25)]'
            : isDrag
            ? 'w-20 h-10 bg-brand-black/90 border border-brand-yellow/60 rounded-full text-brand-yellow'
            : 'w-8 h-8 bg-transparent border border-brand-yellow/40 rounded-full'
        }`}
      >
        {/* Play Mode Content */}
        {isPlay && (
          <div className="flex flex-col items-center justify-center gap-0.5 select-none animate-fade-in">
            <Play size={18} className="fill-brand-black ml-0.5" />
            <span className="text-[9px] font-mono font-black tracking-widest uppercase">
              {cursorText || 'PLAY'}
            </span>
          </div>
        )}

        {/* View Mode Content */}
        {isView && (
          <div className="flex flex-col items-center justify-center gap-0.5 select-none animate-fade-in text-brand-black">
            <Eye size={16} className="stroke-[2.5]" />
            <span className="text-[9px] font-mono font-black tracking-widest uppercase">
              {cursorText || 'VIEW'}
            </span>
          </div>
        )}

        {/* Custom Text Mode (if not Play/View) */}
        {!isPlay && !isView && hasCustomText && (
          <span className="text-brand-black text-[10px] font-mono font-black tracking-widest uppercase select-none px-2 text-center leading-none">
            {cursorText}
          </span>
        )}

        {/* Drag Mode Content */}
        {isDrag && (
          <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-widest text-brand-yellow">
            <ArrowLeftRight size={14} />
            <span>DRAG</span>
          </div>
        )}
      </div>

      {/* 3. Camera Viewfinder Framing Corners (┌ ┐ └ ┘) */}
      <div
        ref={cornersRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform transition-all duration-300 ${
          isExpanded ? 'w-28 h-28 opacity-60' : 'w-12 h-12 opacity-80'
        }`}
      >
        {/* Top-Left Corner ┌ */}
        <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-[1.5px] border-l-[1.5px] border-brand-yellow/80" />
        {/* Top-Right Corner ┐ */}
        <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-[1.5px] border-r-[1.5px] border-brand-yellow/80" />
        {/* Bottom-Left Corner └ */}
        <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-[1.5px] border-l-[1.5px] border-brand-yellow/80" />
        {/* Bottom-Right Corner ┘ */}
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-[1.5px] border-r-[1.5px] border-brand-yellow/80" />

        {/* Subtle Horizontal & Vertical Cinema Crosshairs */}
        {!isExpanded && (
          <>
            <span className="absolute top-1/2 left-0 w-1.5 h-[1px] bg-brand-yellow/40 -translate-y-1/2" />
            <span className="absolute top-1/2 right-0 w-1.5 h-[1px] bg-brand-yellow/40 -translate-y-1/2" />
            <span className="absolute top-0 left-1/2 w-[1px] h-1.5 bg-brand-yellow/40 -translate-x-1/2" />
            <span className="absolute bottom-0 left-1/2 w-[1px] h-1.5 bg-brand-yellow/40 -translate-x-1/2" />
          </>
        )}
      </div>

      {/* 4. Click Optical Shockwave Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-yellow animate-[ripple_0.5s_cubic-bezier(0.1,0.8,0.3,1)_forwards]"
          style={{
            top: ripple.y,
            left: ripple.x
          }}
        />
      ))}
    </>
  );
};
