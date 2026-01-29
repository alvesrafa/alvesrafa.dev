'use client';

import { createContext, useContext, useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { Locale } from '@/types';
import { i18nConfig } from '@/lib/i18n/config';

interface LocaleContextType {
  locale: Locale;
  switchLocale: (newLocale: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
  children: React.ReactNode;
  locale: Locale;
  dictionary: Record<string, unknown>;
}

export function LocaleProvider({
  children,
  locale,
  dictionary,
}: LocaleProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = useCallback(
    (newLocale: Locale) => {
      // Remove current locale from pathname
      const segments = pathname.split('/');
      const hasLocale = i18nConfig.locales.includes(segments[1] as Locale);
      const pathWithoutLocale = hasLocale
        ? '/' + segments.slice(2).join('/')
        : pathname;

      // Set cookie for persistence
      document.cookie = `${i18nConfig.localeCookie}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

      // Navigate to new locale
      const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
      router.push(newPath);
    },
    [pathname, router]
  );

  // Simple translation function
  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.');
      let value: unknown = dictionary;

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key; // Return key if translation not found
        }
      }

      return typeof value === 'string' ? value : key;
    },
    [dictionary]
  );

  const contextValue = useMemo(
    () => ({ locale, switchLocale, t }),
    [locale, switchLocale, t]
  );

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
