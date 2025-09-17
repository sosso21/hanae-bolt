import { Locale } from "@/lib/i18n";

export interface ProductTranslation {
  name: string;
  description: string;
  tags: string[];
  specifications?: Record<string, string>;
}

export interface ShopTranslation {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  filterLabel: string;
  featuredTitle: string;
  allProductsTitle: string;
  addToCartLabel: string;
  viewDetailsLabel: string;
  buyNowLabel: string;
  inStockLabel: string;
  outOfStockLabel: string;
  fromLabel: string;
  backToShopLabel: string;
  specificationsTitle: string;
  guaranteeTitle: string;
  guaranteeText: string;
  deliveryTitle: string;
  deliveryText: string;
  supportTitle: string;
  supportText: string;
  categories: {
    all: string;
    services: string;
    formations: string;
    templates: string;
    consulting: string;
  };
}

export const productTranslations: Record<
  Locale,
  Record<string, ProductTranslation>
> = {
  fr: {
    "site-web-vitrine": {
      name: "Site Web Vitrine",
      description:
        "Site web professionnel responsive avec design moderne, optimisé SEO et prêt pour mobile. Parfait pour présenter votre entreprise.",
      tags: ["Site web", "Responsive", "SEO", "Mobile"],
      specifications: {
        "Pages incluses": "5-7 pages",
        "Délai de livraison": "7-10 jours",
        Révisions: "3 révisions incluses",
        Support: "3 mois gratuit",
      },
    },
    "ecommerce-complet": {
      name: "E-commerce Complet",
      description:
        "Boutique en ligne complète avec gestion des produits, paiements sécurisés, tableau de bord admin et intégration logistique.",
      tags: ["E-commerce", "Paiement", "Admin", "Logistique"],
      specifications: {
        Produits: "Illimités",
        Paiements: "Stripe, PayPal",
        Délai: "15-20 jours",
        Formation: "Incluse",
      },
    },
    "formation-react-nextjs": {
      name: "Formation React & Next.js",
      description:
        "Formation complète pour maîtriser React et Next.js. De débutant à expert avec projets pratiques et certification.",
      tags: ["React", "Next.js", "JavaScript", "Formation"],
      specifications: {
        Durée: "40 heures",
        Niveau: "Débutant à Expert",
        Projets: "5 projets pratiques",
        Certificat: "Inclus",
      },
    },
    "template-dashboard-admin": {
      name: "Template Dashboard Admin",
      description:
        "Template de tableau de bord administrateur moderne avec composants réutilisables, thème sombre/clair et responsive.",
      tags: ["Dashboard", "Admin", "Template", "React"],
      specifications: {
        Composants: "50+ composants",
        Pages: "20+ pages",
        Thèmes: "Clair/Sombre",
        Documentation: "Complète",
      },
    },
    "audit-seo-complet": {
      name: "Audit SEO Complet",
      description:
        "Analyse approfondie de votre site web avec recommandations détaillées pour améliorer votre référencement naturel.",
      tags: ["SEO", "Audit", "Référencement", "Analyse"],
      specifications: {
        "Pages analysées": "Jusqu'à 50",
        Rapport: "PDF détaillé",
        Délai: "3-5 jours",
        Suivi: "1 mois inclus",
      },
    },
    "identite-visuelle-complete": {
      name: "Identité Visuelle Complète",
      description:
        "Création d'une identité visuelle unique : logo, charte graphique, cartes de visite, et supports de communication.",
      tags: ["Logo", "Branding", "Design", "Identité"],
      specifications: {
        Logos: "3 propositions",
        Formats: "Tous formats",
        Charte: "Guide complet",
        Révisions: "Illimitées",
      },
    },
  },
  en: {
    "site-web-vitrine": {
      name: "Showcase Website",
      description:
        "Professional responsive website with modern design, SEO optimized and mobile ready. Perfect for presenting your business.",
      tags: ["Website", "Responsive", "SEO", "Mobile"],
      specifications: {
        "Pages included": "5-7 pages",
        "Delivery time": "7-10 days",
        Revisions: "3 revisions included",
        Support: "3 months free",
      },
    },
    "ecommerce-complet": {
      name: "Complete E-commerce",
      description:
        "Complete online store with product management, secure payments, admin dashboard and logistics integration.",
      tags: ["E-commerce", "Payment", "Admin", "Logistics"],
      specifications: {
        Products: "Unlimited",
        Payments: "Stripe, PayPal",
        Delivery: "15-20 days",
        Training: "Included",
      },
    },
    "formation-react-nextjs": {
      name: "React & Next.js Training",
      description:
        "Complete training to master React and Next.js. From beginner to expert with practical projects and certification.",
      tags: ["React", "Next.js", "JavaScript", "Training"],
      specifications: {
        Duration: "40 hours",
        Level: "Beginner to Expert",
        Projects: "5 practical projects",
        Certificate: "Included",
      },
    },
    "template-dashboard-admin": {
      name: "Admin Dashboard Template",
      description:
        "Modern admin dashboard template with reusable components, dark/light theme and responsive design.",
      tags: ["Dashboard", "Admin", "Template", "React"],
      specifications: {
        Components: "50+ components",
        Pages: "20+ pages",
        Themes: "Light/Dark",
        Documentation: "Complete",
      },
    },
    "audit-seo-complet": {
      name: "Complete SEO Audit",
      description:
        "In-depth analysis of your website with detailed recommendations to improve your natural referencing.",
      tags: ["SEO", "Audit", "Referencing", "Analysis"],
      specifications: {
        "Pages analyzed": "Up to 50",
        Report: "Detailed PDF",
        Delivery: "3-5 days",
        "Follow-up": "1 month included",
      },
    },
    "identite-visuelle-complete": {
      name: "Complete Visual Identity",
      description:
        "Creation of a unique visual identity: logo, graphic charter, business cards, and communication materials.",
      tags: ["Logo", "Branding", "Design", "Identity"],
      specifications: {
        Logos: "3 proposals",
        Formats: "All formats",
        Charter: "Complete guide",
        Revisions: "Unlimited",
      },
    },
  },
  ar: {
    "site-web-vitrine": {
      name: "موقع ويب عرض",
      description:
        "موقع ويب احترافي متجاوب مع تصميم عصري، محسن لمحركات البحث وجاهز للهواتف المحمولة. مثالي لعرض عملك.",
      tags: ["موقع ويب", "متجاوب", "SEO", "موبايل"],
      specifications: {
        "الصفحات المضمنة": "5-7 صفحات",
        "وقت التسليم": "7-10 أيام",
        المراجعات: "3 مراجعات مضمونة",
        الدعم: "3 أشهر مجاناً",
      },
    },
    "ecommerce-complet": {
      name: "متجر إلكتروني كامل",
      description:
        "متجر إلكتروني كامل مع إدارة المنتجات والمدفوعات الآمنة ولوحة تحكم الإدارة وتكامل الخدمات اللوجستية.",
      tags: ["متجر إلكتروني", "دفع", "إدارة", "لوجستيات"],
      specifications: {
        المنتجات: "غير محدود",
        المدفوعات: "Stripe, PayPal",
        التسليم: "15-20 يوم",
        التدريب: "مضمن",
      },
    },
    "formation-react-nextjs": {
      name: "تدريب React & Next.js",
      description:
        "تدريب شامل لإتقان React و Next.js. من المبتدئ إلى الخبير مع مشاريع عملية وشهادة.",
      tags: ["React", "Next.js", "JavaScript", "تدريب"],
      specifications: {
        المدة: "40 ساعة",
        المستوى: "مبتدئ إلى خبير",
        المشاريع: "5 مشاريع عملية",
        الشهادة: "مضمنة",
      },
    },
    "template-dashboard-admin": {
      name: "قالب لوحة تحكم الإدارة",
      description:
        "قالب لوحة تحكم إدارة عصري مع مكونات قابلة لإعادة الاستخدام وثيم فاتح/داكن وتصميم متجاوب.",
      tags: ["لوحة تحكم", "إدارة", "قالب", "React"],
      specifications: {
        المكونات: "50+ مكون",
        الصفحات: "20+ صفحة",
        الثيمات: "فاتح/داكن",
        الوثائق: "كاملة",
      },
    },
    "audit-seo-complet": {
      name: "تدقيق SEO كامل",
      description:
        "تحليل عميق لموقعك الإلكتروني مع توصيات مفصلة لتحسين مرجعيتك الطبيعية.",
      tags: ["SEO", "تدقيق", "مرجعية", "تحليل"],
      specifications: {
        "الصفحات المحللة": "حتى 50",
        التقرير: "PDF مفصل",
        التسليم: "3-5 أيام",
        المتابعة: "شهر واحد مضمون",
      },
    },
    "identite-visuelle-complete": {
      name: "هوية بصرية كاملة",
      description:
        "إنشاء هوية بصرية فريدة: شعار، ميثاق رسومي، بطاقات عمل، ومواد تواصل.",
      tags: ["شعار", "هوية العلامة", "تصميم", "هوية"],
      specifications: {
        الشعارات: "3 مقترحات",
        الصيغ: "جميع الصيغ",
        الميثاق: "دليل كامل",
        المراجعات: "غير محدودة",
      },
    },
  },
};

export const shopTranslations: Record<Locale, ShopTranslation> = {
  fr: {
    title: "Notre Boutique",
    subtitle: "Services, formations et outils pour développer votre activité",
    searchPlaceholder: "Rechercher un produit...",
    filterLabel: "Filtrer",
    featuredTitle: "Produits en vedette",
    allProductsTitle: "Tous nos produits",
    addToCartLabel: "Ajouter au panier",
    viewDetailsLabel: "Voir les détails",
    buyNowLabel: "Acheter maintenant",
    inStockLabel: "En stock",
    outOfStockLabel: "Rupture de stock",
    fromLabel: "À partir de",
    backToShopLabel: "Retour à la boutique",
    specificationsTitle: "Spécifications",
    guaranteeTitle: "Garantie qualité",
    guaranteeText: "Satisfait ou remboursé sous 30 jours",
    deliveryTitle: "Livraison rapide",
    deliveryText: "Livraison sous 24-48h",
    supportTitle: "Support inclus",
    supportText: "Support technique gratuit",
    categories: {
      all: "Tous les produits",
      services: "Services",
      formations: "Formations",
      templates: "Templates",
      consulting: "Consulting",
    },
  },
  en: {
    title: "Our Shop",
    subtitle: "Services, training and tools to develop your business",
    searchPlaceholder: "Search for a product...",
    filterLabel: "Filter",
    featuredTitle: "Featured Products",
    allProductsTitle: "All our products",
    addToCartLabel: "Add to cart",
    viewDetailsLabel: "View details",
    buyNowLabel: "Buy now",
    inStockLabel: "In stock",
    outOfStockLabel: "Out of stock",
    fromLabel: "From",
    backToShopLabel: "Back to shop",
    specificationsTitle: "Specifications",
    guaranteeTitle: "Quality guarantee",
    guaranteeText: "Satisfied or refunded within 30 days",
    deliveryTitle: "Fast delivery",
    deliveryText: "Delivery within 24-48h",
    supportTitle: "Support included",
    supportText: "Free technical support",
    categories: {
      all: "All products",
      services: "Services",
      formations: "Training",
      templates: "Templates",
      consulting: "Consulting",
    },
  },
  ar: {
    title: "متجرنا",
    subtitle: "خدمات وتدريب وأدوات لتطوير عملك",
    searchPlaceholder: "البحث عن منتج...",
    filterLabel: "تصفية",
    featuredTitle: "المنتجات المميزة",
    allProductsTitle: "جميع منتجاتنا",
    addToCartLabel: "أضف إلى السلة",
    viewDetailsLabel: "عرض التفاصيل",
    buyNowLabel: "اشتر الآن",
    inStockLabel: "متوفر",
    outOfStockLabel: "نفد المخزون",
    fromLabel: "من",
    backToShopLabel: "العودة للمتجر",
    specificationsTitle: "المواصفات",
    guaranteeTitle: "ضمان الجودة",
    guaranteeText: "راضٍ أو استرداد خلال 30 يوم",
    deliveryTitle: "تسليم سريع",
    deliveryText: "تسليم خلال 24-48 ساعة",
    supportTitle: "دعم مضمون",
    supportText: "دعم فني مجاني",
    categories: {
      all: "جميع المنتجات",
      services: "الخدمات",
      formations: "التدريب",
      templates: "القوالب",
      consulting: "الاستشارات",
    },
  },
};
