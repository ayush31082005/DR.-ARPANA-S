import { useState } from "react";

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

export default function MyAppointments() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm(initialForm);
    setSubmitted(false);
    setStep(1);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-gradient-to-br from-blue-50 to-white px-6 py-12 text-center shadow-card sm:px-10">
        <span className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600">
          Book Appointment
        </span>
        <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
          Book Your Appointment
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-500">
          Complete the form below and we will confirm your appointment.
        </p>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white px-5 py-8 shadow-card sm:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex items-center justify-center gap-0 overflow-x-auto">
            {steps.map((label, index) => (
              <div key={label} className="flex items-center">
                <div
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    step > index + 1
                      ? "bg-green-100 text-green-700"
                      : step === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-xs font-bold">
                    {step > index + 1 ? "OK" : index + 1}
                  </span>
                  <span className="hidden sm:block">{label}</span>
                </div>
                {index < steps.length - 1 ? (
                  <div
                    className={`h-0.5 w-8 ${
                      step > index + 1 ? "bg-green-300" : "bg-gray-200"
                    }`}
                  />
                ) : null}
              </div>
            ))}
          </div>

          {submitted ? (
            <div className="rounded-3xl border border-green-100 bg-green-50 px-6 py-16 text-center">
              <div className="mb-4 text-6xl">Success</div>
              <h2 className="text-2xl font-bold text-gray-800">
                Appointment Confirmed!
              </h2>
              <p className="mt-2 text-gray-500">
                <strong>{form.name}</strong>, your appointment has been booked.
                <br />
                We will confirm it on <strong>{form.phone}</strong>.
              </p>

              <div className="mt-6 inline-block rounded-2xl border border-gray-100 bg-white px-8 py-4 text-left shadow-sm">
                <div className="text-sm text-gray-500">
                  Service:{" "}
                  <span className="font-medium text-gray-800">{form.service}</span>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Doctor:{" "}
                  <span className="font-medium text-gray-800">{form.doctor}</span>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Date:{" "}
                  <span className="font-medium text-gray-800">
                    {form.date} at {form.time}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="mt-6 block text-sm font-medium text-blue-600 hover:underline mx-auto"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
                {step === 1 ? (
                  <div className="space-y-4">
                    <h3 className="mb-6 text-xl font-bold text-gray-800">
                      Personal Information
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Full Name *
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Ramesh Kumar"
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Phone Number *
                        </label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          type="tel"
                          placeholder="+91 9XXXXXXXXX"
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          type="email"
                          placeholder="your@email.com"
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Date of Birth
                        </label>
                        <input
                          name="dob"
                          value={form.dob}
                          onChange={handleChange}
                          type="date"
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!form.name || !form.phone}
                      className="mt-4 w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-40"
                    >
                      {"Continue ->"}
                    </button>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="space-y-4">
                    <h3 className="mb-6 text-xl font-bold text-gray-800">
                      Choose Service and Doctor
                    </h3>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Service / Department *
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Doctor *
                      </label>
                      <select
                        name="doctor"
                        value={form.doctor}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Notes (optional)
                      </label>
                      <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Describe your concern or symptoms..."
                        className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 rounded-xl border border-gray-200 py-3.5 font-semibold text-gray-600 hover:bg-gray-50"
                      >
                        {"<- Back"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        disabled={!form.service || !form.doctor}
                        className="flex-1 rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-40"
                      >
                        {"Continue ->"}
                      </button>
                    </div>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="space-y-4">
                    <h3 className="mb-6 text-xl font-bold text-gray-800">
                      Choose Date and Time
                    </h3>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Appointment Date *
                      </label>
                      <input
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Time Slot *
                      </label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setForm((current) => ({ ...current, time: slot }))}
                            className={`rounded-xl border py-2.5 text-sm font-medium transition-colors ${
                              form.time === slot
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-gray-200 bg-white text-gray-600 hover:border-blue-300"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 rounded-xl border border-gray-200 py-3.5 font-semibold text-gray-600 hover:bg-gray-50"
                      >
                        {"<- Back"}
                      </button>
                      <button
                        type="submit"
                        disabled={!form.date || !form.time}
                        className="flex-1 rounded-xl bg-green-600 py-3.5 font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-40"
                      >
                        Confirm Appointment
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
