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
      'Vitest',
      'Jest',
      'PHPUnit',
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
      'Azure',
      'Vercel',
      'GitHub Actions',
      'CI/CD',
      'Linux',
      'Nginx',
      'RabbitMQ',
      'Kafka',
    ],
  },
  {
    id: 'architecture',
    name: {
      en: 'Architecture',
      'pt-BR': 'Arquitetura',
    },
    skills: [
      'Clean Architecture',
      'DDD',
      'SOLID',
      'Design Patterns',
      'TDD',
      'Microservices',
      'Event-Driven',
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
