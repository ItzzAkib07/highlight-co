import React from 'react';
import { teamData } from '../data/teamData';
import { TeamCard } from '../components/team/TeamCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { ContactCTA } from '../components/sections/ContactCTA';
import { MagneticButton } from '../components/common/MagneticButton';
import { Film, Users, Sparkles, ArrowUpRight } from 'lucide-react';

export const Team = () => {
  return (
    <div className="relative w-full bg-white min-h-screen pt-32 pb-16 overflow-hidden select-none">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-[#F5C400]/15 via-amber-200/10 to-transparent rounded-full blur-[170px] animate-float-slow pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#0A1128]/5 via-[#F5C400]/10 to-transparent rounded-full blur-[160px] animate-float-reverse pointer-events-none" />
        <div className="absolute inset-0 bg-cinema-grid opacity-35" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        {/* Page Header */}
        <SectionHeader
          number="THE CREATIVE COLLECTIVE"
          badge="Directors & Producers"
          title="The People Behind"
          highlightWord="The Frame."
          subtitle="A passionate cohort of award-winning directors, cinematographers, sound artists, and producers dedicated to cinematic storytelling."
          className="mb-16"
        />

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-28">
          {teamData.map((member, idx) => (
            <TeamCard
              key={member.id}
              member={member}
              index={idx}
            />
          ))}
        </div>

        {/* Studio Culture & Join The Crew */}
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-[#0A1128]/15 relative overflow-hidden mb-24 shadow-xl text-[#0A1128]">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black block">
              // STUDIO CULTURE & OPEN POSITIONS
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-black text-[#0A1128]">
              Want to Direct, Shoot or Edit With Us?
            </h3>
            <p className="text-sm sm:text-base text-[#0A1128] font-medium leading-relaxed">
              We are constantly collaborating with freelance directors of photography, DaVinci colorists, aerial FPV pilots, and sound designers in Mumbai, Pune, and globally.
            </p>
            <div className="pt-4">
              <a
                href="mailto:careers@highlightco.in"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#F5C400] text-[#060B1A] font-heading font-black text-xs uppercase tracking-widest hover:bg-[#FFE042] border border-[#0A1128]/20 transition-colors shadow-lg shadow-[#F5C400]/30"
              >
                <span>Send Showreel & Portfolio</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <ContactCTA />
    </div>
  );
};
