'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { personalInfo } from '@/data/navigation';
import type { Locale } from '@/types';

interface CTASectionProps {
  locale: Locale;
  dictionary: {
    title: string;
    subtitle: string;
    description: string;
    button: string;
  };
}

export function CTASection({ locale, dictionary }: CTASectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="section-padding border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="container-custom">
        <div className="max-w-3xl">

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="label-mono mb-8"
          >
            {locale === 'pt-BR' ? 'Vamos trabalhar juntos' : "Let's work together"}
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-neutral-900 dark:text-neutral-50 tracking-tight leading-[1.06] mb-8"
          >
            {dictionary.subtitle}
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            style={{ originX: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-px bg-neutral-200 dark:bg-neutral-800 mb-8"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed mb-10 max-w-xl"
          >
            {dictionary.description}
          </motion.p>

          {/* Email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <a
              href={`mailto:${personalInfo.email}`}
              className="group inline-flex items-center gap-2 text-base font-medium text-neutral-900 dark:text-neutral-50 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 border-b border-neutral-300 dark:border-neutral-700 hover:border-primary-400 dark:hover:border-primary-500 pb-0.5"
            >
              {personalInfo.email}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
