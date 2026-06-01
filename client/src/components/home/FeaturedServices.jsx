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

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {servicesData.slice(0, 4).map((service) => (
            <div
              key={service.id}
              className="min-w-0"
            >
              <ServiceCard service={service} variant="imageOverlay" mobileImageOnly />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/services"
            className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary"
          >
            See All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
