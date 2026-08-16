import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Hometown', href: '#hometown' },
  { label: 'Moments', href: '#moments' },
  { label: 'Story Book', href: '#story-book' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const { personalInfo } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#0A1322]/85 backdrop-blur-xl border-b border-[#00A3FF]/20 shadow-xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo / Left Brand */}
          <a
            href="#"
            className="group flex items-center gap-2.5 focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="font-black text-xl tracking-[0.2em] text-[#FAFAFA] transition-opacity duration-200 group-hover:opacity-75">
              {personalInfo.shortName}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B2FE] animate-pulse" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs lg:text-sm font-medium tracking-[0.2em] uppercase text-[#E0F2FE] transition-colors duration-200 hover:text-white relative py-1"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="ml-2 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-zinc-100 hover:shadow-[0_0_20px_rgba(0,163,255,0.4)] transition-all duration-300 shadow-md hover:scale-[1.03]"
            >
              Connect
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#FAFAFA] hover:bg-white/5 transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-30 bg-[#0A1322]/98 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-12 pt-28 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              <span className="text-xs font-mono tracking-[0.3em] text-[#00B2FE] uppercase">
                // MENU
              </span>
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05 }}
                  className="flex items-center justify-between text-3xl font-bold uppercase tracking-wide text-[#E4E4E7] hover:text-white hover:pl-2 transition-all duration-200 border-b border-white/8 pb-4"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={20} className="text-sky-400" />
                </motion.a>
              ))}
            </div>

            <div className="pt-8 border-t border-white/8 flex flex-col gap-2">
              <span className="text-xs text-zinc-500 uppercase tracking-widest">
                MAI TRUNG LUÂN — BASED IN VIETNAM
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {personalInfo.email || 'maitrungluan@gmail.com'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
