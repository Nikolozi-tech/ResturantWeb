import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, Phone, ShieldCheck, TicketCheck, UserRound, UsersRound } from "lucide-react";
import SectionHeader from "../components/SectionHeader.jsx";
import { useMenu } from "../context/MenuContext.js";

const copy = {
  ge: {
    eyebrow: "მაგიდის დაჯავშნა",
    title: "დაჯავშნე ადგილი მარაკანას თამაშის საღამოსთვის.",
    description:
      "შეავსეთ მონაცემები, აირჩიეთ 12:00-დან 23:00-მდე დრო და მიიღეთ ავტომატური დასტურის კოდი.",
    fullName: "სახელი და გვარი",
    phone: "ტელეფონი",
    guests: "სტუმრების რაოდენობა",
    date: "თარიღი",
    time: "დროის სლოტი",
    submit: "დაჯავშნის დადასტურება",
    success: "დაჯავშნა მიღებულია",
    successText: "დასტურის კოდი აჩვენეთ მარაკანას ჰოსტს მისვლისას.",
    another: "ახალი ჯავშანი",
    available: "ეს დრო ხელმისაწვდომია.",
    unavailable: "ეს სლოტი უკვე დაკავებულია.",
    phoneHelp: "ფორმატი: +995 და ზუსტად 9 ციფრი, მაგალითად +995555123456",
    selectTime: "აირჩიეთ დრო",
  },
  en: {
    eyebrow: "Table booking",
    title: "Reserve your spot for a Maracana game night.",
    description:
      "Enter guest details, choose an operating-hour slot between 12:00 and 23:00, and receive an automated confirmation code.",
    fullName: "Full Name",
    phone: "Phone Number",
    guests: "Number of Guests",
    date: "Date",
    time: "Time Slot",
    submit: "Confirm Reservation",
    success: "Reservation received",
    successText: "Show this confirmation code to the Maracana host when you arrive.",
    another: "Create another booking",
    available: "This time is available.",
    unavailable: "This slot is already booked.",
    phoneHelp: "Format: +995 followed by exactly 9 digits, e.g. +995555123456",
    selectTime: "Select time",
  },
};

const initialForm = {
  fullName: "",
  phone: "+995",
  guests: "2",
  date: "",
  time: "",
};

const normalizeGeorgianPhone = (value) => {
  const digits = value.replace(/\D/g, "");
  const local = digits.startsWith("995") ? digits.slice(3, 12) : digits.slice(0, 9);
  return "+995" + local;
};

export default function BookView() {
  const { bookedSlotsByDate, createBooking, isSlotAvailable, language, timeSlots } = useMenu();
  const [form, setForm] = useState(initialForm);
  const [submittedBooking, setSubmittedBooking] = useState(null);

  const bookedSlotsForDate = useMemo(() => bookedSlotsByDate[form.date] || [], [bookedSlotsByDate, form.date]);
  const isPhoneValid = /^\+995\d{9}$/.test(form.phone);
  const selectedSlotAvailable = Boolean(form.date && form.time && isSlotAvailable(form.date, form.time));
  const canSubmit = Boolean(form.fullName.trim() && isPhoneValid && form.date && form.time && selectedSlotAvailable);

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: field === "phone" ? normalizeGeorgianPhone(value) : value,
      ...(field === "date" ? { time: "" } : {}),
    }));
  };

  const submitBooking = (event) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }
    setSubmittedBooking(createBooking(form));
  };

  if (submittedBooking) {
    return (
      <main className="grid min-h-[calc(100vh-73px)] place-items-center px-4 py-10 pb-28 md:pb-10">
        <section className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-green-500/35 bg-neutral-900/80 p-6 text-center shadow-2xl shadow-green-500/10 backdrop-blur-md sm:p-10">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 via-amber-500 to-green-500" />
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full border border-green-500/40 bg-green-500/15 text-green-400">
            <TicketCheck size={38} />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-500">Maracana</p>
          <h1 className="mt-4 font-display text-4xl font-black text-white">{copy[language].success}</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/62">{copy[language].successText}</p>
          <div className="mx-auto mt-8 max-w-md rounded-[1.75rem] border border-amber-500/25 bg-neutral-950/60 p-5">
            <p className="text-sm text-white/45">Confirmation code</p>
            <p className="mt-2 font-display text-3xl font-black tracking-widest text-green-400">{submittedBooking.id}</p>
            <div className="mt-5 grid gap-3 text-left text-sm text-white/70 sm:grid-cols-3">
              <span>{submittedBooking.date}</span>
              <span>{submittedBooking.time}</span>
              <span>{submittedBooking.guests} guests</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setForm(initialForm);
              setSubmittedBooking(null);
            }}
            className="mt-8 rounded-full bg-green-500 px-6 py-3 font-black text-neutral-950 transition hover:bg-green-400"
          >
            {copy[language].another}
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden pb-28 md:pb-0">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(34,197,94,0.15),transparent_30rem),radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.13),transparent_24rem)]" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
        <aside className="rounded-[2rem] border border-amber-500/25 bg-neutral-900/80 p-6 shadow-2xl shadow-black/45 backdrop-blur-md sm:p-8">
          <SectionHeader eyebrow={copy[language].eyebrow} title={copy[language].title} description={copy[language].description} />
          <div className="space-y-4">
            <InfoCard icon={Clock3} title="12:00 - 23:00" text={language === "ge" ? "სლოტები შეზღუდულია თბილისის სამუშაო საათებით." : "Slots are restricted to Tbilisi operating hours."} />
            <InfoCard icon={Phone} title="+995" text={copy[language].phoneHelp} />
            <InfoCard icon={ShieldCheck} title="Live Admin Sync" text={language === "ge" ? "ჯავშანი მყისიერად გამოჩნდება ადმინისტრატორის პანელში." : "Bookings appear instantly inside the admin dashboard."} />
          </div>
        </aside>

        <section className="rounded-[2rem] border border-amber-500/30 bg-neutral-900/80 p-5 shadow-2xl shadow-black/45 backdrop-blur-md sm:p-8">
          <form onSubmit={submitBooking} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field icon={UserRound} label={copy[language].fullName}>
                <input
                  required
                  value={form.fullName}
                  onChange={(event) => updateForm("fullName", event.target.value)}
                  placeholder={language === "ge" ? "ნიკა მაისურაძე" : "Nika Maisuradze"}
                  className="field-input"
                />
              </Field>
              <Field icon={Phone} label={copy[language].phone}>
                <input
                  required
                  inputMode="tel"
                  value={form.phone}
                  onChange={(event) => updateForm("phone", event.target.value)}
                  className="field-input"
                />
                <p className={isPhoneValid ? "mt-2 text-xs text-green-400" : "mt-2 text-xs text-amber-300"}>{copy[language].phoneHelp}</p>
              </Field>
              <Field icon={UsersRound} label={copy[language].guests}>
                <select value={form.guests} onChange={(event) => updateForm("guests", event.target.value)} className="field-input">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((guestCount) => (
                    <option key={guestCount} value={guestCount}>{guestCount}</option>
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
              <select
                required
                value={form.time}
                onChange={(event) => updateForm("time", event.target.value)}
                className="field-input"
              >
                <option value="">{copy[language].selectTime}</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot} disabled={form.date && bookedSlotsForDate.includes(slot)}>
                    {slot}{form.date && bookedSlotsForDate.includes(slot) ? " - Booked" : ""}
                  </option>
                ))}
              </select>
            </Field>

            {form.date && form.time && (
              <p className={selectedSlotAvailable ? "rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200" : "rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"}>
                {selectedSlotAvailable ? copy[language].available : copy[language].unavailable}
              </p>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-4 font-black text-neutral-950 shadow-lg shadow-green-500/20 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CheckCircle2 size={20} />
              {copy[language].submit}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function Field({ icon: Icon, label, children }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-black text-white">
        <Icon size={17} className="text-green-500" />
        {label}
      </span>
      {children}
    </label>
  );
}

function InfoCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-neutral-950/55 p-4 transition hover:border-green-500/40">
      <Icon className="mb-3 text-amber-500" size={20} />
      <p className="font-black text-white">{title}</p>
      <p className="mt-1 text-sm leading-6 text-white/55">{text}</p>
    </div>
  );
}
