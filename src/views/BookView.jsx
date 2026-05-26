import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, Phone, TicketCheck, UserRound, UsersRound } from "lucide-react";
import SectionHeader from "../components/SectionHeader.jsx";
import { useLanguage } from "../context/LanguageContext.js";
import { useMenu } from "../context/MenuContext.js";

const copy = {
  ge: {
    eyebrow: "რეზერვაცია",
    title: "დაჯავშნეთ მაგიდა მარაკანაში.",
    description: "აირჩიეთ თარიღი, სტუმრების რაოდენობა და დრო 12:00-დან 23:00-მდე. დადასტურების შემდეგ ჯავშანი მყისიერად აისახება ოპერაციების პანელში.",
    fullName: "სახელი და გვარი",
    guestCount: "სტუმრების რაოდენობა",
    date: "თარიღი",
    time: "დრო",
    phone: "ტელეფონი",
    submit: "რეზერვაციის დადასტურება",
    confirmed: "Reservation Confirmed",
    confirmedText: "თქვენი რეზერვაცია მიღებულია და უკვე ჩანს ოპერაციების პანელში.",
    another: "ახალი რეზერვაცია",
    phoneHelp: "შეიყვანეთ ზუსტად 9 ციფრი",
    unavailable: "ეს დრო უკვე დაკავებულია",
    summary: "ჯავშნის შეჯამება",
    chooseDateFirst: "ჯერ აირჩიეთ თარიღი",
  },
  en: {
    eyebrow: "Reservations",
    title: "Reserve a table at Maracana.",
    description: "Choose a date, party size, and time from 12:00 to 23:00. Once confirmed, the booking appears instantly in operations.",
    fullName: "Full Name",
    guestCount: "Guest Count",
    date: "Date",
    time: "Time",
    phone: "Phone",
    submit: "Confirm reservation",
    confirmed: "Reservation Confirmed",
    confirmedText: "Your reservation is confirmed and already visible in the operations dashboard.",
    another: "Create another reservation",
    phoneHelp: "Enter exactly 9 digits",
    unavailable: "This time is already booked",
    summary: "Booking summary",
    chooseDateFirst: "Choose a date first",
  },
};

const initialForm = {
  customerName: "",
  localPhone: "",
  partySize: "2",
  date: "",
  time: "",
};

export default function BookView() {
  const { language } = useLanguage();
  const { bookedSlotsByDate, createReservation, isSlotAvailable, timeSlots } = useMenu();
  const [form, setForm] = useState(initialForm);
  const [confirmedReservation, setConfirmedReservation] = useState(null);
  const t = copy[language];

  const bookedSlots = useMemo(() => bookedSlotsByDate[form.date] || [], [bookedSlotsByDate, form.date]);
  const phoneIsValid = /^\d{9}$/.test(form.localPhone);
  const slotIsAvailable = Boolean(form.date && form.time && isSlotAvailable(form.date, form.time));
  const canSubmit = Boolean(form.customerName.trim() && phoneIsValid && form.partySize && form.date && form.time && slotIsAvailable);

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: field === "localPhone" ? value.replace(/\D/g, "").slice(0, 9) : value,
      ...(field === "date" ? { time: "" } : {}),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    const reservation = createReservation(form);
    setConfirmedReservation(reservation);
    setForm(initialForm);
  };

  if (confirmedReservation) {
    return (
      <main className="grid min-h-[calc(100vh-112px)] place-items-center px-4 py-10">
        <section className="w-full max-w-2xl rounded-3xl border border-amber-200 bg-white p-6 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-in-out sm:p-10">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-3xl border border-amber-200 bg-amber-50 text-amber-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <TicketCheck size={32} />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-600">Maracana</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">{t.confirmed}</h1>
          <p className="mx-auto mt-3 max-w-lg text-slate-600">{t.confirmedText}</p>
          <div className="mx-auto mt-8 max-w-md rounded-3xl border border-neutral-100/70 bg-neutral-50 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <p className="text-sm font-semibold text-slate-500">Tracking ID</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">{confirmedReservation.id}</p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm font-semibold text-slate-600">
              <span>{confirmedReservation.date}</span>
              <span>{confirmedReservation.time}</span>
              <span>{confirmedReservation.partySize} guests</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setConfirmedReservation(null)}
            className="mt-8 rounded-full bg-amber-600 px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-amber-700 hover:shadow-lg"
          >
            {t.another}
          </button>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-14">
        <aside className="rounded-3xl border border-amber-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg sm:p-8">
          <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
          <div className="grid gap-3">
            <Info icon={Clock3} title="12:00 - 23:00" text="Tbilisi local operating hours" />
            <Info icon={Phone} title="+995" text={t.phoneHelp} />
            <Info icon={CheckCircle2} title="Live dashboard sync" text="Reservation is dispatched into global state" />
          </div>
        </aside>

        <section className="rounded-3xl border border-neutral-100/50 bg-white p-5 shadow-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-in-out sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-5 transition-all duration-300 ease-in-out sm:grid-cols-2">
              <Field icon={UserRound} label={t.fullName}>
                <input
                  required
                  value={form.customerName}
                  onChange={(event) => updateForm("customerName", event.target.value)}
                  placeholder={language === "ge" ? "ნიკა მაისურაძე" : "Nika Maisuradze"}
                  className="field-input"
                />
              </Field>

              <Field icon={Phone} label={t.phone}>
                <div className="flex rounded-3xl border border-neutral-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-in-out focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-amber-100">
                  <span className="inline-flex items-center rounded-l-3xl border-r border-neutral-200 bg-amber-50 px-4 text-sm font-bold text-amber-700">+995</span>
                  <input
                    required
                    inputMode="numeric"
                    value={form.localPhone}
                    onChange={(event) => updateForm("localPhone", event.target.value)}
                    placeholder="555123456"
                    className="min-w-0 flex-1 rounded-r-3xl border-0 bg-transparent px-4 py-3.5 text-slate-950 outline-none transition-all duration-300 ease-in-out placeholder:text-slate-400"
                  />
                </div>
                <p className={phoneIsValid ? "mt-2 text-xs font-semibold text-emerald-700 transition-all duration-300" : "mt-2 text-xs font-semibold text-slate-500 transition-all duration-300"}>{t.phoneHelp}</p>
              </Field>

              <Field icon={UsersRound} label={t.guestCount}>
                <select value={form.partySize} onChange={(event) => updateForm("partySize", event.target.value)} className="field-input">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((count) => (
                    <option key={count} value={count}>{count}</option>
                  ))}
                </select>
              </Field>

              <Field icon={CalendarDays} label={t.date}>
                <input
                  required
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.date}
                  onChange={(event) => updateForm("date", event.target.value)}
                  className={[
                    "field-input",
                    form.date ? "scale-[1.01] border-amber-300 shadow-[0_0_0_4px_rgba(245,158,11,0.12)]" : "",
                  ].join(" ")}
                />
              </Field>
            </div>

            <Field icon={Clock3} label={t.time}>
              <div className="grid grid-cols-3 gap-2 transition-all duration-300 ease-in-out sm:grid-cols-4 lg:grid-cols-6">
                {timeSlots.map((slot) => {
                  const disabled = !form.date || bookedSlots.includes(slot);
                  const selected = form.time === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={disabled}
                      onClick={() => updateForm("time", slot)}
                      className={[
                        "rounded-2xl border px-3 py-2.5 text-sm font-semibold transition-all duration-300 ease-in-out",
                        selected
                          ? "scale-105 border-amber-300 bg-amber-600 text-white shadow-[0_0_0_4px_rgba(245,158,11,0.16),0_12px_24px_rgba(217,119,6,0.18)]"
                          : "border-neutral-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 hover:shadow-md",
                        disabled ? "cursor-not-allowed bg-neutral-50 text-slate-300 opacity-70 hover:translate-y-0 hover:border-neutral-200 hover:bg-neutral-50 hover:text-slate-300 hover:shadow-none" : "",
                      ].join(" ")}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              {!form.date && <p className="mt-3 text-sm font-semibold text-slate-500 transition-all duration-300 ease-in-out">{t.chooseDateFirst}</p>}
              {form.date && form.time && !slotIsAvailable && <p className="mt-3 text-sm font-semibold text-rose-700 transition-all duration-300 ease-in-out">{t.unavailable}</p>}
            </Field>

            <div className={[
              "rounded-3xl border border-amber-200 bg-amber-50 p-4 transition-all duration-300 ease-in-out",
              form.date && form.time ? "scale-[1.01] shadow-[0_0_0_4px_rgba(245,158,11,0.12),0_8px_30px_rgb(0,0,0,0.04)]" : "",
            ].join(" ")}
            >
              <p className="text-sm font-bold text-slate-950">{t.summary}</p>
              <p className="mt-1 text-sm text-slate-600">
                {form.partySize} guests · {form.date || "Date"} · {form.time || "Time"}
              </p>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-600 px-6 py-4 text-sm font-bold text-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-amber-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
            >
              <CheckCircle2 size={18} />
              {t.submit}
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}

function Field({ icon: Icon, label, children }) {
  return (
    <label className="block transition-all duration-300 ease-in-out">
      <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
        <Icon size={17} className="text-amber-600" />
        {label}
      </span>
      {children}
    </label>
  );
}

function Info({ icon: Icon, title, text }) {
  return (
    <div className="rounded-3xl border border-neutral-200/60 bg-neutral-50 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <Icon className="mb-3 text-amber-600" size={19} />
      <p className="font-bold text-slate-950">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
