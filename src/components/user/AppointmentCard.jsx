export default function AppointmentCard({ item }) {
  return (
    <div className="surface p-5">
      <h3 className="font-semibold text-slate-900">{item?.doctor || "Doctor Name"}</h3>
      <p className="mt-2 text-sm text-slate-600">{item?.date || "Date not selected"} • {item?.status || "Pending"}</p>
    </div>
  );
}
