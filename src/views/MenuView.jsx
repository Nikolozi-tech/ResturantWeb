import { ArrowRight, Clock3, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import MenuItemCard from "../components/MenuItemCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { useMenu } from "../context/MenuContext.js";

const copy = {
  ge: {
    eyebrow: "მარაკანა / ციფრული მენიუ",
    title: "თანამედროვე ბისტრო გამოცდილება მარაკანასგან.",
    description:
      "სრულად განახლებული QR მენიუ ოფიციალური კერძებით, ცოცხალი ხელმისაწვდომობით და ქართულ-ინგლისური მხარდაჭერით.",
    cta: "მაგიდის დაჯავშნა",
    open: "დღეს ღიაა 12:00 - 23:00",
    location: "თბილისი, მარაკანა ლაუნჯი",
    quality: "11 ოფიციალური მენიუს პოზიცია",
    categories: "კატეგორიები",
  },
  en: {
    eyebrow: "Maracana / Digital Menu",
    title: "A modern bistro experience by Maracana.",
    description:
      "A fully refreshed QR menu with official dishes, live availability, and seamless Georgian-English support.",
    cta: "Reserve a table",
    open: "Open today 12:00 - 23:00",
    location: "Tbilisi, Maracana Lounge",
    quality: "11 official menu items",
    categories: "Categories",
  },
};

export default function MenuView() {
  const { groupedMenu, language, menuItems } = useMenu();
  const totalItems = menuItems.length;

  return (
    <main className="pb-28 md:pb-0">
      <section className="border-b border-neutral-200/70 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <div>
            <SectionHeader
              eyebrow={copy[language].eyebrow}
              title={copy[language].title}
              description={copy[language].description}
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                {copy[language].cta}
                <ArrowRight size={17} />
              </Link>
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-bold text-neutral-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                {language === "ge" ? "მენიუს ნახვა" : "Explore menu"}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-neutral-200/60 bg-neutral-50 p-4 shadow-sm">
            <div className="rounded-[1.5rem] border border-neutral-200/70 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">Modern Bistro</p>
                  <h2 className="mt-2 text-4xl font-black tracking-tight text-neutral-950">მარაკანა</h2>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-neutral-950 text-white">
                  <Sparkles size={24} />
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Metric icon={Clock3} label={copy[language].open} />
                <Metric icon={MapPin} label={copy[language].location} />
                <Metric icon={ShieldCheck} label={copy[language].quality.replace("11", String(totalItems))} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-neutral-200/60 bg-white p-3 shadow-sm">
          <p className="px-3 pb-3 text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">{copy[language].categories}</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {groupedMenu.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="whitespace-nowrap rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-semibold text-neutral-700 transition-all duration-300 hover:border-neutral-300 hover:bg-white hover:shadow-sm"
              >
                {category.label[language]}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          {groupedMenu.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-28">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
                    <Star size={14} />
                    {category.label[language]}
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-neutral-950">{category.description[language]}</h2>
                </div>
                <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-500 shadow-sm">
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
      </section>
    </main>
  );
}

function Metric({ icon: Icon, label }) {
  return (
    <div className="rounded-2xl border border-neutral-200/60 bg-neutral-50 p-4">
      <Icon className="mb-3 text-neutral-500" size={19} />
      <p className="text-sm font-semibold leading-5 text-neutral-800">{label}</p>
    </div>
  );
}
