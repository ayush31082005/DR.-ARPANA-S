const createProductImage = (title, background, accent) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${background}" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg)" rx="36" />
      <circle cx="620" cy="120" r="72" fill="${accent}" opacity="0.18" />
      <circle cx="175" cy="460" r="110" fill="${accent}" opacity="0.12" />
      <rect x="185" y="130" width="430" height="250" rx="40" fill="#ffffff" opacity="0.95" />
      <rect x="245" y="175" width="310" height="22" rx="11" fill="${accent}" opacity="0.25" />
      <rect x="245" y="218" width="240" height="18" rx="9" fill="${accent}" opacity="0.16" />
      <rect x="245" y="252" width="275" height="18" rx="9" fill="${accent}" opacity="0.16" />
      <rect x="245" y="286" width="190" height="18" rx="9" fill="${accent}" opacity="0.16" />
      <text x="400" y="455" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#0f172a">${title}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const productsData = [
  {
    id: "p1",
    name: "Vitamin C Tablets",
    price: 299,
    category: "Supplements",
    filterGroup: "Immunity Support",
    rating: 4.5,
    stock: 20,
    description: "Daily immunity support tablets.",
    image: createProductImage("Vitamin C", "#e8f5e9", "#16a34a")
  },
  {
    id: "p2",
    name: "Blood Pressure Monitor",
    price: 1499,
    category: "Devices",
    filterGroup: "Monitoring Devices",
    rating: 4.7,
    stock: 8,
    description: "Digital BP machine for home use.",
    image: createProductImage("BP Monitor", "#e0f2fe", "#0284c7")
  },
  {
    id: "p3",
    name: "Protein Powder",
    price: 999,
    category: "Nutrition",
    filterGroup: "Daily Wellness",
    rating: 4.2,
    stock: 15,
    description: "Daily wellness protein supplement.",
    image: createProductImage("Protein", "#fef3c7", "#d97706")
  },
  {
    id: "p4",
    name: "Hand Sanitizer",
    price: 149,
    category: "Personal Care",
    filterGroup: "Personal Hygiene",
    rating: 4.1,
    stock: 30,
    description: "Quick clean alcohol-based sanitizer.",
    image: createProductImage("Sanitizer", "#dbeafe", "#2563eb")
  },
  {
    id: "p5",
    name: "Digital Thermometer",
    price: 249,
    category: "Devices",
    filterGroup: "Monitoring Devices",
    rating: 4.4,
    stock: 24,
    description: "Fast and accurate temperature readings.",
    image: createProductImage("Thermometer", "#fce7f3", "#db2777")
  },
  {
    id: "p6",
    name: "Calcium Capsules",
    price: 349,
    category: "Supplements",
    filterGroup: "Daily Wellness",
    rating: 4.6,
    stock: 18,
    description: "Daily bone health and strength support.",
    image: createProductImage("Calcium", "#ecfccb", "#65a30d")
  },
  {
    id: "p7",
    name: "Pulse Oximeter",
    price: 899,
    category: "Devices",
    filterGroup: "Home Care Essentials",
    rating: 4.3,
    stock: 11,
    description: "Easy oxygen saturation monitoring at home.",
    image: createProductImage("Oximeter", "#e0e7ff", "#4338ca")
  },
  {
    id: "p8",
    name: "Herbal Face Wash",
    price: 199,
    category: "Personal Care",
    filterGroup: "Personal Hygiene",
    rating: 4.4,
    stock: 35,
    description: "Gentle daily cleansing with herbal extracts.",
    image: createProductImage("Face Wash", "#f0fdf4", "#15803d")
  }
];
