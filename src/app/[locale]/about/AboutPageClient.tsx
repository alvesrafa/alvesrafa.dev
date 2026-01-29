'use client';

import { Badge } from '@/components/atoms/Badge';
import { GlowCard } from '@/components/effects/GlowCard';
import { MagneticElement } from '@/components/effects/MagneticElement';
import { FadeInSection, ScaleInSection } from '@/components/effects/ParallaxSection';
import { TextReveal } from '@/components/effects/TextReveal';
import { cn } from '@/lib/utils/cn';
import type { Certification, Education, Experience, Locale, LocalizedString, SkillCategory } from '@/types';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Award, Briefcase, Code2, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { useRef } from 'react';

interface PersonalInfo {
  name: string;
  shortName: string;
  email: string;
  location: string;
  role: LocalizedString;
}

interface AboutPageClientProps {
  locale: Locale;
  dictionary: Record<string, any>;
  experiences: Experience[];
  skillCategories: SkillCategory[];
  education: Education[];
  certifications: Certification[];
  personalInfo: PersonalInfo;
}

const categoryColors: Record<string, string> = {
  frontend: 'from-blue-500 to-cyan-500',
  backend: 'from-green-500 to-emerald-500',
  database: 'from-orange-500 to-amber-500',
  mobile: 'from-purple-500 to-pink-500',
  devops: 'from-red-500 to-rose-500',
  design: 'from-indigo-500 to-violet-500',
};

export function AboutPageClient({
  locale,
  dictionary,
  experiences,
  skillCategories,
  education,
  certifications,
  personalInfo,
}: AboutPageClientProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-transparent to-transparent dark:from-primary-950/30" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container-custom py-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">
              {locale === 'pt-BR' ? 'Sobre mim' : 'About me'}
            </span>
          </motion.div>

          <TextReveal
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-100 mb-6"
            type="words"
            staggerDelay={0.05}
          >
            {dictionary.about.title}
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto"
          >
            {dictionary.about.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400"
          >
            <MapPin className="h-5 w-5 text-accent-500" />
            <span className="font-medium">{personalInfo.location}</span>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-primary-500/20 rounded-full animate-spin-slow" />
        <div className="absolute bottom-20 right-10 w-32 h-32 border border-accent-500/20 rounded-full animate-spin-slow animation-delay-500" />
      </section>

      {/* Introduction */}
      <section className="section-padding">
        <div className="container-custom">
          <FadeInSection>
            <div className="max-w-3xl mx-auto">
              <GlowCard className="p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="prose prose-lg prose-neutral dark:prose-invert max-w-none"
                >
                  <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 mb-6">
                    {dictionary.about.intro}
                  </p>
                  <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {dictionary.about.extended}
                  </p>
                </motion.div>
              </GlowCard>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section-padding bg-neutral-50/50 dark:bg-neutral-900/30 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]" />

        <div className="container-custom relative">
          <FadeInSection className="mb-12">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100">
                {dictionary.about.experience.title}
              </h2>
            </div>
          </FadeInSection>

          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                locale={locale}
                index={index}
                currentLabel={dictionary.about.experience.current}
                isLast={index === experiences.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-custom">
          <FadeInSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 mb-4">
              <Code2 className="w-4 h-4" />
              <span className="text-sm font-medium">Tech Stack</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100">
              {dictionary.about.skills.title}
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCard
                key={category.id}
                category={category}
                locale={locale}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="section-padding bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <FadeInSection className="mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    {dictionary.about.education.title}
                  </h2>
                </div>
              </FadeInSection>

              <div className="space-y-4">
                {education.map((edu, index) => (
                  <ScaleInSection key={edu.id}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GlowCard className="p-6">
                        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                          {edu.degree[locale]}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">
                          {edu.field[locale]}
                        </p>
                        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                          {edu.institution}
                        </p>
                        <p className="text-sm text-neutral-500 mt-1">
                          {edu.period.start} - {edu.period.end}
                        </p>
                        {edu.description && (
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">
                            {edu.description[locale]}
                          </p>
                        )}
                      </GlowCard>
                    </motion.div>
                  </ScaleInSection>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <FadeInSection className="mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    {dictionary.about.education.certifications}
                  </h2>
                </div>
              </FadeInSection>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <ScaleInSection key={cert.id}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GlowCard className="p-6" glowColor="rgba(232, 72, 85, 0.3)">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                              {cert.name}
                            </h3>
                            <p className="text-accent-600 dark:text-accent-400">
                              {cert.issuer}
                            </p>
                            <p className="text-sm text-neutral-500 mt-1">
                              {cert.issueDate} - {cert.expirationDate || (locale === 'pt-BR' ? 'Sem expiração' : 'No expiration')}
                            </p>
                            {cert.credentialUrl && (
                              <MagneticElement strength={0.1}>
                                <a
                                  href={cert.credentialUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 mt-3 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                                >
                                  {locale === 'pt-BR' ? 'Ver credencial' : 'View credential'}
                                  <ArrowRight className="w-4 h-4" />
                                </a>
                              </MagneticElement>
                            )}
                          </div>
                          <Badge variant="accent" size="md">
                            {locale === 'pt-BR' ? 'Certificado' : 'Certified'}
                          </Badge>
                        </div>
                      </GlowCard>
                    </motion.div>
                  </ScaleInSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ExperienceCard({
  experience,
  locale,
  index,
  currentLabel,
  isLast,
}: {
  experience: Experience;
  locale: Locale;
  index: number;
  currentLabel: string;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const isCurrentJob = experience.period.end === null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-8"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-3 top-10 bottom-0 w-px bg-gradient-to-b from-primary-500 to-transparent" />
      )}

      {/* Timeline dot */}
      <motion.div
        className={cn(
          'absolute left-0 top-2 w-6 h-6 rounded-full border-4 border-white dark:border-neutral-900',
          isCurrentJob
            ? 'bg-accent-500'
            : 'bg-primary-500'
        )}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
      >
        {isCurrentJob && (
          <span className="absolute inset-0 rounded-full bg-accent-500 animate-ping opacity-75" />
        )}
      </motion.div>

      <GlowCard className="p-6" glowColor={isCurrentJob ? 'rgba(232, 72, 85, 0.3)' : undefined}>
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
              {experience.role[locale]}
            </h3>
            <p className="text-primary-600 dark:text-primary-400 font-medium">
              {experience.company}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isCurrentJob && (
              <Badge variant="accent" size="sm">
                {currentLabel}
              </Badge>
            )}
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {experience.period.start} - {experience.period.end || currentLabel}
            </span>
          </div>
        </div>

        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          {experience.description[locale]}
        </p>

        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <MagneticElement key={tech} strength={0.1}>
              <motion.span
                className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-700/50"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            </MagneticElement>
          ))}
        </div>
      </GlowCard>
    </motion.div>
  );
}

function SkillCard({
  category,
  locale,
  index,
}: {
  category: SkillCategory;
  locale: Locale;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlowCard className="p-6 h-full">
        <div
          className={cn(
            'inline-flex p-3 rounded-xl bg-gradient-to-br mb-4',
            categoryColors[category.id] || 'from-primary-500 to-primary-600'
          )}
        >
          <Code2 className="w-6 h-6 text-white" />
        </div>

        <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
          {category.name[locale]}
        </h3>

        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, skillIndex) => (
            <MagneticElement key={skill} strength={0.1}>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + skillIndex * 0.03 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-3 py-1.5 text-sm font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-700/50 cursor-default"
              >
                {skill}
              </motion.span>
            </MagneticElement>
          ))}
        </div>
      </GlowCard>
    </motion.div>
  );
}
