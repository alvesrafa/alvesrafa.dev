import type { NavItem, SocialLink } from '@/types';

export const navigationItems: NavItem[] = [
  {
    label: { en: 'Home', 'pt-BR': 'Início' },
    href: '/',
  },
  {
    label: { en: 'About', 'pt-BR': 'Sobre' },
    href: '/about',
  },
  {
    label: { en: 'Projects', 'pt-BR': 'Projetos' },
    href: '/projects',
  },
  {
    label: { en: 'Contact', 'pt-BR': 'Contato' },
    href: '/contact',
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/alvesrafa',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alvrafael/',
    icon: 'linkedin',
  },
  {
    name: 'Email',
    url: 'mailto:alvesrafa.dev@gmail.com',
    icon: 'mail',
  },
];

export const personalInfo = {
  name: 'Rafael Alves de Jesus',
  shortName: 'Rafael Alves',
  role: {
    en: 'Tech Lead & Full Stack Developer',
    'pt-BR': 'Tech Lead & Desenvolvedor Full Stack',
  },
  company: 'Luby Software',
  companyUrl: 'https://luby.com.br',
  location: 'Ilhabela, São Paulo, Brazil',
  email: 'alvesrafa.dev@gmail.com',
  github: 'alvesrafa',
  linkedin: 'alvrafael',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://alvesrafa.dev',
};
