import type { Locale } from '@/types';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  'pt-BR': () => import('@/dictionaries/pt-BR.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
