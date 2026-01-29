import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: {
      en: 'Frontend',
      'pt-BR': 'Frontend',
    },
    skills: [
      'React',
      'Next.js',
      'React Native',
      'Expo',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Styled Components',
      'Redux',
      'Zustand',
    ],
  },
  {
    id: 'backend',
    name: {
      en: 'Backend',
      'pt-BR': 'Backend',
    },
    skills: [
      'Node.js',
      'NestJS',
      'Express',
      'AdonisJS',
      'PHP',
      'Laravel',
      'GoLang',
      'REST APIs',
      'GraphQL',
    ],
  },
  {
    id: 'database',
    name: {
      en: 'Databases',
      'pt-BR': 'Bancos de Dados',
    },
    skills: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis',
      'Prisma',
      'TypeORM',
    ],
  },
  {
    id: 'tools',
    name: {
      en: 'Tools & Cloud',
      'pt-BR': 'Ferramentas & Cloud',
    },
    skills: [
      'Git',
      'Docker',
      'Kubernetes',
      'AWS',
      'Cloud Storage',
      'Volumes',
      'Vercel',
      'GitHub Actions',
      'CI/CD',
      'Linux',
      'Nginx',
      'RabbitMQ',
      'Kafka',
    ],
  },
];

export const highlightSkills = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'AWS',
  'PostgreSQL',
];
