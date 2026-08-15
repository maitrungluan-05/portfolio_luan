import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { FadeIn } from '../common/FadeIn';

export const JourneyTimelineSection: React.FC = () => {
  const { journey } = useData();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.6', 'end 0.8'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative bg-[#F4F2ED] text-[#0C0C0C] rounded-t-[40px] md:rounded-t-[60px] py-28 sm:py-36 px-6 sm:px-8 lg:px-12 z-20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-28">
          <FadeIn delay={0.1}>
            <span className="text-xs md:text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#0066FF] mb-3 inline-block">
              // 06 — CHRONOLOGY & PROGRESSION
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#0C0C0C]">
              MY JOURNEY
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-[#0C0C0C]/70 max-w-2xl font-light">
              Từng bước phát triển trong hành trình tiếp cận công nghệ, xây dựng sản phẩm và định hình con đường của chính mình.
            </p>
          </FadeIn>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 md:pl-16">
          {/* Background Timeline Static Line */}
          <div className="absolute left-2.5 sm:left-4 md:left-6 top-4 bottom-4 w-[2px] bg-[#0C0C0C]/15" />

          {/* Animated Scroll Progress Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-2.5 sm:left-4 md:left-6 top-4 w-[2px] bg-gradient-to-b from-[#00D2FF] via-[#0066FF] to-[#003B99] origin-top"
          />

          {/* Timeline Milestones */}
          <div className="space-y-16 sm:space-y-24">
            {journey.map((step, index) => (
              <div key={step.number} className="relative group">
                {/* Milestone Node Dot */}
                <div className="absolute -left-6 sm:-left-10 md:-left-16 top-1.5 flex items-center justify-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F4F2ED] border-2 border-[#0C0C0C]/40 group-hover:border-[#0066FF] flex items-center justify-center transition-colors duration-300 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#0C0C0C]/40 group-hover:bg-[#0066FF] transition-colors duration-300" />
                  </div>
                </div>

                {/* Milestone Content Box */}
                <FadeIn delay={index * 0.1} className="bg-white/70 backdrop-blur-sm border border-[#0C0C0C]/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#0C0C0C]/20">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-[#0066FF]">
                        [{step.number}]
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0C0C0C]">
                        {step.stage}
                      </h3>
                    </div>

                    <span className="text-xs font-mono font-medium tracking-wider text-[#0C0C0C]/50 px-3 py-1 rounded-full bg-[#0C0C0C]/5 w-fit">
                      {step.period}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-[#0C0C0C]/90 mb-2">
                    {step.title}
                  </h4>

                  <p className="text-sm sm:text-base text-[#0C0C0C]/75 font-normal leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 pt-2">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-[#0C0C0C]/5 text-[#0C0C0C]/70"
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
