import { motion } from "framer-motion";
import { useState } from "react";
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

export default function ServiceCard({
  service,
  variant = "default",
  mobileImageOnly = false,
}) {
  const [isTouchExpanded, setIsTouchExpanded] = useState(false);
  const Icon = iconMap[service.icon] || Stethoscope;

  if (variant === "imageOverlay") {
    return (
      <motion.article
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="group relative overflow-hidden rounded-none bg-slate-950 shadow-card"
        onClick={() => {
          if (mobileImageOnly || typeof window === "undefined") return;
          if (window.matchMedia("(hover: none)").matches) {
            setIsTouchExpanded((current) => !current);
          }
        }}
      >
        <div className="aspect-[16/10] overflow-hidden sm:aspect-[6/5] xl:aspect-[5/6]">
          <img
            src={service.image}
            alt={`${service.title} service`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
        </div>

        <div
          className={`absolute inset-0 transition duration-500 ${
            mobileImageOnly
              ? "bg-gradient-to-t from-slate-950/15 via-transparent to-transparent sm:from-slate-950 sm:via-slate-950/35 group-hover:sm:from-slate-950 group-hover:sm:via-slate-950/60"
              : "bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent group-hover:from-slate-950 group-hover:via-slate-950/50"
          }`}
        />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3.5 sm:p-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-primary shadow-sm sm:text-[10px]">
            {service.title}
          </span>
        </div>

        <div
          className={`absolute inset-x-0 bottom-0 p-4 text-white sm:p-4.5 ${
            mobileImageOnly ? "hidden sm:block" : "block"
          }`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-200">
            {service.category}
          </p>
          <div className="mt-3 overflow-hidden">
            <p
              className={`max-w-[29ch] overflow-hidden text-slate-200 transition-all duration-500 group-hover:max-h-56 ${
                mobileImageOnly
                  ? "max-h-28 text-[13px] leading-6"
                  : "max-h-10 text-[12px] leading-5 sm:max-h-28 sm:text-[13px] sm:leading-6"
              }`}
            >
              {service.description}
            </p>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                isTouchExpanded
                  ? "mt-3 max-h-16 opacity-100 sm:mt-0 sm:max-h-0 sm:opacity-0"
                  : "max-h-0 opacity-0"
              } sm:block sm:max-h-0 sm:opacity-0 sm:group-hover:mt-3 sm:group-hover:max-h-16 sm:group-hover:opacity-100`}
            >
              <Link
                to="/appointment"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center text-[13px] font-semibold text-rose-200 transition hover:text-white"
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
        className="mt-5 inline-flex text-sm font-semibold text-primary transition hover:text-[#8f355f]"
      >
        {"Book Appointment ->"}
      </Link>
    </motion.div>
  );
}
