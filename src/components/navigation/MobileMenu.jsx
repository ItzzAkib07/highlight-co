import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { ArrowUpRight, X } from 'lucide-react';

export const MobileMenu = ({ isOpen, onClose, links }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[6000] bg-white text-[#0A1128] flex flex-col justify-between p-6 sm:p-8 animate-fade-in md:hidden select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#0A1128]/10 pb-4">
        <BrandLogo size="default" isLight={true} />
        <button
          onClick={onClose}
          className="p-2.5 rounded-full border border-[#0A1128]/15 bg-white text-[#0A1128] hover:bg-[#F5C400]"
          aria-label="Close Menu"
        >
          <X size={22} />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-6 my-auto">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#0A1128] font-black">
          Navigation Index
        </span>
        {links.map((link, idx) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.path === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              `text-3xl sm:text-4xl font-serif font-black transition-all flex items-center justify-between ${
                isActive ? 'text-[#060B1A] pl-3 border-l-2 border-[#0A1128] bg-slate-50 py-1 rounded-r-xl' : 'text-[#0A1128] hover:text-[#D4A100]'
              }`
            }
          >
            <span>{link.name}</span>
            <span className="text-xs font-mono text-[#0A1128] font-bold">0{idx + 1}</span>
          </NavLink>
        ))}

        <div className="pt-4">
          <Link
            to="/contact"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#F5C400] text-[#060B1A] font-heading font-black text-sm tracking-widest uppercase border border-[#0A1128]/20 shadow-md shadow-[#F5C400]/25"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-[#0A1128]/10 pt-6 flex items-center justify-between text-xs font-mono text-[#0A1128] font-bold">
        <div className="flex items-center gap-2 text-emerald-800">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold">Available for Commissions</span>
        </div>
        <span className="font-black">Mumbai / Pune</span>
      </div>
    </div>
  );
};

