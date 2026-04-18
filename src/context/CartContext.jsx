import { createContext, useMemo, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setItems((prev) => prev.filter((item) => item.id !== id));
  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, qty } : item));
  };
  const clearCart = () => setItems([]);
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const value = useMemo(() => ({ items, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }), [items, totalItems, totalPrice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
