import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Code,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Headphones,
  Sparkles,
  Video,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { FadeIn } from '../common/FadeIn';

// Brand SVGs
const FacebookIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TikTokIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const YoutubeIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const getServiceIcon = (iconName?: string, category?: string) => {
  const iconStr = (iconName || '').toLowerCase();
  const catStr = (category || '').toLowerCase();

  if (iconStr.includes('facebook') || catStr.includes('facebook')) return FacebookIcon;
  if (iconStr.includes('tiktok') || catStr.includes('tiktok')) return TikTokIcon;
  if (iconStr.includes('youtube') || catStr.includes('youtube')) return YoutubeIcon;
  if (iconStr.includes('instagram') || catStr.includes('instagram')) return InstagramIcon;
  if (iconStr.includes('map') || catStr.includes('map')) return MapPin;
  if (iconStr.includes('video')) return Video;
  return Code;
};

export const ServicesSection: React.FC = () => {
  const { services } = useData();
  const [activeTab, setActiveTab] = useState<'all' | 'social' | 'dev'>('all');

  const filteredServices = services.filter((s) => {
    const cat = (s.category || '').toLowerCase();
    const isSocial = cat.includes('facebook') || cat.includes('map') || cat.includes('tiktok') || cat.includes('youtube') || cat.includes('instagram');
    const isDev = cat.includes('dev') || cat.includes('code') || cat.includes('bot') || cat.includes('web') || cat.includes('facebook');
    
    if (activeTab === 'social') return isSocial;
    if (activeTab === 'dev') return isDev;
    return true;
  });

  return (
    <section
      id="services"
      className="relative bg-[#070D18] text-[#FAFAFA] py-24 sm:py-32 px-6 sm:px-8 lg:px-12 z-20 overflow-hidden border-t border-[#00A3FF]/20"
    >
      {/* Dynamic ambient lights */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-[#00D2FF]/10 rounded-full blur-[170px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-[#FF9E00]/10 rounded-full blur-[170px] pointer-events-none animate-aurora-delayed" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-18">
          <FadeIn delay={0.1}>
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#00D2FF] mb-3 px-4 py-1.5 rounded-full bg-[#00D2FF]/15 border border-[#00D2FF]/30">
              <Sparkles size={13} className="text-[#FFB800] animate-pulse" />
              // SERVICES & SOLUTIONS — TRUNG LUÂN MMO
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight hero-heading">
              DỊCH VỤ & GIẢI PHÁP MMO
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-[#D7E2EA]/85 max-w-3xl font-light leading-relaxed">
              Cung cấp giải pháp trọn gói từ <strong>Mạng xã hội (Facebook, Google Maps, TikTok, YouTube, IG)</strong> đến <strong>Lập trình Web, Bot & Tool Tự động hóa</strong> giúp bạn gia tăng doanh số và tối ưu hiệu suất vượt bậc.
            </p>
          </FadeIn>

          {/* Filter Tabs */}
          <FadeIn delay={0.4} className="mt-8">
            <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-[#0E1A2E]/90 border border-[#00A3FF]/25 backdrop-blur-xl shadow-lg">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-black shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Tất cả dịch vụ ({services.length})
              </button>
              <button
                onClick={() => setActiveTab('social')}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === 'social'
                    ? 'bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-black shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Social & Map
              </button>
              <button
                onClick={() => setActiveTab('dev')}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === 'dev'
                    ? 'bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-black shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Code Web & Bot
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Services Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredServices.map((service, index) => {
              const IconComp = getServiceIcon(service.icon, service.category);
              const accent = service.accentColor || '#00D2FF';

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  key={service.id}
                  className="relative flex flex-col justify-between rounded-[28px] p-7 sm:p-8 bg-[#0D182B]/85 border border-white/10 backdrop-blur-xl shadow-xl transition-all duration-500 group hover:border-[#00D2FF]/60 hover:shadow-[0_15px_40px_-10px_rgba(0,210,255,0.3)]"
                >
                  {/* Subtle Top Ambient Glow */}
                  <div
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
                    style={{ backgroundColor: accent }}
                  />

                  {/* Header info */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${accent}20`,
                          border: `1px solid ${accent}50`,
                          color: accent,
                        }}
                      >
                        <IconComp size={24} />
                      </div>

                      <span
                        className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
                        style={{
                          backgroundColor: `${accent}15`,
                          borderColor: `${accent}40`,
                          color: accent,
                        }}
                      >
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-white transition-colors">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#D7E2EA]/75 font-light leading-relaxed">
                      {service.tagline}
                    </p>

                    {/* Features List */}
                    <div className="mt-6 space-y-2.5 pt-5 border-t border-white/8">
                      {service.features &&
                        service.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-light">
                            <CheckCircle2
                              size={16}
                              className="text-[#00D2FF] flex-shrink-0 mt-0.5"
                            />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="mt-8 pt-5 border-t border-white/8">
                    <a
                      href={service.ctaUrl || 'https://t.me/trungluanmmo'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-zinc-100 text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md group/btn hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,210,255,0.3)]"
                    >
                      <span>{service.ctaText || 'Tư vấn ngay'}</span>
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Guarantees & Trust Banner */}
        <FadeIn delay={0.5} className="mt-16 sm:mt-20">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0C1A30] via-[#0E2242] to-[#0C1A30] border border-[#00A3FF]/30 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="flex flex-col items-center pt-4 md:pt-0">
                <div className="w-12 h-12 rounded-2xl bg-[#00D2FF]/15 border border-[#00D2FF]/30 text-[#00D2FF] flex items-center justify-center mb-3">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                  Uy Tín & Bảo Mật 100%
                </h4>
                <p className="mt-1 text-xs text-zinc-300 font-light max-w-xs">
                  Mọi thông tin tài khoản và dự án của khách hàng đều được cam kết bảo mật tuyệt đối.
                </p>
              </div>

              <div className="flex flex-col items-center pt-4 md:pt-0 md:px-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FF9E00]/15 border border-[#FF9E00]/30 text-[#FF9E00] flex items-center justify-center mb-3">
                  <Zap size={24} />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                  Tốc Độ & Hiệu Quả Cao
                </h4>
                <p className="mt-1 text-xs text-zinc-300 font-light max-w-xs">
                  Triển khai nhanh chóng, quy trình tự động hóa giúp tiết kiệm tối đa thời gian và chi phí.
                </p>
              </div>

              <div className="flex flex-col items-center pt-4 md:pt-0 md:pl-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00E599]/15 border border-[#00E599]/30 text-[#00E599] flex items-center justify-center mb-3">
                  <Headphones size={24} />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                  Hỗ Trợ Kỹ Thuật 24/7
                </h4>
                <p className="mt-1 text-xs text-zinc-300 font-light max-w-xs">
                  Đồng hành cùng bạn trong suốt quá trình vận hành, support tận tình mọi lúc.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
