import api from "./api";

export async function getAdminStats() {
  const response = await api.get("/admin/stats");
  return response.data;
}

export async function getAdminOrders() {
  const response = await api.get("/admin/orders");
  return response.data;
}

export async function updateAdminOrderStatus(id, orderStatus) {
  const response = await api.patch(`/admin/orders/${id}/status`, {
    orderStatus,
  });
  return response.data;
}
