import { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { HeroSection } from '@/components/organisms/HeroSection';
import { FeaturedProjects } from '@/components/organisms/FeaturedProjects';
import { SkillsShowcase } from '@/components/organisms/SkillsShowcase';
import { CTASection } from '@/components/organisms/CTASection';
import { getGitHubRepos } from '@/lib/github/api';
import type { Locale } from '@/types';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);

  return generatePageMetadata({
    title: undefined,
    description: dictionary.metadata.home.description,
    locale: locale as Locale,
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);
  const repos = await getGitHubRepos();
  const featuredRepos = repos.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        locale={locale as Locale}
        dictionary={dictionary.hero}
      />

      {/* Featured Projects Section */}
      <FeaturedProjects
        repos={featuredRepos}
        locale={locale as Locale}
        dictionary={{
          title: dictionary.projects.title,
          description: dictionary.projects.description,
          viewProject: dictionary.projects.viewProject,
          viewCode: dictionary.projects.viewCode,
          viewAll: locale === 'pt-BR' ? 'Ver todos os projetos' : 'View all projects',
          noProjects: dictionary.projects.noProjects,
        }}
      />

      {/* Skills Preview Section */}
      <SkillsShowcase
        locale={locale as Locale}
        dictionary={{
          title: dictionary.about.skills.title,
        }}
      />

      {/* CTA Section */}
      <CTASection
        locale={locale as Locale}
        dictionary={{
          title: dictionary.contact.title,
          subtitle: dictionary.contact.subtitle,
          description: dictionary.contact.description,
          button: dictionary.contact.title,
        }}
      />
    </>
  );
}
