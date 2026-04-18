import { Link } from "react-router-dom";
import formatPrice from "../../utils/formatPrice";

export default function CartSummary({ totalPrice = 0, totalItems = 0 }) {
  const deliveryFee = totalItems ? 49 : 0;
  const platformFee = totalItems ? 12 : 0;
  const discount = totalItems ? Math.round(totalPrice * 0.08) : 0;
  const payable = totalPrice + deliveryFee + platformFee - discount;

  return (
    <aside className="h-fit rounded-[28px] border border-slate-200 bg-white p-6 shadow-card xl:sticky xl:top-28">
      <h3 className="border-b border-slate-200 pb-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
        Price Details
      </h3>

      <div className="mt-5 space-y-4 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Price ({totalItems} items)</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Delivery Charges</span>
          <span>{formatPrice(deliveryFee)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Platform Fee</span>
          <span>{formatPrice(platformFee)}</span>
        </div>
        <div className="flex items-center justify-between text-emerald-600">
          <span>Discount</span>
          <span>- {formatPrice(discount)}</span>
        </div>
      </div>

      <div className="mt-5 border-t border-dashed border-slate-200 pt-5">
        <div className="flex items-center justify-between text-base font-bold text-slate-900">
          <span>Total Amount</span>
          <span>{formatPrice(payable)}</span>
        </div>
        <p className="mt-2 text-sm font-medium text-emerald-600">
          You will save {formatPrice(discount)} on this order
        </p>
      </div>

      <Link
        to="/checkout"
        className="mt-6 block rounded-2xl bg-primary px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-teal-700"
      >
        Place Order
      </Link>
    </aside>
  );
}
