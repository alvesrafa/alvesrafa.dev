import { personalInfo } from '@/data/navigation';

export const siteConfig = {
  name: personalInfo.shortName,
  title: 'Rafael Alves | Tech Lead & Full Stack Developer',
  description: 'Tech Lead at Luby Software specializing in React, Next.js, Node.js, and cloud architecture. Building scalable web and mobile applications.',
  url: personalInfo.siteUrl,
  ogImage: `${personalInfo.siteUrl}/images/og/og-default.png`,
  locale: {
    default: 'en' as const,
    available: ['en', 'pt-BR'] as const,
  },
  creator: personalInfo.name,
  keywords: [
    'Tech Lead',
    'Full Stack Developer',
    'Software Engineer',
    'React Developer',
    'Next.js',
    'Node.js',
    'TypeScript',
    'JavaScript',
    'AWS',
    'React Native',
    'Web Developer',
    'Ilhabela',
    'Brazil',
    'Rafael Alves',
  ],
  links: {
    github: `https://github.com/${personalInfo.github}`,
    linkedin: `https://www.linkedin.com/in/${personalInfo.linkedin}/`,
  },
};

export const jsonLdBase = {
  '@context': 'https://schema.org',
};
