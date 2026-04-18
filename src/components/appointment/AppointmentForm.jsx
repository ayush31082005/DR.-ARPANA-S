import { useState } from "react";
import generateTimeSlots from "../../utils/generateTimeSlots";
import useAppointments from "../../hooks/useAppointments";

export default function AppointmentForm() {
  const { bookAppointment } = useAppointments();
  const [form, setForm] = useState({
    name: "", phone: "", email: "", date: "", time: generateTimeSlots()[0], service: "", doctor: "", message: ""
  });

  const handleChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    bookAppointment(form);
    alert("Appointment request saved in local context.");
  };

  return (
    <form onSubmit={handleSubmit} className="surface grid gap-4 p-6">
      <h3 className="text-xl font-semibold text-slate-900">Book Appointment</h3>
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
      <textarea name="message" className="input-base min-h-[120px]" placeholder="Symptoms or message" value={form.message} onChange={handleChange} />
      <button type="submit" className="btn-primary">Submit Appointment</button>
    </form>
  );
}
