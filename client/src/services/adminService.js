import api from "./api";

export async function getAdminStats() {
  const response = await api.get("/admin/stats");
  return response.data;
}

export async function getAdminProfile() {
  const response = await api.get("/admin/profile");
  return response.data;
}

export async function getAllAdmins() {
  const response = await api.get("/admin/admins");
  return response.data;
}

export async function updateAdminProfile(payload) {
  const response = await api.patch("/admin/profile", payload);
  return response.data;
}

export async function changeAdminPassword(payload) {
  const response = await api.patch("/admin/change-password", payload);
  return response.data;
}

export async function createAdminByAdmin(payload) {
  const response = await api.post("/admin/admins", payload);
  return response.data;
}

export async function sendAdminCreationOtp(payload) {
  const response = await api.post("/admin/admins/send-otp", payload);
  return response.data;
}

export async function verifyAdminCreationOtp(payload) {
  const response = await api.post("/admin/admins/verify-otp", payload);
  return response.data;
}

export async function getAdminOrders() {
  const response = await api.get("/admin/orders");
  return response.data;
}

export async function getAdminAppointments() {
  const response = await api.get("/admin/appointments");
  return response.data;
}

export async function updateAdminOrderStatus(id, orderStatus) {
  const response = await api.patch(`/admin/orders/${id}/status`, {
    orderStatus,
  });
  return response.data;
}

export async function updateAdminAppointmentStatus(id, status) {
  const response = await api.patch(`/admin/appointments/${id}/status`, {
    status,
  });
  return response.data;
}
