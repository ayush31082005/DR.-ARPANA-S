import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const loginUser = (userData, token = "demo-token") => {
    setUser(userData);
    localStorage.setItem("token", token);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    loginUser,
    logoutUser
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
