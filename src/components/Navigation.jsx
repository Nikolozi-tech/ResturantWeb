import { NavLink } from "react-router-dom";
import { CalendarCheck, Gauge, Goal, QrCode, Trophy } from "lucide-react";
import LanguageToggle from "./LanguageToggle.jsx";
import { useMenu } from "../context/MenuContext.js";

const navItems = [
  { to: "/menu", label: { ge: "მენიუ", en: "Menu" }, icon: QrCode },
  { to: "/book", label: { ge: "დაჯავშნა", en: "Book" }, icon: CalendarCheck },
  { to: "/admin", label: { ge: "ადმინი", en: "Admin" }, icon: Gauge },
];

export default function Navigation() {
  const { language } = useMenu();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-amber-500/20 bg-neutral-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <NavLink to="/menu" className="group flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-500/30 bg-neutral-900/80 text-green-500 shadow-lg shadow-green-500/10 transition group-hover:border-green-500/50">
              <Trophy size={21} />
            </span>
            <span>
              <span className="block font-display text-xl font-black tracking-wide text-white">მარაკანა</span>
              <span className="hidden text-xs uppercase tracking-[0.35em] text-amber-500 sm:block">
                Stadium Lounge
              </span>
            </span>
          </NavLink>

          <nav className="hidden items-center gap-2 rounded-full border border-amber-500/20 bg-neutral-900/70 p-1 backdrop-blur-md md:flex">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition duration-300",
                    isActive
                      ? "bg-green-500 text-neutral-950 shadow-lg shadow-green-500/20"
                      : "text-white/65 hover:bg-white/10 hover:text-white",
                  ].join(" ")
                }
              >
                <Icon size={16} />
                {label[language]}
              </NavLink>
            ))}
          </nav>

          <LanguageToggle />
        </div>
      </header>

      <nav className="fixed bottom-4 left-4 right-4 z-50 rounded-[2rem] border border-amber-500/30 bg-neutral-900/80 p-2 shadow-2xl shadow-black/60 backdrop-blur-md md:hidden">
        <div className="grid grid-cols-3 gap-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "flex flex-col items-center justify-center gap-1 rounded-3xl px-2 py-3 text-[11px] font-black transition duration-300",
                  isActive
                    ? "bg-green-500 text-neutral-950 shadow-lg shadow-green-500/25"
                    : "text-white/60 hover:bg-white/10 hover:text-white",
                ].join(" ")
              }
            >
              <Icon size={19} />
              <span>{label[language]}</span>
            </NavLink>
          ))}
        </div>
        <Goal className="pointer-events-none absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-neutral-950 p-1 text-amber-500" />
      </nav>
    </>
  );
}
