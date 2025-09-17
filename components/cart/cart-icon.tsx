"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";

interface CartIconProps {
  className?: string;
}

export const CartIcon: React.FC<CartIconProps> = ({ className }) => {
  const { getTotalItems, toggleCart } = useCart();
  const totalItems = getTotalItems();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleCart}
      className={`relative ${className}`}
    >
      <ShoppingCart className="w-5 h-5" />
      {totalItems > 0 && (
        <Badge
          variant="destructive"
          className="-top-2 -right-2 absolute flex justify-center items-center p-0 w-5 h-5 text-xs"
        >
          {totalItems > 99 ? "99+" : totalItems}
        </Badge>
      )}
    </Button>
  );
};
