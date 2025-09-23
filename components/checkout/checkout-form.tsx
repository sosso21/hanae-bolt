"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, CheckCircle } from "lucide-react";
import { Locale, translations } from "@/lib/i18n";
import { OrderSuccess } from "@/components/cart/order-success";
import { useQueryStates, parseAsInteger } from "nuqs";
import { LocaleOrderSummary } from "./locale-order-summary";

const searchParams = {
  order: parseAsInteger,
  amount: parseAsInteger,
};

interface CheckoutFormProps {
  locale: Locale;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ locale }) => {
  const { state, clearCart, exitBuyNowMode } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    confirmEmail: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    message: "",
  });

  const [{ order, amount }] = useQueryStates(searchParams);
  const t = translations[locale];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.email !== formData.confirmEmail) {
      alert(t.shop.checkout.emailMismatch);
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    exitBuyNowMode();
    setIsOrderComplete(true);
    setIsProcessing(false);
  };

  const getDisplayItems = () => {
    if (state.buyNowMode && state.buyNowProduct) {
      return [{ product: state.buyNowProduct, quantity: 1 }];
    }
    return state.items;
  };

  const displayItems = getDisplayItems();

  if (isOrderComplete) {
    return <OrderSuccess locale={locale} />;
  }

  if (displayItems.length === 0 && order === null) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex flex-1 justify-center items-center">
          <div className="text-center">
            <h1 className="mb-4 font-bold text-2xl">{t.shop.checkout.empty}</h1>
            <p className="text-muted-foreground">
              {t.shop.checkout.emptyDescription}
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8">
        <div className="mx-auto px-4 max-w-6xl container">
          {(order !== null || amount !== null) && (
            <div className="bg-muted mb-6 p-4 rounded-lg">
              <h3 className="mb-2 font-semibold">URL Parameters:</h3>
              <pre className="text-sm">
                {JSON.stringify({ order, amount }, null, 2)}
              </pre>
            </div>
          )}

          <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
            {/* ✅ locale order summary extrait dans un composant */}
            {!!order ? (
              <div className="space-y-6">{/*    not ready  */}</div>
            ) : (
              <div className="space-y-6">
                <LocaleOrderSummary locale={locale} />
              </div>
            )}

            {/* Checkout Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.shop.checkout.deliveryInfo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="lastname">
                          {t.shop.checkout.lastname}
                        </Label>
                        <Input
                          id="lastname"
                          name="lastname"
                          value={formData.lastname}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="firstname">
                          {t.shop.checkout.firstname}
                        </Label>
                        <Input
                          id="firstname"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t.shop.checkout.email}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmEmail">
                        {t.shop.checkout.confirmEmail}
                      </Label>
                      <Input
                        id="confirmEmail"
                        name="confirmEmail"
                        type="email"
                        value={formData.confirmEmail}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.shop.checkout.phone}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">{t.shop.checkout.address}</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="city">{t.shop.checkout.city}</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode">
                          {t.shop.checkout.postalCode}
                        </Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t.shop.checkout.message}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <CheckCircle className="mr-2 w-4 h-4 animate-spin" />
                          {t.shop.checkout.processing}
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 w-4 h-4" />
                          {t.shop.checkout.confirmOrder}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
