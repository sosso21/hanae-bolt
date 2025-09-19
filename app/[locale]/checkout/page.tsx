import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { locales, Locale, translations } from "@/lib/i18n";
import { HANAE_INFO } from "@/constants";

interface CheckoutPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: CheckoutPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const t = translations[locale];

  return {
    title: `${t.shop.checkout.title} - ${HANAE_INFO.name}`,
    description: t.shop.checkout.emptyDescription,
    alternates: {
      canonical: `/${locale}/checkout`,
      languages: {
        fr: "/fr/checkout",
        en: "/en/checkout",
        ar: "/ar/checkout",
      },
    },
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <CheckoutForm locale={locale} />
    </div>
  );
}
