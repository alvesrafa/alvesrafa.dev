import { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { HeroSection } from '@/components/organisms/HeroSection';
import { FeaturedProjects } from '@/components/organisms/FeaturedProjects';
import { SkillsShowcase } from '@/components/organisms/SkillsShowcase';
import { Experience } from '@/components/organisms/Experience';
import { CTASection } from '@/components/organisms/CTASection';
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

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        locale={locale as Locale}
        dictionary={{
          availability: dictionary.hero.availability,
          ctaPrimary: dictionary.hero.ctaPrimary,
          metaYears: dictionary.hero.metaYears,
          metaDeploys: dictionary.hero.metaDeploys,
          metaTeam: dictionary.hero.metaTeam,
          metaCertified: dictionary.hero.metaCertified,
        }}
        statusBarDictionary={{
          available: dictionary.statusBar.available,
          role: dictionary.statusBar.role,
          location: dictionary.statusBar.location,
          timezone: dictionary.statusBar.timezone,
        }}
      />

      {/* Featured Projects Section */}
      <FeaturedProjects
        locale={locale as Locale}
        dictionary={{
          workAnchor: dictionary.sections.workAnchor,
          workTitle: dictionary.sections.workTitle,
        }}
      />

      {/* Skills Preview Section */}
      <SkillsShowcase
        locale={locale as Locale}
        dictionary={{
          stackAnchor: dictionary.sections.stackAnchor,
          stackTitle: dictionary.sections.stackTitle,
        }}
      />

      {/* Experience Section */}
      <Experience
        locale={locale as Locale}
        dictionary={{
          pathAnchor: dictionary.sections.pathAnchor,
          pathTitle: dictionary.sections.pathTitle,
        }}
      />

      {/* CTA Section */}
      <CTASection
        locale={locale as Locale}
        dictionary={{
          contactAnchor: dictionary.sections.contactAnchor,
          contactHeading: dictionary.sections.contactHeading,
          replyTime: dictionary.contact.replyTime,
          contractAvailability: dictionary.contact.contractAvailability,
        }}
      />
    </>
  );
}
