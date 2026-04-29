import { Link } from "react-router-dom";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
      <Link to="/" className="hover:text-primary">Home</Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <span>/</span>
          {item.path ? <Link to={item.path} className="hover:text-primary">{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
