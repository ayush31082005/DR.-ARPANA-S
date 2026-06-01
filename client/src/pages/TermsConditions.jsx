import PolicyPage from "../components/common/PolicyPage";

const sections = [
  {
    heading: "Website Use",
    content:
      "By using this website, you agree to provide accurate information during registration, appointment booking, and prescription upload. Misuse of forms, false submissions, or interference with site functionality may result in access restrictions.",
  },
  {
    heading: "Appointments and Consultations",
    items: [
      "Appointment slots are subject to clinic and doctor availability.",
      "Appointment confirmations may change due to emergencies, rescheduling, or operational updates.",
      "Users should provide valid contact details to receive reminders and confirmations.",
    ],
  },
  {
    heading: "Prescription Uploads",
    content:
      "Prescription files uploaded through the website should be clear, valid, and related to the medical guidance being requested. Incomplete or unreadable files may delay review or require resubmission.",
  },
  {
    heading: "Website Content",
    content:
      "Service descriptions, health information, and clinic details are provided to help users understand available care options. Final medical advice should always come from a qualified professional during consultation.",
  },
  {
    heading: "Liability and Support",
    items: [
      "Website content is provided for general information and convenience.",
      "Medical advice should be taken only from qualified professionals during consultation.",
      "For urgent medical emergencies, users should contact emergency services directly instead of relying only on website communication.",
    ],
  },
];

export default function TermsConditions() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      description="Review the key terms related to appointments, prescription uploads, and website usage."
      lastUpdated="April 18, 2026"
      sections={sections}
    />
  );
}
