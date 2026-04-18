import PolicyPage from "../components/common/PolicyPage";

const sections = [
  {
    heading: "Website Use",
    content:
      "By using this website, you agree to provide accurate information during registration, appointment booking, checkout, and prescription upload. Misuse of forms, false submissions, or interference with site functionality may result in access restrictions.",
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
    heading: "Prescription Orders",
    content:
      "Certain products may be purchased only after valid prescription review. The clinic or pharmacy team may reject or delay an order if the uploaded prescription is incomplete, unclear, expired, or does not match the requested medicine.",
  },
  {
    heading: "Payments and Pricing",
    content:
      "Product pricing, availability, and promotional offers may change without prior notice. Orders will be processed according to the prices shown at the time of checkout, subject to verification and stock availability.",
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
      description="Review the key terms related to appointments, orders, payments, prescription uploads, and website usage."
      lastUpdated="April 18, 2026"
      sections={sections}
    />
  );
}
