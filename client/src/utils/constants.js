export const APP_NAME = import.meta.env.VITE_APP_NAME || "Clinic Ecommerce Premium";
const DEFAULT_API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000/api"
  : "/api";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
export const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "918423573070";
export const WHATSAPP_MESSAGE =
  import.meta.env.VITE_WHATSAPP_MESSAGE ||
  "Hello, I need help with Dr. APRANA'S services.";
