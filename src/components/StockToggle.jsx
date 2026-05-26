export default function StockToggle({ enabled, onChange, label }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={enabled}
      aria-label={label}
      className={[
        "relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-neutral-200",
        enabled ? "bg-neutral-900" : "bg-neutral-300",
      ].join(" ")}
    >
      <span
        className={[
          "inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300",
          enabled ? "translate-x-6" : "translate-x-1",
        ].join(" ")}
      />
    </button>
  );
}
