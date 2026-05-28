import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const sliderRef = useRef(null);
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

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;

    const cardWidth = sliderRef.current.clientWidth * 0.52;
    sliderRef.current.scrollBy({
      left: direction === "next" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

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

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 md:flex">
                <button
                  type="button"
                  onClick={() => scrollSlider("prev")}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#8dcb4d] bg-[#f6ffe8] text-[#35690d] transition hover:border-[#35690d] hover:bg-[#dcf6b4]"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollSlider("next")}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#8dcb4d] bg-[#f6ffe8] text-[#35690d] transition hover:border-[#35690d] hover:bg-[#dcf6b4]"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <Link
                to="/shop"
                className="inline-flex w-fit items-center justify-center rounded-[10px] border border-[#35690d] bg-[#f6a04a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ee973f]"
              >
                View All Products
              </Link>
            </div>
          </div>
        </MotionSection>

        <div
          ref={sliderRef}
          className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ayurvedaProducts.map((product) => (
            <div
              key={product.id}
              className="w-[210px] min-w-[210px] snap-start lg:w-[225px] lg:min-w-[225px]"
            >
              <ProductCard product={product} theme="shop-lime" compact />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
