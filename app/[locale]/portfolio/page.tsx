import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar } from "lucide-react";
import { locales, Locale, translations } from "@/lib/i18n";
import { PORTFOLIO } from "@/constants/database";
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
    title: `${t.portfolio.title} - ${HANAE_INFO.name}`,
    description: t.portfolio.subtitle,
    alternates: {
      canonical: `/${locale}/portfolio`,
      languages: {
        fr: "/fr/portfolio",
        en: "/en/portfolio",
        ar: "/ar/portfolio",
      },
    },
  };
}

export default async function PortfolioPage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const t = translations[locale];

  const categories = [
    "all",
    ...Array.from(new Set(PORTFOLIO.map((p) => p.category))),
  ];
  const categoryLabels: Record<string, string> = {
    all: t.portfolio.allCategories,
    development: "Développement",
    design: "Design",
    marketing: "Marketing",
    administration: "Administration",
  };
  const loadMoreLabel = "Charger plus de projets";

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="mx-auto px-4 container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 font-bold text-foreground text-4xl md:text-5xl">
                {t.portfolio.title}
              </h1>
              <p className="text-muted-foreground text-xl">
                {t.portfolio.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20">
          <div className="mx-auto px-4 container">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {categoryLabels[category] || category}
                </Badge>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {PORTFOLIO.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-lg overflow-hidden transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors" />

                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col justify-between opacity-0 group-hover:opacity-100 p-4 transition-opacity">
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary">
                          {categoryLabels[project.category] || project.category}
                        </Badge>
                        <div className="flex items-center space-x-1 text-white text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{project.year}</span>
                        </div>
                      </div>

                      <div className="text-center">
                        <Button variant="secondary" size="sm" asChild>
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 w-4 h-4" />
                            {t.portfolio.viewProject}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold group-hover:text-primary text-xl transition-colors">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                {loadMoreLabel}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
