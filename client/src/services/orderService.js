import api from "./api";

export async function createCashOnDeliveryOrder(payload) {
  const response = await api.post("/orders", payload);
  return response.data;
}

export async function getMyOrders() {
  const response = await api.get("/orders/my");
  return response.data;
}

export async function createRazorpayOrder(payload) {
  const response = await api.post("/payments/create-order", payload);
  return response.data;
}

export async function verifyOnlinePayment(payload) {
  const response = await api.post("/payments/verify-payment", payload);
  return response.data;
}
