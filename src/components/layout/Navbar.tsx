import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Hometown', href: '#hometown' },
  { label: 'Moments', href: '#moments' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const { personalInfo } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#0C0C0C]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo / Left Brand */}
          <a
            href="#"
            className="group flex items-center gap-2 focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="font-black text-xl sm:text-2xl tracking-[0.2em] text-[#D7E2EA] transition-opacity duration-200 group-hover:opacity-75">
              {personalInfo.shortName}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs lg:text-sm font-medium tracking-[0.2em] uppercase text-[#D7E2EA] transition-all duration-200 hover:opacity-65 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#00D2FF] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="ml-2 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider text-white accent-btn-gradient border border-white/10 hover:shadow-lg hover:shadow-blue-900/40 transition-all duration-200"
            >
              Connect
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#D7E2EA] hover:bg-white/5 transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-30 bg-[#0C0C0C]/98 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-12 pt-28 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              <span className="text-xs font-mono tracking-[0.3em] text-[#00D2FF] uppercase">
                // MENU
              </span>
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.06 }}
                  className="flex items-center justify-between text-3xl font-bold uppercase tracking-wide text-[#D7E2EA] hover:text-white hover:pl-2 transition-all duration-200 border-b border-white/10 pb-4"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={22} className="text-[#00D2FF]" />
                </motion.a>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col gap-2">
              <span className="text-xs text-[#D7E2EA]/50 uppercase tracking-widest">
                MAI TRUNG LUÂN — BASED IN VIETNAM
              </span>
              <span className="text-xs font-mono text-[#D7E2EA]/70">
                contact@trungluanmmo.com
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
