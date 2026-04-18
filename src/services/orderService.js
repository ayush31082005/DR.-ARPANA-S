import api from "./api";

export async function getAll() {
  try {
    const response = await api.get("/orders");
    return response.data;
  } catch {
    return [];
  }
}
