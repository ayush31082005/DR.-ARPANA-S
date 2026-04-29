import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const stats = [
  { value: 25, suffix: "K+", label: "Happy Users" },
  { value: 40, suffix: "+", label: "Care Categories" },
  { value: 12, suffix: "+", label: "Specialists" },
  { value: 24, suffix: "/7", label: "Support" }
];

const heroVideoSources = [
  "/images/144015-784164329_medium.mp4",
  "/images/144006-784164313_medium.mp4",
  "/images/39136-420274318_medium.mp4"
];

export default function HeroSection() {
  const heroRef = useRef(null);
  const countRefs = useRef([]);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionsRef = useRef(null);
  const videoRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const currentVideoSrc = heroVideoSources[activeSlide];

  useEffect(() => {
    if (!videoRef.current) return;

    setIsVideoReady(false);
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
        .from("[data-hero-card]", {
          y: 28,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1
        }, "-=0.2")
        .from("[data-hero-media]", {
          y: 36,
          opacity: 0,
          duration: 0.65
        }, "-=0.15")
        .add(() => {
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
              }
            });
          });
        }, "-=0.15");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div data-hero-media className="relative h-full w-full">
          <video
            key={`blur-${currentVideoSrc}`}
            className={`absolute inset-0 h-full w-full scale-110 object-cover blur-xl transition-opacity duration-300 ${
              isVideoReady ? "opacity-35" : "opacity-0"
            }`}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src={currentVideoSrc} type="video/mp4" />
          </video>
          <video
            ref={videoRef}
            key={currentVideoSrc}
            className={`h-full w-full object-cover object-center transition-opacity duration-300 ${
              isVideoReady ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoReady(true)}
            onEnded={() => setActiveSlide((prev) => (prev + 1) % heroVideoSources.length)}
          >
            <source src={currentVideoSrc} type="video/mp4" />
          </video>
        </div>

        <div className={`absolute inset-0 transition-opacity duration-300 ${isVideoReady ? "bg-slate-950/42 opacity-100" : "bg-slate-950 opacity-100"}`} />
        <div
          className={`absolute inset-0 bg-gradient-to-r from-slate-950/78 via-slate-900/52 to-teal-950/45 transition-opacity duration-300 ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-slate-950/72 via-transparent to-slate-950/28 transition-opacity duration-300 ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="hero-orb absolute inset-0 z-10" />
      <div className="container-padded relative z-20 flex min-h-[calc(100vh-112px)] items-center justify-center py-8 sm:py-10 lg:py-12">
        <div
          ref={heroRef}
          className="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
        >
          {/* <p
            ref={eyebrowRef}
            data-hero="eyebrow"
            className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-teal-200"
          >
            Clinic + Ecommerce
          </p> */}

          <h1
            ref={titleRef}
            data-hero="title"
            className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl xl:text-7xl"
          >
            <span className="gradient-text">Modern Care</span>
            <br />
            Beautifully Delivered.
          </h1>

          <p
            ref={descriptionRef}
            data-hero="description"
            className="mt-6 max-w-3xl text-base leading-8 text-slate-200 md:text-lg"
          >
            Premium clinic website with doctor appointments, service showcases, and a polished online wellness shop in one responsive experience.
          </p>

          <div
            ref={actionsRef}
            data-hero="actions"
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/appointment">
              <Button>Book Appointment</Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline">Shop Products</Button>
            </Link>
          </div>

          <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                data-hero-card
                className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"
              >
                <p
                  ref={(element) => {
                    countRefs.current[index] = element;
                  }}
                  className="text-2xl font-bold"
                >
                  0{stat.suffix}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-200">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
