import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";

const fadeUp = {
  hidden: { opacity: 0, y: 45 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -55 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 55 },
  visible: { opacity: 1, x: 0 },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const stats = [
  { value: 5000, suffix: "+", label: "Patients Treated" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 95, suffix: "%", label: "Patient Satisfaction" },
  { value: 24, suffix: "/7", label: "Patient Support" },
];

const expertise = [
  {
    title: "Skin Disorders",
    text: "Treatment support for acne, eczema, psoriasis, allergies, fungal infections, and chronic skin conditions.",
  },
  {
    title: "Respiratory Care",
    text: "Personalized care for asthma, sinusitis, allergic rhinitis, chronic cough, and breathing-related problems.",
  },
  {
    title: "Women’s Health",
    text: "Homeopathic support for hormonal imbalance, PCOS, menstrual disorders, and overall women’s wellness.",
  },
  {
    title: "Child Care",
    text: "Safe and gentle treatment approach for children’s common and chronic health concerns.",
  },
  {
    title: "Digestive Health",
    text: "Support for acidity, IBS, constipation, indigestion, and other digestive disorders.",
  },
  {
    title: "Lifestyle Diseases",
    text: "Care for stress, anxiety, fatigue, sleep issues, immunity concerns, and lifestyle-related health problems.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Detailed Consultation",
    text: "We understand your symptoms, lifestyle, health history, and long-term concerns.",
  },
  {
    step: "02",
    title: "Root Cause Analysis",
    text: "Our approach focuses on identifying the actual cause instead of only temporary symptom relief.",
  },
  {
    step: "03",
    title: "Personalized Treatment",
    text: "A treatment plan is prepared according to your individual condition and wellness needs.",
  },
  {
    step: "04",
    title: "Follow-up Support",
    text: "Regular guidance and progress monitoring help improve treatment results over time.",
  },
];

const values = [
  "Patient-first care",
  "Safe natural treatment",
  "Transparent guidance",
  "Long-term wellness",
  "Comfortable consultation",
  "Ethical practice",
];

export default function About() {
  const countRefs = useRef([]);

  useEffect(() => {
    countRefs.current.forEach((element, index) => {
      if (!element) return;

      const stat = stats[index];
      const counter = { value: 0 };

      gsap.to(counter, {
        value: stat.value,
        duration: 1.6,
        ease: "power3.out",
        snap: { value: 1 },
        onUpdate: () => {
          element.textContent = `${Math.round(counter.value)}${stat.suffix}`;
        },
      });
    });
  }, []);

  return (
    <>
      <PageHero
        title="About Dr. Arpana's Homeo Care"
        description="Trusted homeopathic healthcare with compassion, expertise, and personalized treatment for long-term wellness."
        center
        sectionClassName="py-6 sm:py-7 md:py-8"
        image="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80"
        imageOverlayClassName="bg-black/25"
        imageGradientClassName="bg-gradient-to-r from-black/40 via-black/20 to-transparent"
        descriptionClassName="text-white/90"
      />

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff7fa_0%,#fdeef5_55%,#f8dfe9_100%)] py-4 sm:py-5">
        <motion.div
          animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-10 top-8 h-32 w-32 rounded-full bg-[#eaa6c3]/30 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 22, 0], x: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-4 right-10 h-40 w-40 rounded-full bg-[#c94f86]/20 blur-3xl"
        />

        <div className="container-padded relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={zoomIn}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.4 }}
                className="rounded-[20px] border border-[#efcad9] bg-white/80 px-4 py-4 text-center shadow-[0_12px_28px_rgba(169,70,114,0.12)] backdrop-blur"
              >
                <p
                  ref={(element) => {
                    countRefs.current[index] = element;
                  }}
                  className="text-3xl font-extrabold tracking-tight text-[#8f355f] sm:text-[2.2rem]"
                >
                  0{stat.suffix}
                </p>
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8f355f] sm:text-[11px]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-6 sm:py-7 md:py-8">
        <div className="container-padded grid items-center gap-5 lg:grid-cols-2 lg:gap-6">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
          >
            <SectionTitle
              eyebrow="About Us"
              title="Healing through personalized homeopathic care and trusted medical expertise."
              description="Dr. Arpana's Homeo Care is a dedicated homeopathic clinic focused on safe, effective, and individualized treatment for patients of all ages."
            />

            <div className="mt-3 space-y-3 text-[15px] leading-7 text-slate-600">
              <p>
                Dr. Arpana's Homeo Care was established with the vision of
                making quality homeopathic healthcare accessible to everyone.
                We believe every patient is unique, so every treatment plan
                should be designed according to individual needs.
              </p>

              <p>
                Under the guidance of Dr. Arpana, we provide professional
                consultation, detailed case analysis, and personalized treatment
                plans that focus on the root cause of health concerns.
              </p>

              <p>
                We support patients dealing with allergies, skin disorders,
                respiratory issues, digestive problems, hormonal imbalance,
                stress-related conditions, and lifestyle diseases through safe
                and natural homeopathic remedies.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className="relative"
          >
            <motion.div
              animate={{ rotate: [0, 3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-[#f8dfe9]"
            />

            <div className="relative overflow-hidden rounded-[30px] shadow-[0_18px_44px_rgba(15,23,42,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
                alt="Doctor consultation"
                className="h-[340px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
            </div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              className="absolute -bottom-4 left-4 rounded-[20px] bg-white px-4 py-3.5 shadow-[0_12px_28px_rgba(15,23,42,0.14)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Trusted Care
              </p>
              <p className="mt-1.5 text-xl font-bold text-slate-900">
                Patient-first approach
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 py-6 sm:py-7 md:py-8">
        <div className="container-padded grid items-center gap-6 lg:grid-cols-2 lg:gap-7">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-2 grid gap-3 lg:order-1"
          >
            {[
              {
                title: "Our Mission",
                text: "To provide safe, natural, and dependable homeopathic treatment that helps patients improve their health with confidence and comfort.",
              },
              {
                title: "Our Vision",
                text: "To become a trusted homeopathic healthcare destination where patients receive compassionate care and effective treatment.",
              },
              {
                title: "Why Choose Homeopathy",
                text: "Homeopathy offers a natural and holistic approach that supports the body’s healing ability and overall well-being.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ x: 8, scale: 1.02 }}
                className="flex min-h-[170px] flex-col rounded-[20px] bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
              >
                <h3 className="text-[1.75rem] font-bold leading-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-8 text-slate-600">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="order-1 lg:order-2"
          >
            <SectionTitle
              eyebrow="Our Purpose"
              title="Built around patients, care, and long-term healing."
              description="We make every part of the healthcare journey easier, from understanding the patient’s condition to providing the right treatment and follow-up support."
            />

            <div className="mt-3 space-y-3 text-[15px] leading-7 text-slate-600">
              <p>
                Healthcare is not just about prescribing medicines. It is about
                listening carefully, understanding the complete health condition,
                and creating a treatment plan that supports long-term wellness.
              </p>

              <p>
                Our clinic combines professional expertise, modern consultation
                practices, and patient-centered care to deliver a comfortable and
                trustworthy healthcare experience.
              </p>

              <p>
                Every patient receives dedicated attention, clear communication,
                ethical guidance, and ongoing support throughout the treatment
                journey.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-6 sm:py-7 md:py-8">
        <div className="container-padded">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Our Expertise
            </p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Comprehensive homeopathic care for every stage of life.
            </h2>
            <p className="mt-2.5 text-[15px] leading-7 text-slate-600">
              We offer specialized homeopathic treatment and wellness support
              with a safe, gentle, and personalized approach.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3"
          >
            {expertise.map((item) => (
              <motion.div
                key={item.title}
                variants={zoomIn}
                whileHover={{ y: -10 }}
                className="group flex min-h-[220px] flex-col rounded-[22px] border border-slate-100 bg-white p-6 shadow-[0_8px_22px_rgba(15,23,42,0.07)] transition-all hover:shadow-[0_16px_36px_rgba(169,70,114,0.14)]"
              >
                <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#fdeef5] text-2xl font-bold text-[#a94672] transition-all group-hover:rotate-6 group-hover:scale-110">
                  +
                </div>
                <h3 className="text-[1.9rem] font-bold leading-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-8 text-slate-600">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#fff7fa_0%,#fdeef5_100%)] py-6 sm:py-7 md:py-8">
        <div className="container-padded">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#a94672]">
              Treatment Process
            </p>
            <h2 className="text-3xl font-bold text-[#5f2442] md:text-4xl">
              A simple, clear, and caring healing journey.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4"
          >
            {processSteps.map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative flex min-h-[210px] flex-col overflow-hidden rounded-[22px] bg-white p-6 shadow-[0_12px_26px_rgba(169,70,114,0.1)]"
              >
                <span className="absolute -right-3 -top-5 text-7xl font-black text-[#fdeef5]">
                  {item.step}
                </span>
                <p className="relative text-sm font-bold uppercase tracking-[0.2em] text-[#a94672]">
                  Step {item.step}
                </p>
                <h3 className="relative mt-4 text-[1.8rem] font-bold leading-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-base leading-8 text-slate-600">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-6 sm:py-7 md:py-8">
        <div className="container-padded grid items-center gap-5 lg:grid-cols-2 lg:gap-6">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <SectionTitle
              eyebrow="Our Values"
              title="Care that feels personal, ethical, and reliable."
              description="Our clinic works with strong values that help patients feel comfortable, confident, and supported."
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {values.map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ x: 6 }}
                  className="rounded-[18px] border border-[#efcad9] bg-[#fff7fa] px-5 py-3.5 font-semibold text-[#8f355f]"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="grid gap-3"
          >
            <div className="rounded-[22px] bg-slate-900 p-6 text-white shadow-[0_16px_34px_rgba(15,23,42,0.18)]">
              <h3 className="text-[1.85rem] font-bold leading-tight">Patient Education</h3>
              <p className="mt-3 text-base leading-8 text-white/80">
                We help patients understand their health conditions, treatment
                approach, lifestyle care, and follow-up routine clearly.
              </p>
            </div>

            <div className="rounded-[22px] bg-[#fdeef5] p-6 shadow-[0_16px_34px_rgba(169,70,114,0.12)]">
              <h3 className="text-[1.85rem] font-bold leading-tight text-[#5f2442]">
                Long-term Wellness
              </h3>
              <p className="mt-3 text-base leading-8 text-[#8f355f]">
                Our focus is not only on relief but also on improving immunity,
                balance, and overall health naturally.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 py-6 sm:py-7 md:py-8">
        <div className="container-padded">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Why Patients Trust Us
            </p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              A healthcare experience that feels human, clear, and dependable.
            </h2>
          </motion.div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Experienced Guidance",
                text: "Professional consultation supported by detailed case understanding and a patient-friendly process.",
              },
              {
                title: "Personalized Treatment",
                text: "Every treatment plan is designed according to symptoms, health history, and individual needs.",
              },
              {
                title: "Safe & Natural Care",
                text: "Homeopathic remedies are gentle, natural, and suitable for patients of different age groups.",
              },
              {
                title: "Continuous Support",
                text: "We provide proper follow-up, progress monitoring, and guidance throughout the healing journey.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="flex min-h-[205px] flex-col rounded-[20px] bg-white p-6 shadow-[0_8px_22px_rgba(15,23,42,0.07)]"
              >
                <h3 className="text-[1.55rem] font-bold leading-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-8 text-slate-600">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#fdeef5_0%,#f8dfe9_100%)] py-6 sm:py-7 md:py-8 text-slate-900">
        <div className="container-padded grid items-center gap-5 lg:grid-cols-2 lg:gap-6">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#a94672]">
              Our Commitment
            </p>
            <h2 className="text-3xl font-bold leading-tight text-[#5f2442] md:text-4xl">
              We are committed to making homeopathic healthcare more
              approachable, trusted, and reassuring for every patient.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#8f355f]">
              Whether someone is visiting for a first consultation, exploring
              treatment options, or looking for long-term wellness guidance, our
              responsibility is to make that journey simple, supportive, and
              professionally managed.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="mt-6 rounded-full bg-[#a94672] px-8 py-4 font-bold text-white shadow-[0_16px_40px_rgba(169,70,114,0.28)]"
            >
              Book Your Consultation
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <div className="overflow-hidden rounded-[24px] border border-[#efcad9] bg-[#fff7fa] p-2 shadow-[0_16px_34px_rgba(169,70,114,0.14)]">
              <img
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
                alt="Doctor consultation"
                className="h-[320px] w-full rounded-[18px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
