"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { LocalizedProduct } from "@/constants/products";
import { Locale, translations } from "@/lib/i18n";

interface AddToCartButtonProps {
  product: LocalizedProduct;
  locale: Locale;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  quantity?: number;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  locale,
  className,
  size = "default",
  variant = "default",
  quantity = 1,
}) => {
  const { addToCart, state } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const t = translations[locale];

  const isInCart = state.items.some((item) => item.product.id === product.id);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={!product.inStock || isAdded}
      className={className}
      size={size}
      variant={variant}
    >
      {isAdded ? (
        <>
          <Check className="mr-2 w-4 h-4" />
          {t.shop.added}
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 w-4 h-4" />
          {isInCart ? t.shop.addMore : t.shop.addToCartLabel}
        </>
      )}
    </Button>
  );
};
