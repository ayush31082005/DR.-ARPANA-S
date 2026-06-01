import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import {
    getPrescriptions,
    updatePrescriptionStatus,
} from "../../services/prescriptionService";
import Pagination from "../../components/ui/Pagination";

const statusClasses = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-rose-100 text-rose-700",
    rejected: "bg-rose-100 text-rose-700",
};
const ITEMS_PER_PAGE = 10;

export default function AdminPrescriptions() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                setIsLoading(true);
                setError("");
                const response = await getPrescriptions();
                setPrescriptions(response.prescriptions || []);
            } catch (fetchError) {
                setError(
                    fetchError.response?.data?.message || "Unable to fetch prescriptions"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchPrescriptions();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [prescriptions.length]);

    const handleStatusChange = async (id, status) => {
        try {
            const response = await updatePrescriptionStatus(id, status);
            setPrescriptions((current) =>
                current.map((item) => (item._id === id ? response.prescription : item))
            );
        } catch (updateError) {
            setError(
                updateError.response?.data?.message || "Unable to update prescription status"
            );
        }
    };

    const totalPages = Math.max(1, Math.ceil(prescriptions.length / ITEMS_PER_PAGE));
    const paginatedPrescriptions = prescriptions.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div>
            <h1 className="text-3xl font-black text-slate-900 mb-6">Prescriptions</h1>

            {error ? (
                <div className="mb-6 border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                </div>
            ) : null}

            <div className="overflow-hidden border border-rose-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-0 text-sm">
                        <thead className="bg-rose-500 text-white">
                            <tr>
                                <th className="border-b border-r border-rose-200 p-4 text-left">Patient</th>
                                <th className="border-b border-r border-rose-200 p-4 text-left">Mobile</th>
                                <th className="border-b border-r border-rose-200 p-4 text-left">Email</th>
                                <th className="border-b border-r border-rose-200 p-4 text-left">Days</th>
                                <th className="border-b border-r border-rose-200 p-4 text-left">Address</th>
                                <th className="border-b border-r border-rose-200 p-4 text-left">File</th>
                                <th className="border-b border-rose-200 p-4 text-left">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="7" className="p-8 text-center text-slate-500">
                                        Loading prescriptions...
                                    </td>
                                </tr>
                            ) : prescriptions.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-8 text-center text-slate-500">
                                        No prescriptions found
                                    </td>
                                </tr>
                            ) : (
                                paginatedPrescriptions.map((item) => (
                                    <tr key={item._id} className="even:bg-rose-50/40">
                                        <td className="border-t border-r border-rose-100 p-4">{item.fullName}</td>
                                        <td className="border-t border-r border-rose-100 p-4">{item.mobileNumber}</td>
                                        <td className="border-t border-r border-rose-100 p-4">{item.email}</td>
                                        <td className="border-t border-r border-rose-100 p-4">{item.daysRequired}</td>
                                        <td className="border-t border-r border-rose-100 p-4 max-w-xs text-slate-600">{item.address}</td>
                                        <td className="border-t border-r border-rose-100 p-4">
                                            <a href={item.prescriptionFile?.url} target="_blank" rel="noreferrer" className="inline-flex gap-1 font-semibold text-[#a94672] hover:text-[#8f355f]">
                                                View <ExternalLink size={15} />
                                            </a>
                                        </td>
                                        <td className="border-t border-rose-100 p-4">
                                            <select
                                                value={item.status}
                                                onChange={(event) =>
                                                    handleStatusChange(item._id, event.target.value)
                                                }
                                                className={`rounded-xl border px-3 py-2 text-xs font-semibold ${statusClasses[item.status] || "bg-slate-100 text-slate-700"
                                                    }`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {!isLoading && prescriptions.length > ITEMS_PER_PAGE ? (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            ) : null}
        </div>
    );
}


