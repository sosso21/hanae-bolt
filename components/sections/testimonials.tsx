import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { TESTIMONIALS } from "@/constants/database";

interface TestimonialsProps {
  locale: Locale;
}

export default function Testimonials({ locale }: TestimonialsProps) {
  const sectionTitle = "Ce que disent nos clients";
  const sectionSubtitle =
    "La satisfaction de nos clients est notre priorité absolue";
  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto px-4 container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-foreground text-3xl md:text-4xl">
            {sectionTitle}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
            {sectionSubtitle}
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="fill-yellow-400 w-5 h-5 text-yellow-400"
                    />
                  ))}
                </div>
                <blockquote className="mb-4 text-muted-foreground italic">
                  {testimonial.content}
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="flex justify-center items-center bg-primary/10 rounded-full w-10 h-10">
                    <span className="font-semibold text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
