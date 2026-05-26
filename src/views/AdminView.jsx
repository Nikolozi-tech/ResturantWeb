import { useMemo } from "react";
import { CalendarCheck, ChefHat, ClipboardList, RadioTower, Settings2, ShieldCheck, UsersRound, Utensils } from "lucide-react";
import StatusBadge from "../components/StatusBadge.jsx";
import StockToggle from "../components/StockToggle.jsx";
import { useMenu } from "../context/MenuContext.js";

const statusActions = ["Confirmed", "Seated", "Cancelled"];

const copy = {
  ge: {
    eyebrow: "პერსონალის პანელი",
    title: "მარაკანას ოპერაციების ცოცხალი კონტროლი.",
    description:
      "მართეთ ჯავშნები, დაადასტურეთ სტუმრები და შეცვალეთ QR მენიუს მარაგი ერთი მაღალი სიზუსტის პანელიდან.",
    bookings: "ჯავშნების მენეჯერი",
    inventory: "ცოცხალი მენიუს მარაგი",
    inventoryText: "ამოწურული პოზიცია მყისიერად იფარება მომხმარებლის QR მენიუში.",
    guest: "სტუმარი",
    date: "თარიღი",
    time: "დრო",
    guests: "სტუმრები",
    status: "სტატუსი",
    actions: "ქმედებები",
    reservations: "ჯავშნები",
    expected: "მოსალოდნელი სტუმრები",
    liveItems: "მენიუშია",
  },
  en: {
    eyebrow: "Staff dashboard",
    title: "Live control for Maracana operations.",
    description:
      "Manage reservations, move guests through service, and update QR menu stock from one precision dashboard.",
    bookings: "Booking Manager",
    inventory: "Live Menu Inventory",
    inventoryText: "Out-of-stock items immediately appear disabled on the customer QR menu.",
    guest: "Guest",
    date: "Date",
    time: "Time",
    guests: "Guests",
    status: "Status",
    actions: "Actions",
    reservations: "Reservations",
    expected: "Guests Expected",
    liveItems: "Live Items",
  },
};

export default function AdminView() {
  const { bookings, categories, language, menuItems, toggleItemStock, updateBookingStatus } = useMenu();

  const stats = useMemo(
    () => [
      {
        label: copy[language].reservations,
        value: bookings.length,
        icon: CalendarCheck,
        detail: bookings.filter((booking) => booking.status === "Pending").length + " pending",
      },
      {
        label: copy[language].expected,
        value: bookings.filter((booking) => booking.status !== "Cancelled").reduce((sum, booking) => sum + booking.guests, 0),
        icon: UsersRound,
        detail: "active bookings",
      },
      {
        label: copy[language].liveItems,
        value: menuItems.filter((item) => item.inStock).length + "/" + menuItems.length,
        icon: Utensils,
        detail: "QR synced",
      },
    ],
    [bookings, language, menuItems],
  );

  const categoryById = useMemo(() => Object.fromEntries(categories.map((category) => [category.id, category])), [categories]);

  return (
    <main className="relative overflow-hidden pb-28 md:pb-0">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_0%,rgba(34,197,94,0.15),transparent_32rem),radial-gradient(circle_at_90%_10%,rgba(245,158,11,0.12),transparent_24rem)]" />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 overflow-hidden rounded-[2rem] border border-amber-500/30 bg-neutral-900/80 shadow-2xl shadow-black/50 backdrop-blur-md">
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 via-amber-500 to-green-500" />
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.35em] text-green-500">
              <ShieldCheck size={15} />
              {copy[language].eyebrow}
            </p>
            <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
                  {copy[language].title}
                </h1>
                <p className="mt-4 max-w-3xl text-white/62">{copy[language].description}</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-black text-green-300">
                <RadioTower size={17} /> Live Sync
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-white/10 p-4 sm:grid-cols-3 sm:p-6">
            {stats.map(({ label, value, icon: Icon, detail }) => (
              <div key={label} className="rounded-[1.5rem] border border-white/10 bg-neutral-950/55 p-5 transition hover:border-green-500/40">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <Icon className="text-green-500" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">{detail}</span>
                </div>
                <p className="text-sm text-white/50">{label}</p>
                <p className="mt-1 font-display text-4xl font-black text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[2rem] border border-amber-500/25 bg-neutral-900/80 p-4 shadow-2xl shadow-black/45 backdrop-blur-md sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.32em] text-green-500">
                  <ClipboardList size={14} />
                  {copy[language].bookings}
                </p>
                <h2 className="mt-2 font-display text-3xl font-black text-white">{copy[language].reservations}</h2>
              </div>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-amber-200">
                sorted by date/time
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-separate border-spacing-y-3 text-left">
                <thead>
                  <tr className="text-xs uppercase tracking-[0.24em] text-white/38">
                    <th className="px-4">{copy[language].guest}</th>
                    <th className="px-4">{copy[language].date}</th>
                    <th className="px-4">{copy[language].time}</th>
                    <th className="px-4">{copy[language].guests}</th>
                    <th className="px-4">{copy[language].status}</th>
                    <th className="px-4">{copy[language].actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="bg-neutral-950/55 text-sm transition hover:bg-neutral-950/80">
                      <td className="rounded-l-[1.25rem] px-4 py-4">
                        <p className="font-black text-white">{booking.fullName}</p>
                        <p className="mt-1 text-xs text-white/45">{booking.phone}</p>
                        <p className="mt-1 text-[11px] text-amber-300/80">{booking.id}</p>
                      </td>
                      <td className="px-4 py-4 text-white/72">{booking.date}</td>
                      <td className="px-4 py-4 text-white/72">{booking.time}</td>
                      <td className="px-4 py-4 text-white/72">{booking.guests}</td>
                      <td className="px-4 py-4"><StatusBadge status={booking.status} /></td>
                      <td className="rounded-r-[1.25rem] px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          {statusActions.map((status) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => updateBookingStatus(booking.id, status)}
                              className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-black text-white/62 transition hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-300"
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

          <section className="rounded-[2rem] border border-amber-500/25 bg-neutral-900/80 p-4 shadow-2xl shadow-black/45 backdrop-blur-md sm:p-6">
            <div className="mb-5">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.32em] text-green-500">
                <Settings2 size={14} />
                {copy[language].inventory}
              </p>
              <h2 className="mt-2 font-display text-3xl font-black text-white">{copy[language].liveItems}</h2>
              <p className="mt-2 text-sm leading-6 text-white/55">{copy[language].inventoryText}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {menuItems.map((item) => {
                const category = categoryById[item.categoryId];
                return (
                  <article key={item.id} className="flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-neutral-950/55 p-4 transition hover:border-green-500/40">
                    <div className={"grid h-16 w-16 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br " + item.imageTone}>
                      <ChefHat className="text-white drop-shadow" size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-black text-white">{item.name[language]}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/35">
                        {category?.label[language]} / ₾{item.price}
                      </p>
                      <p className={item.inStock ? "mt-2 text-xs font-black text-green-400" : "mt-2 text-xs font-black text-red-300"}>
                        {item.inStock ? (language === "ge" ? "მარაგშია" : "In Stock") : language === "ge" ? "ამოიწურა" : "Out of Stock"}
                      </p>
                    </div>
                    <StockToggle enabled={item.inStock} onChange={() => toggleItemStock(item.id)} label={"Toggle " + item.name.en + " stock"} />
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
