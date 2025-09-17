"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { LocalizedProduct } from "@/constants/products";
import { Locale } from "@/lib/i18n";

export interface CartItem {
  product: LocalizedProduct;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  buyNowMode: boolean;
  buyNowProduct?: LocalizedProduct;
}

type CartAction =
  | {
      type: "ADD_TO_CART";
      payload: { product: LocalizedProduct; quantity?: number };
    }
  | { type: "REMOVE_FROM_CART"; payload: { productId: number } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: number; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "CLOSE_CART" }
  | { type: "LOAD_CART"; payload: { items: CartItem[] } }
  | {
      type: "SET_BUY_NOW_MODE";
      payload: { enabled: boolean; product?: LocalizedProduct };
    };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: LocalizedProduct, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  setBuyNowMode: (enabled: boolean, product?: LocalizedProduct) => void;
  exitBuyNowMode: () => void;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { product, quantity }],
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.payload.productId
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== productId),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    case "TOGGLE_CART":
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case "CLOSE_CART":
      return {
        ...state,
        isOpen: false,
      };

    case "LOAD_CART":
      return {
        ...state,
        items: action.payload.items,
      };

    case "SET_BUY_NOW_MODE":
      return {
        ...state,
        buyNowMode: action.payload.enabled,
        buyNowProduct: action.payload.product,
      };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{
  children: React.ReactNode;
  locale: Locale;
}> = ({ children, locale }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    buyNowMode: false,
    buyNowProduct: undefined,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(`cart-${locale}`);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: { items: parsedCart } });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, [locale]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`cart-${locale}`, JSON.stringify(state.items));
  }, [state.items, locale]);

  const addToCart = (product: LocalizedProduct, quantity: number = 1) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const exitBuyNowMode = () => {
    dispatch({ type: "SET_BUY_NOW_MODE", payload: { enabled: false } });
  };

  const setBuyNowMode = (enabled: boolean, product?: LocalizedProduct) => {
    dispatch({ type: "SET_BUY_NOW_MODE", payload: { enabled, product } });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        getTotalItems,
        getTotalPrice,
        setBuyNowMode,
        exitBuyNowMode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
