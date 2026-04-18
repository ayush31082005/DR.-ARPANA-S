import { useEffect, useMemo, useState } from "react";
import PageHero from "../components/common/PageHero";
import ProductGrid from "../components/products/ProductGrid";
import ProductSort from "../components/products/ProductSort";
import Pagination from "../components/ui/Pagination";
import { productsData } from "../data/productsData";

const PRODUCTS_PER_PAGE = 25;

export default function Shop() {
  const [sortValue, setSortValue] = useState("latest");
  const [filterValue, setFilterValue] = useState("All Products");
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [filterValue, sortValue]);

  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / PRODUCTS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return visibleProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [currentPage, visibleProducts]);

  const startProduct = visibleProducts.length ? (currentPage - 1) * PRODUCTS_PER_PAGE + 1 : 0;
  const endProduct = Math.min(currentPage * PRODUCTS_PER_PAGE, visibleProducts.length);

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
          <div className="mb-4 text-sm text-slate-500">
            Showing {startProduct}-{endProduct} of {visibleProducts.length} products
          </div>
          <ProductGrid products={paginatedProducts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </>
  );
}
