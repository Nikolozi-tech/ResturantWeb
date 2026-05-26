import { NavLink } from "react-router-dom";
import { CalendarCheck, Home, Menu, Sparkles } from "lucide-react";
import LanguageToggle from "./LanguageToggle.jsx";
import { useMenu } from "../context/MenuContext.js";

const publicLinks = [
  { to: "/menu", label: { ge: "მენიუ", en: "Menu" }, icon: Menu },
  { to: "/book", label: { ge: "დაჯავშნა", en: "Book" }, icon: CalendarCheck },
];

export default function Navigation() {
  const { language } = useMenu();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-neutral-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/menu" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-neutral-900 text-white shadow-sm">
              <Sparkles size={20} />
            </span>
            <span>
              <span className="block text-xl font-black tracking-tight text-neutral-950">მარაკანა</span>
              <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500 sm:block">
                Modern Bistro
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
                    isActive ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950",
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

      <nav className="fixed bottom-4 left-4 right-4 z-50 rounded-[1.75rem] border border-neutral-200/70 bg-white/90 p-2 shadow-xl shadow-neutral-900/10 backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-2 gap-2">
          {publicLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold transition-all duration-300",
                  isActive ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-600 hover:bg-neutral-100",
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
