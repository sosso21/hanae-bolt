import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { locales, Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { CartProvider } from "@/contexts/cart-context";
import { CartDropdown } from "@/components/cart/cart-dropdown";
import { NuqsProvider } from "@/components/providers/nuqs-provider";
import "@/app/globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body style={{ fontFamily: "system-ui, sans-serif" }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsProvider>
            <CartProvider locale={locale}>
              <NuqsAdapter>{children}</NuqsAdapter>
              <CartDropdown locale={locale} />
              <Toaster />
            </CartProvider>
          </NuqsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
