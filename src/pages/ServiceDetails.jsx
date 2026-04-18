import Breadcrumb from "../components/common/Breadcrumb";
import PageHero from "../components/common/PageHero";
import ServiceDetailsCard from "../components/services/ServiceDetailsCard";

export default function ServiceDetails() {
  return (
    <>
      <PageHero title="Service Details" description="Detailed service information page." />
      <section className="section-space">
        <div className="container-padded">
          <Breadcrumb items={[{ label: "Services", path: "/services" }, { label: "Service Details" }]} />
          <ServiceDetailsCard />
        </div>
      </section>
    </>
  );
}
