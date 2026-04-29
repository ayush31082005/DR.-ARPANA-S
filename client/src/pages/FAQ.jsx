import PageHero from "../components/common/PageHero";
import Accordion from "../components/ui/Accordion";
import { faqData } from "../data/faqData";

export default function FAQ() {
  return (
    <>
      <PageHero title="Frequently Asked Questions" description="Answer common questions about appointments, orders, and support." />
      <section className="section-space">
        <div className="container-padded">
          <Accordion items={faqData} />
        </div>
      </section>
    </>
  );
}
