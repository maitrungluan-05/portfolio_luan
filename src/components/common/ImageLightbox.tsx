import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Tag } from 'lucide-react';
import type { MomentItem } from '../../types';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  moments: MomentItem[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  moments,
  currentIndex,
  onIndexChange,
}) => {
  const currentItem = moments[currentIndex];

  const handlePrev = useCallback(() => {
    onIndexChange((currentIndex - 1 + moments.length) % moments.length);
  }, [currentIndex, moments.length, onIndexChange]);

  const handleNext = useCallback(() => {
    onIndexChange((currentIndex + 1) % moments.length);
  }, [currentIndex, moments.length, onIndexChange]);

  useEffect(() => {
    if (!isOpen) return;

    // Body scroll lock
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    // Keyboard handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div
          className="absolute top-6 left-6 right-6 flex items-center justify-between z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-colors focus:outline-none backdrop-blur-md"
            >
              <X size={14} />
              <span>Quay lại</span>
            </button>

            <span className="text-xs tracking-[0.2em] font-mono uppercase bg-white/10 text-white px-3 py-1 rounded-full border border-white/10">
              {currentIndex + 1} / {moments.length}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-sky-200 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <Tag size={12} className="text-[#00B2FE]" />
              {currentItem.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors duration-200 focus:outline-none backdrop-blur-md"
            aria-label="Đóng xem ảnh"
          >
            <X size={20} />
          </button>
        </div>

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-md focus:outline-none"
          aria-label="Ảnh trước"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-md focus:outline-none"
          aria-label="Ảnh kế tiếp"
        >
          <ChevronRight size={24} />
        </button>

        {/* Main Image Container */}
        <div
          className="relative max-w-5xl w-full max-h-[82vh] flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative flex flex-col items-center w-full"
          >
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="max-h-[68vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            />

            {/* Caption Card */}
            <div className="mt-4 w-full max-w-2xl bg-zinc-900/80 backdrop-blur-md border border-white/10 p-4 sm:p-5 rounded-xl text-center">
              <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                {currentItem.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#D7E2EA]/75 font-light leading-relaxed">
                {currentItem.caption}
              </p>
              {currentItem.location && (
                <div className="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-[#00D2FF] font-medium">
                  <MapPin size={13} />
                  <span>{currentItem.location}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
