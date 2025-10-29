"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import type { Size } from "@/data/products";

export default function ProductDetail() {
  const params = useParams<{ slug: string }>();
  const search = useSearchParams();
  const router = useRouter();
  const slug = params.slug;
  const product = PRODUCTS.find((p) => p.slug === slug);
  const initialSize = search.get("size") || product?.sizes[0] || null;
  const [size, setSize] = useState<Size | null>(initialSize as Size);
  const [idx, setIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return <div className="mx-auto max-w-6xl px-4 py-12">Product not found.</div>;

  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      priceCents: product.priceCents,
      slug: product.slug,
      size,
      image: product.images[0],
      quantity,
    });
  };

  const handleBuyNow = () => {
    if (!size) {
      alert("Please select a size");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      priceCents: product.priceCents,
      slug: product.slug,
      size,
      image: product.images[0],
      quantity,
    });
    // In a real app, this would redirect to checkout
    alert("Proceeding to checkout (not implemented in MVP)");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-3">
        <div className="relative aspect-square rounded-xl overflow-hidden border">
          <Image src={product.images[idx]} alt={product.name} fill className="object-cover" />
        </div>
        <div className="grid grid-cols-5 gap-2">
          {product.images.map((img, i) => (
            <button key={img} onClick={() => setIdx(i)} className={`relative aspect-square border rounded ${i===idx?"ring-2 ring-ocean-500":""}`}>
              <Image src={img} alt="thumb" fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="mt-2 text-neutral-600 max-w-prose">{product.description}</p>
        </div>

        <div>
          {product.compareAtCents && (
            <div className="text-sm line-through text-neutral-400">{formatPrice(product.compareAtCents)}</div>
          )}
          <div className="text-2xl font-semibold text-ocean-700">{formatPrice(product.priceCents)}</div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-neutral-700">Select Size</div>
          <div className="flex gap-2">
            {product.sizes.map((s) => (
              <button 
                key={s} 
                onClick={() => setSize(s)} 
                className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                  size===s
                    ? "bg-ocean-700 text-white border-ocean-700 shadow-md" 
                    : "border-neutral-300 hover:bg-sand-200 hover:border-ocean-500"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button className="text-sm text-ocean-700 underline hover:text-ocean-900" onClick={() => alert("Size Chart:\nXS: Chest 32-34\"\nS: Chest 34-36\"\nM: Chest 38-40\"\nL: Chest 42-44\"\nXL: Chest 46-48\"")}>View size chart</button>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-neutral-700">Quantity</div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 border rounded-lg hover:bg-sand-200 font-semibold disabled:opacity-50"
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button 
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              className="w-10 h-10 border rounded-lg hover:bg-sand-200 font-semibold disabled:opacity-50"
              disabled={quantity >= 10}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            className="min-w-36 bg-ocean-700 hover:bg-ocean-900" 
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button 
            variant="secondary" 
            className="min-w-36 border-ocean-700 text-ocean-700 hover:bg-ocean-50" 
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
