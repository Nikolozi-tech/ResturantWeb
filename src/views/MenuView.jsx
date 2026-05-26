import { ArrowRight, Clock3, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import MenuItemCard from "../components/MenuItemCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { useLanguage } from "../context/LanguageContext.js";
import { useMenu } from "../context/MenuContext.js";

const copy = {
  ge: {
    eyebrow: "მარაკანა / ციფრული მენიუ",
    title: "ქართული ბისტრო გამოცდილება პრემიუმ ფორმატში.",
    description:
      "დაათვალიერეთ მარაკანას ავთენტური მენიუ, რეალური ფოტოებით, ცოცხალი ხელმისაწვდომობით და მარტივი დაჯავშნის სისტემით.",
    cta: "მაგიდის დაჯავშნა",
    explore: "მენიუს ნახვა",
    open: "დღეს ღიაა 12:00 - 23:00",
    location: "თბილისი, მარაკანა",
    quality: "ავთენტური ქართული კერძები",
    categories: "კატეგორიები",
  },
  en: {
    eyebrow: "Maracana / Digital Menu",
    title: "A premium Georgian bistro experience.",
    description:
      "Explore Maracana's authentic menu with real photography, live availability, and a seamless reservation system.",
    cta: "Reserve a table",
    explore: "Explore menu",
    open: "Open today 12:00 - 23:00",
    location: "Tbilisi, Maracana",
    quality: "Authentic Georgian dishes",
    categories: "Categories",
  },
};

export default function MenuView() {
  const { language } = useLanguage();
  const { groupedMenu, menuItems } = useMenu();
  const t = copy[language];

  return (
    <main className="pb-28 md:pb-0">
      <section className="border-b border-neutral-200/70 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <div>
            <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-md"
              >
                {t.cta}
                <ArrowRight size={17} />
              </Link>
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-50 hover:text-amber-700 hover:shadow-md"
              >
                {t.explore}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-amber-200 bg-neutral-50 p-4 shadow-sm">
            <div className="rounded-[1.5rem] border border-neutral-200/70 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">Modern Bistro</p>
                  <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950">მარაკანა</h2>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-700">
                  <Sparkles size={24} />
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Metric icon={Clock3} label={t.open} />
                <Metric icon={MapPin} label={t.location} />
                <Metric icon={ShieldCheck} label={`${menuItems.length} ${t.quality}`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-neutral-200/60 bg-white p-3 shadow-sm">
          <p className="px-3 pb-3 text-xs font-bold uppercase tracking-[0.22em] text-amber-600">{t.categories}</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {groupedMenu.map((category) => (
              <a
                key={category.labelGe}
                href={`#${category.id}`}
                className="whitespace-nowrap rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition-all duration-300 hover:bg-white hover:shadow-sm"
              >
                {language === "ge" ? category.labelGe : category.labelEn}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          {groupedMenu.map((category) => (
            <section key={category.labelGe} id={category.id} className="scroll-mt-28">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-600">
                    <Star size={14} />
                    {language === "ge" ? category.labelGe : category.labelEn}
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                    {language === "ge" ? "მარაკანას არჩევანი" : "Maracana selection"}
                  </h2>
                </div>
                <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm">
                  {category.items.length} {language === "ge" ? "პოზიცია" : "items"}
                </span>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {category.items.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

function Metric({ icon: Icon, label }) {
  return (
    <div className="rounded-2xl border border-neutral-200/60 bg-neutral-50 p-4">
      <Icon className="mb-3 text-amber-600" size={19} />
      <p className="text-sm font-semibold leading-5 text-slate-800">{label}</p>
    </div>
  );
}
