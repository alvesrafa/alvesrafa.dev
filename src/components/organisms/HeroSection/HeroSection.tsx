'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Locale } from '@/types';

interface HeroSectionProps {
  locale: Locale;
  dictionary: {
    greeting: string;
    name: string;
    role: string;
    tagline: string;
    cta: {
      projects: string;
      contact: string;
    };
    scroll: string;
  };
}

export function HeroSection({ locale, dictionary }: HeroSectionProps) {
  const metaItems = [
    {
      label: locale === 'pt-BR' ? 'Base' : 'Based',
      value: 'Ilhabela, SP — Brazil',
    },
    {
      label: locale === 'pt-BR' ? 'Empresa' : 'Company',
      value: 'Luby Software',
    },
    {
      label: locale === 'pt-BR' ? 'Cargo' : 'Role',
      value: 'Tech Lead',
    },
    {
      label: locale === 'pt-BR' ? 'Experiência' : 'Experience',
      value: locale === 'pt-BR' ? '5+ anos' : '5+ years',
    },
  ];

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 -z-10 text-neutral-900 dark:text-neutral-100 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]"
        aria-hidden="true"
      />

      <div className="container-custom py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 lg:gap-20 items-end">

          {/* Left: Main typography */}
          <div>
            {/* Role label */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="label-mono mb-8"
            >
              Tech Lead · Full Stack · Architect
            </motion.p>

            {/* Name — the centerpiece */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[clamp(56px,9vw,116px)] font-bold leading-[0.88] tracking-[-0.03em] text-neutral-900 dark:text-neutral-50 mb-10"
            >
              Rafael
              <br />
              <span className="text-primary-400">Alves.</span>
            </motion.h1>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ originX: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-10"
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="text-lg text-neutral-500 dark:text-neutral-400 max-w-lg leading-relaxed mb-12"
            >
              {dictionary.tagline}
            </motion.p>

            {/* CTAs — text-link style, no buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.52 }}
              className="flex items-center gap-8 flex-wrap"
            >
              <Link
                href={`/${locale}/projects`}
                className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-neutral-50 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
              >
                {dictionary.cta.projects}
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-200 border-b border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-50 pb-px"
              >
                {dictionary.cta.contact}
              </Link>
            </motion.div>
          </div>

          {/* Right: Meta sidebar */}
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="lg:pb-1"
          >
            <dl className="space-y-6">
              {metaItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.52 + i * 0.07 }}
                >
                  <dt className="label-mono mb-1.5">{item.label}</dt>
                  <dd className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                    {item.value}
                  </dd>
                </motion.div>
              ))}
            </dl>

            {/* Availability indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.92 }}
              className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-400" />
                </span>
                <span className="font-mono text-[11px] text-primary-600 dark:text-primary-400 tracking-wide">
                  {locale === 'pt-BR'
                    ? 'Aberto a novas oportunidades'
                    : 'Open to new opportunities'}
                </span>
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-neutral-400 to-transparent dark:from-neutral-600"
        />
      </motion.div>
    </section>
  );
}
