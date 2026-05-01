'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useLocale } from '@/context/LocaleContext';
import type { Locale } from '@/types';

interface MobileHeaderProps {
  locale: Locale;
}

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'Path', href: '#xp' },
  { label: 'Contact', href: '#contact' },
];

export function MobileHeader({ locale }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme, mounted } = useTheme();
  const { locale: currentLocale, switchLocale } = useLocale();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 h-14"
        style={{ background: 'rgba(9,9,11,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #18181b' }}
      >
        <Link
          href={`/${locale}`}
          className="font-mono text-[13px] tracking-[0.12em] text-neutral-50"
          aria-label="Rafael Alves — home"
        >
          RA
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-neutral-400 hover:text-neutral-50 transition-colors"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-50 flex flex-col"
            style={{ background: '#09090b' }}
          >
            <div
              className="flex items-center justify-between px-6 h-14"
              style={{ borderBottom: '1px solid #18181b' }}
            >
              <span className="font-mono text-[13px] tracking-[0.12em] text-neutral-50">RA</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-50 transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-col gap-2 p-8 flex-1">
              {NAV_ITEMS.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-[10px] tracking-[0.18em] uppercase text-neutral-400 hover:text-primary-400 transition-colors py-3"
                  style={{ borderBottom: '1px solid #18181b' }}
                >
                  {label}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-3 px-8 pb-8">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="font-mono text-[10px] tracking-widest uppercase text-neutral-500 hover:text-neutral-50 transition-colors"
                >
                  {isDark ? 'Light' : 'Dark'}
                </button>
              )}
              <span className="text-neutral-700">·</span>
              <button
                onClick={() => switchLocale(currentLocale === 'en' ? 'pt-BR' : 'en')}
                className="font-mono text-[10px] tracking-widest uppercase text-neutral-500 hover:text-neutral-50 transition-colors"
              >
                {currentLocale === 'en' ? 'PT-BR' : 'EN'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
