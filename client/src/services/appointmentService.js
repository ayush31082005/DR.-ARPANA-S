import api from "./api";

export async function getAppointments() {
  const { data } = await api.get("/appointments");
  return data;
}

export async function createAppointment(payload) {
  const { data } = await api.post("/appointments", payload);
  return data;
}
