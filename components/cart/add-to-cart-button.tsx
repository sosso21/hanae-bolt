"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { LocalizedProduct } from "@/constants/products";
import { Locale } from "@/lib/i18n";
import { shopTranslations } from "@/constants/product-translations";

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
  const shopT = shopTranslations[locale];

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
          {locale === "fr"
            ? "Ajouté !"
            : locale === "en"
            ? "Added!"
            : "تم الإضافة!"}
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 w-4 h-4" />
          {isInCart
            ? locale === "fr"
              ? "Ajouter encore"
              : locale === "en"
              ? "Add more"
              : "إضافة المزيد"
            : shopT.addToCartLabel}
        </>
      )}
    </Button>
  );
};
