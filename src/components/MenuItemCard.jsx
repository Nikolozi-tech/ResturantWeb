import ViralBadge from "./ViralBadge.jsx";
import { useLanguage } from "../context/LanguageContext.js";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";

export default function MenuItemCard({ item }) {
  const { language } = useLanguage();
  const isGeorgian = language === "ge";

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-neutral-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-neutral-100">
        <img
          src={item.image}
          alt={isGeorgian ? item.name : item.nameEn}
          loading="lazy"
          onError={handleImageError}
          className={[
            "h-56 w-full rounded-t-2xl object-cover object-center transition-all duration-300 ease-in-out hover:scale-105 group-hover:scale-105",
            item.isAvailable ? "" : "grayscale",
          ].join(" ")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
          {isGeorgian ? item.categoryGe : item.category}
        </div>
        {item.isViral && <div className="absolute right-4 top-4"><ViralBadge /></div>}
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold leading-tight text-slate-950">{isGeorgian ? item.name : item.nameEn}</h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
              {isGeorgian ? item.description : item.descriptionEn}
            </p>
          </div>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-700 shadow-sm">
            ₾{item.price}
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Maracana</span>
          <span className={item.isAvailable ? "text-xs font-semibold text-emerald-700" : "text-xs font-semibold text-rose-700"}>
            {item.isAvailable ? (isGeorgian ? "მარაგშია" : "Available") : isGeorgian ? "ამოწურულია" : "Out of stock"}
          </span>
        </div>
      </div>

      {!item.isAvailable && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/68 backdrop-blur-[2px] transition-all duration-300 ease-in-out">
          <div className="rounded-full border border-rose-200 bg-white px-5 py-2 text-sm font-bold text-rose-700 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            ამოწურულია / Out of Stock
          </div>
        </div>
      )}
    </article>
  );
}
