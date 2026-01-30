'use client';

import { Button } from '@/components/atoms/Button';
import { MagneticElement } from '@/components/effects/MagneticElement';
import { TextReveal, TypewriterText } from '@/components/effects/TextReveal';
import { SocialLinks } from '@/components/molecules/SocialLinks';
import { highlightSkills } from '@/data/skills';
import { cn } from '@/lib/utils/cn';
import type { Locale } from '@/types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Suspense, useRef } from 'react';

// Dynamically import 3D scene to avoid SSR issues
const Scene3D = dynamic(
  () => import('@/components/3d/Scene3D').then((mod) => ({ default: mod.Scene3D })),
  { ssr: false }
);

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

function LoadingFallback() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-accent-900/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse animation-delay-500" />
    </div>
  );
}

export function HeroSection({ locale, dictionary }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background Scene */}
      <Suspense fallback={<LoadingFallback />}>
        <Scene3D />
      </Suspense>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-50/50 to-neutral-50 dark:via-neutral-950/50 dark:to-neutral-950 pointer-events-none" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div style={{ y, opacity, scale }} className="container-custom py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Greeting with sparkle */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-6">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="h-5 w-5 text-accent-500" />
            </motion.div>
            <TypewriterText
              className="text-lg md:text-xl text-primary-600 dark:text-primary-400 font-medium"
              delay={0.5}
              speed={0.08}
            >
              {dictionary.greeting}
            </TypewriterText>
          </motion.div>

          {/* Name with reveal effect */}
          <motion.div variants={itemVariants}>
            <TextReveal
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-neutral-800 dark:text-neutral-100 mb-6"
              type="words"
              staggerDelay={0.02}
            >
              {dictionary.name}
            </TextReveal>
          </motion.div>

          {/* Role with gradient */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold mb-8"
          >
            <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {dictionary.role}
            </span>
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {dictionary.tagline}
          </motion.p>

          {/* Skills with hover effects */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
            {highlightSkills.map((skill, index) => (
              <MagneticElement key={skill} strength={0.2}>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 1 + index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: Math.random() > 0.5 ? 3 : -3,
                  }}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium cursor-default',
                    'bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm',
                    'text-neutral-700 dark:text-neutral-200',
                    'border border-neutral-200/50 dark:border-neutral-700/50',
                    'shadow-lg shadow-primary-500/5',
                    'hover:border-primary-500/50 hover:shadow-primary-500/20',
                    'transition-all duration-300'
                  )}
                >
                  {skill}
                </motion.span>
              </MagneticElement>
            ))}
          </motion.div>

          {/* CTAs with magnetic effect */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <MagneticElement strength={0.15}>
              <Button
                href={`/${locale}/projects`}
                size="lg"
                rightIcon={<ArrowRight className="h-5 w-5" />}
                className="relative overflow-hidden group"
                data-cursor-text="View"
              >
                <span className="relative z-10">{dictionary.cta.projects}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </MagneticElement>
            <MagneticElement strength={0.15}>
              <Button
                href={`/${locale}/contact`}
                variant="outline"
                size="lg"
                className="backdrop-blur-sm"
                data-cursor-text="Contact"
              >
                {dictionary.cta.contact}
              </Button>
            </MagneticElement>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants}>
            <SocialLinks size="lg" variant="outline" className="justify-center" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 inset-x-0 flex justify-center"
        >

          <motion.div
            className="w-6 h-10 rounded-full border-2 border-neutral-300 dark:border-neutral-600 flex items-start justify-center p-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary-500"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary-500/20 rounded-full animate-spin-slow" />
      <div className="absolute bottom-40 right-10 w-32 h-32 border border-accent-500/20 rounded-full animate-spin-slow animation-delay-500" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-accent-500 rounded-full animate-pulse animation-delay-300" />
    </section>
  );
}
