import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    FileText,
    LayoutDashboard,
    LogOut,
    Menu,
    MessageSquare,
    Package,
    ShoppingBag,
    X
} from "lucide-react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logoutUser } = useAuth();
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

    const links = [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
        { name: "Contacts", path: "/admin/contacts", icon: MessageSquare },
        { name: "Prescriptions", path: "/admin/prescriptions", icon: FileText },
        { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
        { name: "Products", path: "/admin/products", icon: Package },
    ];

    const handleLogout = () => {
        logoutUser();
        setOpen(false);
        navigate("/login", { replace: true });
    };

    return (
        <div className="isolate min-h-screen overflow-x-hidden bg-slate-100">
            <aside className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition ${isDesktop || open ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex h-16 items-center justify-between border-b px-6">
                    <div>
                        <h1 className="text-xl font-black text-teal-700">Admin Panel</h1>
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
                                `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${isActive ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-100"
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

            <main className="min-w-0 bg-slate-100 md:ml-72">
                <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
                    {!isDesktop ? (
                        <button onClick={() => setOpen(true)}><Menu /></button>
                    ) : <div />}
                    <h2 className="font-bold text-slate-800">Admin Dashboard</h2>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-500 font-semibold"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </header>

                <div key={location.pathname} className="p-4 md:p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
