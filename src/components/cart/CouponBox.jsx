export default function CouponBox() {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
      <h3 className="text-lg font-semibold text-slate-900">Apply Coupon</h3>
      <p className="mt-1 text-sm text-slate-500">
        Enter your coupon or wellness offer code to save more.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          className="input-base"
          placeholder="Enter coupon code"
        />
        <button className="btn-outline whitespace-nowrap">Apply</button>
      </div>
    </div>
  );
}
