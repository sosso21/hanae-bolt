import { CheckoutForm } from "@/components/checkout/checkout-form";
import { Locale } from "@/lib/i18n";

interface CheckoutPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale } = await params;

  return (
    <div className="flex flex-col min-h-screen">
      <CheckoutForm locale={locale} />
    </div>
  );
}
