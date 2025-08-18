import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { locales, Locale } from "@/lib/i18n";
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

  return {
    title: `Mentions légales - ${HANAE_INFO.name}`,
    description: "Mentions légales et informations juridiques de HANAE.",
    robots: "noindex",
    alternates: {
      canonical: `/${locale}/legal`,
    },
  };
}

export default async function LegalPage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const pageTitle = "Mentions légales";
  const legalInfoHeading = "Informations légales";
  const legalInfoPlaceholder =
    "Cette page sera enrichie avec les mentions légales complètes conformément à la réglementation en vigueur.";
  const labelCompany = "Raison sociale :";
  const labelSiret = "SIRET :";
  const labelTva = "TVA :";
  const labelDirector = "Directeur de publication :";
  const labelHost = "Hébergement :";

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />

      <main className="flex-1">
        <section className="py-20">
          <div className="mx-auto px-4 container">
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-8 font-bold text-foreground text-4xl md:text-5xl">
                {pageTitle}
              </h1>

              <div className="max-w-none prose prose-lg">
                <div className="bg-muted/30 p-8 rounded-lg">
                  <h2 className="mb-4 font-semibold text-2xl">
                    {legalInfoHeading}
                  </h2>
                  <p className="mb-4 text-muted-foreground">
                    {legalInfoPlaceholder}
                  </p>

                  <div className="space-y-4 text-sm">
                    <div>
                      <strong>{labelCompany}</strong>{" "}
                      {HANAE_INFO.legal.companyName}
                    </div>
                    <div>
                      <strong>{labelSiret}</strong> {HANAE_INFO.legal.siret}
                    </div>
                    <div>
                      <strong>{labelTva}</strong> {HANAE_INFO.legal.tva}
                    </div>
                    <div>
                      <strong>{labelDirector}</strong>{" "}
                      {HANAE_INFO.legal.director}
                    </div>
                    <div>
                      <strong>{labelHost}</strong> {HANAE_INFO.legal.host}
                    </div>
                  </div>
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
