import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import { fadeUp, staggerWrap } from "../../utils/motion";

const items = [
  "Experienced doctors and trusted consultation",
  "Fast appointment request process",
  "Structured product shopping experience",
  "Future-ready scalable frontend architecture"
];

const whyChooseImage =
  "https://upload.wikimedia.org/wikipedia/commons/0/0c/Doctor_talking_with_a_patient.jpg";

export default function WhyChooseUs() {
  return (
    <section className="py-10 md:py-14">
      <div className="container-padded grid items-stretch gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-[1fr_0.95fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex min-h-[340px] h-full flex-col justify-center"
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
            className="mt-5 space-y-3"
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
          className="min-h-[340px] h-full md:order-2"
        >
          <img
            src={whyChooseImage}
            alt="Doctor speaking with a patient during consultation"
            className="h-full min-h-[340px] w-full rounded-[28px] object-cover shadow-card"
          />
        </motion.div>
      </div>
    </section>
  );
}
