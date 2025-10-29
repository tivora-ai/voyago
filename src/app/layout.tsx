import type { Metadata } from "next";
import "./globals.css";
import "@/styles/theme.css";
import { IntroProvider } from "@/hooks/useIntro";
import LogoIntro from "@/components/layout/LogoIntro";
import AppContent from "@/components/layout/AppContent";
import { CartProvider } from "@/components/cart/CartContext";

export const metadata: Metadata = {
  title: "Voyago",
  description: "Nautical-inspired modern clothing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">
        <CartProvider>
          <IntroProvider>
            <LogoIntro />
            <AppContent>{children}</AppContent>
          </IntroProvider>
        </CartProvider>
      </body>
    </html>
  );
}