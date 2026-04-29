import { FileText, MessageSquare, ShoppingBag, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getAdminStats } from "../../services/adminService";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        contacts: 0,
        prescriptions: 0,
        orders: 0,
        users: 0,
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

    return (
        <div>
            <h1 className="text-3xl font-black text-slate-900 mb-6">Dashboard</h1>

            {error ? (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            ) : null}

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {cards.map(({ title, value, icon: Icon }) => (
                    <div key={title} className="bg-white rounded-2xl p-6 border shadow-sm">
                        <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center mb-4">
                            <Icon size={24} />
                        </div>
                        <p className="text-sm text-slate-500">{title}</p>
                        <h2 className="text-3xl font-black text-slate-900">
                            {isLoading ? "..." : value}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
