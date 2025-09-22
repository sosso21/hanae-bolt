import { Locale } from "@/lib/i18n";
import { productTranslations, shopTranslations } from "./product-translations";

export interface Product {
  id: number;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  inStock: boolean;
  featured: boolean;
}

export interface LocalizedProduct extends Product {
  name: string;
  description: string;
  tags: string[];
  specifications?: Record<string, string>;
}

export const getProductCategories = (locale: Locale) =>
  [
    { id: "all", name: shopTranslations[locale].categories.all },
    { id: "services", name: shopTranslations[locale].categories.services },
    { id: "formations", name: shopTranslations[locale].categories.formations },
    { id: "templates", name: shopTranslations[locale].categories.templates },
    { id: "consulting", name: shopTranslations[locale].categories.consulting },
    {
      id: "merchandising",
      name: shopTranslations[locale].categories.merchandising,
    },
  ] as const;

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "site-web-vitrine",
    price: 899,
    originalPrice: 1299,
    image: "/images/products/site-vitrine.webp",
    images: [
      "/images/products/site-vitrine.webp",
      "/images/products/site-vitrine-2.webp",
      "/images/products/site-vitrine-3.webp",
    ],
    category: "services",
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    slug: "ecommerce-complet",
    price: 2499,
    originalPrice: 3499,
    image: "/images/products/ecommerce.webp",
    images: [
      "/images/products/ecommerce.webp",
      "/images/products/ecommerce-2.webp",
      "/images/products/ecommerce-3.webp",
    ],
    category: "services",
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    slug: "formation-react-nextjs",
    price: 599,
    image: "/images/products/formation-react.webp",
    images: [
      "/images/products/formation-react.webp",
      "/images/products/formation-react-2.webp",
    ],
    category: "formations",
    inStock: true,
    featured: false,
  },
  {
    id: 4,
    slug: "template-dashboard-admin",
    price: 149,
    originalPrice: 199,
    image: "/images/products/dashboard-template.webp",
    images: [
      "/images/products/dashboard-template.webp",
      "/images/products/dashboard-template-2.webp",
    ],
    category: "templates",
    inStock: true,
    featured: false,
  },
  {
    id: 5,
    slug: "audit-seo-complet",
    price: 299,
    image: "/images/products/audit-seo.webp",
    images: [
      "/images/products/audit-seo.webp",
      "/images/products/audit-seo-2.webp",
    ],
    category: "consulting",
    inStock: true,
    featured: true,
  },
  {
    id: 6,
    slug: "identite-visuelle-complete",
    price: 799,
    originalPrice: 999,
    image: "/images/products/identite-visuelle.webp",
    images: [
      "/images/products/identite-visuelle.webp",
      "/images/products/identite-visuelle-2.webp",
      "/images/products/identite-visuelle-3.webp",
    ],
    category: "services",
    inStock: true,
    featured: true,
  },
  // Nouveaux produits HANAE - T-shirts
  {
    id: 7,
    slug: "tshirt-hanae-classic",
    price: 29,
    originalPrice: 39,
    image: "/images/products/tshirt-classic.webp",
    images: [
      "/images/products/tshirt-classic.webp",
      "/images/products/tshirt-classic-2.webp",
      "/images/products/tshirt-classic-3.webp",
    ],
    category: "merchandising",
    inStock: true,
    featured: true,
  },
  {
    id: 8,
    slug: "tshirt-hanae-premium",
    price: 49,
    originalPrice: 59,
    image: "/images/products/tshirt-premium.webp",
    images: [
      "/images/products/tshirt-premium.webp",
      "/images/products/tshirt-premium-2.webp",
      "/images/products/tshirt-premium-3.webp",
    ],
    category: "merchandising",
    inStock: true,
    featured: false,
  },
  {
    id: 9,
    slug: "tshirt-hanae-limited",
    price: 79,
    image: "/images/products/tshirt-limited.webp",
    images: [
      "/images/products/tshirt-limited.webp",
      "/images/products/tshirt-limited-2.webp",
    ],
    category: "merchandising",
    inStock: true,
    featured: true,
  },
  // Nouveaux produits HANAE - Doudounes
  {
    id: 10,
    slug: "doudoune-hanae-urban",
    price: 129,
    originalPrice: 159,
    image: "/images/products/doudoune-urban.webp",
    images: [
      "/images/products/doudoune-urban.webp",
      "/images/products/doudoune-urban-2.webp",
      "/images/products/doudoune-urban-3.webp",
    ],
    category: "merchandising",
    inStock: true,
    featured: true,
  },
  {
    id: 11,
    slug: "doudoune-hanae-tech",
    price: 179,
    originalPrice: 199,
    image: "/images/products/doudoune-tech.webp",
    images: [
      "/images/products/doudoune-tech.webp",
      "/images/products/doudoune-tech-2.webp",
      "/images/products/doudoune-tech-3.webp",
    ],
    category: "merchandising",
    inStock: true,
    featured: false,
  },
  {
    id: 12,
    slug: "doudoune-hanae-premium",
    price: 249,
    image: "/images/products/doudoune-premium.webp",
    images: [
      "/images/products/doudoune-premium.webp",
      "/images/products/doudoune-premium-2.webp",
    ],
    category: "merchandising",
    inStock: true,
    featured: true,
  },
];

// Helper functions to get localized products
export const getLocalizedProduct = (
  product: Product,
  locale: Locale
): LocalizedProduct => {
  const translation = productTranslations[locale][product.slug];
  if (!translation) {
    throw new Error(
      `Translation not found for product ${product.slug} in locale ${locale}`
    );
  }

  return {
    ...product,
    name: translation.name,
    description: translation.description,
    tags: translation.tags,
    specifications: translation.specifications,
  };
};

export const getLocalizedProducts = (locale: Locale): LocalizedProduct[] =>
  PRODUCTS.map((product) => getLocalizedProduct(product, locale));

export const getFeaturedProducts = (locale: Locale) =>
  getLocalizedProducts(locale).filter((product) => product.featured);

export const getProductsByCategory = (category: string, locale: Locale) => {
  const products = getLocalizedProducts(locale);
  return category === "all"
    ? products
    : products.filter((product) => product.category === category);
};

export const getProductBySlug = (slug: string, locale: Locale) => {
  const product = PRODUCTS.find((product) => product.slug === slug);
  if (!product) return undefined;
  return getLocalizedProduct(product, locale);
};
