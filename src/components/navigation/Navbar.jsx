import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { MagneticButton } from '../common/MagneticButton';
import { useCursor } from '../../context/CursorContext';
import { useSound } from '../../context/SoundContext';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursor, resetCursor } = useCursor();
  const { playClickTone, playWhoosh } = useSound();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = () => {
    playClickTone();
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-[5000] transition-all duration-500 select-none ${
          isScrolled
            ? 'py-3 bg-white/95 backdrop-blur-2xl border-b border-[#0A1128]/10 shadow-[0_8px_30px_rgba(10,17,40,0.04)]'
            : 'py-4 sm:py-6 bg-gradient-to-b from-white via-white/80 to-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between">
          {/* Left: Brand Logo & Studio Badge */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/"
              onClick={handleNavClick}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
            >
              <BrandLogo size={isScrolled ? 'default' : 'lg'} isLight={true} />
            </Link>

            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0A1128]/15 text-[10px] font-mono tracking-widest text-[#0A1128] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400] animate-pulse" />
              <span className="text-[#0A1128] font-black">EST. 2026</span>
              <span className="font-bold">// CINEMATIC STUDIO</span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-white border border-[#0A1128]/15 backdrop-blur-xl shadow-sm">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                onMouseEnter={() => {
                  playWhoosh();
                  setCursor('hover');
                }}
                onMouseLeave={resetCursor}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `relative px-4 py-1.5 rounded-full font-heading text-xs tracking-widest uppercase font-black transition-all duration-300 ${
                    isActive
                      ? 'bg-[#F5C400] text-[#060B1A] shadow-md shadow-[#F5C400]/25 font-black border border-[#0A1128]/20 scale-[1.02]'
                      : 'text-[#0A1128] hover:bg-[#F5C400]/20 font-black'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right: Actions (Status + CTA + Mobile Hamburger) */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            {/* Live Availability Tag */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#0A1128]/15 text-xs font-mono text-[#0A1128] shadow-sm font-black">
              <span className="w-2 h-2 rounded-full bg-[#F5C400] animate-pulse" />
              <span className="text-[10px] uppercase tracking-wider font-black">Commission Open</span>
            </div>

            {/* Start a Project CTA Button */}
            <div className="hidden sm:block">
              <MagneticButton
                to="/contact"
                variant="primary"
                size="sm"
                className="group shadow-md shadow-[#F5C400]/25 bg-[#F5C400] text-[#060B1A] font-black border border-[#0A1128]/20 hover:bg-[#FFE042]"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-xl bg-white text-[#0A1128] hover:text-[#060B1A] hover:bg-[#F5C400] border border-[#0A1128]/15 transition-colors shadow-sm"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
};
