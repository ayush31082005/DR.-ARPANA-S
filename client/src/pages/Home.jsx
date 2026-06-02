import HeroSection from "../components/home/HeroSection";
import ClinicIntro from "../components/home/ClinicIntro";
import CarePhilosophySection from "../components/home/CarePhilosophySection";
import SignatureCareSection from "../components/home/SignatureCareSection";
import FeaturedServices from "../components/home/FeaturedServices";
import CareJourneySection from "../components/home/CareJourneySection";
import HomeFaqPreviewSection from "../components/home/HomeFaqPreviewSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import HomeClosingSection from "../components/home/HomeClosingSection";
import ConsultationBandSection from "../components/home/ConsultationBandSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ClinicIntro />
      <CarePhilosophySection />
      <FeaturedServices />
      <SignatureCareSection />
      <CareJourneySection />
      <HomeFaqPreviewSection />
      <TestimonialsSection />
      <HomeClosingSection />
      <ConsultationBandSection />
    </>
  );
}
