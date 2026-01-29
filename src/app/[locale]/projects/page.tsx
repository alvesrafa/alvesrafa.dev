import { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateProjectsListSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { Badge } from '@/components/atoms/Badge';
import { getGitHubRepos } from '@/lib/github/api';
import { siteConfig } from '@/lib/seo/constants';
import { Github, Code2 } from 'lucide-react';
import type { Locale } from '@/types';

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);

  return generatePageMetadata({
    title: dictionary.metadata.projects.title,
    description: dictionary.metadata.projects.description,
    path: '/projects',
    locale: locale as Locale,
  });
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);
  const repos = await getGitHubRepos();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: dictionary.nav.home, url: `${siteConfig.url}/${locale}` },
    { name: dictionary.nav.projects, url: `${siteConfig.url}/${locale}/projects` },
  ]);

  const projectsSchema = generateProjectsListSchema(
    repos.map((repo) => ({
      name: repo.name,
      description: repo.description || '',
      url: repo.html_url,
    }))
  );

  // Get unique languages from repos
  const languages = Array.from(
    new Set(repos.map((r) => r.language).filter(Boolean))
  ) as string[];

  return (
    <>
      <JsonLd data={[breadcrumbSchema, projectsSchema]} />

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
              {dictionary.projects.title}
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-6">
              {dictionary.projects.subtitle}
            </p>
            <p className="text-neutral-500 dark:text-neutral-400">
              {dictionary.projects.description}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {/* GitHub info badge */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <Badge variant="primary" size="md" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              {dictionary.projects.fromGitHub}
            </Badge>
          </div>

          {/* Languages filter (visual only for now) */}
          {languages.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <Badge variant="outline" size="md" className="cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/20">
                {dictionary.projects.filter.all}
              </Badge>
              {languages.slice(0, 6).map((lang) => (
                <Badge
                  key={lang}
                  variant="outline"
                  size="md"
                  className="cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/20"
                >
                  {lang}
                </Badge>
              ))}
            </div>
          )}

          {/* Projects grid */}
          {repos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo) => (
                <ProjectCard
                  key={repo.id}
                  repo={repo}
                  locale={locale as Locale}
                  dictionary={{
                    viewProject: dictionary.projects.viewProject,
                    viewCode: dictionary.projects.viewCode,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Code2 className="h-16 w-16 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
              <p className="text-neutral-500 dark:text-neutral-400">
                {dictionary.projects.noProjects}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
