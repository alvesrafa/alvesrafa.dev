'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2, Database, Globe, Palette, Server, Smartphone } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { FadeInSection, ScaleInSection } from '@/components/effects/ParallaxSection';
import { TextReveal } from '@/components/effects/TextReveal';
import { GlowCard } from '@/components/effects/GlowCard';
import { MagneticElement } from '@/components/effects/MagneticElement';
import { skillCategories } from '@/data/skills';
import { cn } from '@/lib/utils/cn';
import type { Locale } from '@/types';

interface SkillsShowcaseProps {
  locale: Locale;
  dictionary: {
    title: string;
  };
}

const categoryIcons: Record<string, React.ReactNode> = {
  frontend: <Globe className="w-6 h-6" />,
  backend: <Server className="w-6 h-6" />,
  database: <Database className="w-6 h-6" />,
  mobile: <Smartphone className="w-6 h-6" />,
  devops: <Code2 className="w-6 h-6" />,
  design: <Palette className="w-6 h-6" />,
};

const categoryColors: Record<string, string> = {
  frontend: 'from-blue-500 to-cyan-500',
  backend: 'from-green-500 to-emerald-500',
  database: 'from-orange-500 to-amber-500',
  mobile: 'from-purple-500 to-pink-500',
  devops: 'from-red-500 to-rose-500',
  design: 'from-indigo-500 to-violet-500',
};

export function SkillsShowcase({ locale, dictionary }: SkillsShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2"
          style={{ rotate: backgroundRotate }}
        >
          <div className="w-full h-full border border-primary-500/10 rounded-full" />
          <div className="absolute inset-8 border border-primary-500/10 rounded-full" />
          <div className="absolute inset-16 border border-primary-500/10 rounded-full" />
          <div className="absolute inset-24 border border-accent-500/10 rounded-full" />
        </motion.div>
      </div>

      <div className="container-custom">
        {/* Section header */}
        <FadeInSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300">
              Expertise
            </span>
          </motion.div>
          <TextReveal
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-4"
            type="words"
          >
            {dictionary.title}
          </TextReveal>
        </FadeInSection>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {skillCategories.slice(0, 4).map((category, index) => (
            <ScaleInSection key={category.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <GlowCard
                  className={cn(
                    'p-6 h-full transition-all duration-300',
                    activeCategory === category.id && 'scale-[1.02]'
                  )}
                  glowColor={
                    activeCategory === category.id
                      ? 'rgba(232, 72, 85, 0.3)'
                      : 'rgba(78, 128, 152, 0.3)'
                  }
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={cn(
                        'p-3 rounded-xl bg-gradient-to-br',
                        categoryColors[category.id] || 'from-primary-500 to-primary-600',
                        'text-white'
                      )}
                    >
                      {categoryIcons[category.id] || <Code2 className="w-6 h-6" />}
                    </div>
                    <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                      {category.name[locale]}
                    </h3>
                  </div>

                  {/* Skills list */}
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence mode="popLayout">
                      {category.skills.map((skill, skillIndex) => (
                        <MagneticElement key={skill} strength={0.1}>
                          <motion.span
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{
                              duration: 0.3,
                              delay: activeCategory === category.id ? skillIndex * 0.02 : 0,
                            }}
                            className={cn(
                              'px-3 py-1.5 rounded-full text-sm font-medium',
                              'bg-neutral-100 dark:bg-neutral-800',
                              'text-neutral-700 dark:text-neutral-300',
                              'border border-neutral-200/50 dark:border-neutral-700/50',
                              'hover:bg-primary-100 hover:text-primary-700',
                              'dark:hover:bg-primary-900/30 dark:hover:text-primary-300',
                              'transition-all duration-200 cursor-default'
                            )}
                            whileHover={{
                              scale: 1.05,
                              y: -2,
                            }}
                          >
                            {skill}
                          </motion.span>
                        </MagneticElement>
                      ))}
                    </AnimatePresence>
                  </div>
                </GlowCard>
              </motion.div>
            </ScaleInSection>
          ))}
        </div>

        {/* View all button */}
        <FadeInSection className="text-center">
          <Button
            href={`/${locale}/about`}
            variant="outline"
            size="lg"
            rightIcon={<ArrowRight className="h-5 w-5" />}
            className="group"
          >
            <span className="relative">
              {locale === 'pt-BR' ? 'Saiba mais sobre mim' : 'Learn more about me'}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300" />
            </span>
          </Button>
        </FadeInSection>
      </div>
    </section>
  );
}
