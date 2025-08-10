import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Megaphone, Calculator, ArrowRight } from "lucide-react";
import { translations, Locale } from "@/lib/i18n";
import { SERVICES } from "@/constants/database";

interface ServicesOverviewProps {
  locale: Locale;
}

export default function ServicesOverview({ locale }: ServicesOverviewProps) {
  const t = translations[locale];

  const serviceIcons = {
    development: Code,
    design: Palette,
    marketing: Megaphone,
    administration: Calculator,
  };

  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto px-4 container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-foreground text-3xl md:text-4xl">
            {t.services.title}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
            {t.services.subtitle}
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mb-12">
          {SERVICES.map((service) => {
            const Icon = serviceIcons[service.id as keyof typeof serviceIcons];
            return (
              <Card
                key={service.id}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-primary/10 group-hover:bg-primary/20 p-2 rounded-lg transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-medium">Points clés :</h4>
                      <ul className="gap-1 grid grid-cols-1 sm:grid-cols-2 text-muted-foreground text-sm">
                        {service.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <div className="bg-primary mr-2 rounded-full w-1 h-1" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {service.technologies && (
                      <div>
                        <h4 className="mb-2 font-medium">Technologies :</h4>
                        <div className="flex flex-wrap gap-1">
                          {Object.values(service.technologies)
                            .flat()
                            .slice(0, 6)
                            .map((tech, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href={`/${locale}/services`}>
              Découvrir tous nos services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
