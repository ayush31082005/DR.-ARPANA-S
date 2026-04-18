import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import { fadeUp, staggerWrap } from "../../utils/motion";

const aboutItems = [
  "Patient-first consultation experience",
  "Clinic and shop in one seamless platform",
  "Clean service flow ready for API integration",
  "Responsive design for mobile and desktop"
];

const aboutImage =
  "https://upload.wikimedia.org/wikipedia/commons/0/0c/Doctor_talking_with_a_patient.jpg";

export default function ClinicIntro() {
  return (
    <section className="pt-10 pb-5 md:pt-14 md:pb-8">
      <div className="container-padded grid items-stretch gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-[1fr_0.95fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex min-h-[340px] h-full flex-col justify-center"
        >
          <SectionTitle
            eyebrow="About Clinic"
            title="A polished clinic experience with the convenience of ecommerce."
            description="This upgraded UI is designed to feel modern, responsive, and conversion-friendly across all screen sizes."
          />

          <motion.div
            variants={staggerWrap}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-5 space-y-3"
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
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="min-h-[340px] h-full md:order-2"
        >
          <img
            src={aboutImage}
            alt="Doctor consulting with a patient in a clinic"
            className="h-full min-h-[340px] w-full rounded-[28px] object-cover shadow-card"
          />
        </motion.div>
      </div>
    </section>
  );
}
