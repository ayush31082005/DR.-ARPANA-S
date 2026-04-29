import PolicyPage from "../components/common/PolicyPage";

const sections = [
  {
    heading: "Eligible Return Requests",
    content:
      "Return requests are considered only for products that arrive damaged, expired, incorrect, or compromised during delivery. For safety reasons, not all healthcare products may be eligible for return.",
  },
  {
    heading: "Items That May Not Be Returned",
    items: [
      "Opened or used medicines, supplements, or personal care items.",
      "Prescription medicines dispensed against a valid uploaded prescription unless the delivered item is incorrect or damaged.",
      "Products returned without original packaging or batch details when required.",
    ],
  },
  {
    heading: "Return Request Timeline",
    content:
      "Customers should raise a return request within 48 hours of delivery. Clear photos of the package and product may be requested to verify damage, mismatch, or expiry-related issues.",
  },
  {
    heading: "Inspection and Approval",
    content:
      "Once a return request is submitted, our team reviews the details and confirms whether the item is eligible for pickup, replacement, store credit, or refund assistance. Approval depends on product condition and compliance requirements.",
  },
  {
    heading: "How to Start a Return",
    items: [
      "Contact support with your order number and product issue.",
      "Share photos if the item is damaged, broken, or incorrect.",
      "Wait for confirmation before handing the package to a courier or pickup partner.",
    ],
  },
];

export default function ReturnPolicy() {
  return (
    <PolicyPage
      title="Return Policy"
      description="Understand when returns are accepted, how product checks work, and the steps to request support."
      lastUpdated="April 18, 2026"
      sections={sections}
    />
  );
}
