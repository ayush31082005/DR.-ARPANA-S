import { Link } from "react-router-dom";
import { servicesData } from "../../data/servicesData";
import MotionSection from "../common/MotionSection";
import SectionTitle from "../common/SectionTitle";
import ServiceCard from "../services/ServiceCard";

export default function FeaturedServices() {
  return (
    <section className="section-space bg-white">
      <div className="container-padded">
        <MotionSection>
          <SectionTitle
            eyebrow="Services"
            title="Popular Clinic Services"
            description="Show your top medical services on the homepage."
          />
        </MotionSection>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {servicesData.slice(0, 4).map((service) => (
            <ServiceCard key={service.id} service={service} />
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
