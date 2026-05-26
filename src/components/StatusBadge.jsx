const statusStyles = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Seated: "bg-blue-50 text-blue-700 ring-blue-200",
  Cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
};

export default function StatusBadge({ status }) {
  return (
    <span className={(statusStyles[status] || statusStyles.Pending) + " inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1"}>
      {status}
    </span>
  );
}
