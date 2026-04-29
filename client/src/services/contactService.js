import api from "./api";

export async function createContactMessage(payload) {
  const response = await api.post("/contact", payload);
  return response.data;
}

export async function getAllContactMessages() {
  const response = await api.get("/contact");
  return response.data;
}

export async function updateContactMessageStatus(id, status) {
  const response = await api.patch(`/contact/${id}/status`, { status });
  return response.data;
}

export async function deleteContactMessage(id) {
  const response = await api.delete(`/contact/${id}`);
  return response.data;
}
