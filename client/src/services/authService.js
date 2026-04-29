import api from "./api";

export async function login(payload) {
  const { data } = await api.post("/auth/login", payload);
  return data;
}

export async function sendRegisterOtp(payload) {
  const { data } = await api.post("/auth/send-otp", payload);
  return data;
}

export async function verifyRegisterOtp(payload) {
  const { data } = await api.post("/auth/verify-otp", payload);
  return data;
}

export async function sendForgotPasswordOtp(payload) {
  const { data } = await api.post("/auth/forgot-password", payload);
  return data;
}

export async function verifyResetOtp(payload) {
  const { data } = await api.post("/auth/verify-reset-otp", payload);
  return data;
}

export async function resetPassword(payload) {
  const { data } = await api.post("/auth/reset-password", payload);
  return data;
}

export async function getMe() {
  const { data } = await api.get("/auth/me");
  return data;
}
