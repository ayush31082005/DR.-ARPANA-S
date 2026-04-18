import PolicyPage from "../components/common/PolicyPage";

const sections = [
  {
    heading: "Information We Collect",
    content:
      "We collect the information you submit while booking appointments, placing orders, contacting support, or uploading prescriptions. This may include your name, phone number, email address, delivery address, and relevant health-related details needed to process your request.",
  },
  {
    heading: "How We Use Your Information",
    items: [
      "To schedule appointments and coordinate clinic visits.",
      "To verify prescription uploads and process medicine orders.",
      "To share order updates, appointment confirmations, and support responses.",
      "To improve our services, website experience, and patient communication.",
    ],
  },
  {
    heading: "Data Protection",
    content:
      "We use reasonable administrative and technical safeguards to protect the information shared through this website. Access to sensitive data is limited to authorized staff who need it for appointment handling, prescription review, order support, or customer service.",
  },
  {
    heading: "Third-Party Services",
    content:
      "Payment, delivery, analytics, or communication tools may involve trusted third-party providers. These services are expected to handle data securely and only for the purpose of completing the service requested by the user.",
  },
  {
    heading: "Your Rights",
    items: [
      "You may request correction of inaccurate contact information.",
      "You may contact us to ask how your submitted information is being used.",
      "You may request removal of non-essential communication preferences.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <PolicyPage
      title="Privacy Policy"
      description="Learn how patient, prescription, and order information is collected, used, and protected on our platform."
      lastUpdated="April 18, 2026"
      sections={sections}
    />
  );
}
