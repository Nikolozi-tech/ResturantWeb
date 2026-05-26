import { Sparkles } from "lucide-react";
import { useMenu } from "../context/MenuContext.js";

export default function ViralBadge() {
  const { language } = useMenu();

  return (
    <span className="viral-badge inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-700 shadow-sm">
      <Sparkles size={12} />
      {language === "ge" ? "TikTok-ზე ვირუსული" : "Viral on TikTok"}
    </span>
  );
}
