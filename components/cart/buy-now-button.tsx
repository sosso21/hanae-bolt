"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Check } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { LocalizedProduct } from "@/constants/products";
import { Locale, translations } from "@/lib/i18n";
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
  const { setBuyNowMode } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const t = translations[locale];

  const handleBuyNow = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsProcessing(true);

    // Set buy now mode and redirect to checkout
    setBuyNowMode(true, product);

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
          {t.shop.redirecting}
        </>
      ) : (
        <>
          <CreditCard className="mr-2 w-4 h-4" />
          {t.shop.buyNowLabel}
        </>
      )}
    </Button>
  );
};
