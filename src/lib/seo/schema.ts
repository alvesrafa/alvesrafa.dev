import { personalInfo } from '@/data/navigation';
import { skillCategories } from '@/data/skills';
import { certifications } from '@/data/education';
import { siteConfig } from './constants';
import type { Locale, GitHubRepo } from '@/types';

export function generatePersonSchema(locale: Locale) {
  const allSkills = skillCategories.flatMap((cat) => cat.skills);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: personalInfo.name,
    alternateName: personalInfo.shortName,
    jobTitle: locale === 'pt-BR' ? 'Tech Lead & Desenvolvedor Full Stack' : 'Tech Lead & Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: personalInfo.company,
      url: personalInfo.companyUrl,
    },
    url: siteConfig.url,
    image: `${siteConfig.url}/images/profile/rafael-alves.webp`,
    email: personalInfo.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ilhabela',
      addressRegion: 'São Paulo',
      addressCountry: 'BR',
    },
    sameAs: [
      siteConfig.links.linkedin,
      siteConfig.links.github,
    ],
    knowsAbout: allSkills.slice(0, 20),
    hasCredential: certifications.map((cert) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cert.name,
      credentialCategory: 'certification',
      recognizedBy: {
        '@type': 'Organization',
        name: cert.issuer,
      },
    })),
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: `${personalInfo.shortName} - Portfolio`,
    description: siteConfig.description,
    publisher: {
      '@id': `${siteConfig.url}/#person`,
    },
    inLanguage: ['en', 'pt-BR'],
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProjectsListSchema(
  projects: Array<{
    name: string;
    description: string;
    url: string;
    image?: string;
  }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.name,
        description: project.description,
        url: project.url,
        ...(project.image && { image: project.image }),
        author: {
          '@id': `${siteConfig.url}/#person`,
        },
      },
    })),
  };
}

export function generateSoftwareProjectSchema(repo: GitHubRepo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: repo.name,
    description: repo.description,
    codeRepository: repo.html_url,
    programmingLanguage: repo.language,
    author: {
      '@id': `${siteConfig.url}/#person`,
    },
    ...(repo.homepage && { url: repo.homepage }),
  };
}

export function generateContactPageSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: locale === 'pt-BR' ? 'Contato' : 'Contact',
    description:
      locale === 'pt-BR'
        ? 'Entre em contato com Rafael Alves para discutir projetos e oportunidades.'
        : 'Get in touch with Rafael Alves to discuss projects and opportunities.',
    mainEntity: {
      '@id': `${siteConfig.url}/#person`,
    },
  };
}
