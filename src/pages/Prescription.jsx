import { useState } from "react";
import PageHero from "../components/common/PageHero";

const initialPrescriptions = [
  {
    id: "RX-1001",
    doctor: "Dr. Aarav Sharma",
    uploadedAt: "12 Apr 2026",
    fileName: "prescription-april.pdf",
    status: "Approved",
    note: "Medicines verified. You can proceed with order.",
  },
  {
    id: "RX-1002",
    doctor: "Dr. Priya Verma",
    uploadedAt: "08 Apr 2026",
    fileName: "skin-treatment-note.jpg",
    status: "Pending",
    note: "Waiting for pharmacist review.",
  },
  {
    id: "RX-1003",
    doctor: "Dr. Rohan Mehta",
    uploadedAt: "01 Apr 2026",
    fileName: "child-care-prescription.pdf",
    status: "Rejected",
    note: "Image not clear. Please upload a clearer file.",
  },
];

const initialForm = {
  name: "",
  mobile: "",
  email: "",
  address: "",
  medicineDays: "",
};

const statusClasses = {
  Approved: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function MyPrescription() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [form, setForm] = useState(initialForm);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files?.[0] ?? null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedFile) {
      return;
    }

    const nextPrescription = {
      id: `RX-${1000 + prescriptions.length + 1}`,
      doctor: "Doctor assignment pending",
      uploadedAt: new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date()),
      fileName: selectedFile.name,
      status: "Pending",
      note: `Review started. Update will be shared on ${form.email}.`,
    };

    setPrescriptions((current) => [nextPrescription, ...current]);
    setSubmittedMessage(
      `Prescription submitted successfully. Review updates will be sent to ${form.email}.`,
    );
    setForm(initialForm);
    setSelectedFile(null);
    setShowUploadForm(false);
  };

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
                    name="name"
                    type="text"
                    value={form.name}
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
                    name="mobile"
                    type="tel"
                    value={form.mobile}
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
                    name="medicineDays"
                    type="number"
                    min="1"
                    value={form.medicineDays}
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
                <button type="submit" className="btn-primary sm:min-w-[220px]">
                  Submit Prescription
                </button>
                <button
                  type="button"
                  className="btn-outline sm:min-w-[160px]"
                  onClick={() => setShowUploadForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : null}

          {prescriptions.length > 0 ? (
            <div className="grid gap-6">
              {prescriptions.map((item) => (
                <div
                  key={item.id}
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
                              Prescription ID: {item.id}
                            </p>
                          </div>

                          <span
                            className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                              statusClasses[item.status]
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                              Doctor
                            </p>
                            <p className="mt-1 text-sm font-medium text-slate-700">
                              {item.doctor}
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
                      <button type="button" className="btn-outline">
                        View File
                      </button>
                      <button type="button" className="btn-outline">
                        Download
                      </button>
                      {item.status === "Rejected" ? (
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() => setShowUploadForm(true)}
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
            <div className="surface flex min-h-[320px] flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 text-5xl font-bold text-slate-300">RX</div>
              <h3 className="text-xl font-bold text-slate-900">
                No Prescriptions Yet
              </h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
                You have not uploaded any prescriptions yet. Upload a new
                prescription to start the medicine order or review process.
              </p>
              <button
                type="button"
                className="btn-primary mt-6"
                onClick={() => setShowUploadForm(true)}
              >
                Upload Prescription
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
