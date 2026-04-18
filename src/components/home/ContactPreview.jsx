import { motion } from "framer-motion";
import { fadeUp, staggerWrap } from "../../utils/motion";

export default function ContactPreview() {
  const items = [
    ["Visit Clinic", "123 Health Street, Lucknow"],
    ["Call Support", "+91 98765 43210"],
    ["Email", "support@clinicecommerce.com"]
  ];

  return (
    <section className="section-space bg-white">
      <div className="container-padded">
        <motion.div
          variants={staggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {items.map(([title, text]) => (
            <motion.div key={title} variants={fadeUp} className="surface p-6">
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm text-slate-600">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
