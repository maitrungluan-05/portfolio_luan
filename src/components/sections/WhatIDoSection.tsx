import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { FadeIn } from '../common/FadeIn';

export const WhatIDoSection: React.FC = () => {
  const { whatIDo } = useData();
  return (
    <section
      id="work-skills"
      className="relative bg-[#F4F2ED] text-[#0C0C0C] rounded-t-[40px] md:rounded-t-[60px] py-28 sm:py-36 px-6 sm:px-8 lg:px-12 z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <FadeIn delay={0.1}>
            <span className="text-xs md:text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#0066FF] mb-3 inline-block">
              // 02 — EXPERTISE & CRAFT
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#0C0C0C]">
              WHAT I DO
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-[#0C0C0C]/70 max-w-2xl font-light">
              Tập trung vào sự kết hợp giữa kỹ thuật lập trình vững chắc, tối ưu hóa hệ thống và tư duy thẩm mỹ hiện đại.
            </p>
          </FadeIn>
        </div>

        {/* Large Numbered Editorial List */}
        <div className="divide-y divide-[#0C0C0C]/15 border-t border-b border-[#0C0C0C]/15">
          {whatIDo.map((item) => (
            <div
              key={item.number}
              className="group relative py-12 md:py-16 transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-12">
                {/* Left: Large Number */}
                <div className="flex items-center gap-6">
                  <span className="font-mono text-3xl sm:text-5xl md:text-6xl font-extralight text-[#0C0C0C]/35 group-hover:text-[#0066FF] group-hover:translate-x-3 transition-all duration-300 select-none">
                    {item.number}
                  </span>
                  <div className="w-12 h-[1px] bg-[#0C0C0C]/20 group-hover:w-20 group-hover:bg-[#0066FF] transition-all duration-300 hidden sm:block" />
                </div>

                {/* Center: Title & Description */}
                <div className="flex-1 max-w-3xl">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#0C0C0C] group-hover:tracking-wider transition-all duration-300">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-4 text-base sm:text-lg md:text-xl text-[#0C0C0C]/75 font-normal leading-relaxed">
                    {item.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-[#0C0C0C]/5 group-hover:bg-[#0C0C0C]/10 text-[#0C0C0C]/80 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Appearing Arrow on desktop hover */}
                <div className="hidden lg:flex items-center justify-center w-16 h-16 rounded-full border border-[#0C0C0C]/15 group-hover:border-[#0C0C0C] group-hover:bg-[#0C0C0C] transition-all duration-300">
                  <ArrowUpRight
                    size={28}
                    className="text-[#0C0C0C] group-hover:text-[#F4F2ED] transition-colors duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
