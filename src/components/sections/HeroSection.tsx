import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Magnet } from '../common/Magnet';

export const HeroSection: React.FC = () => {
  const { personalInfo } = useData();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth scroll transformations with spring dampening
  const rawHeadingY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const rawPortraitY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const headingY = useSpring(rawHeadingY, { stiffness: 100, damping: 25 });
  const portraitY = useSpring(rawPortraitY, { stiffness: 100, damping: 25 });
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 25 });

  useEffect(() => {
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 20;
        const y = (e.clientY / innerHeight - 0.5) * 20;
        setMousePos({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayName = personalInfo.name === 'LUAN.' ? 'TRUNG LUÂN' : personalInfo.name;

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full bg-[#0A1322] flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden select-none"
    >
      {/* 1. Luminous Ambient Azure Aurora Glows */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[950px] lg:w-[1200px] h-[500px] sm:h-[650px] bg-gradient-to-tr from-[#00A3FF]/25 via-[#0066FF]/15 to-[#0284C7]/20 rounded-full blur-[140px] pointer-events-none transition-transform duration-700 ease-out animate-aurora"
        style={{
          transform: `translate3d(calc(-50% + ${mousePos.x * 1.5}px), calc(-50% + ${mousePos.y * 1.5}px), 0)`,
        }}
      />
      <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-[#00A3FF]/15 rounded-full blur-[130px] pointer-events-none animate-aurora-delayed" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-[#0284C7]/15 rounded-full blur-[130px] pointer-events-none animate-aurora" />

      {/* Subtle Grid / Texture Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,163,255,0.08)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none opacity-50" />

      {/* Floating Ambient Sparkles / Light motes */}
      <div className="absolute top-1/4 left-1/6 w-1.5 h-1.5 rounded-full bg-sky-300 animate-twinkle pointer-events-none shadow-[0_0_8px_#00A3FF]" />
      <div className="absolute top-1/3 right-1/5 w-2 h-2 rounded-full bg-indigo-300 animate-twinkle pointer-events-none shadow-[0_0_10px_#818cf8]" style={{ animationDelay: '1.2s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-1 h-1 rounded-full bg-white animate-twinkle pointer-events-none shadow-[0_0_6px_#fff]" style={{ animationDelay: '2.4s' }} />
      <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 rounded-full bg-sky-200 animate-twinkle pointer-events-none shadow-[0_0_8px_#38bdf8]" style={{ animationDelay: '0.6s' }} />

      {/* Main Center Stage: Layered Typography and Portrait */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto my-auto pt-4 sm:pt-0"
      >
        {/* Glossy Shimmering Headline Typography */}
        <motion.div
          style={{ y: headingY }}
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full text-center pointer-events-none select-none"
        >
          {/* Mobile Display: Single-Line Cinematic Typography with Elegant Spacing */}
          <div className="flex flex-col sm:hidden items-center justify-center pt-2 pb-2">
            {/* Top Micro-badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00A3FF]/15 border border-[#00A3FF]/30 text-[#00B2FE] text-[10px] font-mono tracking-widest uppercase mb-3 shadow-[0_0_15px_rgba(0,163,255,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B2FE] animate-pulse" />
              <span>DIGITAL CRAFT & SYSTEMS</span>
            </div>

            {/* Clean Single-Line Heading with Outfit Font (Hết dính, chữ thoáng đãng sang trọng) */}
            <h1 className="font-outfit font-black uppercase text-[clamp(2.35rem,10.8vw,4.2rem)] tracking-wider leading-tight text-shimmer-gloss drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] whitespace-nowrap">
              {displayName}
            </h1>
          </div>

          {/* Desktop & Tablet Display: Glossy Light Beam Sweep with Outfit Font */}
          <h1
            className="hidden sm:block font-outfit font-black uppercase tracking-[-0.03em] leading-[0.85] text-[clamp(4.2rem,13vw,13.5rem)] select-none whitespace-nowrap text-shimmer-gloss drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
            style={{
              transform: `translate3d(${mousePos.x * 0.35}px, ${mousePos.y * 0.35}px, 0)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            {displayName}
          </h1>
        </motion.div>

        {/* Hero Portrait with Luminous Studio Light */}
        <motion.div
          style={{ y: portraitY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mt-1 sm:-mt-28 md:-mt-36 lg:-mt-48 flex justify-center pointer-events-auto w-full"
        >
          <Magnet padding={120} strength={4}>
            <div
              className="relative group cursor-pointer flex justify-center"
              style={{
                transform: `translate3d(${-mousePos.x * 0.45}px, ${-mousePos.y * 0.45}px, 0)`,
                transition: 'transform 0.2s ease-out',
              }}
            >
              {/* Luminous Backlight Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#00A3FF]/35 via-[#0066FF]/20 to-transparent rounded-full blur-3xl opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Radiant Halo Ring behind head */}
              <div className="absolute top-6 sm:top-8 w-56 h-56 sm:w-80 sm:h-80 rounded-full border border-[#00A3FF]/30 bg-gradient-to-b from-[#00A3FF]/15 to-transparent blur-md group-hover:scale-105 transition-transform duration-700 pointer-events-none" />

              {/* Portrait image */}
              <img
                src="/images/luan-portrait.png"
                alt={personalInfo.fullName || personalInfo.name}
                className="relative z-20 h-[48vh] sm:h-[480px] md:h-[580px] lg:h-[660px] max-h-[680px] w-auto object-contain transition-transform duration-500 will-change-transform drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)] group-hover:scale-[1.02]"
              />
            </div>
          </Magnet>
        </motion.div>
      </motion.div>

      {/* Hero Bottom Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 sm:gap-6 pt-2 sm:pt-4"
      >
        {/* Bottom-left: Roles & Location */}
        <div className="flex flex-wrap sm:flex-col items-center sm:items-start justify-center gap-2 sm:gap-0 sm:space-y-1 text-center sm:text-left">
          {personalInfo.taglines.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-zinc-300 uppercase flex items-center gap-1.5"
            >
              <span className="w-1 h-1 rounded-full bg-sky-400" />
              {tag}
              {idx < personalInfo.taglines.length - 1 && <span className="sm:hidden ml-2 text-white/20">•</span>}
            </span>
          ))}
        </div>

        {/* Bottom-right: Action CTAs */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3">
          <Magnet padding={60} strength={3}>
            <a
              href="https://zalo.me/0974496371"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#0068FF] hover:bg-[#0052cc] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(0,104,255,0.4)] hover:shadow-[0_0_30px_rgba(0,104,255,0.6)] hover:scale-[1.03] transition-all duration-300 focus:outline-none border border-white/20"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>TƯ VẤN ZALO (0974.496.371)</span>
            </a>
          </Magnet>

          <Magnet padding={60} strength={3}>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-sky-400/50 backdrop-blur-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 focus:outline-none shadow-lg"
            >
              <Sparkles size={14} className="text-[#00D2FF]" />
              <span>DỊCH VỤ MMO</span>
            </a>
          </Magnet>

          <Magnet padding={60} strength={3}>
            <a
              href="#about"
              onClick={scrollToAbout}
              className="group hidden lg:flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 backdrop-blur-xl transition-all duration-300 focus:outline-none"
            >
              <span className="text-xs font-medium tracking-[0.2em] uppercase">
                VỀ TÔI
              </span>
              <div className="w-4 h-4 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                <ArrowDown size={11} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </div>
            </a>
          </Magnet>
        </div>
      </motion.div>
    </section>
  );
};

