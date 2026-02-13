'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Code2, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { LanguageSwitch } from '@/components/atoms/LanguageSwitch';
import { SkipLink } from '@/components/atoms/SkipLink';
import { MagneticElement } from '@/components/effects/MagneticElement';
import { navigationItems, personalInfo, socialLinks, quickActions } from '@/data/navigation';
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

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function Header({ locale, dictionary }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.98]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    const localePath = `/${locale}${href === '/' ? '' : href}`;
    return pathname === localePath || (href !== '/' && pathname.startsWith(localePath));
  };

  const showSecondaryNav = isScrolled || pathname !== `/${locale}`;

  return (
    <>
      <SkipLink>{dictionary.skipToMain}</SkipLink>

      <motion.header
        ref={headerRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ opacity: headerOpacity }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40',
          'transition-all duration-500',
          isScrolled
            ? 'bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl shadow-lg shadow-neutral-900/5 dark:shadow-neutral-900/20 border-b border-neutral-200/50 dark:border-neutral-800/50'
            : 'bg-transparent'
        )}
      >
        {/* Top Tier - Always visible */}
        <nav className="container-custom border-b border-neutral-200/30 dark:border-neutral-800/30">
          <div className="flex items-center justify-between h-20">
            {/* Logo with Editorial Serif Font */}
            <MagneticElement strength={0.2}>
              <Link
                href={`/${locale}`}
                className="relative group flex items-center gap-3"
              >
                <motion.div
                  className="relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                </motion.div>
                <span className="font-serif text-2xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {personalInfo.shortName}
                </span>
              </Link>
            </MagneticElement>

            {/* Desktop Primary Navigation */}
            <div className="hidden md:flex items-center gap-0">
              {navigationItems.map((item, index) => (
                <div key={item.href} className="flex items-center">
                  <MagneticElement strength={0.1}>
                    <Link
                      href={`/${locale}${item.href === '/' ? '' : item.href}`}
                      className={cn(
                        'relative px-6 py-2 text-sm font-medium transition-colors group',
                        isActive(item.href)
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                      )}
                      onMouseEnter={() => setHoveredItem(item.href)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.label[locale]}
                      </motion.span>

                      {/* Gradient underline on active/hover */}
                      {isActive(item.href) && (
                        <motion.div
                          layoutId="activeNavUnderline"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-3/4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}

                      {/* Hover underline */}
                      {!isActive(item.href) && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 bg-gradient-to-r from-neutral-300 to-neutral-400 dark:from-neutral-600 dark:to-neutral-500 rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]" />
                      )}
                    </Link>
                  </MagneticElement>

                  {/* Vertical divider */}
                  {index < navigationItems.length - 1 && (
                    <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800" />
                  )}
                </div>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              {/* Social Links - Desktop Only */}
              <div className="hidden lg:flex items-center gap-2 mr-2">
                {socialLinks.map((social) => {
                  const Icon = iconMap[social.icon as keyof typeof iconMap];
                  return (
                    <MagneticElement key={social.name} strength={0.15}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'p-2 rounded-lg transition-all duration-200',
                          'text-neutral-500 dark:text-neutral-400',
                          'hover:text-primary-600 dark:hover:text-primary-400',
                          'hover:bg-primary-50 dark:hover:bg-primary-900/20',
                          'hover:scale-110 hover:rotate-6',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
                        )}
                        aria-label={social.name}
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </a>
                    </MagneticElement>
                  );
                })}
                <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800 ml-1" />
              </div>

              <MagneticElement strength={0.15}>
                <ThemeToggle label={dictionary.toggleTheme} />
              </MagneticElement>
              <MagneticElement strength={0.15}>
                <LanguageSwitch label={dictionary.switchLanguage} />
              </MagneticElement>

              {/* Mobile menu button */}
              <MagneticElement strength={0.2}>
                <motion.button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={cn(
                    'md:hidden p-2 rounded-lg relative overflow-hidden',
                    'bg-neutral-100 dark:bg-neutral-800',
                    'hover:bg-neutral-200 dark:hover:bg-neutral-700',
                    'transition-colors duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
                  )}
                  aria-label={isMenuOpen ? dictionary.closeMenu : dictionary.openMenu}
                  aria-expanded={isMenuOpen}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </MagneticElement>
            </div>
          </div>
        </nav>

        {/* Bottom Tier - Quick Actions (appears on scroll) */}
        <AnimatePresence>
          {showSecondaryNav && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 48, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden bg-neutral-50/50 dark:bg-neutral-900/50"
            >
              <div className="container-custom h-12 flex items-center justify-between">
                {/* Quick Actions */}
                <div className="flex items-center gap-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.href}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <a
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium uppercase tracking-wide transition-all',
                          action.variant === 'primary'
                            ? 'text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        )}
                      >
                        {action.label[locale]}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </motion.div>
                  ))}
                </div>

                {/* Optional breadcrumb or additional info can go here */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                'fixed top-0 right-0 bottom-0 w-72 z-50 md:hidden',
                'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl',
                'border-l border-neutral-200/50 dark:border-neutral-800/50',
                'shadow-2xl overflow-y-auto'
              )}
            >
              {/* Close button area */}
              <div className="absolute top-4 right-4">
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800"
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              <div className="p-6 pt-20">
                {/* Logo in menu */}
                <div className="flex items-center gap-2 mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-serif text-lg font-bold text-neutral-800 dark:text-neutral-100">
                    {personalInfo.name}
                  </span>
                </div>

                {/* Primary Navigation */}
                <nav className="flex flex-col gap-2 mb-6">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2 px-4">
                    Navigation
                  </h3>
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={`/${locale}${item.href === '/' ? '' : item.href}`}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all',
                          isActive(item.href)
                            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        )}
                      >
                        <span
                          className={cn(
                            'w-2 h-2 rounded-full transition-colors',
                            isActive(item.href) ? 'bg-primary-500' : 'bg-neutral-300 dark:bg-neutral-600'
                          )}
                        />
                        {item.label[locale]}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Quick Actions Section */}
                {quickActions.length > 0 && (
                  <div className="mb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mb-4" />
                    <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 px-4">
                      Quick Actions
                    </h3>
                    <div className="flex flex-col gap-2">
                      {quickActions.map((action, index) => (
                        <motion.a
                          key={action.href}
                          href={action.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (navigationItems.length + index) * 0.1 }}
                          className={cn(
                            'flex items-center justify-between px-4 py-3 rounded-xl transition-all',
                            'text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-900/10',
                            'hover:bg-primary-50 dark:hover:bg-primary-900/20'
                          )}
                        >
                          <span className="text-sm font-medium">{action.label[locale]}</span>
                          <ExternalLink className="h-4 w-4" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Links Section */}
                <div>
                  <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mb-4" />
                  <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 px-4">
                    Connect
                  </h3>
                  <div className="flex items-center gap-2 px-4">
                    {socialLinks.map((social) => {
                      const Icon = iconMap[social.icon as keyof typeof iconMap];
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-all',
                            'text-neutral-600 dark:text-neutral-400',
                            'bg-neutral-100 dark:bg-neutral-800',
                            'hover:text-primary-600 dark:hover:text-primary-400',
                            'hover:bg-primary-50 dark:hover:bg-primary-900/20'
                          )}
                          aria-label={social.name}
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Decorative element */}
                <div className="absolute bottom-8 left-6 right-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent" />
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center mt-4">
                    {locale === 'pt-BR' ? 'Feito com' : 'Made with'} <span className="text-accent-500">❤</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
