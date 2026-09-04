import React from 'react';
import { useSound } from '../../context/SoundContext';
import { LayoutGrid, Grid3X3 } from 'lucide-react';

export const ProjectFilter = ({
  activeCategory,
  onSelectCategory,
  viewMode,
  onChangeViewMode,
  counts = {}
}) => {
  const { playClickTone } = useSound();

  const categories = [
    { id: 'all', label: 'All Productions' },
    { id: 'Corporate Film', label: 'Corporate Films' },
    { id: 'CSR Film', label: 'CSR Stories' },
    { id: 'F&B Campaign', label: 'F&B & Gastronomy' },
    { id: 'Brand Film', label: 'Brand Films' },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b-2 border-[#0A1128]/20 select-none">
      {/* Category Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto w-full md:w-auto no-scrollbar py-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                playClickTone();
                onSelectCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-heading uppercase tracking-wider transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#F5C400] text-[#060B1A] border-2 border-[#0A1128] shadow-md shadow-[#F5C400]/30 font-black'
                  : 'bg-white text-[#0A1128] hover:bg-[#F5C400]/20 border-2 border-[#0A1128] font-black'
              }`}
            >
              <span>{cat.label}</span>
              {counts[cat.id] !== undefined && (
                <span className={`ml-2 text-[10px] font-mono ${isActive ? 'text-[#060B1A] font-black' : 'text-[#0A1128] font-bold'}`}>
                  ({counts[cat.id]})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid Layout Switcher */}
      {onChangeViewMode && (
        <div className="hidden sm:flex items-center gap-2 bg-white p-1 rounded-full border-2 border-[#0A1128] shadow-sm">
          <button
            onClick={() => {
              playClickTone();
              onChangeViewMode('editorial');
            }}
            className={`p-1.5 rounded-full transition-colors ${
              viewMode === 'editorial' ? 'bg-[#0A1128] text-[#F5C400] shadow-sm' : 'text-[#0A1128] hover:bg-slate-100'
            }`}
            title="Editorial Large View"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => {
              playClickTone();
              onChangeViewMode('grid');
            }}
            className={`p-1.5 rounded-full transition-colors ${
              viewMode === 'grid' ? 'bg-[#0A1128] text-[#F5C400] shadow-sm' : 'text-[#0A1128] hover:bg-slate-100'
            }`}
            title="Standard Grid View"
          >
            <Grid3X3 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
