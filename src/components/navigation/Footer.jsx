import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { MagneticButton } from '../common/MagneticButton';
import { useCursor } from '../../context/CursorContext';
import { ArrowUpRight, Copy, Check, Film, Clock } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from '../common/SocialIcons';
import { CreatorCredit } from '../common/CreatorCredit';

export const Footer = () => {
  const { setCursor, resetCursor } = useCursor();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [timeIST, setTimeIST] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setTimeIST(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white border-t border-[#0A1128]/10 pt-20 pb-12 overflow-hidden text-[#0A1128]">
      {/* Dynamic Animated Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-cinema-grid opacity-35" />
        <div className="absolute inset-0 bg-cinema-lines opacity-15" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-t from-[#F5C400]/20 via-[#F5C400]/10 to-transparent rounded-full blur-[160px] animate-float-slow" />
        <div className="absolute top-10 -right-20 w-[450px] h-[450px] bg-[#0A1128]/5 rounded-full blur-[140px] animate-float-reverse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        {/* Top Call to Action / Pitch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-[#0A1128]/10">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black mb-4 block">
              // NEXT PRODUCTION WINDOW OPEN
            </span>
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-[#0A1128] leading-[1.05] tracking-tight uppercase">
              Have a story that <span className="relative inline-block text-[#060B1A] px-2.5 py-0.5 italic font-serif font-black ml-1"><span className="absolute inset-0 bg-[#F5C400] rounded-sm -rotate-1 shadow-md shadow-[#F5C400]/40" /><span className="relative z-10">deserves</span></span> to be told?
            </h3>
            <p className="mt-6 text-lg text-[#0A1128] font-medium max-w-xl leading-relaxed">
              From high-impact corporate manifestos to award-winning CSR documentaries and sensory culinary campaigns, let’s make films that move people.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end">
            <div className="space-y-4 w-full sm:w-auto">
              <MagneticButton
                to="/contact"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto text-center"
              >
                <span>Initiate Production</span>
                <ArrowUpRight size={18} />
              </MagneticButton>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleCopyEmail('hello@highlightco.in')}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={resetCursor}
                  className="px-4 py-2 rounded-full border border-[#0A1128]/15 bg-white hover:bg-[#F5C400] text-[#0A1128] font-black transition-all flex items-center gap-2 text-xs font-mono shadow-sm"
                >
                  {copiedEmail ? <Check size={14} className="text-[#0A1128]" /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Copied to Clipboard' : 'hello@highlightco.in'}</span>
                </button>
              </div>
            </div>

            {/* Live studio time */}
            <div className="mt-8 lg:mt-0 flex items-center gap-2 text-xs font-mono text-[#0A1128] font-bold">
              <Clock size={14} className="text-[#D4A100]" />
              <span>MUMBAI & PUNE STUDIO: <strong className="text-[#0A1128] font-black">{timeIST || '07:30 PM IST'}</strong></span>
            </div>
          </div>
        </div>

        {/* Middle Navigation & Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-16 border-b border-[#0A1128]/10">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <BrandLogo size="lg" isLight={true} />
            <p className="text-sm text-[#0A1128] font-medium max-w-xs leading-relaxed">
              Highlight Co is a bespoke creative film studio producing corporate films, CSR impact stories, and sensory F&B campaigns.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#0A1128] font-black">
              <Film size={14} className="text-[#D4A100]" />
              <span>ARRI • RED • COOKE ANAMORPHIC</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black">
              Exploration
            </h4>
            <ul className="space-y-2 text-sm font-sans font-bold">
              <li>
                <Link to="/work" className="text-[#0A1128] hover:text-[#D4A100] transition-colors">
                  Featured Work
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#0A1128] hover:text-[#D4A100] transition-colors">
                  Services & Specs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#0A1128] hover:text-[#D4A100] transition-colors">
                  The Studio & Ethos
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-[#0A1128] hover:text-[#D4A100] transition-colors">
                  Directors & Crew
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#0A1128] hover:text-[#D4A100] transition-colors">
                  Get In Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Specialties */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black">
              Specialties
            </h4>
            <ul className="space-y-2 text-sm text-[#0A1128] font-medium">
              <li>Corporate Brand Films</li>
              <li>CSR Impact Documentaries</li>
              <li>F&B & Gastronomy Cinema</li>
              <li>High-Speed 1000fps Macro</li>
              <li>DaVinci HDR Color Science</li>
            </ul>
          </div>

          {/* Studio Locations */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black">
              Studio Hubs
            </h4>
            <p className="text-sm text-[#0A1128] leading-relaxed font-medium">
              <strong className="text-[#0A1128] font-black">Mumbai Studio:</strong><br />
              Bandra West, Mumbai 400050<br />
              <strong className="mt-2 block text-[#0A1128] font-black">Pune Facility:</strong>
              Koregaon Park, Pune 411001
            </p>
          </div>
        </div>

        {/* Oversized Brand Typography Graphic - Highlighted, Eye-Catchy with Glowing Atmosphere & Hover Animation */}
        <div
          className="group relative py-12 sm:py-16 my-4 w-full flex flex-col justify-center items-center select-none cursor-pointer overflow-hidden rounded-3xl"
          onMouseEnter={() => setCursor('focus', 'HIGHLIGHT')}
          onMouseLeave={resetCursor}
        >
          {/* Ambient luminous spotlight aura behind the brand */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[85%] h-24 sm:h-36 bg-gradient-to-r from-[#F5C400]/5 via-[#F5C400]/25 to-[#F5C400]/5 rounded-full blur-[70px] group-hover:blur-[50px] group-hover:bg-[#F5C400]/45 group-hover:scale-110 transition-all duration-700 animate-pulse-glow" />
          </div>

          {/* Dynamic yellow highlighter marker bar behind HIGHLIGHT */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] sm:w-[72%] h-[60%] bg-[#F5C400]/20 rounded-2xl -rotate-1 group-hover:rotate-0 group-hover:scale-105 group-hover:bg-[#F5C400]/35 transition-all duration-500 pointer-events-none border border-[#F5C400]/30 group-hover:border-[#F5C400]/60 shadow-lg shadow-[#F5C400]/10" />

          {/* Scalable SVG Text with Highlight Styling */}
          <svg
            viewBox="0 0 1000 130"
            className="relative z-10 w-full h-auto max-w-full block filter group-hover:drop-shadow-[0_8px_30px_rgba(245,196,0,0.5)] transition-all duration-500"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="goldTextShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A1128" />
                <stop offset="35%" stopColor="#D4A100" />
                <stop offset="50%" stopColor="#F5C400" />
                <stop offset="65%" stopColor="#D4A100" />
                <stop offset="100%" stopColor="#0A1128" />
              </linearGradient>
            </defs>

            {/* Glowing Golden Stroke for depth on hover */}
            <text
              x="50%"
              y="55%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="none"
              stroke="#F5C400"
              strokeWidth="4"
              className="font-serif font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                fontFamily: '"Cormorant Garamond", "Cinzel", "Playfair Display", serif',
                fontSize: '110px',
                fontWeight: 900,
                letterSpacing: '-0.02em',
              }}
            >
              HIGHLIGHT CO
            </text>

            {/* Main Foreground Text */}
            <text
              x="50%"
              y="55%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="#0A1128"
              className="font-serif font-black uppercase transition-all duration-500 group-hover:fill-[#060B1A]"
              style={{
                fontFamily: '"Cormorant Garamond", "Cinzel", "Playfair Display", serif',
                fontSize: '110px',
                fontWeight: 900,
                letterSpacing: '-0.02em',
              }}
            >
              HIGHLIGHT CO
            </text>
          </svg>

          {/* Micro tag under the highlight graphic */}
          <div className="relative z-10 mt-3 flex items-center gap-3 text-[11px] font-mono tracking-[0.3em] uppercase text-[#0A1128]/70 font-black group-hover:text-[#0A1128] transition-colors">
            <span className="w-8 h-[2px] bg-[#F5C400]" />
            <span>CINEMATIC ARCHIVE & FILM PRODUCTION</span>
            <span className="w-8 h-[2px] bg-[#F5C400]" />
          </div>
        </div>

        {/* Bottom copyright, creator credit & socials */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-6 text-xs font-mono text-[#0A1128] font-bold">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
            <span>© {new Date().getFullYear()} HIGHLIGHT CO. ALL RIGHTS RESERVED.</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline text-[#D4A100] font-black">CRAFT FILMS THAT MATTER</span>
            <span className="hidden sm:inline">•</span>
            <CreatorCredit />
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-[#0A1128]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-full border border-[#0A1128] hover:bg-[#F5C400] text-[#0A1128] transition-all"
            >
              <InstagramIcon size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full border border-[#0A1128] hover:bg-[#F5C400] text-[#0A1128] transition-all"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="p-2 rounded-full border border-[#0A1128] hover:bg-[#F5C400] text-[#0A1128] transition-all"
            >
              <YoutubeIcon size={16} />
            </a>
            <button
              onClick={scrollToTop}
              className="ml-4 text-[#0A1128] hover:text-[#D4A100] uppercase tracking-widest text-[10px] font-black"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
