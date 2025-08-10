export const SERVICES = [
  {
    id: "administration",
    title: "Démarches & Gestion Administrative",
    description:
      "Prise en charge complète de vos démarches et formalités administratives, pour particuliers et professionnels. Comptabilité incluse pour un service clé en main.",
    icon: "files",
    features: [
      "Gestion complète des démarches administratives",
      "Obtention et renouvellement de documents officiels",
      "Dépôt et suivi de dossiers",
      "Support création d'entreprise",
      "Externalisation des tâches",
      "Gestion comptable simplifiée",
    ],
    services: [
      "Demandes et renouvellements de documents",
      "Dépôt de dossiers administratifs",
      "Tenue de comptabilité",
      "Déclarations fiscales",
      "Suivi de trésorerie",
      "Business plan",
    ],
  },

  {
    id: "development",
    title: "Développement & Programmation",
    description:
      "Création d'applications web, desktop et mobile avec les dernières technologies. Conception et maintenance de backends, APIs et bases de données.",
    icon: "code",
    features: [
      "Applications Web sur mesure",
      "Applications Mobile (iOS/Android)",
      "Applications Desktop",
      "APIs et Backends robustes",
      "Bases de données optimisées",
      "Délégation d'ingénieurs logiciel",
    ],
    technologies: {
      frontend: [
        "React",
        "Next.js",
        "Vue.js",
        "Nuxt.js",
        "Astro",
        "Angular",
        "Svelte",
      ],
      backend: [
        "PHP (Laravel, Symfony)",
        "Python (Django, Flask)",
        "Node.js",
        "NestJS",
        "GraphQL",
      ],
      cms: ["WordPress", "Sanity"],
      databases: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Redis"],
      mobile: ["React Native", "Flutter", "Ionic"],
    },
  },
  {
    id: "design",
    title: "Design & Multimédia",
    description:
      "Création d'identités visuelles fortes, montage vidéo professionnel et animations créatives pour sublimer votre marque.",
    icon: "palette",
    features: [
      "Création de logos et identité visuelle",
      "Montage vidéo professionnel",
      "Retouche photo avancée",
      "Animations 2D/3D",
      "Motion design",
      "Design UI/UX",
    ],
    technologies: {
      design: [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Figma",
        "Sketch",
        "InVision",
      ],
      video: ["Adobe Premiere Pro", "Adobe After Effects", "DaVinci Resolve"],
      animation: ["Blender", "Cinema 4D", "Adobe After Effects"],
      prototyping: ["Figma", "Adobe XD", "Framer"],
    },
  },
  {
    id: "marketing",
    title: "Marketing & Communication",
    description:
      "Stratégies marketing digitales complètes, gestion des réseaux sociaux et création de contenus viraux pour booster votre visibilité.",
    icon: "megaphone",
    features: [
      "Community management",
      "Publicité sponsorisée (Meta, Google, TikTok)",
      "Création de contenus viraux",
      "Stratégies marketing digital",
      "Campagnes emailing",
      "Gestion de newsletters",
    ],
    platforms: [
      { name: "Facebook", logo: "/images/platforms/facebook.svg" },
      { name: "Instagram", logo: "/images/platforms/instagram.svg" },
      { name: "LinkedIn", logo: "/images/platforms/linkedin.svg" },
      { name: "TikTok", logo: "/images/platforms/tiktok.svg" },
      { name: "YouTube", logo: "/images/platforms/youtube.svg" },
      { name: "Google Ads", logo: "/images/platforms/google-ads.svg" },
    ],
  },
];

export const PORTFOLIO = [
  {
    id: 1,
    slug: "branding-ecommerce",
    title: "Branding & e-commerce pour marque locale",
    description:
      "Identité visuelle complète, design de boutique en ligne et tunnel de conversion optimisé pour une marque de mode locale.",
    image: "/images/portfolio/branding-ecommerce.jpg",
    category: "design",
    tags: ["Branding", "E-commerce", "UI/UX"],
    link: "https://www.behance.net/HANAE",
    year: "2024",
  },
  {
    id: 2,
    slug: "crm-gestion-immobiliere",
    title: "CRM pour gestion immobilière",
    description:
      "Application web complète développée avec Next.js, PostgreSQL et Prisma pour la gestion de biens immobiliers.",
    image: "/images/portfolio/crm-immobilier.jpg",
    category: "development",
    tags: ["Next.js", "PostgreSQL", "CRM"],
    link: "https://github.com/HANAE/crm-immo",
    year: "2024",
  },
  {
    id: 3,
    slug: "campagne-reseaux-sociaux",
    title: "Campagne virale réseaux sociaux",
    description:
      "Stratégie marketing complète ayant généré +500K vues et +15% d'engagement pour un restaurant parisien.",
    image: "/images/portfolio/campagne-sociale.jpg",
    category: "marketing",
    tags: ["Social Media", "Viral Marketing", "Content Creation"],
    link: "https://instagram.com/HANAE",
    year: "2023",
  },
  {
    id: 4,
    slug: "application-mobile-fitness",
    title: "Application mobile fitness",
    description:
      "App mobile complète avec suivi d'entraînements, nutrition et communauté. Plus de 10K téléchargements.",
    image: "/images/portfolio/app-fitness.jpg",
    category: "development",
    tags: ["React Native", "Firebase", "Mobile"],
    link: "https://apps.apple.com/app/HANAE-fitness",
    year: "2023",
  },
  {
    id: 5,
    slug: "gestion-comptable-startup",
    title: "Gestion comptable startup tech",
    description:
      "Mise en place complète de la comptabilité et des processus administratifs pour une startup en forte croissance.",
    image: "/images/portfolio/comptabilite-startup.jpg",
    category: "administration",
    tags: ["Comptabilité", "Startup", "Gestion"],
    link: "#",
    year: "2024",
  },
  {
    id: 6,
    slug: "video-corporate",
    title: "Vidéo corporate institutionnelle",
    description:
      "Production vidéo complète de 3 minutes présentant les valeurs et l'équipe d'une entreprise de 200 salariés.",
    image: "/images/portfolio/video-corporate.jpg",
    category: "design",
    tags: ["Vidéo", "Motion Design", "Corporate"],
    link: "https://youtube.com/watch?v=HANAE",
    year: "2023",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Marie Dubois",
    position: "CEO, TechStart",
    company: "TechStart",
    content:
      "HANAE a transformé notre vision en une application web performante. Leur expertise technique et leur accompagnement ont été exceptionnels.",
    rating: 5,
    image: "/images/testimonials/marie-dubois.jpg",
  },
  {
    id: 2,
    name: "Ahmed Ben Ali",
    position: "Fondateur, RestauLocal",
    company: "RestauLocal",
    content:
      "Grâce à leur stratégie marketing, notre visibilité sur les réseaux sociaux a explosé. +300% d'engagement en 6 mois !",
    rating: 5,
    image: "/images/testimonials/ahmed-benali.jpg",
  },
  {
    id: 3,
    name: "Sophie Martin",
    position: "Directrice, BeautyBrand",
    company: "BeautyBrand",
    content:
      "L'identité visuelle créée par HANAE correspond parfaitement à nos valeurs. Un travail créatif et professionnel remarquable.",
    rating: 5,
    image: "/images/testimonials/sophie-martin.jpg",
  },
];

export const CONTACT_FORM_URL = "https://forms.google.com/HANAE-contact";

export const BLOG_POSTS = [
  {
    id: 1,
    slug: "tendances-web-2024",
    title: "Les tendances du développement web en 2024",
    excerpt:
      "Découvrez les technologies et pratiques qui façonnent le web moderne.",
    image: "/images/blog/tendances-web-2024.jpg",
    publishedAt: "2024-01-15",
    readTime: "5 min",
    category: "Développement",
  },
  {
    id: 2,
    slug: "marketing-digital-pme",
    title: "Marketing digital pour PME : Guide complet",
    excerpt: "Comment développer sa présence en ligne avec un budget limité.",
    image: "/images/blog/marketing-pme.jpg",
    publishedAt: "2024-01-10",
    readTime: "8 min",
    category: "Marketing",
  },
];
