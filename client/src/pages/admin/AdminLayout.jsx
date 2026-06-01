import { Navigate, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    CalendarCheck,
    FileText,
    LayoutDashboard,
    LogOut,
    Menu,
    MessageSquare,
    Settings,
    X
} from "lucide-react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoading, logoutUser, user } = useAuth();
    const [open, setOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(() =>
        typeof window !== "undefined" ? window.innerWidth >= 768 : false
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");

        const handleViewportChange = (event) => {
            setIsDesktop(event.matches);

            if (event.matches) {
                setOpen(false);
            }
        };

        handleViewportChange(mediaQuery);
        mediaQuery.addEventListener("change", handleViewportChange);

        return () => {
            mediaQuery.removeEventListener("change", handleViewportChange);
        };
    }, []);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-600">
                Checking admin access...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/user-dashboard" replace />;
    }

    const links = [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
        { name: "Contacts", path: "/admin/contacts", icon: MessageSquare },
        { name: "Appointments", path: "/admin/appointments", icon: CalendarCheck },
        { name: "Prescriptions", path: "/admin/prescriptions", icon: FileText },
        { name: "Settings", path: "/admin/settings", icon: Settings },
    ];

    const handleLogout = () => {
        logoutUser();
        setOpen(false);
        navigate("/login", { replace: true });
    };

    return (
        <div className="theme-green-page isolate min-h-screen overflow-x-hidden bg-[#fff7fa]">
            <aside className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition ${isDesktop || open ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex h-16 items-center justify-between border-b px-6">
                    <div>
                        <h1 className="text-xl font-black text-[#8f355f]">Admin Panel</h1>
                        <p className="text-xs text-slate-500">Dr. Aprana&apos;s</p>
                    </div>
                    {!isDesktop ? (
                        <button onClick={() => setOpen(false)}><X /></button>
                    ) : null}
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto p-4">
                    {links.map(({ name, path, icon: Icon }) => (
                        <NavLink
                            key={path}
                            to={path}
                            end={path === "/admin"}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 font-semibold ${isActive ? "bg-[#a94672] text-white" : "text-slate-600 hover:bg-slate-100"
                                }`
                            }
                        >
                            <Icon size={20} /> {name}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {!isDesktop && open ? (
                <button
                    type="button"
                    aria-label="Close admin sidebar"
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-30 bg-slate-950/35"
                />
            ) : null}

            <main className="min-w-0 bg-gradient-to-b from-[#fff7fa] via-[#fdeef5] to-[#f8dfe9] md:ml-72">
                <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
                    {!isDesktop ? (
                        <button onClick={() => setOpen(true)}><Menu /></button>
                    ) : <div />}
                    <h2 className="font-bold text-slate-800">Admin Dashboard</h2>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 font-semibold text-rose-500"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </header>

                <div
                    key={location.pathname}
                    className="mx-auto w-full max-w-7xl px-3 py-4 md:px-4 md:py-6"
                >
                    <Outlet />
                </div>
            </main>
        </div>
    );
}


