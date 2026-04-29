import { MapPin, Phone, Mail, Clock, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { createContactMessage } from "../services/contactService";

const contactCards = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["12, Health Street, Connaught Place, New Delhi - 110001"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+91 98765 43210", "Emergency: 1800-XXX-XXXX"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["care@lifecclinic.in", "info@lifecclinic.in"],
  },
  {
    icon: Clock,
    title: "Timings",
    lines: ["Mon-Fri: 8am - 8pm", "Sat: 9am - 6pm", "Sun: 10am - 4pm"],
  },
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

export default function Contact() {
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    setForm((current) => ({
      ...current,
      name: current.name || user.name || "",
      email: current.email || user.email || "",
      phone: current.phone || user.phone || "",
    }));
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");
      setSubmittedMessage("");

      const response = await createContactMessage(form);

      setSubmittedMessage(
        response.message ||
          "Your message has been sent successfully. Our team will contact you shortly."
      );
      setForm({
        ...initialForm,
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
      });
    } catch (submitError) {
      setError(
        submitError.response?.data?.message ||
          "Unable to send your message right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-slate-50 py-14 md:py-20">
      <div className="container-padded">
        <div className="mx-auto grid max-w-6xl items-start gap-10 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-slate-900">
                Contact Information
              </h2>
            </div>

            <div className="space-y-5">
              {contactCards.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-100 text-primary">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <div className="mt-1 space-y-1 text-sm leading-7 text-slate-500">
                        {item.lines.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-[24px] border border-red-200 bg-red-50 px-5 py-4">
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-red-500">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-red-600">
                    Emergency Services
                  </h3>
                  <p className="mt-1 text-sm text-red-500">
                    24/7 available - Ambulance: 1800-XXX-XXXX
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Send a Message
            </h2>

            {submittedMessage ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {submittedMessage}
              </div>
            ) : null}

            {error ? (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Your Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Ramesh Kumar"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Phone *
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 9XXXXXXXXX"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
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
                  placeholder="your@email.com"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-blue-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
