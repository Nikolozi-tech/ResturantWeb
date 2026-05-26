import { Beef, Coffee, CupSoda, Drumstick, Flame, Leaf, Pizza, Sandwich, Soup, Utensils } from "lucide-react";
import ViralBadge from "./ViralBadge.jsx";
import { useMenu } from "../context/MenuContext.js";

const visualConfig = {
  tomato: { icon: Pizza, gradient: "from-red-50 via-orange-50 to-amber-100", accent: "text-red-500" },
  pepperoni: { icon: Flame, gradient: "from-rose-50 via-red-50 to-orange-100", accent: "text-rose-600" },
  cheese: { icon: Pizza, gradient: "from-amber-50 via-yellow-50 to-orange-100", accent: "text-amber-600" },
  burger: { icon: Beef, gradient: "from-orange-50 via-amber-50 to-lime-100", accent: "text-orange-700" },
  chicken: { icon: Drumstick, gradient: "from-yellow-50 via-orange-50 to-neutral-100", accent: "text-amber-700" },
  sandwich: { icon: Sandwich, gradient: "from-lime-50 via-amber-50 to-orange-100", accent: "text-lime-700" },
  salad: { icon: Leaf, gradient: "from-emerald-50 via-lime-50 to-neutral-100", accent: "text-emerald-600" },
  fries: { icon: Utensils, gradient: "from-yellow-50 via-amber-50 to-orange-100", accent: "text-yellow-700" },
  potatoes: { icon: Soup, gradient: "from-red-50 via-orange-50 to-yellow-100", accent: "text-orange-600" },
  cola: { icon: CupSoda, gradient: "from-red-50 via-neutral-50 to-stone-100", accent: "text-red-600" },
  coffee: { icon: Coffee, gradient: "from-stone-100 via-amber-50 to-neutral-100", accent: "text-stone-700" },
};

export default function MenuItemCard({ item, category }) {
  const { language } = useMenu();
  const config = visualConfig[item.visual] || visualConfig.tomato;
  const Icon = config.icon;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative">
        <div className={`aspect-video w-full overflow-hidden rounded-t-xl bg-neutral-100 object-cover bg-gradient-to-br ${config.gradient}`}>
          <div className="flex h-full items-center justify-center">
            <div className="grid h-20 w-20 place-items-center rounded-full border border-white/80 bg-white/75 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
              <Icon className={config.accent} size={38} strokeWidth={1.8} />
            </div>
          </div>
        </div>
        <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-neutral-600 shadow-sm backdrop-blur-sm">
          {category.label[language]}
        </div>
        {item.viral && <div className="absolute right-4 top-4"><ViralBadge /></div>}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold leading-tight text-neutral-950">{item.name[language]}</h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-neutral-600">{item.description[language]}</p>
          </div>
          <span className="rounded-full bg-neutral-950 px-3 py-1.5 text-sm font-bold text-white">₾{item.price}</span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">Maracana Bistro</span>
          <span className={item.available ? "text-xs font-semibold text-emerald-700" : "text-xs font-semibold text-rose-700"}>
            {item.available ? (language === "ge" ? "მარაგშია" : "Available") : language === "ge" ? "ამოწურულია" : "Out of stock"}
          </span>
        </div>
      </div>

      {!item.available && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/72 backdrop-blur-[2px]">
          <div className="rounded-full border border-rose-200 bg-white px-5 py-2 text-sm font-bold text-rose-700 shadow-sm">
            დროებით ამოწურულია / Out of Stock
          </div>
        </div>
      )}
    </article>
  );
}
