export const defaultLocale = "fr";
export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const LANGUAGES = {
  fr: "Français",
  en: "English",
  ar: "العربية",
} as const;

export const translations = {
  fr: {
    metadata: {
      title: "Assistance administrative et développement commercial",
      description:
        "HANAE, agence basée en Algérie, simplifie vos démarches administratives (formalités, comptabilité) et booste votre activité grâce à la création de sites web, au marketing digital et au community management.",
    },
    nav: {
      home: "Accueil",
      services: "Nos Services",
      portfolio: "Portfolio",
      about: "À Propos",
      contact: "Contact",
    },
    hero: {
      title: "Votre partenaire multi-services complet",
      subtitle: "Développement, Design, Marketing & Gestion d'entreprise",
      description:
        "Nous concrétisons vos idées en solutions performantes, avec expertise dans 4 domaines clés et un accompagnement administratif complet.",
      cta: "Découvrir nos services",
      contact: "Nous contacter",
    },
    services: {
      title: "Nos Services",
      subtitle: "Une expertise complète pour tous vos besoins digitaux",
      development: {
        title: "Développement & Programmation",
        description:
          "Applications web, mobile et desktop avec les dernières technologies",
      },
      design: {
        title: "Design & Multimédia",
        description: "Identité visuelle, montage vidéo et animations créatives",
      },
      marketing: {
        title: "Marketing & Communication",
        description: "Stratégies digitales et gestion des réseaux sociaux",
      },
      administration: {
        title: "Démarches & Gestion Administrative",
        description:
          "Démarches, gestion documentaire et optimisation des procédures.",
      },
    },
    portfolio: {
      title: "Notre Portfolio",
      subtitle: "Découvrez nos dernières réalisations",
      viewProject: "Voir le projet",
      allCategories: "Tous",
    },
    contact: {
      title: "Contactez-nous",
      subtitle: "Parlons de votre projet",
      cta: "Envoyer un message",
    },
    footer: {
      description:
        "Agence web multi-services spécialisée en développement, design, marketing digital et gestion d'entreprise.",
      quickLinks: "Liens rapides",
      services: "Services",
      legal: "Mentions légales",
      terms: "Conditions générales",
    },
  },
  en: {
    metadata: {
      title: "HANAE – Administrative Assistance and Business Development",
      description:
        "HANAE, an agency based in Algeria, streamlines your administrative procedures (formalities, accounting) and boosts your business through website creation, digital marketing, and community management.",
    },
    nav: {
      home: "Home",
      services: "Our Services",
      portfolio: "Portfolio",
      about: "About",
      contact: "Contact",
    },
    hero: {
      title: "Your complete multi-service partner",
      subtitle: "Development, Design, Marketing & Business Management",
      description:
        "We turn your ideas into high-performance solutions, with expertise in 4 key areas and complete administrative support.",
      cta: "Discover our services",
      contact: "Contact us",
    },
    services: {
      title: "Our Services",
      subtitle: "Complete expertise for all your digital needs",
      development: {
        title: "Development & Programming",
        description:
          "Web, mobile and desktop applications with the latest technologies",
      },
      design: {
        title: "Design & Multimedia",
        description: "Visual identity, video editing and creative animations",
      },
      marketing: {
        title: "Marketing & Communication",
        description: "Digital strategies and social media management",
      },
      administration: {
        title: "Procedures & Administrative Management",
        description:
          "Procedures, document management and process optimization.",
      },
    },
    portfolio: {
      title: "Our Portfolio",
      subtitle: "Discover our latest achievements",
      viewProject: "View project",
      allCategories: "All",
    },
    contact: {
      title: "Contact us",
      subtitle: "Let's talk about your project",
      cta: "Send message",
    },
    footer: {
      description:
        "Multi-service web agency specializing in development, design, digital marketing and business management.",
      quickLinks: "Quick links",
      services: "Services",
      legal: "Legal notice",
      terms: "Terms and conditions",
    },
  },
  ar: {
    metadata: {
      title: "هنائي – المساعدة الإدارية وتطوير الأعمال",
      description:
        "هاناء، وكالة مقرها الجزائر، تبسط إجراءاتك الإدارية (الإجراءات الرسمية، المحاسبة) وتعمل على تنمية نشاطك من خلال إنشاء المواقع الإلكترونية، التسويق الرقمي، وإدارة المجتمعات.",
    },
    nav: {
      home: "الرئيسية",
      services: "خدماتنا",
      portfolio: "أعمالنا",
      about: "من نحن",
      contact: "اتصل بنا",
    },
    hero: {
      title: "شريكك المتعدد الخدمات الشامل",
      subtitle: "تطوير، تصميم، تسويق وإدارة الأعمال",
      description:
        "نحول أفكارك إلى حلول عالية الأداء، مع خبرة في 4 مجالات رئيسية ودعم إداري شامل.",
      cta: "اكتشف خدماتنا",
      contact: "اتصل بنا",
    },
    services: {
      title: "خدماتنا",
      subtitle: "خبرة شاملة لجميع احتياجاتك الرقمية",
      development: {
        title: "التطوير والبرمجة",
        description: "تطبيقات الويب والجوال وسطح المكتب بأحدث التقنيات",
      },
      design: {
        title: "التصميم والوسائط المتعددة",
        description: "الهوية البصرية وتحرير الفيديو والرسوم المتحركة الإبداعية",
      },
      marketing: {
        title: "التسويق والتواصل",
        description: "الاستراتيجيات الرقمية وإدارة وسائل التواصل الاجتماعي",
      },
      administration: {
        title: "الإجراءات والإدارة الإدارية",
        description: "الإجراءات وإدارة المستندات وتحسين العمليات.",
      },
    },
    portfolio: {
      title: "أعمالنا",
      subtitle: "اكتشف أحدث إنجازاتنا",
      viewProject: "عرض المشروع",
      allCategories: "الكل",
    },
    contact: {
      title: "اتصل بنا",
      subtitle: "دعنا نتحدث عن مشروعك",
      cta: "إرسال رسالة",
    },
    footer: {
      description:
        "وكالة ويب متعددة الخدمات متخصصة في التطوير والتصميم والتسويق الرقمي وإدارة الأعمال.",
      quickLinks: "روابط سريعة",
      services: "الخدمات",
      legal: "الإشعار القانوني",
      terms: "الشروط والأحكام",
    },
  },
} as const;
