import { NavLink } from "react-router-dom";
import { CalendarCheck, ConciergeBell, Utensils } from "lucide-react";
import LanguageToggle from "./LanguageToggle.jsx";
import { useLanguage } from "../context/LanguageContext.js";

const publicLinks = [
  { to: "/", label: { ge: "მენიუ", en: "Menu" }, icon: Utensils },
  { to: "/book", label: { ge: "დაჯავშნა", en: "Book" }, icon: CalendarCheck },
];

export default function Navigation() {
  const { language } = useLanguage();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-neutral-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-700 shadow-sm">
              <ConciergeBell size={20} />
            </span>
            <span>
              <span className="block text-xl font-black tracking-tight text-slate-950">მარაკანა</span>
              <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 sm:block">
                Modern Georgian Bistro
              </span>
            </span>
          </NavLink>

          <nav className="hidden items-center gap-1 rounded-full border border-neutral-200/70 bg-white p-1 shadow-sm md:flex">
            {publicLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                    isActive ? "bg-amber-600 text-white shadow-sm" : "text-slate-600 hover:bg-amber-50 hover:text-amber-700",
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

      <nav className="fixed bottom-4 left-4 right-4 z-50 rounded-[1.75rem] border border-amber-200/80 bg-white/90 p-2 shadow-xl shadow-slate-900/10 backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-2 gap-2">
          {publicLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold transition-all duration-300",
                  isActive ? "bg-amber-600 text-white shadow-sm" : "text-slate-600 hover:bg-amber-50 hover:text-amber-700",
                ].join(" ")
              }
            >
              <Icon size={18} />
              {label[language]}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
