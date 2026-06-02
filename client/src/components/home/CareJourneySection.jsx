import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck, MessageCircleHeart, RefreshCcwDot } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp, staggerWrap } from "../../utils/motion";

const steps = [
  {
    icon: MessageCircleHeart,
    title: "Book a homeopathy consultation",
    description:
      "Patients can start by sharing whether the concern is acute, recurring, or long-standing, so the consultation begins with the right context.",
  },
  {
    icon: ClipboardCheck,
    title: "Discuss symptoms in detail",
    description:
      "The clinic's public care focus includes skin, hair, migraine, thyroid, digestive, respiratory, and stress-linked concerns that often need detailed symptom review.",
  },
  {
    icon: RefreshCcwDot,
    title: "Continue with follow-up and lifestyle guidance",
    description:
      "After consultation, the journey can include remedies, chronic-disease management, and lifestyle or wellness counseling depending on the concern.",
  },
];

export default function CareJourneySection() {
  const cycleDuration = 8.4;
  const connectorTimings = [
    { lineDelay: 0.3, lineDuration: 1.6, ringDelay: 2.0 },
    { lineDelay: 2.6, lineDuration: 1.6, ringDelay: 4.3 },
    { lineDelay: 4.9, lineDuration: 1.7 },
  ];

  return (
    <section className="section-space bg-white py-2 md:py-4">
      <div className="container-padded">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-0.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#a94672] sm:text-sm">
            Care Journey
          </p>
          <h2 className="text-[2rem] font-bold leading-tight text-slate-900 md:text-[2.35rem]">
            How patients typically move through care at Dr. Arpana&apos;s Homeo Care.
          </h2>
          <p className="mt-1.5 text-sm leading-6 text-slate-600 md:text-[15px]">
            This section turns the homepage into a practical guide for consultation, symptom discussion,
            and follow-up.
          </p>
        </div>

        <motion.div
          variants={staggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="relative mt-4 grid gap-4 lg:grid-cols-3 lg:gap-4"
        >
          <div className="absolute left-0 right-0 top-[18px] hidden border-t border-dashed border-[#e2b8cb] lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative"
              >
                {index < connectorTimings.length ? (
                  <div
                    className={`absolute left-[18px] top-[18px] hidden h-[2px] overflow-visible lg:block ${
                      index === steps.length - 1 ? "right-0" : "right-[-1rem]"
                    }`}
                  >
                    <div className="absolute inset-0 rounded-full bg-[#e2b8cb]" />
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                      transition={{
                        duration: connectorTimings[index].lineDuration,
                        times: [0, 0.45, 0.8, 1],
                        ease: "easeInOut",
                        delay: connectorTimings[index].lineDelay,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay:
                          cycleDuration -
                          connectorTimings[index].lineDelay -
                          connectorTimings[index].lineDuration,
                      }}
                      className="absolute inset-0 h-full origin-left rounded-full bg-[#7d2f53]"
                    />
                    <motion.span
                      initial={{ left: "0%", opacity: 0 }}
                      animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                      transition={{
                        duration: connectorTimings[index].lineDuration,
                        ease: "easeInOut",
                        delay: connectorTimings[index].lineDelay,
                        times: [0, 0.15, 0.85, 1],
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay:
                          cycleDuration -
                          connectorTimings[index].lineDelay -
                          connectorTimings[index].lineDuration,
                      }}
                      className="absolute top-1/2 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7d2f53] shadow-[0_0_0_6px_rgba(125,47,83,0.14)]"
                    />
                  </div>
                ) : null}

                <div className="relative z-10 inline-flex">
                  {index > 0 ? (
                    <motion.span
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: [0.85, 1.14, 1], opacity: [0, 1, 0.65] }}
                      transition={{
                        duration: 0.9,
                        ease: "easeOut",
                        delay: connectorTimings[index - 1].ringDelay,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: cycleDuration - connectorTimings[index - 1].ringDelay - 0.9,
                      }}
                      className="absolute inset-[-6px] rounded-full border-2 border-[#7d2f53]/45"
                    />
                  ) : null}

                  <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#8f355f] text-white shadow-glow">
                    <Icon size={15} />
                  </div>
                </div>

                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#a94672] sm:text-sm">
                  Step {index + 1}
                </div>
                <h3 className="mt-1 text-[1.65rem] font-bold leading-tight tracking-tight text-[#5f2442]">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-sm text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="soft-panel mesh-section mt-4 flex flex-col gap-2 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a94672] sm:text-sm">
              Clinic Focus
            </p>
            <h3 className="mt-1.5 text-[1.6rem] font-bold leading-tight tracking-tight text-[#5f2442]">
              Built around homeopathy consultation, chronic disease management, and lifestyle counseling.
            </h3>
          </div>

          <Link to="/appointment" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8f355f]">
            Book an appointment
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
