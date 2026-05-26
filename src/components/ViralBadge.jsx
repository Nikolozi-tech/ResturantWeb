import { Sparkles } from "lucide-react";
import { useMenu } from "../context/MenuContext.js";

export default function ViralBadge() {
  const { language } = useMenu();

  return (
    <span className="viral-shimmer inline-flex items-center gap-1 rounded-full border border-amber-300/50 bg-amber-500/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-amber-100 shadow-lg shadow-amber-500/20 backdrop-blur-md">
      <Sparkles size={12} />
      {language === "ge" ? "TikTok-ზე ვირუსული" : "Viral on TikTok"}
    </span>
  );
}
