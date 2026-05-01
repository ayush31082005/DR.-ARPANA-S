import api from "./api";

export async function getAdminStats() {
  const response = await api.get("/admin/stats");
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
