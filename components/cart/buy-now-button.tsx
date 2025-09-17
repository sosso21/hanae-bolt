"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Check } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { LocalizedProduct } from "@/constants/products";
import { Locale } from "@/lib/i18n";
import { shopTranslations } from "@/constants/product-translations";
import { useRouter } from "next/navigation";

interface BuyNowButtonProps {
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

export const BuyNowButton: React.FC<BuyNowButtonProps> = ({
  product,
  locale,
  className,
  size = "default",
  variant = "outline",
  quantity = 1,
}) => {
  const { addToCart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const shopT = shopTranslations[locale];

  const handleBuyNow = async () => {
    setIsProcessing(true);

    // Clear existing cart and add only this product
    clearCart();
    addToCart(product, quantity);

    // Simulate a brief processing time
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Redirect to checkout
    router.push(`/${locale}/checkout`);

    setIsProcessing(false);
  };

  return (
    <Button
      onClick={handleBuyNow}
      disabled={!product.inStock || isProcessing}
      className={className}
      size={size}
      variant={variant}
    >
      {isProcessing ? (
        <>
          <Check className="mr-2 w-4 h-4" />
          {locale === "fr"
            ? "Redirection..."
            : locale === "en"
            ? "Redirecting..."
            : "جاري التوجيه..."}
        </>
      ) : (
        <>
          <CreditCard className="mr-2 w-4 h-4" />
          {shopT.buyNowLabel}
        </>
      )}
    </Button>
  );
};
