import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck2, Clock3, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp, staggerWrap } from "../../utils/motion";

const items = [
  {
    icon: CalendarCheck2,
    title: "Book consultation with context",
    text: "The homepage now makes it clear that the clinic focuses on homeopathy consultation, acute illness treatment, and chronic disease management.",
  },
  {
    icon: Clock3,
    title: "Visit during listed clinic hours",
    text: "Public clinic timing is shown as Mon-Sun, 11:00 AM to 9:00 PM, helping visitors quickly understand availability.",
  },
  {
    icon: PhoneCall,
    title: "Explore the right care area",
    text: "Patients can move directly toward skin, hair, migraine, thyroid, respiratory, digestive, or stress-related support areas.",
  },
];

export default function HomeClosingSection() {
  return (
    <section className="section-space pt-1 md:pt-2">
      <div className="container-padded">
        <div className="grid gap-3 lg:grid-cols-2 lg:items-start lg:gap-3">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex h-full flex-col justify-center"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a94672] sm:text-sm">
                Dr. Arpana's Homeo Care
              </p>
              <h2 className="mt-1 max-w-2xl text-[1.8rem] font-bold leading-tight tracking-tight text-[#5f2442] md:text-[1.95rem]">
                A homepage that now sounds like the clinic it represents.
              </h2>
              <p className="mt-1 max-w-2xl text-[15px] leading-6 text-slate-600">
                The closing section now reinforces the clinic's actual public identity: a Sahibabad, Ghaziabad homeopathy clinic focused on recurring concerns, clear consultation, and steady follow-up.
              </p>

              <div className="mt-2.5 flex flex-wrap gap-2">
                <Link to="/appointment" className="btn-primary">
                  Book Appointment
                </Link>
                <Link to="/contact" className="btn-outline">
                  Contact Clinic
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={staggerWrap}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              className="space-y-2"
            >
              {items.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    className="flex items-start gap-2 border-b border-[#e8c8d6] pb-2"
                  >
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-[#8f355f]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#5f2442]">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
                    </div>
                  </motion.div>
                );
              })}

              <motion.div
                variants={fadeUp}
                className="pt-0.5"
              >
                <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8f355f]">
                  Explore all services
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
