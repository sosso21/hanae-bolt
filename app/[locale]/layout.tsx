import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { locales, Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import "@/app/globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = params;

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
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
