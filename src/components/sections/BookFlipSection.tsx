import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { FadeIn } from '../common/FadeIn';
import { ImageLightbox } from '../common/ImageLightbox';
import type { MomentItem } from '../../types';

interface PageData {
  id: string;
  pageNum: number;
  chapter: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  badgeColor: string;
  content: string[];
  quote?: string;
  stats?: { label: string; value: string }[];
}

const BOOK_PAGES: PageData[] = [
  {
    id: 'page-1',
    pageNum: 1,
    chapter: 'CHƯƠNG 01',
    title: 'Nơi Tôi Bắt Đầu',
    subtitle: 'Bình minh rạng rỡ trên biển Cát Tiến, Bình Định',
    image: '/images/moment-01.jpg',
    badge: 'QUÊ HƯƠNG',
    badgeColor: '#00D2FF',
    content: [
      'Sinh ra và lớn lên tại miền duyên hải Cát Tiến (Bình Định), nơi đón những tia nắng bình minh đầu tiên rọi xuống mặt biển bao la.',
      'Sự kiên định của sóng biển và ngọn gió miền Trung là nền tảng nuôi dưỡng đam mê khám phá công nghệ và xây dựng những giá trị số.',
    ],
    quote: 'Biển xanh và nắng sớm nuôi dưỡng ý chí không ngừng tiến về phía trước.',
    stats: [
      { label: 'Tọa độ', value: '14.0320° N' },
      { label: 'Bờ biển', value: 'Cát Tiến' },
    ],
  },
  {
    id: 'page-2',
    pageNum: 2,
    chapter: 'CHƯƠNG 02',
    title: 'Cột Mốc FPT Polytechnic',
    subtitle: 'Tốt nghiệp loại Giỏi chuyên ngành CNTT & Chứng chỉ Anh ngữ',
    image: '/images/moment-03.jpg',
    badge: 'HỌC TẬP & NỀN TẢNG',
    badgeColor: '#FFB800',
    content: [
      'Hoàn thành chương trình đào tạo Công nghệ thông tin (Ứng dụng phần mềm) tại FPT Polytechnic với xếp loại Tốt nghiệp Giỏi.',
      'Trang bị nền tảng lập trình bài bản, tư duy kiến trúc hệ thống và khả năng tự nghiên cứu, làm chủ công nghệ mới một cách độc lập.',
    ],
    quote: 'Nền tảng vững chắc là bệ phóng cho những giải pháp tự động hóa đột phá.',
    stats: [
      { label: 'Xếp loại', value: 'GIỎI' },
      { label: 'Tiếng Anh', value: 'Level 3' },
    ],
  },
  {
    id: 'page-3',
    pageNum: 3,
    chapter: 'CHƯƠNG 03',
    title: 'Đêm Muộn & Automation Bot',
    subtitle: 'Góc làm việc bàn phím cơ RGB & Hệ thống C# / .NET / Node.js',
    image: '/images/project-auto-01.jpg',
    badge: 'LẬP TRÌNH & BOT',
    badgeColor: '#00E599',
    content: [
      'Những đêm muộn cùng màn hình kép, xây dựng các công cụ tự động hóa Check LIVE/DIE Facebook, Bot Telegram quản trị và hệ thống MMO.',
      'Tập trung tối ưu tốc độ xử lý dưới 200ms, độ ổn định 99.9% và giảm tải tối đa các thao tác thủ công.',
    ],
    quote: 'Tự động hóa không chỉ là viết code, mà là biến thời gian thành đòn bẩy hiệu suất.',
    stats: [
      { label: 'Tốc độ', value: '< 200ms' },
      { label: 'Uptime', value: '99.9%' },
    ],
  },
  {
    id: 'page-4',
    pageNum: 4,
    chapter: 'CHƯƠNG 04',
    title: 'Tập Trung & Tĩnh Lặng',
    subtitle: 'Dopamine Detox — Thanh lọc tâm trí để kiến tạo điều cốt lõi',
    image: '/images/moment-04.jpg',
    badge: 'LIFESTYLE & TƯ DUY',
    badgeColor: '#E1306C',
    content: [
      'Rèn luyện kỷ luật bản thân, hạn chế sự phân tâm số và duy trì trạng thái tập trung sâu (Deep Work) để giải quyết các bài toán khó.',
      'Sự tĩnh lặng giúp tâm trí luôn sáng suốt, nhìn rõ mục tiêu và giữ vững năng lượng sáng tạo bền bỉ mỗi ngày.',
    ],
    quote: 'Loại bỏ những điều thừa thãi để tập trung 100% vào những gì quan trọng nhất.',
    stats: [
      { label: 'Trạng thái', value: 'Deep Focus' },
      { label: 'Kỷ luật', value: '100%' },
    ],
  },
  {
    id: 'page-5',
    pageNum: 5,
    chapter: 'CHƯƠNG 05',
    title: 'Khát Vọng Vươn Xa',
    subtitle: 'Dịch vụ MMO, Đồng hành cùng khách hàng & Khởi tạo tương lai',
    image: '/images/moment-05.jpg',
    badge: 'TẦM NHÌN & HỢP TÁC',
    badgeColor: '#FF6B35',
    content: [
      'Đứng trước dải biển bao la với chiếc nón đỏ đầy nhiệt huyết, sẵn sàng bước vào những dự án quy mô lớn hơn.',
      'Cung cấp các dịch vụ MMO, Facebook, Google Maps, TikTok, YouTube và Lập trình Web/Bot chất lượng cao với sự tận tâm cao nhất.',
    ],
    quote: 'Không ngừng thử nghiệm, dám bứt phá và luôn tạo ra giá trị thực cho khách hàng.',
    stats: [
      { label: 'Dịch vụ', value: 'Social & Code' },
      { label: 'Hỗ trợ', value: '24/7' },
    ],
  },
];

export const BookFlipSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedMomentIdx, setSelectedMomentIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate dynamic page index based on scroll position
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 24 });

  React.useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      const idx = Math.min(
        BOOK_PAGES.length - 1,
        Math.floor(latest * BOOK_PAGES.length)
      );
      setActivePageIndex(idx);
    });
  }, [smoothProgress]);

  const currentPage = BOOK_PAGES[activePageIndex] || BOOK_PAGES[0];

  const handleNextPage = () => {
    setActivePageIndex((prev) => Math.min(BOOK_PAGES.length - 1, prev + 1));
  };

  const handlePrevPage = () => {
    setActivePageIndex((prev) => Math.max(0, prev - 1));
  };

  const openLightbox = (index: number) => {
    setSelectedMomentIdx(index);
    setLightboxOpen(true);
  };

  const lightboxMoments: MomentItem[] = BOOK_PAGES.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.badge,
    location: p.subtitle,
    aspectRatio: 'landscape',
    image: p.image,
    caption: p.content.join(' '),
  }));

  return (
    <section
      ref={containerRef}
      id="story-book"
      className="relative min-h-[320vh] bg-[#050A14] text-[#FAFAFA] z-20 select-none border-t border-[#00A3FF]/20"
    >
      {/* Sticky Book Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-16 sm:py-20 px-4 sm:px-8 lg:px-12 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/3 -left-32 w-[600px] h-[600px] bg-[#00D2FF]/10 rounded-full blur-[170px] pointer-events-none animate-aurora" />
        <div className="absolute bottom-1/3 -right-32 w-[600px] h-[600px] bg-[#FF9E00]/10 rounded-full blur-[170px] pointer-events-none animate-aurora-delayed" />

        {/* Section Top Header */}
        <div className="max-w-7xl mx-auto w-full text-center relative z-20">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#00D2FF] px-4 py-1.5 rounded-full bg-[#00D2FF]/15 border border-[#00D2FF]/30 shadow-md">
              <BookOpen size={13} className="text-[#00D2FF] animate-pulse" />
              <span>// CHRONOLOGY BOOK — CUỘN HOẶC BẤM ĐỂ LẬT TRANG SÁCH</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight hero-heading mt-2">
              TRANG SÁCH HÀNH TRÌNH
            </h2>
          </FadeIn>
        </div>

        {/* Center 3D Book Layout Container */}
        <div className="relative max-w-5xl w-full mx-auto my-auto perspective-[2000px] z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage.id}
              initial={{ rotateY: -25, opacity: 0, scale: 0.94, y: 15 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1, y: 0 }}
              exit={{ rotateY: 25, opacity: 0, scale: 0.94, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-full rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#0B1528] via-[#0E1F3D] to-[#080F1F] border border-[#00A3FF]/30 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(0,210,255,0.15)] overflow-hidden p-6 sm:p-10 lg:p-12"
            >
              {/* Book Spine Center Glow Line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#00A3FF]/40 to-transparent -translate-x-1/2 pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Page: Visual Showcase */}
                <div className="lg:col-span-6 relative">
                  <div
                    onClick={() => openLightbox(activePageIndex)}
                    className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] bg-black/60 border border-white/15 shadow-2xl group cursor-pointer hover:border-[#00D2FF]/60 transition-all duration-500"
                  >
                    <img
                      src={currentPage.image}
                      alt={currentPage.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

                    {/* Bottom overlay badge */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] font-mono tracking-widest uppercase bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-zinc-200 border border-white/15">
                        {currentPage.badge}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-[#00D2FF] group-hover:text-black text-white flex items-center justify-center transition-colors shadow-md pointer-events-auto">
                        <Eye size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Chapter Tag */}
                  <div className="mt-4 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="text-[#00D2FF] font-semibold tracking-wider">
                      {currentPage.chapter}
                    </span>
                    <span className="tracking-widest">
                      TRANG {currentPage.pageNum} / {BOOK_PAGES.length}
                    </span>
                  </div>
                </div>

                {/* Right Page: Editorial Narrative */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
                        style={{
                          backgroundColor: `${currentPage.badgeColor}15`,
                          borderColor: `${currentPage.badgeColor}40`,
                          color: currentPage.badgeColor,
                        }}
                      >
                        {currentPage.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white mt-1">
                      {currentPage.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-light text-[#7DD3FC] mt-1">
                      {currentPage.subtitle}
                    </p>

                    {/* Content paragraphs */}
                    <div className="mt-5 space-y-3 text-sm sm:text-base text-zinc-200 font-light leading-relaxed">
                      {currentPage.content.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>

                    {/* Quote */}
                    {currentPage.quote && (
                      <div className="mt-5 p-4 rounded-2xl bg-white/[0.04] border border-white/10 italic text-xs sm:text-sm text-zinc-300 font-light">
                        "{currentPage.quote}"
                      </div>
                    )}

                    {/* Stats */}
                    {currentPage.stats && (
                      <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                        {currentPage.stats.map((st, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/8">
                            <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                              {st.label}
                            </span>
                            <span className="block text-base sm:text-lg font-bold text-white mt-0.5">
                              {st.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Page Navigation Controls */}
        <div className="max-w-md mx-auto w-full flex items-center justify-between gap-4 relative z-20 mt-4">
          <button
            onClick={handlePrevPage}
            disabled={activePageIndex === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none text-white text-xs font-semibold uppercase tracking-wider transition-all backdrop-blur-md border border-white/10"
          >
            <ChevronLeft size={16} />
            <span>Trang Trước</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {BOOK_PAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActivePageIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activePageIndex === idx
                    ? 'w-8 bg-[#00D2FF] shadow-[0_0_10px_#00D2FF]'
                    : 'w-2 bg-white/25 hover:bg-white/50'
                }`}
                aria-label={`Đi tới trang ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={activePageIndex === BOOK_PAGES.length - 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00D2FF] hover:bg-[#38BDF8] disabled:opacity-30 disabled:pointer-events-none text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,210,255,0.4)]"
          >
            <span>Trang Tiếp</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        moments={lightboxMoments}
        currentIndex={selectedMomentIdx}
        onIndexChange={setSelectedMomentIdx}
      />
    </section>
  );
};
