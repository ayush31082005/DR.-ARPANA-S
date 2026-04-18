export default function ProductGallery() {
  return (
    <div className="grid gap-4">
      <div className="h-80 rounded-[28px] bg-gradient-to-br from-slate-100 to-slate-200 md:h-96" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-20 rounded-2xl bg-slate-100 md:h-24" />)}
      </div>
    </div>
  );
}
