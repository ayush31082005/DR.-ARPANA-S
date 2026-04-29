import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext(null);
const CART_STORAGE_KEY = "cart_items";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return [];
    }

    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.removeItem(CART_STORAGE_KEY);
      setItems((current) => (current.length ? [] : current));
      return;
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        localStorage.removeItem(CART_STORAGE_KEY);
        setItems((current) => (current.length ? [] : current));
        return;
      }

      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        const nextItems = savedCart ? JSON.parse(savedCart) : [];
        setItems((current) =>
          JSON.stringify(current) === JSON.stringify(nextItems) ? current : nextItems
        );
      } catch {
        setItems((current) => (current.length ? [] : current));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
