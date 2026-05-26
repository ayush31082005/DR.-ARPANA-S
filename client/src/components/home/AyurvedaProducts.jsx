import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MotionSection from "../common/MotionSection";
import SectionTitle from "../common/SectionTitle";
import ProductCard from "../products/ProductCard";
import {
  getAllProducts,
  subscribeToProductUpdates,
} from "../../services/productService";

function matchesAyurveda(product) {
  const category = product.category?.trim().toLowerCase() || "";
  return (
    category === "ayurved" ||
    category === "ayurveda" ||
    category === "ayurvedic"
  );
}

export default function AyurvedaProducts() {
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

  const ayurvedaProducts = useMemo(
    () => products.filter(matchesAyurveda).slice(0, 8),
    [products]
  );

  if (!ayurvedaProducts.length) {
    return null;
  }

  return (
    <section className="bg-[linear-gradient(180deg,#eefddb_0%,#dcf6b4_100%)] py-10 md:py-14">
      <div className="container-padded">
        <MotionSection>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow="Ayurved"
              title="Popular Ayurvedic Products"
              description="Shop page se synced sirf ayurved category ke products yahan direct dikh rahe hain."
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
          {ayurvedaProducts.map((product) => (
            <div key={product.id} className="w-full max-w-[230px]">
              <ProductCard product={product} theme="shop-lime" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
