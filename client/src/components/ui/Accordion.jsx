export default function Accordion({ items = [] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.id} className="card-soft p-4">
          <summary className="cursor-pointer font-medium text-slate-900">{item.question}</summary>
          <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
