"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
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
import { useCart } from "@/contexts/cart-context";

interface OrderSummaryProps {
  locale: Locale;
}

export const LocaleOrderSummary: React.FC<OrderSummaryProps> = ({ locale }) => {
  const { state, removeFromCart, updateQuantity, clearCart, getTotalPrice } =
    useCart();

  const t = translations[locale];

  const getDisplayItems = () => {
    if (state.buyNowMode && state.buyNowProduct) {
      return [{ product: state.buyNowProduct, quantity: 1 }];
    }
    return state.items;
  };

  const displayItems = getDisplayItems();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
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
                  <AlertDialogCancel>{t.shop.cart.cancel}</AlertDialogCancel>
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
          <div key={item.product.id} className="flex items-center space-x-4">
            <div className="relative flex-shrink-0 rounded-md w-16 h-16 overflow-hidden">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{item.product.name}</h3>
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
                      handleQuantityChange(item.product.id, item.quantity - 1)
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
                      handleQuantityChange(item.product.id, item.quantity + 1)
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
          <span className="font-semibold text-lg">{t.shop.checkout.total}</span>
          <span className="font-bold text-primary text-2xl">
            {getTotalPrice()}€
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
