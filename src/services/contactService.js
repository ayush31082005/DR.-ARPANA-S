import api from "./api";

export async function getAll() {
  try {
    const response = await api.get("/contact");
    return response.data;
  } catch {
    return [];
  }
}
