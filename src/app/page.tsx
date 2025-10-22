import HeroVideo from "@/components/hero/HeroVideo";
import CategorySection from "@/components/product/CategorySection";
import { CATEGORIES, PRODUCTS } from "@/data/products";

export default function HomePage() {
  return (
    <div>
      <HeroVideo />
      {CATEGORIES.map((cat) => (
        <CategorySection
          key={cat.slug}
          id={cat.slug}
          title={cat.title}
          products={PRODUCTS.filter((p) => p.category === cat.slug)}
        />
      ))}
    </div>
  );
}
