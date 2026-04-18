import HeroSection from "../components/home/HeroSection";
import ClinicIntro from "../components/home/ClinicIntro";
import FeaturedServices from "../components/home/FeaturedServices";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import TestimonialsSection from "../components/home/TestimonialsSection";
import AppointmentCTA from "../components/home/AppointmentCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ClinicIntro />
      <FeaturedServices />
      <FeaturedProducts />
      <WhyChooseUs />
      <TestimonialsSection />
      <AppointmentCTA />
    </>
  );
}
