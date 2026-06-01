import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import AppRoutes from "./routes/AppRoutes";
import WhatsAppChatBox from "./components/common/WhatsAppChatBox";

export default function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppRoutes />
          <WhatsAppChatBox />
        </BrowserRouter>
      </AppointmentProvider>
    </AuthProvider>
  );
}
