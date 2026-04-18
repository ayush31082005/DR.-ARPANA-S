export default function PaymentMethod() {
  return (
    <div className="surface p-6">
      <h3 className="text-lg font-semibold text-slate-900">Payment Method</h3>
      <div className="mt-4 space-y-3 text-sm text-slate-600">
        <label className="flex items-center gap-3"><input type="radio" name="payment" defaultChecked /> Cash on Delivery</label>
        <label className="flex items-center gap-3"><input type="radio" name="payment" /> Online Payment</label>
      </div>
    </div>
  );
}
