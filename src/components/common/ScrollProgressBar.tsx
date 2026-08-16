import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent">
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#FF9E00] shadow-[0_0_12px_rgba(0,210,255,0.6)]"
        style={{ scaleX }}
      />
    </div>
  );
};
