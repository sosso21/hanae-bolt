import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { PRODUCTS } from "@/constants/products";

export const dynamic = "force-static";

const staticPaths = [
  "",
  "services",
  "portfolio",
  "contact",
  "shop",
  ...PRODUCTS.map((product) => `shop/${product.slug}`),
];

const excludedPaths = ["about", "legal", "terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (
    process.env.NEXT_PUBLIC_BASE_URL || "https://hanae-agency.com"
  ).replace(/\/$/, "");

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      const localizedPath = path ? `/${locale}/${path}` : `/${locale}`;
      entries.push({
        url: `${baseUrl}${localizedPath}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: localizedPath === `/${locale}` ? 1 : 0.7,
      });
    }
  }

  // EXCLUDED PATHS (not indexed)
  for (const locale of locales) {
    for (const path of excludedPaths) {
      const localizedPath = `/${locale}/${path}`;
      entries.push({
        url: `${baseUrl}${localizedPath}`,
        lastModified: new Date(),
        changeFrequency: "never",
        priority: 0,
      });
    }
  }

  return entries;
}
