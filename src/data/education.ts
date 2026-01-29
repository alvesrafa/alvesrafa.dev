import type { Education, Certification } from '@/types';

export const education: Education[] = [
  {
    id: '1',
    institution: 'Instituto Federal de São Paulo (IFSP)',
    degree: {
      en: 'Technologist Degree',
      'pt-BR': 'Tecnólogo',
    },
    field: {
      en: 'Systems Analysis and Development',
      'pt-BR': 'Análise e Desenvolvimento de Sistemas',
    },
    period: {
      start: '2017',
      end: '2019',
    },
    description: {
      en: 'Focused on logical reasoning, programming languages, and software development methodologies. Studied fundamentals of analysis, documentation, testing, development, and deployment of software systems.',
      'pt-BR': 'Foco em raciocínio lógico, linguagens de programação e metodologias de desenvolvimento de software. Estudo dos fundamentos de análise, documentação, testes, desenvolvimento e deploy de sistemas.',
    },
  },
];

export const certifications: Certification[] = [
  {
    id: '1',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2023-11',
    expirationDate: '2026-11',
    credentialUrl: 'https://www.credly.com/badges/aws-certified-cloud-practitioner',
    badgeUrl: '/images/icons/aws-cloud-practitioner.png',
  },
];
