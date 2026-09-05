import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSound } from '../../context/SoundContext';
import { useCursor } from '../../context/CursorContext';

export const MagneticButton = ({
  children,
  className = "",
  variant = "primary", // 'primary', 'secondary', 'outline', 'ghost'
  size = "md", // 'sm', 'md', 'lg'
  onClick,
  to,
  type = "button",
  href,
  target,
  rel,
  ...props
}) => {
  const btnRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { playClickTone, playWhoosh } = useSound();
  const { setCursor, resetCursor } = useCursor();

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.35;
    const y = (e.clientY - (top + height / 2)) * 0.35;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    resetCursor();
  };

  const handleMouseEnter = () => {
    playWhoosh();
    setCursor('hover');
  };

  const handleClick = (e) => {
    playClickTone();
    if (onClick) onClick(e);
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base tracking-widest",
  };

  const variantClasses = {
    primary: "bg-[#F5C400] text-[#060B1A] font-heading font-black border border-[#0A1128]/20 shadow-md shadow-[#F5C400]/25 hover:bg-[#FFE042]",
    secondary: "bg-white text-[#0A1128] hover:bg-slate-50 border border-[#0A1128]/15 font-heading font-black shadow-sm",
    outline: "border border-[#0A1128]/20 text-[#0A1128] bg-white hover:bg-[#F5C400] hover:text-[#060B1A] hover:border-[#F5C400] font-heading font-black transition-all shadow-sm",
    ghost: "text-[#0A1128] hover:text-[#060B1A] hover:bg-[#F5C400]/20 font-heading font-black"
  };

  const combinedClasses = `relative inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 transform select-none cursor-pointer overflow-hidden group ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const style = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    transition: offset.x === 0 ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.1s ease-out'
  };

  if (to) {
    return (
      <Link
        to={to}
        ref={btnRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        className={combinedClasses}
        style={style}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        ref={btnRef}
        target={target}
        rel={rel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        className={combinedClasses}
        style={style}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      type={type}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={combinedClasses}
      style={style}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};
