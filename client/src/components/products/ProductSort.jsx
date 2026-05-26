export default function ProductSort({
  sortValue,
  onSortChange,
  filterValue,
  onFilterChange,
  filterOptions = ["All Products"],
  labelClassName = "text-slate-500",
  selectClassName = "",
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <span className={`text-sm ${labelClassName}`}>All Filter</span>
        <select
          value={filterValue}
          onChange={(event) => onFilterChange(event.target.value)}
          className={`input-base max-w-[240px] ${selectClassName}`}
        >
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm ${labelClassName}`}>Sort by</span>
        <select
          value={sortValue}
          onChange={(event) => onSortChange(event.target.value)}
          className={`input-base max-w-[220px] ${selectClassName}`}
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
