import { useMemo, useState } from "react";
import { BarChart3, CalendarCheck, ChefHat, ClipboardList, LayoutDashboard, Settings2, UsersRound } from "lucide-react";
import LanguageToggle from "../components/LanguageToggle.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import StockToggle from "../components/StockToggle.jsx";
import { useMenu } from "../context/MenuContext.js";

const statusActions = [
  { status: "Confirmed", className: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100" },
  { status: "Seated", className: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100" },
  { status: "Cancelled", className: "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100" },
];

const tabCopy = {
  ge: {
    reservations: "რეზერვაციები",
    menu: "მენიუს მართვა",
    title: "მარაკანას ოპერაციების პანელი",
    description: "ცალკე ადმინისტრაციული სივრცე ჯავშნების, სტატუსებისა და მენიუს ხელმისაწვდომობის სამართავად.",
    customer: "მომხმარებელი",
    phone: "ტელეფონი",
    party: "სტუმრები",
    dateTime: "თარიღი / დრო",
    status: "სტატუსი",
    actions: "ქმედებები",
    liveInventory: "ცოცხალი მენიუს ხელმისაწვდომობა",
    inventoryText: "გადართეთ ნებისმიერი პოზიცია. ცვლილება მყისიერად აისახება მომხმარებლის მენიუში.",
  },
  en: {
    reservations: "Reservations",
    menu: "Menu Management",
    title: "Maracana Operations Dashboard",
    description: "A standalone staff backend for reservations, guest status, and live menu availability.",
    customer: "Customer",
    phone: "Phone",
    party: "Party Size",
    dateTime: "Date / Time",
    status: "Status",
    actions: "Actions",
    liveInventory: "Live Menu Availability",
    inventoryText: "Toggle any item. The public customer menu updates immediately.",
  },
};

export default function AdminView() {
  const { categories, groupedMenu, language, menuItems, reservations, toggleMenuAvailability, updateReservationStatus } = useMenu();
  const [activeTab, setActiveTab] = useState("reservations");

  const stats = useMemo(
    () => [
      {
        label: language === "ge" ? "ჯავშნები" : "Reservations",
        value: reservations.length,
        detail: `${reservations.filter((reservation) => reservation.status === "Pending").length} pending`,
        icon: CalendarCheck,
      },
      {
        label: language === "ge" ? "აქტიური სტუმრები" : "Active Guests",
        value: reservations
          .filter((reservation) => reservation.status !== "Cancelled")
          .reduce((sum, reservation) => sum + reservation.partySize, 0),
        detail: language === "ge" ? "გაუქმებულის გარეშე" : "excluding cancelled",
        icon: UsersRound,
      },
      {
        label: language === "ge" ? "ხელმისაწვდომი კერძები" : "Available Items",
        value: `${menuItems.filter((item) => item.available).length}/${menuItems.length}`,
        detail: language === "ge" ? "მენიუ სინქრონდება" : "menu synced",
        icon: ChefHat,
      },
    ],
    [language, menuItems, reservations],
  );

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900">
      <header className="border-b border-neutral-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-neutral-950 text-white shadow-sm">
              <LayoutDashboard size={22} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">Staff backend</p>
              <h1 className="text-2xl font-black tracking-tight text-neutral-950">{tabCopy[language].title}</h1>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-[2rem] border border-neutral-200/70 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">
                <BarChart3 size={15} />
                Enterprise controls
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-neutral-950">{tabCopy[language].title}</h2>
              <p className="mt-3 max-w-2xl text-neutral-600">{tabCopy[language].description}</p>
            </div>
            <div className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 p-1">
              {[
                { id: "reservations", label: tabCopy[language].reservations, icon: ClipboardList },
                { id: "menu", label: tabCopy[language].menu, icon: Settings2 },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300",
                    activeTab === id ? "bg-neutral-950 text-white shadow-sm" : "text-neutral-600 hover:bg-white hover:text-neutral-950",
                  ].join(" ")}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {stats.map(({ label, value, detail, icon: Icon }) => (
              <div key={label} className="rounded-2xl border border-neutral-200/70 bg-neutral-50 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <Icon className="text-neutral-500" size={20} />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">{detail}</span>
                </div>
                <p className="text-sm font-semibold text-neutral-500">{label}</p>
                <p className="mt-1 text-3xl font-black tracking-tight text-neutral-950">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {activeTab === "reservations" ? (
          <ReservationsTable reservations={reservations} updateReservationStatus={updateReservationStatus} />
        ) : (
          <MenuManagement groupedMenu={groupedMenu} categories={categories} toggleMenuAvailability={toggleMenuAvailability} />
        )}
      </div>
    </main>
  );
}

function ReservationsTable({ reservations, updateReservationStatus }) {
  const { language } = useMenu();
  const t = tabCopy[language];

  return (
    <section className="rounded-[2rem] border border-neutral-200/70 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">{t.reservations}</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-neutral-950">{language === "ge" ? "შემომავალი ჯავშნები" : "Incoming reservations"}</h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">
              <th className="px-4 py-2">{t.customer}</th>
              <th className="px-4 py-2">{t.phone}</th>
              <th className="px-4 py-2">{t.party}</th>
              <th className="px-4 py-2">{t.dateTime}</th>
              <th className="px-4 py-2">{t.status}</th>
              <th className="px-4 py-2">{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="bg-neutral-50 text-sm">
                <td className="rounded-l-2xl px-4 py-4">
                  <p className="font-bold text-neutral-950">{reservation.customerName}</p>
                  <p className="mt-1 text-xs font-semibold text-neutral-400">{reservation.id}</p>
                </td>
                <td className="px-4 py-4 font-semibold text-neutral-600">{reservation.phone}</td>
                <td className="px-4 py-4 font-semibold text-neutral-600">{reservation.partySize}</td>
                <td className="px-4 py-4 font-semibold text-neutral-600">{reservation.date} · {reservation.time}</td>
                <td className="px-4 py-4"><StatusBadge status={reservation.status} /></td>
                <td className="rounded-r-2xl px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    {statusActions.map((action) => (
                      <button
                        key={action.status}
                        type="button"
                        onClick={() => updateReservationStatus(reservation.id, action.status)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-all duration-300 ${action.className}`}
                      >
                        {action.status}
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
  );
}

function MenuManagement({ groupedMenu, toggleMenuAvailability }) {
  const { language } = useMenu();
  const t = tabCopy[language];

  return (
    <section className="rounded-[2rem] border border-neutral-200/70 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">{t.menu}</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-neutral-950">{t.liveInventory}</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-600">{t.inventoryText}</p>
      </div>
      <div className="space-y-8">
        {groupedMenu.map((category) => (
          <div key={category.id}>
            <div className="mb-3 flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-bold text-neutral-950">{category.label[language]}</h3>
              <span className="text-xs font-semibold text-neutral-400">{category.items.length} items</span>
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              {category.items.map((item) => (
                <article key={item.id} className="flex items-center gap-4 rounded-2xl border border-neutral-200/70 bg-neutral-50 p-4 transition-all duration-300 hover:bg-white hover:shadow-sm">
                  <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-xl bg-white text-neutral-500 shadow-sm">
                    <ChefHat size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-neutral-950">{item.name[language]}</p>
                    <p className="mt-1 text-sm text-neutral-500">₾{item.price} · {item.viral ? (language === "ge" ? "TikTok-ზე ვირუსული" : "Viral on TikTok") : "Standard"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={item.available ? "text-xs font-bold text-emerald-700" : "text-xs font-bold text-rose-700"}>
                      {item.available ? (language === "ge" ? "მარაგშია" : "In Stock") : language === "ge" ? "ამოიწურა" : "Out"}
                    </span>
                    <StockToggle enabled={item.available} onChange={() => toggleMenuAvailability(item.id)} label={`Toggle ${item.name.en}`} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
