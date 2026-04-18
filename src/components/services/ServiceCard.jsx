import { motion } from "framer-motion";
import {
  Activity,
  Accessibility,
  Baby,
  BadgeHelp,
  Bone,
  Brain,
  Eye,
  HeartPulse,
  Smile,
  Stethoscope,
  TestTube,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp } from "../../utils/motion";

const iconMap = {
  accessibility: Accessibility,
  baby: Baby,
  "badge-help": BadgeHelp,
  bone: Bone,
  brain: Brain,
  eye: Eye,
  heart: HeartPulse,
  lungs: Activity,
  smile: Smile,
  stethoscope: Stethoscope,
  "test-tube": TestTube,
  "user-round": UserRound,
};

export default function ServiceCard({ service }) {
  const Icon = iconMap[service.icon] || Stethoscope;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-50 text-primary">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">
            {service.category}
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">
            {service.title}
          </h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {service.description}
      </p>

      <Link
        to="/appointment"
        className="mt-5 inline-flex text-sm font-semibold text-primary transition hover:text-teal-700"
      >
        {"Book Appointment ->"}
      </Link>
    </motion.div>
  );
}
