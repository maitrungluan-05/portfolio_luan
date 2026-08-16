import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CursorSpotlight: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 28, stiffness: 200, mass: 0.6 };
  const cursorX = useSpring(-200, springConfig);
  const cursorY = useSpring(-200, springConfig);

  // Trailing secondary glow
  const trailSpringConfig = { damping: 40, stiffness: 120, mass: 1.2 };
  const trailX = useSpring(-200, trailSpringConfig);
  const trailY = useSpring(-200, trailSpringConfig);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, trailX, trailY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden transition-opacity duration-500">
      {/* Primary Ocean Azure Glow */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#00D2FF]/12 via-[#0066FF]/8 to-transparent blur-[85px]"
      />

      {/* Secondary Sunrise Amber Glow trailing slightly behind */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute w-[320px] h-[320px] rounded-full bg-gradient-to-br from-[#FF9E00]/8 via-[#FF5E62]/6 to-transparent blur-[70px]"
      />
    </div>
  );
};
