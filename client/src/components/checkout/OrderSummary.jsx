import { BadgeCheck } from "lucide-react";
import formatPrice from "../../utils/formatPrice";

export default function OrderSummary({
  totalItems,
  productTotal,
  productDiscount,
  platformFee,
  deliveryFee,
  paymentDiscount,
  orderTotal,
  currentStep,
  onContinue,
  isActionDisabled,
  actionLabel,
}) {
  return (
    <aside className="h-fit rounded-[24px] border border-slate-200 bg-white p-5 shadow-card xl:sticky xl:top-28">
      <h3 className="pb-4 text-lg font-semibold text-slate-900">
        Price Details ({totalItems} item{totalItems !== 1 ? "s" : ""})
      </h3>

      <div className="space-y-4 border-b border-slate-200 pb-4 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Product Price</span>
          <span>{formatPrice(productTotal)}</span>
        </div>
        <div className="flex items-center justify-between text-emerald-600">
          <span>Clinic Discount</span>
          <span>- {formatPrice(productDiscount)}</span>
        </div>
        {paymentDiscount ? (
          <div className="flex items-center justify-between text-sky-600">
            <span>Online Payment Benefit</span>
            <span>- {formatPrice(paymentDiscount)}</span>
          </div>
        ) : null}
        <div className="flex items-center justify-between">
          <span>Platform Fee</span>
          <span>{formatPrice(platformFee)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Delivery</span>
          <span>{deliveryFee ? formatPrice(deliveryFee) : "Free"}</span>
        </div>
      </div>

      <div className="py-4">
        <div className="flex items-center justify-between text-xl font-bold text-slate-900">
          <span>Total</span>
          <span>{formatPrice(orderTotal)}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <span className="inline-flex items-center gap-2 font-medium">
            <BadgeCheck size={16} />
            You are saving {formatPrice(productDiscount + paymentDiscount)}
          </span>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-slate-100 px-4 py-3 text-center text-[11px] text-slate-500">
        {currentStep === 4
          ? "Review your details before placing the order."
          : "Clicking continue will move you to the next step."}
      </div>

      <button
        type="button"
        disabled={isActionDisabled}
        onClick={onContinue}
        className={`mt-5 w-full rounded-2xl px-5 py-4 text-sm font-semibold transition ${
          isActionDisabled
            ? "cursor-not-allowed bg-slate-200 text-slate-400"
            : "bg-primary text-white hover:bg-teal-700"
        }`}
      >
        {actionLabel}
      </button>
    </aside>
  );
}
