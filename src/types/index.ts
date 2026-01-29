export type Locale = 'en' | 'pt-BR';

export interface LocalizedString {
  en: string;
  'pt-BR': string;
}

export interface Project {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  longDescription?: LocalizedString;
  image: string;
  technologies: string[];
  links: {
    demo?: string;
    github?: string;
  };
  featured: boolean;
  category: 'web' | 'mobile' | 'api' | 'fullstack';
  createdAt: string;
  updatedAt?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  role: LocalizedString;
  description: LocalizedString;
  responsibilities?: LocalizedString[];
  technologies: string[];
  period: {
    start: string;
    end: string | null;
  };
  location: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: LocalizedString;
  field: LocalizedString;
  period: {
    start: string;
    end: string;
  };
  description?: LocalizedString;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialUrl?: string;
  badgeUrl?: string;
}

export interface SkillCategory {
  id: string;
  name: LocalizedString;
  skills: string[];
}

export interface NavItem {
  label: LocalizedString;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'profile';
  locale?: Locale;
  canonical?: string;
}
