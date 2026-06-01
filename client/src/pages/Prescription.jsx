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
        center
      />

      <section className="section-space bg-slate-50">
        <div className="container-padded">
          <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-4 shadow-card sm:rounded-[32px] sm:p-8 lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm sm:tracking-[0.24em]">
                Prescription Form
              </p>
              <h2 className="mt-2 max-w-[13ch] text-2xl font-bold leading-tight text-slate-900 sm:max-w-none sm:text-3xl">
                Submit your prescription here
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Fill in your details and upload the prescription file. History
                and review status will appear in your dashboard prescription tab.
              </p>
            </div>

            {submittedMessage ? (
              <div className="mt-6 rounded-[24px] border border-rose-200 bg-rose-50 px-4 py-4 text-sm font-medium text-rose-700 sm:rounded-[28px] sm:px-6">
                {submittedMessage}
              </div>
            ) : null}

            {error ? (
              <div className="mt-6 rounded-[24px] border border-red-200 bg-red-50 px-4 py-4 text-sm font-medium text-red-700 sm:rounded-[28px] sm:px-6">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:mt-8 sm:gap-6">
              <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
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
                className="input-base min-h-[110px] resize-none sm:min-h-[120px]"
                required
              />

              <div className="rounded-[24px] border-2 border-dashed border-rose-300 bg-rose-50/60 p-4 text-center sm:rounded-[28px] sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Upload prescription image or PDF
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Supported formats: PDF, JPG, JPEG, PNG
                </p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="mt-4 w-full text-sm sm:mt-5"
                  required
                />
                {selectedFile ? (
                  <p className="mt-3 break-all text-sm font-medium text-slate-700">
                    Selected file: {selectedFile.name}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className="btn-primary w-full sm:w-auto sm:min-w-[220px]"
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

