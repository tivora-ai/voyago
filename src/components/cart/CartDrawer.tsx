"use client";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { items, removeFromCart, clearCart, open, setOpen, updateQuantity: updateQty } = useCart();
  
  const updateQuantity = (itemId: string, size: string, delta: number) => {
    const item = items.find(i => i.id === itemId && i.size === size);
    if (!item) return;
    
    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      removeFromCart(itemId, size);
    } else if (newQuantity <= 10) {
      updateQty(itemId, size, newQuantity);
    }
  };
  
  const total = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
  
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ boxShadow: "-8px 0 32px rgba(0,0,0,0.08)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-foam">
          <span className="text-lg font-semibold">
            Your Cart {items.length > 0 && `(${items.length} ${items.length === 1 ? 'item' : 'items'})`}
          </span>
          <button 
            onClick={() => setOpen(false)} 
            className="text-2xl hover:text-neutral-600 transition"
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>
        
        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-neutral-500 text-center mt-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id + item.size} className="flex gap-3 pb-4 border-b last:border-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover border" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm mb-1 truncate">{item.name}</div>
                    <div className="text-xs text-neutral-500 mb-2">Size: {item.size}</div>
                    <div className="flex items-center gap-2 mb-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                        className="w-6 h-6 border rounded hover:bg-sand-200 text-sm font-semibold"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                        className="w-6 h-6 border rounded hover:bg-sand-200 text-sm font-semibold"
                        aria-label="Increase quantity"
                        disabled={item.quantity >= 10}
                      >
                        +
                      </button>
                    </div>
                    <div className="text-sm text-ocean-700 font-semibold">
                      {formatPrice(item.priceCents * item.quantity)}
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id, item.size)} 
                    className="text-neutral-400 hover:text-red-500 text-xl h-6"
                    aria-label="Remove item"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Footer */}
        <div className="border-t bg-foam">
          {items.length > 0 && (
            <div className="px-6 py-3 border-b">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Subtotal:</span>
                <span className="text-xl font-bold text-ocean-700">{formatPrice(total)}</span>
              </div>
            </div>
          )}
          <div className="px-6 py-4 flex flex-col gap-3">
            <button 
              className="w-full bg-ocean-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-ocean-900 transition disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={items.length === 0}
              onClick={() => alert("Checkout functionality not implemented in MVP")}
            >
              Checkout
            </button>
            {items.length > 0 && (
              <button
                className="text-sm text-neutral-500 hover:text-red-600 underline"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
