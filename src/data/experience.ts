import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Luby Software',
    companyUrl: 'https://luby.com.br',
    role: {
      en: 'Tech Lead',
      'pt-BR': 'Tech Lead',
    },
    description: {
      en: 'Leading technical direction for the development team, defining code standards, security practices and architecture decisions across projects. Deploying and operating services on AWS and Azure with Docker and Kubernetes. Mentoring trainees and junior developers through code review and pairing, and working alongside product on complex problems.',
      'pt-BR': 'Lidero a direção técnica do time de desenvolvimento, definindo padrões de código, práticas de segurança e decisões de arquitetura nos projetos. Publico e opero serviços em AWS e Azure com Docker e Kubernetes. Mentoro trainees e desenvolvedores júnior por meio de code review e pair programming, e atuo junto ao produto na resolução de problemas complexos.',
    },
    technologies: ['TypeScript', 'React', 'Next.js', 'Node.js', 'NestJS', 'React Native', 'PHP', 'Laravel', 'AWS', 'Azure', 'Kubernetes', 'PostgreSQL'],
    period: {
      start: '2025-03',
      end: null,
    },
    location: 'Remote',
  },
  {
    id: '2',
    company: 'Luby Software',
    companyUrl: 'https://luby.com.br',
    role: {
      en: 'Mid-Level Full Stack Developer',
      'pt-BR': 'Desenvolvedor Full Stack Pleno',
    },
    description: {
      en: 'Designed and maintained REST APIs and microservices in Node.js (NestJS, Express, AdonisJS) consumed by web and mobile clients. Built React applications (Next.js, Vite) with Context API, Redux and Zustand, and delivered offline-first React Native apps (Expo and CLI) with local persistence and conflict resolution on sync. Developed PHP/Laravel applications with InertiaJS, including legacy systems.',
      'pt-BR': 'Projetei e mantive APIs REST e microsserviços em Node.js (NestJS, Express, AdonisJS) consumidos por clientes web e mobile. Desenvolvi aplicações React (Next.js, Vite) com Context API, Redux e Zustand, e entreguei apps React Native offline first (Expo e CLI) com persistência local e resolução de conflitos na sincronização. Desenvolvi aplicações PHP/Laravel com InertiaJS, incluindo sistemas legados.',
    },
    technologies: ['TypeScript', 'Node.js', 'NestJS', 'React', 'Next.js', 'React Native', 'PHP', 'Laravel', 'InertiaJS', 'AWS', 'Docker', 'PostgreSQL', 'MySQL'],
    period: {
      start: '2022-03',
      end: '2025-02',
    },
    location: 'Remote',
  },
  {
    id: '3',
    company: 'Luby Software',
    companyUrl: 'https://luby.com.br',
    role: {
      en: 'Junior Full Stack Developer',
      'pt-BR': 'Desenvolvedor Full Stack Junior',
    },
    description: {
      en: 'Worked with TypeScript (Node.js, React, React Native) and Java. Responsible for API refactoring to Node.js. Collaborated on API development, frontends, and cloud deployments with AWS microservices. Focused on clean code and best practices.',
      'pt-BR': 'Atuei com TypeScript (Node.js, React, React Native) e Java. Responsável pela refatoração de APIs para Node.js. Colaborei no desenvolvimento de APIs, frontends e deploys em nuvem com microsserviços AWS. Foco em código limpo e boas práticas.',
    },
    technologies: ['TypeScript', 'JavaScript', 'Node.js', 'React', 'React Native', 'Java', 'AWS', 'PostgreSQL'],
    period: {
      start: '2020-10',
      end: '2022-03',
    },
    location: 'Remote',
  },
  {
    id: '4',
    company: 'Campeão Sistemas',
    role: {
      en: 'Junior Full Stack Developer',
      'pt-BR': 'Desenvolvedor Full Stack Junior',
    },
    description: {
      en: 'Built web interfaces in ReactJS with Redux and Styled Components. Developed backend features in TypeScript with Node.js (AdonisJS). Collaborated with the team on various startup projects.',
      'pt-BR': 'Desenvolvi interfaces web em ReactJS com Redux e Styled Components. Implementei funcionalidades de backend em TypeScript com Node.js (AdonisJS). Colaborei com a equipe em diversos projetos da startup.',
    },
    technologies: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'AdonisJS', 'MongoDB', 'Styled Components', 'Redux'],
    period: {
      start: '2020-04',
      end: '2020-10',
    },
    location: 'São Paulo, Brazil',
  },
];

export function formatPeriod(start: string, end: string | null, locale: 'en' | 'pt-BR'): string {
  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString(locale === 'pt-BR' ? 'pt-BR' : 'en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  const startFormatted = formatDate(start);
  const endFormatted = end ? formatDate(end) : locale === 'pt-BR' ? 'Atual' : 'Present';

  return `${startFormatted} - ${endFormatted}`;
}

export function calculateDuration(start: string, end: string | null, locale: 'en' | 'pt-BR'): string {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (locale === 'pt-BR') {
    if (years > 0 && remainingMonths > 0) {
      return `${years} ano${years > 1 ? 's' : ''} ${remainingMonths} mes${remainingMonths > 1 ? 'es' : ''}`;
    } else if (years > 0) {
      return `${years} ano${years > 1 ? 's' : ''}`;
    } else {
      return `${remainingMonths} mes${remainingMonths > 1 ? 'es' : ''}`;
    }
  } else {
    if (years > 0 && remainingMonths > 0) {
      return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} yr${years > 1 ? 's' : ''}`;
    } else {
      return `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    }
  }
}
