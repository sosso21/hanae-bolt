import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { locales, Locale } from "@/lib/i18n";
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

  return {
    title: `Conditions générales - ${HANAE_INFO.name}`,
    description: "Conditions générales d'utilisation et de vente de HANAE.",
    robots: "noindex",
    alternates: {
      canonical: `/${locale}/terms`,
    },
  };
}

export default function TermsPage({ params }: PageProps) {
  const { locale } = params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />

      <main className="flex-1">
        <section className="py-20">
          <div className="mx-auto px-4 container">
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-8 font-bold text-foreground text-4xl md:text-5xl">
                Conditions générales
              </h1>

              <div className="max-w-none prose prose-lg">
                <div className="bg-muted/30 p-8 rounded-lg">
                  <h2 className="mb-4 font-semibold text-2xl">
                    Conditions générales et mentions légales
                  </h2>
                  <p className="text-muted-foreground">
                    Cette page sera prochainement enrichie avec les conditions
                    générales d'utilisation et de vente détaillées.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
