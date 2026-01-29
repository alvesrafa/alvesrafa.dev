import type { Locale } from '@/types';

export const i18nConfig = {
  defaultLocale: 'en' as Locale,
  locales: ['en', 'pt-BR'] as const,
  localeDetection: true,
  localeCookie: 'NEXT_LOCALE',
} as const;

export const localeNames: Record<Locale, string> = {
  en: 'English',
  'pt-BR': 'Português',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  'pt-BR': '🇧🇷',
};

export function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale);
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}
