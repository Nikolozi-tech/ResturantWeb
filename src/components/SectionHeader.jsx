export default function SectionHeader({ eyebrow, title, description, children }) {
  return (
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.38em] text-green-500">{eyebrow}</p>
        <h1 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && <p className="mt-4 text-base leading-7 text-white/62 sm:text-lg">{description}</p>}
      </div>
      {children}
    </div>
  );
}
