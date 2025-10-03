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

  const t = (translations as any)[locale];
  return {
    title: `${t.terms.pageTitle} - ${HANAE_INFO.name}`,
    description: t.metadata?.description ?? "",
    robots: "noindex",
    alternates: {
      canonical: `/${locale}/terms`,
    },
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const t = (translations as any)[locale];
  const T = t.terms;

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />

      <main className="flex-1">
        <section className="py-20">
          <div className="mx-auto px-4 container">
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-8 font-bold text-foreground text-4xl md:text-5xl">
                {T.pageTitle}
              </h1>

              <div className="max-w-none prose prose-lg">
                <section className="bg-muted/30 p-8 rounded-lg">
                  <h2 className="mb-4 font-semibold text-2xl">
                    {T.sections.purpose}
                  </h2>
                  <p className="text-muted-foreground">{T.content.purpose}</p>
                </section>

                <section className="bg-muted/30 mt-6 p-8 rounded-lg">
                  <h2 className="mb-4 font-semibold text-2xl">
                    {T.sections.services}
                  </h2>
                  <p className="text-muted-foreground">{T.content.services}</p>
                </section>

                <section className="bg-muted/30 mt-6 p-8 rounded-lg">
                  <h2 className="mb-4 font-semibold text-2xl">
                    {T.sections.responsibilities}
                  </h2>
                  <p className="text-muted-foreground">
                    {T.content.responsibilities}
                  </p>
                </section>

                <section className="bg-muted/30 mt-6 p-8 rounded-lg">
                  <h2 className="mb-4 font-semibold text-2xl">
                    {T.sections.payments}
                  </h2>
                  <p className="text-muted-foreground">{T.content.payments}</p>
                </section>

                <section className="bg-muted/30 mt-6 p-8 rounded-lg">
                  <h2 className="mb-4 font-semibold text-2xl">
                    {T.sections.ip}
                  </h2>
                  <p className="text-muted-foreground">{T.content.ip}</p>
                </section>

                <section className="bg-muted/30 mt-6 p-8 rounded-lg">
                  <h2 className="mb-4 font-semibold text-2xl">
                    {T.sections.data}
                  </h2>
                  <p className="text-muted-foreground">{T.content.data}</p>
                </section>

                <section className="bg-muted/30 mt-6 p-8 rounded-lg">
                  <h2 className="mb-4 font-semibold text-2xl">
                    {T.sections.law}
                  </h2>
                  <p className="text-muted-foreground">{T.content.law}</p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
