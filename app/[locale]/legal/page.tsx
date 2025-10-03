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
    title: `${t.legal.pageTitle} - ${HANAE_INFO.name}`,
    description: t.metadata?.description ?? "",
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

  const t = (translations as any)[locale];
  const L = t.legal;

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />

      <main className="flex-1">
        <section className="py-20">
          <div className="mx-auto px-4 container">
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-8 font-bold text-foreground text-4xl md:text-5xl">
                {L.pageTitle}
              </h1>

              <div className="max-w-none prose prose-lg">
                <div className="bg-muted/30 p-8 rounded-lg">
                  <h2 className="mb-4 font-semibold text-2xl">
                    {L.sections.identity}
                  </h2>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>{L.content.companyName}:</strong>{" "}
                      {HANAE_INFO.legal.companyName}
                    </div>
                    <div>
                      <strong>{L.content.companyType}:</strong>{" "}
                      {HANAE_INFO.legal.companyType}
                    </div>
                    <div>
                      <strong>{L.content.address}:</strong>{" "}
                      {HANAE_INFO.contact.address.street},{" "}
                      {HANAE_INFO.contact.address.city}{" "}
                      {HANAE_INFO.contact.address.postalCode},{" "}
                      {HANAE_INFO.contact.address.country}
                    </div>
                    <div>
                      <strong>{L.content.email}:</strong>{" "}
                      {HANAE_INFO.legal.contactEmail}
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 mt-6 p-8 rounded-lg">
                  <h2 className="mb-4 font-semibold text-2xl">
                    {L.sections.registry}
                  </h2>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>{L.content.rcNumber}:</strong>{" "}
                      {HANAE_INFO.legal.rcNumber}
                    </div>
                    <div>
                      <strong>{L.content.jurisdiction}:</strong>{" "}
                      {HANAE_INFO.legal.jurisdiction}
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 mt-6 p-8 rounded-lg">
                  <h2 className="mb-4 font-semibold text-2xl">
                    {L.sections.directors}
                  </h2>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>{L.content.founders}:</strong>{" "}
                      {HANAE_INFO.legal.founders?.join(", ")}
                    </div>
                    <div>
                      <strong>{L.content.directors}:</strong>{" "}
                      {HANAE_INFO.legal.directors?.join(", ")}
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 mt-6 p-8 rounded-lg">
                  <h2 className="mb-4 font-semibold text-2xl">
                    {L.sections.hosting}
                  </h2>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>{L.content.host}:</strong> {HANAE_INFO.legal.host}
                    </div>
                    <p className="text-muted-foreground">
                      {L.content.hostDesc}
                    </p>
                  </div>
                </div>

                <div className="bg-muted/30 mt-6 p-8 rounded-lg">
                  <h2 className="mb-4 font-semibold text-2xl">
                    {L.sections.ip}
                  </h2>
                  <p className="text-muted-foreground">{L.content.ipDesc}</p>
                </div>

                <div className="bg-muted/30 mt-6 p-8 rounded-lg">
                  <h2 className="mb-4 font-semibold text-2xl">
                    {L.sections.data}
                  </h2>
                  <p className="text-muted-foreground">{L.content.dataDesc}</p>
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
