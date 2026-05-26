import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, Phone, TicketCheck, UserRound, UsersRound } from "lucide-react";
import SectionHeader from "../components/SectionHeader.jsx";
import { useMenu } from "../context/MenuContext.js";

const copy = {
  ge: {
    eyebrow: "რეზერვაცია",
    title: "დაჯავშნეთ მაგიდა მარაკანაში.",
    description: "აირჩიეთ სტუმრების რაოდენობა, თარიღი და დრო 12:00-დან 23:00-მდე. დადასტურების შემდეგ ჯავშანი მყისიერად გამოჩნდება ოპერაციების პანელში.",
    fullName: "სახელი და გვარი",
    guestCount: "სტუმრების რაოდენობა",
    date: "თარიღი",
    time: "დროის სლოტი",
    phone: "ტელეფონი",
    submit: "რეზერვაციის დადასტურება",
    confirmed: "რეზერვაცია დადასტურებულია",
    confirmedText: "თქვენი უნიკალური კოდი მზად არის. აჩვენეთ ის პერსონალს მისვლისას.",
    another: "ახალი რეზერვაცია",
    phoneHelp: "შეიყვანეთ ზუსტად 9 ციფრი",
    unavailable: "ეს დრო უკვე დაკავებულია",
  },
  en: {
    eyebrow: "Reservations",
    title: "Reserve a table at Maracana.",
    description: "Choose guest count, date, and a time slot between 12:00 and 23:00. Once confirmed, the reservation appears instantly in operations.",
    fullName: "Full Name",
    guestCount: "Guest Count",
    date: "Date",
    time: "Time Slot",
    phone: "Phone",
    submit: "Confirm reservation",
    confirmed: "Reservation Confirmed",
    confirmedText: "Your unique tracking ID is ready. Show it to staff when you arrive.",
    another: "Create another reservation",
    phoneHelp: "Enter exactly 9 digits",
    unavailable: "This time is already booked",
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
  const { bookedSlotsByDate, createReservation, isSlotAvailable, language, timeSlots } = useMenu();
  const [form, setForm] = useState(initialForm);
  const [confirmedReservation, setConfirmedReservation] = useState(null);

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
      <main className="grid min-h-[calc(100vh-80px)] place-items-center px-4 py-10 pb-28 md:pb-10">
        <section className="w-full max-w-2xl rounded-[2rem] border border-neutral-200/60 bg-white p-6 text-center shadow-sm sm:p-10">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
            <TicketCheck size={32} />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">Maracana</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-neutral-950">{copy[language].confirmed}</h1>
          <p className="mx-auto mt-3 max-w-lg text-neutral-600">{copy[language].confirmedText}</p>
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-neutral-200/70 bg-neutral-50 p-5">
            <p className="text-sm font-semibold text-neutral-500">Tracking ID</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-neutral-950">{confirmedReservation.id}</p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm font-semibold text-neutral-600">
              <span>{confirmedReservation.date}</span>
              <span>{confirmedReservation.time}</span>
              <span>{confirmedReservation.partySize} guests</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setConfirmedReservation(null)}
            className="mt-8 rounded-full bg-neutral-950 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            {copy[language].another}
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="pb-28 md:pb-0">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-14">
        <aside className="rounded-[2rem] border border-neutral-200/60 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader eyebrow={copy[language].eyebrow} title={copy[language].title} description={copy[language].description} />
          <div className="grid gap-3">
            <Info icon={Clock3} title="12:00 - 23:00" text="Tbilisi local operating hours" />
            <Info icon={Phone} title="+995" text={copy[language].phoneHelp} />
            <Info icon={CheckCircle2} title="Live dashboard sync" text="Reservation is dispatched into global staff state" />
          </div>
        </aside>

        <section className="rounded-[2rem] border border-neutral-200/60 bg-white p-5 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field icon={UserRound} label={copy[language].fullName}>
                <input
                  required
                  value={form.customerName}
                  onChange={(event) => updateForm("customerName", event.target.value)}
                  placeholder={language === "ge" ? "ნიკა მაისურაძე" : "Nika Maisuradze"}
                  className="field-input"
                />
              </Field>

              <Field icon={Phone} label={copy[language].phone}>
                <div className="flex rounded-2xl border border-neutral-200 bg-white shadow-sm focus-within:border-neutral-400">
                  <span className="inline-flex items-center rounded-l-2xl border-r border-neutral-200 bg-neutral-50 px-4 text-sm font-bold text-neutral-700">+995</span>
                  <input
                    required
                    inputMode="numeric"
                    value={form.localPhone}
                    onChange={(event) => updateForm("localPhone", event.target.value)}
                    placeholder="555123456"
                    className="min-w-0 flex-1 rounded-r-2xl border-0 bg-transparent px-4 py-3.5 text-neutral-950 outline-none placeholder:text-neutral-400"
                  />
                </div>
                <p className={phoneIsValid ? "mt-2 text-xs font-semibold text-emerald-700" : "mt-2 text-xs font-semibold text-neutral-500"}>{copy[language].phoneHelp}</p>
              </Field>

              <Field icon={UsersRound} label={copy[language].guestCount}>
                <select value={form.partySize} onChange={(event) => updateForm("partySize", event.target.value)} className="field-input">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((count) => (
                    <option key={count} value={count}>{count}</option>
                  ))}
                </select>
              </Field>

              <Field icon={CalendarDays} label={copy[language].date}>
                <input
                  required
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.date}
                  onChange={(event) => updateForm("date", event.target.value)}
                  className="field-input"
                />
              </Field>
            </div>

            <Field icon={Clock3} label={copy[language].time}>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
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
                        "rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all duration-300",
                        selected ? "border-neutral-950 bg-neutral-950 text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:shadow-sm",
                        disabled ? "cursor-not-allowed bg-neutral-50 text-neutral-300 hover:border-neutral-200 hover:shadow-none" : "",
                      ].join(" ")}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              {form.date && form.time && !slotIsAvailable && <p className="mt-3 text-sm font-semibold text-rose-700">{copy[language].unavailable}</p>}
            </Field>

            <button
              type="submit"
              disabled={!canSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-4 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
            >
              <CheckCircle2 size={18} />
              {copy[language].submit}
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}

function Field({ icon: Icon, label, children }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-bold text-neutral-800">
        <Icon size={17} className="text-neutral-500" />
        {label}
      </span>
      {children}
    </label>
  );
}

function Info({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-neutral-200/60 bg-neutral-50 p-4">
      <Icon className="mb-3 text-neutral-500" size={19} />
      <p className="font-bold text-neutral-950">{title}</p>
      <p className="mt-1 text-sm leading-6 text-neutral-600">{text}</p>
    </div>
  );
}
