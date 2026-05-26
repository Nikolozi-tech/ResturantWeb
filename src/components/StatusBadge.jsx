const styles = {
  Pending: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  Confirmed: "border-green-500/30 bg-green-500/10 text-green-300",
  Seated: "border-sky-400/30 bg-sky-400/10 text-sky-200",
  Cancelled: "border-red-400/30 bg-red-500/10 text-red-200",
};

export default function StatusBadge({ status }) {
  return (
    <span className={(styles[status] || styles.Pending) + " inline-flex rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em]"}>
      {status}
    </span>
  );
}
