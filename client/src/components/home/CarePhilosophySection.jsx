import { motion } from "framer-motion";
import { HeartPulse, Leaf, ShieldCheck } from "lucide-react";
import { fadeLeft, fadeRight, fadeUp, staggerWrap } from "../../utils/motion";

const principles = [
  {
    icon: HeartPulse,
    title: "Focus on acute and chronic care",
    text: "The clinic's public profiles describe support for both everyday complaints and longer-term concerns that need a steady treatment approach.",
  },
  {
    icon: Leaf,
    title: "Lifestyle and wellness guidance",
    text: "Along with medicines, the clinic also highlights lifestyle and wellness counseling as part of the homeopathic care experience.",
  },
  {
    icon: ShieldCheck,
    title: "Clear understanding of recurring symptoms",
    text: "The homepage now explains the kind of concerns patients commonly bring in, so the clinic feels specific instead of generic.",
  },
];

export default function CarePhilosophySection() {
  return (
    <section className="section-space py-1 md:py-2">
      <div className="container-padded grid items-start gap-2 md:gap-2.5 lg:grid-cols-2 lg:gap-2.5">
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.95, ease: "easeOut", delay: 0.08 }}
          className="order-1 flex h-full flex-col justify-center lg:order-2"
        >
          <div className="max-w-[540px]">
            <p className="mb-0 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Care Approach
            </p>
            <h2 className="text-[1.72rem] font-bold leading-tight text-slate-900 md:text-[1.95rem]">
              Homeopathy care presented around the real concerns Dr. Arpana's Homeo Care treats.
            </h2>
            <p className="mt-0.5 text-[14px] leading-6 text-slate-600 md:text-[15px]">
              Instead of abstract marketing copy, this section now reflects the clinic's actual public care
              focus: chronic complaints, acute illness support, and lifestyle guidance.
            </p>
          </div>

          <motion.div
            variants={staggerWrap}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="mt-2 space-y-0"
          >
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="grid gap-1 border-b border-[#ecd0dc] pb-1 sm:grid-cols-[auto_1fr]"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fde7f0] text-[#8f355f]">
                    <Icon size={17} />
                  </div>
                  <div>
                    <h3 className="text-[1.05rem] font-bold tracking-tight text-[#5f2442] sm:text-[1.18rem]">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-sm leading-5 text-slate-600">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.95, ease: "easeOut" }}
          className="relative order-2 h-full lg:order-1 lg:justify-self-start"
        >
          <div className="soft-panel border-0 mesh-section relative h-full overflow-hidden p-1.5 sm:p-2">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80"
              alt="Doctor consulting with a patient"
              className="h-[280px] w-full rounded-[28px] object-cover sm:h-[320px] lg:h-full lg:min-h-[390px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
