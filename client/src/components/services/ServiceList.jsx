import { servicesData } from "../../data/servicesData";
import ServiceCard from "./ServiceCard";

export default function ServiceList() {
  return (
    <div className="flex flex-wrap gap-5">
      {servicesData.map((service) => (
        <div
          key={service.id}
          className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.875rem)] xl:w-[calc(20%-1rem)]"
        >
          <ServiceCard service={service} variant="imageOverlay" />
        </div>
      ))}
    </div>
  );
}
