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
    legal: {
      pageTitle: "Mentions légales",
      sections: {
        identity: "Identité de l'entreprise",
        registry: "Immatriculation et informations légales",
        directors: "Fondateurs & Direction",
        hosting: "Hébergeur",
        ip: "Propriété intellectuelle",
        data: "Protection des données (RGPD)",
      },
      content: {
        companyType: "Forme juridique",
        companyName: "Dénomination",
        rcNumber: "Numéro RC",
        jurisdiction: "Juridiction",
        address: "Adresse",
        email: "Email",
        founders: "Fondateurs",
        directors: "Direction",
        host: "Hébergeur",
        hostDesc: "Le site est hébergé par Vercel.",
        ipDesc:
          "L'ensemble des contenus (textes, images, logos, marques) est protégé par le droit d'auteur et le droit des marques. Toute reproduction, représentation ou adaptation, en tout ou partie, est interdite sans autorisation écrite préalable.",
        dataDesc:
          "Les données collectées sont traitées conformément au RGPD et aux lois applicables en Algérie. Vous disposez d'un droit d'accès, de rectification et de suppression de vos données en nous contactant à l'adresse indiquée.",
      },
    },

    about: {
      pageTitle: "À propos",
      sections: {
        mission: "Notre mission",
        activities: "Nos activités",
        values: "Nos valeurs",
        founders: "Fondateurs",
      },
      content: {
        mission:
          "Accompagner durablement les entreprises et particuliers en Algérie et à l'international grâce à un support administratif fiable et des solutions digitales performantes.",
        activities: {
          admin:
            "Assistance administrative (formalités, comptabilité, gestion documentaire)",
          outsourcing: "Externalisation et support opérationnel",
          digital:
            "Conception et développement de solutions digitales (web, apps)",
        },
        values:
          "Exigence, transparence et sens du service. Nous privilégions la qualité, l'efficacité et la confiance sur le long terme.",
      },
    },

    terms: {
      pageTitle: "Conditions générales (CGU/CGV)",
      sections: {
        purpose: "Objet",
        services: "Services",
        responsibilities: "Responsabilités",
        payments: "Paiements",
        ip: "Propriété intellectuelle",
        data: "Protection des données",
        law: "Droit applicable & juridiction compétente",
      },
      content: {
        purpose:
          "Les présentes conditions régissent l'utilisation du site et les prestations fournies par l'entreprise.",
        services:
          "Les services incluent l'assistance administrative, l'externalisation et le développement digital, tels que décrits sur le site.",
        responsibilities:
          "Le client s'engage à fournir des informations exactes. L'entreprise met en œuvre les moyens nécessaires mais ne peut garantir un résultat lorsque celui-ci dépend de tiers ou d'obligations légales.",
        payments:
          "Lorsque des paiements s'appliquent, ils sont exigibles selon les modalités précisées dans l'offre ou le devis. Des pénalités peuvent s'appliquer en cas de retard.",
        ip: "Les contenus, marques et logiciels restent la propriété de leurs titulaires. Aucune cession de droits n'est consentie sans accord écrit.",
        data: "Les données sont traitées conformément au RGPD et aux lois algériennes. Vous pouvez exercer vos droits en nous contactant par email.",
        law: "Les présentes sont régies par le droit algérien. Les tribunaux compétents sont ceux du ressort de Blida, Algérie.",
      },
    },

    confirmation: {
      title: "Confirmation d'achat",
      description: "Votre achat a été confirmé avec succès.",
      successTitle: "Votre achat a bien été effectué",
      thankYouText: "Merci pour votre achat.",
      helpText:
        "En cas de question ou de problème, contactez-nous — nous sommes là pour vous aider.",
      contactSupport: "Contacter le support",
      viewOrder: "Voir ma commande",
    },

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
      shop: "Boutique",
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
    shop: {
      title: "Boutique",
      subtitle:
        "Découvrez nos services, formations et templates pour booster votre présence digitale.",
      searchPlaceholder: "Rechercher des produits...",
      filterLabel: "Filtrer",
      clearFilters: "Effacer les filtres",
      noResults: "Aucun produit trouvé",
      searchResults: "Résultats de recherche",
      noProductsFound: "Aucun produit ne correspond à vos critères",
      viewAllProducts: "Voir tous les produits",
      sortBy: "Trier par",
      sortOptions: {
        newest: "Plus récent",
        priceAsc: "Prix croissant",
        priceDesc: "Prix décroissant",
        nameAsc: "Nom A-Z",
        nameDesc: "Nom Z-A",
      },
      searching: "Recherche en cours...",
      featuredTitle: "Produits vedettes",
      allProductsTitle: "Tous les produits",
      inStockLabel: "En stock",
      outOfStockLabel: "Rupture de stock",
      backToShopLabel: "Retour à la boutique",
      guaranteeTitle: "Garantie",
      guaranteeText: "Satisfait ou remboursé",
      deliveryTitle: "Livraison",
      deliveryText: "Livraison gratuite",
      supportTitle: "Support",
      supportText: "Support 24/7",
      specificationsTitle: "Spécifications",
      addToCartLabel: "Ajouter au panier",
      buyNowLabel: "Acheter maintenant",
      added: "Ajouté !",
      addMore: "Ajouter encore",
      redirecting: "Redirection...",
      cart: {
        title: "Panier",
        empty: "Votre panier est vide",
        emptyDescription: "Ajoutez des produits à votre panier pour continuer.",
        backToShop: "Retour à la boutique",
        total: "Total",
        clear: "Vider",
        clearCart: "Vider le panier",
        clearCartTitle: "Vider le panier ?",
        clearCartDescription:
          "Cette action supprimera tous les articles de votre panier. Cette action ne peut pas être annulée.",
        cancel: "Annuler",
        checkout: "Commander",
      },
      checkout: {
        title: "Commande",
        empty: "Votre panier est vide",
        emptyDescription: "Ajoutez des produits à votre panier pour continuer.",
        backToShop: "Retour à la boutique",
        orderSummary: "Résumé de la commande",
        directPurchase: "Achat direct",
        directPurchaseDescription: "Vous achetez directement ce produit",
        deliveryInfo: "Informations de livraison",
        lastname: "Nom",
        firstname: "Prénom",
        email: "Email",
        confirmEmail: "Confirmez votre email",
        phone: "Téléphone",
        address: "Adresse",
        city: "Ville",
        postalCode: "Code postal",
        message: "Message (optionnel)",
        processing: "Traitement...",
        confirmOrder: "Confirmer la commande",
        emailMismatch: "Les adresses email ne correspondent pas",
        total: "Total",
      },
      orderSuccess: {
        title: "Commande confirmée !",
        description:
          "Merci pour votre commande. Nous vous contacterons bientôt pour confirmer les détails.",
        orderNumber: "Numéro de commande",
        continueShopping: "Continuer les achats",
        backToHome: "Retour à l'accueil",
      },
    },
  },
  en: {
    legal: {
      pageTitle: "Legal notice",
      sections: {
        identity: "Company identity",
        registry: "Registration and legal information",
        directors: "Founders & Management",
        hosting: "Hosting",
        ip: "Intellectual property",
        data: "Data protection (GDPR)",
      },
      content: {
        companyType: "Legal form",
        companyName: "Company name",
        rcNumber: "Registry number",
        jurisdiction: "Jurisdiction",
        address: "Address",
        email: "Email",
        founders: "Founders",
        directors: "Management",
        host: "Host",
        hostDesc: "The site is hosted by Vercel.",
        ipDesc:
          "All content (texts, images, logos, trademarks) is protected by copyright and trademark laws. Any reproduction, representation or adaptation, in whole or in part, is prohibited without prior written authorization.",
        dataDesc:
          "Data is processed in accordance with the GDPR and applicable laws in Algeria. You have the right to access, rectify and delete your data by contacting us at the provided address.",
      },
    },

    about: {
      pageTitle: "About",
      sections: {
        mission: "Our mission",
        activities: "Our activities",
        values: "Our values",
        founders: "Founders",
      },
      content: {
        mission:
          "Provide lasting support to companies and individuals in Algeria and abroad through reliable administrative assistance and high‑performance digital solutions.",
        activities: {
          admin:
            "Administrative assistance (formalities, accounting, document management)",
          outsourcing: "Outsourcing and operational support",
          digital: "Design and development of digital solutions (web, apps)",
        },
        values:
          "High standards, transparency and service‑oriented culture. We focus on quality, efficiency and long‑term trust.",
      },
    },

    terms: {
      pageTitle: "Terms and Conditions (ToU/ToS)",
      sections: {
        purpose: "Purpose",
        services: "Services",
        responsibilities: "Responsibilities",
        payments: "Payments",
        ip: "Intellectual property",
        data: "Data protection",
        law: "Governing law & jurisdiction",
      },
      content: {
        purpose:
          "These terms govern the use of the website and the services provided by the company.",
        services:
          "Services include administrative assistance, outsourcing and digital development, as described on the website.",
        responsibilities:
          "The client agrees to provide accurate information. The company uses best efforts but cannot guarantee outcomes when dependent on third parties or legal obligations.",
        payments:
          "When payments apply, they are due according to the terms specified in the offer or quote. Late fees may apply in case of delay.",
        ip: "Content, trademarks and software remain the property of their owners. No rights are transferred without written agreement.",
        data: "Data is processed in accordance with the GDPR and Algerian laws. You may exercise your rights by contacting us by email.",
        law: "These terms are governed by Algerian law. The competent courts are those of Blida, Algeria.",
      },
    },
    confirmation: {
      title: "Purchase Confirmation",
      description: "Your purchase has been successfully confirmed.",
      successTitle: "Your purchase was successful",
      thankYouText: "Thank you for your order.",
      helpText:
        "If you have any questions or issues, please contact us — we’re here to help.",
      contactSupport: "Contact Support",
      viewOrder: "View My Order",
    },

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
      shop: "Shop",
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
    shop: {
      title: "Shop",
      subtitle:
        "Discover our services, training and templates to boost your digital presence.",
      searchPlaceholder: "Search products...",
      filterLabel: "Filter",
      clearFilters: "Clear filters",
      noResults: "No products found",
      searchResults: "Search results",
      noProductsFound: "No products match your criteria",
      viewAllProducts: "View all products",
      sortBy: "Sort by",
      sortOptions: {
        newest: "Newest",
        priceAsc: "Price: Low to High",
        priceDesc: "Price: High to Low",
        nameAsc: "Name: A-Z",
        nameDesc: "Name: Z-A",
      },
      searching: "Searching...",
      featuredTitle: "Featured Products",
      allProductsTitle: "All Products",
      inStockLabel: "In Stock",
      outOfStockLabel: "Out of Stock",
      backToShopLabel: "Back to Shop",
      guaranteeTitle: "Guarantee",
      guaranteeText: "Satisfied or refunded",
      deliveryTitle: "Delivery",
      deliveryText: "Free delivery",
      supportTitle: "Support",
      supportText: "24/7 Support",
      specificationsTitle: "Specifications",
      addToCartLabel: "Add to Cart",
      buyNowLabel: "Buy Now",
      added: "Added!",
      addMore: "Add more",
      redirecting: "Redirecting...",
      cart: {
        title: "Cart",
        empty: "Your cart is empty",
        emptyDescription: "Add products to your cart to continue.",
        backToShop: "Back to Shop",
        total: "Total",
        clear: "Clear",
        clearCart: "Clear cart",
        clearCartTitle: "Clear cart?",
        clearCartDescription:
          "This action will remove all items from your cart. This action cannot be undone.",
        cancel: "Cancel",
        checkout: "Checkout",
      },
      checkout: {
        title: "Order",
        empty: "Your cart is empty",
        emptyDescription: "Add products to your cart to continue.",
        backToShop: "Back to Shop",
        orderSummary: "Order Summary",
        directPurchase: "Direct Purchase",
        directPurchaseDescription: "You are purchasing this product directly",
        deliveryInfo: "Delivery Information",
        lastname: "Last Name",
        firstname: "First Name",
        email: "Email",
        confirmEmail: "Confirm your email",
        phone: "Phone",
        address: "Address",
        city: "City",
        postalCode: "Postal Code",
        message: "Message (optional)",
        processing: "Processing...",
        confirmOrder: "Confirm Order",
        emailMismatch: "Email addresses do not match",
        total: "Total",
      },
      orderSuccess: {
        title: "Order confirmed!",
        description:
          "Thank you for your order. We will contact you soon to confirm the details.",
        orderNumber: "Order number",
        continueShopping: "Continue shopping",
        backToHome: "Back to home",
      },
    },
  },
  ar: {
    legal: {
      pageTitle: "الإشعار القانوني",
      sections: {
        identity: "هوية الشركة",
        registry: "التسجيل والمعلومات القانونية",
        directors: "المؤسسون والإدارة",
        hosting: "الاستضافة",
        ip: "الملكية الفكرية",
        data: "حماية البيانات (GDPR)",
      },
      content: {
        companyType: "الشكل القانوني",
        companyName: "اسم الشركة",
        rcNumber: "رقم السجل",
        jurisdiction: "الاختصاص القضائي",
        address: "العنوان",
        email: "البريد الإلكتروني",
        founders: "المؤسسون",
        directors: "الإدارة",
        host: "المستضيف",
        hostDesc: "يتم استضافة الموقع بواسطة Vercel.",
        ipDesc:
          "جميع المحتويات (النصوص، الصور، الشعارات، العلامات التجارية) محمية بحقوق النشر والعلامات التجارية. يُحظر أي نسخ أو عرض أو اقتباس كليًا أو جزئيًا بدون إذن كتابي مسبق.",
        dataDesc:
          "تُعالج البيانات وفقًا للائحة العامة لحماية البيانات والقوانين المعمول بها في الجزائر. لديك الحق في الوصول إلى بياناتك وتصحيحها وحذفها عبر التواصل معنا على العنوان المذكور.",
      },
    },

    about: {
      pageTitle: "من نحن",
      sections: {
        mission: "مهمتنا",
        activities: "أنشطتنا",
        values: "قيمنا",
        founders: "المؤسسون",
      },
      content: {
        mission:
          "نرافق الأفراد والشركات في الجزائر وخارجها بدعم إداري موثوق وحلول رقمية عالية الأداء.",
        activities: {
          admin: "المساعدة الإدارية (إجراءات، محاسبة، إدارة الوثائق)",
          outsourcing: "الاستعانة بمصادر خارجية والدعم التشغيلي",
          digital: "تصميم وتطوير الحلول الرقمية (ويب، تطبيقات)",
        },
        values:
          "الجودة والشفافية وروح الخدمة. نركز على الكفاءة وبناء الثقة على المدى الطويل.",
      },
    },

    terms: {
      pageTitle: "الشروط والأحكام",
      sections: {
        purpose: "الغرض",
        services: "الخدمات",
        responsibilities: "المسؤوليات",
        payments: "المدفوعات",
        ip: "الملكية الفكرية",
        data: "حماية البيانات",
        law: "القانون المطبق والاختصاص القضائي",
      },
      content: {
        purpose: "تنظم هذه الشروط استخدام الموقع والخدمات المقدمة من الشركة.",
        services:
          "تشمل الخدمات المساعدة الإدارية، الاستعانة بمصادر خارجية، والتطوير الرقمي كما هو موضح في الموقع.",
        responsibilities:
          "يلتزم العميل بتقديم معلومات دقيقة. تبذل الشركة جهدها لكنها لا تضمن النتائج عندما تعتمد على أطراف ثالثة أو التزامات قانونية.",
        payments:
          "عند تطبيق المدفوعات، تكون مستحقة وفق الشروط المذكورة في العرض أو العرض المالي. قد تُطبق غرامات في حال التأخير.",
        ip: "تظل المحتويات والعلامات التجارية والبرمجيات ملكًا لأصحابها. لا يتم نقل أي حقوق بدون اتفاق كتابي.",
        data: "تُعالج البيانات وفقًا للائحة العامة لحماية البيانات والقوانين الجزائرية. يمكنك ممارسة حقوقك عبر التواصل معنا بالبريد الإلكتروني.",
        law: "تخضع هذه الشروط للقانون الجزائري. المحاكم المختصة هي محاكم ولاية البليدة، الجزائر.",
      },
    },
    confirmation: {
      title: "تأكيد الشراء",
      description: "تم تأكيد عملية الشراء بنجاح.",
      successTitle: "تمت عملية الشراء بنجاح",
      thankYouText: "شكرًا لشرائكم.",
      helpText:
        "في حال وجود أي سؤال أو مشكلة، يرجى التواصل معنا — نحن هنا لمساعدتكم.",
      contactSupport: "اتصل بالدعم",
      viewOrder: "عرض طلبي",
    },

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
      shop: "المتجر",
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
    shop: {
      title: "المتجر",
      subtitle: "اكتشف خدماتنا ودوراتنا وقوالبنا لتعزيز حضورك الرقمي.",
      searchPlaceholder: "البحث عن المنتجات...",
      filterLabel: "تصفية",
      clearFilters: "مسح المرشحات",
      noResults: "لم يتم العثور على منتجات",
      searchResults: "نتائج البحث",
      noProductsFound: "لا توجد منتجات تطابق معاييرك",
      viewAllProducts: "عرض جميع المنتجات",
      sortBy: "ترتيب حسب",
      sortOptions: {
        newest: "الأحدث",
        priceAsc: "السعر: من الأقل للأعلى",
        priceDesc: "السعر: من الأعلى للأقل",
        nameAsc: "الاسم: أ-ي",
        nameDesc: "الاسم: ي-أ",
      },
      searching: "جاري البحث...",
      featuredTitle: "المنتجات المميزة",
      allProductsTitle: "جميع المنتجات",
      inStockLabel: "متوفر",
      outOfStockLabel: "نفد المخزون",
      backToShopLabel: "العودة للمتجر",
      guaranteeTitle: "الضمان",
      guaranteeText: "مضمون أو استرداد",
      deliveryTitle: "التوصيل",
      deliveryText: "توصيل مجاني",
      supportTitle: "الدعم",
      supportText: "دعم 24/7",
      specificationsTitle: "المواصفات",
      addToCartLabel: "إضافة للسلة",
      buyNowLabel: "اشتري الآن",
      added: "تم الإضافة!",
      addMore: "إضافة المزيد",
      redirecting: "جاري التوجيه...",
      cart: {
        title: "السلة",
        empty: "سلة التسوق فارغة",
        emptyDescription: "أضف منتجات إلى سلة التسوق للمتابعة.",
        backToShop: "العودة للمتجر",
        total: "المجموع",
        clear: "إفراغ",
        clearCart: "إفراغ السلة",
        clearCartTitle: "إفراغ السلة؟",
        clearCartDescription:
          "هذا الإجراء سيزيل جميع العناصر من سلة التسوق. لا يمكن التراجع عن هذا الإجراء.",
        cancel: "إلغاء",
        checkout: "الدفع",
      },
      checkout: {
        title: "الطلب",
        empty: "سلة التسوق فارغة",
        emptyDescription: "أضف منتجات إلى سلة التسوق للمتابعة.",
        backToShop: "العودة للمتجر",
        orderSummary: "ملخص الطلب",
        directPurchase: "شراء مباشر",
        directPurchaseDescription: "أنت تشتري هذا المنتج مباشرة",
        deliveryInfo: "معلومات التسليم",
        lastname: "اللقب",
        firstname: "الاسم",
        email: "البريد الإلكتروني",
        confirmEmail: "تأكيد البريد الإلكتروني",
        phone: "الهاتف",
        address: "العنوان",
        city: "المدينة",
        postalCode: "الرمز البريدي",
        message: "رسالة (اختياري)",
        processing: "جاري المعالجة...",
        confirmOrder: "تأكيد الطلب",
        emailMismatch: "عنوان البريد الإلكتروني غير متطابق",
        total: "المجموع",
      },
      orderSuccess: {
        title: "تم تأكيد الطلب!",
        description: "شكراً لطلبك. سنتواصل معك قريباً لتأكيد التفاصيل.",
        orderNumber: "رقم الطلب",
        continueShopping: "متابعة التسوق",
        backToHome: "العودة للرئيسية",
      },
    },
  },
} as const;
