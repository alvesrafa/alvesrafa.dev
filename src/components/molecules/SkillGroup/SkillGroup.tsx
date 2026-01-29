'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/atoms/Badge';
import { cn } from '@/lib/utils/cn';
import type { SkillCategory, Locale } from '@/types';
import { highlightSkills } from '@/data/skills';

interface SkillGroupProps {
  category: SkillCategory;
  locale: Locale;
  className?: string;
}

export function SkillGroup({ category, locale, className }: SkillGroupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className={cn(
        'p-5 rounded-xl',
        'bg-white dark:bg-neutral-900',
        'border border-neutral-200 dark:border-neutral-800',
        className
      )}
    >
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
        {category.name[locale]}
      </h3>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, index) => {
          const isHighlight = highlightSkills.includes(skill);
          return (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              <Badge
                variant={isHighlight ? 'primary' : 'default'}
                size="md"
                className={cn(
                  'transition-all duration-200',
                  'hover:scale-105',
                  isHighlight && 'ring-1 ring-primary-300 dark:ring-primary-700'
                )}
              >
                {skill}
              </Badge>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
