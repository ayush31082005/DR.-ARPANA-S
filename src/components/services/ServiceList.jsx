import { servicesData } from "../../data/servicesData";
import ServiceCard from "./ServiceCard";

export default function ServiceList() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {servicesData.map((service) => <ServiceCard key={service.id} service={service} />)}
    </div>
  );
}
