import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Palette,
} from "lucide-react";
import { HANAE_INFO } from "@/constants";
import { translations, Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = translations[locale];
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    github: Github,
    behance: Palette,
  };

  return (
    <footer className="bg-background border-t">
      <div className="mx-auto px-4 py-12 container">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex justify-center items-center bg-primary rounded-lg w-8 h-8">
                <span className="font-bold text-primary-foreground text-lg">
                  W
                </span>
              </div>
              <span className="font-bold text-xl">{HANAE_INFO.name}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex space-x-3">
              {Object.entries(HANAE_INFO.social).map(([platform, url]) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                return (
                  <Link
                    key={platform}
                    href={url}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`Follow us on ${platform}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/portfolio`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t.nav.portfolio}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-semibold">{t.footer.services}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/services#development`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t.services.development.title}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/services#design`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t.services.design.title}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/services#marketing`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t.services.marketing.title}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/services#accounting`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {t.services.accounting.title}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold">{t.nav.contact}</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>{HANAE_INFO.contact.email}</p>
              <p>{HANAE_INFO.contact.phone}</p>
              <p>
                {HANAE_INFO.contact.address.street}
                <br />
                {HANAE_INFO.contact.address.postalCode}{" "}
                {HANAE_INFO.contact.address.city}
              </p>
              <p className="mt-4">
                <strong>Horaires:</strong>
                <br />
                {HANAE_INFO.hours.weekdays}
                <br />
                Weekend: {HANAE_INFO.hours.weekend}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex md:flex-row flex-col justify-between items-center space-y-4 md:space-y-0 mt-8 pt-8 border-t">
          <p className="text-muted-foreground text-sm">
            © {currentYear} {HANAE_INFO.name}. Tous droits réservés.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link
              href={`/${locale}/legal`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.footer.legal}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
