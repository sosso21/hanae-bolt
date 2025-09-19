import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { locales, Locale, translations } from "@/lib/i18n";
import { HANAE_INFO } from "@/constants";
import { ShopContent } from "./shop-content";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const t = translations[locale];

  return {
    title: `${t.shop.title} - ${HANAE_INFO.name}`,
    description: t.shop.subtitle,
    alternates: {
      canonical: `/${locale}/shop`,
      languages: {
        fr: "/fr/shop",
        en: "/en/shop",
        ar: "/ar/shop",
      },
    },
  };
}

export default async function ShopPage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopContent locale={locale} />
    </Suspense>
  );
}
