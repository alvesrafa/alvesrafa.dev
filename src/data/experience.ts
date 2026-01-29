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
      en: 'Leading development teams in technical excellence and innovation. Defining clean code standards, security practices, and overseeing cloud deployments with AWS. Mentoring developers, providing feedback, and collaborating on product strategy and complex technical challenges.',
      'pt-BR': 'Liderando equipes de desenvolvimento em excelência técnica e inovação. Definindo padrões de código limpo, práticas de segurança e supervisionando deploys em nuvem com AWS. Mentorando desenvolvedores, fornecendo feedback e colaborando em estratégia de produto e desafios técnicos complexos.',
    },
    technologies: ['TypeScript', 'React', 'Next.js', 'Node.js', 'NestJS', 'React Native', 'AWS', 'PostgreSQL'],
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
      en: 'Strong expertise in TypeScript (Node.js, React, React Native) and PHP. Built scalable APIs and frontends, managed cloud deployments with AWS microservices. Experience with SQL databases, offline-first mobile development, and Docker/DevOps optimization.',
      'pt-BR': 'Sólida atuação em TypeScript (Node.js, React, React Native) e PHP. Construí APIs e frontends escaláveis, gerenciei deploys em nuvem com microsserviços AWS. Experiência com bancos de dados SQL, desenvolvimento mobile offline-first e otimização Docker/DevOps.',
    },
    technologies: ['TypeScript', 'JavaScript', 'Node.js', 'React', 'React Native', 'PHP', 'Laravel', 'AWS', 'Docker', 'PostgreSQL'],
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
      en: 'Developed web applications using React, TypeScript, Styled Components, and Redux. Built and maintained backend features using Node.js. Collaborated with the team on various startup projects.',
      'pt-BR': 'Desenvolvi aplicações web usando React, TypeScript, Styled Components e Redux. Construí e mantive funcionalidades do backend usando Node.js. Colaborei com a equipe em diversos projetos da startup.',
    },
    technologies: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'MongoDB', 'Styled Components', 'Redux'],
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
