import { motion } from "framer-motion";
import { fadeUp, staggerWrap } from "../../utils/motion";

export default function AppointmentSteps() {
  const steps = ["Choose service", "Select doctor", "Pick time", "Confirm request"];
  return (
    <motion.div
      variants={staggerWrap}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid gap-4 md:grid-cols-4"
    >
      {steps.map((step, index) => (
        <motion.div key={step} variants={fadeUp} className="surface p-5 text-center">
          <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-teal-100 font-semibold text-primary">
            {index + 1}
          </div>
          <p className="text-sm font-medium text-slate-700">{step}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
