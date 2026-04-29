import PageHero from "../components/common/PageHero";
import ServiceList from "../components/services/ServiceList";

export default function Services() {
  return (
    <>
      <PageHero
        title="Clinic Services"
        description="Show treatments, consultation types, and care categories."
        center
        image="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section-space">
        <div className="container-padded">
          <ServiceList />
        </div>
      </section>
    </>
  );
}
