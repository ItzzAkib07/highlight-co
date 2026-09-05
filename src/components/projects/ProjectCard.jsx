import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCursor } from '../../context/CursorContext';
import { useSound } from '../../context/SoundContext';
import { Play, ArrowUpRight } from 'lucide-react';
import { VideoModal } from '../common/VideoModal';

export const ProjectCard = ({ project, layout = "standard", index = 0 }) => {
  const { setCursor, resetCursor } = useCursor();
  const { playWhoosh, playClickTone } = useSound();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const isLarge = layout === "large";

  return (
    <>
      <div
        className={`group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-[#0A1128]/15 shadow-sm hover:shadow-xl transition-all duration-500 ${
          isLarge ? 'md:col-span-2' : ''
        }`}
        onMouseEnter={() => {
          setIsHovered(true);
          setCursor('view', 'VIEW');
          playWhoosh();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          resetCursor();
        }}
      >
        {/* Project Media Container */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#0A1128]">
          {/* Main Hero Image */}
          <img
            src={project.heroImage}
            alt={project.title}
            className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out ${
              isHovered ? 'scale-105 filter brightness-95' : 'scale-100'
            }`}
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          {/* Category & Year Badges */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#0A1128]/15 text-[#0A1128] text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider shadow-sm">
              {project.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#0A1128]/15 text-[#0A1128] text-[10px] sm:text-xs font-mono font-bold shadow-sm">
              {project.year}
            </span>
          </div>

          {/* Quick Reel Play Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              playClickTone();
              setIsVideoModalOpen(true);
            }}
            className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-10 w-12 h-12 rounded-full bg-[#F5C400] text-[#060B1A] border border-[#0A1128]/20 flex items-center justify-center shadow-lg shadow-[#F5C400]/40 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
            aria-label="Play project video preview"
          >
            <Play size={18} className="ml-0.5 fill-current" />
          </button>
        </div>

        {/* Project Content & Metadata */}
        <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow bg-white text-[#0A1128]">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#0A1128] mb-2">
              <span>CLIENT: <strong className="text-[#0A1128] font-black">{project.client}</strong></span>
              <span className="font-black text-[#0A1128]">{project.duration}</span>
            </div>

            <Link
              to={`/work/${project.slug}`}
              onClick={playClickTone}
              className="hover:text-[#D4A100] transition-colors block"
            >
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#0A1128] leading-tight">
                {project.title}
              </h3>
            </Link>

            <p className="mt-3 text-sm text-[#0A1128] font-medium line-clamp-2 leading-relaxed">
              {project.tagline || project.synopsis}
            </p>
          </div>

          {/* View Details Link */}
          <div className="mt-6 pt-4 border-t border-[#0A1128]/10 flex items-center justify-between">
            <Link
              to={`/work/${project.slug}`}
              onClick={playClickTone}
              className="inline-flex items-center gap-2 text-xs font-heading font-black uppercase tracking-widest text-[#0A1128] hover:text-[#D4A100] group-hover:translate-x-1 transition-transform"
            >
              <span>Explore Story & BTS</span>
              <ArrowUpRight size={14} className="text-[#0A1128]" />
            </Link>

            <span className="font-mono text-xs text-[#0A1128] font-black">
              0{index + 1}
            </span>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={project.videoUrl}
        title={project.title}
        category={project.category}
      />
    </>
  );
};
