import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  CalendarCheck,
  FileText,
  Home,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  Stethoscope,
  Upload,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import EmptyState from "../components/common/EmptyState";
import Loader from "../components/common/Loader";
import useAppointments from "../hooks/useAppointments";
import useAuth from "../hooks/useAuth";
import { getMyOrders } from "../services/orderService";
import { getPrescriptions } from "../services/prescriptionService";
import formatDate from "../utils/formatDate";
import formatPrice from "../utils/formatPrice";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "appointment", label: "Appointment", icon: CalendarCheck },
  { id: "prescription", label: "Prescription", icon: FileText },
  { id: "profile", label: "Profile", icon: Settings },
];

const quickActions = [
  { label: "Appointment", icon: CalendarCheck, path: "/appointment" },
  { label: "Prescription", icon: Upload, path: "/my-prescriptions" },
  { label: "Services", icon: Stethoscope, path: "/services" },
  { label: "Shop", icon: ShoppingBag, path: "/shop" },
];

const profile = {
  name: "Akash Gupta",
  email: "akash@gmail.com",
  phone: "+91 9876543210",
  city: "Lucknow",
  membership: "Premium User",
  healthPlan: "Premium",
};

const APPOINTMENT_CHART_SEGMENTS = [
  { key: "completed", name: "Completed", color: "#059669" },
  { key: "confirmed", name: "Confirmed", color: "#0ea5e9" },
  { key: "pending", name: "Pending", color: "#f59e0b" },
  { key: "cancelled", name: "Cancelled", color: "#ef4444" },
];
const prescriptionStatusClasses = {
  approved: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
};

function getUserAppointments(user, appointments = []) {
  if (!user) {
    return [];
  }

  const byEmail = user.email
    ? appointments.filter(
        (appointment) =>
          appointment.email &&
          appointment.email.toLowerCase() === user.email.toLowerCase()
      )
    : [];

  if (byEmail.length > 0) {
    return byEmail;
  }

  const byPhone = user.phone
    ? appointments.filter(
        (appointment) =>
          appointment.phone &&
          appointment.phone.replace(/\D/g, "") === user.phone.replace(/\D/g, "")
      )
    : [];

  if (byPhone.length > 0) {
    return byPhone;
  }

  return user.name
    ? appointments.filter(
        (appointment) =>
          appointment.name &&
          appointment.name.trim().toLowerCase() === user.name.trim().toLowerCase()
      )
    : [];
}

function buildMonthlyOrderChart(orders) {
  const now = new Date();
  const monthBuckets = [];

  for (let offset = 5; offset >= 0; offset -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    monthBuckets.push({
      key: `${date.getFullYear()}-${date.getMonth()}`,
      month: date.toLocaleString("en-US", { month: "short" }),
      orders: 0,
    });
  }

  return monthBuckets.map((bucket) => {
    const totalOrders = orders.filter((order) => {
      if (!order?.createdAt) {
        return false;
      }

      const orderDate = new Date(order.createdAt);
      return `${orderDate.getFullYear()}-${orderDate.getMonth()}` === bucket.key;
    }).length;

    return {
      month: bucket.month,
      orders: totalOrders,
    };
  });
}

function Sidebar({ activeTab, onSelect, onLogout, showClose, onClose }) {
  return (
    <aside className="flex h-full flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between border-b px-6">
        <div>
          <h1 className="text-xl font-black text-emerald-700">User Panel</h1>
          <p className="text-xs text-slate-500">Dr. Aprana&apos;s</p>
        </div>
        {showClose ? (
          <button type="button" onClick={onClose} aria-label="Close user sidebar">
            <X />
          </button>
        ) : null}
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left font-semibold transition ${
                isActive
                  ? "bg-emerald-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="mx-4 mb-4 flex items-center gap-3 px-4 py-3 font-semibold text-red-500 transition hover:bg-red-50"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default function UserDashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );
  const activeTab = searchParams.get("tab") || "dashboard";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleViewportChange = (event) => {
      setIsDesktop(event.matches);

      if (event.matches) {
        setOpenSidebar(false);
      }
    };

    handleViewportChange(mediaQuery);
    mediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  const handleSelect = (tabId) => {
    setOpenSidebar(false);
    setSearchParams(tabId === "dashboard" ? {} : { tab: tabId }, { replace: true });
  };

  return (
    <div className="isolate min-h-screen overflow-x-hidden bg-slate-100">
      <aside
        className={`fixed left-0 top-20 z-40 flex h-[calc(100vh-5rem)] w-72 flex-col transition xl:top-28 xl:h-[calc(100vh-7rem)] ${
          isDesktop || openSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          activeTab={activeTab}
          onSelect={handleSelect}
          onLogout={() => setOpenSidebar(false)}
          showClose={!isDesktop}
          onClose={() => setOpenSidebar(false)}
        />
      </aside>

      {!isDesktop && openSidebar ? (
        <button
          type="button"
          aria-label="Close user sidebar"
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 z-30 bg-slate-950/35"
        />
      ) : null}

      <main className="min-w-0 bg-slate-100 lg:ml-72">
        <div className="border-b bg-white px-4 py-3 lg:hidden">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setOpenSidebar(true)}
              aria-label="Open user sidebar"
              className="text-slate-700"
            >
              <Menu />
            </button>
            <h2 className="font-bold text-slate-800">User Dashboard</h2>
            <button
              type="button"
              className="font-semibold text-emerald-600 transition hover:text-emerald-700"
            >
              {profile.name}
            </button>
          </div>
        </div>

        <div className="bg-[linear-gradient(180deg,#f8fafc_0%,#eef7f3_100%)] py-4 md:py-6">
          {activeTab === "dashboard" ? <DashboardContent /> : null}
          {activeTab === "orders" ? <OrdersContent /> : null}
          {activeTab === "appointment" ? <AppointmentContent /> : null}
          {activeTab === "prescription" ? <PrescriptionContent /> : null}
          {activeTab === "profile" ? <ProfileContent /> : null}
        </div>
      </main>
    </div>
  );
}

function DashboardContent() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { appointments, isLoading: isAppointmentsLoading } = useAppointments();
  const [dashboardOrders, setDashboardOrders] = useState([]);
  const [dashboardCounts, setDashboardCounts] = useState({
    orders: 0,
    prescriptions: 0,
  });
  const [isCountsLoading, setIsCountsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardCounts = async () => {
      if (!user?.email) {
        setDashboardCounts({ orders: 0, prescriptions: 0 });
        setIsCountsLoading(false);
        return;
      }

      try {
        setIsCountsLoading(true);
        const [ordersResponse, prescriptionsResponse] = await Promise.all([
          getMyOrders(),
          getPrescriptions(user.email),
        ]);

        if (!isMounted) {
          return;
        }

        const nextOrders = ordersResponse.orders || [];
        setDashboardOrders(nextOrders);
        setDashboardCounts({
          orders: nextOrders.length,
          prescriptions: (prescriptionsResponse.prescriptions || []).length,
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setDashboardOrders([]);
        setDashboardCounts({ orders: 0, prescriptions: 0 });
      } finally {
        if (isMounted) {
          setIsCountsLoading(false);
        }
      }
    };

    if (!isAuthLoading) {
      fetchDashboardCounts();
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthLoading, user?.email]);

  const appointmentCount = useMemo(() => {
    return getUserAppointments(user, appointments).length;
  }, [appointments, user]);

  const orderChart = useMemo(
    () => buildMonthlyOrderChart(dashboardOrders),
    [dashboardOrders]
  );

  const appointmentData = useMemo(() => {
    const userAppointments = getUserAppointments(user, appointments);

    return APPOINTMENT_CHART_SEGMENTS.map((segment) => ({
      ...segment,
      value: userAppointments.filter(
        (appointment) => (appointment.status || "pending") === segment.key
      ).length,
    }));
  }, [appointments, user]);

  const visibleAppointmentData = appointmentData.filter((item) => item.value > 0);
  const pieAppointmentData =
    visibleAppointmentData.length > 0
      ? visibleAppointmentData
      : [{ name: "No Appointments", value: 1, color: "#e2e8f0" }];

  const stats = [
    {
      title: "Total Orders",
      value: isCountsLoading ? "--" : String(dashboardCounts.orders).padStart(2, "0"),
      icon: ShoppingBag,
    },
    {
      title: "Prescriptions",
      value: isCountsLoading
        ? "--"
        : String(dashboardCounts.prescriptions).padStart(2, "0"),
      icon: FileText,
    },
    {
      title: "Appointments",
      value:
        isAuthLoading || isAppointmentsLoading
          ? "--"
          : String(appointmentCount).padStart(2, "0"),
      icon: CalendarCheck,
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-500 p-6 text-white shadow-lg md:p-8"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute bottom-0 right-20 h-28 w-28 rounded-full bg-white/10 blur-xl" />

        <div className="flex flex-col items-center justify-center py-4 text-center">
          <p className="text-sm opacity-90">Welcome back</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">
            {user?.name || profile.name}
          </h2>
          <p className="mt-1 max-w-2xl opacity-90">
            Manage your orders, appointments, prescriptions, and health activity
            in one place.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="border border-slate-100 bg-white p-6 shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center bg-emerald-100 text-emerald-600">
                <Icon size={24} />
              </div>
              <p className="mt-5 text-slate-500">{item.title}</p>
              <h3 className="text-3xl font-bold text-slate-900">{item.value}</h3>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 shadow-md xl:col-span-2"
        >
          <h3 className="mb-5 text-xl font-bold text-slate-900">
            Monthly Orders
          </h3>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={orderChart}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#059669"
                  fill="#d1fae5"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 shadow-md"
        >
          <h3 className="mb-5 text-xl font-bold text-slate-900">
            Appointments
          </h3>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieAppointmentData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={5}
                >
                  {pieAppointmentData.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {visibleAppointmentData.length === 0 ? (
              <p className="text-sm text-slate-500">
                No appointment data available yet.
              </p>
            ) : null}
            {appointmentData.map((item) => (
              <div key={item.name} className="flex justify-between text-sm">
                <span className="text-slate-500">{item.name}</span>
                <b>{item.value}</b>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-bold text-slate-900">
          Quick Actions
        </h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;

            if (action.path) {
              return (
                <Link
                  key={action.label}
                  to={action.path}
                  className="flex flex-col items-center gap-2 bg-slate-50 p-5 text-center transition hover:bg-emerald-50 hover:text-emerald-600"
                >
                  <Icon />
                  <span>{action.label}</span>
                </Link>
              );
            }

            return (
              <button
                key={action.label}
                type="button"
                className="flex flex-col items-center gap-2 bg-slate-50 p-5 transition hover:bg-emerald-50 hover:text-emerald-600"
              >
                <Icon />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OrdersContent() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        const response = await getMyOrders();
        setUserOrders(response.orders || []);
      } catch (fetchError) {
        setError(
          fetchError.response?.data?.message || "Unable to fetch your orders"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (!isAuthLoading) {
      fetchOrders();
    }
  }, [isAuthLoading, user]);

  if (isAuthLoading || isLoading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <EmptyState
        title="Login required"
        description="Please login first to view your orders."
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">My Orders</h2>
            <p className="mt-2 text-sm text-slate-500">
              Yahan user ke placed orders aur unka current status show hoga.
            </p>
          </div>
          <Link to="/shop" className="self-start border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
            Continue Shopping
          </Link>
        </div>
      </div>

      {error ? (
        <div className="border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : null}

      {userOrders.length ? (
        <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-4 text-left font-semibold">Order ID</th>
                  <th className="p-4 text-left font-semibold">Placed On</th>
                  <th className="p-4 text-left font-semibold">Items</th>
                  <th className="p-4 text-left font-semibold">Delivery</th>
                  <th className="p-4 text-left font-semibold">Payment</th>
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-left font-semibold">Total</th>
                </tr>
              </thead>

              <tbody>
                {userOrders.map((order) => {
                  const itemCount =
                    order?.items?.reduce(
                      (sum, product) => sum + (product.quantity || 0),
                      0
                    ) || 0;

                  return (
                    <tr key={order._id} className="border-t border-slate-100">
                      <td className="p-4 font-semibold text-slate-900">
                        #{order?._id?.slice(-8)?.toUpperCase() || "N/A"}
                      </td>
                      <td className="p-4 text-slate-600">
                        {formatDate(order?.createdAt) || "Recently placed"}
                      </td>
                      <td className="p-4 text-slate-600">
                        {itemCount} item{itemCount !== 1 ? "s" : ""}
                      </td>
                      <td className="p-4 text-slate-600">
                        <div className="max-w-[250px]">
                          <div className="font-medium text-slate-800">
                            {order?.shippingInfo?.fullName || "N/A"}
                          </div>
                          <div className="mt-1 text-xs text-slate-500">
                            {order?.shippingInfo
                              ? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${order.shippingInfo.pincode}`
                              : "No delivery address"}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">
                        <div className="font-medium capitalize text-slate-800">
                          {order?.paymentMethod || "cod"}
                        </div>
                        <div className="mt-1 text-xs capitalize text-slate-500">
                          {order?.paymentStatus || "pending"}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold capitalize ${getOrderStatusClasses(
                            order?.orderStatus
                          )}`}
                        >
                          {order?.orderStatus || "pending"}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-slate-900">
                        {formatPrice(order?.total || 0)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No orders yet"
          description="Once you place a product order from checkout, it will appear here."
        />
      )}
    </motion.div>
  );
}

function AppointmentContent() {
  const { appointments, isLoading, refreshAppointments } = useAppointments();
  const { user } = useAuth();

  const matchedAppointments = getUserAppointments(user, appointments);

  const visibleAppointments =
    matchedAppointments.length > 0 ? matchedAppointments : appointments;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <section className="bg-white p-6 shadow-md">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              My Appointments
            </h2>
            <p className="mt-2 text-slate-500">
              Yahan user ke booked appointments, unka status, aur selected doctor
              show honge.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => refreshAppointments().catch(() => {})}
              className="border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Refresh List
            </button>
            <Link
              to="/appointment"
              className="bg-emerald-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-emerald-700"
            >
              Book New Appointment
            </Link>
          </div>
        </div>
      </section>

      {isLoading ? (
        <Loader />
      ) : visibleAppointments.length === 0 ? (
        <EmptyState
          title="No appointments yet"
          description="User ne jo appointments book ki hongi, wo yahan show hongi."
        />
      ) : (
        <section className="overflow-hidden border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-4 text-left font-semibold">Patient</th>
                  <th className="p-4 text-left font-semibold">Contact</th>
                  <th className="p-4 text-left font-semibold">Service</th>
                  <th className="p-4 text-left font-semibold">Doctor</th>
                  <th className="p-4 text-left font-semibold">Date</th>
                  <th className="p-4 text-left font-semibold">Time</th>
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-left font-semibold">Notes</th>
                </tr>
              </thead>

              <tbody>
                {visibleAppointments.map((item) => (
                  <tr
                    key={item._id || item.id}
                    className="border-t border-slate-100"
                  >
                    <td className="p-4">
                      <div className="font-semibold text-slate-900">
                        {item?.name || "Not provided"}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {item?.dob ? formatDate(item.dob) : "DOB not provided"}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      <div>{item?.phone || "No phone"}</div>
                      <div className="mt-1 text-xs text-slate-500">
                        {item?.email || "No email"}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      {item?.service || "Not selected"}
                    </td>
                    <td className="p-4 text-slate-600">
                      {item?.doctor || "Not selected"}
                    </td>
                    <td className="p-4 text-slate-600">
                      {formatDate(item?.date) || "Date not selected"}
                    </td>
                    <td className="p-4 text-slate-600">
                      {item?.time || "Time not selected"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold capitalize ${getAppointmentStatusClasses(
                          item?.status
                        )}`}
                      >
                        {item?.status || "pending"}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">
                      <div className="max-w-[220px] truncate">
                        {item?.notes || "No notes"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </motion.div>
  );
}

function PrescriptionContent() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      if (!user?.email) {
        setPrescriptions([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        const response = await getPrescriptions(user.email);
        setPrescriptions(response.prescriptions || []);
      } catch (fetchError) {
        setError(
          fetchError.response?.data?.message ||
            "Unable to fetch prescriptions right now."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (!isAuthLoading) {
      fetchPrescriptions();
    }
  }, [isAuthLoading, user]);

  const formattedPrescriptions = useMemo(
    () =>
      prescriptions.map((item) => ({
        ...item,
        displayStatus:
          item.status?.charAt(0).toUpperCase() + item.status?.slice(1),
        uploadedAt: new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(item.createdAt)),
        fileName:
          item.originalFileName ||
          item.prescriptionFile?.publicId?.split("/").pop() ||
          "Prescription File",
        note:
          item.status === "approved"
            ? "Prescription reviewed. You can continue with your medicine order."
            : item.status === "rejected"
              ? "Prescription needs a clearer or corrected file. Please re-upload."
              : "Your prescription is under review by our team.",
      })),
    [prescriptions]
  );

  if (isAuthLoading || isLoading) {
    return <Loader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <section className="bg-white p-6 shadow-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Prescription History
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Total {prescriptions.length} prescriptions available
            </p>
          </div>

          <Link
            to="/my-prescriptions"
            className="bg-emerald-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-emerald-700"
          >
            + Upload New Prescription
          </Link>
        </div>
      </section>

      {error ? (
        <div className="border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : null}

      {formattedPrescriptions.length > 0 ? (
        <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-4 text-left font-semibold">Prescription ID</th>
                  <th className="p-4 text-left font-semibold">File Name</th>
                  <th className="p-4 text-left font-semibold">Contact</th>
                  <th className="p-4 text-left font-semibold">Uploaded On</th>
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-left font-semibold">Review Note</th>
                  <th className="p-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {formattedPrescriptions.map((item, index) => (
                  <tr key={item._id} className="border-t border-slate-100">
                    <td className="p-4 font-semibold text-slate-900">
                      RX-{1000 + index + 1}
                    </td>
                    <td className="p-4 text-slate-600">{item.fileName}</td>
                    <td className="p-4 text-slate-600">
                      <div>{item.fullName}</div>
                      <div className="mt-1 text-xs text-slate-500">
                        {item.email || "No email"}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">{item.uploadedAt}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex w-fit px-3 py-1 text-xs font-semibold ${
                          prescriptionStatusClasses[item.status] ||
                          prescriptionStatusClasses.pending
                        }`}
                      >
                        {item.displayStatus}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">
                      <div className="max-w-[280px]">
                        {item.note}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={item.prescriptionFile?.url}
                          target="_blank"
                          rel="noreferrer"
                          className="border border-slate-200 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          View
                        </a>
                        {item.status === "rejected" ? (
                          <Link
                            to="/my-prescriptions"
                            className="bg-emerald-600 px-3 py-2 text-center font-semibold text-white transition hover:bg-emerald-700"
                          >
                            Re-upload
                          </Link>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <EmptyState
            title="No prescriptions yet"
            description="Upload a prescription to start medicine review and order support."
          />
          <div className="mt-6 flex justify-center">
            <Link
              to="/my-prescriptions"
              className="bg-emerald-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-emerald-700"
            >
              Upload Prescription
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function ProfileContent() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [userOrders, setUserOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setIsLoadingOrders(false);
        return;
      }

      try {
        setIsLoadingOrders(true);
        setError("");
        const response = await getMyOrders();
        setUserOrders(response.orders || []);
      } catch (fetchError) {
        setError(
          fetchError.response?.data?.message ||
            "Unable to fetch profile details right now"
        );
      } finally {
        setIsLoadingOrders(false);
      }
    };

    if (!isAuthLoading) {
      fetchOrders();
    }
  }, [isAuthLoading, user]);

  if (isAuthLoading || isLoadingOrders) {
    return <Loader />;
  }

  if (!user) {
    return (
      <EmptyState
        title="Login required"
        description="Please login first to view your profile details."
      />
    );
  }

  const latestOrder = userOrders[0];
  const shippingInfo = latestOrder?.shippingInfo || {};
  const fullAddress = shippingInfo.address
    ? [shippingInfo.address, shippingInfo.city, shippingInfo.state, shippingInfo.pincode]
        .filter(Boolean)
        .join(", ")
    : "No checkout address available yet";
  const initials = (user.name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const memberSince = user.createdAt ? formatDate(user.createdAt) : "Not available";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {error ? (
        <div className="border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 text-4xl font-bold text-white">
            {initials}
          </div>

          <h3 className="mt-4 text-center text-2xl font-bold text-slate-900">
            {user.name || "User"}
          </h3>
          <p className="mt-1 text-center text-slate-500">{user.email || "No email"}</p>

          <div className="mt-6 grid gap-3">
            <div className="border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Phone
              </p>
              <p className="mt-2 font-semibold text-slate-900">
                {user.phone || "Not available"}
              </p>
            </div>

            <div className="border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Member Since
              </p>
              <p className="mt-2 font-semibold text-slate-900">{memberSince}</p>
            </div>

            <div className="border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Latest Order
              </p>
              <p className="mt-2 font-semibold text-slate-900">
                {latestOrder?._id
                  ? `#${latestOrder._id.slice(-8).toUpperCase()}`
                  : "No orders yet"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Registered Details</h3>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <ProfileField label="Full Name" value={user.name} />
              <ProfileField label="Email Address" value={user.email} />
              <ProfileField label="Phone Number" value={user.phone} />
              <ProfileField label="Account Status" value="Active" />
            </div>
          </div>

          <div className="border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Latest Checkout Details</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Ye details user ke latest placed order se li gayi hain.
                </p>
              </div>
              <div className="text-sm text-slate-500">
                {latestOrder?.createdAt
                  ? `Updated on ${formatDate(latestOrder.createdAt)}`
                  : "No checkout yet"}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <ProfileField
                label="Recipient Name"
                value={shippingInfo.fullName || user.name}
              />
              <ProfileField
                label="Recipient Phone"
                value={shippingInfo.phone || user.phone}
              />
              <ProfileField
                label="City"
                value={shippingInfo.city || "Not available"}
              />
              <ProfileField
                label="State"
                value={shippingInfo.state || "Not available"}
              />
              <ProfileField
                label="Pincode"
                value={shippingInfo.pincode || "Not available"}
              />
              <ProfileField
                label="Payment Preference"
                value={
                  latestOrder?.paymentMethod
                    ? latestOrder.paymentMethod.toUpperCase()
                    : "Not available"
                }
              />
            </div>

            <div className="mt-4 border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Full Address
              </p>
              <p className="mt-2 font-medium text-slate-900">{fullAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 font-semibold text-slate-900">
        {value || "Not available"}
      </p>
    </div>
  );
}

function getOrderStatusClasses(status) {
  if (status === "delivered") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "shipped") {
    return "bg-indigo-100 text-indigo-700";
  }

  if (status === "processing") {
    return "bg-sky-100 text-sky-700";
  }

  if (status === "cancelled") {
    return "bg-rose-100 text-rose-700";
  }

  return "bg-amber-100 text-amber-700";
}

function getAppointmentStatusClasses(status) {
  if (status === "confirmed") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "completed") {
    return "bg-sky-100 text-sky-700";
  }

  if (status === "cancelled") {
    return "bg-red-100 text-red-700";
  }

  return "bg-amber-100 text-amber-700";
}
