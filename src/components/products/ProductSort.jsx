const filterOptions = [
  "All Products",
  "Home Care Essentials",
  "Monitoring Devices",
  "Daily Wellness",
  "Immunity Support",
  "Personal Hygiene",
];

export default function ProductSort({
  sortValue,
  onSortChange,
  filterValue,
  onFilterChange,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500">All Filter</span>
        <select
          value={filterValue}
          onChange={(event) => onFilterChange(event.target.value)}
          className="input-base max-w-[240px]"
        >
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500">Sort by</span>
        <select
          value={sortValue}
          onChange={(event) => onSortChange(event.target.value)}
          className="input-base max-w-[220px]"
        >
          <option value="latest">Latest</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating-high-low">Rating: High to Low</option>
        </select>
      </div>
    </div>
  );
}
