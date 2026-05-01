import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, PencilLine, Plus } from "lucide-react";

const initialForm = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

export default function AddressForm({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onAddAddress,
  onUpdateAddress,
  onContinue,
  isSubmitting = false,
  isLoading = false,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingAddressId, setEditingAddressId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingAddressId) {
        await onUpdateAddress(editingAddressId, form);
      } else {
        await onAddAddress(form);
      }

      setForm(initialForm);
      setIsAdding(false);
      setEditingAddressId("");
    } catch (error) {
      // Parent feedback handles request errors.
    }
  };

  const handleEdit = (event, address) => {
    event.stopPropagation();
    setForm({
      fullName: address.fullName || "",
      phone: address.phone || "",
      address: address.address || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
    });
    setEditingAddressId(address.id);
    setIsAdding(true);
  };

  const handleToggleForm = () => {
    if (isAdding) {
      setForm(initialForm);
      setEditingAddressId("");
    }

    setIsAdding((prev) => !prev);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Select Delivery Address
          </h2>
        </div>

        <button
          type="button"
          onClick={handleToggleForm}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 self-start text-sm font-semibold text-primary transition hover:text-teal-700"
        >
          <Plus size={16} />
          {isAdding ? "Close Form" : "Add New Address"}
        </button>
      </div>

      {isAdding ? (
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-card sm:p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input
              required
              value={form.fullName}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, fullName: event.target.value }))
              }
              className="input-base"
              placeholder="Full name"
            />
            <input
              required
              value={form.phone}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, phone: event.target.value }))
              }
              className="input-base"
              placeholder="Phone number"
            />
          </div>
          <textarea
            required
            value={form.address}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, address: event.target.value }))
            }
            className="input-base min-h-[120px]"
            placeholder="Street address, landmark, area"
          />
          <div className="grid gap-4 md:grid-cols-3">
            <input
              required
              value={form.city}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, city: event.target.value }))
              }
              className="input-base"
              placeholder="City"
            />
            <input
              required
              value={form.state}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, state: event.target.value }))
              }
              className="input-base"
              placeholder="State"
            />
            <input
              required
              value={form.pincode}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, pincode: event.target.value }))
              }
              className="input-base"
              placeholder="Pincode"
            />
          </div>
          <button type="submit" className="btn-primary w-full sm:w-auto">
            {isSubmitting
              ? editingAddressId
                ? "Updating..."
                : "Saving..."
              : editingAddressId
                ? "Update Address"
                : "Save Address"}
          </button>
        </motion.form>
      ) : null}

      <div className="grid gap-4">
        {isLoading ? (
          <div className="border border-slate-200 bg-white px-5 py-6 text-sm text-slate-500 shadow-sm">
            Loading saved addresses...
          </div>
        ) : null}

        {!isLoading && !addresses.length ? (
          <div className="border border-dashed border-slate-300 bg-white px-5 py-6 text-sm text-slate-500 shadow-sm">
            No saved address found. Add a new delivery address to continue.
          </div>
        ) : null}

        {addresses.map((address, index) => {
          const isSelected = selectedAddressId === address.id;

          return (
            <motion.button
              key={address.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => onSelectAddress(address.id)}
              className={`w-full rounded-[20px] border p-5 text-left shadow-sm transition sm:p-6 ${
                isSelected
                  ? "border-primary bg-teal-50/60"
                  : "border-slate-200 bg-white hover:border-primary/40"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isSelected ? <CheckCircle2 size={20} /> : <MapPin size={20} />}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold text-slate-900">
                        {address.fullName}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                      {address.address}, {address.city}, {address.state} -{" "}
                      {address.pincode}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      {address.phone}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(event) => handleEdit(event, address)}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-teal-700"
                >
                  <PencilLine size={15} />
                  Edit
                </button>
              </div>

              {isSelected ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onContinue();
                  }}
                  disabled={isSubmitting}
                  className="mt-5 w-full rounded-2xl bg-primary px-5 py-4 text-sm font-semibold text-white transition hover:bg-teal-700"
                >
                  Deliver to this Address
                </button>
              ) : null}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
