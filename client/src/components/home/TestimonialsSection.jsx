import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonialsData } from "../../data/testimonialsData";
import MotionSection from "../common/MotionSection";
import SectionTitle from "../common/SectionTitle";
import { fadeUp, staggerWrap } from "../../utils/motion";

export default function TestimonialsSection() {
  const sliderRef = useRef(null);
  const loopedTestimonials = [...testimonialsData, ...testimonialsData];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let frameId;
    let isPaused = false;

    const tick = () => {
      if (!isPaused) {
        slider.scrollLeft += 0.6;

        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
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
    <section className="bg-white pt-6 pb-8 md:pt-8 md:pb-10">
      <div className="container-padded">
        <MotionSection>
          <SectionTitle
            eyebrow="Testimonials"
            title="What People Say"
            description="Real patient and customer feedback helps build trust."
          />
        </MotionSection>

        <motion.div
          ref={sliderRef}
          variants={staggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {loopedTestimonials.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              variants={fadeUp}
              className="surface min-w-[280px] p-6 md:min-w-[340px] lg:min-w-[380px]"
            >
              <div className="flex items-center gap-1 text-orange-500">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star key={`${item.id}-${index}`} size={16} className="fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">"{item.quote}"</p>
              <p className="mt-5 font-semibold text-slate-900">{item.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
