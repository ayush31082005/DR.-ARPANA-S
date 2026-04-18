import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { fadeUp } from "../../utils/motion";

export default function AppointmentCTA() {
  return (
    <section className="pt-2 pb-2 md:pt-4 md:pb-4">
      <div className="container-padded">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="rounded-[24px] bg-gradient-to-r from-primary to-sky-600 px-6 py-6 text-white md:px-8 md:py-7"
        >
          <h2 className="text-2xl font-bold md:text-3xl">Need a consultation today?</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/85 md:text-base">
            Use this block as a strong CTA for clinic leads and patient appointment bookings.
          </p>
          <div className="mt-4">
            <Link to="/appointment"><Button className="bg-white text-primary hover:bg-slate-100">Book Now</Button></Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
