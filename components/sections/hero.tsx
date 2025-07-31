import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Palette, Megaphone, Calculator } from 'lucide-react';
import { translations, Locale } from '@/lib/i18n';
import { CONTACT_FORM_URL } from '@/constants/database';

interface HeroProps {
  locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
  const t = translations[locale];

  const services = [
    { icon: Code, name: t.services.development.title },
    { icon: Palette, name: t.services.design.title },
    { icon: Megaphone, name: t.services.marketing.title },
    { icon: Calculator, name: t.services.accounting.title },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-blue-950/20 dark:via-background dark:to-teal-950/20" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t.hero.title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium">
            {t.hero.subtitle}
          </p>
          
          {/* Description */}
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" asChild className="text-lg px-8 py-3">
              <Link href={`/${locale}/services`}>
                {t.hero.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3">
              <Link href={CONTACT_FORM_URL} target="_blank" rel="noopener noreferrer">
                {t.hero.contact}
              </Link>
            </Button>
          </div>

          {/* Services Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group p-6 rounded-xl bg-white/50 dark:bg-background/50 border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-center leading-snug">
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