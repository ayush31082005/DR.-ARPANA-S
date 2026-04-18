export default function Pagination() {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm">Prev</button>
      <button className="rounded-xl bg-primary px-4 py-2 text-sm text-white">1</button>
      <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm">2</button>
      <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm">Next</button>
    </div>
  );
}
