import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug, getNextProject } from '../data/projectsData';
import { VideoModal } from '../components/common/VideoModal';
import { MagneticButton } from '../components/common/MagneticButton';
import { useSound } from '../context/SoundContext';
import { useCursor } from '../context/CursorContext';
import { Play, ArrowLeft, ArrowUpRight, CheckCircle2, Film, Camera, Sparkles, Award } from 'lucide-react';

export const ProjectDetails = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const nextProject = getNextProject(project.slug);
  const [videoOpen, setVideoOpen] = useState(false);
  const { playClickTone, playWhoosh } = useSound();
  const { setCursor, resetCursor } = useCursor();

  return (
    <div className="relative w-full bg-white min-h-screen pt-28 pb-20 select-none">
      {/* Top Back Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 mb-8">
        <Link
          to="/work"
          onClick={playClickTone}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0A1128] hover:text-[#D4A100] transition-colors font-black"
        >
          <ArrowLeft size={14} />
          <span>Back to Filmography</span>
        </Link>
      </div>

      {/* Project Hero Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 mb-12 text-[#0A1128]">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3.5 py-1 rounded-full bg-[#F5C400] border-2 border-[#0A1128] text-[#060B1A] text-xs font-mono font-black uppercase tracking-wider shadow-sm">
            {project.category}
          </span>
          <span className="text-xs font-mono text-[#0A1128] font-bold">RELEASE: {project.year}</span>
          <span className="text-[#0A1128]/40">•</span>
          <span className="text-xs font-mono text-[#0A1128] font-bold">RUNTIME: {project.duration}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black text-[#0A1128] leading-[1.02] tracking-tight uppercase max-w-5xl">
          {project.title}
        </h1>

        <p className="mt-6 text-xl sm:text-2xl text-[#0A1128] font-serif italic max-w-3xl leading-relaxed font-bold">
          "{project.tagline}"
        </p>

        {/* Metadata Grid */}
        <div className="mt-10 pt-6 border-t-2 border-[#0A1128]/20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono">
          <div>
            <span className="text-[#0A1128]/70 uppercase block mb-1 font-bold">Commissioned By</span>
            <strong className="text-[#0A1128] text-sm font-sans font-black">{project.client}</strong>
          </div>
          <div>
            <span className="text-[#0A1128]/70 uppercase block mb-1 font-bold">Director</span>
            <strong className="text-[#0A1128] text-sm font-sans font-black">{project.credits?.director}</strong>
          </div>
          <div>
            <span className="text-[#0A1128]/70 uppercase block mb-1 font-bold">Cinematography</span>
            <strong className="text-[#0A1128] text-sm font-sans font-black">{project.credits?.cinematography}</strong>
          </div>
          <div>
            <span className="text-[#0A1128]/70 uppercase block mb-1 font-bold">Color & Sound</span>
            <strong className="text-[#0A1128] text-sm font-sans font-black">{project.credits?.editor}</strong>
          </div>
        </div>
      </div>

      {/* Full-Bleed Hero Cinematic Showcase Image / Video Trigger */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 mb-20">
        <div
          className="group relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-white border-2 border-[#0A1128] shadow-2xl cursor-pointer"
          onClick={() => {
            playClickTone();
            setVideoOpen(true);
          }}
          onMouseEnter={() => {
            setCursor('play', 'PLAY');
            playWhoosh();
          }}
          onMouseLeave={resetCursor}
        >
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/70 via-transparent to-[#0A1128]/30" />

          {/* Central Play Button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-[#F5C400] text-[#060B1A] border-2 border-[#0A1128] flex items-center justify-center shadow-2xl shadow-[#F5C400]/40 group-hover:scale-110 transition-transform duration-300">
              <Play size={28} className="ml-1 fill-current" />
            </div>
          </div>

          <div className="absolute bottom-6 left-6 z-10 hidden sm:flex items-center gap-2 text-xs font-mono text-[#0A1128] bg-white/95 px-4 py-2 rounded-full backdrop-blur-md border-2 border-[#0A1128] font-bold">
            <Film size={14} className="text-[#0A1128]" />
            <span>Click To Experience Full Cinema Master</span>
          </div>
        </div>
      </div>

      {/* Deep Story & Creative Approach Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 mb-24 text-[#0A1128]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: The Synopsis & Challenge */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0A1128] font-black mb-3 block">
                // THE NARRATIVE ARC
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#0A1128] mb-6">
                The Story Behind The Frame
              </h2>
              <p className="text-base sm:text-lg text-[#0A1128] font-medium leading-relaxed">
                {project.synopsis}
              </p>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0A1128] font-black mb-3 block">
                // CREATIVE CHALLENGE & DIRECTION
              </span>
              <h3 className="text-2xl font-serif font-black text-[#0A1128] mb-4">
                The Artistic Strategy
              </h3>
              <p className="text-base text-[#0A1128] font-medium leading-relaxed">
                {project.creativeApproach}
              </p>
            </div>
          </div>

          {/* Right Column: Impact Metrics & Deliverables */}
          <div className="lg:col-span-5 space-y-8">
            {/* Impact Metric Card */}
            {project.impactMetrics && (
              <div className="p-8 rounded-3xl bg-white text-[#0A1128] border-2 border-[#0A1128] shadow-xl space-y-6">
                <span className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black block">
                  // MEASURED CULTURAL & BUSINESS IMPACT
                </span>
                <div className="grid grid-cols-3 gap-4">
                  {project.impactMetrics.map((metric, i) => (
                    <div key={i} className="text-center sm:text-left">
                      <span className="font-serif text-3xl font-black text-[#0A1128] block">
                        {metric.value}
                      </span>
                      <span className="text-[11px] font-mono text-[#0A1128] mt-1 block font-bold">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverables Card */}
            {project.deliverables && (
              <div className="p-8 rounded-3xl bg-slate-50 border-2 border-[#0A1128] shadow-md space-y-4">
                <span className="text-xs uppercase font-mono tracking-widest text-[#0A1128] font-black block">
                  Campaign Deliverables
                </span>
                <div className="space-y-2.5">
                  {project.deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-[#0A1128] font-sans font-bold">
                      <CheckCircle2 size={16} className="text-[#0A1128] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visual Frame Gallery */}
      {project.detailImages && project.detailImages.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 mb-24 text-[#0A1128]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#0A1128] font-black mb-4 block">
            // VISUAL STILLS & ART DIRECTION
          </span>
          <h3 className="text-3xl font-serif font-black text-[#0A1128] mb-8">
            Anamorphic Still Frames
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {project.detailImages.map((imgUrl, i) => (
              <div
                key={i}
                className="group relative aspect-[16/10] rounded-3xl overflow-hidden bg-white border-2 border-[#0A1128] shadow-md"
              >
                <img
                  src={imgUrl}
                  alt={`${project.title} Still ${i + 1}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#0A1128] text-[10px] font-mono text-[#0A1128] font-black shadow-sm">
                  FRAME 0{i + 1} // 2.39:1 CINEMA CROP
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Project Teaser Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="border-t-2 border-[#0A1128]/20 pt-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#0A1128] block mb-3 font-black">
            NEXT STORY IN REEL →
          </span>

          <Link
            to={`/work/${nextProject.slug}`}
            onClick={playClickTone}
            className="group relative block p-8 sm:p-14 rounded-3xl bg-white border-2 border-[#0A1128] text-[#0A1128] overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl"
          >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono text-[#0A1128] uppercase tracking-widest font-black bg-[#F5C400]/30 px-2.5 py-1 rounded border border-[#0A1128]/30">
                  [{nextProject.category}] — {nextProject.year}
                </span>
                <h3 className="text-3xl sm:text-5xl font-serif font-black text-[#0A1128] group-hover:text-[#D4A100] transition-colors mt-3">
                  {nextProject.title}
                </h3>
                <p className="text-sm sm:text-base text-[#0A1128] font-medium mt-2 max-w-xl">
                  {nextProject.tagline}
                </p>
              </div>

              <div className="w-14 h-14 rounded-full bg-[#F5C400] text-[#060B1A] border-2 border-[#0A1128] flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0 shadow-lg shadow-[#F5C400]/30">
                <ArrowUpRight size={24} />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl={project.videoUrl}
        title={project.title}
        category={project.category}
      />
    </div>
  );
};
