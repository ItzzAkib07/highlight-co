import React from 'react';
import { useCursor } from '../../context/CursorContext';
import { useSound } from '../../context/SoundContext';
import { Video, Quote } from 'lucide-react';
import { InstagramIcon, LinkedinIcon } from '../common/SocialIcons';

export const TeamCard = ({ member, index = 0 }) => {
  const { setCursor, resetCursor } = useCursor();
  const { playWhoosh } = useSound();

  return (
    <div
      className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border-2 border-[#0A1128] shadow-md hover:shadow-2xl transition-all duration-500"
      onMouseEnter={() => {
        setCursor('hover');
        playWhoosh();
      }}
      onMouseLeave={resetCursor}
    >
      {/* Editorial Portrait Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0A1128]">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top filter grayscale contrast-115 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Floating Role Badge */}
        <div className="absolute top-4 left-4 z-10 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#0A1128] text-[#0A1128] text-xs font-mono font-black shadow-md">
          {member.role}
        </div>
      </div>

      {/* Team Member Content */}
      <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow bg-white text-[#0A1128]">
        <div>
          <h3 className="text-2xl font-serif font-black text-[#0A1128] group-hover:text-[#D4A100] transition-colors">
            {member.name}
          </h3>

          <p className="mt-3 text-xs sm:text-sm text-[#0A1128] font-medium leading-relaxed">
            {member.shortBio}
          </p>

          {/* Director / Vision Quote */}
          {member.quote && (
            <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border-2 border-[#0A1128] border-l-4 border-l-[#F5C400] text-xs italic font-serif text-[#0A1128] font-bold">
              "{member.quote}"
            </div>
          )}
        </div>

        {/* Social Links & Specializations */}
        <div className="mt-6 pt-4 border-t-2 border-[#0A1128]/15 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            {member.specialties?.slice(0, 2).map((spec, i) => (
              <span
                key={i}
                className="text-[10px] font-mono font-black text-[#0A1128] bg-slate-100 px-2 py-0.5 rounded-md border border-[#0A1128]/20"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2 text-[#0A1128]">
            {member.socials?.instagram && (
              <a
                href={member.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} Instagram`}
                className="p-1.5 rounded-full hover:bg-[#F5C400] text-[#0A1128] transition-colors border border-[#0A1128]/30"
              >
                <InstagramIcon size={15} />
              </a>
            )}
            {member.socials?.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} LinkedIn`}
                className="p-1.5 rounded-full hover:bg-[#F5C400] text-[#0A1128] transition-colors border border-[#0A1128]/30"
              >
                <LinkedinIcon size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
