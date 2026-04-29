import api from "./api";

export const uploadPrescription = async (payload) => {
  const response = await api.post("/prescriptions", payload);
  return response.data;
};

export const getPrescriptions = async (email) => {
  const response = await api.get("/prescriptions", {
    params: email ? { email } : undefined,
  });
  return response.data;
};

export const updatePrescriptionStatus = async (id, status) => {
  const response = await api.patch(`/prescriptions/${id}/status`, { status });
  return response.data;
};
