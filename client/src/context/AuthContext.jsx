import { createContext, useEffect, useMemo, useState } from "react";
import { getMe } from "../services/authService";

export const AuthContext = createContext(null);
const CART_STORAGE_KEY = "cart_items";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getMe();
        setUser(response.user);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem(CART_STORAGE_KEY);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const loginUser = (userData, token) => {
    setUser(userData);
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const value = useMemo(() => ({
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    loginUser,
    logoutUser
  }), [isLoading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
