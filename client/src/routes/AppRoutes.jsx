import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ShopLayout from "../layouts/ShopLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
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

import MyAppointments from "../pages/MyAppointments";
import Contact from "../pages/Contact";
import Gallery from "../pages/Gallery";
import FAQ from "../pages/FAQ";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Appointment from "../pages/Appointment";

import PrivacyPolicy from "../pages/PrivacyPolicy";
import ShippingPolicy from "../pages/ShippingPolicy";
import TermsConditions from "../pages/TermsConditions";
import MyPrescription from "../pages/Prescription";
import NotFound from "../pages/NotFound";

import UserDashboard from "../pages/UserDashboard";

import AdminLayout from "../pages/admin/AdminLayout";
import AdminAppointments from "../pages/admin/AdminAppointments";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminContacts from "../pages/admin/AdminContact";
import AdminPrescriptions from "../pages/admin/AdminPrescription";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminProducts from "../pages/admin/AdminProducts";

export default function AppRoutes() {
  return (
    <>
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
        <Route path="/my-prescriptions" element={<MainLayout><MyPrescription /></MainLayout>} />

        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />

        <Route path="/user-dashboard" element={<DashboardLayout><UserDashboard /></DashboardLayout>} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="prescriptions" element={<AdminPrescriptions />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
      </Routes>
    </>
  );
}
