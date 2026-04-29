import { Link } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import Loader from "../components/common/Loader";
import AppointmentCard from "../components/user/AppointmentCard";
import useAppointments from "../hooks/useAppointments";
import useAuth from "../hooks/useAuth";

export default function MyAppointments() {
  const { appointments, isLoading, refreshAppointments } = useAppointments();
  const { user } = useAuth();

  const matchedAppointments =
    user?.email
      ? appointments.filter(
          (appointment) =>
            appointment.email &&
            appointment.email.toLowerCase() === user.email.toLowerCase()
        )
      : appointments;

  const visibleAppointments =
    matchedAppointments.length > 0 ? matchedAppointments : appointments;

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,#ecfeff_0%,#ffffff_48%,#f0fdf4_100%)] px-6 py-10 shadow-card sm:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">
              Appointments
            </span>
            <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">
              Your Appointment Requests
            </h1>
            <p className="mt-4 text-slate-600">
              View recently booked appointments, their current status, and your
              selected doctor and time slot.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => refreshAppointments().catch(() => {})}
              className="btn-outline"
            >
              Refresh List
            </button>
            <Link to="/appointment" className="btn-primary">
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
          description="Once you book an appointment from the website, it will appear here."
        />
      ) : (
        <section className="grid gap-5">
          {visibleAppointments.map((item) => (
            <AppointmentCard key={item._id || item.id} item={item} />
          ))}
        </section>
      )}
    </div>
  );
}
