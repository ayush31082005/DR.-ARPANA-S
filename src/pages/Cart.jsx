import { Link } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import useCart from "../hooks/useCart";

export default function Cart() {
  const { items, removeFromCart, updateQty, totalPrice, totalItems } = useCart();

  return (
    <section className="bg-slate-50 py-8 md:py-12">
      <div className="container-padded">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Cart
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Shopping Cart
            </h1>
          </div>
          {items.length ? (
            <p className="text-sm text-slate-500">
              {totalItems} item{totalItems > 1 ? "s" : ""} in your basket
            </p>
          ) : null}
        </div>

        {items.length ? (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-4">
              <div className="rounded-[28px] border border-slate-200 bg-white shadow-card">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Cart Items
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Review your selected home-care products before checkout.
                    </p>
                  </div>
                  <Link
                    to="/shop"
                    className="text-sm font-semibold text-primary hover:text-teal-700"
                  >
                    Add More
                  </Link>
                </div>

                <div className="divide-y divide-slate-200">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onRemove={removeFromCart}
                      onChangeQty={updateQty}
                    />
                  ))}
                </div>
              </div>
            </div>

            <CartSummary totalPrice={totalPrice} totalItems={totalItems} />
          </div>
        ) : (
          <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-16 text-center shadow-card">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-xl font-bold text-primary">
              0
            </div>
            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              Your cart is empty
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-slate-500">
              Add health and home-care products to your cart to continue shopping.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
