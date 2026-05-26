import { useMemo, useState } from "react";
import {
  CalendarCheck,
  ChefHat,
  ClipboardList,
  LockKeyhole,
  LogIn,
  ShieldCheck,
  Users,
  Wine,
} from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import StockToggle from "../components/StockToggle";
import { useRestaurant } from "../context/RestaurantContext";

const statusActions = ["Confirmed", "Seated", "Cancelled"];

export default function AdminView() {
  const { bookings, inventory, toggleItemStock, updateBookingStatus } = useRestaurant();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");

  const stats = useMemo(
    () => [
      {
        label: "Reservations",
        value: bookings.length,
        icon: CalendarCheck,
        detail: `${bookings.filter((booking) => booking.status === "Pending").length} pending`,
      },
      {
        label: "Guests Expected",
        value: bookings
          .filter((booking) => booking.status !== "Cancelled")
          .reduce((sum, booking) => sum + booking.guests, 0),
        icon: Users,
        detail: "Across active bookings",
      },
      {
        label: "Menu Live",
        value: `${inventory.filter((item) => item.inStock).length}/${inventory.length}`,
        icon: ChefHat,
        detail: "Items currently in stock",
      },
    ],
    [bookings, inventory],
  );

  const submitPasscode = (event) => {
    event.preventDefault();
    if (passcode.trim().toLowerCase() === "supra2026") {
      setIsUnlocked(true);
    }
  };

  if (!isUnlocked) {
    return (
      <main className="grid min-h-[calc(100vh-73px)] place-items-center px-4 py-10">
        <section className="w-full max-w-md rounded-[2rem] border border-amber-200/15 bg-white/[0.05] p-6 shadow-glow">
          <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-amber-300 text-black">
            <LockKeyhole size={26} />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-200">
            Secure staff access
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-white">
            Unlock daily operations.
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/58">
            Demo passcode: <span className="font-semibold text-amber-100">supra2026</span>
          </p>
          <form onSubmit={submitPasscode} className="mt-6 space-y-4">
            <input
              value={passcode}
              onChange={(event) => setPasscode(event.target.value)}
              placeholder="Enter staff passcode"
              className="field-input"
              type="password"
            />
            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-300 px-5 py-3 font-black text-black transition hover:bg-amber-200">
              <LogIn size={18} />
              Enter Dashboard
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[#090909] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/30">
          <div className="bg-[radial-gradient(circle_at_top_left,rgba(214,161,61,0.28),transparent_34%),linear-gradient(135deg,#171717,#080808)] p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em] text-amber-200">
                  <ShieldCheck size={15} />
                  Staff Administrative Dashboard
                </p>
                <h1 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
                  Tonight's service control room.
                </h1>
                <p className="mt-4 max-w-2xl text-white/62">
                  Manage reservation flow and menu availability from one responsive dashboard. Inventory toggles update the customer QR menu immediately.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsUnlocked(false)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                Lock dashboard
              </button>
            </div>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-3 sm:p-6">
            {stats.map(({ label, value, icon: Icon, detail }) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <Icon className="text-amber-200" />
                  <span className="text-xs text-white/35">{detail}</span>
                </div>
                <p className="text-sm text-white/50">{label}</p>
                <p className="mt-1 font-display text-4xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/25 sm:p-6">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-200">
                  <ClipboardList size={14} />
                  Booking Manager
                </p>
                <h2 className="mt-2 font-display text-3xl text-white">Incoming reservations</h2>
              </div>
              <span className="rounded-full bg-amber-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-100">
                Live table
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[760px] w-full border-separate border-spacing-y-3 text-left">
                <thead>
                  <tr className="text-xs uppercase tracking-[0.22em] text-white/38">
                    <th className="px-4">Guest</th>
                    <th className="px-4">Date</th>
                    <th className="px-4">Time</th>
                    <th className="px-4">Guests</th>
                    <th className="px-4">Status</th>
                    <th className="px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="rounded-3xl bg-black/35 text-sm">
                      <td className="rounded-l-3xl px-4 py-4">
                        <p className="font-semibold text-white">{booking.name}</p>
                        <p className="mt-1 text-xs text-white/45">{booking.phone}</p>
                      </td>
                      <td className="px-4 py-4 text-white/70">{booking.date}</td>
                      <td className="px-4 py-4 text-white/70">{booking.time}</td>
                      <td className="px-4 py-4 text-white/70">{booking.guests}</td>
                      <td className="px-4 py-4">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="rounded-r-3xl px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          {statusActions.map((status) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => updateBookingStatus(booking.id, status)}
                              className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/65 transition hover:border-amber-200/50 hover:text-white"
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/25 sm:p-6">
            <div className="mb-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-200">
                <Wine size={14} />
                Menu Inventory Tweak
              </p>
              <h2 className="mt-2 font-display text-3xl text-white">QR menu availability</h2>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Toggle any dish to immediately change the out-of-stock overlay in the customer menu.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {inventory.map((item) => (
                <article
                  key={item.id}
                  className="flex items-center gap-4 rounded-3xl border border-white/10 bg-black/35 p-4"
                >
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${item.imageTone}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-white">{item.name.en}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/35">
                      {item.category} · ₾{item.price}
                    </p>
                    <p
                      className={[
                        "mt-2 text-xs font-bold",
                        item.inStock ? "text-emerald-200" : "text-red-200",
                      ].join(" ")}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                  <StockToggle
                    enabled={item.inStock}
                    onChange={() => toggleItemStock(item.id)}
                    label={`Toggle ${item.name.en} stock`}
                  />
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
