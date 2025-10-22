"use client";
import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";
export default function CategorySection({ id, title, products }: { id: string; title: string; products: Product[] }) {
  return (
    <section id={id} data-category-id={id} className="relative">
      <div className="sticky top-16 z-10" style={{background: 'var(--voyago-foam)', opacity: 1}}>
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h2 className="text-2xl md:text-3xl font-light tracking-widest text-[color:var(--voyago-brand)] relative after:block after:w-12 after:h-[2px] after:bg-coral-400 after:mt-2 after:rounded-full after:opacity-70">
            {title}
          </h2>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (<ProductCard key={p.id} product={p} />))}
      </div>
    </section>
  );
}
