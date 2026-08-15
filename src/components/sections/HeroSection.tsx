import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Magnet } from '../common/Magnet';
import { ElectricFireSmokeCanvas } from '../common/ElectricFireSmokeCanvas';

export const HeroSection: React.FC = () => {
  const { personalInfo } = useData();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 14;
      const y = (e.clientY / innerHeight - 0.5) * 14;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Display "TRUNG LUÂN" or custom name
  const displayName = personalInfo.name === 'LUAN.' ? 'TRUNG LUÂN' : personalInfo.name;

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full bg-[#080B10] flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden select-none"
    >
      {/* 1. Volumetric Smoke Vignettes on Side Borders (matching reference image) */}
      <div className="absolute top-1/4 -left-20 w-[450px] sm:w-[650px] h-[550px] bg-gradient-to-r from-white/10 via-[#0066FF]/15 to-transparent rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-[450px] sm:w-[650px] h-[550px] bg-gradient-to-l from-white/10 via-[#0066FF]/15 to-transparent rounded-full blur-[110px] pointer-events-none" />

      {/* 2. Deep Electric Blue Core Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[600px] bg-[#0066FF]/35 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[600px] h-[450px] bg-[#00D2FF]/25 rounded-full blur-[120px] pointer-events-none" />

      {/* 3. Real-Time Dynamic Rising Blue Flames & Volumetric Smoke Canvas */}
      <ElectricFireSmokeCanvas />

      {/* Main Center Stage: Layered Glowing Typography and Portrait */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto my-auto pt-4 sm:pt-0"
      >
        {/* Massive Radiant Ice-Blue Glowing Typography Behind Portrait */}
        <motion.div
          style={{ y: headingY }}
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full text-center pointer-events-none"
        >
          {/* Mobile Display: 2 Stacked Massive Heroic Words */}
          <div className="flex flex-col sm:hidden items-center justify-center -space-y-3 drop-shadow-[0_0_40px_rgba(0,180,255,0.8)]">
            <span className="hero-electric-text font-black uppercase text-[clamp(4.6rem,22vw,6.5rem)] leading-[0.82] tracking-tighter">
              TRUNG
            </span>
            <span className="hero-electric-text font-black uppercase text-[clamp(4.6rem,22vw,6.5rem)] leading-[0.82] tracking-tighter">
              LUÂN
            </span>
          </div>

          {/* Desktop & Tablet Display: Single Line Huge Poster Headline */}
          <h1
            className="hidden sm:block hero-electric-text font-black uppercase tracking-[-0.03em] leading-[0.85] text-[clamp(4.2rem,13.2vw,14.5rem)] select-none whitespace-nowrap drop-shadow-[0_0_55px_rgba(0,180,255,0.75)]"
            style={{
              transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            {displayName}
          </h1>
        </motion.div>

        {/* Hero Portrait with Electric Rim Fire Aura */}
        <motion.div
          style={{ y: portraitY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 -mt-18 sm:-mt-28 md:-mt-36 lg:-mt-48 flex justify-center pointer-events-auto w-full"
        >
          <Magnet padding={120} strength={5}>
            <div
              className="relative group cursor-pointer flex justify-center"
              style={{
                transform: `translate3d(${-mousePos.x * 0.55}px, ${-mousePos.y * 0.55}px, 0)`,
                transition: 'transform 0.2s ease-out',
              }}
            >
              {/* Backlight Electric Flame Rim Light Halo (Pulsing living flame) */}
              <div className="absolute -inset-4 sm:-inset-10 electric-rim-glow rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none animate-flame-pulse" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00D2FF]/60 via-[#0066FF]/40 to-transparent rounded-full blur-2xl opacity-85 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Portrait image with clean seamless alpha transparency */}
              <img
                src="/images/luan-portrait.png"
                alt={personalInfo.fullName || personalInfo.name}
                className="relative z-20 h-[50vh] sm:h-[480px] md:h-[580px] lg:h-[660px] max-h-[680px] w-auto object-contain transition-transform duration-500 will-change-transform"
              />
            </div>
          </Magnet>
        </motion.div>
      </motion.div>

      {/* Hero Bottom Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-30 max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 sm:gap-6 pt-2 sm:pt-4"
      >
        {/* Bottom-left: Roles & Location */}
        <div className="flex flex-wrap sm:flex-col items-center sm:items-start justify-center gap-2 sm:gap-0 sm:space-y-1 text-center sm:text-left">
          {personalInfo.taglines.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-[#D7E2EA]/85 uppercase"
            >
              {tag}
              {idx < personalInfo.taglines.length - 1 && <span className="sm:hidden ml-2 text-white/30">•</span>}
            </span>
          ))}
        </div>

        {/* Bottom-right: Interactive Pill CTA */}
        <Magnet padding={80} strength={4}>
          <a
            href="#about"
            onClick={scrollToAbout}
            className="group flex items-center gap-2.5 sm:gap-3 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full glass-dark text-[#D7E2EA] hover:text-white border border-white/20 hover:border-[#00D2FF]/90 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 focus:outline-none"
          >
            <span className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
              KHÁM PHÁ CÂU CHUYỆN
            </span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#00D2FF] group-hover:text-black transition-colors duration-300">
              <ArrowDown size={12} className="animate-bounce" />
            </div>
          </a>
        </Magnet>
      </motion.div>
    </section>
  );
};

