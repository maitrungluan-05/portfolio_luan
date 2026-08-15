import React from 'react';
import { ExternalLink, Navigation, Compass } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { FadeIn } from '../common/FadeIn';
import { Magnet } from '../common/Magnet';

export const GoogleMapsSection: React.FC = () => {
  const { personalInfo } = useData();
  return (
    <section className="relative bg-[#0C0C0C] py-24 sm:py-32 px-6 sm:px-8 lg:px-12 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <FadeIn delay={0.1}>
            <span className="text-xs md:text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#00D2FF] mb-3 inline-block">
              // 04 — GEOGRAPHIC ROOTS
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight hero-heading">
              FIND MY HOMETOWN
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-3 text-base sm:text-lg md:text-xl text-[#D7E2EA]/65 max-w-2xl font-light">
              Một điểm nhỏ trên bản đồ, nhưng là nơi câu chuyện bắt đầu.
            </p>
          </FadeIn>
        </div>

        {/* Map Container with Floating Card */}
        <FadeIn delay={0.35}>
          <div className="relative w-full rounded-3xl sm:rounded-[36px] overflow-hidden border border-white/15 shadow-2xl bg-zinc-950 aspect-[4/5] sm:aspect-[16/9] lg:aspect-[16/7]">
            {/* Google Maps Iframe */}
            <iframe
              src={personalInfo.mapsEmbedUrl}
              title="Bản đồ Cát Tiến, Bình Định"
              className="w-full h-full border-0 filter grayscale-[60%] invert-[90%] hue-rotate-180 contrast-[1.1] hover:filter-none transition-all duration-700"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            {/* Floating Glassmorphism Location Card */}
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-20 max-w-xs sm:max-w-sm glass-dark rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Compass size={16} className="text-[#00D2FF] animate-spin-slow" />
                <span className="text-[11px] font-mono tracking-widest text-[#D7E2EA]/70 uppercase">
                  TỌA ĐỘ • 13.9782° N, 109.2458° E
                </span>
              </div>

              <div className="space-y-0.5 mb-5 font-black uppercase text-xl sm:text-2xl text-white tracking-tight leading-tight">
                <div>CÁT TIẾN</div>
                <div className="text-[#D7E2EA]/85">BÌNH ĐỊNH</div>
                <div className="text-[#00D2FF]">VIỆT NAM</div>
              </div>

              <Magnet padding={40} strength={3}>
                <a
                  href={personalInfo.mapsPublicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full accent-btn-gradient text-white text-xs font-semibold uppercase tracking-wider shadow-lg hover:shadow-blue-900/40 transition-all duration-300"
                >
                  <Navigation size={13} />
                  <span>MỞ TRÊN GOOGLE MAPS</span>
                  <ExternalLink size={12} />
                </a>
              </Magnet>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
