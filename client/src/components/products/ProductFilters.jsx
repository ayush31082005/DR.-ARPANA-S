export default function ProductFilters() {
  return (
    <aside className="surface p-5">
      <h3 className="font-semibold text-slate-900">Filters</h3>
      <div className="mt-4 space-y-3">
        <input className="input-base" placeholder="Search products" />
        <select className="input-base"><option>Category</option></select>
        <select className="input-base"><option>Price Range</option></select>
      </div>
    </aside>
  );
}
