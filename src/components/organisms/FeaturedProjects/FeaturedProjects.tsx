'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, ExternalLink, Github, Star, GitFork } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { GlowCard } from '@/components/effects/GlowCard';
import { FadeInSection } from '@/components/effects/ParallaxSection';
import { TextReveal } from '@/components/effects/TextReveal';
import { cn } from '@/lib/utils/cn';
import type { Locale } from '@/types';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

interface FeaturedProjectsProps {
  repos: Repository[];
  locale: Locale;
  dictionary: {
    title: string;
    description: string;
    viewProject: string;
    viewCode: string;
    viewAll: string;
    noProjects: string;
  };
}

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  CSS: '#563d7c',
  HTML: '#e34c26',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
};

function ProjectCard({ repo, locale, dictionary }: { repo: Repository; locale: Locale; dictionary: { viewProject: string; viewCode: string } }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <GlowCard className="h-full group">
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: languageColors[repo.language || ''] || '#6e7681' }}
              />
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {repo.language || 'Unknown'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <GitFork className="w-4 h-4" />
                {repo.forks_count}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 group-hover:text-primary-500 transition-colors">
            {repo.name}
          </h3>

          {/* Description */}
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 flex-grow line-clamp-3">
            {repo.description || 'No description available'}
          </p>

          {/* Topics */}
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {repo.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100/50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-neutral-200/50 dark:border-neutral-700/50">
            {repo.homepage && (
              <Link
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2 text-sm font-medium',
                  'text-primary-600 dark:text-primary-400',
                  'hover:text-primary-700 dark:hover:text-primary-300',
                  'transition-colors'
                )}
              >
                <ExternalLink className="w-4 h-4" />
                {dictionary.viewProject}
              </Link>
            )}
            <Link
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-2 text-sm font-medium',
                'text-neutral-600 dark:text-neutral-400',
                'hover:text-neutral-800 dark:hover:text-neutral-200',
                'transition-colors',
                !repo.homepage && 'ml-0',
                repo.homepage && 'ml-auto'
              )}
            >
              <Github className="w-4 h-4" />
              {dictionary.viewCode}
            </Link>
          </div>
        </div>

        {/* Hover gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
      </GlowCard>
    </motion.div>
  );
}

export function FeaturedProjects({ repos, locale, dictionary }: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-neutral-50 dark:bg-neutral-900/50"
    >
      {/* Background decorations */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
      </motion.div>

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
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
              Portfolio
            </span>
          </motion.div>
          <TextReveal
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-4"
            type="words"
          >
            {dictionary.title}
          </TextReveal>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
            {dictionary.description}
          </p>
        </FadeInSection>

        {/* Projects grid */}
        {repos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <ProjectCard
                  repo={repo}
                  locale={locale}
                  dictionary={{
                    viewProject: dictionary.viewProject,
                    viewCode: dictionary.viewCode,
                  }}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-500 dark:text-neutral-400 mb-12">
            {dictionary.noProjects}
          </p>
        )}

        {/* View all button */}
        <FadeInSection className="text-center">
          <Button
            href={`/${locale}/projects`}
            variant="outline"
            size="lg"
            rightIcon={<ArrowRight className="h-5 w-5" />}
            className="group"
          >
            <span className="relative">
              {dictionary.viewAll}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300" />
            </span>
          </Button>
        </FadeInSection>
      </div>
    </section>
  );
}
