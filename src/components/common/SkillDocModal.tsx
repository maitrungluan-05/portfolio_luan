import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, BookOpen, GraduationCap, Layers, CheckCircle2, Sparkles, ArrowLeft } from 'lucide-react';
import type { SkillDocItem } from '../../data/skillsDocs';

interface SkillDocModalProps {
  isOpen: boolean;
  onClose: () => void;
  skillDoc: SkillDocItem | null;
}

export const SkillDocModal: React.FC<SkillDocModalProps> = ({ isOpen, onClose, skillDoc }) => {
  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!skillDoc) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 20, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-2xl w-full my-8 bg-[#0D182B] border border-[#00A3FF]/30 rounded-3xl p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,163,255,0.2)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient azure backdrop glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-[#00A3FF]/25 to-[#0066FF]/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-[#0284C7]/20 to-transparent rounded-full blur-[100px] pointer-events-none" />

            {/* Header: Category & Top Close Buttons */}
            <div className="flex items-center justify-between gap-4 mb-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3FF]/15 border border-[#00A3FF]/30 text-sky-300 text-xs font-mono tracking-wider uppercase font-semibold">
                <Sparkles size={12} className="text-[#00B2FE]" />
                <span>{skillDoc.category}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-colors focus:outline-none"
                >
                  <ArrowLeft size={13} />
                  <span>Quay lại</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
                  aria-label="Đóng"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-2 mb-6 relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-tight">
                {skillDoc.name}
              </h3>
              <p className="text-sm sm:text-base text-sky-200/90 font-medium leading-relaxed">
                {skillDoc.tagline}
              </p>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed pt-1">
                {skillDoc.description}
              </p>
            </div>

            {/* Main Action: Official Documentation Button */}
            <div className="mb-6 relative z-10">
              <a
                href={skillDoc.officialDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#00A3FF] to-[#0284C7] hover:from-[#00B2FE] hover:to-[#0369A1] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300 hover:scale-[1.01]"
              >
                <BookOpen size={16} />
                <span>TRUY CẬP TÀI LIỆU CHÍNH THỨC (DOCS)</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Learning Sources & Roadmaps */}
            <div className="space-y-4 mb-6 relative z-10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-300">
                <GraduationCap size={15} className="text-[#00B2FE]" />
                <span>Nguồn học tập & Lộ trình đề xuất</span>
              </div>

              <div className="space-y-2">
                {skillDoc.learningSources.map((src, idx) => (
                  <a
                    key={idx}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#00A3FF]/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#00A3FF] group-hover:scale-125 transition-transform" />
                      <span className="text-xs sm:text-sm text-zinc-100 group-hover:text-white font-medium">
                        {src.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-zinc-300 group-hover:text-sky-200 border border-white/10">
                        {src.type}
                      </span>
                      <ExternalLink size={12} className="text-zinc-400 group-hover:text-sky-300 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Key Topics & Concepts */}
            <div className="space-y-3 mb-6 relative z-10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-300">
                <Layers size={15} className="text-[#00B2FE]" />
                <span>Chủ đề & Khái niệm trọng tâm</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {skillDoc.keyTopics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-[#00A3FF]/15 text-sky-200 border border-sky-400/25"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Applied Experience */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 relative z-10 flex items-start gap-3 mb-6">
              <CheckCircle2 size={16} className="text-[#00B2FE] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-200 leading-relaxed font-light">
                <span className="font-semibold text-white mr-1">Kinh nghiệm ứng dụng:</span>
                {skillDoc.appliedExperience}
              </div>
            </div>

            {/* Prominent Bottom Back / Close Button */}
            <div className="pt-2 border-t border-white/10 relative z-10 flex justify-end">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={14} />
                <span>QUAY LẠI TRANG CHỦ</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
