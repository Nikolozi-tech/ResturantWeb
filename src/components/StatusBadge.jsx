const styles = {
  Pending: "bg-amber-400/10 text-amber-100 ring-amber-300/20",
  Confirmed: "bg-sky-400/10 text-sky-100 ring-sky-300/20",
  Seated: "bg-emerald-400/10 text-emerald-100 ring-emerald-300/20",
  Cancelled: "bg-red-400/10 text-red-100 ring-red-300/20",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ring-1 ${
        styles[status] || styles.Pending
      }`}
    >
      {status}
    </span>
  );
}
