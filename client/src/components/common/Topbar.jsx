export default function Topbar() {
  return (
    <div className="hidden border-b border-slate-200 bg-slate-950 py-2 text-xs text-white xl:block">
      <div className="container-padded flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>Call us: +91 98765 43210</p>
        <p>Email: support@clinicecommerce.com | Open: 9 AM - 9 PM</p>
      </div>
    </div>
  );
}
