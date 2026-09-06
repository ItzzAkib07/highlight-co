import React, { useState } from 'react';
import { projectsData } from '../data/projectsData';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectFilter } from '../components/projects/ProjectFilter';
import { SectionHeader } from '../components/common/SectionHeader';
import { ContactCTA } from '../components/sections/ContactCTA';
import { Film, Clapperboard } from 'lucide-react';

export const Work = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('editorial');

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  // Compute category counts
  const counts = {
    all: projectsData.length,
    'Corporate Film': projectsData.filter((p) => p.category.includes('Corporate')).length,
    'CSR Film': projectsData.filter((p) => p.category.includes('CSR')).length,
    'F&B Campaign': projectsData.filter((p) => p.category.includes('F&B')).length,
    'Brand Film': projectsData.filter((p) => p.category.includes('Brand')).length,
  };

  return (
    <div className="relative w-full bg-white min-h-screen pt-32 pb-16 overflow-hidden select-none">
      {/* Dynamic Background Atmosphere, Film Archive Imagery & Sprockets */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Subtle Cinema Archive Background Texture */}
        <div className="absolute inset-0 opacity-[0.14] mix-blend-multiply filter contrast-110">
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=80"
            alt="Film Archive Texture"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* 35mm Film Sprocket Side Rails */}
        <div className="absolute top-0 inset-x-0 h-4 bg-film-sprockets opacity-70" />

        {/* Ambient Floating Flares */}
        <div className="absolute -top-32 left-1/3 w-[850px] h-[850px] bg-gradient-to-b from-[#F5C400]/35 via-amber-200/20 to-transparent rounded-full blur-[140px] animate-float-slow" />
        <div className="absolute bottom-1/4 -right-20 w-[700px] h-[700px] bg-gradient-to-tl from-[#0A1128]/8 via-[#F5C400]/25 to-transparent rounded-full blur-[140px] animate-float-reverse" />

        {/* Viewfinder Corner Crosshairs */}
        <div className="absolute top-28 left-8 w-6 h-6 border-t-2 border-l-2 border-[#F5C400] opacity-100 shadow-sm" />
        <div className="absolute top-28 right-8 w-6 h-6 border-t-2 border-r-2 border-[#F5C400] opacity-100 shadow-sm" />

        <div className="absolute inset-0 bg-cinema-grid opacity-60" />
        <div className="absolute inset-0 bg-cinema-lines opacity-35" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        {/* Page Hero Header */}
        <div className="mb-14">
          <SectionHeader
            number="ARCHIVE // 2024 – 2026"
            badge="Selected Filmography"
            title="Stories Crafted To"
            highlightWord="Endure."
            subtitle="From high-octane corporate anthems to profound grassroots CSR documentaries and Michelin-level gastronomic cinema."
          />

          {/* Filter Bar */}
          <ProjectFilter
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            viewMode={viewMode}
            onChangeViewMode={setViewMode}
            counts={counts}
          />
        </div>

        {/* Project Grid */}
        <div
          className={`grid gap-8 lg:gap-12 transition-all duration-500 ${
            viewMode === 'editorial'
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              layout={viewMode === 'editorial' && idx % 3 === 0 ? 'standard' : 'standard'}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#0A1128]/15 text-[#0A1128] shadow-sm">
            <Clapperboard size={36} className="text-[#0A1128] mx-auto mb-3" />
            <h4 className="text-xl font-serif font-black text-[#0A1128]">No films matching this category</h4>
            <p className="text-xs text-[#0A1128] font-medium mt-1">Please select another category or view all productions.</p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="mt-24">
        <ContactCTA />
      </div>
    </div>
  );
};
