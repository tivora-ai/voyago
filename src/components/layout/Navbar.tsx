"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useEffect } from "react";
import { useCart } from "@/components/cart/CartContext";
export default function Navbar() {
  // Scroll-based rotation
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, v => v * 0.5); // 0.5 degree per px
  const { setOpen, items } = useCart();

  return (
    <nav className="sticky top-0 z-40 border-b border-white/20 animate-navbar-in" style={{background: 'var(--voyago-foam)', opacity: 1}}>
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center gap-3 h-full">
          <motion.div
            id="voyago-logo-target"
            className="w-10 h-10 rounded-full overflow-hidden relative flex items-center justify-center"
            style={{ rotate, scale: useTransform(scrollY, v => v > 24 ? 0.9 : 1) }}
          >
            <Image src="/logo/logo-icon.png" alt="Voyago Icon" fill priority />
          </motion.div>
          <div className="h-8 flex items-center">
            <Image src="/logo/logo-text.png" alt="Voyago" height={32} width={96} priority style={{ filter: 'brightness(0) saturate(100%) sepia(1) hue-rotate(20deg) saturate(5) brightness(1.1)' }} />
          </div>
        </Link>
        <div className="flex items-center gap-6">
          {/* Cart Icon */}
          <button aria-label="Cart" className="relative p-2 rounded-full hover:bg-sand-200 transition" onClick={() => setOpen(true)}>
            {/* Cart count badge */}
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-coral-400 text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow">{items.length}</span>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart" viewBox="0 0 24 24"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2 2h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 6M7 13l-2 4h13M17 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"/></svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
