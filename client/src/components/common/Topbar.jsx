export default function Topbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] hidden h-8 border-b border-[#ecc4d4] bg-[#6f2849] text-xs text-white xl:block">
      <div className="container-padded flex h-full items-center justify-between">
        <p>Call us: +91 98765 43210</p>
        <p>Email: support@clinicecommerce.com | Open: 9 AM - 9 PM</p>
      </div>
    </div>
  );
}
