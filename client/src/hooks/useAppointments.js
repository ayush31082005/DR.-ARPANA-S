import { useContext } from "react";
import { AppointmentContext } from "../context/AppointmentContext";

export default function useAppointments() {
  return useContext(AppointmentContext);
}
