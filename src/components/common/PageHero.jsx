import { motion } from "framer-motion";
import { fadeUp } from "../../utils/motion";

export default function PageHero({ title, description, center = false }) {
  return (
    <section className="relative overflow-hidden bg-mesh py-20 text-white">
      <div className="container-padded relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7 }}
          className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
        >
          <h1 className="text-4xl font-bold md:text-6xl">{title}</h1>
          {description ? <p className="mt-5 text-base leading-8 text-white/85 md:text-lg">{description}</p> : null}
        </motion.div>
      </div>
    </section>
  );
}
