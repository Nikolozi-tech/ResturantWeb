import { useMemo, useState } from "react";
import { Clock3, MapPin, QrCode, Star } from "lucide-react";
import LanguageToggle from "../components/LanguageToggle";
import MenuItemCard from "../components/MenuItemCard";
import SectionHeader from "../components/SectionHeader";
import { useRestaurant } from "../context/RestaurantContext";
import { categories } from "../data/mockData";

const copy = {
  en: {
    eyebrow: "Table 12 QR Menu",
    title: "Modern Georgian dining, served with ceremony.",
    description:
      "Browse chef-led dishes, amber cellar selections, and house-made classics. Availability updates instantly from the staff dashboard.",
    open: "Open tonight 17:30 - 23:00",
    location: "Old Tbilisi, Georgia",
  },
  ge: {
    eyebrow: "მაგიდა 12 QR მენიუ",
    title: "თანამედროვე ქართული სამზარეულო განსაკუთრებული სერვისით.",
    description:
      "დაათვალიერეთ შეფის კერძები, ქარვისფერი ღვინოები და სახლის კლასიკა. მარაგი მყისიერად ახლდება ადმინისტრატორის პანელიდან.",
    open: "ღიაა დღეს 17:30 - 23:00",
    location: "ძველი თბილისი, საქართველო",
  },
};

export default function MenuView() {
  const { inventory } = useRestaurant();
  const [language, setLanguage] = useState("en");

  const groupedItems = useMemo(
    () =>
      categories.map((category) => ({
        category,
        items: inventory.filter((item) => item.category === category),
      })),
    [inventory],
  );

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(214,161,61,0.28),transparent_36%),linear-gradient(180deg,#111111,#070707)]" />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-[2.5rem] border border-amber-200/15 bg-white/[0.045] p-5 shadow-glow backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow={copy[language].eyebrow}
              title={copy[language].title}
              description={copy[language].description}
            />
            <LanguageToggle language={language} onChange={setLanguage} />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-black/30 p-4">
              <QrCode className="text-amber-200" />
              <div>
                <p className="text-sm font-semibold">Scan-to-order ready</p>
                <p className="text-xs text-white/45">No app install required</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-black/30 p-4">
              <Clock3 className="text-amber-200" />
              <div>
                <p className="text-sm font-semibold">{copy[language].open}</p>
                <p className="text-xs text-white/45">Kitchen closes at 22:30</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-black/30 p-4">
              <MapPin className="text-amber-200" />
              <div>
                <p className="text-sm font-semibold">{copy[language].location}</p>
                <p className="text-xs text-white/45">Wine cellar and terrace</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 space-y-12">
          {groupedItems.map(({ category, items }) => (
            <section key={category} id={category.toLowerCase()}>
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.32em] text-amber-200">
                    <Star size={14} />
                    {category}
                  </p>
                  <h2 className="mt-2 font-display text-3xl text-white">
                    {category === "Mains" ? "House Specialties" : category}
                  </h2>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                  {items.length} items
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <MenuItemCard key={item.id} item={item} language={language} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
