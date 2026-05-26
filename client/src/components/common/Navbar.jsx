import { useEffect, useState } from "react";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../../data/navLinks";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import Button from "./Button";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const dashboardPath = user?.role === "admin" ? "/admin" : "/user-dashboard";
  const userDisplayName = user?.name?.trim() || "My Account";
  const isAuthPage = ["/login", "/register", "/forgot-password"].includes(
    location.pathname
  );
  const navActiveClass = "text-[#35690d]";
  const navIdleClass = "text-slate-800 hover:text-[#35690d]";
  const accountButtonClass =
    "hidden items-center gap-2 rounded-2xl border border-[#35690d] bg-[#4f8f16] px-4 py-3 text-white transition hover:bg-[#3f7810] sm:flex";
  const cartButtonClass =
    "relative rounded-2xl border border-[#35690d] bg-[#4f8f16] p-3 text-white hover:bg-[#3f7810]";
  const mobileMenuButtonClass =
    "rounded-2xl border border-[#35690d] bg-[#4f8f16] p-3 text-white xl:hidden";
  const mobileNavActiveClass = "bg-[#c9f58e] text-[#35690d]";
  const mobileNavIdleClass =
    "text-slate-800 hover:bg-[#dff8bf] hover:text-[#35690d]";
  const mobileAccountClass =
    "rounded-2xl px-4 py-3 text-sm font-medium text-[#35690d] transition hover:bg-[#dff8bf] hover:text-[#35690d]";
  const prescriptionsButtonClass = "bg-[#35690d] text-white hover:bg-[#2d590a]";
  const headerClass =
    "fixed inset-x-0 top-0 z-50 w-full border-b border-[#6dd414] bg-[#7BEA18]/95 backdrop-blur-xl xl:top-8";
  const mobilePanelClass =
    "container-padded border-t border-[#6dd414] bg-[#7BEA18] py-4 xl:hidden";

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={headerClass}>
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
              className={({ isActive }) => `text-sm font-medium ${isActive ? navActiveClass : navIdleClass}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {!isAuthPage ? (
            <Link
              to={isAuthenticated ? dashboardPath : "/login"}
              className={accountButtonClass}
            >
              <User size={18} />
              <span className="max-w-[140px] truncate text-sm font-medium">
                {isAuthenticated ? userDisplayName : "Login"}
              </span>
            </Link>
          ) : null}
          <Link to="/cart" className={cartButtonClass}>
            <ShoppingCart size={18} />
            {totalItems ? (
              <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-white">
                {totalItems}
              </span>
            ) : null}
          </Link>
          <Link to="/my-prescriptions" className="hidden md:block">
            <Button className={prescriptionsButtonClass}>My Prescriptions</Button>
          </Link>
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className={mobileMenuButtonClass}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className={mobilePanelClass}>
          <nav className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive
                    ? mobileNavActiveClass
                    : mobileNavIdleClass
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {!isAuthPage ? (
              <Link
                to={isAuthenticated ? dashboardPath : "/login"}
                className={mobileAccountClass}
              >
                {isAuthenticated ? userDisplayName : "Login"}
              </Link>
            ) : null}
            <Link to="/my-prescriptions" className="pt-2">
              <Button className={`w-full ${prescriptionsButtonClass}`}>My Prescriptions</Button>
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
