import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { ProjectItem } from '../../types';
import { FadeIn } from '../common/FadeIn';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  total: number;
  onOpenModal: (project: ProjectItem) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, total, onOpenModal }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  // Calculate sticky stacking top offset
  const topOffset = 110 + index * 28;

  // Scaling calculation for stacking depth (each deeper card scales by ~0.03)
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky top-0 w-full mb-16 sm:mb-24 flex items-center justify-center"
      style={{ top: `${topOffset}px` }}
    >
      <motion.div
        style={{ scale }}
        className="relative w-full max-w-6xl rounded-[32px] sm:rounded-[40px] bg-[#141414] border border-white/15 p-6 sm:p-10 lg:p-14 shadow-2xl overflow-hidden group will-change-transform"
      >
        {/* Ambient card background glow */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#0066FF]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Project Info */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span className="font-mono text-sm tracking-widest text-[#00D2FF] font-bold">
                  [{project.number} / {total > 9 ? total : `0${total}`}]
                </span>
                <span className="text-xs tracking-[0.25em] uppercase font-mono px-3 py-1 rounded-full bg-white/5 text-[#D7E2EA]/70 border border-white/10">
                  {project.type}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mt-2 group-hover:text-[#D7E2EA] transition-colors">
                {project.name}
              </h3>

              <p className="mt-4 text-base sm:text-lg text-[#D7E2EA]/70 font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#D7E2EA]/90"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => onOpenModal(project)}
                className="group/btn inline-flex items-center gap-3 px-7 py-3.5 rounded-full accent-btn-gradient text-white font-medium text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-blue-900/30 hover:shadow-blue-700/50 transition-all duration-300"
              >
                <span>XEM DỰ ÁN</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </button>
            </div>
          </div>

          {/* Right Column: Strong Visual Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] bg-black/40 border border-white/10 shadow-2xl group-hover:border-white/20 transition-all duration-500">
              <img
                src={project.images[0] || '/images/project-dld-01.jpg'}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating badges on image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="text-[11px] font-mono tracking-widest text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  FEATURED WORK
                </span>
                <span className="text-[11px] font-mono text-white/80 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  {project.technologies[0] || 'Web'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const { projects } = useData();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="work"
      className="relative bg-[#0C0C0C] rounded-t-[40px] md:rounded-t-[60px] py-28 sm:py-36 px-6 sm:px-8 lg:px-12 z-30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <FadeIn delay={0.1}>
            <span className="text-xs md:text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#00D2FF] mb-3 inline-block">
              // 03 — SELECTED PORTFOLIO
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight hero-heading">
              SELECTED WORK
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-[#D7E2EA]/65 max-w-2xl font-light">
              Tuyển tập các dự án nổi bật từ giải pháp web thương mại, hệ thống backend tự động đến các phòng lab tương tác sáng tạo.
            </p>
          </FadeIn>
        </div>

        {/* Sticky Stacking Projects List */}
        <div className="relative pb-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Interactive Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-8"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[#141414] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
              >
                <X size={20} />
              </button>

              {/* Modal Content */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-[#00D2FF] font-bold">
                      [{selectedProject.number}]
                    </span>
                    <span className="text-xs uppercase tracking-widest font-mono text-[#D7E2EA]/60">
                      {selectedProject.type}
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                    {selectedProject.name}
                  </h3>
                  <p className="mt-3 text-base text-[#D7E2EA]/80 leading-relaxed">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                {/* Metrics */}
                {selectedProject.metrics && (
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    {selectedProject.metrics.map((m, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <span className="block text-xl sm:text-2xl font-black text-white font-kanit">
                          {m.value}
                        </span>
                        <span className="text-[11px] text-[#D7E2EA]/60 uppercase tracking-wider font-mono">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Gallery Images */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/60">
                    Hình ảnh giao diện & kiến trúc
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedProject.images.map((img, idx) => (
                      <div key={idx} className="rounded-2xl overflow-hidden border border-white/10 aspect-video">
                        <img src={img} alt={`${selectedProject.name} screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((t) => (
                      <span key={t} className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-[#D7E2EA]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-2.5 rounded-full bg-white text-[#0C0C0C] font-semibold text-xs uppercase tracking-wider hover:bg-white/90 transition-colors"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
