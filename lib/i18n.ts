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
        "Nous transformons vos idées en solutions performantes (digitales et physiques) avec notre expertise dans 4 domaines clés et notre accompagnement complet dans tous les services administratifs.",
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
      accounting: {
        title: "Comptabilité & Gestion",
        description: "Services comptables et administratifs pour entreprises",
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
        "We transform your ideas into high-performance solutions (digital and physical) with our expertise in 4 key areas and our comprehensive support in all administrative services.",
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
      accounting: {
        title: "Accounting & Management",
        description: "Accounting and administrative services for businesses",
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
      cta: "Send a message",
    },
    footer: {
      description:
        "Multi-service web agency specialized in development, design, digital marketing and business management.",
      quickLinks: "Quick Links",
      services: "Services",
      legal: "Legal Notice",
      terms: "Terms & Conditions",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      services: "خدماتنا",
      portfolio: "معرض الأعمال",
      about: "من نحن",
      contact: "اتصل بنا",
    },
    hero: {
      title: "شريكك متعدد الخدمات الشامل",
      subtitle: "التطوير، التصميم، التسويق وإدارة الأعمال",
      description:
        "نحول أفكارك إلى حلول عالية الأداء (رقمية وفيزيائية) بخبرتنا في 4 مجالات رئيسية ودعمنا الشامل في جميع الخدمات الإدارية.",
      cta: "اكتشف خدماتنا",
      contact: "تواصل معنا",
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
        description: "الهوية البصرية، تحرير الفيديو والرسوم المتحركة الإبداعية",
      },
      marketing: {
        title: "التسويق والاتصال",
        description: "الاستراتيجيات الرقمية وإدارة وسائل التواصل الاجتماعي",
      },
      accounting: {
        title: "المحاسبة والإدارة",
        description: "الخدمات المحاسبية والإدارية للشركات",
      },
    },
    portfolio: {
      title: "معرض أعمالنا",
      subtitle: "اكتشف أحدث إنجازاتنا",
      viewProject: "عرض المشروع",
      allCategories: "الكل",
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "دعنا نتحدث عن مشروعك",
      cta: "أرسل رسالة",
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
