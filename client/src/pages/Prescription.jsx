import { useEffect, useMemo, useState } from "react";
import EmptyState from "../components/common/EmptyState";
import Loader from "../components/common/Loader";
import PageHero from "../components/common/PageHero";
import useAuth from "../hooks/useAuth";
import {
  getPrescriptions,
  uploadPrescription,
} from "../services/prescriptionService";

const initialForm = {
  fullName: "",
  mobileNumber: "",
  email: "",
  address: "",
  daysRequired: "",
};

const statusClasses = {
  approved: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
};

export default function MyPrescription() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const fetchPrescriptions = async () => {
      if (!user?.email) {
        setPrescriptions([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        const response = await getPrescriptions(user.email);
        setPrescriptions(response.prescriptions || []);
      } catch (fetchError) {
        setError(
          fetchError.response?.data?.message ||
            "Unable to fetch prescriptions right now."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (!isAuthLoading) {
      fetchPrescriptions();
    }
  }, [isAuthLoading, user]);

  const formattedPrescriptions = useMemo(
    () =>
      prescriptions.map((item) => ({
        ...item,
        displayStatus:
          item.status?.charAt(0).toUpperCase() + item.status?.slice(1),
        uploadedAt: new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(item.createdAt)),
        fileName:
          item.originalFileName ||
          item.prescriptionFile?.publicId?.split("/").pop() ||
          "Prescription File",
        note:
          item.status === "approved"
            ? "Prescription reviewed. You can continue with your medicine order."
            : item.status === "rejected"
              ? "Prescription needs a clearer or corrected file. Please re-upload."
              : "Your prescription is under review by our team.",
      })),
    [prescriptions]
  );

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

      const response = await uploadPrescription(payload);
      const createdPrescription = response.prescription;

      setPrescriptions((current) => [createdPrescription, ...current]);
      setSubmittedMessage(
        `Prescription submitted successfully. Review updates will be sent to ${form.email}.`
      );
      setForm({
        ...initialForm,
        fullName: user?.name || "",
        email: user?.email || "",
      });
      setSelectedFile(null);
      setShowUploadForm(false);
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

  if (isAuthLoading || isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageHero
        title="My Prescriptions"
        description="View your uploaded prescriptions, review status, and doctor notes here."
      />

      <section className="section-space bg-slate-50">
        <div className="container-padded">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Uploaded Prescriptions
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Total {prescriptions.length} prescriptions available
              </p>
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setSubmittedMessage("");
                setShowUploadForm((current) => !current);
              }}
            >
              {showUploadForm ? "Close Form" : "+ Upload New Prescription"}
            </button>
          </div>

          {submittedMessage ? (
            <div className="mb-8 rounded-[28px] border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm font-medium text-emerald-700">
              {submittedMessage}
            </div>
          ) : null}

          {error ? (
            <div className="mb-8 rounded-[28px] border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-700">
              {error}
            </div>
          ) : null}

          {showUploadForm ? (
            <form
              onSubmit={handleSubmit}
              className="surface mb-8 grid gap-6 p-6 sm:p-8"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  Upload Prescription
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  Submit your details and prescription file here
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="prescription-name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="prescription-name"
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="input-base"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="prescription-mobile"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="prescription-mobile"
                    name="mobileNumber"
                    type="tel"
                    value={form.mobileNumber}
                    onChange={handleChange}
                    placeholder="+91 98XXXXXXXX"
                    className="input-base"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="prescription-email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email
                  </label>
                  <input
                    id="prescription-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="input-base"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="prescription-days"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Number of Days of Medication Required
                  </label>
                  <input
                    id="prescription-days"
                    name="daysRequired"
                    type="number"
                    min="1"
                    value={form.daysRequired}
                    onChange={handleChange}
                    placeholder="For example, 15"
                    className="input-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="prescription-address"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Address
                </label>
                <textarea
                  id="prescription-address"
                  name="address"
                  rows={4}
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  className="input-base min-h-[120px] resize-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="prescription-file"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Upload Prescription File
                </label>
                <input
                  id="prescription-file"
                  name="prescriptionFile"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="block w-full rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:font-semibold file:text-slate-700"
                  required
                />
                <p className="mt-2 text-xs text-slate-500">
                  Supported: PDF, JPG, JPEG, PNG
                </p>
                {selectedFile ? (
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    Selected file: {selectedFile.name}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="btn-primary sm:min-w-[220px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Prescription"}
                </button>
                <button
                  type="button"
                  className="btn-outline sm:min-w-[160px]"
                  disabled={isSubmitting}
                  onClick={() => setShowUploadForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : null}

          {formattedPrescriptions.length > 0 ? (
            <div className="grid gap-6">
              {formattedPrescriptions.map((item, index) => (
                <div
                  key={item._id}
                  className="surface overflow-hidden p-6 transition duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex flex-1 gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-teal-100 text-sm font-bold text-slate-700">
                        RX
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">
                              {item.fileName}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                              Prescription ID: RX-{1000 + index + 1}
                            </p>
                          </div>

                          <span
                            className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                              statusClasses[item.status] || statusClasses.pending
                            }`}
                          >
                            {item.displayStatus}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                              Contact
                            </p>
                            <p className="mt-1 text-sm font-medium text-slate-700">
                              {item.fullName}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                              Uploaded On
                            </p>
                            <p className="mt-1 text-sm font-medium text-slate-700">
                              {item.uploadedAt}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                              Review Note
                            </p>
                            <p className="mt-1 text-sm font-medium text-slate-700">
                              {item.note}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 lg:justify-end">
                      <a
                        href={item.prescriptionFile?.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-outline"
                      >
                        View File
                      </a>
                      <a
                        href={item.prescriptionFile?.url}
                        target="_blank"
                        rel="noreferrer"
                        download={item.fileName}
                        className="btn-outline"
                      >
                        Download
                      </a>
                      {item.status === "rejected" ? (
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() => {
                            setSubmittedMessage("");
                            setShowUploadForm(true);
                          }}
                        >
                          Re-upload
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="No prescriptions yet"
                description="Upload a prescription to start medicine review and order support."
              />
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setShowUploadForm(true)}
                >
                  Upload Prescription
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
