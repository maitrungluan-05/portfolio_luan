import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { AnimatedText } from '../common/AnimatedText';
import { FadeIn } from '../common/FadeIn';

export const AboutSection: React.FC = () => {
  const { aboutText, aboutFragments } = useData();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Parallax transforms for decorative photographic fragments
  const yFrag1 = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const yFrag2 = useTransform(scrollYProgress, [0, 1], [40, -50]);
  const yFrag3 = useTransform(scrollYProgress, [0, 1], [-30, 40]);
  const yFrag4 = useTransform(scrollYProgress, [0, 1], [30, -40]);

  const f0 = aboutFragments[0] || { rotation: -3, image: '/images/about-01.jpg', title: 'Digital Craft' };
  const f1 = aboutFragments[1] || { rotation: 2, image: '/images/about-02.jpg', title: 'Automation Flow' };
  const f2 = aboutFragments[2] || { rotation: -2, image: '/images/about-03.jpg', title: 'Creative Lab' };
  const f3 = aboutFragments[3] || { rotation: 3, image: '/images/about-04.jpg', title: 'Identity' };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-[#0C0C0C] py-28 sm:py-36 px-6 sm:px-8 lg:px-12 flex items-center justify-center overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#0066FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#00D2FF]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Decorative Photographic Fragments - Desktop Parallax */}
      {/* Fragment 1: Top Left */}
      <motion.div
        style={{ y: yFrag1, rotate: f0.rotation }}
        className="hidden lg:block absolute top-20 left-12 xl:left-24 w-44 xl:w-52 h-56 rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 group"
      >
        <img
          src={f0.image}
          alt={f0.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
          <span className="text-[11px] font-mono tracking-wider text-white uppercase">
            {f0.title}
          </span>
        </div>
      </motion.div>

      {/* Fragment 2: Top Right */}
      <motion.div
        style={{ y: yFrag2, rotate: f1.rotation }}
        className="hidden lg:block absolute top-24 right-12 xl:right-24 w-48 xl:w-56 h-60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 group"
      >
        <img
          src={f1.image}
          alt={f1.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
          <span className="text-[11px] font-mono tracking-wider text-white uppercase">
            {f1.title}
          </span>
        </div>
      </motion.div>

      {/* Fragment 3: Bottom Left */}
      <motion.div
        style={{ y: yFrag3, rotate: f2.rotation }}
        className="hidden lg:block absolute bottom-20 left-16 xl:left-28 w-40 xl:w-48 h-52 rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 group"
      >
        <img
          src={f2.image}
          alt={f2.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
          <span className="text-[11px] font-mono tracking-wider text-white uppercase">
            {f2.title}
          </span>
        </div>
      </motion.div>

      {/* Fragment 4: Bottom Right */}
      <motion.div
        style={{ y: yFrag4, rotate: f3.rotation }}
        className="hidden lg:block absolute bottom-24 right-16 xl:right-28 w-44 xl:w-52 h-56 rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 group"
      >
        <img
          src={f3.image}
          alt={f3.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
          <span className="text-[11px] font-mono tracking-wider text-white uppercase">
            {f3.title}
          </span>
        </div>
      </motion.div>

      {/* Center Editorial Composition */}
      <div className="relative z-20 max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        <FadeIn delay={0.1}>
          <span className="inline-block text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-[#00D2FF] mb-4 font-semibold">
            // 01 — IDENTITY & VALUES
          </span>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight hero-heading mb-12 sm:mb-16">
            ABOUT ME
          </h2>
        </FadeIn>

        {/* Scroll-driven character-by-character reveal */}
        <div className="max-w-3xl mx-auto px-4 text-left sm:text-center">
          <AnimatedText
            text={aboutText}
            progress={scrollYProgress}
            className="text-lg sm:text-2xl md:text-3xl font-light"
          />
        </div>

        {/* Quick Highlights Bar */}
        <FadeIn delay={0.4} className="mt-16 sm:mt-20 w-full max-w-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 text-center">
            <div className="p-4 rounded-xl glass-dark border border-white/5">
              <span className="block text-2xl sm:text-3xl font-black text-white font-kanit">
                4+
              </span>
              <span className="text-xs font-light text-[#D7E2EA]/60 uppercase tracking-wider">
                Năm Lập Trình
              </span>
            </div>
            <div className="p-4 rounded-xl glass-dark border border-white/5">
              <span className="block text-2xl sm:text-3xl font-black text-white font-kanit">
                30+
              </span>
              <span className="text-xs font-light text-[#D7E2EA]/60 uppercase tracking-wider">
                Dự Án & Tác Vụ
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-4 rounded-xl glass-dark border border-white/5">
              <span className="block text-2xl sm:text-3xl font-black text-white font-kanit">
                100%
              </span>
              <span className="text-xs font-light text-[#D7E2EA]/60 uppercase tracking-wider">
                Đam Mê & Tận Tâm
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
