import React, { useRef, useState, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  padding?: number;
  strength?: number;
  disabled?: boolean;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  className = '',
  padding = 120,
  strength = 5,
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports touch only
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    checkTouch();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isTouchDevice || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    const maxDistance = Math.max(width, height) / 2 + padding;

    if (distance < maxDistance) {
      setIsActive(true);
      const pullX = (distanceX / maxDistance) * (strength * 4);
      const pullY = (distanceY / maxDistance) * (strength * 4);
      setPosition({ x: pullX, y: pullY });
    } else {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
  };

  const transformStyle = disabled || isTouchDevice
    ? 'none'
    : `translate3d(${position.x}px, ${position.y}px, 0px)`;

  const transitionStyle = isActive
    ? 'transform 0.3s ease-out'
    : 'transform 0.6s ease-in-out';

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        transform: transformStyle,
        transition: transitionStyle,
        willChange: isActive ? 'transform' : 'auto',
      }}
    >
      {children}
    </div>
  );
};
