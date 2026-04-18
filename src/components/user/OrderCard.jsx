export default function OrderCard() {
  return (
    <div className="surface p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900">Order #ORD12345</h3>
          <p className="mt-1 text-sm text-slate-500">2 items • Pending</p>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Pending</span>
      </div>
    </div>
  );
}
