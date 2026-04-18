import { motion } from "framer-motion";
import { testimonialsData } from "../../data/testimonialsData";
import MotionSection from "../common/MotionSection";
import SectionTitle from "../common/SectionTitle";
import { fadeUp, staggerWrap } from "../../utils/motion";

export default function TestimonialsSection() {
  return (
    <section className="section-space bg-white">
      <div className="container-padded">
        <MotionSection>
          <SectionTitle eyebrow="Testimonials" title="What People Say" description="Real patient and customer feedback helps build trust." />
        </MotionSection>

        <motion.div
          variants={staggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {testimonialsData.map((item) => (
            <motion.div key={item.id} variants={fadeUp} className="surface p-6">
              <p className="text-sm font-semibold text-accent">{"★".repeat(item.rating)}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">“{item.quote}”</p>
              <p className="mt-5 font-semibold text-slate-900">{item.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
