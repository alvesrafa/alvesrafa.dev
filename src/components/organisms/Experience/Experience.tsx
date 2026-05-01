'use client';

import { motion } from 'framer-motion';
import { experiences, formatPeriod } from '@/data/experience';
import type { Locale } from '@/types';

interface ExperienceProps {
  locale: Locale;
  dictionary: {
    pathAnchor: string;
    pathTitle: string;
  };
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function Experience({ locale, dictionary }: ExperienceProps) {
  return (
    <section id="xp" className="home-section px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Anchor label */}
        <div
          className="inline-flex items-center gap-2 pb-8"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', color: '#71717a' }}
        >
          <span style={{ color: '#a3e635', fontWeight: 500 }}>//</span>
          {dictionary.pathAnchor}
        </div>

        <h2
          className="mb-12"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: '#fafafa',
          }}
        >
          {dictionary.pathTitle}
        </h2>

        {/* Experience rows */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
          {experiences.map((exp, i) => {
            const isCurrent = exp.period.end === null;
            const period = formatPeriod(exp.period.start, exp.period.end, locale);

            return (
              <div
                key={exp.id}
                className="grid gap-8 py-7"
                style={{
                  gridTemplateColumns: '120px 1fr',
                  borderTop: i === 0 ? undefined : '1px dashed #18181b',
                }}
              >
                {/* Date column */}
                <div
                  className="pt-1"
                  style={{ color: '#71717a', fontSize: '12px', letterSpacing: '0.08em' }}
                >
                  {period}
                </div>

                {/* Body column */}
                <div>
                  {/* Role + company */}
                  <h3
                    className="flex flex-wrap items-center gap-3 mb-1"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '22px',
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      color: '#fafafa',
                      margin: '0 0 4px',
                    }}
                  >
                    {exp.role[locale]}
                    <span style={{ color: '#71717a', fontWeight: 400, fontSize: '16px' }}>
                      <span style={{ color: '#a3e635', marginRight: 4 }}>@</span>
                      {exp.company}
                    </span>
                  </h3>

                  {/* Currently badge */}
                  {isCurrent && (
                    <div
                      className="inline-flex items-center gap-1.5 mb-2"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        letterSpacing: '0.1em',
                        color: '#a3e635',
                        textTransform: 'uppercase',
                      }}
                    >
                      <span
                        className="block w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse"
                        aria-hidden="true"
                      />
                      {locale === 'pt-BR' ? 'atualmente' : 'currently'}
                    </div>
                  )}

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '14px',
                      color: '#a1a1aa',
                      lineHeight: 1.65,
                      margin: '10px 0 12px',
                      maxWidth: 620,
                    }}
                  >
                    {exp.description[locale]}
                  </p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: '#a1a1aa',
                          padding: '3px 9px',
                          background: 'rgba(39,39,42,0.6)',
                          border: '1px solid #27272a',
                          borderRadius: 0,
                          textTransform: 'lowercase',
                        }}
                      >
                        {tech.toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
