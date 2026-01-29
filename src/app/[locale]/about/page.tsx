import { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { experiences } from '@/data/experience';
import { skillCategories } from '@/data/skills';
import { education, certifications } from '@/data/education';
import { personalInfo } from '@/data/navigation';
import { siteConfig } from '@/lib/seo/constants';
import type { Locale } from '@/types';
import { AboutPageClient } from './AboutPageClient';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);

  return generatePageMetadata({
    title: dictionary.metadata.about.title,
    description: dictionary.metadata.about.description,
    path: '/about',
    locale: locale as Locale,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: dictionary.nav.home, url: `${siteConfig.url}/${locale}` },
    { name: dictionary.nav.about, url: `${siteConfig.url}/${locale}/about` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <AboutPageClient
        locale={locale as Locale}
        dictionary={dictionary}
        experiences={experiences}
        skillCategories={skillCategories}
        education={education}
        certifications={certifications}
        personalInfo={personalInfo}
      />
    </>
  );
}
