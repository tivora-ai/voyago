"use client";
import { ReactNode } from "react";
import { useIntro } from "@/hooks/useIntro";
import { CartProvider } from "@/components/cart/CartContext";
import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";

export default function AppContent({ children }: { children: ReactNode }) {
  const { done } = useIntro();
  if (!done) return null;
  return (
    <div id="voyago-app-content">
      <CartProvider>
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
      </CartProvider>
    </div>
  );
}
