import { HANAE_INFO } from ".";
import { Locale, translations } from "@/lib/i18n";

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

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  services?: string[];
  technologies?: {
    frontend?: string[];
    backend?: string[];
    cms?: string[];
    databases?: string[];
    mobile?: string[];
    design?: string[];
    video?: string[];
    animation?: string[];
    prototyping?: string[];
  };
  platforms?: Array<{ name: string; logo: string }>;
};

export function getServices(locale: Locale): Service[] {
  const t = translations[locale];
  const serviceIds: Array<
    "administration" | "development" | "design" | "marketing"
  > = ["administration", "development", "design", "marketing"];

  return serviceIds.map((id) => {
    // Access the service data from translations
    // TypeScript needs explicit access to the service translations
    let serviceData: {
      title: string;
      description: string;
      features: readonly string[];
      services?: readonly string[];
    };

    switch (id) {
      case "administration":
        serviceData = t.services.administration;
        break;
      case "development":
        serviceData = t.services.development;
        break;
      case "design":
        serviceData = t.services.design;
        break;
      case "marketing":
        serviceData = t.services.marketing;
        break;
      default:
        throw new Error(`Unknown service id: ${id}`);
    }

    const baseService = SERVICES.find((s) => s.id === id)!;

    const service: Service = {
      id,
      title: serviceData.title,
      description: serviceData.description,
      icon: baseService.icon,
      features: [...serviceData.features],
    };

    // Add services array for administration
    if (
      id === "administration" &&
      "services" in serviceData &&
      serviceData.services
    ) {
      service.services = [...serviceData.services];
    }

    // Add technologies (these are the same across locales as they're technical terms)
    if (baseService.technologies) {
      service.technologies = baseService.technologies;
    }

    // Add platforms (these are the same across locales as they're platform names)
    if (baseService.platforms) {
      service.platforms = baseService.platforms;
    }

    return service;
  });
}

export type Portfolio = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: "development" | "design" | "marketing" | "administration";
  tags: string[];
  link: string;
  year: string;
};

export const PORTFOLIO_BASE = [
  {
    id: 1,
    slug: "branding-ecommerce",
    image: "/images/portfolio/branding-ecommerce.webp",
    category: "design" as const,
    link: "",
    year: "2024",
  },
  {
    id: 2,
    slug: "crm-gestion-immobiliere",
    image: "/images/portfolio/crm-immobilier.webp",
    category: "development" as const,
    link: "",
    year: "2024",
  },
  {
    id: 3,
    slug: "campagne-reseaux-sociaux",
    image: "/images/portfolio/campagne-sociale.webp",
    category: "marketing" as const,
    link: "",
    year: "2023",
  },
  {
    id: 4,
    slug: "application-mobile-fitness",
    image: "/images/portfolio/app-fitness.webp",
    category: "development" as const,
    link: "",
    year: "2023",
  },
  {
    id: 5,
    slug: "gestion-comptable-startup",
    image: "/images/portfolio/comptabilite-startup.webp",
    category: "administration" as const,
    link: "#",
    year: "2024",
  },
  {
    id: 6,
    slug: "video-corporate",
    image: "/images/portfolio/video-corporate.webp",
    category: "design" as const,
    link: "",
    year: "2023",
  },
];

// Legacy export for backward compatibility
export const PORTFOLIO = PORTFOLIO_BASE.map((item) => ({
  ...item,
  title: "",
  description: "",
  tags: [],
}));

export function getPortfolio(locale: Locale): Portfolio[] {
  const t = translations[locale];

  return PORTFOLIO_BASE.map((baseItem) => {
    const translation =
      t.portfolio.items[baseItem.slug as keyof typeof t.portfolio.items];

    if (!translation) {
      throw new Error(
        `Missing translation for portfolio item: ${baseItem.slug}`
      );
    }

    return {
      id: baseItem.id,
      slug: baseItem.slug,
      title: translation.title,
      description: translation.description,
      image: baseItem.image,
      category: baseItem.category,
      tags: [...translation.tags],
      link: baseItem.link,
      year: baseItem.year,
    };
  });
}

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

export const CONTACT_FORM_URL = HANAE_INFO.google_form;

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
