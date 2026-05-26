export default function SectionHeader({ eyebrow, title, description, children }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-amber-200">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && <p className="mt-4 text-base leading-7 text-white/62">{description}</p>}
      </div>
      {children}
    </div>
  );
}
