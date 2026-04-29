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

export default function ServiceCard({ service, variant = "default" }) {
  const Icon = iconMap[service.icon] || Stethoscope;

  if (variant === "imageOverlay") {
    return (
      <motion.article
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="group relative overflow-hidden rounded-[26px] bg-slate-950 shadow-card"
      >
        <div className="aspect-[16/11] overflow-hidden sm:aspect-[5/4] xl:aspect-[4/5]">
          <img
            src={service.image}
            alt={`${service.title} service`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent transition duration-500 group-hover:from-slate-950 group-hover:via-slate-950/60" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary shadow-sm sm:text-[11px]">
            {service.title}
          </span>
          {service.image ? (
            <div className="h-10 w-10 overflow-hidden rounded-2xl border border-white/40 bg-white/15 shadow-lg backdrop-blur-md sm:h-12 sm:w-12">
              <img
                src={service.image}
                alt={`${service.title} thumbnail`}
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-200">
            {service.category}
          </p>
          <div className="mt-3 overflow-hidden">
            <p className="max-w-[26ch] max-h-12 overflow-hidden text-sm leading-6 text-slate-200 transition-all duration-500 group-hover:max-h-32">
              {service.description}
            </p>

            <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:mt-4 group-hover:max-h-16 group-hover:opacity-100">
              <Link
                to="/appointment"
                className="inline-flex items-center text-sm font-semibold text-teal-200 transition hover:text-white"
              >
                {"Book Appointment ->"}
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

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
