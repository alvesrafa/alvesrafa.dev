'use client';

import { ScrollProgress } from '@/components/effects/ScrollProgress';
import { SmoothScrollProvider } from '@/components/effects/SmoothScroll';
import { LocaleProvider } from '@/context/LocaleContext';
import { ThemeProvider } from '@/context/ThemeProvider';
import type { Locale } from '@/types';
import dynamic from 'next/dynamic';

// Dynamically import CustomCursor to avoid SSR issues
const CustomCursor = dynamic(
  () => import('@/components/effects/CustomCursor').then((mod) => ({ default: mod.CustomCursor })),
  { ssr: false }
);

interface ProvidersProps {
  children: React.ReactNode;
  locale: Locale;
  dictionary: Record<string, unknown>;
}

export function Providers({ children, locale, dictionary }: ProvidersProps) {
  return (
    <ThemeProvider>
      <LocaleProvider locale={locale} dictionary={dictionary}>
        <SmoothScrollProvider>
          <ScrollProgress />
          {/* <CustomCursor /> */}
          {children}
        </SmoothScrollProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
