import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ShopLayout from "../layouts/ShopLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "./ScrollToTop";

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import MyOrders from "../pages/MyOrders";
import Wishlist from "../pages/Wishlist";
import MyAppointments from "../pages/MyAppointments";
import Contact from "../pages/Contact";
import Gallery from "../pages/Gallery";
import FAQ from "../pages/FAQ";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Appointment from "../pages/Appointment";
import Profile from "../pages/Profile";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ShippingPolicy from "../pages/ShippingPolicy";
import TermsConditions from "../pages/TermsConditions";
import MyPrescription from "../pages/Prescription";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
        <Route path="/services/:id" element={<MainLayout><ServiceDetails /></MainLayout>} />
        <Route path="/appointment" element={<MainLayout><Appointment /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} />
        <Route path="/faq" element={<MainLayout><FAQ /></MainLayout>} />
        <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicy /></MainLayout>} />
        <Route path="/shipping-policy" element={<MainLayout><ShippingPolicy /></MainLayout>} />
        <Route path="/terms-conditions" element={<MainLayout><TermsConditions /></MainLayout>} />

        <Route path="/shop" element={<ShopLayout><Shop /></ShopLayout>} />
        <Route path="/shop/:id" element={<ShopLayout><ProductDetails /></ShopLayout>} />
        <Route path="/cart" element={<ShopLayout><Cart /></ShopLayout>} />
        <Route path="/checkout" element={<ShopLayout><Checkout /></ShopLayout>} />
        <Route path="/order-success" element={<ShopLayout><OrderSuccess /></ShopLayout>} />
        <Route path="/my-prescriptions" element={<ProtectedRoute><MainLayout><MyPrescription /></MainLayout></ProtectedRoute>} />

        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />

        <Route path="/my-orders" element={<ProtectedRoute><DashboardLayout><MyOrders /></DashboardLayout></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><DashboardLayout><Wishlist /></DashboardLayout></ProtectedRoute>} />
        <Route path="/my-appointments" element={<ProtectedRoute><DashboardLayout><MyAppointments /></DashboardLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><DashboardLayout><Profile /></DashboardLayout></ProtectedRoute>} />

        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
