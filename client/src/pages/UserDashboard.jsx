import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  CalendarCheck,
  FileText,
  Home,
  LogOut,
  Menu,
  Settings,
  Stethoscope,
  Upload,
  X,
} from "lucide-react";
import EmptyState from "../components/common/EmptyState";
import Loader from "../components/common/Loader";
import useAppointments from "../hooks/useAppointments";
import useAuth from "../hooks/useAuth";
import { getPrescriptions } from "../services/prescriptionService";
import formatDate from "../utils/formatDate";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "appointment", label: "Appointment", icon: CalendarCheck },
  { id: "prescription", label: "Prescription", icon: FileText },
  { id: "profile", label: "Profile", icon: Settings },
];

const quickActions = [
  { label: "Appointment", icon: CalendarCheck, path: "/appointment" },
  { label: "Prescription", icon: Upload, path: "/my-prescriptions" },
  { label: "Services", icon: Stethoscope, path: "/services" },
  { label: "Contact", icon: FileText, path: "/contact" },
];

const prescriptionStatusClasses = {
  approved: "bg-rose-100 text-rose-700",
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

function Sidebar({ activeTab, onSelect, onLogout, showClose, onClose }) {
  return (
    <aside className="flex h-full flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between border-b px-6">
        <div>
          <h1 className="text-xl font-black text-rose-700">User Panel</h1>
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
                  ? "bg-rose-600 text-white"
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
  const { logoutUser } = useAuth();
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

  const handleLogout = () => {
    logoutUser();
    setOpenSidebar(false);
    navigate("/login", { replace: true });
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
          onLogout={handleLogout}
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
            <div className="w-6" />
          </div>
        </div>

        <div className="bg-[linear-gradient(180deg,#f8fafc_0%,#eef7f3_100%)] py-4 md:py-6">
          {activeTab === "dashboard" ? <DashboardContent /> : null}
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
  const [prescriptions, setPrescriptions] = useState([]);
  const [isPrescriptionsLoading, setIsPrescriptionsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchPrescriptions = async () => {
      if (!user?.email) {
        setPrescriptions([]);
        setIsPrescriptionsLoading(false);
        return;
      }

      try {
        setIsPrescriptionsLoading(true);
        const response = await getPrescriptions(user.email);

        if (isMounted) {
          setPrescriptions(response.prescriptions || []);
        }
      } catch {
        if (isMounted) {
          setPrescriptions([]);
        }
      } finally {
        if (isMounted) {
          setIsPrescriptionsLoading(false);
        }
      }
    };

    if (!isAuthLoading) {
      fetchPrescriptions();
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthLoading, user?.email]);

  const userAppointments = useMemo(
    () => getUserAppointments(user, appointments),
    [appointments, user]
  );
  const latestAppointment = userAppointments[0] || null;
  const latestPrescription = prescriptions[0] || null;

  const stats = [
    {
      title: "Appointments",
      value:
        isAuthLoading || isAppointmentsLoading
          ? "--"
          : String(userAppointments.length).padStart(2, "0"),
      icon: CalendarCheck,
    },
    {
      title: "Prescriptions",
      value: isPrescriptionsLoading ? "--" : String(prescriptions.length).padStart(2, "0"),
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-rose-600 to-pink-500 p-6 text-white shadow-lg md:p-8"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute bottom-0 right-20 h-28 w-28 rounded-full bg-white/10 blur-xl" />

        <div className="flex flex-col items-center justify-center py-4 text-center">
          <p className="text-sm opacity-90">Welcome back</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">
            {user?.name || "User"}
          </h2>
          <p className="mt-1 max-w-2xl opacity-90">
            Manage your appointments, prescriptions, and health activity in one place.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
              <div className="flex h-12 w-12 items-center justify-center bg-rose-100 text-rose-600">
                <Icon size={24} />
              </div>
              <p className="mt-5 text-slate-500">{item.title}</p>
              <h3 className="text-3xl font-bold text-slate-900">{item.value}</h3>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Latest Appointment</h3>
          <p className="mt-2 text-sm text-slate-500">
            Your most recent booking appears here.
          </p>

          {latestAppointment ? (
            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <p><span className="font-semibold text-slate-900">Service:</span> {latestAppointment.service || "Not selected"}</p>
              <p><span className="font-semibold text-slate-900">Doctor:</span> {latestAppointment.doctor || "Not selected"}</p>
              <p><span className="font-semibold text-slate-900">Date:</span> {formatDate(latestAppointment.date) || "Not selected"}</p>
              <p><span className="font-semibold text-slate-900">Time:</span> {latestAppointment.time || "Not selected"}</p>
            </div>
          ) : (
            <EmptyState
              title="No appointment yet"
              description="Book an appointment to see it here."
              className="mt-6"
            />
          )}
        </section>

        <section className="border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Latest Prescription</h3>
          <p className="mt-2 text-sm text-slate-500">
            Your latest uploaded prescription status appears here.
          </p>

          {latestPrescription ? (
            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <p><span className="font-semibold text-slate-900">Uploaded On:</span> {formatDate(latestPrescription.createdAt)}</p>
              <p><span className="font-semibold text-slate-900">Patient Name:</span> {latestPrescription.fullName || user?.name || "Not available"}</p>
              <p>
                <span className="font-semibold text-slate-900">Status:</span>{" "}
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${prescriptionStatusClasses[latestPrescription.status] || prescriptionStatusClasses.pending}`}>
                  {latestPrescription.status || "pending"}
                </span>
              </p>
            </div>
          ) : (
            <EmptyState
              title="No prescription yet"
              description="Upload a prescription to see the latest status here."
              className="mt-6"
            />
          )}
        </section>
      </div>

      <div className="bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-bold text-slate-900">Quick Actions</h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.label}
                to={action.path}
                className="flex flex-col items-center gap-2 bg-slate-50 p-5 text-center transition hover:bg-rose-50 hover:text-rose-600"
              >
                <Icon />
                <span>{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
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
            <h2 className="text-2xl font-bold text-slate-900">My Appointments</h2>
            <p className="mt-2 text-slate-500">
              Yahan user ke booked appointments aur unka current status show hoga.
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
              className="bg-rose-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-rose-700"
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
                  <tr key={item._id || item.id} className="border-t border-slate-100">
                    <td className="p-4">
                      <div className="font-semibold text-slate-900">
                        {item?.name || "Not provided"}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      <div>{item?.phone || "No phone"}</div>
                      <div className="mt-1 text-xs text-slate-500">
                        {item?.email || "No email"}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">{item?.service || "Not selected"}</td>
                    <td className="p-4 text-slate-600">{item?.doctor || "Not selected"}</td>
                    <td className="p-4 text-slate-600">{formatDate(item?.date) || "Date not selected"}</td>
                    <td className="p-4 text-slate-600">{item?.time || "Time not selected"}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold capitalize ${getAppointmentStatusClasses(item?.status)}`}>
                        {item?.status || "pending"}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">
                      <div className="max-w-[220px] truncate">{item?.notes || "No notes"}</div>
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
            <h2 className="text-2xl font-bold text-slate-900">Prescription History</h2>
            <p className="mt-2 text-sm text-slate-600">
              Total {prescriptions.length} prescriptions available
            </p>
          </div>

          <Link
            to="/my-prescriptions"
            className="bg-rose-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-rose-700"
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
            <table className="w-full min-w-[980px] text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-4 text-left font-semibold">Prescription ID</th>
                  <th className="p-4 text-left font-semibold">File Name</th>
                  <th className="p-4 text-left font-semibold">Contact</th>
                  <th className="p-4 text-left font-semibold">Uploaded On</th>
                  <th className="p-4 text-left font-semibold">Status</th>
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
                      <span className={`inline-flex w-fit px-3 py-1 text-xs font-semibold ${prescriptionStatusClasses[item.status] || prescriptionStatusClasses.pending}`}>
                        {item.displayStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <a
                        href={item.prescriptionFile?.url}
                        target="_blank"
                        rel="noreferrer"
                        className="border border-slate-200 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No prescriptions yet"
          description="Upload a prescription to start review and follow-up support."
        />
      )}
    </motion.div>
  );
}

function ProfileContent() {
  const { user, isLoading: isAuthLoading } = useAuth();

  if (isAuthLoading) {
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
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-400 text-4xl font-bold text-white">
            {initials}
          </div>

          <h3 className="mt-4 text-center text-2xl font-bold text-slate-900">
            {user.name || "User"}
          </h3>
          <p className="mt-1 text-center text-slate-500">{user.email || "No email"}</p>

          <div className="mt-6 grid gap-3">
            <ProfileField label="Phone" value={user.phone} />
            <ProfileField label="Member Since" value={memberSince} />
            <ProfileField label="Account Status" value="Active" />
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Registered Details</h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ProfileField label="Full Name" value={user.name} />
            <ProfileField label="Email Address" value={user.email} />
            <ProfileField label="Phone Number" value={user.phone} />
            <ProfileField label="Role" value={user.role || "user"} />
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

function getAppointmentStatusClasses(status) {
  if (status === "confirmed") {
    return "bg-rose-100 text-rose-700";
  }

  if (status === "completed") {
    return "bg-sky-100 text-sky-700";
  }

  if (status === "cancelled") {
    return "bg-red-100 text-red-700";
  }

  return "bg-amber-100 text-amber-700";
}
