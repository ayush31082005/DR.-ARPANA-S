import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { fadeUp } from "../../utils/motion";

export default function AppointmentCTA() {
  return (
    <section className="pt-4 pb-8 md:pt-6 md:pb-12">
      <div className="container-padded">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="rounded-[32px] bg-gradient-to-r from-primary to-sky-600 p-10 text-white shadow-glow"
        >
          <h2 className="text-3xl font-bold md:text-4xl">Need a consultation today?</h2>
          <p className="mt-4 max-w-2xl text-white/85">
            Use this block as a strong CTA for clinic leads and patient appointment bookings.
          </p>
          <div className="mt-8">
            <Link to="/appointment"><Button className="bg-white text-primary hover:bg-slate-100">Book Now</Button></Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
