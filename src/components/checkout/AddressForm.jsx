export default function AddressForm() {
  return (
    <div className="surface grid gap-4 p-6">
      <h3 className="text-lg font-semibold text-slate-900">Address</h3>
      <input className="input-base" placeholder="Address line 1" />
      <div className="grid gap-4 md:grid-cols-2">
        <input className="input-base" placeholder="City" />
        <input className="input-base" placeholder="Pincode" />
      </div>
    </div>
  );
}
