import { featuredProjects } from '@/data/featured-projects';
import type { GitHubRepo, ProjectItem, Locale } from '@/types';
import { isFeaturedProject } from '@/types';

/**
 * Merges featured projects with GitHub repositories
 * Featured projects appear first, followed by GitHub repos
 */
export function mergeProjects(
  githubRepos: GitHubRepo[],
  _locale: Locale
): ProjectItem[] {
  return [...featuredProjects, ...githubRepos];
}

/**
 * Gets the description of a project based on its type and locale
 */
export function getProjectDescription(
  project: ProjectItem,
  locale: Locale
): string {
  if (isFeaturedProject(project)) {
    return project.description[locale];
  }
  return project.description || '';
}
