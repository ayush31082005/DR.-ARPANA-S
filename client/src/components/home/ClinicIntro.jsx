import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import { fadeLeft, fadeRight, fadeUp, staggerWrap } from "../../utils/motion";

const aboutItems = [
  "Homeopathy consultation for acute and chronic complaints",
  "Lifestyle and wellness counseling as part of the care journey",
  "Support for recurring symptoms that need steady follow-up",
  "Accessible booking experience for mobile and desktop"
];

const aboutImage =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80";

export default function ClinicIntro() {
  return (
    <section className="pt-4 pb-4 md:pt-6 md:pb-5">
      <div className="container-padded grid items-stretch gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-[1fr_0.95fr]">
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.95, ease: "easeOut" }}
          className="flex min-h-[340px] h-full flex-col justify-center"
        >
          <SectionTitle
            eyebrow="About Dr. Arpana's Homeo Care"
            title="A Ghaziabad homeopathy clinic focused on recurring health concerns and consistent guidance."
            description="Public clinic profiles describe Dr. Arpana's Homeo Care as a Sahibabad clinic offering homeopathy consultation, chronic disease management, acute illness treatment, and lifestyle counseling."
          />

          <motion.div
            variants={staggerWrap}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            className="mt-3 space-y-2.5"
          >
            {aboutItems.map((item) => (
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
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.95, ease: "easeOut", delay: 0.08 }}
          className="min-h-[340px] h-full md:order-2"
        >
          <img
            src={aboutImage}
            alt="Doctor consulting with a patient in a clinic"
            className="h-full min-h-[320px] w-full rounded-[28px] object-cover shadow-card"
          />
        </motion.div>
      </div>
    </section>
  );
}
