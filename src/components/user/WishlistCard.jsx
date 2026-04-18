export default function WishlistCard({ item }) {
  return (
    <div className="surface p-5">
      <h3 className="font-semibold text-slate-900">{item?.name || "Wishlist Item"}</h3>
      <p className="mt-2 text-sm text-slate-600">Saved for later purchase.</p>
    </div>
  );
}
