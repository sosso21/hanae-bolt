import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";
import { locales, Locale, translations } from "@/lib/i18n";
import { HANAE_INFO } from "@/constants";
import { CONTACT_FORM_URL } from "@/constants/database";

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
    title: `${t.nav.contact} - ${HANAE_INFO.name}`,
    description:
      "Contactez HANAE pour vos projets digitaux. Développement, design, marketing et gestion d'entreprise.",
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        fr: "/fr/contact",
        en: "/en/contact",
        ar: "/ar/contact",
      },
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const t = translations[locale];

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: HANAE_INFO.contact.email,
      href: `mailto:${HANAE_INFO.contact.email}`,
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: HANAE_INFO.contact.phone,
      href: `tel:${HANAE_INFO.contact.phone}`,
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: `${HANAE_INFO.contact.address.street}, ${HANAE_INFO.contact.address.postalCode} ${HANAE_INFO.contact.address.city}`,
      href: `https://maps.google.com/?q=${encodeURIComponent(
        HANAE_INFO.contact.address.street +
          ", " +
          HANAE_INFO.contact.address.city
      )}`,
    },
    {
      icon: Clock,
      label: "Horaires",
      value: `${HANAE_INFO.hours.weekdays} • Weekend: ${HANAE_INFO.hours.weekend}`,
      href: null,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="mx-auto px-4 container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 font-bold text-foreground text-4xl md:text-5xl">
                {t.contact.title}
              </h1>
              <p className="mb-8 text-muted-foreground text-xl">
                {t.contact.subtitle}
              </p>

              <Button size="lg" asChild className="px-8 py-3 text-lg">
                <Link
                  href={CONTACT_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  {t.contact.cta}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20">
          <div className="mx-auto px-4 container">
            <div className="mx-auto max-w-4xl">
              <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{info.label}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {info.href ? (
                        <Link
                          href={info.href}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          target={
                            info.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            info.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {info.value}
                        </Link>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Additional CTA */}
              <div className="mt-16 text-center">
                <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Prêt à démarrer votre projet ?
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Parlons de vos besoins et découvrons comment nous pouvons
                      vous aider
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="lg" asChild>
                      <Link
                        href={CONTACT_FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Obtenir un devis gratuit
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
