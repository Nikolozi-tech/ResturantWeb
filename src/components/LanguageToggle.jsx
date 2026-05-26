import { Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.js";

export default function LanguageToggle({ compact = false }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-white p-1 shadow-sm">
      {!compact && <Languages className="ml-2 text-amber-600" size={16} />}
      {[
        { id: "ge", label: "GE" },
        { id: "en", label: "EN" },
      ].map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => setLanguage(option.id)}
          className={[
            "rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300",
            language === option.id
              ? "bg-amber-600 text-white shadow-sm"
              : "text-slate-500 hover:bg-amber-50 hover:text-amber-700",
          ].join(" ")}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
