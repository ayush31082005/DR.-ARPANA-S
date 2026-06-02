import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { faqData } from "../../data/faqData";
import { fadeUp, staggerWrap } from "../../utils/motion";

export default function HomeFaqPreviewSection() {
  const [openId, setOpenId] = useState(null);
  const previewFaqs = faqData.slice(0, 3);

  return (
    <section className="section-space py-5 md:py-7">
      <div className="container-padded">
        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="max-w-[560px]">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm">
                Quick Answers
              </p>
              <h2 className="text-[2rem] font-bold leading-tight text-slate-900 md:text-[2.35rem]">
                Questions patients commonly have before visiting Dr. Arpana&apos;s Homeo Care.
              </h2>
              <p className="mt-2 text-[15px] leading-6 text-slate-600">
                These answers now reflect the clinic&apos;s real location, timing, and care areas instead of
                generic FAQ copy.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/faq" className="btn-primary">
                View All FAQs
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
            className="space-y-3"
          >
            {previewFaqs.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                className="soft-panel px-4 py-4 sm:px-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-[#5f2442]">{item.question}</h3>
                    {openId === item.id ? (
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    aria-expanded={openId === item.id}
                    aria-label={openId === item.id ? "Hide answer" : "Show answer"}
                    onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-[#edcfdb] bg-white/80 text-[#a94672] transition hover:bg-white"
                  >
                    <Plus size={17} />
                  </button>
                </div>
              </motion.div>
            ))}

            <motion.div variants={fadeUp} className="pt-1">
              <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8f355f]">
                Read more answers
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
