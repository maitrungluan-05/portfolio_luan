import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { MapPin } from 'lucide-react';
import { FadeIn } from '../common/FadeIn';

export const HometownSection: React.FC = () => {
  const { hometownStory } = useData();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Slow scale from 1.05 to 1.15 on scroll with spring
  const rawImageScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.14]);
  const imageScale = useSpring(rawImageScale, { stiffness: 80, damping: 20 });

  const rawTextY = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '-8%', '-20%']);
  const textY1 = useSpring(rawTextY, { stiffness: 80, damping: 20 });

  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.85]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.55, 0.7]);

  return (
    <section
      ref={containerRef}
      id="hometown"
      className="relative h-[200vh] bg-[#0A1322] select-none"
    >
      {/* Sticky Fullscreen Story Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Full-width Large Landscape Background Image */}
        <motion.div
          style={{ scale: imageScale }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <img
            src={hometownStory.heroImage || '/images/hometown-hero.jpg'}
            alt="Cát Tiến, Bình Định"
            className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.04]"
          />
        </motion.div>

        {/* Dynamic Dark Gradient Overlays */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-[#0A1322]/80 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1322] via-transparent to-[#0A1322]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1322]/60 via-transparent to-[#0A1322]/60 pointer-events-none" />

        {/* Storytelling Text Container */}
        <motion.div
          style={{ y: textY1, opacity: textOpacity }}
          className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center flex flex-col items-center justify-center space-y-7 sm:space-y-9"
        >
          {/* Sub-tag */}
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300">
              <MapPin size={13} className="text-sky-400" />
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase font-medium">
                THÔN CHÁNH OAI • CÁT TIẾN • GIA LAI
              </span>
            </div>
          </FadeIn>

          {/* Titles */}
          <div className="space-y-3 sm:space-y-4">
            <FadeIn delay={0.2}>
              <h3 className="text-xl sm:text-3xl md:text-4xl font-light tracking-[0.25em] uppercase text-zinc-300">
                {hometownStory.title}
              </h3>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)]">
                {hometownStory.locationName}
              </h2>
            </FadeIn>
          </div>

          {/* Minimal Story Text */}
          <FadeIn delay={0.4}>
            <div className="max-w-2xl mx-auto space-y-3 text-base sm:text-xl text-zinc-200 font-light leading-relaxed drop-shadow-md">
              {Array.isArray(hometownStory.paragraphs)
                ? hometownStory.paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
                : <p>{hometownStory.paragraphs}</p>}
            </div>
          </FadeIn>

          {/* Quote */}
          {hometownStory.quote && (
            <FadeIn delay={0.5}>
              <div className="pt-5 border-t border-white/15 max-w-lg">
                <span className="italic text-xs sm:text-sm font-light text-zinc-400 tracking-wide">
                  "{hometownStory.quote}"
                </span>
              </div>
            </FadeIn>
          )}
        </motion.div>
      </div>
    </section>
  );
};
