'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useLocale } from '@/context/LocaleContext';
import { cn } from '@/lib/utils/cn';
import type { Locale } from '@/types';

interface RailNavProps {
  locale: Locale;
}

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'Path', href: '#xp' },
  { label: 'Contact', href: '#contact' },
] as const;

const SECTION_IDS = ['work', 'stack', 'xp', 'contact'];

export function RailNav({ locale }: RailNavProps) {
  const { isDark, toggleTheme, mounted } = useTheme();
  const { locale: currentLocale, switchLocale } = useLocale();
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleLangToggle = () => {
    switchLocale(currentLocale === 'en' ? 'pt-BR' : 'en');
  };

  return (
    <aside
      className="hidden md:flex fixed inset-y-0 left-0 z-40 w-[80px] flex-col items-center py-6"
      style={{ borderRight: '1px solid #18181b', background: '#09090b' }}
      aria-label="Site navigation rail"
    >
      {/* Mark */}
      <Link
        href={`/${locale}`}
        className="flex items-center justify-center w-10 h-10 rounded-[8px] font-mono text-[13px] tracking-[0.12em] text-neutral-50 transition-colors duration-200 hover:text-primary-400"
        style={{ border: '1px solid #27272a' }}
        aria-label="Rafael Alves — home"
      >
        RA
      </Link>

      {/* Vertical spacer */}
      <div className="flex-1 w-px my-5" style={{ background: '#18181b' }} aria-hidden="true" />

      {/* Vertical nav */}
      <nav className="flex flex-col items-center gap-0" aria-label="Page sections">
        {NAV_ITEMS.map(({ label, href }) => {
          const sectionId = href.replace('#', '');
          const isActive = activeSection === sectionId;

          return (
            <a
              key={href}
              href={href}
              className={cn(
                'font-mono text-[10px] tracking-[0.18em] uppercase transition-colors duration-200',
                'py-[14px] px-[6px]',
                isActive
                  ? 'text-primary-400'
                  : 'text-neutral-500 hover:text-neutral-50'
              )}
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {label}
            </a>
          );
        })}
      </nav>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 mt-5">
        {mounted && (
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-[6px] text-neutral-500 hover:text-neutral-50 transition-colors duration-200"
            style={{ border: '1px solid #27272a' }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        )}

        <button
          onClick={handleLangToggle}
          className="flex items-center justify-center w-8 h-8 rounded-[6px] font-mono text-[10px] font-medium text-neutral-500 hover:text-neutral-50 transition-colors duration-200"
          style={{ border: '1px solid #27272a' }}
          aria-label="Switch language"
        >
          {currentLocale === 'en' ? 'EN' : 'PT'}
        </button>
      </div>
    </aside>
  );
}
