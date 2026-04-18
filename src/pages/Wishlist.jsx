import useWishlist from "../hooks/useWishlist";
import EmptyState from "../components/common/EmptyState";
import WishlistCard from "../components/user/WishlistCard";

export default function Wishlist() {
  const { items } = useWishlist();

  return (
    <div>
      <h1 className="page-title">Wishlist</h1>
      <div className="mt-8">
        {items.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => <WishlistCard key={item.id} item={item} />)}
          </div>
        ) : (
          <EmptyState title="Wishlist is empty" description="Save products to see them here later." />
        )}
      </div>
    </div>
  );
}
