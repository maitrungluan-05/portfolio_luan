import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { ImageLightbox } from '../common/ImageLightbox';
import { Eye, MapPin } from 'lucide-react';
import { FadeIn } from '../common/FadeIn';

export const MomentsGallerySection: React.FC = () => {
  const { moments } = useData();
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth spring horizontal translation
  const rawX = useTransform(scrollYProgress, [0, 1], ['4%', '-30%']);
  const xTranslate = useSpring(rawX, { stiffness: 80, damping: 20 });

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const getAspectClasses = (aspect: string) => {
    switch (aspect) {
      case 'portrait':
        return 'w-[250px] sm:w-[300px] md:w-[340px] h-[360px] sm:h-[440px] md:h-[480px]';
      case 'landscape':
        return 'w-[320px] sm:w-[420px] md:w-[480px] h-[240px] sm:h-[300px] md:h-[340px] self-center';
      case 'square':
        return 'w-[260px] sm:w-[340px] md:w-[380px] h-[260px] sm:h-[340px] md:h-[380px] self-end';
      case 'wide':
        return 'w-[380px] sm:w-[500px] md:w-[580px] h-[260px] sm:h-[320px] md:h-[360px] self-start';
      default:
        return 'w-[300px] sm:w-[400px] h-[320px]';
    }
  };

  return (
    <section
      ref={containerRef}
      id="moments"
      className="relative bg-[#0D1B34] py-24 sm:py-32 z-20 overflow-hidden select-none border-t border-[#00A3FF]/20"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] bg-[#00A3FF]/10 rounded-full blur-[150px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-1/3 -left-20 w-[500px] h-[500px] bg-[#0284C7]/10 rounded-full blur-[150px] pointer-events-none animate-aurora-delayed" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-14 sm:mb-18 relative z-10">
        <div className="flex flex-col items-start">
          <FadeIn delay={0.1}>
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#00B2FE] mb-3 px-4 py-1.5 rounded-full bg-[#00A3FF]/15 border border-[#00A3FF]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B2FE] animate-pulse" />
              // 05 — PHOTOGRAPHIC ARCHIVE
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight hero-heading">
              MOMENTS
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-light">
              Một vài hình ảnh ngoài công việc — những khoảnh khắc đời thường, cảnh sắc quê hương và hành trình trải nghiệm.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          style={{ x: xTranslate }}
          className="flex items-center gap-5 sm:gap-7 px-6 sm:px-12 will-change-transform"
        >
          {moments.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className={`relative flex-shrink-0 rounded-[24px] overflow-hidden group cursor-pointer border border-white/12 bg-zinc-900 shadow-xl transition-all duration-500 hover:border-sky-400/45 hover:shadow-[0_15px_40px_-10px_rgba(56,189,248,0.25)] ${getAspectClasses(
                item.aspectRatio
              )}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-75 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-between p-5 sm:p-6">
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-medium tracking-wider uppercase px-3 py-1 rounded-full bg-white/15 text-white backdrop-blur-md border border-white/15">
                    {item.category}
                  </span>

                  {/* Hover View Button */}
                  <div className="w-9 h-9 rounded-full bg-white/20 group-hover:bg-sky-400 group-hover:text-black text-white flex items-center justify-center transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-md">
                    <Eye size={15} />
                  </div>
                </div>

                {/* Bottom Caption Info */}
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide transition-colors">
                    {item.title}
                  </h4>
                  {item.location && (
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-300 font-light">
                      <MapPin size={12} className="text-sky-400" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        moments={moments}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </section>
  );
};
