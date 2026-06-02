import PageHero from "../components/common/PageHero";
import Accordion from "../components/ui/Accordion";
import { faqData } from "../data/faqData";

export default function FAQ() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        description="Find answers to common questions about consultations, appointments, treatments, prescriptions, and patient support at Dr. Arpana's Homeo Care."
        center
      />

      <section className="section-space">
        <div className="container-padded">
          <Accordion items={faqData} />
        </div>
      </section>
    </>
  );
}