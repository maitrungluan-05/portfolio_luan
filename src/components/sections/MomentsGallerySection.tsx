import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  // Smooth horizontal translation driven by vertical scroll
  const xTranslate = useTransform(scrollYProgress, [0, 1], ['5%', '-35%']);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const getAspectClasses = (aspect: string) => {
    switch (aspect) {
      case 'portrait':
        return 'w-[260px] sm:w-[320px] md:w-[360px] h-[380px] sm:h-[460px] md:h-[500px]';
      case 'landscape':
        return 'w-[340px] sm:w-[440px] md:w-[520px] h-[260px] sm:h-[320px] md:h-[360px] self-center';
      case 'square':
        return 'w-[280px] sm:w-[360px] md:w-[400px] h-[280px] sm:h-[360px] md:h-[400px] self-end';
      case 'wide':
        return 'w-[400px] sm:w-[540px] md:w-[620px] h-[280px] sm:h-[340px] md:h-[380px] self-start';
      default:
        return 'w-[320px] sm:w-[420px] h-[340px]';
    }
  };

  return (
    <section
      ref={containerRef}
      id="moments"
      className="relative bg-[#0C0C0C] py-28 sm:py-36 z-20 overflow-hidden select-none"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16 sm:mb-20">
        <div className="flex flex-col items-start">
          <FadeIn delay={0.1}>
            <span className="text-xs md:text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#00D2FF] mb-3 inline-block">
              // 05 — PHOTOGRAPHIC ARCHIVE
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight hero-heading">
              MOMENTS
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-[#D7E2EA]/65 max-w-2xl font-light">
              Một vài hình ảnh ngoài công việc — những khoảnh khắc đời thường, cảnh sắc quê hương và hành trình trải nghiệm.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          style={{ x: xTranslate }}
          className="flex items-center gap-6 sm:gap-8 px-6 sm:px-12 will-change-transform"
        >
          {moments.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className={`relative flex-shrink-0 rounded-[28px] overflow-hidden group cursor-pointer border border-white/10 bg-zinc-900 shadow-2xl transition-all duration-500 hover:border-white/30 ${getAspectClasses(
                item.aspectRatio
              )}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-between p-6">
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/10">
                    {item.category}
                  </span>

                  {/* Hover "VIEW" Badge */}
                  <div className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-[#0066FF] text-white flex items-center justify-center transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-lg">
                    <Eye size={16} />
                  </div>
                </div>

                {/* Bottom Caption Info */}
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide group-hover:text-[#D7E2EA] transition-colors">
                    {item.title}
                  </h4>
                  {item.location && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#D7E2EA]/70">
                      <MapPin size={12} className="text-[#00D2FF]" />
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
