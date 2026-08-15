import React from 'react';
import { Magnet } from './Magnet';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'pill';
  className?: string;
  icon?: React.ReactNode;
  target?: string;
  rel?: string;
  padding?: number;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  icon,
  target,
  rel,
  padding = 60,
  strength = 4,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'accent-btn-gradient text-white shadow-lg shadow-blue-900/30 hover:shadow-blue-700/50 border border-white/20';
      case 'secondary':
        return 'bg-[#D7E2EA] text-[#0C0C0C] hover:bg-white border border-transparent';
      case 'outline':
        return 'bg-transparent text-[#D7E2EA] border border-[#D7E2EA]/30 hover:border-white hover:bg-white/5';
      case 'pill':
        return 'glass-dark text-[#D7E2EA] hover:text-white border border-[#D7E2EA]/20 hover:border-[#00D2FF]/60';
    }
  };

  const content = (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full font-medium text-sm tracking-wider uppercase transition-all duration-300 ${getVariantStyles()} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
      </span>
      <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );

  if (href) {
    return (
      <Magnet padding={padding} strength={strength}>
        <a
          href={href}
          onClick={onClick}
          target={target}
          rel={rel}
          className="group inline-block focus:outline-none"
        >
          {content}
        </a>
      </Magnet>
    );
  }

  return (
    <Magnet padding={padding} strength={strength}>
      <button
        type="button"
        onClick={onClick}
        className="group inline-block focus:outline-none cursor-pointer"
      >
        {content}
      </button>
    </Magnet>
  );
};
