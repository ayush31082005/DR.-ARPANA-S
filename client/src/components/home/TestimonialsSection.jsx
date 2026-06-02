import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonialsData } from "../../data/testimonialsData";
import MotionSection from "../common/MotionSection";
import { fadeUp, staggerWrap } from "../../utils/motion";

export default function TestimonialsSection() {
  const sliderRef = useRef(null);
  const loopedTestimonials = [...testimonialsData, ...testimonialsData];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

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
    <section className="bg-white pt-1 pb-4 md:pt-2 md:pb-5">
      <div className="container-padded">
        <MotionSection>
          <div className="max-w-[680px]">
            <p className="mb-0.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm">
              Common Concerns
            </p>
            <h2 className="text-[1.8rem] font-bold leading-tight text-slate-900 md:text-[2.1rem]">
              Reasons patients commonly look for homeopathy support here.
            </h2>
            <p className="mt-1.5 text-[14px] leading-6 text-slate-600 md:text-[15px]">
              Instead of generic testimonials, this section highlights the clinic&apos;s publicly described
              areas of consultation.
            </p>
          </div>
        </MotionSection>

        <motion.div
          ref={sliderRef}
          variants={staggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-3 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {loopedTestimonials.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              variants={fadeUp}
              className="surface min-w-[250px] p-5 md:min-w-[270px] lg:min-w-[290px] xl:min-w-[305px]"
            >
              <Quote size={18} className="text-[#a94672]" />
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.quote}</p>
              <p className="mt-4 font-semibold text-slate-900">{item.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

