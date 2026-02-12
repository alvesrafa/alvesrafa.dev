'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge';
import { cn } from '@/lib/utils/cn';
import type { ProjectItem } from '@/types';
import { isFeaturedProject } from '@/types';
import { getProjectDescription } from '@/lib/projects/merge';

interface ProjectCardProps {
  repo: ProjectItem;
  locale: 'en' | 'pt-BR';
  dictionary: {
    viewProject: string;
    viewCode: string;
    featuredBadge: string;
  };
}

export function ProjectCard({ repo, locale, dictionary }: ProjectCardProps) {
  const featured = isFeaturedProject(repo);
  const description = getProjectDescription(repo, locale);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className={cn(
        'group relative flex flex-col h-full',
        'bg-white dark:bg-neutral-900',
        'border border-neutral-200 dark:border-neutral-800',
        'rounded-xl overflow-hidden',
        'transition-all duration-300',
        'hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700'
      )}
    >
      {/* Project Image/Placeholder */}
      {featured && 'image' in repo && repo.image ? (
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={repo.image}
            alt={repo.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Featured badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="overlay" size="sm">
              {dictionary.featuredBadge}
            </Badge>
          </div>

          {/* Language badge */}
          {repo.language && (
            <div className="absolute top-3 left-3 mt-8">
              <Badge variant="overlay" size="sm">
                {repo.language}
              </Badge>
            </div>
          )}
        </div>
      ) : (
        <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary-500/20 dark:text-primary-400/20">
              {repo.name.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="primary" size="sm">
                {dictionary.featuredBadge}
              </Badge>
            </div>
          )}

          {/* Language badge */}
          {repo.language && (
            <div className={cn("absolute top-3", featured ? "left-3 mt-8" : "left-3")}>
              <Badge variant="primary" size="sm">
                {repo.language}
              </Badge>
            </div>
          )}

          {/* Stats - only for GitHub repos */}
          {!featured && (
            <div className="absolute top-3 right-3 flex gap-2">
              {'stargazers_count' in repo && repo.stargazers_count > 0 && (
                <Badge variant="default" size="sm" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {repo.stargazers_count}
                </Badge>
              )}
              {'forks_count' in repo && repo.forks_count > 0 && (
                <Badge variant="default" size="sm" className="flex items-center gap-1">
                  <GitFork className="h-3 w-3" />
                  {repo.forks_count}
                </Badge>
              )}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {repo.name}
        </h3>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 flex-grow">
          {description || (locale === 'pt-BR' ? 'Sem descrição disponível' : 'No description available')}
        </p>

        {/* Topics/Tags */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repo.topics.slice(0, 4).map((topic) => (
              <Badge key={topic} variant="outline" size="sm">
                {topic}
              </Badge>
            ))}
            {repo.topics.length > 4 && (
              <Badge variant="outline" size="sm">
                +{repo.topics.length - 4}
              </Badge>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          {/* GitHub link - only for GitHub repos */}
          {!featured && 'html_url' in repo && (
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-1.5 text-sm font-medium',
                'text-neutral-600 hover:text-primary-600',
                'dark:text-neutral-400 dark:hover:text-primary-400',
                'transition-colors'
              )}
            >
              <Github className="h-4 w-4" />
              {dictionary.viewCode}
            </a>
          )}

          {/* Project link */}
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-1.5 text-sm font-medium',
                'text-neutral-600 hover:text-primary-600',
                'dark:text-neutral-400 dark:hover:text-primary-400',
                'transition-colors'
              )}
            >
              <ExternalLink className="h-4 w-4" />
              {dictionary.viewProject}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
