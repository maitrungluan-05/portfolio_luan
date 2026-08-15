import React from 'react';
import { FadeIn } from './FadeIn';

interface SectionHeadingProps {
  tag?: string;
  number?: string;
  title: string;
  subtitle?: string;
  theme?: 'dark' | 'light';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tag,
  number,
  title,
  subtitle,
  theme = 'dark',
  align = 'left',
  className = '',
}) => {
  const isDark = theme === 'dark';

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div className={`flex flex-col ${alignClasses} max-w-4xl mb-12 md:mb-20 ${className}`}>
      {(tag || number) && (
        <FadeIn delay={0.1}>
          <div className="flex items-center gap-3 mb-4">
            {number && (
              <span className="font-mono text-xs md:text-sm tracking-widest text-[#00D2FF] font-bold">
                [{number}]
              </span>
            )}
            {tag && (
              <span
                className={`text-xs md:text-sm tracking-[0.25em] uppercase font-medium px-3 py-1 rounded-full ${
                  isDark
                    ? 'bg-white/5 text-[#D7E2EA]/70 border border-white/10'
                    : 'bg-[#0C0C0C]/5 text-[#0C0C0C]/70 border border-[#0C0C0C]/10'
                }`}
              >
                {tag}
              </span>
            )}
          </div>
        </FadeIn>
      )}

      <FadeIn delay={0.2}>
        <h2
          className={`font-black uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] ${
            isDark ? 'text-[#D7E2EA]' : 'text-[#0C0C0C]'
          }`}
        >
          {title}
        </h2>
      </FadeIn>

      {subtitle && (
        <FadeIn delay={0.3}>
          <p
            className={`mt-4 text-base sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed ${
              isDark ? 'text-[#D7E2EA]/60' : 'text-[#0C0C0C]/70'
            }`}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
};
