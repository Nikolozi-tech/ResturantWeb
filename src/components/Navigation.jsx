import { Link, NavLink } from "react-router-dom";
import { CalendarCheck, LayoutDashboard, QrCode, Utensils } from "lucide-react";

const navItems = [
  { to: "/menu", label: "QR Menu", icon: QrCode },
  { to: "/book", label: "Book", icon: CalendarCheck },
  { to: "/admin", label: "Admin", icon: LayoutDashboard },
];

export default function Navigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/menu" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-amber-300/30 bg-amber-400/10 text-amber-200 shadow-glow">
            <Utensils size={20} />
          </span>
          <div>
            <p className="font-display text-lg font-semibold tracking-wide text-amber-100">
              Supra House
            </p>
            <p className="hidden text-xs uppercase tracking-[0.3em] text-white/45 sm:block">
              Georgian Dining
            </p>
          </div>
        </Link>

        <nav className="flex rounded-full border border-white/10 bg-white/[0.04] p-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition sm:px-4",
                  isActive
                    ? "bg-amber-300 text-black"
                    : "text-white/70 hover:bg-white/10 hover:text-white",
                ].join(" ")
              }
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
