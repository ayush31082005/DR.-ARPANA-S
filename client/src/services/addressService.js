import api from "./api";

const normalizeAddress = (address) => ({
  ...address,
  id: address?._id || address?.id,
});

export async function getMyAddresses() {
  const response = await api.get("/addresses");
  return {
    ...response.data,
    addresses: (response.data.addresses || []).map(normalizeAddress),
  };
}

export async function addMyAddress(payload) {
  const response = await api.post("/addresses", payload);
  return {
    ...response.data,
    address: response.data.address ? normalizeAddress(response.data.address) : null,
    addresses: (response.data.addresses || []).map(normalizeAddress),
  };
}

export async function updateMyAddress(addressId, payload) {
  const response = await api.put(`/addresses/${addressId}`, payload);
  return {
    ...response.data,
    address: response.data.address ? normalizeAddress(response.data.address) : null,
    addresses: (response.data.addresses || []).map(normalizeAddress),
  };
}
