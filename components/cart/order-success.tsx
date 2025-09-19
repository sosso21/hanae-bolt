"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Locale, translations } from "@/lib/i18n";

interface OrderSuccessProps {
  locale: Locale;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({ locale }) => {
  const { getTotalItems } = useCart();
  const [orderNumber, setOrderNumber] = useState<string>("");
  const t = translations[locale];

  useEffect(() => {
    // Generate a random order number
    const orderNum = `ORD-${Date.now().toString().slice(-6)}`;
    setOrderNumber(orderNum);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 justify-center items-center py-8">
        <div className="mx-auto px-4 max-w-md container">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center items-center bg-green-100 mx-auto mb-4 rounded-full w-16 h-16">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">
                {t.shop.orderSuccess.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {t.shop.orderSuccess.description}
              </p>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="mb-1 text-muted-foreground text-sm">
                  {t.shop.orderSuccess.orderNumber}
                </p>
                <p className="font-mono font-bold text-lg">{orderNumber}</p>
              </div>

              <div className="flex sm:flex-row flex-col gap-3">
                <Button asChild className="flex-1">
                  <Link href={`/${locale}/shop`}>
                    <ShoppingBag className="mr-2 w-4 h-4" />
                    {t.shop.orderSuccess.continueShopping}
                  </Link>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link href={`/${locale}`}>
                    {t.shop.orderSuccess.backToHome}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
