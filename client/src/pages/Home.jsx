import HeroSection from "../components/home/HeroSection";
import ClinicIntro from "../components/home/ClinicIntro";
import FeaturedServices from "../components/home/FeaturedServices";
import AyurvedaProducts from "../components/home/AyurvedaProducts";
import HomeopathyProducts from "../components/home/HomeopathyProducts";
import SkinCareProducts from "../components/home/SkinCareProducts";
import FeaturedProducts from "../components/home/FeaturedProducts";
import TestimonialsSection from "../components/home/TestimonialsSection";
import AppointmentCTA from "../components/home/AppointmentCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ClinicIntro />
      <FeaturedServices />
      <FeaturedProducts />
      <SkinCareProducts />
      <AyurvedaProducts />
      <HomeopathyProducts />
      <TestimonialsSection />
      <AppointmentCTA />
    </>
  );
}
