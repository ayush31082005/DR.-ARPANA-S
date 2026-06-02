import { motion } from "framer-motion";
import { ArrowRight, Clock3, MapPin, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const contactPoints = [
  { icon: MapPin, label: "Clinic Area", value: "Lajpat Nagar, Sector 4, Sahibabad, Ghaziabad" },
  { icon: Clock3, label: "Open", value: "Mon-Sun | 11:00 AM - 9:00 PM" },
  { icon: Stethoscope, label: "Care Type", value: "Homeopathy consultation, acute and chronic care" },
];

export default function ConsultationBandSection() {
  return (
    <section className="-mt-12 pb-3 md:-mt-14 md:pb-4">
      <div className="container-padded">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="soft-panel mesh-section overflow-hidden px-4 py-4 sm:px-5 lg:px-6"
        >
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a94672] sm:text-sm">
                Consultation Support
              </p>
              <h2 className="mt-1.5 max-w-3xl text-[1.85rem] font-bold leading-tight tracking-tight text-[#5f2442] md:text-[2rem]">
                Visit Dr. Arpana's Homeo Care with the key details already in view.
              </h2>
              <p className="mt-1.5 max-w-3xl text-[15px] leading-6 text-slate-600">
                This final band keeps the homepage practical by surfacing the clinic area, daily timing, and the kind of homeopathy support the clinic is publicly known for.
              </p>
            </div>

            <Link to="/appointment" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8f355f]">
              Book consultation
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-3 grid gap-2.5 border-t border-[#e7c6d5] pt-3 md:grid-cols-3">
            {contactPoints.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-[#8f355f]">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a94672]">{item.label}</p>
                    <p className="mt-1 text-sm text-slate-700">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
