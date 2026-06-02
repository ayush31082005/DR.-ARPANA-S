import { Mail, MapPin, Phone, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-0 bg-[#8f355f] py-14 text-rose-100">
      <div className="container-padded">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="Dr. Arpana's Homeo Care"
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="text-3xl font-bold text-white">DR. ARPANA'S</h3>
            </div>

            <p className="mt-6 max-w-sm text-[15px] leading-8 text-rose-100/85">
              Compassionate homeopathic consultation, chronic care guidance, and follow-up support
              for patients in Sahibabad, Ghaziabad.
            </p>

            <div className="mt-6 space-y-3 text-[15px] text-rose-100/85">
              <p className="flex items-center gap-3">
                <MapPin size={16} className="text-[#fff7fa]" />
                <span>Lajpat Nagar, Sector 4, Sahibabad, Ghaziabad</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone size={16} className="text-[#fff7fa]" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail size={16} className="text-[#fff8fb]" />
                <span>care@drarpanahomeocare.com</span>
              </p>
            </div>
          </div>

          <div>
            <div>
              <h4 className="text-2xl font-bold text-white">Quick Links</h4>
              <div className="mt-6 flex flex-col gap-3 text-[15px]">
                <Link to="/" className="transition hover:text-white">Home</Link>
                <Link to="/about" className="transition hover:text-white">About Us</Link>
                <Link to="/services" className="transition hover:text-white">Services</Link>
                <Link to="/appointment" className="transition hover:text-white">Book Appointment</Link>
                <Link to="/faq" className="transition hover:text-white">FAQ</Link>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-2xl font-bold text-white">Clinic Timings</h4>
            <div className="mt-6 space-y-3 text-[15px]">
              <div className="flex items-center justify-between gap-4">
                <span className="text-rose-100/85">Mon - Sun</span>
                <span className="font-semibold text-white">11:00 AM - 9:00 PM</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-rose-100/85">Consultation Mode</span>
                <span className="font-semibold text-white">In-clinic & Follow-up</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-rose-100/85">Booking</span>
                <span className="font-semibold text-white">Prior Appointment</span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#e4b5ca] bg-[#a94672] px-4 py-4">
              <div className="flex items-start gap-3">
                <ShieldAlert size={18} className="mt-0.5 text-[#fff8fb]" />
                <div className="text-sm leading-6 text-rose-50">
                  <p className="font-semibold text-white">Consultation Support</p>
                  <p>Call for appointment booking, follow-up guidance, and clinic assistance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6">
          <div className="flex items-center justify-center">
            <p className="text-center text-base font-semibold text-white sm:text-lg">
              {"\u00A9 2025 DR. ARPANA'S. All rights reserved."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

