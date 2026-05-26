import { motion } from "framer-motion";
import { fadeUp } from "../../utils/motion";

export default function PageHero({
  title,
  description,
  center = false,
  image,
  sectionClassName = "",
  imageOverlayClassName = "bg-slate-950/55",
  imageGradientClassName = "bg-gradient-to-r from-slate-950/80 via-slate-950/55 to-[#4f8f16]/55",
  descriptionClassName = "text-white/85",
}) {
  return (
    <section className={`relative overflow-hidden py-20 text-white ${sectionClassName}`}>
      {image ? (
        <>
          <img
            src={image}
            alt={`${title} hero`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className={`absolute inset-0 ${imageOverlayClassName}`} />
          <div className={`absolute inset-0 ${imageGradientClassName}`} />
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
          {description ? (
            <p className={`mt-5 text-base leading-8 md:text-lg ${descriptionClassName}`}>
              {description}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
