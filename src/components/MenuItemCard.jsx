import { CircleDollarSign, ImageIcon, RadioTower } from "lucide-react";
import ViralBadge from "./ViralBadge.jsx";
import { useMenu } from "../context/MenuContext.js";

export default function MenuItemCard({ item, category }) {
  const { language } = useMenu();

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-[1.75rem] border border-amber-500/20 bg-neutral-900/80 shadow-2xl shadow-black/40 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-green-500/45 hover:shadow-green-500/10",
        !item.inStock ? "opacity-70" : "",
      ].join(" ")}
    >
      <div className={"relative min-h-44 overflow-hidden bg-gradient-to-br " + item.imageTone}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.26),transparent_28%),linear-gradient(180deg,rgba(10,10,10,0.05),rgba(10,10,10,0.84))]" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-neutral-950/40 px-3 py-1.5 text-xs font-bold text-white/80 backdrop-blur-md">
          <ImageIcon size={14} className="text-green-400" />
          {language === "ge" ? "ფოტო მალე" : "Image placeholder"}
        </div>
        {item.isViral && <div className="absolute right-4 top-4"><ViralBadge /></div>}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-neutral-950/45 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-amber-300 backdrop-blur-md">
            <RadioTower size={13} />
            {category.label[language]}
          </p>
          <div className="flex items-end justify-between gap-4">
            <h3 className="font-display text-2xl font-black leading-tight text-white">{item.name[language]}</h3>
            <span className="inline-flex items-center gap-1 rounded-2xl bg-green-500 px-3 py-2 text-sm font-black text-neutral-950 shadow-lg shadow-green-500/30">
              <CircleDollarSign size={15} />₾{item.price}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <p className="min-h-12 text-sm leading-6 text-white/65">{item.description[language]}</p>
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className={item.inStock ? "text-xs font-black uppercase tracking-[0.22em] text-green-500" : "text-xs font-black uppercase tracking-[0.22em] text-red-300"}>
            {item.inStock ? (language === "ge" ? "მარაგშია" : "In Stock") : language === "ge" ? "ამოიწურა" : "Out of Stock"}
          </span>
          <span className="text-xs text-white/35">Maracana Stadium Lounge</span>
        </div>
      </div>

      {!item.inStock && (
        <div className="absolute inset-0 grid place-items-center bg-neutral-950/72 backdrop-blur-[2px]">
          <div className="rounded-2xl border border-red-300/50 bg-red-950/80 px-6 py-4 text-center shadow-2xl">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-red-100">
              {language === "ge" ? "დროებით ამოიწურა" : "Temporarily Out"}
            </p>
            <p className="mt-1 text-sm text-red-100/70">
              {language === "ge" ? "მიმართეთ პერსონალს" : "Ask staff for alternatives"}
            </p>
          </div>
        </div>
      )}
    </article>
  );
}
