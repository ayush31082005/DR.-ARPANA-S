import { motion } from "framer-motion";
import { fadeUp } from "../../utils/motion";

export default function PageHero({ title, description, center = false, image }) {
  return (
    <section className="relative overflow-hidden py-20 text-white">
      {image ? (
        <>
          <img
            src={image}
            alt={`${title} hero`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/55 to-teal-900/50" />
        </>
      ) : (
        <div className="absolute inset-0 bg-mesh" />
      )}

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
