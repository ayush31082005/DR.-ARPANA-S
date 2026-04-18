import PageHero from "../components/common/PageHero";

export default function Gallery() {
  return (
    <>
      <PageHero title="Gallery" description="Show your clinic spaces, staff, equipment, and trust-building visuals." />
      <section className="section-space">
        <div className="container-padded grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => <div key={index} className="surface h-72 bg-gradient-to-br from-slate-100 to-slate-200" />)}
        </div>
      </section>
    </>
  );
}
