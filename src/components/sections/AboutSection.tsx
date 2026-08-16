import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { AnimatedText } from '../common/AnimatedText';
import { FadeIn } from '../common/FadeIn';
import { ImageLightbox } from '../common/ImageLightbox';
import type { MomentItem } from '../../types';
import { Eye } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { aboutText, aboutFragments } = useData();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.9', 'center start'],
  });

  // Parallax transforms with spring dampening
  const rawY1 = useTransform(scrollYProgress, [0, 1], [-30, 45]);
  const rawY2 = useTransform(scrollYProgress, [0, 1], [30, -35]);
  const rawY3 = useTransform(scrollYProgress, [0, 1], [-20, 30]);
  const rawY4 = useTransform(scrollYProgress, [0, 1], [20, -30]);

  const yFrag1 = useSpring(rawY1, { stiffness: 80, damping: 20 });
  const yFrag2 = useSpring(rawY2, { stiffness: 80, damping: 20 });
  const yFrag3 = useSpring(rawY3, { stiffness: 80, damping: 20 });
  const yFrag4 = useSpring(rawY4, { stiffness: 80, damping: 20 });

  const f0 = aboutFragments[0] || { rotation: -2, image: '/images/about-01.jpg', title: 'Khát vọng vươn xa' };
  const f1 = aboutFragments[1] || { rotation: 2, image: '/images/about-02.jpg', title: 'Bình minh quê hương' };
  const f2 = aboutFragments[2] || { rotation: -1, image: '/images/about-03.jpg', title: 'Tập trung & Tĩnh lặng' };
  const f3 = aboutFragments[3] || { rotation: 2, image: '/images/about-04.jpg', title: 'Gốc rễ vững chắc' };

  const fragmentsList: MomentItem[] = [
    { id: 'f0', title: f0.title, category: 'ABOUT', location: 'Cát Tiến, Bình Định', aspectRatio: 'portrait', image: f0.image, caption: f0.title },
    { id: 'f1', title: f1.title, category: 'ABOUT', location: 'Bình Định', aspectRatio: 'portrait', image: f1.image, caption: f1.title },
    { id: 'f2', title: f2.title, category: 'ABOUT', location: 'Workspace', aspectRatio: 'portrait', image: f2.image, caption: f2.title },
    { id: 'f3', title: f3.title, category: 'ABOUT', location: 'Cát Tiến', aspectRatio: 'portrait', image: f3.image, caption: f3.title },
  ];

  const handleOpenLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-[#0B1528] py-24 sm:py-32 px-6 sm:px-8 lg:px-12 flex items-center justify-center overflow-hidden border-t border-[#00A3FF]/20"
    >
      {/* Oceanic Azure ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#00A3FF]/15 rounded-full blur-[160px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0284C7]/15 rounded-full blur-[150px] pointer-events-none animate-aurora-delayed" />

      {/* Decorative Photographic Fragments - Desktop Parallax */}
      {/* Fragment 1: Top Left */}
      <motion.div
        style={{ y: yFrag1, rotate: f0.rotation }}
        onClick={() => handleOpenLightbox(0)}
        className="hidden lg:block absolute top-20 left-12 xl:left-24 w-44 xl:w-52 h-56 rounded-2xl overflow-hidden shadow-2xl border border-white/15 z-10 group cursor-pointer hover:border-[#00D2FF]/60 hover:scale-105 transition-all duration-300"
      >
        <img
          src={f0.image}
          alt={f0.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end justify-between p-3.5">
          <span className="text-[11px] font-mono tracking-wider text-zinc-200 uppercase font-medium">
            {f0.title}
          </span>
          <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-[#00D2FF] group-hover:text-black text-white flex items-center justify-center transition-colors">
            <Eye size={12} />
          </div>
        </div>
      </motion.div>

      {/* Fragment 2: Top Right */}
      <motion.div
        style={{ y: yFrag2, rotate: f1.rotation }}
        onClick={() => handleOpenLightbox(1)}
        className="hidden lg:block absolute top-24 right-12 xl:right-24 w-48 xl:w-56 h-60 rounded-2xl overflow-hidden shadow-2xl border border-white/15 z-10 group cursor-pointer hover:border-[#00D2FF]/60 hover:scale-105 transition-all duration-300"
      >
        <img
          src={f1.image}
          alt={f1.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end justify-between p-3.5">
          <span className="text-[11px] font-mono tracking-wider text-zinc-200 uppercase font-medium">
            {f1.title}
          </span>
          <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-[#00D2FF] group-hover:text-black text-white flex items-center justify-center transition-colors">
            <Eye size={12} />
          </div>
        </div>
      </motion.div>

      {/* Fragment 3: Bottom Left */}
      <motion.div
        style={{ y: yFrag3, rotate: f2.rotation }}
        onClick={() => handleOpenLightbox(2)}
        className="hidden lg:block absolute bottom-20 left-16 xl:left-28 w-40 xl:w-48 h-52 rounded-2xl overflow-hidden shadow-2xl border border-white/15 z-10 group cursor-pointer hover:border-[#00D2FF]/60 hover:scale-105 transition-all duration-300"
      >
        <img
          src={f2.image}
          alt={f2.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end justify-between p-3.5">
          <span className="text-[11px] font-mono tracking-wider text-zinc-200 uppercase font-medium">
            {f2.title}
          </span>
          <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-[#00D2FF] group-hover:text-black text-white flex items-center justify-center transition-colors">
            <Eye size={12} />
          </div>
        </div>
      </motion.div>

      {/* Fragment 4: Bottom Right */}
      <motion.div
        style={{ y: yFrag4, rotate: f3.rotation }}
        onClick={() => handleOpenLightbox(3)}
        className="hidden lg:block absolute bottom-24 right-16 xl:right-28 w-44 xl:w-52 h-56 rounded-2xl overflow-hidden shadow-2xl border border-white/15 z-10 group cursor-pointer hover:border-[#00D2FF]/60 hover:scale-105 transition-all duration-300"
      >
        <img
          src={f3.image}
          alt={f3.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end justify-between p-3.5">
          <span className="text-[11px] font-mono tracking-wider text-zinc-200 uppercase font-medium">
            {f3.title}
          </span>
          <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-[#00D2FF] group-hover:text-black text-white flex items-center justify-center transition-colors">
            <Eye size={12} />
          </div>
        </div>
      </motion.div>

      {/* Center Editorial Composition */}
      <div className="relative z-20 max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        <FadeIn delay={0.1}>
          <span className="inline-flex items-center gap-2 text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-[#00B2FE] mb-4 font-semibold px-4 py-1.5 rounded-full bg-[#00A3FF]/15 border border-[#00A3FF]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B2FE] animate-pulse" />
            // 01 — IDENTITY & VALUES
          </span>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight hero-heading mb-10 sm:mb-14">
            ABOUT ME
          </h2>
        </FadeIn>

        {/* Scroll-driven character-by-character reveal */}
        <div className="max-w-3xl mx-auto px-4 text-left sm:text-center">
          <AnimatedText
            text={aboutText}
            progress={scrollYProgress}
            className="text-lg sm:text-2xl md:text-[26px] font-light text-zinc-200 leading-relaxed"
          />
        </div>

        {/* Highlights Bar */}
        <FadeIn delay={0.35} className="mt-14 sm:mt-16 w-full max-w-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 text-center">
            <div className="p-5 rounded-2xl glass-card-luminous border border-white/10 group hover:border-[#00A3FF]/50 transition-all duration-300">
              <span className="block text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-100 to-sky-300 font-kanit">
                4+
              </span>
              <span className="text-xs font-medium text-zinc-300 uppercase tracking-wider mt-1 block">
                Năm Lập Trình
              </span>
            </div>
            <div className="p-5 rounded-2xl glass-card-luminous border border-white/10 group hover:border-[#00A3FF]/50 transition-all duration-300">
              <span className="block text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-100 to-sky-300 font-kanit">
                30+
              </span>
              <span className="text-xs font-medium text-zinc-300 uppercase tracking-wider mt-1 block">
                Dự Án & Tác Vụ
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-5 rounded-2xl glass-card-luminous border border-white/10 group hover:border-[#00A3FF]/50 transition-all duration-300">
              <span className="block text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-100 to-sky-300 font-kanit">
                100%
              </span>
              <span className="text-xs font-medium text-zinc-300 uppercase tracking-wider mt-1 block">
                Đam Mê & Tận Tâm
              </span>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Lightbox for About Fragments */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        moments={fragmentsList}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </section>
  );
};
