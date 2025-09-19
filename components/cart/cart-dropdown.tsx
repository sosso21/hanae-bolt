"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Minus, Plus, Trash2, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Locale, translations } from "@/lib/i18n";

interface CartDropdownProps {
  locale: Locale;
}

export const CartDropdown: React.FC<CartDropdownProps> = ({ locale }) => {
  const {
    state,
    removeFromCart,
    updateQuantity,
    clearCart,
    closeCart,
    getTotalPrice,
  } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const t = translations[locale];

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: number) => {
    setIsAnimating(true);
    removeFromCart(productId);
    setTimeout(() => setIsAnimating(false), 200);
  };

  if (!state.isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 bg-black/50" onClick={closeCart}>
      <div
        className="top-0 right-0 fixed bg-background shadow-lg w-full max-w-md h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold text-lg">{t.shop.cart.title}</h2>
            <Button variant="ghost" size="icon" onClick={closeCart}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <ScrollArea className="flex-1 p-4">
            {state.items.length === 0 ? (
              <div className="flex flex-col justify-center items-center py-12 text-center">
                <ShoppingCart className="mb-4 w-12 h-12 text-muted-foreground" />
                <p className="mb-4 text-muted-foreground">
                  {t.shop.cart.empty}
                </p>
                <Button asChild onClick={closeCart}>
                  <Link href={`/${locale}/shop`}>{t.shop.addToCartLabel}</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.product.id}
                    className={`flex items-center space-x-4 rounded-lg border p-3 transition-all ${
                      isAnimating ? "opacity-50 scale-95" : ""
                    }`}
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
                      <h3 className="font-medium text-sm line-clamp-2">
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
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-6 h-6 text-destructive hover:text-destructive"
                          onClick={() => handleRemoveItem(item.product.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="space-y-4 p-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">
                  {t.shop.cart.total}
                </span>
                <span className="font-bold text-primary text-lg">
                  {getTotalPrice()}€
                </span>
              </div>

              <div className="flex space-x-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      {t.shop.cart.clearCart}
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
                <Button className="flex-1" asChild>
                  <Link href={`/${locale}/checkout`}>
                    {t.shop.cart.checkout}
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
