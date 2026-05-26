import { Flame, Image, Sparkles } from "lucide-react";

export default function MenuItemCard({ item, language = "en", compact = false }) {
  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/30">
      <div
        className={`relative ${compact ? "min-h-32" : "min-h-44"} overflow-hidden bg-gradient-to-br ${
          item.imageTone
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_35%),linear-gradient(180deg,transparent,rgba(0,0,0,0.72))]" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          <Image size={14} />
          Chef photo
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">
              <Sparkles size={14} />
              {item.category}
            </p>
            <h3 className="font-display text-2xl font-semibold text-white">
              {item.name[language]}
            </h3>
          </div>
          <span className="rounded-full bg-amber-300 px-3 py-1.5 text-sm font-black text-black">
            ₾{item.price}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <p className="text-sm leading-6 text-white/68">{item.description[language]}</p>
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span
            className={[
              "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em]",
              item.inStock ? "bg-emerald-400/10 text-emerald-200" : "bg-red-500/10 text-red-200",
            ].join(" ")}
          >
            <Flame size={14} />
            {item.inStock ? "In Stock" : "Out of Stock"}
          </span>
          <span className="text-xs text-white/35">Supra House Signature</span>
        </div>
      </div>

      {!item.inStock && (
        <div className="absolute inset-0 grid place-items-center bg-black/68 backdrop-blur-[2px]">
          <div className="-rotate-6 rounded-2xl border-2 border-red-300/80 bg-red-950/80 px-6 py-3 text-center shadow-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-red-100">Out of Stock</p>
            <p className="mt-1 text-sm text-red-100/70">Please ask your waiter for alternatives</p>
          </div>
        </div>
      )}
    </article>
  );
}
