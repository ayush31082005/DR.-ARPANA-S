import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useAppointments from "../hooks/useAppointments";
import {
  sendAppointmentOtp as sendAppointmentOtpRequest,
  verifyAppointmentOtp as verifyAppointmentOtpRequest,
} from "../services/appointmentService";

const doctorProfile = {
  name: "Dr. Arpana Srivastav",
  registration: "Reg. No : DHC2408",
  specialty: "Homeopathy Consultation, Chronic Disease Management, Acute Care Support",
  experience: "18+ Years",
  education: "B.H.M.S., Advanced Lifestyle Counseling, Clinical Homeopathy Practice",
  languages: ["English", "Hindi"],
  timing:
    "Lajpat Nagar, Sector 4, Sahibabad | Mon-Sun : 11:00 AM - 9:00 PM | Consultation by prior booking",
  image:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80",
};

const clinicOptions = [
  {
    id: "sahibabad-main",
    label: "Dr. Arpana's Homeo Care, Sahibabad",
    address: "Lajpat Nagar, Sector 4, Sahibabad, Ghaziabad",
    callNumber: "+91 98765 43210",
  },
  {
    id: "tele-consult",
    label: "Online / Follow-up Consultation",
    address: "Phone and video consultation support",
    callNumber: "+91 98765 43210",
  },
];

const concernOptions = [
  "Homeopathy Consultation",
  "Skin and Hair Support",
  "Migraine and Thyroid Care",
  "Respiratory and Lifestyle Guidance",
];

function formatDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateForApi(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDatePill(date) {
  return {
    weekday: new Intl.DateTimeFormat("en-IN", { weekday: "short" }).format(date),
    day: new Intl.DateTimeFormat("en-IN", { day: "numeric" }).format(date),
    month: new Intl.DateTimeFormat("en-IN", { month: "short" }).format(date),
  };
}

function buildTelLink(phoneNumber) {
  const cleanedNumber = phoneNumber.replace(/[^\d+]/g, "");
  return `tel:${cleanedNumber}`;
}

function nextDates(count = 7) {
  return Array.from({ length: count }, (_, index) => {
    const next = new Date();
    next.setDate(next.getDate() + index);
    return next;
  });
}

function isSameCalendarDay(firstDate, secondDate) {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}

function buildHourlySlots(selectedDate, now = new Date()) {
  return Array.from({ length: 10 }, (_, index) => 9 + index)
    .filter((hour24) => {
      if (!isSameCalendarDay(selectedDate, now)) {
        return true;
      }

      const slotTime = new Date(selectedDate);
      slotTime.setHours(hour24, 0, 0, 0);
      return slotTime > now;
    })
    .map((hour24) => {
      const period = hour24 >= 12 ? "PM" : "AM";
      const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
      return `${String(hour12).padStart(2, "0")}:00 ${period}`;
    });
}

function AppointmentModal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-8">
      <div className="w-full max-w-md rounded-[10px] bg-white p-6 shadow-2xl sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold text-slate-950">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-[8px] border border-slate-200 text-xl font-bold leading-none text-slate-700 transition hover:border-rose-300 hover:text-rose-700"
            aria-label="Close modal"
          >
            x
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function SummaryCard({ appointmentDate, appointmentTime, location }) {
  return (
    <div className="rounded-[10px] border border-rose-100 bg-white p-4 text-slate-950 shadow-[0_20px_70px_rgba(148,32,91,0.08)] sm:p-7">
      <h2 className="mb-4 text-2xl font-black text-slate-950 sm:mb-5 sm:text-3xl">Summary</h2>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        <div className="min-w-0 rounded-[10px] border border-slate-200 p-3.5 sm:p-4">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
            Appointment Date
          </p>
          <p className="mt-2 break-words text-lg font-black text-slate-950 sm:text-xl">{appointmentDate}</p>
        </div>
        <div className="min-w-0 rounded-[10px] border border-slate-200 p-3.5 sm:p-4">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
            Appointment Time
          </p>
          <p className="mt-2 break-words text-lg font-black text-slate-950 sm:text-xl">{appointmentTime}</p>
        </div>
      </div>
      <div className="mt-3 rounded-[10px] border border-slate-200 p-3.5 sm:mt-4 sm:p-4">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Doctor</p>
        <p className="mt-2 break-words text-lg font-black leading-tight text-slate-950 sm:text-xl">
          {doctorProfile.name}
        </p>
      </div>
      <div className="mt-3 rounded-[10px] border border-slate-200 p-3.5 sm:mt-4 sm:p-4">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Location</p>
        <p className="mt-2 break-words text-base font-bold leading-7 text-slate-950 sm:text-lg">
          {location}
        </p>
      </div>
    </div>
  );
}

function BookingWidget({
  clinicOptions,
  selectedClinic,
  setSelectedClinic,
  dateOptions,
  selectedDateIndex,
  setSelectedDateIndex,
  setSelectedTime,
  slots,
  selectedTime,
  startLoginFlow,
  openCallModal,
  errorMessage,
  selectedClinicDetails,
}) {
  return (
    <div className="rounded-[10px] border border-rose-100 bg-white text-slate-950 shadow-[0_18px_70px_rgba(15,23,42,0.12)]">
      <div className="border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
        <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">Book Appointment</h2>
      </div>

      <div className="space-y-5 px-4 py-4 text-slate-950 sm:space-y-6 sm:px-6 sm:py-6">
        <div>
          <p className="mb-3 text-base font-black text-slate-950 sm:text-lg">Select Clinic</p>
          <div className="space-y-3">
            {clinicOptions.map((clinic) => (
              <label key={clinic.id} className="flex cursor-pointer items-start gap-3">
                <input
                  type="radio"
                  name="clinic"
                  checked={selectedClinic === clinic.id}
                  onChange={() => setSelectedClinic(clinic.id)}
                  className="mt-1 h-4 w-4 border-slate-300 text-[#8f355f] focus:ring-[#8f355f]"
                />
                <span className="min-w-0">
                  <span className="block break-words text-sm font-bold leading-6 text-slate-950 sm:text-base">
                    {clinic.label}
                  </span>
                  <span className="mt-1 block break-words text-xs leading-5 text-slate-500 sm:text-sm">
                    {clinic.address}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-base font-black text-slate-950 sm:text-lg">Select Date</p>
          <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
            {dateOptions.map((date, index) => {
              const pill = formatDatePill(date);
              const isActive = index === selectedDateIndex;

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => {
                    setSelectedDateIndex(index);
                    setSelectedTime("");
                  }}
                  className={`min-w-[58px] rounded-[10px] border px-2 py-3 text-center transition sm:min-w-[84px] sm:px-3 sm:py-4 ${
                    isActive
                      ? "shadow-lg"
                      : "border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-200 hover:bg-white"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: "#8f355f",
                          borderColor: "#8f355f",
                          color: "#ffffff",
                        }
                      : undefined
                  }
                >
                  <span className="block text-xs font-bold sm:text-sm">{pill.weekday}</span>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.14em] opacity-80 sm:text-xs sm:tracking-[0.18em]">
                    {pill.month}
                  </span>
                  <span className="mt-1 block text-2xl font-black leading-none sm:text-3xl">{pill.day}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-3 text-base font-black text-slate-950 sm:text-lg">Available Slots</p>
          {slots.length ? (
            <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`min-w-[72px] rounded-[10px] border px-3 py-3 text-center transition sm:min-w-[96px] sm:px-4 sm:py-4 ${
                    selectedTime === slot
                      ? "shadow-lg"
                      : "border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-200 hover:bg-white"
                  }`}
                  style={
                    selectedTime === slot
                      ? {
                          backgroundColor: "#8f355f",
                          borderColor: "#8f355f",
                          color: "#ffffff",
                        }
                      : undefined
                  }
                >
                  <span className="block text-xl font-black leading-none sm:text-2xl">
                    {slot.split(" ")[0]}
                  </span>
                  <span className="mt-1 block text-xs font-bold sm:text-sm">{slot.split(" ")[1]}</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="rounded-[10px] bg-slate-50 px-4 py-4 text-base font-medium text-slate-600">
              No slots available for this day. Please select another date.
            </p>
          )}
        </div>

        {errorMessage ? (
          <p className="rounded-[10px] bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {errorMessage}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 overflow-hidden rounded-b-[10px] border-t border-slate-200 sm:grid-cols-2">
        <button
          type="button"
          onClick={startLoginFlow}
          className="bg-[#8f355f] px-4 py-3.5 text-sm font-black text-white transition hover:bg-[#a94672] sm:px-5 sm:py-4 sm:text-lg"
        >
          Book Appointment -&gt;
        </button>
        <button
          type="button"
          onClick={openCallModal}
          className="border-t border-[#d9a5bc] bg-[#fff7fa] px-4 py-3.5 text-center text-sm font-black text-[#8f355f] transition hover:bg-[#fdeef5] sm:border-l sm:border-t-0 sm:px-5 sm:py-4 sm:text-lg"
          aria-label={`Call ${selectedClinicDetails.callNumber}`}
        >
          <span className="block">Call Now</span>
          <span className="mt-1 block text-xs font-bold text-[#b45b84] sm:text-sm">
            {selectedClinicDetails.callNumber}
          </span>
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function inputClasses(hasError) {
  return `w-full rounded-[10px] border bg-white px-4 py-3 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-100 ${
    hasError ? "border-red-300" : "border-slate-200"
  }`;
}

export default function Appointment() {
  const { bookAppointment } = useAppointments();
  const dateOptions = useMemo(() => nextDates(7), []);
  const [step, setStep] = useState("select");
  const [modal, setModal] = useState(null);
  const [callNotice, setCallNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedClinic, setSelectedClinic] = useState(clinicOptions[0].id);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);
  const [otpNotice, setOtpNotice] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [bookingDetails, setBookingDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    gender: "Male",
    service: concernOptions[0],
    notes: "",
  });

  const selectedClinicDetails =
    clinicOptions.find((clinic) => clinic.id === selectedClinic) || clinicOptions[0];
  const selectedDate = dateOptions[selectedDateIndex];
  const slots = useMemo(() => buildHourlySlots(selectedDate), [selectedDate]);
  const appointmentApiDate = formatDateForApi(selectedDate);
  const appointmentDate = formatDate(selectedDate);
  const appointmentTime = selectedTime || "Select slot";
  const callLink = buildTelLink(selectedClinicDetails.callNumber);

  const validateDetails = () => {
    const nextErrors = {};

    if (!bookingDetails.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }
    if (!bookingDetails.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(bookingDetails.phone.trim())) {
      nextErrors.phone = "Enter a valid 10 digit number.";
    }
    if (!bookingDetails.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(bookingDetails.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!bookingDetails.dob) {
      nextErrors.dob = "Date of birth is required.";
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const startLoginFlow = () => {
    if (!selectedTime) {
      setErrorMessage("Please select a date and time slot first.");
      return;
    }

    setErrorMessage("");
    setModal("phone");
  };

  const copyCallNumber = async () => {
    try {
      await navigator.clipboard.writeText(selectedClinicDetails.callNumber);
      setCallNotice(
        "Number copied. If the dialer does not open automatically, you can call this number manually."
      );
    } catch {
      setCallNotice("Unable to copy the number. Please note it down and call manually.");
    }
  };

  const submitPhone = (event) => {
    event.preventDefault();

    if (!/^\d{10}$/.test(phoneInput.trim())) {
      setErrorMessage("Enter a valid 10 digit mobile number.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(emailInput.trim())) {
      setErrorMessage("Enter a valid email address.");
      return;
    }

    setIsOtpSending(true);
    setErrorMessage("");
    setOtpNotice("");

    sendAppointmentOtpRequest({
      phone: phoneInput.trim(),
      email: emailInput.trim().toLowerCase(),
    })
      .then((response) => {
        setBookingDetails((prev) => ({
          ...prev,
          phone: phoneInput.trim(),
          email: emailInput.trim().toLowerCase(),
        }));
        setOtpNotice(response.message || "OTP sent to your email.");
        setModal("otp");
      })
      .catch((error) => {
        setErrorMessage(
          error?.response?.data?.message || "Unable to send OTP. Please try again."
        );
      })
      .finally(() => {
        setIsOtpSending(false);
      });
  };

  const submitOtp = (event) => {
    event.preventDefault();

    if (otpInput.trim().length < 4) {
      setErrorMessage("Enter the OTP to continue.");
      return;
    }

    setIsOtpVerifying(true);
    setErrorMessage("");

    verifyAppointmentOtpRequest({
      email: bookingDetails.email || emailInput.trim().toLowerCase(),
      otp: otpInput.trim(),
    })
      .then((response) => {
        setOtpNotice(response.message || "OTP verified successfully.");
        setModal(null);
        setStep("details");
      })
      .catch((error) => {
        setErrorMessage(
          error?.response?.data?.message || "Unable to verify OTP. Please try again."
        );
      })
      .finally(() => {
        setIsOtpVerifying(false);
      });
  };

  const continueToReview = (event) => {
    event.preventDefault();

    if (!validateDetails()) {
      return;
    }

    setStep("review");
  };

  const confirmBooking = async () => {
    if (!termsAccepted) {
      setErrorMessage("Please accept the terms and conditions.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await bookAppointment({
        name: `${bookingDetails.firstName} ${bookingDetails.lastName}`.trim(),
        phone: bookingDetails.phone.trim(),
        email: bookingDetails.email.trim(),
        clinic: selectedClinicDetails.label,
        clinicAddress: selectedClinicDetails.address,
        doctor: doctorProfile.name,
        service: bookingDetails.service,
        date: appointmentApiDate,
        time: selectedTime,
        dob: bookingDetails.dob,
        gender: bookingDetails.gender,
        notes: bookingDetails.notes.trim(),
      });

      setStatusMessage("Appointment booked successfully. We will contact you shortly.");
      setStep("success");
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Appointment booking failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="px-3 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
      style={{
        backgroundImage: "linear-gradient(180deg, #fff7fb 0%, #fff4f8 34%, #eef7ff 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 overflow-hidden rounded-[10px] border border-rose-100 bg-white shadow-card md:hidden">
          <div className="flex items-start gap-3 px-3 py-3">
            <img
              src={doctorProfile.image}
              alt={doctorProfile.name}
              className="h-20 w-20 shrink-0 rounded-[10px] object-cover"
            />
            <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-700">
              {doctorProfile.registration}
            </p>
            <h1 className="mt-1 break-words text-lg font-black leading-tight text-slate-950">
              {doctorProfile.name}
            </h1>
            <p className="mt-1 text-xs leading-5 text-slate-600">{doctorProfile.specialty}</p>
            </div>
          </div>
        </div>

        <div className="hidden items-stretch gap-4 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-[1fr_0.95fr]">
          <div className="flex min-h-[340px] flex-col justify-center">
            <div className="min-w-0">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-rose-700">
                {doctorProfile.registration}
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                {doctorProfile.name}
              </h1>
              <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-700">
                {doctorProfile.specialty}
              </p>

              <div className="mt-5 space-y-3 text-[15px] leading-7 text-slate-700">
                <p>
                  <span className="font-black text-slate-950">Experience:</span>{" "}
                  {doctorProfile.experience}
                </p>
                <p>
                  <span className="font-black text-slate-950">Education:</span>{" "}
                  {doctorProfile.education}
                </p>
                <p>
                  <span className="font-black text-slate-950">Languages:</span>{" "}
                  {doctorProfile.languages.join(" | ")}
                </p>
                <p>
                  <span className="font-black text-slate-950">Consultation:</span>{" "}
                  {doctorProfile.timing}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {concernOptions.map((concern) => (
                  <button
                    key={concern}
                    type="button"
                    onClick={() =>
                      setBookingDetails((prev) => ({ ...prev, service: concern }))
                    }
                    className={`rounded-[10px] border px-4 py-2 text-sm font-bold transition ${
                      bookingDetails.service === concern
                        ? "border-[#8f355f] bg-[#8f355f] text-white"
                        : "border-[#d9a5bc] bg-white text-[#8f355f] hover:border-[#8f355f] hover:bg-[#fff7fa]"
                    }`}
                  >
                    {concern}
                  </button>
                ))}
              </div>

              <div className="mt-5 space-y-2.5">
                {[
                  "Focused care for acute and chronic concerns",
                  "Lifestyle and wellness guidance as part of treatment",
                  "Follow-up support for recurring symptom patterns",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[15px] text-slate-700">
                    <span className="h-2.5 w-2.5 rounded-[4px] bg-primary" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="min-h-[340px] h-full md:order-2">
            <img
              src={doctorProfile.image}
              alt={doctorProfile.name}
              className="h-full min-h-[320px] w-full rounded-[10px] object-cover shadow-card"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:mt-8 lg:gap-6 lg:grid-cols-[minmax(0,1.1fr)_480px]">
          <BookingWidget
            clinicOptions={clinicOptions}
            selectedClinic={selectedClinic}
            setSelectedClinic={setSelectedClinic}
            dateOptions={dateOptions}
            selectedDateIndex={selectedDateIndex}
            setSelectedDateIndex={setSelectedDateIndex}
            setSelectedTime={setSelectedTime}
          slots={slots}
          selectedTime={selectedTime}
          startLoginFlow={startLoginFlow}
          openCallModal={() => {
            setCallNotice("");
            setModal("call");
          }}
          errorMessage={errorMessage}
          selectedClinicDetails={selectedClinicDetails}
        />

          <SummaryCard
            appointmentDate={appointmentDate}
            appointmentTime={appointmentTime}
            location={selectedClinicDetails.address}
          />
        </div>

        <div className="mt-4 grid gap-4 sm:mt-8 sm:gap-6">
          <div className="rounded-[10px] border border-rose-100 bg-white p-4 text-slate-950 shadow-[0_18px_65px_rgba(148,32,91,0.08)] sm:p-7">
            {step === "select" && (
              <>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-rose-700">
                  Booking Flow
                </p>
                <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950 sm:text-4xl">
                  Select your clinic, choose a slot, then continue with quick verification.
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:mt-4 sm:text-lg sm:leading-relaxed">
                  This flow keeps appointment booking simple for mobile and desktop visitors.
                  After slot selection, we verify the mobile number, collect patient details,
                  then show one clean review step before final booking.
                </p>
                <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 sm:grid-cols-3">
                  {[
                    ["1", "Select clinic and date"],
                    ["2", "Verify mobile number"],
                    ["3", "Fill details and review"],
                  ].map(([index, text]) => (
                    <div key={index} className="rounded-[10px] bg-rose-50 p-4">
                      <span className="text-sm font-bold uppercase tracking-[0.24em] text-rose-700">
                        Step {index}
                      </span>
                      <p className="mt-2 text-base font-black text-slate-950 sm:text-lg">{text}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {step === "details" && (
              <form onSubmit={continueToReview}>
                <h2 className="text-3xl font-black text-slate-950">User Details</h2>
                <p className="mt-3 text-base text-slate-500">
                  Fill the patient information below. We use this to confirm your appointment.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="First Name">
                    <input
                      type="text"
                      value={bookingDetails.firstName}
                      onChange={(event) =>
                        setBookingDetails((prev) => ({
                          ...prev,
                          firstName: event.target.value,
                        }))
                      }
                      className={inputClasses(formErrors.firstName)}
                      placeholder="First name"
                    />
                  </Field>

                  <Field label="Last Name">
                    <input
                      type="text"
                      value={bookingDetails.lastName}
                      onChange={(event) =>
                        setBookingDetails((prev) => ({
                          ...prev,
                          lastName: event.target.value,
                        }))
                      }
                      className={inputClasses(false)}
                      placeholder="Last name"
                    />
                  </Field>

                  <Field label="Phone No">
                    <input
                      type="tel"
                      value={bookingDetails.phone}
                      readOnly
                      onChange={(event) =>
                        setBookingDetails((prev) => ({
                          ...prev,
                          phone: event.target.value.replace(/\D/g, "").slice(0, 10),
                        }))
                      }
                      className={`${inputClasses(formErrors.phone)} bg-slate-50`}
                      placeholder="10 digit mobile number"
                    />
                  </Field>

                  <Field label="Email Id">
                    <input
                      type="email"
                      value={bookingDetails.email}
                      readOnly
                      onChange={(event) =>
                        setBookingDetails((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                      className={`${inputClasses(formErrors.email)} bg-slate-50`}
                      placeholder="Enter email"
                    />
                  </Field>

                  <Field label="Date of Birth">
                    <input
                      type="date"
                      value={bookingDetails.dob}
                      onChange={(event) =>
                        setBookingDetails((prev) => ({
                          ...prev,
                          dob: event.target.value,
                        }))
                      }
                      className={inputClasses(formErrors.dob)}
                    />
                  </Field>

                  <Field label="Concern / Service">
                    <select
                      value={bookingDetails.service}
                      onChange={(event) =>
                        setBookingDetails((prev) => ({
                          ...prev,
                          service: event.target.value,
                        }))
                      }
                      className={inputClasses(false)}
                    >
                      {concernOptions.map((concern) => (
                        <option key={concern} value={concern}>
                          {concern}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Gender">
                    <div className="flex h-[54px] items-center gap-5 rounded-[10px] border border-slate-200 px-4">
                      {["Male", "Female", "Other"].map((gender) => (
                        <label
                          key={gender}
                          className="inline-flex items-center gap-2 text-sm font-bold text-slate-700"
                        >
                          <input
                            type="radio"
                            name="gender"
                            checked={bookingDetails.gender === gender}
                            onChange={() =>
                              setBookingDetails((prev) => ({
                                ...prev,
                                gender,
                              }))
                            }
                          />
                          {gender}
                        </label>
                      ))}
                    </div>
                  </Field>
                </div>

                <div className="mt-4">
                  <Field label="Notes">
                    <textarea
                      value={bookingDetails.notes}
                      onChange={(event) =>
                        setBookingDetails((prev) => ({
                          ...prev,
                          notes: event.target.value,
                        }))
                      }
                      rows={4}
                      className={inputClasses(false)}
                      placeholder="Symptoms or follow-up details"
                    />
                  </Field>
                </div>

                {Object.keys(formErrors).length ? (
                  <p className="mt-4 rounded-[10px] bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                    Please complete the required fields before continuing.
                  </p>
                ) : null}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setStep("select")}
                    className="rounded-[10px] border-2 border-slate-900 px-6 py-3 text-base font-black text-slate-950 transition hover:bg-slate-900 hover:text-white"
                  >
                    Go Back
                  </button>
                  <button
                    type="submit"
                    className="rounded-[10px] bg-[#8f355f] px-7 py-3 text-base font-black text-white transition hover:bg-[#a94672]"
                  >
                    Continue To Review
                  </button>
                </div>
              </form>
            )}

            {step === "review" && (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-3xl font-black text-slate-950">Appointment Details</h2>
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="text-base font-black text-[#8f355f] hover:text-[#a94672]"
                  >
                    Edit
                  </button>
                </div>

                <div className="mt-6 rounded-[10px] border border-slate-200 p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
                    User Details
                  </p>
                  <div className="mt-4 space-y-2 text-lg text-slate-700">
                    <p className="font-black text-slate-950">
                      {`${bookingDetails.firstName} ${bookingDetails.lastName}`.trim()}
                    </p>
                    <p>Phone: {bookingDetails.phone}</p>
                    <p>Email: {bookingDetails.email}</p>
                    <p>Concern: {bookingDetails.service}</p>
                  </div>
                </div>

                <label className="mt-6 flex items-start gap-3 rounded-[10px] bg-slate-50 px-4 py-4">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(event) => setTermsAccepted(event.target.checked)}
                    className="mt-1 h-4 w-4"
                  />
                  <span className="text-base leading-relaxed text-slate-700">
                    I agree to the{" "}
                    <Link className="font-bold text-[#8f355f] underline" to="/terms-conditions">
                      Terms & Conditions
                    </Link>
                    .
                  </span>
                </label>

                {errorMessage ? (
                  <p className="mt-4 rounded-[10px] bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                    {errorMessage}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="rounded-[10px] border-2 border-slate-900 px-6 py-3 text-base font-black text-slate-950 transition hover:bg-slate-900 hover:text-white"
                  >
                    Go Back
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={confirmBooking}
                    className="rounded-[10px] bg-[#8f355f] px-8 py-3 text-base font-black text-white transition hover:bg-[#a94672] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Booking..." : "Proceed"}
                  </button>
                </div>
              </div>
            )}

            {step === "success" && (
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8f355f]">
                  Appointment Confirmed
                </p>
                <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950">
                  Your appointment request has been submitted successfully.
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">{statusMessage}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[10px] bg-rose-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8f355f]">
                      Date
                    </p>
                    <p className="mt-2 text-xl font-black text-slate-950">{appointmentDate}</p>
                  </div>
                  <div className="rounded-[10px] bg-rose-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8f355f]">
                      Slot
                    </p>
                    <p className="mt-2 text-xl font-black text-slate-950">{selectedTime}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/"
                    className="rounded-[10px] bg-[#8f355f] px-7 py-3 text-center text-base font-black text-white transition hover:bg-[#a94672]"
                  >
                    Back To Home
                  </Link>
                  <Link
                    to="/contact"
                    className="rounded-[10px] border-2 border-slate-900 px-7 py-3 text-center text-base font-black text-slate-950 transition hover:bg-slate-900 hover:text-white"
                  >
                    Contact Clinic
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {modal === "phone" ? (
        <AppointmentModal title="Hello, Guest!" onClose={() => setModal(null)}>
          <form onSubmit={submitPhone}>
            <p className="mb-5 text-lg text-slate-700">
              Verify your booking with mobile number and email OTP.
            </p>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">Mobile Number</span>
              <div className="flex overflow-hidden rounded-[10px] border border-slate-200 focus-within:border-rose-400 focus-within:ring-4 focus-within:ring-rose-100">
                <span className="grid place-items-center bg-slate-50 px-4 text-lg font-black text-slate-700">
                  +91
                </span>
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(event) =>
                    setPhoneInput(event.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  className="w-full px-4 py-3 text-lg font-medium text-slate-950 outline-none"
                  placeholder="Enter mobile number"
                />
              </div>
            </label>

            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-bold text-slate-700">Email Address</span>
              <input
                type="email"
                value={emailInput}
                onChange={(event) => setEmailInput(event.target.value)}
                className="w-full rounded-[10px] border border-slate-200 px-4 py-3 text-lg font-medium text-slate-950 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                placeholder="Enter email address"
              />
            </label>

            {errorMessage ? (
              <p className="mt-4 rounded-[10px] bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {errorMessage}
              </p>
            ) : null}

            {otpNotice ? (
              <p className="mt-4 rounded-[10px] bg-rose-50 px-4 py-3 text-sm font-bold text-[#8f355f]">
                {otpNotice}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isOtpSending}
              className="mt-6 w-full rounded-[10px] bg-[#8f355f] px-6 py-4 text-lg font-black text-white transition hover:bg-[#a94672]"
            >
              {isOtpSending ? "Sending OTP..." : "Send OTP"}
            </button>

            <button
              type="button"
              onClick={() => setModal(null)}
              className="mt-5 block w-full text-center text-base font-black text-[#8f355f]"
            >
              Go Back
            </button>
          </form>
        </AppointmentModal>
      ) : null}

      {modal === "call" ? (
        <AppointmentModal title="Call Clinic" onClose={() => setModal(null)}>
          <div className="space-y-5">
            <div className="rounded-[10px] border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                Clinic Number
              </p>
              <p className="mt-2 text-2xl font-black text-slate-950">
                {selectedClinicDetails.callNumber}
              </p>
            </div>

            {callNotice ? (
              <p className="rounded-[10px] bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
                {callNotice}
              </p>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={callLink}
                className="rounded-[10px] bg-[#8f355f] px-5 py-3 text-center text-base font-black text-white transition hover:bg-[#a94672]"
              >
                Call Now
              </a>
              <button
                type="button"
                onClick={copyCallNumber}
                className="rounded-[10px] border border-[#d9a5bc] bg-[#fff7fa] px-5 py-3 text-base font-black text-[#8f355f] transition hover:bg-[#fdeef5]"
              >
                Copy Number
              </button>
            </div>
          </div>
        </AppointmentModal>
      ) : null}

      {modal === "otp" ? (
        <AppointmentModal title="Enter OTP" onClose={() => setModal(null)}>
          <form onSubmit={submitOtp}>
            <p className="mb-5 text-base text-slate-600">
              OTP has been sent to{" "}
              <span className="font-black text-slate-950">
                {bookingDetails.email || emailInput.trim().toLowerCase()}
              </span>
              .
            </p>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">OTP</span>
              <input
                type="text"
                value={otpInput}
                onChange={(event) => setOtpInput(event.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full rounded-[10px] border border-slate-200 px-4 py-3 text-center text-xl font-bold tracking-[0.3em] text-slate-950 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                placeholder="1234"
              />
            </label>

            {errorMessage ? (
              <p className="mt-4 rounded-[10px] bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {errorMessage}
              </p>
            ) : null}

            {otpNotice ? (
              <p className="mt-4 rounded-[10px] bg-rose-50 px-4 py-3 text-sm font-bold text-[#8f355f]">
                {otpNotice}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isOtpVerifying}
              className="mt-6 w-full rounded-[10px] bg-[#8f355f] px-6 py-4 text-lg font-black text-white transition hover:bg-[#a94672]"
            >
              {isOtpVerifying ? "Verifying..." : "Verify"}
            </button>

            <div className="mt-5 border-t border-slate-100 pt-5 text-center">
              <p className="text-base text-slate-600">
                If you didn't receive a code,{" "}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage("");
                    setOtpNotice("");
                    sendAppointmentOtpRequest({
                      phone: bookingDetails.phone || phoneInput.trim(),
                      email: bookingDetails.email || emailInput.trim().toLowerCase(),
                    })
                      .then((response) => {
                        setOtpInput("");
                        setOtpNotice(response.message || "OTP resent successfully.");
                      })
                      .catch((error) => {
                        setErrorMessage(
                          error?.response?.data?.message || "Unable to resend OTP."
                        );
                      });
                  }}
                  className="font-black text-[#8f355f]"
                >
                  Resend
                </button>
              </p>
              <button
                type="button"
                onClick={() => setModal("phone")}
                className="mt-4 text-base font-black text-[#8f355f]"
              >
                Go Back
              </button>
            </div>
          </form>
        </AppointmentModal>
      ) : null}
    </section>
  );
}
