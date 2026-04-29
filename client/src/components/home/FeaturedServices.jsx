import { Link } from "react-router-dom";
import { servicesData } from "../../data/servicesData";
import MotionSection from "../common/MotionSection";
import SectionTitle from "../common/SectionTitle";
import ServiceCard from "../services/ServiceCard";

export default function FeaturedServices() {
  return (
    <section className="bg-white pt-6 pb-8 md:pt-10 md:pb-10">
      <div className="container-padded">
        <MotionSection>
          <SectionTitle
            eyebrow="Services"
            title="Popular Clinic Services"
            description="Show your top medical services on the homepage."
          />
        </MotionSection>

        <div className="mt-10 flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {servicesData.slice(0, 4).map((service) => (
            <div
              key={service.id}
              className="min-w-[280px] flex-1 sm:min-w-[320px] lg:min-w-[340px] xl:min-w-[300px]"
            >
              <ServiceCard service={service} variant="imageOverlay" />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/services"
            className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            See All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
