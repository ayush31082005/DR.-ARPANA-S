import { Mail, MapPin, Phone, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { policyLinks } from "../../data/policyLinks";

export default function Footer() {
  return (
    <footer className="mt-0 bg-slate-950 py-14 text-slate-300">
      <div className="container-padded">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.2fr_1.1fr_1fr]">
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

            <p className="mt-6 max-w-sm text-[15px] leading-8 text-slate-400">
              Your health is our highest priority. We are available for you 24/7.
            </p>

            <div className="mt-6 space-y-3 text-[15px] text-slate-400">
              <p className="flex items-center gap-3">
                <MapPin size={16} className="text-red-400" />
                <span>12, Health Street, Delhi - 110001</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone size={16} className="text-red-400" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail size={16} className="text-slate-200" />
                <span>care@lifeclinic.in</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:gap-10">
            <div>
              <h4 className="text-2xl font-bold text-white">Quick Links</h4>
              <div className="mt-6 flex flex-col gap-3 text-[15px]">
                <Link to="/" className="transition hover:text-white">Home</Link>
                <Link to="/about" className="transition hover:text-white">About Us</Link>
                <Link to="/services" className="transition hover:text-white">Services</Link>
                <Link to="/shop" className="transition hover:text-white">Shop</Link>
                <Link to="/appointment" className="transition hover:text-white">Book Appointment</Link>
              </div>
            </div>

            <div>
              <h4 className="text-2xl font-bold text-white">Our Policy</h4>
              <div className="mt-6 flex flex-col gap-3 text-[15px]">
                {policyLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="transition hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-2xl font-bold text-white">Clinic Timings</h4>
            <div className="mt-6 space-y-3 text-[15px]">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Mon - Fri</span>
                <span className="font-semibold text-white">8am - 8pm</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Saturday</span>
                <span className="font-semibold text-white">9am - 6pm</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Sunday</span>
                <span className="font-semibold text-white">10am - 4pm</span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-700/70 bg-emerald-900/40 px-4 py-4">
              <div className="flex items-start gap-3">
                <ShieldAlert size={18} className="mt-0.5 text-red-400" />
                <div className="text-sm leading-6 text-emerald-200">
                  <p className="font-semibold text-emerald-300">Emergency: 24/7 Available</p>
                  <p>Helpline: 1800-XXX-XXXX</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
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
