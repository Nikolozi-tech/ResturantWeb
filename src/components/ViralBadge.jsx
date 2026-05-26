import { Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.js";

export default function ViralBadge() {
  const { language } = useLanguage();

  return (
    <span className="viral-badge inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-amber-700 shadow-sm backdrop-blur">
      <Sparkles size={12} />
      {language === "ge" ? "TikTok-ზე ვირუსული" : "Viral on TikTok"}
    </span>
  );
}
