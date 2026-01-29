'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { localeNames, i18nConfig } from '@/lib/i18n/config';
import { cn } from '@/lib/utils/cn';
import type { Locale } from '@/types';

interface LanguageSwitchProps {
  className?: string;
  label?: string;
}

export function LanguageSwitch({ className, label }: LanguageSwitchProps) {
  const { locale, switchLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSelect = (newLocale: Locale) => {
    if (newLocale !== locale) {
      switchLocale(newLocale);
    }
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg',
          'bg-neutral-100 dark:bg-neutral-800',
          'hover:bg-neutral-200 dark:hover:bg-neutral-700',
          'transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
        )}
        aria-label={label || 'Switch language'}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Globe className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {locale.toUpperCase().replace('-', '')}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-neutral-500 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute right-0 mt-2 w-40 py-1 z-50',
              'bg-white dark:bg-neutral-800',
              'border border-neutral-200 dark:border-neutral-700',
              'rounded-lg shadow-lg'
            )}
            role="listbox"
            aria-label="Language options"
          >
            {i18nConfig.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleSelect(loc)}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-2 text-left',
                  'text-sm text-neutral-700 dark:text-neutral-300',
                  'hover:bg-neutral-100 dark:hover:bg-neutral-700',
                  'transition-colors duration-150',
                  locale === loc && 'bg-primary-50 dark:bg-primary-900/20'
                )}
                role="option"
                aria-selected={locale === loc}
              >
                <span>{localeNames[loc]}</span>
                {locale === loc && (
                  <Check className="h-4 w-4 text-primary-500" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
