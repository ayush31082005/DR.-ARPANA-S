import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const heroVideoSources = [
  "/images/144006-784164313_medium.mp4",
  "/images/39136-420274318_medium.mp4",
];

const HERO_SLIDE_INTERVAL = 6000;

const heroSlides = [
  {
    eyebrow: "Trusted Clinic, Wellness and Guidance",
    titleTop: "Beautifully Delivered.",
    accent: "Modern Care",
    titleBottom: "for Everyday Wellness.",
    description:
      "Online appointments, trusted doctor guidance, and a polished clinic experience now come together in one clear and patient-friendly destination.",
    supportingText:
      "Explore homeopathy, ayurveda, skin care, and clinic support with a smoother journey that feels calm, modern, and easy to trust from the very first visit.",
    tags: [
      "Easy Appointments",
      "Holistic Treatments",
      "Clinic Guidance",
      "Patient-First Support",
    ],
    primaryLabel: "Book Appointment",
    primaryTo: "/appointment",
    secondaryLabel: "Explore Services",
    secondaryTo: "/services",
  },
  {
    eyebrow: "Care That Moves With Your Day",
    titleTop: "Simple Access.",
    accent: "Personal Guidance",
    titleBottom: "for Every Step Forward.",
    description:
      "From first consultation to follow-up support, the experience is designed to feel easier, faster, and more reassuring for patients and families.",
    supportingText:
      "Discover expert-led services, clear booking flows, wellness recommendations, and a modern digital clinic journey that keeps everything in one place.",
    tags: [
      "Doctor Consultations",
      "Smooth Follow-Ups",
      "Trusted Remedies",
      "Clear Communication",
    ],
    primaryLabel: "Explore Services",
    primaryTo: "/services",
    secondaryLabel: "Contact Clinic",
    secondaryTo: "/contact",
  },
];

export default function HeroSection() {
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionsRef = useRef(null);
  const videoRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hasVideoError, setHasVideoError] = useState(false);
  const currentVideoSrc = heroVideoSources[activeSlide];
  const currentSlide = heroSlides[activeSlide % heroSlides.length];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, HERO_SLIDE_INTERVAL);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    setHasVideoError(false);
    videoRef.current.load();

    const playPromise = videoRef.current.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  }, [activeSlide]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      if (eyebrowRef.current) {
        timeline.from(eyebrowRef.current, { y: 24, opacity: 0, duration: 0.45 });
      }

      if (titleRef.current) {
        timeline.from(titleRef.current, { y: 36, opacity: 0, duration: 0.7 }, "-=0.15");
      }

      if (descriptionRef.current) {
        timeline.from(descriptionRef.current, { y: 24, opacity: 0, duration: 0.55 }, "-=0.35");
      }

      if (actionsRef.current) {
        timeline.from(actionsRef.current, { y: 20, opacity: 0, duration: 0.45 }, "-=0.25");
      }

      timeline
        .from("[data-hero-media]", {
          y: 36,
          opacity: 0,
          duration: 0.65
        }, "-=0.15");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative text-white"
    >
      <section className="relative isolate overflow-hidden bg-transparent">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div data-hero-media className="relative h-full w-full">
            <video
              ref={videoRef}
              key={currentVideoSrc}
              className={`h-full w-full object-cover object-center transition-opacity duration-300 ${
                hasVideoError ? "opacity-0" : "opacity-100"
              }`}
              autoPlay
              muted
              playsInline
              preload="auto"
              onCanPlay={() => {}}
              onError={() => setHasVideoError(true)}
            >
              <source src={currentVideoSrc} type="video/mp4" />
            </video>
          </div>

          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              hasVideoError
                ? "bg-transparent opacity-100"
                : "bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.04)_100%)] opacity-100"
            }`}
          />
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              hasVideoError
                ? "opacity-0"
                : "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_38%)] opacity-100"
            }`}
          />
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              hasVideoError
                ? "opacity-0"
                : "bg-transparent opacity-100"
            }`}
          />
        </div>

        <div className="container-padded relative z-20 flex min-h-[calc(100svh-104px)] items-center justify-center py-4 sm:py-5 lg:py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 40, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-6 text-center sm:px-8"
            >
              <p
                ref={eyebrowRef}
                data-hero="eyebrow"
                className="mb-4 rounded-full border border-[#e8bfd0] bg-[#fff7fa]/80 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7d2f53] backdrop-blur-sm sm:text-xs"
              >
                {currentSlide.eyebrow}
              </p>

              <h1
                ref={titleRef}
                data-hero="title"
                className="max-w-3xl text-[clamp(1.2rem,2.8vw,2.3rem)] font-extrabold leading-[1.02] text-[#5f2442]"
              >
                {currentSlide.titleTop}
                <br />
                <span className="text-[#d66f9f]">{currentSlide.accent}</span>{" "}
                {currentSlide.titleBottom}
              </h1>

              <div
                ref={descriptionRef}
                data-hero="description"
                className="mt-5 max-w-3xl space-y-3 text-[16px] leading-7 text-[#6f2849] sm:text-[18px] md:text-[20px]"
              >
                <p>{currentSlide.description}</p>
                <p className="text-[14px] leading-6 text-[#8f355f] sm:text-[16px] md:text-[18px]">
                  {currentSlide.supportingText}
                </p>
              </div>

              <div className="mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-[14px] font-semibold text-[#7d2f53] sm:text-[16px]">
                {currentSlide.tags.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#efcad9] bg-[#fff7fa]/85 px-4 py-2 shadow-[0_10px_24px_rgba(169,70,114,0.08)] backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div
                ref={actionsRef}
                data-hero="actions"
                className="mt-7 flex flex-wrap items-center justify-center gap-4"
              >
                <Link to={currentSlide.primaryTo}>
                  <Button>{currentSlide.primaryLabel}</Button>
                </Link>
                <Link to={currentSlide.secondaryTo}>
                  <Button variant="outline">{currentSlide.secondaryLabel}</Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}


