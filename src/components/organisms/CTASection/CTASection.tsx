'use client';

import { Button } from '@/components/atoms/Button';
import { MagneticElement } from '@/components/effects/MagneticElement';
import { TextReveal } from '@/components/effects/TextReveal';
import type { Locale } from '@/types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';

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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 dark:from-primary-900 dark:via-primary-800 dark:to-neutral-950" />

        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Decorative sparkle */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent-300" />
            <span className="text-sm font-medium text-white/90">
              {locale === 'pt-BR' ? 'Vamos trabalhar juntos' : "Let's work together"}
            </span>
          </motion.div>

          {/* Title */}
          <TextReveal
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-100 mb-6"
            type="words"
            staggerDelay={0.05}
          >
            {dictionary.subtitle}
          </TextReveal>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-primary-100 mb-10 leading-relaxed"
          >
            {dictionary.description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MagneticElement strength={0.2}>
              <Button
                href={`/${locale}/contact`}
                variant="secondary"
                size="lg"
                rightIcon={<ArrowRight className="h-5 w-5" />}
                className="relative overflow-hidden group bg-white text-primary-700 hover:bg-white/90"
              >
                <span className="relative z-10">{dictionary.title}</span>

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </Button>
            </MagneticElement>
          </motion.div>

          {/* Decorative floating elements */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
          <div className="absolute top-20 right-20 w-3 h-3 bg-primary-300 rounded-full animate-pulse animation-delay-300" />
          <div className="absolute bottom-20 left-20 w-2 h-2 bg-white/50 rounded-full animate-pulse animation-delay-500" />
          <div className="absolute bottom-10 right-10 w-4 h-4 bg-accent-300/50 rounded-full animate-pulse animation-delay-700" />
        </div>
      </div>
    </section>
  );
}
