import { useEffect, useState } from "react";
import {
  addAdminProduct,
  deleteAdminProduct,
  getAllProducts,
  subscribeToProductUpdates,
  updateAdminProduct,
} from "../../services/productService";
import Pagination from "../../components/ui/Pagination";

const initialForm = {
  name: "",
  category: "",
  price: "",
  discountPercent: "0",
  stock: "",
  quantityLabel: "",
  shortDetails: "",
  description: "",
};
const ITEMS_PER_PAGE = 10;

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedImage, setSelectedImage] = useState(null);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [editingProductId, setEditingProductId] = useState(null);
  const [activeDescriptionProduct, setActiveDescriptionProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const syncProducts = async () => {
      const nextProducts = await getAllProducts();
      setProducts(nextProducts);
    };

    const unsubscribe = subscribeToProductUpdates(syncProducts);
    syncProducts();

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!activeDescriptionProduct) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeDescriptionProduct]);

  useEffect(() => {
    setCurrentPage(1);
  }, [products.length]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files?.[0] ?? null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        ...form,
        productImage: selectedImage,
      };

      if (editingProductId) {
        await updateAdminProduct(editingProductId, payload);
      } else {
        await addAdminProduct(payload);
      }

      setFeedback({
        type: "success",
        message: editingProductId
          ? "Product updated successfully."
          : "Product added successfully. It is now visible in the shop.",
      });
      setForm(initialForm);
      setSelectedImage(null);
      setEditingProductId(null);
      setIsFormOpen(false);
      setProducts(await getAllProducts());
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error.response?.data?.message ||
          (editingProductId
            ? "Unable to update product right now."
            : "Unable to add product right now."),
      });
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setIsFormOpen(true);
    setForm({
      name: product.name || "",
      category: product.category || "",
      price: String(product.originalPrice ?? product.price ?? ""),
      discountPercent: String(product.discountPercent ?? 0),
      stock: String(product.stock ?? ""),
      quantityLabel: product.quantityLabel || "",
      shortDetails: product.shortDetails || "",
      description: product.description || "",
    });
    setSelectedImage(null);
    setFeedback({ type: "", message: "" });
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteAdminProduct(productId);
      setFeedback({
        type: "success",
        message: "Product deleted successfully.",
      });

      if (editingProductId === productId) {
        setEditingProductId(null);
        setForm(initialForm);
        setSelectedImage(null);
      }

      setProducts(await getAllProducts());
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error.response?.data?.message || "Unable to delete product right now.",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setForm(initialForm);
    setSelectedImage(null);
    setFeedback({ type: "", message: "" });
    setIsFormOpen(false);
  };

  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-black text-slate-900">Products</h1>
        <button
          type="button"
          onClick={() => {
            setEditingProductId(null);
            setForm(initialForm);
            setSelectedImage(null);
            setFeedback({ type: "", message: "" });
            setIsFormOpen((current) => !current);
          }}
          className="self-start rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          {isFormOpen ? "Hide Form" : "Add Product"}
        </button>
      </div>

      {isFormOpen || editingProductId ? (
        <form
          onSubmit={handleSubmit}
          className="mb-8 grid gap-5 rounded-2xl border bg-white p-6 shadow-sm lg:grid-cols-2"
        >
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900">
              {editingProductId ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {editingProductId
                ? "Product details update karke niche list me turant reflect ho jayenge."
                : "Jo product yahan add hoga, wo shop page par turant show hoga."}
            </p>
          </div>

          {feedback.message ? (
            <div
              className={`lg:col-span-2 rounded-2xl px-4 py-3 text-sm ${
                feedback.type === "success"
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {feedback.message}
            </div>
          ) : null}

          <label className="grid gap-2 text-sm font-medium text-slate-700">
          Product Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input-base"
            placeholder="Vitamin D Capsules"
            required
          />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
          Category
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input-base"
            placeholder="Supplements"
            required
          />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
          Price
          <input
            name="price"
            type="number"
            min="1"
            value={form.price}
            onChange={handleChange}
            className="input-base"
            placeholder="499"
            required
          />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
          Discount %
          <input
            name="discountPercent"
            type="number"
            min="0"
            max="100"
            value={form.discountPercent}
            onChange={handleChange}
            className="input-base"
            placeholder="10"
            required
          />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
          Stock
          <input
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={handleChange}
            className="input-base"
            placeholder="12"
            required
          />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
          Quantity / Pack Size
          <input
            name="quantityLabel"
            value={form.quantityLabel}
            onChange={handleChange}
            className="input-base"
            placeholder="30 ml / 60 tablets / 250 gm"
            required
          />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
          Real Amount
          <input
            type="number"
            value={
              form.price
                ? (
                    Number(form.price) -
                    (Number(form.price) * Number(form.discountPercent || 0)) / 100
                  ).toFixed(2)
                : ""
            }
            className="input-base"
            placeholder="0.00"
            readOnly
          />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700 lg:col-span-2">
          Short Details
          <textarea
            name="shortDetails"
            value={form.shortDetails}
            onChange={handleChange}
            className="input-base min-h-[90px] resize-none"
            placeholder="Gentle daily wellness support for bones, skin, or immunity."
            required
          />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700 lg:col-span-2">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="input-base min-h-[110px] resize-none"
            placeholder="Detailed product description"
            required
          />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700 lg:col-span-2">
          Image Upload
          <input
            name="productImage"
            type="file"
            accept=".png,.jpg,.jpeg,.svg"
            onChange={handleImageChange}
            className="block w-full rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:font-semibold file:text-slate-700"
          />
          <span className="text-xs text-slate-500">
            {editingProductId
              ? "Nayi image optional hai. Empty chhodo to purani image rahegi."
              : "Image na do to auto placeholder generate ho jayega."}
          </span>
          </label>

          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-3">
              <button type="submit" className="btn-primary">
                {editingProductId ? "Update Product" : "Add Product"}
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {editingProductId ? "Cancel" : "Close Form"}
              </button>
            </div>
          </div>
        </form>
      ) : null}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Discount</th>
                <th className="p-4 text-left">Real Amount</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProducts.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-xl border object-cover"
                      />
                      <div>
                        <div className="font-semibold text-slate-800">{item.name}</div>
                        <div className="text-xs text-slate-500">
                          {[item.quantityLabel, item.shortDetails]
                            .filter(Boolean)
                            .join(" - ")}
                        </div>
                        {item.description ? (
                          <button
                            type="button"
                            onClick={() => setActiveDescriptionProduct(item)}
                            className="mt-2 text-xs font-semibold text-primary transition hover:text-teal-700"
                          >
                            View Description
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">{item.category}</td>
                  <td className="p-4 font-semibold text-slate-800">Rs. {item.originalPrice}</td>
                  <td className="p-4 text-slate-600">{item.discountPercent}%</td>
                  <td className="p-4 font-semibold text-emerald-700">Rs. {item.price}</td>
                  <td className="p-4 text-slate-600">{item.stock}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {products.length > ITEMS_PER_PAGE ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : null}

      {activeDescriptionProduct ? (
        <div className="fixed inset-0 z-50 bg-slate-950/45 px-4 py-4 md:px-6 md:py-6">
          <div className="mx-auto grid h-[calc(100dvh-2rem)] min-h-0 w-full max-w-2xl grid-rows-[auto,minmax(0,1fr)] overflow-hidden rounded-3xl bg-white shadow-2xl md:h-[85vh]">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5">
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-slate-900">
                  {activeDescriptionProduct.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {activeDescriptionProduct.category}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveDescriptionProduct(null)}
                className="shrink-0 rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="min-h-0 overflow-hidden px-6 py-5">
              <div className="h-full overflow-y-auto overscroll-contain rounded-2xl bg-slate-50 px-4 py-4 pr-3 text-sm leading-7 text-slate-600 [scrollbar-gutter:stable]">
                <div className="min-h-max">
                  {activeDescriptionProduct.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
