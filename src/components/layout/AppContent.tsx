"use client";
import { ReactNode } from "react";
import { useIntro } from "@/hooks/useIntro";
import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";

export default function AppContent({ children }: { children: ReactNode }) {
  const { done } = useIntro();
  return (
    <div id="voyago-app-content">
      {done && <Navbar />}
      {done && <CartDrawer />}
      <main>{done ? children : null}</main>
    </div>
  );
}
