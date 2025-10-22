"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { useParams, useSearchParams } from "next/navigation";

export default function ProductDetail() {
  const params = useParams<{ slug: string }>();
  const search = useSearchParams();
  const slug = params.slug;
  const product = PRODUCTS.find((p) => p.slug === slug);
  const initialSize = search.get("size") || product?.sizes[0] || null;
  const [size, setSize] = useState<string | null>(initialSize);
  const [idx, setIdx] = useState(0);

  if (!product) return <div className="mx-auto max-w-6xl px-4 py-12">Product not found.</div>;

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
          <div className="text-sm text-neutral-600">Select Size</div>
          <div className="flex gap-2">
            {product.sizes.map((s) => (
              <button key={s} onClick={() => setSize(s)} className={`px-3 py-1 border rounded ${size===s?"bg-sand-200 border-ocean-500":""}`}>{s}</button>
            ))}
          </div>
          <button className="text-sm underline" onClick={() => alert("Open size chart modal")}>View size chart</button>
        </div>

        <div className="flex gap-3">
          <Button className="min-w-36">Add to Cart</Button>
          <Button variant="secondary" className="min-w-36">Buy Now</Button>
        </div>
      </div>
    </div>
  );
}
