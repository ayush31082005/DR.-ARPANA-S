import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../components/common/Breadcrumb";
import ProductDetailsInfo from "../components/products/ProductDetailsInfo";
import RelatedProducts from "../components/products/RelatedProducts";
import { getAllProducts, getProductById } from "../services/productService";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProductDetails = async () => {
      setIsLoading(true);

      const [selectedProduct, products] = await Promise.all([
        getProductById(id),
        getAllProducts()
      ]);

      setProduct(selectedProduct);
      setAllProducts(products);
      setIsLoading(false);
    };

    loadProductDetails();
  }, [id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    const sameCategory = allProducts.filter(
      (item) => item.id !== product.id && item.category === product.category
    );

    const fallbackProducts = allProducts.filter((item) => item.id !== product.id);

    return (sameCategory.length ? sameCategory : fallbackProducts).slice(0, 4);
  }, [allProducts, product]);

  if (isLoading) {
    return (
      <section className="section-space">
        <div className="container-padded">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="h-96 animate-pulse rounded-[28px] bg-slate-100" />
            <div className="h-96 animate-pulse rounded-[28px] bg-slate-100" />
          </div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="section-space">
        <div className="container-padded">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-card">
            <h2 className="text-2xl font-bold text-slate-900">Product not available</h2>
            <p className="mt-3 text-slate-600">
              The selected product may have been removed or the link is invalid.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-space">
      <div className="container-padded">
        <Breadcrumb items={[{ label: "Shop", path: "/shop" }, { label: product.name }]} />
        <div className="mt-6 flex justify-center">
          <ProductDetailsInfo product={product} />
        </div>
        {relatedProducts.length ? (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Related Products</h2>
            <RelatedProducts products={relatedProducts} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
