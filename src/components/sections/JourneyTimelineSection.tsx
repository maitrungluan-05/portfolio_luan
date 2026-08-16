import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { FadeIn } from '../common/FadeIn';

export const JourneyTimelineSection: React.FC = () => {
  const { journey } = useData();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.7', 'end 0.85'],
  });

  const rawLineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const lineHeight = useSpring(rawLineHeight, { stiffness: 80, damping: 20 });

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative bg-[#0B1528] text-[#FAFAFA] rounded-t-[36px] md:rounded-t-[48px] py-24 sm:py-32 px-6 sm:px-8 lg:px-12 z-20 overflow-hidden border-t border-[#00A3FF]/20"
    >
      {/* Oceanic Azure background glows */}
      <div className="absolute top-1/3 -left-32 w-[600px] h-[600px] bg-[#00A3FF]/12 rounded-full blur-[160px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-1/3 -right-32 w-[550px] h-[550px] bg-[#0284C7]/12 rounded-full blur-[150px] pointer-events-none animate-aurora-delayed" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <FadeIn delay={0.1}>
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#00B2FE] mb-3 px-4 py-1.5 rounded-full bg-[#00A3FF]/15 border border-[#00A3FF]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B2FE] animate-pulse" />
              // 06 — CHRONOLOGY & PROGRESSION
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight hero-heading">
              MY JOURNEY
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-light">
              Từng bước phát triển trong hành trình tiếp cận công nghệ, xây dựng sản phẩm và định hình con đường của chính mình.
            </p>
          </FadeIn>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 md:pl-16">
          {/* Background Static Line */}
          <div className="absolute left-2.5 sm:left-4 md:left-6 top-4 bottom-4 w-[2px] bg-white/10" />

          {/* Animated Scroll Progress Line with Glow */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-2.5 sm:left-4 md:left-6 top-4 w-[2px] bg-gradient-to-b from-[#00A3FF] via-[#00B2FE] to-[#0284C7] origin-top shadow-[0_0_12px_rgba(0,163,255,0.8)]"
          />

          {/* Timeline Milestones */}
          <div className="space-y-12 sm:space-y-18">
            {journey.map((step, index) => (
              <div key={step.number} className="relative group">
                {/* Milestone Node Dot */}
                <div className="absolute -left-6 sm:-left-10 md:-left-16 top-2 flex items-center justify-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0A0A0E] border-2 border-white/30 group-hover:border-sky-400 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.6)] flex items-center justify-center transition-all duration-300 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-sky-400 transition-colors duration-300" />
                  </div>
                </div>

                {/* Milestone Content Box */}
                <FadeIn delay={index * 0.08} className="glass-card-luminous rounded-2xl sm:rounded-3xl p-6 sm:p-9 shadow-lg hover:border-sky-400/40 hover:shadow-[0_12px_40px_-10px_rgba(56,189,248,0.18)] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-sky-400 px-2.5 py-0.5 rounded-full bg-sky-400/10 border border-sky-400/20">
                        [{step.number}]
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white group-hover:text-sky-200 transition-colors">
                        {step.stage}
                      </h3>
                    </div>

                    <span className="text-xs font-mono font-medium tracking-wider text-zinc-300 px-3 py-1 rounded-full bg-white/5 w-fit border border-white/10">
                      {step.period}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-zinc-200 mb-2">
                    {step.title}
                  </h4>

                  <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10 group-hover:border-sky-400/20 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
