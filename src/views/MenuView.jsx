import { useMemo } from "react";
import { Crown, Flame, MapPin, ScanLine, ShieldCheck, Timer, Trophy } from "lucide-react";
import MenuItemCard from "../components/MenuItemCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { useMenu } from "../context/MenuContext.js";

const copy = {
  ge: {
    eyebrow: "QR მენიუ / მარაკანა",
    title: "სტადიონის ენერგია. პრემიუმ ლაუნჯის გემო.",
    description:
      "მარაკანას სწრაფი QR მენიუ აერთიანებს პიცას, ბურგერებს, წასახემსებლებსა და სასმელებს მობილურ, მაღალტექნოლოგიურ გამოცდილებაში.",
    live: "ცოცხალი მენიუ",
    liveText: "მარაგი სინქრონდება ადმინისტრატორის პანელიდან",
    hours: "12:00 - 23:00",
    hoursText: "თბილისის დროით",
    venue: "მარაკანა ლაუნჯი",
    venueText: "სპორტი, მუსიკა, მეგობრები",
    viral: "TikTok ჰიტები",
    categories: "კატეგორიები",
  },
  en: {
    eyebrow: "QR Menu / Maracana",
    title: "Stadium energy. Premium lounge flavor.",
    description:
      "Maracana's fast QR menu brings pizza, burgers, appetizers, and drinks into a mobile-first high-tech dining experience.",
    live: "Live menu",
    liveText: "Inventory syncs from the admin dashboard",
    hours: "12:00 - 23:00",
    hoursText: "Tbilisi local time",
    venue: "Maracana Lounge",
    venueText: "Sports, music, friends",
    viral: "TikTok hits",
    categories: "Categories",
  },
};

export default function MenuView() {
  const { categories, language, menuItems } = useMenu();

  const groupedMenu = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        items: menuItems.filter((item) => item.categoryId === category.id),
      })),
    [categories, menuItems],
  );

  const viralCount = menuItems.filter((item) => item.isViral).length;

  return (
    <main className="relative overflow-hidden pb-28 md:pb-0">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_34rem),radial-gradient(circle_at_80%_10%,rgba(245,158,11,0.16),transparent_28rem)]" />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-amber-500/30 bg-neutral-900/80 p-5 shadow-2xl shadow-black/50 backdrop-blur-md sm:p-8 lg:p-10">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 via-amber-500 to-green-500" />
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <SectionHeader
              eyebrow={copy[language].eyebrow}
              title={copy[language].title}
              description={copy[language].description}
            />
            <div className="rounded-[1.75rem] border border-white/10 bg-neutral-950/55 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.32em] text-amber-500">Maracana</p>
                  <p className="mt-1 font-display text-3xl font-black text-white">მარაკანა</p>
                </div>
                <Trophy className="text-green-500" size={34} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Metric icon={ScanLine} title={copy[language].live} text={copy[language].liveText} />
                <Metric icon={Timer} title={copy[language].hours} text={copy[language].hoursText} />
                <Metric icon={MapPin} title={copy[language].venue} text={copy[language].venueText} />
                <Metric icon={Flame} title={copy[language].viral} text={String(viralCount) + " featured items"} />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.5rem] border border-amber-500/20 bg-neutral-900/70 p-3 backdrop-blur-md">
          <p className="px-3 pb-3 text-xs font-black uppercase tracking-[0.32em] text-white/45">
            {copy[language].categories}
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {groupedMenu.map((category) => (
              <a
                key={category.id}
                href={"#" + category.id}
                className="whitespace-nowrap rounded-full border border-white/10 bg-neutral-950/60 px-4 py-2 text-sm font-black text-white/70 transition hover:border-green-500/50 hover:text-green-400"
              >
                {category.label[language]}
              </a>
            ))}
          </div>
        </section>

        <div className="mt-10 space-y-12">
          {groupedMenu.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-28">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.32em] text-green-500">
                    <Crown size={14} />
                    {category.label[language]}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-black text-white sm:text-4xl">
                    {language === "ge" ? "მარაკანას არჩევანი" : "Maracana selection"}
                  </h2>
                </div>
                <span className="rounded-full border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-200">
                  {category.items.length} {language === "ge" ? "პოზიცია" : "items"}
                </span>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {category.items.map((item) => (
                  <MenuItemCard key={item.id} item={item} category={category} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-[2rem] border border-green-500/25 bg-green-500/10 p-6 text-center backdrop-blur-md">
          <ShieldCheck className="mx-auto mb-3 text-green-400" size={32} />
          <p className="font-display text-2xl font-black text-white">
            {language === "ge" ? "მენიუ სინქრონდება რეალურ დროში" : "Menu syncs in real time"}
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-white/58">
            {language === "ge"
              ? "როცა პერსონალი ადმინისტრატორის პანელში პროდუქტს ამოწურულად მონიშნავს, QR მენიუში ის მყისიერად გამჭვირვალე და დაბლოკილი ხდება."
              : "When staff mark an item out of stock in the admin dashboard, it instantly appears faded and disabled in this QR menu."}
          </p>
        </section>
      </div>
    </main>
  );
}

function Metric({ icon: Icon, title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-neutral-900/80 p-4 transition hover:border-green-500/40">
      <Icon className="mb-3 text-green-500" size={20} />
      <p className="font-black text-white">{title}</p>
      <p className="mt-1 text-xs leading-5 text-white/45">{text}</p>
    </div>
  );
}
