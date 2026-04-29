export default function Tabs({ items = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.length ? items.map((item) => (
        <button key={item} className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm">{item}</button>
      )) : <div className="text-sm text-slate-500">Tabs placeholder</div>}
    </div>
  );
}
