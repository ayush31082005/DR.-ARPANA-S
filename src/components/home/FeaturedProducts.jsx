import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MotionSection from "../common/MotionSection";
import SectionTitle from "../common/SectionTitle";
import { productsData } from "../../data/productsData";
import ProductCard from "../products/ProductCard";

export default function FeaturedProducts() {
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;

    const cardWidth = sliderRef.current.clientWidth * 0.52;
    sliderRef.current.scrollBy({
      left: direction === "next" ? cardWidth : -cardWidth,
      behavior: "smooth"
    });
  };

  return (
    <section className="bg-white pt-4 pb-10 md:pt-6 md:pb-14">
      <div className="container-padded">
        <MotionSection>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow="Shop"
              title="Featured Health Products"
              description="Highlight your best sellers and recommended wellness products."
            />

            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                onClick={() => scrollSlider("prev")}
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-primary hover:text-primary"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollSlider("next")}
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-primary hover:text-primary"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </MotionSection>

        <div
          ref={sliderRef}
          className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4"
        >
          {productsData.map((product) => (
            <div
              key={product.id}
              className="min-w-[calc((100%-0.75rem)/2)] snap-start sm:min-w-[255px] lg:min-w-[270px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
