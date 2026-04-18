import { motion } from "framer-motion";
import { categoryData } from "../../data/categoryData";
import MotionSection from "../common/MotionSection";
import SectionTitle from "../common/SectionTitle";
import { fadeUp, staggerWrap } from "../../utils/motion";

export default function CategoriesSection() {
  return (
    <section className="section-space">
      <div className="container-padded">
        <MotionSection>
          <SectionTitle eyebrow="Categories" title="Shop By Category" description="Create fast category shortcuts for easier browsing." />
        </MotionSection>

        <motion.div
          variants={staggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4"
        >
          {categoryData.map((item) => (
            <motion.div key={item.id} variants={fadeUp} className="surface p-6 text-center transition duration-300 hover:-translate-y-1">
              <div className="mx-auto mb-4 h-16 w-16 rounded-[24px] bg-gradient-to-br from-sky-100 to-teal-100" />
              <h3 className="font-semibold text-slate-900">{item.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
