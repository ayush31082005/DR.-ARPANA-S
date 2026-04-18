export default function Drawer({ title = "Drawer", children }) {
  return (
    <div className="card-soft p-6">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-4">{children || <p className="text-sm text-slate-600">Drawer content placeholder.</p>}</div>
    </div>
  );
}
