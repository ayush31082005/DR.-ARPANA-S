export default function CheckoutForm() {
  return (
    <form className="surface grid gap-4 p-6">
      <h3 className="text-lg font-semibold text-slate-900">Checkout Details</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <input className="input-base" placeholder="Full name" />
        <input className="input-base" placeholder="Phone number" />
      </div>
      <input className="input-base" placeholder="Email address" />
      <textarea className="input-base min-h-[120px]" placeholder="Delivery address" />
      <button className="btn-primary">Place Order</button>
    </form>
  );
}
