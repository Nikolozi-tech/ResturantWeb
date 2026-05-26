import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Loader2,
  PartyPopper,
  Phone,
  UserRound,
  UsersRound,
} from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { useRestaurant } from "../context/RestaurantContext";
import { timeSlots } from "../data/mockData";

const initialForm = {
  name: "",
  phone: "",
  guests: "2",
  date: "",
  time: "",
};

export default function BookView() {
  const { createBooking, isSlotAvailable, unavailableSlotsByDate } = useRestaurant();
  const [form, setForm] = useState(initialForm);
  const [isChecking, setIsChecking] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);

  const unavailableSlots = useMemo(
    () => unavailableSlotsByDate[form.date] || [],
    [form.date, unavailableSlotsByDate],
  );

  const selectedSlotAvailable = form.date && form.time && isSlotAvailable(form.date, form.time);

  const updateForm = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
      ...(field === "date" ? { time: "" } : {}),
    }));

    if (field === "date" || field === "time") {
      setIsChecking(true);
      window.setTimeout(() => setIsChecking(false), 550);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedSlotAvailable) {
      return;
    }

    const booking = createBooking(form);
    setSubmittedBooking(booking);
  };

  if (submittedBooking) {
    return (
      <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-4xl place-items-center px-4 py-10">
        <section className="w-full rounded-[2.25rem] border border-emerald-300/20 bg-white/[0.05] p-6 text-center shadow-glow sm:p-10">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-emerald-400/15 text-emerald-200">
            <PartyPopper size={38} />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-200">
            Reservation confirmed
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-white">
            See you at Supra House, {submittedBooking.name.split(" ")[0]}.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/62">
            Your automated confirmation code is ready. Share it with the host when you arrive.
          </p>
          <div className="mx-auto mt-8 max-w-md rounded-3xl border border-white/10 bg-black/35 p-5">
            <p className="text-sm text-white/45">Confirmation code</p>
            <p className="mt-2 font-display text-3xl font-semibold tracking-widest text-amber-200">
              {submittedBooking.id}
            </p>
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
            className="mt-8 rounded-full bg-amber-300 px-6 py-3 font-bold text-black transition hover:bg-amber-200"
          >
            Make another booking
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden bg-[#0b0b0b]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(214,161,61,0.22),transparent_34%)]" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <aside className="rounded-[2.25rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30 sm:p-8">
          <SectionHeader
            eyebrow="Reservations"
            title="Book a table for tonight's supra."
            description="Choose your date and time slot. The form simulates a backend availability check and locks out already-booked tables."
          />

          <div className="space-y-4">
            {[
              ["Live slot checks", "Booked times become unavailable instantly."],
              ["Host confirmation", "Each reservation receives a confirmation code."],
              ["Perfect for groups", "Support for intimate dinners and larger parties."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-black/30 p-4">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm leading-6 text-white/55">{text}</p>
              </div>
            ))}
          </div>
        </aside>

        <section className="rounded-[2.25rem] border border-amber-200/15 bg-[#111111] p-5 shadow-glow sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField icon={UserRound} label="Full Name">
                <input
                  required
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  placeholder="Nino Beridze"
                  className="field-input"
                />
              </FormField>

              <FormField icon={Phone} label="Phone Number">
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(event) => updateForm("phone", event.target.value)}
                  placeholder="+995 555 12 34 56"
                  className="field-input"
                />
              </FormField>

              <FormField icon={UsersRound} label="Number of Guests">
                <select
                  value={form.guests}
                  onChange={(event) => updateForm("guests", event.target.value)}
                  className="field-input"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((guestCount) => (
                    <option key={guestCount} value={guestCount}>
                      {guestCount} {guestCount === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField icon={CalendarDays} label="Date">
                <input
                  required
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.date}
                  onChange={(event) => updateForm("date", event.target.value)}
                  className="field-input"
                />
              </FormField>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Clock size={17} className="text-amber-200" />
                  Time Slot
                </label>
                {isChecking && (
                  <span className="inline-flex items-center gap-2 text-xs text-amber-100">
                    <Loader2 size={14} className="animate-spin" />
                    Checking availability
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {timeSlots.map((slot) => {
                  const isUnavailable = !form.date || unavailableSlots.includes(slot);
                  const isSelected = form.time === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isUnavailable}
                      onClick={() => updateForm("time", slot)}
                      className={[
                        "rounded-2xl border px-4 py-3 text-sm font-bold transition",
                        isSelected
                          ? "border-amber-200 bg-amber-300 text-black"
                          : "border-white/10 bg-white/[0.04] text-white hover:border-amber-200/50",
                        isUnavailable ? "cursor-not-allowed opacity-35" : "",
                      ].join(" ")}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              {form.date && form.time && (
                <p
                  className={[
                    "mt-4 rounded-2xl px-4 py-3 text-sm",
                    selectedSlotAvailable
                      ? "bg-emerald-400/10 text-emerald-100"
                      : "bg-red-400/10 text-red-100",
                  ].join(" ")}
                >
                  {selectedSlotAvailable
                    ? "This table slot is available."
                    : "That time is already booked out."}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!form.name || !form.phone || !form.date || !form.time || !selectedSlotAvailable}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-4 font-black text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CheckCircle2 size={20} />
              Confirm Reservation
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function FormField({ icon: Icon, label, children }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
        <Icon size={17} className="text-amber-200" />
        {label}
      </span>
      {children}
    </label>
  );
}
