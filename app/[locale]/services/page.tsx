import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Megaphone, Calculator } from "lucide-react";
import { locales, Locale, translations } from "@/lib/i18n";
import { SERVICES } from "@/constants/database";
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
    title: `${t.services.title} - ${HANAE_INFO.name}`,
    description: t.services.subtitle,
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        fr: "/fr/services",
        en: "/en/services",
        ar: "/ar/services",
      },
    },
  };
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const t = translations[locale];

  const serviceIcons = {
    development: Code,
    design: Palette,
    marketing: Megaphone,
    administration: Calculator,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="mx-auto px-4 container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 font-bold text-foreground text-4xl md:text-5xl">
                {t.services.title}
              </h1>
              <p className="text-muted-foreground text-xl">
                {t.services.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Services Detail */}
        <section className="py-20">
          <div className="mx-auto px-4 container">
            <div className="space-y-20">
              {SERVICES.map((service, index) => {
                const Icon =
                  serviceIcons[service.id as keyof typeof serviceIcons];
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={service.id}
                    id={service.id}
                    className="scroll-mt-20"
                  >
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                        !isEven ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`space-y-6 ${!isEven ? "lg:order-2" : ""}`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-3 rounded-xl">
                            <Icon className="w-8 h-8 text-primary" />
                          </div>
                          <h2 className="font-bold text-foreground text-3xl">
                            {service.title}
                          </h2>
                        </div>

                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {service.description}
                        </p>

                        <div>
                          <h3 className="mb-4 font-semibold text-xl">
                            Nos prestations :
                          </h3>
                          <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                            {service.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-2"
                              >
                                <div className="bg-primary rounded-full w-2 h-2" />
                                <span className="text-muted-foreground">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className={!isEven ? "lg:order-1" : ""}>
                        <Card className="border-2 border-primary/10">
                          <CardHeader>
                            <CardTitle>Technologies & Outils</CardTitle>
                            <CardDescription>
                              Les technologies que nous maîtrisons
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            {service.technologies && (
                              <div className="space-y-4">
                                {Object.entries(service.technologies).map(
                                  ([category, techs]) => (
                                    <div key={category}>
                                      <h4 className="mb-2 font-medium capitalize">
                                        {category === "frontend"
                                          ? "Frontend"
                                          : category === "backend"
                                          ? "Backend"
                                          : category === "databases"
                                          ? "Bases de données"
                                          : category === "cms"
                                          ? "CMS"
                                          : category === "mobile"
                                          ? "Mobile"
                                          : category === "design"
                                          ? "Design"
                                          : category === "video"
                                          ? "Vidéo"
                                          : category === "animation"
                                          ? "Animation"
                                          : category === "prototyping"
                                          ? "Prototypage"
                                          : category}
                                      </h4>
                                      <div className="flex flex-wrap gap-2">
                                        {techs.map(
                                          (tech: string, techIdx: number) => (
                                            <Badge
                                              key={techIdx}
                                              variant="secondary"
                                            >
                                              {tech}
                                            </Badge>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            )}

                            {service.platforms && (
                              <div className="space-y-4">
                                <h4 className="font-medium">
                                  Plateformes publicitaires
                                </h4>
                                <div className="gap-3 grid grid-cols-2">
                                  {service.platforms.map((platform, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center space-x-2 bg-muted/50 p-2 rounded-lg"
                                    >
                                      <div className="bg-primary/10 rounded w-6 h-6" />
                                      <span className="font-medium text-sm">
                                        {platform.name}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {service.services && (
                              <div className="space-y-4">
                                <h4 className="font-medium">Services inclus</h4>
                                <div className="space-y-2">
                                  {service.services.map((serviceItem, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center space-x-2"
                                    >
                                      <div className="bg-primary rounded-full w-2 h-2" />
                                      <span className="text-muted-foreground text-sm">
                                        {serviceItem}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
