import api from "./api";
import { createProductImage, productsData } from "../data/productsData";

const PRODUCT_UPDATE_EVENT = "products-updated";

function notifyProductChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(PRODUCT_UPDATE_EVENT));
  }
}

function normalizeProduct(product) {
    const quantityLabel =
        product.quantityLabel?.trim?.() ||
        product.quantity?.trim?.() ||
        "";

    const shortDetails =
        product.shortDetails?.trim?.() ||
        product.shortDescription?.trim?.() ||
        product.description ||
        "";

    return {
        ...product,
        id: product._id || product.id,
        price: Number(product.finalPrice ?? product.price),
        originalPrice: Number(product.originalPrice ?? product.price),
        discountPercent: Number(product.discountPercent ?? 0),
        stock: Number(product.stock ?? 0),
        quantityLabel,
        shortDetails,
    };
}

function getFallbackProducts() {
  return productsData.map(normalizeProduct);
}

export async function getAllProducts() {
  try {
    const response = await api.get("/products");
    const backendProducts = (response.data.products || []).map(normalizeProduct);
    return backendProducts.length ? backendProducts : getFallbackProducts();
  } catch {
    return getFallbackProducts();
  }
}

export async function getProductById(id) {
  const products = await getAllProducts();
  return products.find((product) => product.id === id) || null;
}

export async function addAdminProduct(payload) {
  const preparedPayload = new FormData();
  preparedPayload.append("name", payload.name.trim());
  preparedPayload.append("category", payload.category.trim());
  preparedPayload.append("price", String(Number(payload.price)));
  preparedPayload.append(
    "discountPercent",
    String(Number(payload.discountPercent || 0))
  );
  preparedPayload.append("stock", String(Number(payload.stock)));
  preparedPayload.append("quantityLabel", payload.quantityLabel.trim());
  preparedPayload.append("shortDetails", payload.shortDetails.trim());
  preparedPayload.append("description", payload.description.trim());

  const productImage =
    payload.productImage ||
    createProductImage(payload.name.trim(), "#ecfeff", "#0f766e");

  if (payload.productImage) {
    preparedPayload.append("productImage", payload.productImage);
  } else {
    const response = await fetch(productImage);
    const blob = await response.blob();
    preparedPayload.append("productImage", blob, "generated-product-image.svg");
  }

  const response = await api.post("/products", preparedPayload);
  notifyProductChange();
  return normalizeProduct(response.data.product);
}

export async function updateAdminProduct(id, payload) {
  const preparedPayload = new FormData();
  preparedPayload.append("name", payload.name.trim());
  preparedPayload.append("category", payload.category.trim());
  preparedPayload.append("price", String(Number(payload.price)));
  preparedPayload.append(
    "discountPercent",
    String(Number(payload.discountPercent || 0))
  );
  preparedPayload.append("stock", String(Number(payload.stock)));
  preparedPayload.append("quantityLabel", payload.quantityLabel.trim());
  preparedPayload.append("shortDetails", payload.shortDetails.trim());
  preparedPayload.append("description", payload.description.trim());

  if (payload.productImage) {
    preparedPayload.append("productImage", payload.productImage);
  }

  const response = await api.put(`/products/${id}`, preparedPayload);
  notifyProductChange();
  return normalizeProduct(response.data.product);
}

export async function deleteAdminProduct(id) {
  await api.delete(`/products/${id}`);
  notifyProductChange();
}

export function subscribeToProductUpdates(listener) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener(PRODUCT_UPDATE_EVENT, listener);

  return () => {
    window.removeEventListener(PRODUCT_UPDATE_EVENT, listener);
  };
}
