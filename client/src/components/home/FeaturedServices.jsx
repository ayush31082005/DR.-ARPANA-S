import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { servicesData } from "../../data/servicesData";
import MotionSection from "../common/MotionSection";
import SectionTitle from "../common/SectionTitle";
import ServiceCard from "../services/ServiceCard";

export default function FeaturedServices() {
  const sliderRef = useRef(null);
  const loopedServices = [...servicesData, ...servicesData];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    if (window.matchMedia("(max-width: 639px)").matches) {
      return undefined;
    }

    let frameId;
    let isPaused = false;

    slider.scrollLeft = slider.scrollWidth / 2;

    const tick = () => {
      if (!isPaused) {
        slider.scrollLeft -= 0.6;

        if (slider.scrollLeft <= 0) {
          slider.scrollLeft = slider.scrollWidth / 2;
        }
      }

      frameId = window.requestAnimationFrame(tick);
    };

    const pause = () => {
      isPaused = true;
    };

    const resume = () => {
      isPaused = false;
    };

    slider.addEventListener("mouseenter", pause);
    slider.addEventListener("mouseleave", resume);
    slider.addEventListener("focusin", pause);
    slider.addEventListener("focusout", resume);

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      slider.removeEventListener("mouseenter", pause);
      slider.removeEventListener("mouseleave", resume);
      slider.removeEventListener("focusin", pause);
      slider.removeEventListener("focusout", resume);
    };
  }, []);

  return (
    <section className="bg-white pt-0 pb-4 md:pt-2 md:pb-6">
      <div className="container-padded">
        <MotionSection>
          <div className="lg:flex lg:items-end lg:justify-between lg:gap-6">
            <div className="min-w-0 max-w-[680px]">
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:mb-2 sm:text-sm sm:tracking-[0.22em]">
                Services
              </p>
              <h2 className="text-[1.7rem] font-bold leading-tight text-slate-900 sm:text-3xl md:text-4xl">
                Homeopathy care areas highlighted by Dr. Arpana&apos;s Homeo Care.
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
                These services are aligned with the clinic&apos;s publicly described consultation and chronic-care
                focus.
              </p>
            </div>

            <div className="mt-3 flex justify-start lg:mt-0 lg:shrink-0 lg:justify-end">
              <Link
                to="/services"
                className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary sm:px-6 sm:py-3"
              >
                See All Services
              </Link>
            </div>
          </div>
        </MotionSection>

        <div
          ref={sliderRef}
          className="mt-3 flex gap-3 overflow-x-auto pb-2 sm:mt-4 sm:gap-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {loopedServices.map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              className="min-w-[82vw] max-w-[82vw] sm:min-w-[260px] sm:max-w-[280px] lg:min-w-[255px] lg:max-w-[255px]"
            >
              <ServiceCard service={service} variant="imageOverlay" mobileImageOnly />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
