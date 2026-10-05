import type { FeaturedProject } from "@/types";

export const featuredProjects: FeaturedProject[] = [
  {
    id: "batefome",
    name: "BateFome",
    description: {
      en: "Ordering, POS and delivery platform for restaurants: digital menu, delivery, dine-in and pickup orders, and a real-time management dashboard under the restaurant's own address",
      "pt-BR":
        "Plataforma de pedidos, PDV e delivery para restaurantes: catálogo digital, pedidos por delivery, mesa ou retirada e painel de gestão em tempo real no endereço do próprio restaurante",
    },
    homepage: "https://batefome.delivery/",
    language: "TypeScript",
    topics: ["next", "typescript", "saas", "realtime"],
    featured: true,
    image: "/images/batefome-site.png",
    year: "2026 — now",
    previewImage: "/images/batefome-site.png",
  },
  {
    id: "convide",
    name: "Convide",
    description: {
      en: "Platform to create and manage personalized digital invitations for various types of events, with flexible pricing model",
      "pt-BR":
        "Plataforma para criar e gerenciar convites digitais personalizados para diversos tipos de eventos, com modelo de preços flexível",
    },
    homepage: "https://www.convide.site/",
    language: "TypeScript",
    topics: ["next", "typescript", "postgres", "oauth"],
    featured: true,
    image: "/images/convide-site.png",
    year: "2025",
    previewImage: "/images/convide-site.png",
  },
  {
    id: "previsio",
    name: "Previsio",
    description: {
      en: "Application for financial monitoring and future forecasting, with simulation and needs calculation capabilities",
      "pt-BR":
        "Aplicação para realizar monitoramento financeiro e previsão do futuro, sendo possível simular e calcular necessidades",
    },
    homepage: "https://previsio.site/",
    language: "TypeScript",
    topics: ["next", "recharts", "gemini", "tailwind"],
    featured: true,
    image: "/images/previsio-site.png",
    year: "2024",
    previewImage: "/images/previsio-site.png",
  },
  // {
  //   id: 'feedget',
  //   name: 'Feedget',
  //   description: {
  //     en: 'In-app feedback widget with screenshot capture, annotation, and email reporting',
  //     'pt-BR': 'Widget de feedback in-app com captura de tela, anotação e envio por email',
  //   },
  //   language: 'TypeScript',
  //   topics: ['react', 'node', 'prisma'],
  //   featured: true,
  //   year: '2022',
  // },
  // {
  //   id: 'moveit',
  //   name: 'Moveit',
  //   description: {
  //     en: 'Productivity app that uses the Pomodoro technique to encourage physical exercise between focus sessions',
  //     'pt-BR': 'App de produtividade que usa a técnica Pomodoro para incentivar exercícios físicos entre sessões de foco',
  //   },
  //   language: 'TypeScript',
  //   topics: ['next', 'typescript'],
  //   featured: true,
  //   year: '2021',
  // },
];
