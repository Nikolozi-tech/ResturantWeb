export default function StockToggle({ enabled, onChange, label }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={enabled}
      aria-label={label}
      className={[
        "relative inline-flex h-8 w-16 flex-shrink-0 items-center rounded-full border transition duration-300",
        enabled ? "border-green-500/50 bg-green-500/25" : "border-red-400/50 bg-red-500/20",
      ].join(" ")}
    >
      <span
        className={[
          "h-6 w-6 rounded-full bg-white shadow-lg transition duration-300",
          enabled ? "translate-x-9 shadow-green-500/40" : "translate-x-1 shadow-red-500/30",
        ].join(" ")}
      />
    </button>
  );
}
