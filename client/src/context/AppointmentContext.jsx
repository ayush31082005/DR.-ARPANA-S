import { createContext, useEffect, useMemo, useState } from "react";
import {
  createAppointment,
  getAppointments,
} from "../services/appointmentService";

export const AppointmentContext = createContext(null);

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await getAppointments();
      setAppointments(response.appointments || []);
    } catch (error) {
      setAppointments([]);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments().catch(() => {});
  }, []);

  const bookAppointment = async (payload) => {
    const response = await createAppointment(payload);
    const nextAppointment = response.appointment;
    setAppointments((prev) => [nextAppointment, ...prev]);
    return response;
  };

  const value = useMemo(
    () => ({
      appointments,
      isLoading,
      bookAppointment,
      refreshAppointments: fetchAppointments,
    }),
    [appointments, isLoading]
  );

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
}
