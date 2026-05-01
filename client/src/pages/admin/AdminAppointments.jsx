import { useEffect, useState } from "react";
import Pagination from "../../components/ui/Pagination";
import {
  getAdminAppointments,
  updateAdminAppointmentStatus,
} from "../../services/adminService";

const statusClasses = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-sky-100 text-sky-700",
};

const ITEMS_PER_PAGE = 10;

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await getAdminAppointments();
        setAppointments(response.appointments || []);
      } catch (fetchError) {
        setError(
          fetchError.response?.data?.message || "Unable to fetch appointments"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [appointments.length]);

  const handleStatusChange = async (id, status) => {
    try {
      const response = await updateAdminAppointmentStatus(id, status);
      setAppointments((current) =>
        current.map((item) =>
          item._id === id ? response.appointment : item
        )
      );
    } catch (updateError) {
      setError(
        updateError.response?.data?.message ||
          "Unable to update appointment status"
      );
    }
  };

  const totalPages = Math.max(
    1,
    Math.ceil(appointments.length / ITEMS_PER_PAGE)
  );
  const paginatedAppointments = appointments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-black text-slate-900">
        Appointments
      </h1>

      {error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 text-left">Patient</th>
                <th className="p-4 text-left">Contact</th>
                <th className="p-4 text-left">Service</th>
                <th className="p-4 text-left">Doctor</th>
                <th className="p-4 text-left">Date & Time</th>
                <th className="p-4 text-left">Notes</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-500">
                    Loading appointments...
                  </td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-500">
                    No appointments found
                  </td>
                </tr>
              ) : (
                paginatedAppointments.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="p-4">
                      <div className="font-semibold text-slate-800">
                        {item.name || "Patient"}
                      </div>
                      <div className="text-xs text-slate-500">
                        {item.dob || "DOB not provided"}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      <div>{item.phone || "No phone"}</div>
                      <div className="text-xs text-slate-500">
                        {item.email || "No email"}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      {item.service || "Not selected"}
                    </td>
                    <td className="p-4 text-slate-600">
                      {item.doctor || "Not selected"}
                    </td>
                    <td className="p-4 text-slate-600">
                      <div>{formatAppointmentDate(item.date)}</div>
                      <div className="text-xs text-slate-500">
                        {item.time || "Time not selected"}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      <div className="max-w-[220px] truncate">
                        {item.notes || "No notes"}
                      </div>
                    </td>
                    <td className="p-4">
                      <select
                        value={item.status}
                        onChange={(event) =>
                          handleStatusChange(item._id, event.target.value)
                        }
                        className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
                          statusClasses[item.status] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!isLoading && appointments.length > ITEMS_PER_PAGE ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : null}
    </div>
  );
}

function formatAppointmentDate(value) {
  if (!value) {
    return "Date not selected";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}
