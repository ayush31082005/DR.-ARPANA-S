import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import {
    getPrescriptions,
    updatePrescriptionStatus,
} from "../../services/prescriptionService";
import Pagination from "../../components/ui/Pagination";

const statusClasses = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-emerald-100 text-emerald-700",
    rejected: "bg-red-100 text-red-700",
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
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            ) : null}

            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="p-4 text-left">Patient</th>
                                <th className="p-4 text-left">Mobile</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Days</th>
                                <th className="p-4 text-left">Address</th>
                                <th className="p-4 text-left">File</th>
                                <th className="p-4 text-left">Status</th>
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
                                    <tr key={item._id} className="border-t">
                                        <td className="p-4">{item.fullName}</td>
                                        <td className="p-4">{item.mobileNumber}</td>
                                        <td className="p-4">{item.email}</td>
                                        <td className="p-4">{item.daysRequired}</td>
                                        <td className="p-4 max-w-xs text-slate-600">{item.address}</td>
                                        <td className="p-4">
                                            <a href={item.prescriptionFile?.url} target="_blank" rel="noreferrer" className="text-teal-600 font-semibold inline-flex gap-1">
                                                View <ExternalLink size={15} />
                                            </a>
                                        </td>
                                        <td className="p-4">
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
