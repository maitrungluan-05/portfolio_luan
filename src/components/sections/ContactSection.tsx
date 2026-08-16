import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Send, CheckCircle2, X, MessageSquare, Loader2 } from 'lucide-react';
import { CONTACT_CHANNELS } from '../../data/portfolioData';
import { useData } from '../../context/DataContext';
import { FadeIn } from '../common/FadeIn';
import { Magnet } from '../common/Magnet';

export const ContactSection: React.FC = () => {
  const { sendMessage } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage('');
    const res = await sendMessage(formData);
    setIsSubmitting(false);

    if (res.success) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setModalOpen(false);
        setFormData({ name: '', email: '', message: '' });
      }, 2500);
    } else {
      setErrorMessage(res.message);
    }
  };

  // Listen for Escape key to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };
    if (modalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  return (
    <section
      id="contact"
      className="relative bg-[#0A1322] rounded-t-[36px] md:rounded-t-[48px] py-24 sm:py-32 px-6 sm:px-8 lg:px-12 z-30 overflow-hidden border-t border-[#00A3FF]/20"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#00A3FF]/15 rounded-full blur-[150px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-[#0284C7]/15 rounded-full blur-[140px] pointer-events-none animate-aurora-delayed" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header & Introduction */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <FadeIn delay={0.1}>
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#00B2FE] mb-3 px-4 py-1.5 rounded-full bg-[#00A3FF]/15 border border-[#00A3FF]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B2FE] animate-pulse" />
              // 07 — GET IN TOUCH
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight hero-heading text-white">
              LET'S CONNECT
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-6 space-y-4 max-w-2xl text-base sm:text-xl text-zinc-300 font-light leading-relaxed">
              <p>
                Nếu bạn muốn trao đổi về công việc, một dự án hoặc đơn giản là nói chuyện về công nghệ, hãy liên hệ với tôi.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-8">
            <Magnet padding={60} strength={3}>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-zinc-100 text-black font-semibold text-xs tracking-widest uppercase shadow-xl shadow-sky-500/10 hover:shadow-sky-400/30 hover:scale-[1.02] transition-all duration-300 focus:outline-none"
              >
                <MessageSquare size={16} />
                <span>GỬI TIN NHẮN</span>
                <ArrowUpRight size={16} />
              </button>
            </Magnet>
          </FadeIn>
        </div>

        {/* Large Interactive Contact Rows */}
        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {CONTACT_CHANNELS.map((item, index) => (
            <a
              key={item.name}
              href={item.url}
              target={item.url.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="group block py-9 sm:py-12 px-4 sm:px-6 rounded-2xl sm:rounded-3xl transition-all duration-300 hover:bg-gradient-to-r hover:from-white/[0.04] hover:to-[#00A3FF]/[0.06] focus:outline-none"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                  <span className="font-mono text-xs text-[#00B2FE] font-semibold tracking-widest px-2 py-0.5 rounded bg-[#00A3FF]/15">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#FAFAFA] group-hover:text-sky-100 group-hover:translate-x-2 transition-all duration-300">
                      {item.name}
                    </h3>
                    <span className="text-xs sm:text-sm font-mono text-zinc-300 group-hover:text-white transition-colors">
                      {item.handle} • {item.category}
                    </span>
                  </div>
                </div>

                {/* Diagonal Arrow Icon */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/15 group-hover:border-[#00B2FE] group-hover:bg-[#00A3FF] group-hover:text-white flex items-center justify-center transition-all duration-300 flex-shrink-0 text-zinc-400 shadow-md group-hover:shadow-[0_0_20px_rgba(0,163,255,0.4)]">
                  <ArrowUpRight
                    size={24}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Direct Message Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-6"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 15, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-lg w-full bg-[#0D182B] border border-[#00A3FF]/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Close & Back */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-colors focus:outline-none"
                >
                  <ArrowUpRight size={13} className="rotate-180" />
                  <span>Quay lại</span>
                </button>

                <button
                  onClick={() => setModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
                  aria-label="Đóng"
                >
                  <X size={18} />
                </button>
              </div>

              {formSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold uppercase text-white">
                    Đã Gửi Thành Công!
                  </h3>
                  <p className="text-sm text-zinc-300">
                    Cảm ơn bạn. Tôi sẽ phản hồi lại bạn sớm nhất có thể.
                  </p>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                  >
                    ← QUAY LẠI TRANG CHỦ
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <span className="text-xs font-mono text-[#00B2FE] uppercase tracking-widest">
                      // DIRECT MESSAGE
                    </span>
                    <h3 className="text-2xl font-black uppercase text-white mt-1">
                      GỬI TIN NHẮN
                    </h3>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                      Họ và Tên
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#00A3FF]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                      Email / Telegram
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com hoặc @telegram_user"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#00A3FF]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                      Nội dung tin nhắn
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Chia sẻ về dự án hoặc lời nhắn của bạn..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#00A3FF]/50 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="w-1/3 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs uppercase tracking-wider transition-all"
                    >
                      HỦY
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0284C7] hover:from-[#00B2FE] hover:to-[#0369A1] text-white font-semibold text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>ĐANG GỬI...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>GỬI NGAY</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
