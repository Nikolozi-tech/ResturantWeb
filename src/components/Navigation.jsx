import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CalendarCheck, Clock3, ConciergeBell, MapPin, Menu, Phone, Utensils, X } from "lucide-react";
import LanguageToggle from "./LanguageToggle.jsx";
import { useLanguage } from "../context/LanguageContext.js";

const publicLinks = [
  { to: "/", label: { ge: "მენიუ", en: "Menu" }, display: "მენიუ / Menu", icon: Utensils },
  { to: "/book", label: { ge: "ჯავშანი", en: "Book Table" }, display: "ჯავშანი / Book Table", icon: CalendarCheck },
];

export default function Navigation() {
  const { language } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-slate-950 py-2 text-xs text-white">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6">
          <a
            href="tel:+9955XXXXXXXX"
            className="inline-flex items-center gap-2 text-white/80 transition-all duration-300 ease-in-out hover:text-amber-300"
          >
            <Phone size={14} />
            +995 5XX XX XX XX
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Tbilisi"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 text-white/80 transition-all duration-300 ease-in-out hover:text-amber-300 sm:inline-flex"
          >
            <MapPin size={14} />
            თბილისი
          </a>
          <span className="hidden items-center gap-2 text-white/80 md:inline-flex">
            <Clock3 size={14} />
            12:00 - 23:00
          </span>
        </div>
      </div>

      <div className="border-b border-neutral-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-3xl border border-amber-200 bg-amber-50 text-amber-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <ConciergeBell size={20} />
            </span>
            <span>
              <span className="block text-xl font-black tracking-tight text-slate-950">მარაკანა</span>
              <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 sm:block">
                Modern Georgian Bistro
              </span>
            </span>
          </NavLink>

          <nav className="hidden items-center gap-8 md:flex">
            {publicLinks.map(({ to, display, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  [
                    "group relative inline-flex items-center gap-2 py-2 text-sm font-semibold transition-all duration-300 ease-in-out",
                    isActive ? "text-amber-600" : "text-slate-600 hover:text-amber-600",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={16} />
                    {display}
                    <span
                      className={[
                        "absolute -bottom-1 left-0 h-0.5 rounded-full bg-amber-600 transition-all duration-300 ease-in-out",
                        isActive ? "w-full" : "w-0 group-hover:w-full",
                      ].join(" ")}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageToggle compact />
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-3xl border border-neutral-200 bg-white text-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-amber-200 hover:text-amber-700 md:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={[
          "fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-sm transition-all duration-300 ease-in-out md:hidden",
          drawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setDrawerOpen(false)}
      >
        <aside
          className={[
            "absolute right-3 top-3 w-[min(22rem,calc(100vw-1.5rem))] rounded-3xl border border-neutral-100 bg-white p-4 shadow-2xl transition-all duration-300 ease-in-out",
            drawerOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
          ].join(" ")}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">მარაკანა</p>
              <p className="text-lg font-black text-slate-950">Navigation</p>
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-2xl border border-neutral-200 text-slate-600 transition-all duration-300 ease-in-out hover:border-amber-200 hover:text-amber-700"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="grid gap-2">
            {publicLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setDrawerOpen(false)}
                className={({ isActive }) =>
                  [
                    "flex items-center justify-between rounded-3xl border px-4 py-4 text-sm font-bold transition-all duration-300 ease-in-out",
                    isActive
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : "border-neutral-100 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700",
                  ].join(" ")
                }
              >
                <span className="inline-flex items-center gap-3">
                  <Icon size={18} />
                  {label[language]}
                </span>
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
    </header>
  );
}
