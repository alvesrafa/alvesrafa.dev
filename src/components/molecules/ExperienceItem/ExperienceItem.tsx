'use client';

import { motion } from 'framer-motion';
import { Building2, MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge';
import { formatPeriod, calculateDuration } from '@/data/experience';
import { cn } from '@/lib/utils/cn';
import type { Experience, Locale } from '@/types';

interface ExperienceItemProps {
  experience: Experience;
  locale: Locale;
  isLast?: boolean;
  currentLabel: string;
}

export function ExperienceItem({
  experience,
  locale,
  isLast = false,
  currentLabel,
}: ExperienceItemProps) {
  const isCurrent = !experience.period.end;
  const period = formatPeriod(
    experience.period.start,
    experience.period.end,
    locale
  );
  const duration = calculateDuration(
    experience.period.start,
    experience.period.end,
    locale
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="relative pl-8 pb-8"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-700" />
      )}

      {/* Timeline dot */}
      <div
        className={cn(
          'absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center',
          isCurrent
            ? 'bg-primary-500 border-primary-500'
            : 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600'
        )}
      >
        {isCurrent && (
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
              {experience.role[locale]}
            </h3>
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <Building2 className="h-4 w-4" />
              {experience.companyUrl ? (
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {experience.company}
                </a>
              ) : (
                <span>{experience.company}</span>
              )}
            </div>
          </div>

          {isCurrent && (
            <Badge variant="primary" size="md">
              {currentLabel}
            </Badge>
          )}
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{period}</span>
            <span className="text-neutral-400 dark:text-neutral-500">
              ({duration})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span>{experience.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {experience.description[locale]}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 pt-2">
          {experience.technologies.map((tech) => (
            <Badge key={tech} variant="outline" size="sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
