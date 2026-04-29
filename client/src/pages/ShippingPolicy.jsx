import PolicyPage from "../components/common/PolicyPage";

const sections = [
  {
    heading: "Order Processing",
    content:
      "Orders are usually reviewed and processed within 24 to 48 working hours after confirmation. Prescription-based orders may require additional verification before dispatch.",
  },
  {
    heading: "Estimated Delivery Time",
    items: [
      "Metro cities: 2 to 4 business days after dispatch.",
      "Other cities and towns: 4 to 7 business days after dispatch.",
      "Remote areas may require additional time depending on courier coverage.",
    ],
  },
  {
    heading: "Shipping Charges",
    content:
      "Delivery charges may vary based on order value, product type, and shipping location. Any applicable shipping fee will be shown during checkout before the order is placed.",
  },
  {
    heading: "Prescription and Sensitive Products",
    content:
      "Some medicines and healthcare items are shipped only after prescription verification and compliance review. Orders may be delayed or canceled if required documentation is incomplete or invalid.",
  },
  {
    heading: "Tracking and Delivery Support",
    items: [
      "You will receive updates when your order is confirmed and dispatched.",
      "If a shipment is delayed, our support team can help you with the latest status.",
      "Please ensure the delivery address and contact number are entered correctly before checkout.",
    ],
  },
];

export default function ShippingPolicy() {
  return (
    <PolicyPage
      title="Shipping Policy"
      description="Review dispatch timelines, delivery expectations, and support details for medicine and wellness product orders."
      lastUpdated="April 18, 2026"
      sections={sections}
    />
  );
}
