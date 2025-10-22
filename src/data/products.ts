export type Size = "XS" | "S" | "M" | "L" | "XL";
export type CategorySlug = "t-shirts" | "sweatshirts" | "jackets";
export type Product = {
  id: string; slug: string; name: string; category: CategorySlug;
  images: string[]; priceCents: number; compareAtCents?: number; sizes: Size[]; description: string;
};
export const CATEGORIES = [
  { slug: "t-shirts", title: "T-Shirts" },
  { slug: "sweatshirts", title: "Sweatshirts" },
  { slug: "jackets", title: "Jackets" },
];
export const PRODUCTS: Product[] = [
  // T-Shirts
  {
    id: "voy-tee-01",
    slug: "voyago-classic-tee",
    name: "Voyago Classic Tee",
    category: "t-shirts",
    images: ["/images/products/tee-classic-1.jpg","/images/products/tee-classic-2.jpg"],
    priceCents: 119900, compareAtCents: 149900,
    sizes: ["S","M","L","XL"],
    description: "Soft cotton tee inspired by ocean breeze and open skies.",
  },
  {
    id: "voy-tee-02",
    slug: "voyago-essential-tee",
    name: "Voyago Essential Tee",
    category: "t-shirts",
    images: ["/images/products/tee-classic-1.jpg","/images/products/tee-classic-2.jpg"],
    priceCents: 109900,
    sizes: ["S","M","L","XL"],
    description: "Everyday comfort, premium cotton, timeless style.",
  },
  {
    id: "voy-tee-03",
    slug: "voyago-premium-tee",
    name: "Voyago Premium Tee",
    category: "t-shirts",
    images: ["/images/products/tee-classic-1.jpg","/images/products/tee-classic-2.jpg"],
    priceCents: 129900,
    sizes: ["S","M","L","XL"],
    description: "Luxury feel, modern fit, inspired by the sea.",
  },
  // Sweatshirts
  {
    id: "voy-sweat-01",
    slug: "voyago-classic-sweatshirt",
    name: "Voyago Classic Sweatshirt",
    category: "sweatshirts",
    images: ["/images/products/tee-classic-1.jpg","/images/products/tee-classic-2.jpg"],
    priceCents: 159900, compareAtCents: 189900,
    sizes: ["S","M","L","XL"],
    description: "Classic sweatshirt for cool evenings by the shore.",
  },
  {
    id: "voy-sweat-02",
    slug: "voyago-essential-sweatshirt",
    name: "Voyago Essential Sweatshirt",
    category: "sweatshirts",
    images: ["/images/products/tee-classic-1.jpg","/images/products/tee-classic-2.jpg"],
    priceCents: 149900,
    sizes: ["S","M","L","XL"],
    description: "Soft, cozy, and perfect for layering.",
  },
  {
    id: "voy-sweat-03",
    slug: "voyago-premium-sweatshirt",
    name: "Voyago Premium Sweatshirt",
    category: "sweatshirts",
    images: ["/images/products/tee-classic-1.jpg","/images/products/tee-classic-2.jpg"],
    priceCents: 179900,
    sizes: ["S","M","L","XL"],
    description: "Premium fabric, relaxed fit, nautical details.",
  },
  // Jackets
  {
    id: "voy-jacket-01",
    slug: "voyago-classic-jacket",
    name: "Voyago Classic Jacket",
    category: "jackets",
    images: ["/images/products/tee-classic-1.jpg","/images/products/tee-classic-2.jpg"],
    priceCents: 249900, compareAtCents: 299900,
    sizes: ["S","M","L","XL"],
    description: "Classic jacket for breezy coastal adventures.",
  },
  {
    id: "voy-jacket-02",
    slug: "voyago-essential-jacket",
    name: "Voyago Essential Jacket",
    category: "jackets",
    images: ["/images/products/tee-classic-1.jpg","/images/products/tee-classic-2.jpg"],
    priceCents: 229900,
    sizes: ["S","M","L","XL"],
    description: "Essential outerwear for every journey.",
  },
  {
    id: "voy-jacket-03",
    slug: "voyago-premium-jacket",
    name: "Voyago Premium Jacket",
    category: "jackets",
    images: ["/images/products/tee-classic-1.jpg","/images/products/tee-classic-2.jpg"],
    priceCents: 269900,
    sizes: ["S","M","L","XL"],
    description: "Premium warmth, timeless design, sea-inspired.",
  }
];
