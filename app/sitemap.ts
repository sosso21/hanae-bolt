import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

export const dynamic = "force-static";

const staticPaths = [
  "",
  "about",
  "services",
  "portfolio",
  "contact",
  "legal",
  "terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://hanae-agency.com"
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

  return entries;
}
