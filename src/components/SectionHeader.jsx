export default function SectionHeader({ eyebrow, title, description, align = "left", children }) {
  return (
    <div className={["mb-8 flex flex-col gap-5", align === "center" ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"].join(" ")}>
      <div className="max-w-3xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-amber-600">{eyebrow}</p>
        <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">{title}</h1>
        {description && <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{description}</p>}
      </div>
      {children}
    </div>
  );
}
