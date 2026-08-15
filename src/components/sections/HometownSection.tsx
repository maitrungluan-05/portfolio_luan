import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  // Slow scale from 1.05 to 1.18 on scroll
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  // Gentle vertical movement of texts
  const textY1 = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '-10%', '-25%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.8]);
  // Overlay darkening
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.45, 0.6, 0.75]);

  return (
    <section
      ref={containerRef}
      id="hometown"
      className="relative h-[220vh] bg-[#0C0C0C] select-none"
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
            className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.05]"
          />
        </motion.div>

        {/* Dynamic Dark Gradient Overlays */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-[#0C0C0C]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />

        {/* Storytelling Text Container */}
        <motion.div
          style={{ y: textY1, opacity: textOpacity }}
          className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center flex flex-col items-center justify-center space-y-8 sm:space-y-10"
        >
          {/* Sub-tag */}
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[#D7E2EA]">
              <MapPin size={13} className="text-[#00D2FF]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase font-medium">
                CÁT TIẾN • PHÙ CÁT • BÌNH ĐỊNH
              </span>
            </div>
          </FadeIn>

          {/* Emotional Large Titles */}
          <div className="space-y-3 sm:space-y-4">
            <FadeIn delay={0.2}>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.3em] uppercase text-[#D7E2EA]/85">
                {hometownStory.title}
              </h3>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                {hometownStory.locationName}
              </h2>
            </FadeIn>
          </div>

          {/* Minimal Story Text */}
          <FadeIn delay={0.4}>
            <div className="max-w-2xl mx-auto space-y-4 text-base sm:text-xl md:text-2xl text-[#D7E2EA]/90 font-light leading-relaxed drop-shadow-md">
              {Array.isArray(hometownStory.paragraphs)
                ? hometownStory.paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
                : <p>{hometownStory.paragraphs}</p>}
            </div>
          </FadeIn>

          {/* Poetic Quote */}
          {hometownStory.quote && (
            <FadeIn delay={0.5}>
              <div className="pt-6 border-t border-white/20 max-w-lg">
                <span className="italic text-xs sm:text-sm font-light text-[#D7E2EA]/75 tracking-wider">
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
