import api from "./api";

export async function getAppointments() {
  const { data } = await api.get("/appointments");
  return data;
}

export async function createAppointment(payload) {
  const { data } = await api.post("/appointments", payload);
  return data;
}

export async function sendAppointmentOtp(payload) {
  const { data } = await api.post("/appointments/send-otp", payload);
  return data;
}

export async function verifyAppointmentOtp(payload) {
  const { data } = await api.post("/appointments/verify-otp", payload);
  return data;
}
