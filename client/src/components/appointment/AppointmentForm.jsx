import { useState } from "react";
import generateTimeSlots from "../../utils/generateTimeSlots";
import useAppointments from "../../hooks/useAppointments";

export default function AppointmentForm() {
  const { bookAppointment } = useAppointments();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [form, setForm] = useState({
    name: "", phone: "", email: "", date: "", time: generateTimeSlots()[0], service: "", doctor: "", notes: ""
  });

  const handleChange = (event) => {
    setFeedback({ type: "", message: "" });
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await bookAppointment(form);
      setFeedback({ type: "success", message: response.message });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error.response?.data?.message || "Unable to submit appointment",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="surface grid gap-4 p-6">
      <h3 className="text-xl font-semibold text-slate-900">Book Appointment</h3>
      {feedback.message ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            feedback.type === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {feedback.message}
        </div>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" className="input-base" placeholder="Patient name" value={form.name} onChange={handleChange} />
        <input name="phone" className="input-base" placeholder="Phone number" value={form.phone} onChange={handleChange} />
      </div>
      <input name="email" className="input-base" placeholder="Email address" value={form.email} onChange={handleChange} />
      <div className="grid gap-4 md:grid-cols-2">
        <input name="date" type="date" className="input-base" value={form.date} onChange={handleChange} />
        <select name="time" className="input-base" value={form.time} onChange={handleChange}>
          {generateTimeSlots().map((slot) => <option key={slot}>{slot}</option>)}
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input name="service" className="input-base" placeholder="Service" value={form.service} onChange={handleChange} />
        <input name="doctor" className="input-base" placeholder="Doctor" value={form.doctor} onChange={handleChange} />
      </div>
      <textarea name="notes" className="input-base min-h-[120px]" placeholder="Symptoms or message" value={form.notes} onChange={handleChange} />
      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? "Submitting..." : "Submit Appointment"}
      </button>
    </form>
  );
}
