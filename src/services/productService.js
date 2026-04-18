import api from "./api";

export async function getAll() {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch {
    return [];
  }
}
