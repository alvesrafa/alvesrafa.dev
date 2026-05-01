'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Locale } from '@/types';

interface CTASectionProps {
  locale: Locale;
  dictionary: {
    contactAnchor: string;
    contactHeading: string;
    replyTime: string;
    contractAvailability: string;
  };
}

export function CTASection({ locale, dictionary }: CTASectionProps) {
  const [emailHovered, setEmailHovered] = useState(false);
  const [githubHovered, setGithubHovered] = useState(false);
  const [linkedinHovered, setLinkedinHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <section id="contact" className="home-section px-6 md:px-12">
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
          {dictionary.contactAnchor}
        </div>

        {/* Main flex row */}
        <div className="flex items-end justify-between gap-8 flex-wrap">
          {/* Left: Heading */}
          <h2
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              margin: 0,
              color: '#fafafa',
            }}
          >
            {dictionary.contactHeading}{' '}
            <span style={{ color: '#a3e635' }}>→</span>
          </h2>

          {/* Right: Contact info */}
          <div
            style={{
              minWidth: '260px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#a1a1aa',
              lineHeight: 1.7,
            }}
          >
            <p style={{ margin: 0, marginBottom: '0.5em' }}>
              {dictionary.replyTime}
            </p>
            <p style={{ margin: 0, marginBottom: '0.5em' }}>
              {dictionary.contractAvailability}
            </p>
            <br />
            <div className="flex flex-col gap-1">
              {/* Email link */}
              <a
                href="mailto:alvesrafa.dev@gmail.com"
                style={{
                  color: emailHovered ? '#a3e635' : '#fafafa',
                  borderBottom: `1px solid ${emailHovered ? '#a3e635' : '#3f3f46'}`,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease, border-bottom-color 0.2s ease',
                }}
                onMouseEnter={() => setEmailHovered(true)}
                onMouseLeave={() => setEmailHovered(false)}
              >
                alvesrafa.dev@gmail.com
              </a>

              {/* GitHub link */}
              <a
                href="https://github.com/alvesrafa"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: githubHovered ? '#a3e635' : '#fafafa',
                  borderBottom: `1px solid ${githubHovered ? '#a3e635' : '#3f3f46'}`,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease, border-bottom-color 0.2s ease',
                }}
                onMouseEnter={() => setGithubHovered(true)}
                onMouseLeave={() => setGithubHovered(false)}
              >
                github.com/alvesrafa
              </a>

              {/* LinkedIn link */}
              <a
                href="https://linkedin.com/in/alvrafael"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: linkedinHovered ? '#a3e635' : '#fafafa',
                  borderBottom: `1px solid ${linkedinHovered ? '#a3e635' : '#3f3f46'}`,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease, border-bottom-color 0.2s ease',
                }}
                onMouseEnter={() => setLinkedinHovered(true)}
                onMouseLeave={() => setLinkedinHovered(false)}
              >
                linkedin.com/in/alvrafael
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
