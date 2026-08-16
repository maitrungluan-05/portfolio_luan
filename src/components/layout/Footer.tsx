import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Magnet } from '../common/Magnet';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { personalInfo } = useData();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative bg-[#080E1B] text-[#FAFAFA] pt-20 pb-12 overflow-hidden border-t border-[#00A3FF]/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Info Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-xs tracking-[0.22em] text-zinc-400 uppercase">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AVAILABLE FOR NEW OPPORTUNITIES
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span>{personalInfo.location}</span>
          </div>

          <div className="flex items-center gap-6">
            <Magnet padding={40} strength={3}>
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E4E4E7] hover:text-white px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all duration-300 focus:outline-none"
              >
                <span>BACK TO TOP</span>
                <ArrowUp
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-1 text-sky-400"
                />
              </button>
            </Magnet>
          </div>
        </div>

        {/* Massive Editorial Typography Poster */}
        <div className="pt-14 pb-10 select-none">
          <h2 className="text-[12vw] font-black uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-zinc-400/80 to-zinc-600/60 hover:opacity-100 transition-opacity duration-300">
            {personalInfo.name}
          </h2>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/8 text-xs tracking-widest text-zinc-500 uppercase font-mono">
          <div>
            © {personalInfo.year} {personalInfo.fullName || personalInfo.name}. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenAdmin}
              className="text-sky-400 hover:underline focus:outline-none hover:text-white transition-colors"
            >
              [QUẢN TRỊ ADMIN]
            </button>
            <span className="hidden sm:inline">•</span>
            <span>VIETNAM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
