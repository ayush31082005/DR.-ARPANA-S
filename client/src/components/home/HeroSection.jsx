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
    eyebrow: "Dr. Arpana's Homeo Care | Sahibabad, Ghaziabad",
    titleTop: "Homeopathic Care",
    accent: "for Chronic",
    titleBottom: "and Everyday Health Concerns.",
    description:
      "Dr. Arpana's Homeo Care focuses on homeopathy consultation, chronic disease management, acute illness treatment, and lifestyle guidance in Sahibabad, Ghaziabad.",
    supportingText:
      "The clinic's public profile highlights support for skin and hair concerns, migraine, thyroid disorders, allergic rhinitis, asthma and COPD, digestive complaints, joint pain, anxiety, and sleep-related concerns.",
    primaryLabel: "Book Appointment",
    primaryTo: "/appointment",
    secondaryLabel: "Explore Services",
    secondaryTo: "/services",
  },
  {
    eyebrow: "Open All Week | Mon-Sun 11:00 AM - 9:00 PM",
    titleTop: "Personal Guidance",
    accent: "for Skin, Thyroid,",
    titleBottom: "Migraine, and Respiratory Care.",
    description:
      "From the first consultation to follow-up care, the focus stays on understanding recurring symptoms, long-term patterns, and a treatment path that feels personal and clear.",
    supportingText:
      "Patients visiting Dr. Arpana's Homeo Care commonly look for support in eczema, psoriasis, hair fall, constipation, kidney stones, gallstones, anxiety, sleep issues, and other recurring concerns.",
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
  const [videoReady, setVideoReady] = useState(false);

  const currentVideoSrc = heroVideoSources[activeSlide % heroVideoSources.length];
  const currentSlide = heroSlides[activeSlide % heroSlides.length];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, HERO_SLIDE_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setVideoReady(false);
    video.load();

    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        setVideoReady(false);
      });
    }
  }, [currentVideoSrc]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (eyebrowRef.current) {
        timeline.from(eyebrowRef.current, {
          y: 24,
          opacity: 0,
          duration: 0.45,
        });
      }

      if (titleRef.current) {
        timeline.from(
          titleRef.current,
          {
            y: 36,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.15"
        );
      }

      if (descriptionRef.current) {
        timeline.from(
          descriptionRef.current,
          {
            y: 24,
            opacity: 0,
            duration: 0.55,
          },
          "-=0.35"
        );
      }

      if (actionsRef.current) {
        timeline.from(
          actionsRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.45,
          },
          "-=0.25"
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative text-white">
      <section className="relative isolate overflow-hidden bg-[#fff7fa]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#fff7fa_0%,#fdeef5_42%,#d66f9f_100%)]" />

          <video
            ref={videoRef}
            key={currentVideoSrc}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            onLoadedData={() => setVideoReady(true)}
            onError={() => setVideoReady(false)}
          >
            <source src={currentVideoSrc} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,247,250,0.28)_0%,rgba(255,247,250,0.12)_32%,rgba(17,24,39,0.62)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_40%)]" />
        </div>

        <div className="container-padded relative z-20 flex min-h-[430px] items-end justify-center py-3 sm:min-h-[calc(100svh-104px)] sm:items-center sm:py-5 lg:py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -25, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mx-auto flex w-full max-w-3xl flex-col items-center px-3 py-4 text-center sm:px-8 sm:py-6"
            >
              <p
                ref={eyebrowRef}
                className="mb-2 rounded-full border border-[#e8bfd0] bg-[#fff7fa]/86 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7d2f53] backdrop-blur-sm sm:mb-4 sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.22em]"
              >
                {currentSlide.eyebrow}
              </p>

              <h1
                ref={titleRef}
                className="max-w-3xl text-[clamp(1.8rem,7vw,2.3rem)] font-extrabold leading-[1.02] text-white sm:text-[clamp(1.2rem,2.8vw,2.3rem)] sm:text-[#5f2442]"
              >
                {currentSlide.titleTop}
                <br />
                <span className="text-[#d66f9f]">{currentSlide.accent}</span>{" "}
                {currentSlide.titleBottom}
              </h1>

              <div
                ref={descriptionRef}
                className="mt-3 max-w-3xl space-y-2 text-[14px] leading-6 text-white/92 sm:mt-5 sm:space-y-3 sm:text-[18px] sm:leading-7 sm:text-[#6f2849] md:text-[20px]"
              >
                <p>{currentSlide.description}</p>
                <p className="hidden text-[14px] leading-6 text-white/80 sm:block sm:text-[16px] sm:text-[#8f355f] md:text-[18px]">
                  {currentSlide.supportingText}
                </p>
              </div>

              <div
                ref={actionsRef}
                className="mt-4 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
              >
                <Link to={currentSlide.primaryTo} className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto">
                    {currentSlide.primaryLabel}
                  </Button>
                </Link>

                <Link to={currentSlide.secondaryTo} className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full bg-white/92 text-[#7d2f53] sm:w-auto sm:bg-[#fff7fa]"
                  >
                    {currentSlide.secondaryLabel}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}