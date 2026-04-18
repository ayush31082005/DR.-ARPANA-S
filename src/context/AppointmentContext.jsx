import { createContext, useMemo, useState } from "react";

export const AppointmentContext = createContext(null);

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const bookAppointment = (payload) => {
    setAppointments((prev) => [...prev, { id: String(Date.now()), status: "Pending", createdAt: new Date().toISOString(), ...payload }]);
  };
  const value = useMemo(() => ({ appointments, bookAppointment }), [appointments]);
  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
}
