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
    merchandising: string;
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
    // Nouveaux produits HANAE - T-shirts
    "tshirt-hanae-classic": {
      name: "T-shirt HANAE Classic",
      description:
        "T-shirt premium 100% coton avec logo HANAE brodé. Confortable et durable, parfait pour le quotidien.",
      tags: ["T-shirt", "Coton", "Broderie", "HANAE"],
      specifications: {
        Matière: "100% coton bio",
        "Tailles disponibles": "XS à XXL",
        Couleurs: "Noir, Blanc, Gris",
        Entretien: "Lavage machine 30°",
      },
    },
    "tshirt-hanae-premium": {
      name: "T-shirt HANAE Premium",
      description:
        "T-shirt haut de gamme en coton pima avec impression qualité premium. Design exclusif HANAE.",
      tags: ["T-shirt", "Premium", "Coton Pima", "HANAE"],
      specifications: {
        Matière: "100% coton pima",
        "Tailles disponibles": "S à XXXL",
        Couleurs: "Noir, Blanc, Bleu navy",
        "Technique d'impression": "Sérigraphie premium",
      },
    },
    "tshirt-hanae-limited": {
      name: "T-shirt HANAE Limited Edition",
      description:
        "Édition limitée avec design exclusif et numéroté. Matière ultra-confortable et coupe moderne.",
      tags: ["T-shirt", "Limited", "Édition spéciale", "HANAE"],
      specifications: {
        Matière: "Coton bio et elastane",
        "Tailles disponibles": "M à XXL",
        Édition: "Numérotée",
        Exclusivité: "500 pièces seulement",
      },
    },
    // Nouveaux produits HANAE - Doudounes
    "doudoune-hanae-urban": {
      name: "Doudoune HANAE Urban",
      description:
        "Doudoune légère et stylée pour un look urbain. Parfaite pour les températures fraîches.",
      tags: ["Doudoune", "Urban", "Léger", "HANAE"],
      specifications: {
        Matière: "Polyester technique",
        Isolation: "Ouate synthétique",
        "Tailles disponibles": "XS à XXL",
        Poids: "450g",
      },
    },
    "doudoune-hanae-tech": {
      name: "Doudoune HANAE Tech",
      description:
        "Doudoune technique avec technologie waterproof et breathable. Idéale pour les activités outdoor.",
      tags: ["Doudoune", "Technique", "Waterproof", "HANAE"],
      specifications: {
        Matière: "Nylon technique",
        Imperméabilité: "5000mm",
        Respirabilité: "5000g/m²/24h",
        Poches: "6 poches multiples",
      },
    },
    "doudoune-hanae-premium": {
      name: "Doudoune HANAE Premium",
      description:
        "Doudoune haut de gamme avec duvet d'oie et coupe ajustée. Excellence qualité et design raffiné.",
      tags: ["Doudoune", "Premium", "Duvet", "HANAE"],
      specifications: {
        Matière: "Nylon ripstop",
        Isolation: "Duvet d'oie 90/10",
        "Température confort": "Jusqu'à -15°C",
        Certification: "Responsible Down Standard",
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
    // New HANAE products - T-shirts
    "tshirt-hanae-classic": {
      name: "HANAE Classic T-shirt",
      description:
        "Premium 100% cotton t-shirt with embroidered HANAE logo. Comfortable and durable, perfect for everyday wear.",
      tags: ["T-shirt", "Cotton", "Embroidered", "HANAE"],
      specifications: {
        Material: "100% organic cotton",
        "Available sizes": "XS to XXL",
        Colors: "Black, White, Gray",
        Care: "Machine wash 30°",
      },
    },
    "tshirt-hanae-premium": {
      name: "HANAE Premium T-shirt",
      description:
        "High-end pima cotton t-shirt with premium quality print. Exclusive HANAE design.",
      tags: ["T-shirt", "Premium", "Pima Cotton", "HANAE"],
      specifications: {
        Material: "100% pima cotton",
        "Available sizes": "S to XXXL",
        Colors: "Black, White, Navy blue",
        "Printing technique": "Premium screen printing",
      },
    },
    "tshirt-hanae-limited": {
      name: "HANAE Limited Edition T-shirt",
      description:
        "Limited edition with exclusive numbered design. Ultra-comfortable material and modern cut.",
      tags: ["T-shirt", "Limited", "Special edition", "HANAE"],
      specifications: {
        Material: "Organic cotton and elastane",
        "Available sizes": "M to XXL",
        Edition: "Numbered",
        Exclusivity: "Only 500 pieces",
      },
    },
    // New HANAE products - Jackets
    "doudoune-hanae-urban": {
      name: "HANAE Urban Jacket",
      description:
        "Light and stylish jacket for an urban look. Perfect for cool temperatures.",
      tags: ["Jacket", "Urban", "Lightweight", "HANAE"],
      specifications: {
        Material: "Technical polyester",
        Insulation: "Synthetic wadding",
        "Available sizes": "XS to XXL",
        Weight: "450g",
      },
    },
    "doudoune-hanae-tech": {
      name: "HANAE Tech Jacket",
      description:
        "Technical jacket with waterproof and breathable technology. Ideal for outdoor activities.",
      tags: ["Jacket", "Technical", "Waterproof", "HANAE"],
      specifications: {
        Material: "Technical nylon",
        Waterproof: "5000mm",
        Breathability: "5000g/m²/24h",
        Pockets: "6 multiple pockets",
      },
    },
    "doudoune-hanae-premium": {
      name: "HANAE Premium Jacket",
      description:
        "High-end jacket with goose down and fitted cut. Excellent quality and refined design.",
      tags: ["Jacket", "Premium", "Down", "HANAE"],
      specifications: {
        Material: "Ripstop nylon",
        Insulation: "90/10 goose down",
        "Comfort temperature": "Up to -15°C",
        Certification: "Responsible Down Standard",
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
    // منتجات HANAE الجديدة - تيشرتات
    "tshirt-hanae-classic": {
      name: "تيشرت HANAE كلاسيك",
      description:
        "تيشرت مميز 100% قطن مع شعار HANAE مطرز. مريح ومتين، مثالي للارتداء اليومي.",
      tags: ["تيشرت", "قطن", "تطريز", "HANAE"],
      specifications: {
        المادة: "100% قطن عضوي",
        "المقاسات المتاحة": "XS إلى XXL",
        الألوان: "أسود, أبيض, رمادي",
        العناية: "غسيل آلي 30°",
      },
    },
    "tshirt-hanae-premium": {
      name: "تيشرت HANAE بريميوم",
      description:
        "تيشرت فاخر من قطن بيما مع طباعة عالية الجودة. تصميم HANAE الحصري.",
      tags: ["تيشرت", "بريميوم", "قطن بيما", "HANAE"],
      specifications: {
        المادة: "100% قطن بيما",
        "المقاسات المتاحة": "S إلى XXXL",
        الألوان: "أسود, أبيض, أزرق بحري",
        "تقنية الطباعة": "سلك سكرين بريميوم",
      },
    },
    "tshirt-hanae-limited": {
      name: "تيشرت HANAE إصدار محدود",
      description: "إصدار محدود بتصميم حصري مرقم. قماش مريح للغاية وقصة عصرية.",
      tags: ["تيشرت", "محدود", "إصدار خاص", "HANAE"],
      specifications: {
        المادة: "قطن عضوي وإيلاستين",
        "المقاسات المتاحة": "M إلى XXL",
        الإصدار: "مرقم",
        الحصرية: "500 قطعة فقط",
      },
    },
    // منتجات HANAE الجديدة - داونجات
    "doudoune-hanae-urban": {
      name: "جاكت HANAE حضري",
      description: "جاكت خفيف وأنيق للمظهر الحضري. مثالي للطقس البارد.",
      tags: ["جاكت", "حضري", "خفيف", "HANAE"],
      specifications: {
        المادة: "بوليستر تقني",
        العزل: "حشوة صناعية",
        "المقاسات المتاحة": "XS إلى XXL",
        الوزن: "450 جرام",
      },
    },
    "doudoune-hanae-tech": {
      name: "جاكت HANAE تقني",
      description:
        "جاكت تقني بتقنية مقاومة للماء وتنفس. مثالي للأنشطة الخارجية.",
      tags: ["جاكت", "تقني", "مقاوم للماء", "HANAE"],
      specifications: {
        المادة: "نايلون تقني",
        "مقاومة الماء": "5000 ملم",
        "القدرة على التنفس": "5000 جم/م²/24س",
        الجيوب: "6 جيوب متعددة",
      },
    },
    "doudoune-hanae-premium": {
      name: "جاكت HANAE بريميوم",
      description:
        "جاكت فاخر مع زغب الإوز وقصة ملائمة. جودة ممتازة وتصميم راق.",
      tags: ["جاكت", "بريميوم", "زغب", "HANAE"],
      specifications: {
        المادة: "نايلون مضاد للتمزق",
        العزل: "زغب إوز 90/10",
        "درجة حرارة الراحة": "حتى -15°م",
        الشهادة: "معيار الزغب المسؤول",
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
      merchandising: "Merchandising",
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
      merchandising: "Merchandising",
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
      merchandising: "المتاجر",
    },
  },
};
