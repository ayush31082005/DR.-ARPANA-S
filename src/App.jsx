import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AppointmentProvider>
            <AppRoutes />
          </AppointmentProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
