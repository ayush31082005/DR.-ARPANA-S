import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const stats = [
  { value: 25, suffix: "K+", label: "Happy Users" },
  { value: 40, suffix: "+", label: "Care Categories" },
  { value: 12, suffix: "+", label: "Specialists" },
  { value: 24, suffix: "/7", label: "Support" },
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
        duration: 1.4,
        ease: "power2.out",
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
        title="About ClinicCare"
        description="A trusted clinic and wellness destination built to deliver better care, better guidance, and a better patient experience."
        center
        image="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80"
        imageOverlayClassName="bg-black/20"
        imageGradientClassName="bg-gradient-to-r from-black/35 via-black/15 to-transparent"
        descriptionClassName="text-white/90"
      />

      <section className="section-space !py-8 sm:!py-10 bg-[linear-gradient(180deg,#f6ffe8_0%,#e7f8c7_55%,#ddf3b1_100%)]">
        <div className="container-padded">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-[28px] border border-[#b9de82] bg-[linear-gradient(180deg,#fbffef_0%,#eefddb_100%)] px-5 py-6 text-center shadow-[0_16px_40px_rgba(79,143,22,0.14)]"
              >
                <p
                  ref={(element) => {
                    countRefs.current[index] = element;
                  }}
                  className="text-3xl font-extrabold tracking-tight text-[#35690d] sm:text-[2.1rem]"
                >
                  0{stat.suffix}
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4f6d33] sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-padded grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <SectionTitle
              eyebrow="Who We Are"
              title="Modern healthcare, delivered with care and clarity."
              description="ClinicCare is designed for patients who want trusted consultation, quality health guidance, and a smooth digital experience. Our goal is to make healthcare feel more personal, more accessible, and more reliable."
            />

            <div className="mt-6 space-y-5 text-[15px] leading-8 text-slate-600">
              <p>
                We believe healthcare should feel reassuring from the very first
                interaction. That is why our clinic experience is built around
                trust, transparency, comfort, and timely support.
              </p>

              <p>
                From routine consultations to specialist care, our platform is
                structured to help patients book appointments easily, understand
                services clearly, and connect with the right doctor without
                confusion.
              </p>

              <p>
                Alongside medical consultation, we also support everyday wellness
                needs through a carefully planned product experience, making
                ClinicCare a complete destination for care and convenience.
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
            <div className="relative overflow-hidden rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
                alt="Clinic team"
                className="h-[420px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 left-6 rounded-[24px] bg-white px-6 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Trusted Care
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                Patient-first approach
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-space bg-slate-50">
        <div className="container-padded grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="grid gap-5">
              <div className="rounded-[28px] bg-white p-7 shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
                <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
                <p className="mt-3 text-[15px] leading-8 text-slate-600">
                  To provide dependable, accessible, and modern healthcare that
                  helps patients make confident decisions about their health.
                </p>
              </div>

              <div className="rounded-[28px] bg-white p-7 shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
                <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
                <p className="mt-3 text-[15px] leading-8 text-slate-600">
                  To become a trusted healthcare brand where consultation,
                  wellness, and patient support work together in one seamless
                  ecosystem.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className="order-1 lg:order-2"
          >
            <SectionTitle
              eyebrow="Our Purpose"
              title="Built around people, not just processes."
              description="We focus on making every part of the healthcare journey easier — from finding the right service to receiving the right support at the right time."
            />

            <div className="mt-6 space-y-5 text-[15px] leading-8 text-slate-600">
              <p>
                Many patients feel overwhelmed when clinics look complicated,
                outdated, or unclear. Our approach is different. We aim to create
                an experience that feels calm, premium, and easy to understand.
              </p>

              <p>
                Every section of our brand — appointments, services, doctors,
                and health products — is designed to reduce friction and increase
                trust. That means better communication, better presentation, and
                better confidence for the user.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-padded">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Why Patients Trust Us
            </p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              A healthcare experience that feels human, clear, and dependable.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Experienced Guidance",
                text: "Professional care supported by a thoughtful and patient-friendly consultation flow.",
              },
              {
                title: "Easy Appointments",
                text: "A cleaner booking experience that helps users request appointments without confusion.",
              },
              {
                title: "Complete Wellness Support",
                text: "Services and product access together create a more complete health experience.",
              },
              {
                title: "Premium Experience",
                text: "A polished digital presence that reflects trust, care, and modern healthcare values.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="border-l-2 border-primary/20 pl-5"
              >
                <h3 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-8 text-slate-600">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[linear-gradient(180deg,#eefddb_0%,#dcf6b4_100%)] text-slate-900">
        <div className="container-padded grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#4f8f16]">
              Our Commitment
            </p>
            <h2 className="text-3xl font-bold leading-tight text-[#17320a] md:text-4xl">
              We are committed to making healthcare more approachable and more
              reassuring for every patient.
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-[#4a5f38]">
              Whether someone is visiting for a consultation, exploring treatment
              options, or looking for trusted wellness products, our responsibility
              is to make that journey feel simple, supportive, and professionally managed.
            </p>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
          >
            <div className="overflow-hidden rounded-[32px] border border-[#c9e89b] bg-[#f6ffe8] p-2 shadow-[0_20px_60px_rgba(79,143,22,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
                alt="Doctor consultation"
                className="h-[380px] w-full rounded-[26px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
