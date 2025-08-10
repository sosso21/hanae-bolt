import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Palette, Megaphone, Calculator } from "lucide-react";
import { translations, Locale } from "@/lib/i18n";
import { CONTACT_FORM_URL } from "@/constants/database";

interface HeroProps {
  locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
  const t = translations[locale];

  const services = [
    { icon: Calculator, name: t.services.administration.title },
    { icon: Code, name: t.services.development.title },
    { icon: Palette, name: t.services.design.title },
    { icon: Megaphone, name: t.services.marketing.title },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 dark:from-blue-950/20 via-white dark:via-background to-teal-50 dark:to-teal-950/20" />
      <div className="top-0 right-0 absolute bg-gradient-to-l from-primary/5 to-transparent w-1/3 h-full" />

      <div className="relative mx-auto px-4 container">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          <h1 className="mb-6 font-bold text-foreground text-4xl md:text-6xl leading-tight">
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="mb-6 font-medium text-muted-foreground text-xl md:text-2xl">
            {t.hero.subtitle}
          </p>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-muted-foreground text-lg leading-relaxed">
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex sm:flex-row flex-col justify-center gap-4 mb-16">
            <Button size="lg" asChild className="px-8 py-3 text-lg">
              <Link href={`/${locale}/services`}>
                {t.hero.cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-8 py-3 text-lg"
            >
              <Link
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.hero.contact}
              </Link>
            </Button>
          </div>

          {/* Services Preview */}
          <div className="gap-6 grid grid-cols-2 md:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white/50 dark:bg-background/50 hover:shadow-lg backdrop-blur-sm p-6 border hover:border-primary/20 border-border/50 rounded-xl transition-all duration-300"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="bg-primary/10 group-hover:bg-primary/20 p-3 rounded-lg transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-medium text-sm text-center leading-snug">
                    {service.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
