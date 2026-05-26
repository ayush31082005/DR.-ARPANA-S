import { FileText, MessageSquare, ShoppingBag, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getAdminStats } from "../../services/adminService";

const USER_COLORS = ["#0f766e", "#38bdf8"];
const CONTACT_COLORS = ["#0ea5e9", "#f59e0b", "#10b981"];

function normalizeChartNumber(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    prescriptions: 0,
    orders: 0,
    users: 0,
  });
  const [charts, setCharts] = useState({
    orders: [],
    prescriptions: [],
    users: [],
    contacts: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await getAdminStats();
        setStats(response.stats || {});
        setCharts(response.charts || {});
      } catch (fetchError) {
        setError(
          fetchError.response?.data?.message || "Unable to fetch admin dashboard stats"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = useMemo(
    () => [
      { title: "Contacts", value: stats.contacts ?? 0, icon: MessageSquare },
      { title: "Prescriptions", value: stats.prescriptions ?? 0, icon: FileText },
      { title: "Orders", value: stats.orders ?? 0, icon: ShoppingBag },
      { title: "Users", value: stats.users ?? 0, icon: Users },
    ],
    [stats]
  );

  const orderChartData = useMemo(
    () =>
      (charts.orders || []).map((item) => ({
        month: item.month || "",
        orders: normalizeChartNumber(item.orders),
        revenue: normalizeChartNumber(item.revenue),
      })),
    [charts.orders]
  );

  const prescriptionChartData = useMemo(
    () =>
      (charts.prescriptions || []).map((item) => ({
        month: item.month || "",
        prescriptions: normalizeChartNumber(item.prescriptions),
      })),
    [charts.prescriptions]
  );

  const hasOrderTrendData = orderChartData.some(
    (item) => item.orders > 0 || item.revenue > 0
  );
  const hasPrescriptionTrendData = prescriptionChartData.some(
    (item) => item.prescriptions > 0
  );

  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-500">
          Live analytics connected with your real orders, prescriptions, contacts, and users.
        </p>
      </div>

      {error ? (
        <div className="border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ title, value, icon: Icon }) => (
          <div key={title} className="border bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-white">
              <Icon size={24} />
            </div>
            <p className="text-sm text-slate-500">{title}</p>
            <h2 className="text-3xl font-black text-slate-900">
              {isLoading ? "..." : value}
            </h2>
          </div>
        ))}
      </div>

      <div className="grid gap-2 xl:grid-cols-2">
        <section className="border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Orders Trend</h2>
              <p className="mt-1 text-sm text-slate-500">
                Monthly orders and revenue from the real order collection.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Total Revenue
              </p>
              <p className="mt-2 text-lg font-bold text-slate-900">
                {formatCurrency(
                  orderChartData.reduce((sum, item) => sum + item.revenue, 0)
                )}
              </p>
            </div>
          </div>

          {hasOrderTrendData ? (
            <div className="mt-3 h-64 w-full">
              <ResponsiveContainer
                key={`orders-${orderChartData.length}-${stats.orders ?? 0}`}
                width="100%"
                height="100%"
                minHeight={220}
              >
                <AreaChart
                  data={orderChartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                  <Tooltip
                    formatter={(value, name) =>
                      name === "revenue" ? formatCurrency(value) : value
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#0f766e"
                    fill="#ccfbf1"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="mt-3 flex h-64 items-center justify-center bg-slate-50 text-sm text-slate-500">
              No recent order trend data available.
            </div>
          )}
        </section>

        <section className="border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Users Overview</h2>
              <p className="mt-1 text-sm text-slate-500">
                Circular chart showing admins vs regular users.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Total Users
              </p>
              <p className="mt-2 text-lg font-bold text-slate-900">{stats.users ?? 0}</p>
            </div>
          </div>

          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.users || []}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={4}
                >
                  {(charts.users || []).map((item, index) => (
                    <Cell key={item.name} fill={USER_COLORS[index % USER_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-2 xl:grid-cols-2">
        <section className="border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Prescription Trends</h2>
              <p className="mt-1 text-sm text-slate-500">
                Recharts bar view of monthly prescription activity.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Total Prescriptions
              </p>
              <p className="mt-2 text-lg font-bold text-slate-900">
                {stats.prescriptions ?? 0}
              </p>
            </div>
          </div>

          {hasPrescriptionTrendData ? (
            <div className="mt-3 h-64 w-full">
              <ResponsiveContainer
                key={`prescriptions-${prescriptionChartData.length}-${stats.prescriptions ?? 0}`}
                width="100%"
                height="100%"
                minHeight={220}
              >
                <BarChart
                  data={prescriptionChartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="prescriptions" fill="#0f766e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="mt-3 flex h-64 items-center justify-center bg-slate-50 text-sm text-slate-500">
              No recent prescription trend data available.
            </div>
          )}
        </section>

        <section className="border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Contacts Status</h2>
              <p className="mt-1 text-sm text-slate-500">
                Circular chart using the real contact status distribution.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Total Contacts
              </p>
              <p className="mt-2 text-lg font-bold text-slate-900">{stats.contacts ?? 0}</p>
            </div>
          </div>

          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.contacts || []}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={4}
                >
                  {(charts.contacts || []).map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={CONTACT_COLORS[index % CONTACT_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
