import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { fadeUp, staggerWrap } from "../../utils/motion";

const ribbons = [
  "Homeopathic Consultation",
  "Chronic Disease Management",
  "Lifestyle and Wellness Counseling",
  "Acute Illness Treatment",
  "Sahibabad, Ghaziabad",
  "Mon-Sun 11:00 AM - 9:00 PM",
];

const metrics = [
  { value: "7 Days", label: "Clinic open throughout the week" },
  { value: "11 AM - 9 PM", label: "Daily consultation timing listed publicly" },
  { value: "Sahibabad", label: "Clinic located in Ghaziabad, Uttar Pradesh" },
];

export default function TrustStripSection() {
  return (
    <section className="relative -mt-1 overflow-hidden py-8 md:py-10">
      <div className="container-padded">
        <div className="soft-panel mesh-section overflow-hidden px-5 py-5 sm:px-6">
          <div className="relative overflow-hidden rounded-full border border-[#efd2df] bg-white/70 px-3 py-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#fff7fa] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#fff7fa] to-transparent" />
            <div className="animate-marquee-left flex gap-3">
              {[...ribbons, ...ribbons].map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex items-center gap-2 rounded-full border border-[#efcad9] bg-[#fffafc] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8f355f] sm:text-sm"
                >
                  <Sparkles size={14} className="text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            variants={staggerWrap}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-6 grid gap-4 md:grid-cols-3"
          >
            {metrics.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="border-b border-[#e9c6d6] pb-4 text-center md:text-left"
              >
                <div className="text-3xl font-extrabold tracking-tight text-[#5f2442] sm:text-4xl">
                  {item.value}
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
