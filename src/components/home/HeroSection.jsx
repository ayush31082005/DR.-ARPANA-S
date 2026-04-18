import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const stats = [
  { value: 25, suffix: "K+", label: "Happy Users" },
  { value: 40, suffix: "+", label: "Care Categories" },
  { value: 12, suffix: "+", label: "Specialists" },
  { value: 24, suffix: "/7", label: "Support" }
];

export default function HeroSection() {
  const heroRef = useRef(null);
  const countRefs = useRef([]);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionsRef = useRef(null);

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
    <section className="relative overflow-hidden bg-mesh text-white">
      <div className="hero-orb absolute inset-0" />
      <div className="container-padded relative flex min-h-[calc(100vh-112px)] items-center justify-center py-8 sm:py-10 lg:py-12">
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
