import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { locales, Locale, translations } from "@/lib/i18n";

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
    title: `${t.confirmation.title}`,
    description: t.confirmation.description,
    alternates: {
      canonical: `/${locale}/confirmation`,
    },
  };
}

export default async function ConfirmationPage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const t = translations[locale];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="mx-auto px-4 py-16 max-w-2xl container">
          {/* Back to Shop */}

          <Card className="shadow-lg p-10 rounded-2xl text-center">
            <CardHeader className="flex flex-col items-center space-y-4">
              <div className="flex justify-center items-center rounded-full w-20 h-20">
                <Check className="w-10 h-10 text-muted" />
              </div>
              <CardTitle className="font-bold text-2xl">
                {t.confirmation.successTitle}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-6 text-muted-foreground text-lg">
                {t.confirmation.thankYouText}
              </p>

              <p className="mb-6 text-sm">{t.confirmation.helpText}</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
