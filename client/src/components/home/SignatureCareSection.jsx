import { motion } from "framer-motion";
import { ArrowRight, Flower2, HeartHandshake, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeLeft, fadeRight, fadeUp, staggerWrap } from "../../utils/motion";

const focusAreas = [
  {
    icon: Sparkles,
    title: "Skin and hair concerns",
    text: "The clinic's public information specifically mentions eczema, psoriasis, dermatitis, and hair fall among the commonly supported concerns.",
  },
  {
    icon: Flower2,
    title: "Digestive and stone-related complaints",
    text: "Chronic constipation, IBD, kidney stones, and gallstones are also listed among the areas where patients seek homeopathic guidance.",
  },
  {
    icon: HeartHandshake,
    title: "Respiratory, thyroid, and stress-linked issues",
    text: "Migraine, allergic rhinitis, thyroid disorders, asthma, COPD, anxiety, depression, and sleep disorders are part of the clinic's broader chronic-care focus.",
  },
];

export default function SignatureCareSection() {
  return (
    <section className="section-space bg-white py-1 md:py-2">
      <div className="container-padded grid items-start gap-2 md:gap-2.5 lg:grid-cols-2 lg:gap-2.5">
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.95, ease: "easeOut", delay: 0.08 }}
          className="relative order-1 h-full lg:order-2 lg:justify-self-end"
        >
          <div className="soft-panel border-0 mesh-section relative h-full overflow-hidden p-1.5 sm:p-2">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1400&q=80"
              alt="Doctor writing notes during consultation"
              className="h-[280px] w-full rounded-[28px] object-cover sm:h-[320px] lg:h-full lg:min-h-[390px]"
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.95, ease: "easeOut" }}
          className="order-2 flex h-full flex-col justify-center lg:order-1"
        >
          <div className="max-w-[540px]">
            <p className="mb-0 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Signature Care
            </p>
            <h2 className="text-[1.72rem] font-bold leading-tight text-slate-900 md:text-[1.95rem]">
              What Dr. Arpana&apos;s Homeo Care is actually consulted for.
            </h2>
            <p className="mt-0.5 text-[14px] leading-6 text-slate-600 md:text-[15px]">
              This section is based on publicly described treatment areas connected with Dr. Arpana&apos;s
              Homeo Care and Dr. Arpana Srivastav&apos;s homeopathic practice.
            </p>
          </div>

          <motion.div
            variants={staggerWrap}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="mt-2 space-y-0"
          >
            {focusAreas.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="border-b border-[#e8c9d7] pb-1"
                >
                  <div className="flex items-start gap-2">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#fde7f0] text-[#8f355f]">
                      <Icon size={17} />
                    </div>
                    <div>
                      <h3 className="text-[1.05rem] font-bold tracking-tight text-[#5f2442] sm:text-[1.18rem]">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm leading-5 text-slate-600">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <Link to="/services" className="mt-2.5 inline-flex items-center gap-2 text-sm font-semibold text-[#8f355f]">
            Explore all care areas
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
