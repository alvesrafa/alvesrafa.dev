'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { LanguageSwitch } from '@/components/atoms/LanguageSwitch';
import { SkipLink } from '@/components/atoms/SkipLink';
import { navigationItems, socialLinks } from '@/data/navigation';
import { cn } from '@/lib/utils/cn';
import type { Locale } from '@/types';

interface HeaderProps {
  locale: Locale;
  dictionary: {
    skipToMain: string;
    openMenu: string;
    closeMenu: string;
    toggleTheme: string;
    switchLanguage: string;
  };
}

const iconMap = { github: Github, linkedin: Linkedin, mail: Mail };

export function Header({ locale, dictionary }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    const localePath = `/${locale}${href === '/' ? '' : href}`;
    return pathname === localePath || (href !== '/' && pathname.startsWith(localePath));
  };

  return (
    <>
      <SkipLink>{dictionary.skipToMain}</SkipLink>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-neutral-50/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800'
            : 'bg-transparent'
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo — monogram */}
            <Link
              href={`/${locale}`}
              className="font-mono text-sm font-medium tracking-[0.12em] text-neutral-900 dark:text-neutral-50 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
              aria-label="Rafael Alves — home"
            >
              RA
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href === '/' ? '' : item.href}`}
                  className={cn(
                    'relative text-sm py-1 transition-colors duration-200',
                    isActive(item.href)
                      ? 'text-neutral-900 dark:text-neutral-50 font-medium'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50'
                  )}
                >
                  {item.label[locale]}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute -bottom-px left-0 right-0 h-px bg-primary-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1">
              <ThemeToggle label={dictionary.toggleTheme} />
              <LanguageSwitch label={dictionary.switchLanguage} />

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  'md:hidden ml-1 p-2 rounded-lg transition-colors duration-200',
                  'text-neutral-600 dark:text-neutral-400',
                  'hover:text-neutral-900 dark:hover:text-neutral-50',
                  'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                )}
                aria-label={isMenuOpen ? dictionary.closeMenu : dictionary.openMenu}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className={cn(
                'fixed top-0 right-0 bottom-0 w-64 z-50 md:hidden flex flex-col',
                'bg-neutral-50 dark:bg-neutral-950',
                'border-l border-neutral-200 dark:border-neutral-800'
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-mono text-sm font-medium tracking-[0.12em] text-neutral-900 dark:text-neutral-50">
                  RA
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Nav */}
              <nav className="flex-1 px-4 py-6">
                <p className="label-mono px-2 mb-4">Navigation</p>
                <div className="flex flex-col gap-1">
                  {navigationItems.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={`/${locale}${item.href === '/' ? '' : item.href}`}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          'block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200',
                          isActive(item.href)
                            ? 'text-neutral-900 dark:text-neutral-50 bg-neutral-100 dark:bg-neutral-800'
                            : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        )}
                      >
                        {item.label[locale]}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-1">
                  {socialLinks.map((social) => {
                    const Icon = iconMap[social.icon as keyof typeof iconMap];
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center p-2.5 rounded-lg text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        aria-label={social.name}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
