import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { MagneticButton } from '../common/MagneticButton';
import { useCursor } from '../../context/CursorContext';
import { ArrowUpRight, Copy, Check, Film, Clock } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from '../common/SocialIcons';

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
    <footer className="relative bg-white border-t-2 border-[#0A1128] pt-20 pb-12 overflow-hidden text-[#0A1128]">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#F5C400]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        {/* Top Call to Action / Pitch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b-2 border-[#0A1128]/20">
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
                  className="px-4 py-2 rounded-full border-2 border-[#0A1128] bg-white hover:bg-[#F5C400] text-[#0A1128] font-black transition-all flex items-center gap-2 text-xs font-mono shadow-sm"
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-16 border-b-2 border-[#0A1128]/20">
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

        {/* Oversized Brand Typography Graphic */}
        <div className="py-12 flex justify-center text-center overflow-hidden select-none opacity-10 hover:opacity-20 transition-opacity duration-500">
          <span className="font-serif text-[12vw] font-black tracking-tighter uppercase whitespace-nowrap text-[#0A1128]">
            HIGHLIGHT CO
          </span>
        </div>

        {/* Bottom copyright & socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 text-xs font-mono text-[#0A1128] font-bold">
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} HIGHLIGHT CO. ALL RIGHTS RESERVED.</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline text-[#D4A100] font-black">CRAFT FILMS THAT MATTER</span>
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
