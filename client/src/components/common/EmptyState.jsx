export default function EmptyState({
  title = "Nothing here yet",
  description = "Content will appear here once data is available.",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}) {
  return (
    <div className={`card-soft flex min-h-[220px] flex-col items-center justify-center p-8 text-center ${className}`}>
      <h3 className={`text-lg font-semibold text-slate-900 ${titleClassName}`}>{title}</h3>
      <p className={`mt-2 max-w-md text-sm text-slate-600 ${descriptionClassName}`}>{description}</p>
    </div>
  );
}
