import { useEffect, useMemo, useState } from "react";
import EmptyState from "../components/common/EmptyState";
import PageHero from "../components/common/PageHero";
import ProductGrid from "../components/products/ProductGrid";
import ProductSort from "../components/products/ProductSort";
import Pagination from "../components/ui/Pagination";
import { getAllProducts, subscribeToProductUpdates } from "../services/productService";

const PRODUCTS_PER_PAGE = 25;

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [sortValue, setSortValue] = useState("latest");
  const [filterValue, setFilterValue] = useState("All Products");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const syncProducts = async () => {
      const nextProducts = await getAllProducts();
      setProducts(nextProducts);
    };

    const unsubscribe = subscribeToProductUpdates(syncProducts);
    syncProducts();

    return unsubscribe;
  }, []);

  const filterOptions = useMemo(
    () => [
      "All Products",
      ...new Set(products.map((product) => product.category).filter(Boolean)),
    ],
    [products]
  );

  const visibleProducts = useMemo(() => {
    let nextProducts =
      filterValue === "All Products"
        ? [...products]
        : products.filter((product) => product.category === filterValue);

    if (sortValue === "price-low-high") {
      nextProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-high-low") {
      nextProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === "rating-high-low") {
      nextProducts.sort((a, b) => b.rating - a.rating);
    }

    return nextProducts;
  }, [filterValue, products, sortValue]);

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
        image="https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section-space">
        <div className="container-padded">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
            <ProductSort
              sortValue={sortValue}
              onSortChange={setSortValue}
              filterValue={filterValue}
              onFilterChange={setFilterValue}
              filterOptions={filterOptions}
            />
          </div>
          <div className="mb-4 text-sm text-slate-500">
            Showing {startProduct}-{endProduct} of {visibleProducts.length} products
          </div>
          {paginatedProducts.length ? (
            <ProductGrid products={paginatedProducts} />
          ) : (
            <EmptyState
              title="No products found"
              description="Admin panel se product add karne ke baad wahi products yahan show honge."
            />
          )}
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
