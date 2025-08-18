import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { locales, Locale, translations } from "@/lib/i18n";
import { HANAE_INFO } from "@/constants";

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
    title: `${t.nav.about} - ${HANAE_INFO.name}`,
    description:
      "Découvrez l'histoire et les valeurs de HANAE, votre agence web multi-services.",
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        fr: "/fr/about",
        en: "/en/about",
        ar: "/ar/about",
      },
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const t = translations[locale];

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />

      <main className="flex-1">
        <section className="py-20">
          <div className="mx-auto px-4 container">
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-8 font-bold text-foreground text-4xl md:text-5xl">
                À propos de nous
              </h1>

              <div className="max-w-none prose prose-lg">
                <p className="mb-8 text-muted-foreground text-xl leading-relaxed">
                  Cette page sera prochainement enrichie avec le contenu
                  détaillé sur l'histoire, les valeurs et l'équipe de HANAE.
                </p>

                <div className="bg-muted/30 p-8 rounded-lg">
                  <h2 className="mb-4 font-semibold text-2xl">
                    En attendant...
                  </h2>
                  <p className="text-muted-foreground">
                    HANAE est une agence web multi-services passionnée par
                    l'innovation digitale. Nous accompagnons nos clients dans
                    leurs projets de développement, design, marketing digital et
                    gestion d'entreprise.
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
