import { Languages } from "lucide-react";
import { useMenu } from "../context/MenuContext.js";

export default function LanguageToggle({ compact = false }) {
  const { language, setLanguage } = useMenu();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-neutral-900/80 p-1 shadow-2xl shadow-green-500/10 backdrop-blur-md">
      {!compact && <Languages size={16} className="ml-2 text-green-500" />}
      {[
        { id: "ge", label: "GE" },
        { id: "en", label: "EN" },
      ].map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => setLanguage(option.id)}
          className={[
            "rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] transition duration-300",
            language === option.id
              ? "bg-green-500 text-neutral-950 shadow-lg shadow-green-500/30"
              : "text-white/55 hover:bg-white/10 hover:text-white",
          ].join(" ")}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
