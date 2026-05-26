import { Languages } from "lucide-react";
import { useMenu } from "../context/MenuContext.js";

export default function LanguageToggle({ compact = false }) {
  const { language, setLanguage } = useMenu();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-neutral-200/80 bg-white p-1 shadow-sm">
      {!compact && <Languages className="ml-2 text-neutral-500" size={16} />}
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
              ? "bg-neutral-900 text-white shadow-sm"
              : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900",
          ].join(" ")}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
