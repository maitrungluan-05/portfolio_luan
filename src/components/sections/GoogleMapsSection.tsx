import React from 'react';
import { ExternalLink, Navigation, Compass } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { FadeIn } from '../common/FadeIn';
import { Magnet } from '../common/Magnet';

export const GoogleMapsSection: React.FC = () => {
  const { personalInfo } = useData();
  return (
    <section
      id="maps"
      className="relative bg-[#0B1528] py-24 sm:py-32 px-6 sm:px-8 lg:px-12 z-20 overflow-hidden border-t border-[#00A3FF]/20"
    >
      {/* Oceanic Azure ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00A3FF]/12 rounded-full blur-[180px] pointer-events-none animate-aurora" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <FadeIn delay={0.1}>
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#00B2FE] mb-3 px-4 py-1.5 rounded-full bg-[#00A3FF]/15 border border-[#00A3FF]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B2FE] animate-pulse" />
              // 04 — GEOGRAPHIC ROOTS
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight hero-heading">
              FIND MY HOMETOWN
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-3 text-base sm:text-lg text-zinc-300 max-w-2xl font-light">
              Một điểm nhỏ trên bản đồ, nhưng là nơi câu chuyện bắt đầu.
            </p>
          </FadeIn>
        </div>

        {/* Map Container with Floating Card */}
        <FadeIn delay={0.35}>
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-zinc-950 aspect-[4/5] sm:aspect-[16/9] lg:aspect-[16/7]">
            {/* Google Maps Iframe */}
            <iframe
              src={personalInfo.mapsEmbedUrl}
              title="Bản đồ vị trí TRUNG LUÂN MMO"
              className="w-full h-full border-0 filter grayscale-[40%] invert-[90%] hue-rotate-180 contrast-[1.08] hover:filter-none transition-all duration-700"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            {/* Floating Location Card */}
            <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 z-20 max-w-xs sm:max-w-sm glass-card-luminous rounded-2xl p-5 sm:p-6 border border-white/15 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-center gap-2 mb-2.5">
                <Compass size={15} className="text-sky-400" />
                <span className="text-[10px] font-mono tracking-wider text-zinc-300 uppercase font-medium">
                  TỌA ĐỘ • 14.0320° N, 109.2392° E
                </span>
              </div>

              <div className="space-y-0.5 mb-4 font-black uppercase text-lg sm:text-xl text-white tracking-tight leading-tight">
                <div className="text-sky-400">TRUNG LUÂN MMO</div>
                <div className="text-zinc-200 text-sm font-semibold">CÁT TIẾN, BÌNH ĐỊNH</div>
                <div className="text-zinc-400 text-xs font-mono">VIỆT NAM</div>
              </div>

              <Magnet padding={40} strength={3}>
                <a
                  href={personalInfo.mapsPublicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-zinc-100 text-black text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-sky-400/20"
                >
                  <Navigation size={12} />
                  <span>MỞ TRÊN GOOGLE MAPS</span>
                  <ExternalLink size={11} />
                </a>
              </Magnet>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
