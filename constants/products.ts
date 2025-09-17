export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  tags: string[];
  inStock: boolean;
  featured: boolean;
  specifications?: Record<string, string>;
}

export const PRODUCT_CATEGORIES = [
  { id: "all", name: "Tous les produits" },
  { id: "services", name: "Services" },
  { id: "formations", name: "Formations" },
  { id: "templates", name: "Templates" },
  { id: "consulting", name: "Consulting" },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "site-web-vitrine",
    name: "Site Web Vitrine",
    description:
      "Site web professionnel responsive avec design moderne, optimisé SEO et prêt pour mobile. Parfait pour présenter votre entreprise.",
    price: 899,
    originalPrice: 1299,
    image: "/images/products/site-vitrine.webp",
    images: [
      "/images/products/site-vitrine.webp",
      "/images/products/site-vitrine-2.webp",
      "/images/products/site-vitrine-3.webp",
    ],
    category: "services",
    tags: ["Site web", "Responsive", "SEO", "Mobile"],
    inStock: true,
    featured: true,
    specifications: {
      "Pages incluses": "5-7 pages",
      "Délai de livraison": "7-10 jours",
      Révisions: "3 révisions incluses",
      Support: "3 mois gratuit",
    },
  },
  {
    id: 2,
    slug: "ecommerce-complet",
    name: "E-commerce Complet",
    description:
      "Boutique en ligne complète avec gestion des produits, paiements sécurisés, tableau de bord admin et intégration logistique.",
    price: 2499,
    originalPrice: 3499,
    image: "/images/products/ecommerce.webp",
    images: [
      "/images/products/ecommerce.webp",
      "/images/products/ecommerce-2.webp",
      "/images/products/ecommerce-3.webp",
    ],
    category: "services",
    tags: ["E-commerce", "Paiement", "Admin", "Logistique"],
    inStock: true,
    featured: true,
    specifications: {
      Produits: "Illimités",
      Paiements: "Stripe, PayPal",
      Délai: "15-20 jours",
      Formation: "Incluse",
    },
  },
  {
    id: 3,
    slug: "formation-react-nextjs",
    name: "Formation React & Next.js",
    description:
      "Formation complète pour maîtriser React et Next.js. De débutant à expert avec projets pratiques et certification.",
    price: 599,
    image: "/images/products/formation-react.webp",
    images: [
      "/images/products/formation-react.webp",
      "/images/products/formation-react-2.webp",
    ],
    category: "formations",
    tags: ["React", "Next.js", "JavaScript", "Formation"],
    inStock: true,
    featured: false,
    specifications: {
      Durée: "40 heures",
      Niveau: "Débutant à Expert",
      Projets: "5 projets pratiques",
      Certificat: "Inclus",
    },
  },
  {
    id: 4,
    slug: "template-dashboard-admin",
    name: "Template Dashboard Admin",
    description:
      "Template de tableau de bord administrateur moderne avec composants réutilisables, thème sombre/clair et responsive.",
    price: 149,
    originalPrice: 199,
    image: "/images/products/dashboard-template.webp",
    images: [
      "/images/products/dashboard-template.webp",
      "/images/products/dashboard-template-2.webp",
    ],
    category: "templates",
    tags: ["Dashboard", "Admin", "Template", "React"],
    inStock: true,
    featured: false,
    specifications: {
      Composants: "50+ composants",
      Pages: "20+ pages",
      Thèmes: "Clair/Sombre",
      Documentation: "Complète",
    },
  },
  {
    id: 5,
    slug: "audit-seo-complet",
    name: "Audit SEO Complet",
    description:
      "Analyse approfondie de votre site web avec recommandations détaillées pour améliorer votre référencement naturel.",
    price: 299,
    image: "/images/products/audit-seo.webp",
    images: [
      "/images/products/audit-seo.webp",
      "/images/products/audit-seo-2.webp",
    ],
    category: "consulting",
    tags: ["SEO", "Audit", "Référencement", "Analyse"],
    inStock: true,
    featured: true,
    specifications: {
      "Pages analysées": "Jusqu'à 50",
      Rapport: "PDF détaillé",
      Délai: "3-5 jours",
      Suivi: "1 mois inclus",
    },
  },
  {
    id: 6,
    slug: "identite-visuelle-complete",
    name: "Identité Visuelle Complète",
    description:
      "Création d'une identité visuelle unique : logo, charte graphique, cartes de visite, et supports de communication.",
    price: 799,
    originalPrice: 999,
    image: "/images/products/identite-visuelle.webp",
    images: [
      "/images/products/identite-visuelle.webp",
      "/images/products/identite-visuelle-2.webp",
      "/images/products/identite-visuelle-3.webp",
    ],
    category: "services",
    tags: ["Logo", "Branding", "Design", "Identité"],
    inStock: true,
    featured: true,
    specifications: {
      Logos: "3 propositions",
      Formats: "Tous formats",
      Charte: "Guide complet",
      Révisions: "Illimitées",
    },
  },
];

export const getFeaturedProducts = () =>
  PRODUCTS.filter((product) => product.featured);
export const getProductsByCategory = (category: string) =>
  category === "all"
    ? PRODUCTS
    : PRODUCTS.filter((product) => product.category === category);
export const getProductBySlug = (slug: string) =>
  PRODUCTS.find((product) => product.slug === slug);
