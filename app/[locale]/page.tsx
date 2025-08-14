import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import ServicesOverview from "@/components/sections/services-overview";
import PortfolioPreview from "@/components/sections/portfolio-preview";
import Testimonials from "@/components/sections/testimonials";
import CTA from "@/components/sections/cta";
import { locales, Locale, translations } from "@/lib/i18n";
import { HANAE_INFO } from "@/constants";

interface PageProps {
  params: { locale: Locale };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const t = translations[locale];

  return {
    title: `${HANAE_INFO.name} - ${t.metadata.title}`,
    description: t.metadata.description,
    icons: { icon: "/hanae-horizontal.png" },
    keywords: Array.from(HANAE_INFO.seo.keywords),
    authors: [{ name: HANAE_INFO.seo.author }],
    openGraph: {
      title: `${HANAE_INFO.name} - ${t.metadata.title}`,
      description: t.metadata.description,
      type: "website",
      locale: locale,
      siteName: HANAE_INFO.name,
      images: [
        {
          url: "/hanae-vertical.png",

          alt: "HANAE Logo Horizontal",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${HANAE_INFO.name} - ${t.metadata.title}`,
      description: t.metadata.description,
      images: "/hanae-vertical.png",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
        ar: "/ar",
      },
    },
  };
}

export default function HomePage({ params }: PageProps) {
  const { locale } = params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />

      <main className="flex-1">
        <Hero locale={locale} />
        <ServicesOverview locale={locale} />
        <PortfolioPreview locale={locale} />
        <Testimonials locale={locale} />
        <CTA locale={locale} />
      </main>

      <Footer locale={locale} />
    </div>
  );
}
