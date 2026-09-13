import React from 'react';
import { motion } from 'motion/react';
import { User, Briefcase } from 'lucide-react';
import { PortfolioMode } from '../types';

interface ModeSelectorProps {
  onSelect: (mode: PortfolioMode) => void;
  isExiting: boolean;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelect, isExiting }) => {
  return (
    <motion.div
      id="mode-selection-screen"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -12 : 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-50 flex flex-col items-center justify-center w-full max-w-2xl px-6 py-8 text-black select-none pointer-events-auto"
    >
      {/* Header: Boulevard1st black logo directly above 'select mode' */}
      <div 
        id="mode-selection-header"
        className="flex flex-col items-center text-center mb-8 md:mb-12"
      >
        <h1 
          id="mode-selection-logo"
          className="font-archivo text-black font-black text-[clamp(2.5rem,7.5vw,4.75rem)] leading-[0.85] tracking-tighter select-none whitespace-nowrap"
        >
          Boulevard1st
        </h1>
        <span 
          id="mode-selection-subtitle"
          className="font-archivo text-xs sm:text-sm font-medium tracking-[0.25em] text-neutral-500 uppercase mt-2.5 sm:mt-3"
        >
          select mode
        </span>
      </div>

      {/* Mode Options Grid - strictly rounded-none */}
      <div 
        id="mode-options-grid"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full"
      >
        {/* Mode 1: Individual */}
        <button
          type="button"
          id="mode-button-individual"
          onClick={() => onSelect('individual')}
          disabled={isExiting}
          className="group relative flex flex-col items-start justify-between p-6 sm:p-7 md:p-8 bg-white border-2 border-black rounded-none cursor-pointer transition-all duration-200 hover:bg-black hover:text-white active:scale-[0.98] text-left focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 min-h-[140px] sm:min-h-[170px]"
        >
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-black group-hover:text-white transition-colors">
              <User className="w-5 h-5 stroke-[1.8]" />
            </span>
            <span className="font-archivo text-xs tracking-widest uppercase font-semibold text-neutral-400 group-hover:text-neutral-300 transition-colors">
              Full Access
            </span>
          </div>

          <div>
            <h3 className="font-archivo font-black text-xl sm:text-2xl tracking-tight uppercase mb-1 transition-all group-hover:italic">
              Individual
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-600 group-hover:text-neutral-300 transition-colors tracking-wide">
              Toàn bộ dự án &amp; trải nghiệm đầy đủ
            </p>
          </div>
        </button>

        {/* Mode 2: Employer / Club */}
        <button
          type="button"
          id="mode-button-employer-club"
          onClick={() => onSelect('employer-club')}
          disabled={isExiting}
          className="group relative flex flex-col items-start justify-between p-6 sm:p-7 md:p-8 bg-white border-2 border-black rounded-none cursor-pointer transition-all duration-200 hover:bg-black hover:text-white active:scale-[0.98] text-left focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 min-h-[140px] sm:min-h-[170px]"
        >
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-black group-hover:text-white transition-colors">
              <Briefcase className="w-5 h-5 stroke-[1.8]" />
            </span>
            <span className="font-archivo text-xs tracking-widest uppercase font-semibold text-neutral-400 group-hover:text-neutral-300 transition-colors">
              Curated
            </span>
          </div>

          <div>
            <h3 className="font-archivo font-black text-xl sm:text-2xl tracking-tight uppercase mb-1 transition-all group-hover:italic">
              Employer / Club
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-600 group-hover:text-neutral-300 transition-colors tracking-wide">
              Tuyển chọn các dự án trọng điểm
            </p>
          </div>
        </button>
      </div>
    </motion.div>
  );
};
