import { createContext, useMemo, useState } from "react";

export const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const toggleWishlist = (product) => {
    setItems((prev) => prev.some((item) => item.id === product.id) ? prev.filter((item) => item.id !== product.id) : [...prev, product]);
  };
  const isWishlisted = (id) => items.some((item) => item.id === id);
  const value = useMemo(() => ({ items, toggleWishlist, isWishlisted }), [items]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
