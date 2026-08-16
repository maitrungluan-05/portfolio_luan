import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useData } from '../../context/DataContext';
import type { StoryCardItem, MomentItem } from '../../types';
import { ImageLightbox } from '../common/ImageLightbox';
import { Eye, MoveHorizontal, Sparkles } from 'lucide-react';

interface MarqueeCardProps {
  item: StoryCardItem;
  onCardClick: () => void;
}

const MarqueeCard: React.FC<MarqueeCardProps> = ({ item, onCardClick }) => {
  const isDraggingRef = useRef(false);
  const pointerDownPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const dist = Math.hypot(
      e.clientX - pointerDownPos.current.x,
      e.clientY - pointerDownPos.current.y
    );
    if (dist > 6) {
      isDraggingRef.current = true;
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) {
      onCardClick();
    }
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative flex-shrink-0 w-[270px] sm:w-[350px] md:w-[410px] h-[190px] sm:h-[230px] md:h-[260px] rounded-[24px] overflow-hidden group cursor-pointer border border-white/12 bg-[#0D182B]/80 shadow-xl transition-all duration-300 hover:border-[#00D2FF]/60 hover:shadow-[0_12px_40px_-8px_rgba(0,210,255,0.35)] select-none"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 pointer-events-none"
        loading="lazy"
        draggable={false}
      />

      {/* Glass gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1322]/90 via-[#0A1322]/35 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-between p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#00A3FF]/20 text-[#7DD3FC] backdrop-blur-md border border-[#00A3FF]/30">
            {item.category}
          </span>

          {/* Glowing Eye View Button on Hover */}
          <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-[#00D2FF] group-hover:text-black text-white flex items-center justify-center transition-all duration-300 transform scale-90 group-hover:scale-105 shadow-md">
            <Eye size={15} />
          </div>
        </div>

        <div>
          <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide group-hover:text-[#BAE6FD] transition-colors">
            {item.title}
          </h4>
          <p className="text-xs text-[#D7E2EA]/75 font-light mt-0.5">
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine both rows for universal Lightbox gallery
  const allStoryItems = [...storyMarqueeRow1, ...storyMarqueeRow2];
  const allMomentsFormatted: MomentItem[] = allStoryItems.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    location: item.subtitle,
    aspectRatio: 'landscape',
    image: item.image,
    caption: `${item.title} — ${item.subtitle} (Mai Trung Luân Portfolio)`,
  }));

  const openLightboxForId = (id: string) => {
    const foundIndex = allStoryItems.findIndex((s) => s.id === id);
    setCurrentIndex(foundIndex >= 0 ? foundIndex : 0);
    setLightboxOpen(true);
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rawX1 = useTransform(scrollYProgress, [0, 1], ['-10%', '6%']);
  const rawX2 = useTransform(scrollYProgress, [0, 1], ['6%', '-10%']);

  const x1 = useSpring(rawX1, { stiffness: 70, damping: 20 });
  const x2 = useSpring(rawX2, { stiffness: 70, damping: 20 });

  // Triple items for seamless loop appearance
  const row1Items = [...storyMarqueeRow1, ...storyMarqueeRow1, ...storyMarqueeRow1];
  const row2Items = [...storyMarqueeRow2, ...storyMarqueeRow2, ...storyMarqueeRow2];

  return (
    <section
      ref={sectionRef}
      className="relative py-14 sm:py-20 bg-[#080E1A] overflow-hidden select-none border-b border-[#00A3FF]/15"
    >
      {/* Interactive Helper Hint Badge */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#7DD3FC]/80 px-3.5 py-1.5 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/20 backdrop-blur-md">
          <MoveHorizontal size={13} className="text-[#00D2FF] animate-pulse" />
          <span className="tracking-wider uppercase">Lướt qua lại • Bấm để xem ảnh phóng to</span>
        </div>
        <div className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400">
          <Sparkles size={13} className="text-[#FFB800]" />
          <span>{allStoryItems.length} Khoảnh khắc & Cột mốc</span>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Row 1: Interactive Draggable Marquee */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -1400, right: 300 }}
          dragElastic={0.15}
          style={{ x: x1 }}
          className="flex gap-4 sm:gap-5 will-change-transform cursor-grab active:cursor-grabbing px-6"
        >
          {row1Items.map((item, idx) => (
            <MarqueeCard
              key={`r1-${item.id}-${idx}`}
              item={item}
              onCardClick={() => openLightboxForId(item.id)}
            />
          ))}
        </motion.div>

        {/* Row 2: Interactive Draggable Marquee (Reverse) */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -1400, right: 300 }}
          dragElastic={0.15}
          style={{ x: x2 }}
          className="flex gap-4 sm:gap-5 will-change-transform cursor-grab active:cursor-grabbing px-6"
        >
          {row2Items.map((item, idx) => (
            <MarqueeCard
              key={`r2-${item.id}-${idx}`}
              item={item}
              onCardClick={() => openLightboxForId(item.id)}
            />
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal for Story Cards */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        moments={allMomentsFormatted}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </section>
  );
};
