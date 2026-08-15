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

  return (
    <section
      id="contact"
      className="relative bg-[#0C0C0C] rounded-t-[40px] md:rounded-t-[60px] py-28 sm:py-36 px-6 sm:px-8 lg:px-12 z-30 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#0066FF]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-[#00D2FF]/12 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header & Introduction */}
        <div className="max-w-4xl mb-16 sm:mb-24">
          <FadeIn delay={0.1}>
            <span className="text-xs md:text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#00D2FF] mb-3 inline-block">
              // 07 — GET IN TOUCH
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight hero-heading">
              LET'S CONNECT
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 space-y-4 max-w-2xl text-lg sm:text-2xl text-[#D7E2EA]/80 font-light leading-relaxed">
              <p>
                Nếu bạn muốn trao đổi về công việc, một dự án hoặc đơn giản là nói chuyện về công nghệ, hãy liên hệ với tôi.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-8">
            <Magnet padding={60} strength={4}>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full accent-btn-gradient text-white font-medium text-sm tracking-widest uppercase shadow-xl shadow-blue-900/40 hover:shadow-blue-700/60 transition-all duration-300 focus:outline-none"
              >
                <MessageSquare size={16} />
                <span>GỬI TIN NHẮN</span>
                <ArrowUpRight size={16} />
              </button>
            </Magnet>
          </FadeIn>
        </div>

        {/* Large Interactive Contact Rows */}
        <div className="divide-y divide-white/15 border-t border-b border-white/15">
          {CONTACT_CHANNELS.map((item, index) => (
            <a
              key={item.name}
              href={item.url}
              target={item.url.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="group block py-10 sm:py-14 transition-all duration-300 hover:bg-white/[0.02] focus:outline-none"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                  <span className="font-mono text-xs text-[#00D2FF] font-bold tracking-widest">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#D7E2EA] group-hover:text-white group-hover:translate-x-3 transition-all duration-300">
                      {item.name}
                    </h3>
                    <span className="text-xs sm:text-sm font-mono text-[#D7E2EA]/50 group-hover:text-[#D7E2EA]/80 transition-colors">
                      {item.handle} • {item.category}
                    </span>
                  </div>
                </div>

                {/* Diagonal Arrow Icon */}
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border border-white/15 group-hover:border-white group-hover:bg-white/10 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                  <ArrowUpRight
                    size={28}
                    className="text-[#D7E2EA] group-hover:text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-8"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative max-w-lg w-full bg-[#141414] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center focus:outline-none"
              >
                <X size={18} />
              </button>

              {formSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold uppercase text-white">
                    Đã Gửi Thành Công!
                  </h3>
                  <p className="text-sm text-[#D7E2EA]/70">
                    Cảm ơn bạn. Tôi sẽ phản hồi lại bạn sớm nhất có thể.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <span className="text-xs font-mono text-[#00D2FF] uppercase tracking-widest">
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
                    <label className="block text-xs font-mono text-[#D7E2EA]/70 uppercase mb-2">
                      Họ và Tên
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00D2FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#D7E2EA]/70 uppercase mb-2">
                      Email / Telegram
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com hoặc @telegram_user"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00D2FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#D7E2EA]/70 uppercase mb-2">
                      Nội dung tin nhắn
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Chia sẻ về dự án hoặc lời nhắn của bạn..."
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00D2FF] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl accent-btn-gradient text-white font-semibold text-xs uppercase tracking-widest shadow-lg hover:shadow-blue-900/50 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>ĐANG GỬI TIN NHẮN...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>GỬI NGAY</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
