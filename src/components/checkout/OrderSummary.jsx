import formatPrice from "../../utils/formatPrice";

export default function OrderSummary({ amount = 1499 }) {
  return (
    <div className="surface p-6">
      <h3 className="text-lg font-semibold text-slate-900">Order Summary</h3>
      <div className="mt-5 space-y-3 text-sm text-slate-600">
        <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(amount)}</span></div>
        <div className="flex justify-between"><span>Delivery</span><span>Free</span></div>
        <div className="flex justify-between border-t border-slate-200 pt-3 font-semibold text-slate-900"><span>Total</span><span>{formatPrice(amount)}</span></div>
      </div>
    </div>
  );
}
