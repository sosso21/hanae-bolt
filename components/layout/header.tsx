"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Monitor, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HANAE_INFO } from "@/constants";
import { translations, Locale, LANGUAGES } from "@/lib/i18n";

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = translations[locale];

  const navigation = [
    { name: t.nav.home, href: `/${locale}` },
    { name: t.nav.services, href: `/${locale}/services` },
    { name: t.nav.portfolio, href: `/${locale}/portfolio` },
    { name: t.nav.about, href: `/${locale}/about` },
    { name: t.nav.contact, href: `/${locale}/contact` },
  ];

  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  };

  const ThemeIcon = themeIcons[theme as keyof typeof themeIcons] || Monitor;

  return (
    <header className="top-0 z-50 sticky bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur border-b w-full">
      <div className="mx-auto px-4 container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center space-x-2"
            aria-label={`${HANAE_INFO.name} - ${t.nav.home}`}
          >
            <div className="flex justify-center items-center bg-primary rounded-lg w-8 h-8">
              <span className="font-bold text-primary-foreground text-lg">
                W
              </span>
            </div>
            <span className="font-bold text-foreground text-xl">
              {HANAE_INFO.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-6"
            role="navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-1"
                aria-label="Select language"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{LANGUAGES[locale]}</span>
              </Button>

              {isLangOpen && (
                <div className="right-0 z-50 absolute bg-background shadow-lg mt-2 border rounded-md w-32">
                  {Object.entries(LANGUAGES).map(([code, name]) => (
                    <Link
                      key={code}
                      href={`/${code}`}
                      className="block hover:bg-accent px-3 py-2 text-sm hover:text-accent-foreground"
                      onClick={() => setIsLangOpen(false)}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const themes = ["light", "dark", "system"];
                const currentIndex = themes.indexOf(theme || "system");
                const nextTheme = themes[(currentIndex + 1) % themes.length];
                setTheme(nextTheme);
              }}
              aria-label="Toggle theme"
            >
              <ThemeIcon className="w-4 h-4" />
            </Button>

            {/* Contact Button */}
            <Button asChild>
              <Link href={`/${locale}/contact`}>{t.nav.contact}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <nav className="flex flex-col space-y-1 p-4" role="navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-2 py-3 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center space-x-2">
                  {Object.entries(LANGUAGES).map(([code, name]) => (
                    <Link
                      key={code}
                      href={`/${code}`}
                      className={`px-2 py-1 text-sm rounded ${
                        code === locale
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {name}
                    </Link>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const themes = ["light", "dark", "system"];
                    const currentIndex = themes.indexOf(theme || "system");
                    const nextTheme =
                      themes[(currentIndex + 1) % themes.length];
                    setTheme(nextTheme);
                  }}
                >
                  <ThemeIcon className="w-4 h-4" />
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
