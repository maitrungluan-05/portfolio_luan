import React, { useState } from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { FadeIn } from '../common/FadeIn';
import { SKILLS_DOCS, type SkillDocItem } from '../../data/skillsDocs';
import { SkillDocModal } from '../common/SkillDocModal';

export const WhatIDoSection: React.FC = () => {
  const { whatIDo } = useData();
  const [selectedSkillDoc, setSelectedSkillDoc] = useState<SkillDocItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenSkill = (skillName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const doc = SKILLS_DOCS[skillName] || {
      name: skillName,
      category: 'Công nghệ & Kỹ thuật',
      tagline: 'Kỹ năng chuyên môn trong quy trình phát triển sản phẩm.',
      description: `Tài liệu và phương pháp ứng dụng ${skillName} trong thực tế.`,
      officialDocUrl: `https://www.google.com/search?q=${encodeURIComponent(skillName + ' documentation tutorial')}`,
      learningSources: [
        { title: `Tìm kiếm tài liệu & hướng dẫn ${skillName}`, url: `https://www.google.com/search?q=${encodeURIComponent(skillName + ' documentation')}`, type: 'Official Docs' },
        { title: 'Lộ trình phát triển phần mềm Roadmap.sh', url: 'https://roadmap.sh', type: 'Roadmap' },
      ],
      keyTopics: ['Core Fundamentals', 'Best Practices', 'Real-world Application', 'Performance'],
      appliedExperience: `Ứng dụng ${skillName} trong các dự án thực tế để tối ưu quy trình và trải nghiệm.`,
    };
    setSelectedSkillDoc(doc);
    setModalOpen(true);
  };

  const handleOpenRow = (item: typeof whatIDo[0]) => {
    if (item.skills.length > 0) {
      handleOpenSkill(item.skills[0]);
    }
  };

  return (
    <section
      id="work-skills"
      className="relative bg-[#090D14] text-[#FAFAFA] rounded-t-[36px] md:rounded-t-[48px] py-24 sm:py-32 px-6 sm:px-8 lg:px-12 z-20 overflow-hidden border-t border-sky-500/20"
    >
      {/* Oceanic Azure background glows (Tone xanh tươi sáng tự nhiên từ Hình 2) */}
      <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-[#00A3FF]/12 rounded-full blur-[150px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-[#0284C7]/12 rounded-full blur-[150px] pointer-events-none animate-aurora-delayed" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <FadeIn delay={0.1}>
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#00B2FE] mb-3 px-4 py-1.5 rounded-full bg-[#00A3FF]/15 border border-[#00A3FF]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B2FE] animate-pulse" />
              // 02 — EXPERTISE & CRAFT
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight hero-heading">
              WHAT I DO
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-light">
              Tập trung vào sự kết hợp giữa kỹ thuật lập trình vững chắc, tối ưu hóa hệ thống và tư duy thẩm mỹ hiện đại.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-3 inline-flex items-center gap-2 text-xs font-mono text-sky-400/80 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20">
              <BookOpen size={13} />
              <span>(Nhấp vào từng kỹ năng để xem tài liệu chính thức & nguồn học)</span>
            </div>
          </FadeIn>
        </div>

        {/* Large Numbered Editorial List */}
        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {whatIDo.map((item) => (
            <div
              key={item.number}
              onClick={() => handleOpenRow(item)}
              className="group relative py-10 md:py-14 px-4 sm:px-6 rounded-2xl sm:rounded-3xl transition-all duration-300 cursor-pointer hover:bg-gradient-to-r hover:from-white/[0.04] hover:to-[#00A3FF]/[0.06] hover:border hover:border-sky-400/25"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-12">
                {/* Left: Large Number */}
                <div className="flex items-center gap-6">
                  <span className="font-mono text-3xl sm:text-5xl md:text-6xl font-extralight text-zinc-500 group-hover:text-[#00B2FE] group-hover:drop-shadow-[0_0_20px_rgba(0,178,254,0.4)] group-hover:translate-x-2 transition-all duration-300 select-none">
                    {item.number}
                  </span>
                  <div className="w-10 h-[1px] bg-white/15 group-hover:w-16 group-hover:bg-[#00B2FE]/60 transition-all duration-300 hidden sm:block" />
                </div>

                {/* Center: Title & Description */}
                <div className="flex-1 max-w-3xl">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl sm:text-4xl md:text-4xl font-black uppercase tracking-tight text-white group-hover:text-sky-100 transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Clickable Skills Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <button
                        key={skill}
                        onClick={(e) => handleOpenSkill(skill, e)}
                        className="group/skill inline-flex items-center gap-1.5 text-xs font-medium tracking-wide px-3.5 py-1.5 rounded-full bg-[#00A3FF]/10 border border-sky-400/25 hover:border-[#00B2FE] hover:bg-[#00A3FF]/25 hover:text-white text-sky-200 transition-all duration-200 shadow-sm hover:shadow-[0_0_15px_rgba(0,178,254,0.3)]"
                      >
                        <BookOpen size={11} className="text-sky-300 opacity-70 group-hover/skill:opacity-100" />
                        <span>{skill}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Appearing Arrow on desktop hover */}
                <div className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full border border-white/15 group-hover:border-[#00B2FE] group-hover:bg-[#00A3FF] group-hover:text-white transition-all duration-300 text-zinc-400 shadow-md group-hover:shadow-[0_0_20px_rgba(0,163,255,0.4)]">
                  <ArrowUpRight
                    size={24}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Documentation Modal */}
      <SkillDocModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        skillDoc={selectedSkillDoc}
      />
    </section>
  );
};
