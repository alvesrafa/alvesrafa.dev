'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import Link from 'next/link';
import type { Locale } from '@/types';

interface HeroSectionProps {
  locale: Locale;
  dictionary: {
    availability: string;
    ctaPrimary: string;
    metaYears: string;
    metaDeploys: string;
    metaTeam: string;
    metaCertified: string;
  };
  statusBarDictionary: {
    available: string;
    role: string;
    location: string;
    timezone: string;
  };
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function HeroSection({ dictionary, statusBarDictionary }: HeroSectionProps) {
  return (
    <>
      {/* ── Status Bar ── */}
      <div
        className="sticky top-14 md:top-0 z-30 px-6 md:px-12 py-[10px] flex items-center justify-between"
        style={{
          background: 'rgba(9,9,11,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid #18181b',
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Availability pill */}
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
            style={{
              border: '1px solid rgba(163,230,53,0.35)',
              background: 'rgba(163,230,53,0.08)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: '#a3e635',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#a3e635',
                flexShrink: 0,
              }}
            />
            {statusBarDictionary.available}
          </span>

          {/* Role — hidden below 900px */}
          <span
            className="[@media(min-width:900px)]:inline-block hidden"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: '#71717a',
            }}
          >
            {statusBarDictionary.role}
          </span>
        </div>

        {/* Right — hidden on mobile */}
        <div
          className="hidden sm:flex items-center gap-3"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: '#71717a',
          }}
        >
          <span>{statusBarDictionary.location}</span>
          <span style={{ color: '#3f3f46' }}>·</span>
          <span>{statusBarDictionary.timezone}</span>
        </div>
      </div>

      {/* ── Hero Content ── */}
      <section className="px-6 md:px-12 pt-20 pb-24">
        {/* Two-column grid — single col on mobile, 1.3fr 1fr on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-16 items-start">
          {/* Left column */}
          <div>
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1"
                style={{
                  border: '1px solid rgba(163,230,53,0.3)',
                  background: 'rgba(163,230,53,0.06)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: '#a3e635',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#a3e635',
                  }}
                />
                {dictionary.availability}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.07, ease }}
              style={{
                fontSize: 'clamp(72px, 11vw, 168px)',
                fontWeight: 700,
                lineHeight: 0.82,
                letterSpacing: '-0.045em',
                color: '#fafafa',
                marginTop: '0.6em',
              }}
            >
              <span className="block">Rafael</span>
              <span className="block relative" style={{ paddingLeft: '0.22em' }}>
                {/* Horizontal lime accent dash */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '0.18em',
                    height: '0.06em',
                    background: '#a3e635',
                    borderRadius: 2,
                  }}
                />
                <em className="not-italic" style={{ color: '#a3e635' }}>
                  Alves
                </em>
              </span>
            </motion.h1>

            {/* Role chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="flex flex-wrap gap-1.5 mt-8"
            >
              {[
                { label: 'tech lead', accent: true },
                { label: 'full-stack engineer', accent: false },
                { label: 'software architect', accent: false },
                { label: 'typescript · aws', accent: false },
              ].map((chip) => (
                <span
                  key={chip.label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderRadius: 9999,
                    paddingInline: '0.75rem',
                    paddingBlock: '0.3rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    border: chip.accent
                      ? '1px solid rgba(163,230,53,0.4)'
                      : '1px solid #27272a',
                    background: chip.accent
                      ? 'rgba(163,230,53,0.1)'
                      : 'rgba(39,39,42,0.5)',
                    color: chip.accent ? '#a3e635' : '#71717a',
                  }}
                >
                  {chip.label}
                </span>
              ))}
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease }}
              className="flex flex-wrap gap-3 mt-10"
            >
              {/* Primary CTA */}
              <Link
                href="#work"
                className="group inline-flex items-center gap-2"
                style={{
                  borderRadius: 9999,
                  paddingInline: '1.25rem',
                  paddingBlock: '0.65rem',
                  background: '#a3e635',
                  color: '#09090b',
                  fontWeight: 600,
                  fontSize: '13px',
                  letterSpacing: '0.02em',
                  transition: 'background 0.2s',
                  textDecoration: 'none',
                }}
              >
                {dictionary.ctaPrimary}
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              {/* Ghost CTA */}
              <a
                href="mailto:alvesrafa.dev@gmail.com"
                className="group inline-flex items-center gap-2"
                style={{
                  borderRadius: 9999,
                  paddingInline: '1.25rem',
                  paddingBlock: '0.65rem',
                  border: '1px solid #27272a',
                  background: 'transparent',
                  color: '#a1a1aa',
                  fontSize: '13px',
                  letterSpacing: '0.02em',
                  transition: 'border-color 0.2s, color 0.2s',
                  textDecoration: 'none',
                }}
              >
                <Mail size={14} />
                alvesrafa.dev@gmail.com
              </a>
            </motion.div>
          </div>

          {/* Right column — terminal card, hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="hidden md:block"
          >
            <div
              style={{
                background: '#0b0b0d',
                border: '1px solid #27272a',
                borderRadius: 14,
                overflow: 'hidden',
              }}
            >
              {/* Terminal header strip */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 14px',
                  borderBottom: '1px solid #1c1c1f',
                  background: '#111113',
                }}
              >
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#52525b',
                    marginLeft: 8,
                    letterSpacing: '0.04em',
                  }}
                >
                  ~/rafael — zsh
                </span>
              </div>

              {/* Terminal body */}
              <div
                style={{
                  padding: '18px 20px 22px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  lineHeight: 1.8,
                }}
              >
                {/* whoami */}
                <p>
                  <span style={{ color: '#a3e635' }}>$</span>{' '}
                  <span style={{ color: '#fafafa' }}>whoami</span>
                </p>
                <p style={{ color: '#a1a1aa' }}>→ rafael_alves</p>
                <p>&nbsp;</p>

                {/* cat stack.yml */}
                <p>
                  <span style={{ color: '#a3e635' }}>$</span>{' '}
                  <span style={{ color: '#fafafa' }}>cat stack.yml</span>
                </p>
                <p>
                  <span style={{ color: '#bef264' }}>frontend</span>
                  <span style={{ color: '#71717a' }}>:</span>{' '}
                  <span style={{ color: '#a1a1aa' }}>[react, next, react_native]</span>
                </p>
                <p>
                  <span style={{ color: '#bef264' }}>backend</span>
                  <span style={{ color: '#71717a' }}>:</span>
                  {'  '}
                  <span style={{ color: '#a1a1aa' }}>[node, nest, laravel, go]</span>
                </p>
                <p>
                  <span style={{ color: '#bef264' }}>cloud</span>
                  <span style={{ color: '#71717a' }}>:</span>
                  {'    '}
                  <span style={{ color: '#a1a1aa' }}>[aws, azure, docker, k8s]</span>
                </p>
                <p>
                  <span style={{ color: '#bef264' }}>db</span>
                  <span style={{ color: '#71717a' }}>:</span>
                  {'       '}
                  <span style={{ color: '#a1a1aa' }}>[postgres, mongo, redis]</span>
                </p>
                <p>&nbsp;</p>

                {/* now */}
                <p>
                  <span style={{ color: '#a3e635' }}>$</span>{' '}
                  <span style={{ color: '#fafafa' }}>now</span>
                </p>
                <p style={{ color: '#a1a1aa' }}>building convide.site + mentoring</p>
                <p>&nbsp;</p>

                {/* comment */}
                <p style={{ color: '#52525b' }}># currently shipping from a small island</p>

                {/* prompt + caret */}
                <p>
                  <span style={{ color: '#a3e635' }}>$</span>{' '}
                  <span className="term-caret" aria-hidden="true" />
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Meta Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4"
          style={{
            borderTop: '1px solid #18181b',
            borderBottom: '1px solid #18181b',
          }}
        >
          {[
            {
              label: dictionary.metaYears,
              value: '05',
              unit: '+',
              big: true,
            },
            {
              label: dictionary.metaDeploys,
              value: '∞',
              unit: '',
              big: true,
            },
            {
              label: dictionary.metaTeam,
              value: 'Luby Software',
              unit: '',
              big: false,
            },
            {
              label: dictionary.metaCertified,
              value: 'Cloud Practitioner',
              unit: '',
              big: false,
            },
          ].map((cell, i, arr) => (
            <div
              key={cell.label}
              className="px-6 py-5"
              style={{
                borderRight: i < arr.length - 1 ? '1px solid #18181b' : undefined,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#71717a',
                  marginBottom: 6,
                }}
              >
                {cell.label}
              </p>
              <p
                style={{
                  color: '#fafafa',
                  fontWeight: cell.big ? 700 : 400,
                  fontSize: cell.big ? 28 : 14,
                  lineHeight: 1.1,
                }}
              >
                {cell.value}
                {cell.unit && (
                  <span style={{ fontSize: 16, fontWeight: 400, color: '#71717a', marginLeft: 2 }}>
                    {cell.unit}
                  </span>
                )}
              </p>
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
