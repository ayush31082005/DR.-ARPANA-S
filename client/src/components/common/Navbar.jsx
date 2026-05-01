import { useEffect, useState } from "react";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../../data/navLinks";
import useCart from "../../hooks/useCart";
import Button from "./Button";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl xl:top-8">
      <div className="container-padded flex h-[72px] items-center justify-between gap-3 sm:h-20 sm:gap-4">
        <Link to="/" className="flex shrink-0 items-center">
          <img
            src="/images/logo.png"
            alt="Dr. Arpana's Homeo Care"
            className="h-12 w-auto object-contain sm:h-[72px]"
          />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `text-sm font-medium ${isActive ? "text-primary" : "text-slate-700 hover:text-primary"}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link to="/login" className="hidden rounded-2xl border border-slate-300 bg-white p-3 text-slate-700 hover:border-primary hover:text-primary sm:block">
            <User size={18} />
          </Link>
          <Link to="/cart" className="relative rounded-2xl border border-slate-300 bg-white p-3 text-slate-700 hover:border-primary hover:text-primary">
            <ShoppingCart size={18} />
            {totalItems ? (
              <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-white">
                {totalItems}
              </span>
            ) : null}
          </Link>
          <Link to="/my-prescriptions" className="hidden md:block">
            <Button>My Prescriptions</Button>
          </Link>
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="rounded-2xl border border-slate-300 bg-white p-3 xl:hidden"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="container-padded border-t border-slate-200 bg-white py-4 xl:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-700 hover:bg-slate-100 hover:text-primary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/login"
              className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-primary"
            >
              Login
            </Link>
            <Link to="/my-prescriptions" className="pt-2">
              <Button className="w-full">My Prescriptions</Button>
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
