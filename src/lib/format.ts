export const formatPrice = (cents: number, currency = "INR") =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(cents / 100);
