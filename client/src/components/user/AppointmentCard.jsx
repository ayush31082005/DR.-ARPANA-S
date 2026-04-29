import formatDate from "../../utils/formatDate";

const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-sky-100 text-sky-700",
};

export default function AppointmentCard({ item }) {
  const status = item?.status || "pending";

  return (
    <div className="surface p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
            {item?.service || "Appointment"}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            {item?.doctor || "Doctor not selected"}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {formatDate(item?.date) || "Date not selected"} at {item?.time || "Time not selected"}
          </p>
        </div>

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
            statusStyles[status] || "bg-slate-100 text-slate-700"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <p>
          Patient:{" "}
          <span className="font-semibold text-slate-900">
            {item?.name || "Not provided"}
          </span>
        </p>
        <p>
          Phone:{" "}
          <span className="font-semibold text-slate-900">
            {item?.phone || "Not provided"}
          </span>
        </p>
        <p>
          Email:{" "}
          <span className="font-semibold text-slate-900">
            {item?.email || "Not provided"}
          </span>
        </p>
        <p>
          DOB:{" "}
          <span className="font-semibold text-slate-900">
            {item?.dob ? formatDate(item.dob) : "Not provided"}
          </span>
        </p>
      </div>

      {item?.notes ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <span className="font-semibold text-slate-900">Notes:</span> {item.notes}
        </div>
      ) : null}
    </div>
  );
}
