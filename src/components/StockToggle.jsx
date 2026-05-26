export default function StockToggle({ enabled, onChange, label }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={enabled}
      aria-label={label}
      className={[
        "relative inline-flex h-8 w-14 flex-shrink-0 items-center rounded-full border transition",
        enabled
          ? "border-emerald-300/40 bg-emerald-400/30"
          : "border-red-300/40 bg-red-500/25",
      ].join(" ")}
    >
      <span
        className={[
          "inline-block h-6 w-6 rounded-full bg-white shadow-lg transition",
          enabled ? "translate-x-7" : "translate-x-1",
        ].join(" ")}
      />
    </button>
  );
}
