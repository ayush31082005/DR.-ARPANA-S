import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
    deleteContactMessage,
    getAllContactMessages,
    updateContactMessageStatus,
} from "../../services/contactService";
import Pagination from "../../components/ui/Pagination";

const statusClasses = {
    new: "bg-sky-100 text-sky-700",
    read: "bg-amber-100 text-amber-700",
    replied: "bg-rose-100 text-rose-700",
};
const ITEMS_PER_PAGE = 10;

export default function AdminContacts() {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                setIsLoading(true);
                setError("");
                const response = await getAllContactMessages();
                setContacts(response.contacts || []);
            } catch (fetchError) {
                setError(
                    fetchError.response?.data?.message || "Unable to fetch contact messages"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchContacts();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [contacts.length]);

    const handleStatusChange = async (id, status) => {
        try {
            const response = await updateContactMessageStatus(id, status);
            setContacts((current) =>
                current.map((item) => (item._id === id ? response.contact : item))
            );
        } catch (updateError) {
            setError(
                updateError.response?.data?.message || "Unable to update message status"
            );
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteContactMessage(id);
            setContacts((current) => current.filter((item) => item._id !== id));
        } catch (deleteError) {
            setError(
                deleteError.response?.data?.message || "Unable to delete message"
            );
        }
    };

    const totalPages = Math.max(1, Math.ceil(contacts.length / ITEMS_PER_PAGE));
    const paginatedContacts = contacts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div>
            <h1 className="text-3xl font-black text-slate-900 mb-6">Contact Messages</h1>

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
                                <th className="border-b border-r border-rose-200 p-4 text-left">Name</th>
                                <th className="border-b border-r border-rose-200 p-4 text-left">Phone</th>
                                <th className="border-b border-r border-rose-200 p-4 text-left">Email</th>
                                <th className="border-b border-r border-rose-200 p-4 text-left">Message</th>
                                <th className="border-b border-r border-rose-200 p-4 text-left">Status</th>
                                <th className="border-b border-rose-200 p-4 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-500">
                                        Loading contact messages...
                                    </td>
                                </tr>
                            ) : contacts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-500">
                                        No contact messages found
                                    </td>
                                </tr>
                            ) : (
                                paginatedContacts.map((item) => (
                                    <tr key={item._id} className="even:bg-rose-50/40">
                                        <td className="border-t border-r border-rose-100 p-4">{item.name}</td>
                                        <td className="border-t border-r border-rose-100 p-4">{item.phone}</td>
                                        <td className="border-t border-r border-rose-100 p-4">{item.email}</td>
                                        <td className="border-t border-r border-rose-100 p-4 max-w-xs text-slate-600">{item.message}</td>
                                        <td className="border-t border-r border-rose-100 p-4">
                                            <select
                                                value={item.status}
                                                onChange={(event) =>
                                                    handleStatusChange(item._id, event.target.value)
                                                }
                                                className={`rounded-xl border px-3 py-2 text-xs font-semibold ${statusClasses[item.status] || "bg-slate-100 text-slate-700"
                                                    }`}
                                            >
                                                <option value="new">New</option>
                                                <option value="read">Read</option>
                                                <option value="replied">Replied</option>
                                            </select>
                                        </td>
                                        <td className="border-t border-rose-100 p-4">
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(item._id)}
                                                className="text-rose-500"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {!isLoading && contacts.length > ITEMS_PER_PAGE ? (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            ) : null}
        </div>
    );
}


