import PageHero from "../components/common/PageHero";
import ServiceList from "../components/services/ServiceList";

export default function Services() {
  return (
    <>
      <PageHero title="Clinic Services" description="Show treatments, consultation types, and care categories." center />
      <section className="section-space">
        <div className="container-padded">
          <ServiceList />
        </div>
      </section>
    </>
  );
}
