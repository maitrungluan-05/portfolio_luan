import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useData } from '../../context/DataContext';
import type { StoryCardItem } from '../../types';

interface MarqueeCardProps {
  item: StoryCardItem;
}

const MarqueeCard: React.FC<MarqueeCardProps> = ({ item }) => {
  return (
    <div className="relative flex-shrink-0 w-[280px] sm:w-[360px] md:w-[420px] h-[190px] sm:h-[230px] md:h-[270px] rounded-[24px] overflow-hidden group cursor-pointer border border-white/10 bg-zinc-900">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full bg-[#0066FF]/85 text-white backdrop-blur-md">
            {item.category}
          </span>
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
            {item.title}
          </h4>
          <p className="text-xs text-[#D7E2EA]/75 font-light">
            {item.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export const VisualMarqueeSection: React.FC = () => {
  const { storyMarqueeRow1, storyMarqueeRow2 } = useData();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Row 1 moves RIGHT, Row 2 moves LEFT
  const x1 = useTransform(scrollYProgress, [0, 1], ['-20%', '10%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['10%', '-20%']);

  // Triple items for seamless loop appearance
  const row1Items = [...storyMarqueeRow1, ...storyMarqueeRow1, ...storyMarqueeRow1];
  const row2Items = [...storyMarqueeRow2, ...storyMarqueeRow2, ...storyMarqueeRow2];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-[#0C0C0C] overflow-hidden select-none"
    >
      <div className="space-y-6 sm:space-y-8">
        {/* Row 1: Moving Right on scroll */}
        <motion.div
          style={{ x: x1 }}
          className="flex gap-4 sm:gap-6 will-change-transform"
        >
          {row1Items.map((item, idx) => (
            <MarqueeCard key={`r1-${item.id}-${idx}`} item={item} />
          ))}
        </motion.div>

        {/* Row 2: Moving Left on scroll */}
        <motion.div
          style={{ x: x2 }}
          className="flex gap-4 sm:gap-6 will-change-transform"
        >
          {row2Items.map((item, idx) => (
            <MarqueeCard key={`r2-${item.id}-${idx}`} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
