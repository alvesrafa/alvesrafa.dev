'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { skillCategories } from '@/data/skills';
import type { Locale } from '@/types';

interface SkillsShowcaseProps {
  locale: Locale;
  dictionary: {
    title: string;
  };
}

export function SkillsShowcase({ locale, dictionary }: SkillsShowcaseProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="section-padding border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/10"
    >
      <div className="container-custom">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="label-mono mb-2">Expertise</p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
              {dictionary.title}
            </h2>
          </div>
          <Link
            href={`/${locale}/about`}
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
          >
            {locale === 'pt-BR' ? 'Ver mais' : 'See more'}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Skills — table-like rows */}
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {skillCategories.slice(0, 4).map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: catIndex * 0.07 }}
              className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3 sm:gap-8 py-5"
            >
              <div className="flex sm:items-center">
                <span className="label-mono">{category.name[locale]}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="tech-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: link to about */}
        <div className="mt-8 sm:hidden">
          <Link
            href={`/${locale}/about`}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
          >
            {locale === 'pt-BR' ? 'Ver mais' : 'See more'}
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
