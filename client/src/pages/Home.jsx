import HeroSection from "../components/home/HeroSection";
import ClinicIntro from "../components/home/ClinicIntro";
import FeaturedServices from "../components/home/FeaturedServices";
import TestimonialsSection from "../components/home/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ClinicIntro />
      <FeaturedServices />
      <TestimonialsSection />
    </>
  );
}
