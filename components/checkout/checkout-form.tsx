"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, CreditCard, CheckCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Locale, translations } from "@/lib/i18n";
import { OrderSuccess } from "@/components/cart/order-success";
import Image from "next/image";

interface CheckoutFormProps {
  locale: Locale;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ locale }) => {
  const {
    state,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    exitBuyNowMode,
  } = useCart();
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

  const t = translations[locale];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    if (formData.email !== formData.confirmEmail) {
      alert(t.shop.checkout.emailMismatch);
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear cart and show success
    clearCart();
    exitBuyNowMode();
    setIsOrderComplete(true);
    setIsProcessing(false);
  };

  // Get items to display (either cart items or buy now product)
  const getDisplayItems = () => {
    if (state.buyNowMode && state.buyNowProduct) {
      return [{ product: state.buyNowProduct, quantity: 1 }];
    }
    return state.items;
  };

  const displayItems = getDisplayItems();

  // Show success page if order is complete
  if (isOrderComplete) {
    return <OrderSuccess locale={locale} />;
  }

  if (displayItems.length === 0) {
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
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>
                        {state.buyNowMode
                          ? t.shop.checkout.directPurchase
                          : t.shop.checkout.orderSummary}
                      </CardTitle>
                      {state.buyNowMode && (
                        <p className="mt-1 text-muted-foreground text-sm">
                          {t.shop.checkout.directPurchaseDescription}
                        </p>
                      )}
                    </div>
                    {!state.buyNowMode && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="mr-2 w-4 h-4" />
                            {t.shop.cart.clear}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {t.shop.cart.clearCartTitle}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {t.shop.cart.clearCartDescription}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>
                              {t.shop.cart.cancel}
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={clearCart}>
                              {t.shop.cart.clearCart}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {displayItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center space-x-4"
                    >
                      <div className="relative flex-shrink-0 rounded-md w-16 h-16 overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {item.product.price}€
                        </p>

                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-6 h-6"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              disabled={state.buyNowMode}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-sm text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-6 h-6"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              disabled={state.buyNowMode}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-6 h-6 text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.product.id)}
                            disabled={state.buyNowMode}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-medium">
                          {item.product.price * item.quantity}€
                        </p>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">
                      {t.shop.checkout.total}
                    </span>
                    <span className="font-bold text-primary text-2xl">
                      {getTotalPrice()}€
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

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
