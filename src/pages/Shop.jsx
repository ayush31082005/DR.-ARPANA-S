import { useMemo, useState } from "react";
import PageHero from "../components/common/PageHero";
import ProductGrid from "../components/products/ProductGrid";
import ProductSort from "../components/products/ProductSort";
import { productsData } from "../data/productsData";

export default function Shop() {
  const [sortValue, setSortValue] = useState("latest");
  const [filterValue, setFilterValue] = useState("All Products");

  const visibleProducts = useMemo(() => {
    let nextProducts =
      filterValue === "All Products"
        ? [...productsData]
        : productsData.filter((product) => product.filterGroup === filterValue);

    if (sortValue === "price-low-high") {
      nextProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-high-low") {
      nextProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === "rating-high-low") {
      nextProducts.sort((a, b) => b.rating - a.rating);
    }

    return nextProducts;
  }, [filterValue, sortValue]);

  return (
    <>
      <PageHero
        title="Shop Products"
        description="Browse health, wellness, and personal care products."
        center
      />
      <section className="section-space">
        <div className="container-padded">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
            <ProductSort
              sortValue={sortValue}
              onSortChange={setSortValue}
              filterValue={filterValue}
              onFilterChange={setFilterValue}
            />
          </div>
          <ProductGrid products={visibleProducts} />
        </div>
      </section>
    </>
  );
}
