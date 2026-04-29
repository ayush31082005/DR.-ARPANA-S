import { Link } from "react-router-dom";
import formatPrice from "../../utils/formatPrice";

export default function CartSummary({ totalPrice = 0, totalItems = 0 }) {
  const deliveryFee = 0;
  const platformFee = totalItems ? 12 : 0;
  const discount = totalItems ? Math.round(totalPrice * 0.08) : 0;
  const payable = totalPrice + deliveryFee + platformFee - discount;

  return (
    <aside className="h-fit rounded-[24px] border border-slate-200 bg-white p-5 shadow-card xl:sticky xl:top-28">
      <h3 className="pb-4 text-lg font-semibold text-slate-900">
        Price Details
      </h3>

      <div className="space-y-4 border-b border-slate-200 pb-4 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Price ({totalItems} items)</span>
          <span>{formatPrice(totalPrice)}</span>
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

      <div className="py-4">
        <div className="flex items-center justify-between text-xl font-bold text-slate-900">
          <span>Order Total</span>
          <span>{formatPrice(payable)}</span>
        </div>
        <p className="mt-2 text-sm font-medium text-emerald-600">
          You will save {formatPrice(discount)} on this order
        </p>
      </div>

      <div className="rounded-2xl bg-slate-100 px-4 py-3 text-center text-[11px] text-slate-500">
        Clicking continue will not deduct any money.
      </div>

      <Link
        to="/checkout"
        className="mt-5 block rounded-2xl bg-primary px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-teal-700"
      >
        Continue
      </Link>
    </aside>
  );
}
