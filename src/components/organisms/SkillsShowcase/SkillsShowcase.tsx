'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Locale } from '@/types';

interface SkillsShowcaseProps {
  locale: Locale;
  dictionary: {
    stackAnchor: string;
    stackTitle: string;
  };
}

const GROUPS = [
  { id: '01', label: 'Frontend', skills: ['TypeScript', 'React', 'Next.js', 'React Native', 'Expo', 'Tailwind', 'Zustand'] },
  { id: '02', label: 'Backend', skills: ['Node.js', 'NestJS', 'Express', 'Go', 'PHP · Laravel', 'REST · GraphQL', 'Vitest · Jest', 'PHPUnit'] },
  { id: '03', label: 'Data', skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma', 'TypeORM', 'Kafka · RabbitMQ'] },
  { id: '04', label: 'Cloud', skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Vercel', 'GitHub Actions', 'CI/CD', 'Nginx'] },
  { id: '05', label: 'Architecture', skills: ['Clean Architecture', 'DDD', 'SOLID', 'Design Patterns', 'TDD', 'Microservices', 'Event-Driven'] },
];

export function SkillsShowcase({ locale, dictionary }: SkillsShowcaseProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <section id="stack" className="home-section px-6 md:px-12">
        {/* Anchor label */}
        <div
          className="inline-flex items-center gap-2 pb-8"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: '#71717a',
          }}
        >
          <span style={{ color: '#a3e635', fontWeight: 500 }}>//</span>
          {dictionary.stackAnchor}
        </div>

        {/* Heading */}
        <h2
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: '#fafafa',
            marginBottom: '48px',
          }}
        >
          {dictionary.stackTitle}
        </h2>

        {/* Two-column grid */}
        <div className="stack-grid grid">
          {GROUPS.map(({ id, label, skills }, groupIdx) => (
            <React.Fragment key={id}>
              {/* Label cell */}
              <div
                style={{
                  padding: '24px 0',
                  borderTop: groupIdx === 0 ? undefined : '1px solid #18181b',
                }}
              >
                <span
                  style={{
                    color: '#a3e635',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    marginRight: 8,
                  }}
                >
                  {id}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#71717a',
                  }}
                >
                  {label}
                </span>
              </div>

              {/* Chips cell */}
              <div
                style={{
                  padding: '24px 0',
                  borderTop: groupIdx === 0 ? undefined : '1px solid #18181b',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 10,
                  alignItems: 'flex-start',
                  alignContent: 'flex-start',
                }}
              >
                {skills.map((skill) => (
                  <span
                    key={skill}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="inline-flex items-center gap-2 rounded-full transition-all duration-200 cursor-default"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 14,
                      padding: '6px 14px',
                      color: hoveredSkill === skill ? '#a3e635' : '#e4e4e7',
                      border: `1px solid ${hoveredSkill === skill ? '#a3e635' : '#27272a'}`,
                      background: hoveredSkill === skill ? 'rgba(26,46,5,0.3)' : 'rgba(24,24,27,0.8)',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        borderRadius: 9999,
                        width: 5,
                        height: 5,
                        background: hoveredSkill === skill ? '#a3e635' : '#52525b',
                        flexShrink: 0,
                      }}
                    />
                    {skill}
                  </span>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
