import api from "./api";

export async function getAll() {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch {
    return [];
  }
}
