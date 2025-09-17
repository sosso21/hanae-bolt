import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { Locale } from "@/lib/i18n";

interface CheckoutPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale } = await params;

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />
      <CheckoutForm locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
