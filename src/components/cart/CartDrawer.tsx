"use client";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { items, removeFromCart, clearCart, open, setOpen } = useCart();
  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      style={{ boxShadow: "-8px 0 32px rgba(0,0,0,0.08)" }}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <span className="text-lg font-semibold">Your Cart</span>
        <button onClick={() => setOpen(false)} className="text-2xl">&times;</button>
      </div>
      <div className="p-6 flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-neutral-500 text-center mt-12">Your cart is empty.</div>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id + item.size} className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-cover border" />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-neutral-500">Size: {item.size}</div>
                  <div className="text-xs text-neutral-500">Qty: {item.quantity}</div>
                  <div className="text-sm text-[color:var(--voyago-brand)] font-semibold">{formatPrice(item.priceCents)}</div>
                </div>
                <button onClick={() => removeFromCart(item.id, item.size)} className="text-neutral-400 hover:text-red-500 text-xl">&times;</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="px-6 py-4 border-t flex justify-between items-center">
        <button
          className="text-sm text-neutral-500 hover:text-red-600 underline"
          onClick={clearCart}
          disabled={items.length === 0}
        >
          Clear Cart
        </button>
        <button className="bg-ocean-700 text-white px-4 py-2 rounded font-semibold disabled:opacity-60" disabled={items.length === 0}>
          Checkout
        </button>
      </div>
    </div>
  );
}
