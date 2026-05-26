import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MotionSection from "../common/MotionSection";
import SectionTitle from "../common/SectionTitle";
import ProductCard from "../products/ProductCard";
import {
  getAllProducts,
  subscribeToProductUpdates,
} from "../../services/productService";

function matchesSkinCare(product) {
  const category = product.category?.trim().toLowerCase() || "";
  return category === "skin care" || category === "skincare";
}

export default function SkinCareProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const syncProducts = async () => {
      const nextProducts = await getAllProducts();
      setProducts(nextProducts);
    };

    const unsubscribe = subscribeToProductUpdates(syncProducts);
    syncProducts();

    return unsubscribe;
  }, []);

  const skinCareProducts = useMemo(
    () => products.filter(matchesSkinCare).slice(0, 8),
    [products]
  );

  if (!skinCareProducts.length) {
    return null;
  }

  return (
    <section className="bg-[linear-gradient(180deg,#f7ffe9_0%,#e6fbc4_100%)] py-10 md:py-14">
      <div className="container-padded">
        <MotionSection>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow="Skin Care"
              title="Popular Skin Care Products"
              description="Shop page se synced sirf skin care category ke products yahan direct dikh rahe hain."
            />

            <Link
              to="/shop"
              className="inline-flex w-fit items-center justify-center rounded-[10px] border border-[#35690d] bg-[#f6a04a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ee973f]"
            >
              View All Products
            </Link>
          </div>
        </MotionSection>

        <div className="mt-6 flex flex-wrap gap-4">
          {skinCareProducts.map((product) => (
            <div key={product.id} className="w-full max-w-[230px]">
              <ProductCard product={product} theme="shop-lime" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
