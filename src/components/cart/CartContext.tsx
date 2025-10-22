"use client";
import { createContext, useContext, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  priceCents: number;
  slug: string;
  size: string;
  image: string;
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  clearCart: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.id === item.id && i.size === item.size
      );
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += item.quantity;
        return copy;
      }
      return [...prev, item];
    });
    setOpen(true);
  };
  const removeFromCart = (id: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };
  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
