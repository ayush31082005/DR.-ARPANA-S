import { useEffect, useState } from "react";
import PageHero from "../components/common/PageHero";
import useAuth from "../hooks/useAuth";
import { uploadPrescription } from "../services/prescriptionService";

const initialForm = {
  fullName: "",
  mobileNumber: "",
  email: "",
  address: "",
  daysRequired: "",
};

export default function MyPrescription() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (user?.email) {
      setForm((current) => ({
        ...current,
        fullName: current.fullName || user.name || "",
        email: current.email || user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files?.[0] ?? null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Please select a prescription file before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      setSubmittedMessage("");

      const payload = new FormData();
      payload.append("fullName", form.fullName);
      payload.append("mobileNumber", form.mobileNumber);
      payload.append("email", form.email);
      payload.append("daysRequired", form.daysRequired);
      payload.append("address", form.address);
      payload.append("prescriptionFile", selectedFile);

      await uploadPrescription(payload);

      setSubmittedMessage(
        `Prescription submitted successfully. Review updates will be sent to ${form.email}.`
      );
      setForm({
        ...initialForm,
        fullName: user?.name || "",
        email: user?.email || "",
      });
      setSelectedFile(null);
    } catch (submitError) {
      setError(
        submitError.response?.data?.message ||
          submitError.response?.data?.error ||
          "Unable to submit prescription right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        title="Upload Prescription"
        description="Upload your prescription file and submit your details for medicine review."
      />

      <section className="section-space bg-slate-50">
        <div className="container-padded">
          <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-card sm:p-8 lg:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Prescription Form
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Submit your prescription here
              </h2>
              <p className="mt-3 text-slate-600">
                Fill in your details and upload the prescription file. History
                and review status will appear in your dashboard prescription tab.
              </p>
            </div>

            {submittedMessage ? (
              <div className="mt-6 rounded-[28px] border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm font-medium text-emerald-700">
                {submittedMessage}
              </div>
            ) : null}

            {error ? (
              <div className="mt-6 rounded-[28px] border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-700">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
              <div className="grid gap-5 md:grid-cols-2">
                <input
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="input-base"
                  required
                />
                <input
                  name="mobileNumber"
                  type="tel"
                  value={form.mobileNumber}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="input-base"
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="input-base"
                  required
                />
                <input
                  name="daysRequired"
                  type="number"
                  min="1"
                  value={form.daysRequired}
                  onChange={handleChange}
                  placeholder="Number of Days Required"
                  className="input-base"
                  required
                />
              </div>

              <textarea
                name="address"
                rows={4}
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="input-base min-h-[120px] resize-none"
                required
              />

              <div className="rounded-[28px] border-2 border-dashed border-emerald-300 bg-emerald-50/40 p-8 text-center">
                <h3 className="text-xl font-bold text-slate-900">
                  Upload prescription image or PDF
                </h3>
                <p className="mt-2 text-slate-500">
                  Supported formats: PDF, JPG, JPEG, PNG
                </p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="mt-5"
                  required
                />
                {selectedFile ? (
                  <p className="mt-3 text-sm font-medium text-slate-700">
                    Selected file: {selectedFile.name}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className="btn-primary sm:min-w-[220px]"
                disabled={isSubmitting || isAuthLoading}
              >
                {isSubmitting ? "Submitting..." : "Submit Prescription"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
