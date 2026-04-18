import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
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
  "https://upload.wikimedia.org/wikipedia/commons/0/0c/Doctor_talking_with_a_patient.jpg";

export default function WhyChooseUs() {
  return (
    <section className="pt-4 pb-2 md:pt-6 md:pb-4">
      <div className="container-padded grid items-stretch gap-5 md:auto-rows-fr md:grid-cols-2 md:gap-6 lg:grid-cols-[1fr_0.95fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex min-h-[280px] h-full flex-col justify-center md:justify-between"
        >
          <SectionTitle
            eyebrow="Why Us"
            title="Why choose this premium frontend structure?"
            description="It gives you both trust-building clinic pages and conversion-focused ecommerce pages."
          />

          <motion.div
            variants={staggerWrap}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-4 space-y-3"
          >
            {items.map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                className="flex items-center gap-3 text-[15px] text-slate-700"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex min-h-[280px] h-full md:order-2"
        >
          <img
            src={whyChooseImage}
            alt="Doctor speaking with a patient during consultation"
            className="block h-full min-h-[280px] w-full flex-1 rounded-[28px] object-cover shadow-card"
          />
        </motion.div>
      </div>
    </section>
  );
}
