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
  const topOffset = 100 + index * 24;

  // Scaling calculation for stacking depth
  const targetScale = 1 - (total - 1 - index) * 0.025;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky top-0 w-full mb-16 sm:mb-20 flex items-center justify-center"
      style={{ top: `${topOffset}px` }}
    >
      <motion.div
        style={{ scale }}
        className="relative w-full max-w-6xl rounded-[28px] sm:rounded-[36px] bg-[#0E0E14] border border-white/12 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden group will-change-transform hover:border-sky-400/35 hover:shadow-[0_20px_60px_-15px_rgba(56,189,248,0.18)] transition-all duration-500"
      >
        {/* Subtle ambient lighting inside card */}
        <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-transparent rounded-full blur-[100px] pointer-events-none group-hover:opacity-100 transition-opacity duration-500" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          {/* Left Column: Project Info */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs tracking-wider text-sky-400 font-semibold px-2.5 py-1 rounded-full bg-sky-400/10 border border-sky-400/20">
                  [{project.number} / {total > 9 ? total : `0${total}`}]
                </span>
                <span className="text-[11px] tracking-wider uppercase font-mono px-2.5 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                  {project.type}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mt-2 group-hover:text-sky-200 transition-colors duration-300">
                {project.name}
              </h3>

              <p className="mt-4 text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 group-hover:border-sky-400/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => onOpenModal(project)}
                className="group/btn inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-zinc-100 text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-sky-400/20 hover:scale-[1.02]"
              >
                <span>XEM DỰ ÁN</span>
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black/60 border border-white/12 shadow-xl group-hover:border-sky-400/40 transition-all duration-500">
              <img
                src={project.images[0] || '/images/project-dld-01.jpg'}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating tags */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="text-[10px] font-mono tracking-widest text-zinc-200 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                  FEATURED WORK
                </span>
                <span className="text-[10px] font-mono text-zinc-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
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

  // Listen for Escape key to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section
      id="work"
      className="relative bg-[#0A1322] rounded-t-[36px] md:rounded-t-[48px] py-24 sm:py-32 px-6 sm:px-8 lg:px-12 z-30 border-t border-[#00A3FF]/20"
    >
      {/* Oceanic Azure background glows */}
      <div className="absolute top-1/3 -left-32 w-[600px] h-[600px] bg-[#00A3FF]/10 rounded-full blur-[160px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-1/3 -right-32 w-[550px] h-[550px] bg-[#0284C7]/10 rounded-full blur-[150px] pointer-events-none animate-aurora-delayed" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <FadeIn delay={0.1}>
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#00B2FE] mb-3 px-4 py-1.5 rounded-full bg-[#00A3FF]/15 border border-[#00A3FF]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B2FE] animate-pulse" />
              // 03 — SELECTED PORTFOLIO
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight hero-heading">
              SELECTED WORK
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-light">
              Tuyển tập các sản phẩm web thương mại, hệ thống tự động hóa và các thử nghiệm sáng tạo.
            </p>
          </FadeIn>
        </div>

        {/* Sticky Stacking Projects List */}
        <div className="relative pb-8">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-8"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[#0D182B] border border-[#00A3FF]/30 rounded-3xl p-6 sm:p-10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Close & Back Buttons */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-colors focus:outline-none"
                >
                  <ArrowUpRight size={13} className="rotate-180" />
                  <span>Quay lại</span>
                </button>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
                  aria-label="Đóng"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-7">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-[#00B2FE] font-semibold">
                      [{selectedProject.number}]
                    </span>
                    <span className="text-xs uppercase tracking-wider font-mono text-zinc-400">
                      {selectedProject.type}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                    {selectedProject.name}
                  </h3>
                  <p className="mt-3 text-base text-zinc-300 leading-relaxed font-light">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                {/* Metrics */}
                {selectedProject.metrics && (
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                    {selectedProject.metrics.map((m, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
                        <span className="block text-lg sm:text-2xl font-black text-white font-kanit">
                          {m.value}
                        </span>
                        <span className="text-[11px] text-sky-200 uppercase tracking-wider font-mono">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Video Demo Showcase if available */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-[#00D2FF] font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-ping" />
                      Video Demo Thực Tế
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-400">1080p HD • MP4</span>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-[#00A3FF]/30 bg-black/80 aspect-video shadow-2xl relative group">
                    <video
                      src={
                        selectedProject.id === 'dld-media'
                          ? '/videos/dld_demo.mp4'
                          : '/videos/cinematic_showcase.mp4'
                      }
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Gallery Images */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">
                    Giao diện & Hình ảnh chi tiết
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {selectedProject.images.map((img, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden border border-white/10 aspect-video bg-[#13223D] hover:border-sky-400/40 transition-colors">
                        <img src={img} alt={`${selectedProject.name} screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Tags & Bottom Close Button */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technologies.map((t) => (
                      <span key={t} className="text-xs font-mono px-3 py-1 rounded-full bg-[#00A3FF]/15 border border-[#00A3FF]/25 text-sky-200">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-100 transition-colors shadow-lg"
                  >
                    ← QUAY LẠI TRANG CHỦ
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
