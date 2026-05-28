import { useState } from "react";
import useAppointments from "../hooks/useAppointments";

const doctors = [
  "Dr. Rajesh Sharma - Cardiology",
  "Dr. Priya Mehta - Neurology",
  "Dr. Anil Gupta - Orthopedics",
  "Dr. Sunita Verma - Gynecology",
  "Dr. Vikram Nair - Pediatrics",
  "Dr. Pooja Kapoor - Dermatology",
  "Dr. Sanjay Rao - Pulmonology",
  "Dr. Meera Joshi - Ophthalmology",
];

const services = [
  "General Checkup",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Gynecology",
  "Pediatrics",
  "Dermatology",
  "Dentistry",
  "Eye Care",
  "Other",
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  dob: "",
  service: "",
  doctor: "",
  date: "",
  time: "",
  notes: "",
};

const steps = ["Personal Info", "Doctor & Service", "Date & Time"];

export default function Appointment() {
  const { bookAppointment } = useAppointments();
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);
  const canSubmit = Boolean(form.date && form.time);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFeedback({ type: "", message: "" });
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setFeedback({ type: "", message: "" });
      const response = await bookAppointment(form);
      setConfirmedAppointment(response.appointment);
      setSubmitted(true);
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error.response?.data?.message || "Unable to book appointment right now",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setStep(1);
    setSubmitted(false);
    setConfirmedAppointment(null);
    setFeedback({ type: "", message: "" });
  };

  return (
    <section className="bg-slate-50 py-10 md:py-14">
      <div className="container-padded">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex w-full justify-start overflow-x-auto px-1 pb-2 sm:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="inline-flex min-w-max items-center gap-2 pr-3 sm:gap-4 sm:px-2">
              {steps.map((label, index) => {
                const current = index + 1;
                const isDone = step > current;
                const isActive = step === current;

                return (
                  <div key={label} className="flex shrink-0 items-center gap-2 sm:gap-4">
                    <div
                      className={`flex items-center gap-1.5 rounded-full px-2.5 py-2 text-[11px] font-semibold transition-colors sm:gap-3 sm:px-5 sm:py-3 sm:text-sm ${
                        isDone
                          ? "bg-[#f6a04a] text-white"
                          : isActive
                            ? "bg-[#f6a04a] text-white"
                            : "bg-[#ffe2bf] text-[#c7781f] shadow-sm"
                      }`}
                    >
                      <span
                        className={`grid h-5 w-5 place-items-center rounded-full border text-[11px] sm:h-6 sm:w-6 sm:text-xs ${
                          isDone || isActive ? "border-current" : "border-[#f0b56a]"
                        }`}
                      >
                        {isDone ? "OK" : current}
                      </span>
                      <span className="whitespace-nowrap">{label}</span>
                    </div>
                    {index < steps.length - 1 ? (
                      <div
                        className={`h-0.5 w-4 sm:w-8 ${
                          step > current ? "bg-[#f6bf80]" : "bg-[#f8d9b0]"
                        }`}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-card sm:p-8 lg:p-10">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                  OK
                </div>
                <h2 className="mt-5 text-3xl font-bold text-slate-900">
                  Appointment Confirmed
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                  Your appointment request has been submitted successfully. Our team will contact you shortly to confirm your booking.
                </p>

                <div className="mx-auto mt-8 max-w-xl rounded-[24px] border border-slate-200 bg-slate-50 p-6 text-left">
                  <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                    <p>
                      Patient Name: <span className="font-semibold text-slate-900">{confirmedAppointment?.name || form.name}</span>
                    </p>
                    <p>
                      Phone: <span className="font-semibold text-slate-900">{confirmedAppointment?.phone || form.phone}</span>
                    </p>
                    <p>
                      Service: <span className="font-semibold text-slate-900">{confirmedAppointment?.service || form.service}</span>
                    </p>
                    <p>
                      Doctor: <span className="font-semibold text-slate-900">{confirmedAppointment?.doctor || form.doctor}</span>
                    </p>
                    <p className="sm:col-span-2">
                      Appointment: <span className="font-semibold text-slate-900">{confirmedAppointment?.date || form.date} at {confirmedAppointment?.time || form.time}</span>
                    </p>
                    <p className="sm:col-span-2">
                      Status: <span className="font-semibold capitalize text-slate-900">{confirmedAppointment?.status || "pending"}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-8 rounded-2xl bg-[#f6a04a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ee973f]"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {feedback.message ? (
                  <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {feedback.message}
                  </div>
                ) : null}

                {step === 1 ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900">Personal Information</h2>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Full Name *
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Ramesh Kumar"
                          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 outline-none transition focus:border-[#f0b56a] focus:ring-4 focus:ring-[#fce6cc]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Phone Number *
                        </label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          type="tel"
                          placeholder="+91 9XXXXXXXXX"
                          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 outline-none transition focus:border-[#f0b56a] focus:ring-4 focus:ring-[#fce6cc]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Email
                        </label>
                        <input
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          type="email"
                          placeholder="name@email.com"
                          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 outline-none transition focus:border-[#f0b56a] focus:ring-4 focus:ring-[#fce6cc]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Date of Birth
                        </label>
                        <input
                          name="dob"
                          value={form.dob}
                          onChange={handleChange}
                          type="date"
                          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 outline-none transition focus:border-[#f0b56a] focus:ring-4 focus:ring-[#fce6cc]"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!form.name || !form.phone}
                      className="w-full rounded-2xl bg-[#f6a04a] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#ee973f] disabled:bg-[#f7b26a] disabled:text-white"
                    >
                      Continue
                    </button>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900">Doctor and Service</h2>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Service / Department *
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 outline-none transition focus:border-[#f0b56a] focus:ring-4 focus:ring-[#fce6cc]"
                      >
                        <option value="">Select a service...</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Doctor *
                      </label>
                      <select
                        name="doctor"
                        value={form.doctor}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 outline-none transition focus:border-[#f0b56a] focus:ring-4 focus:ring-[#fce6cc]"
                      >
                        <option value="">Select a doctor...</option>
                        {doctors.map((doctor) => (
                          <option key={doctor} value={doctor}>
                            {doctor}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Notes (optional)
                      </label>
                      <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe symptoms or any relevant details..."
                        className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 outline-none transition focus:border-[#f0b56a] focus:ring-4 focus:ring-[#fce6cc]"
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        disabled={!form.service || !form.doctor}
                        className="rounded-2xl bg-[#f6a04a] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#ee973f] disabled:bg-[#f7b26a] disabled:text-white"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900">Date and Time</h2>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Appointment Date *
                      </label>
                      <input
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 outline-none transition focus:border-[#f0b56a] focus:ring-4 focus:ring-[#fce6cc]"
                      />
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-medium text-slate-700">
                        Time Slot *
                      </label>
                      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setForm((current) => ({ ...current, time: slot }))}
                            className={`rounded-2xl border px-4 py-4 text-sm font-medium transition-colors ${
                              form.time === slot
                                ? "border-[#f6a04a] bg-[#f6a04a] text-white shadow-md"
                                : "border-slate-200 bg-white text-slate-700 hover:border-[#f0b56a]"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                      <p className="mt-3 text-sm text-slate-500">
                        Selected time:{" "}
                        <span className="font-semibold text-slate-900">
                          {form.time || "Please choose a slot"}
                        </span>
                      </p>
                    </div>

                    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={!canSubmit || isSubmitting}
                        className={`flex-1 rounded-2xl px-6 py-4 text-base font-semibold shadow-sm transition ${
                          canSubmit && !isSubmitting
                            ? "bg-[#f6a04a] text-white hover:bg-[#ee973f]"
                            : "cursor-not-allowed bg-slate-200 text-slate-400"
                        }`}
                      >
                        {isSubmitting ? "Confirming..." : "Confirm Appointment"}
                      </button>
                    </div>
                  </div>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
