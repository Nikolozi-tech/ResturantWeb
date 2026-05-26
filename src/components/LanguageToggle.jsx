import { Languages } from "lucide-react";

export default function LanguageToggle({ language, onChange }) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-amber-300/20 bg-black/35 p-1 pl-3 shadow-glow backdrop-blur">
      <Languages className="text-amber-200" size={17} />
      {["en", "ge"].map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={[
            "rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] transition",
            language === option ? "bg-amber-300 text-black" : "text-white/60 hover:text-white",
          ].join(" ")}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
