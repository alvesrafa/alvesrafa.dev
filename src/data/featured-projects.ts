import type { FeaturedProject } from '@/types';

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'convide',
    name: 'Convide.site',
    description: {
      en: 'Platform to create and manage personalized digital invitations for various types of events, with flexible pricing model',
      'pt-BR': 'Plataforma para criar e gerenciar convites digitais personalizados para diversos tipos de eventos, com modelo de preços flexível',
    },
    homepage: 'https://www.convide.site/',
    language: 'TypeScript',
    topics: ['typescript', 'reactjs', 'postgresql', 'oauth', 'fullstack'],
    featured: true,
    image: '/images/convide-site.png',
  },
  {
    id: 'previsio',
    name: 'Previsio.site',
    description: {
      en: 'Application for financial monitoring and future forecasting, with simulation and needs calculation capabilities',
      'pt-BR': 'Aplicação para realizar monitoramento financeiro e previsão do futuro, sendo possível simular e calcular necessidades',
    },
    homepage: 'https://previsio.site/',
    language: 'TypeScript',
    topics: ['typescript', 'reactjs', 'postgresql', 'oauth', 'tailwind-css', 'recharts', 'google-genai', 'fullstack'],
    featured: true,
    image: '/images/previsio-site.png',
  },
];
