"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, Size } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const [idx, setIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]);
  const img = product.images[idx] ?? product.images[0];
  const router = useRouter();
  const { addToCart, setOpen } = useCart();
  
  const cycle = (dir: -1 | 1) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((i) => (i + dir + product.images.length) % product.images.length);
  };
  
  const SizeButton = ({ s }: { s: Size }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setSelectedSize(s);
      }}
      className={`px-2 py-1 border rounded-md text-xs transition ${
        selectedSize === s
          ? "bg-ocean-700 text-white border-ocean-700"
          : "border-neutral-300 hover:bg-sand-200"
      }`}
    >
      {s}
    </button>
  );
  
  return (
    <div
      className="group border rounded-2xl shadow-sm overflow-hidden bg-white hover:shadow-[0_4px_12px_var(--voyago-brand,#d5ba74)/20] transition-transform duration-500 hover:-translate-y-1 cursor-pointer"
      onClick={() => router.push(`/product/${product.slug}`)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image src={img} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <button onClick={cycle(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-foam/80 rounded-full p-1 hover:bg-foam transition-opacity">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button onClick={cycle(1)} className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-foam/80 rounded-full p-1 hover:bg-foam transition-opacity">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-light text-[0.95rem] tracking-wide">{product.name}</h3>
          <div className="text-right">
            {product.compareAtCents && (<div className="text-sm line-through text-neutral-400">{formatPrice(product.compareAtCents)}</div>)}
            <div className="text-lg font-semibold text-ocean-700 group-hover:text-coral-400 transition-colors duration-300">{formatPrice(product.priceCents)}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">{product.sizes.map((s) => <SizeButton key={s} s={s} />)}</div>
        <button
          className="mt-3 w-full py-2 rounded-xl bg-ocean-700 text-white font-semibold hover:bg-ocean-900 transition"
          onClick={e => {
            e.stopPropagation();
            addToCart({
              id: product.id,
              name: product.name,
              priceCents: product.priceCents,
              slug: product.slug,
              size: selectedSize,
              image: product.images[0],
              quantity: 1,
            });
            setOpen(true);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
