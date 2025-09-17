"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
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
import { ArrowLeft, Trash2, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { shopTranslations } from "@/constants/product-translations";
import { OrderSuccess } from "@/components/cart/order-success";

interface CheckoutPageProps {
  params: Promise<{ locale: Locale }>;
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale } = params;
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
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    message: "",
  });

  const shopT = shopTranslations[locale];

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
        <Header locale={locale} />
        <main className="flex flex-1 justify-center items-center">
          <div className="text-center">
            <h1 className="mb-4 font-bold text-2xl">
              {locale === "fr"
                ? "Votre panier est vide"
                : locale === "en"
                ? "Your cart is empty"
                : "سلة التسوق فارغة"}
            </h1>
            <Button asChild>
              <Link href={`/${locale}/shop`}>
                {locale === "fr"
                  ? "Continuer les achats"
                  : locale === "en"
                  ? "Continue shopping"
                  : "متابعة التسوق"}
              </Link>
            </Button>
          </div>
        </main>
        <Footer locale={locale} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />

      <main className="flex-1 py-8">
        <div className="mx-auto px-4 max-w-6xl container">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link
                href={`/${locale}/shop`}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {shopT.backToShopLabel}
              </Link>
            </Button>
          </div>

          <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>
                        {state.buyNowMode
                          ? locale === "fr"
                            ? "Achat direct"
                            : locale === "en"
                            ? "Direct Purchase"
                            : "شراء مباشر"
                          : locale === "fr"
                          ? "Résumé de la commande"
                          : locale === "en"
                          ? "Order Summary"
                          : "ملخص الطلب"}
                      </CardTitle>
                      {state.buyNowMode && (
                        <p className="mt-1 text-muted-foreground text-sm">
                          {locale === "fr"
                            ? "Vous achetez directement ce produit"
                            : locale === "en"
                            ? "You are purchasing this product directly"
                            : "أنت تشتري هذا المنتج مباشرة"}
                        </p>
                      )}
                    </div>
                    {!state.buyNowMode && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="mr-2 w-4 h-4" />
                            {locale === "fr"
                              ? "Vider"
                              : locale === "en"
                              ? "Clear"
                              : "إفراغ"}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {locale === "fr"
                                ? "Vider le panier ?"
                                : locale === "en"
                                ? "Clear cart?"
                                : "إفراغ السلة؟"}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {locale === "fr"
                                ? "Cette action supprimera tous les articles de votre panier. Cette action ne peut pas être annulée."
                                : locale === "en"
                                ? "This action will remove all items from your cart. This action cannot be undone."
                                : "هذا الإجراء سيزيل جميع العناصر من سلة التسوق. لا يمكن التراجع عن هذا الإجراء."}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>
                              {locale === "fr"
                                ? "Annuler"
                                : locale === "en"
                                ? "Cancel"
                                : "إلغاء"}
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={clearCart}>
                              {locale === "fr"
                                ? "Vider le panier"
                                : locale === "en"
                                ? "Clear cart"
                                : "إفراغ السلة"}
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

                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium text-sm">
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

                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>
                      {locale === "fr"
                        ? "Total"
                        : locale === "en"
                        ? "Total"
                        : "المجموع"}
                    </span>
                    <span>{getTotalPrice()}€</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Checkout Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {locale === "fr"
                      ? "Informations de livraison"
                      : locale === "en"
                      ? "Delivery Information"
                      : "معلومات التسليم"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                      <div>
                        <Label htmlFor="name">
                          {locale === "fr"
                            ? "Nom complet"
                            : locale === "en"
                            ? "Full Name"
                            : "الاسم الكامل"}{" "}
                          *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">
                          {locale === "fr"
                            ? "Email"
                            : locale === "en"
                            ? "Email"
                            : "البريد الإلكتروني"}{" "}
                          *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">
                        {locale === "fr"
                          ? "Téléphone"
                          : locale === "en"
                          ? "Phone"
                          : "الهاتف"}{" "}
                        *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">
                        {locale === "fr"
                          ? "Adresse"
                          : locale === "en"
                          ? "Address"
                          : "العنوان"}{" "}
                        *
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                      <div>
                        <Label htmlFor="city">
                          {locale === "fr"
                            ? "Ville"
                            : locale === "en"
                            ? "City"
                            : "المدينة"}{" "}
                          *
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">
                          {locale === "fr"
                            ? "Code postal"
                            : locale === "en"
                            ? "Postal Code"
                            : "الرمز البريدي"}{" "}
                          *
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

                    <div>
                      <Label htmlFor="message">
                        {locale === "fr"
                          ? "Message (optionnel)"
                          : locale === "en"
                          ? "Message (optional)"
                          : "رسالة (اختياري)"}
                      </Label>
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
                      disabled={isProcessing}
                    >
                      {isProcessing
                        ? locale === "fr"
                          ? "Traitement..."
                          : locale === "en"
                          ? "Processing..."
                          : "جاري المعالجة..."
                        : locale === "fr"
                        ? "Confirmer la commande"
                        : locale === "en"
                        ? "Confirm Order"
                        : "تأكيد الطلب"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
