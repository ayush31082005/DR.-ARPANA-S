import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerWrap } from "../../utils/motion";

const items = [
  "Experienced doctors and trusted consultation",
  "Fast appointment request process",
  "Structured product shopping experience",
  "Future-ready scalable frontend architecture",
  "Simple and clean navigation for every visitor",
  "Mobile-friendly design that works smoothly on all screens"
];

const whyChooseImage =
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80";

export default function WhyChooseUs() {
  const desktopSectionRef = useRef(null);
  const isDesktopSectionInView = useInView(desktopSectionRef, {
    amount: 0.45,
    once: false
  });

  return (
    <section className="bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-100/70 py-5 md:py-7">
      <div className="lg:hidden">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          className="min-h-[300px]"
        >
          <img
            src={whyChooseImage}
            alt="Doctor speaking with a patient during consultation"
            className="h-full min-h-[300px] w-full object-cover object-center"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          className="container-padded py-7"
        >
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Why Us
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900">
              Why choose this premium frontend structure?
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              It gives you both trust-building clinic pages and conversion-focused ecommerce pages.
            </p>

            <motion.div
              variants={staggerWrap}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              className="mt-8 space-y-4"
            >
              {items.map((item) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-[15px] leading-7 text-slate-700"
                >
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div ref={desktopSectionRef} className="hidden lg:block">
        <div className="mx-auto flex min-h-[520px] w-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{
              width: isDesktopSectionInView ? "58%" : "100%"
            }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative shrink-0 overflow-hidden"
          >
            <motion.img
              src={whyChooseImage}
              alt="Doctor speaking with a patient during consultation"
              initial={false}
              animate={{
                scale: isDesktopSectionInView ? 1 : 1.05
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="h-full min-h-[520px] w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-950/10 via-transparent to-slate-950/15" />
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              width: isDesktopSectionInView ? "42%" : "0%",
              opacity: isDesktopSectionInView ? 1 : 0
            }}
            transition={{ duration: 0.85, delay: isDesktopSectionInView ? 0.2 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 overflow-hidden border-l border-white/60 bg-white/88 backdrop-blur-sm"
          >
            <motion.div
              initial={false}
              animate={{
                opacity: isDesktopSectionInView ? 1 : 0,
                y: isDesktopSectionInView ? 0 : 56
              }}
              transition={{ duration: 0.7, delay: isDesktopSectionInView ? 0.32 : 0, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full min-h-[520px] min-w-[420px] items-center px-8 py-8 xl:px-12"
            >
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  Why Us
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 xl:text-4xl">
                  Why choose this premium frontend structure?
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  It gives you both trust-building clinic pages and conversion-focused ecommerce pages.
                </p>

                <motion.div
                  variants={staggerWrap}
                  initial="hidden"
                  animate={isDesktopSectionInView ? "visible" : "hidden"}
                  className="mt-6 space-y-3"
                >
                  {items.map((item) => (
                    <motion.div
                      key={item}
                      variants={fadeUp}
                      className="flex items-start gap-3 text-[15px] leading-6 text-slate-700"
                    >
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
