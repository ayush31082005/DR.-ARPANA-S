import { Link } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import CheckoutProgress from "../components/checkout/CheckoutProgress";
import useCart from "../hooks/useCart";

export default function Cart() {
  const { items, removeFromCart, updateQty, totalPrice, totalItems } = useCart();

  return (
    <section className="bg-[linear-gradient(180deg,#f8fafc_0%,#eefaf8_100%)] py-8 md:py-12">
      <div className="container-padded">
        <div className="mx-auto max-w-[1120px] space-y-8">
          <div className="space-y-4">
            <CheckoutProgress currentStep={1} />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Review your cart before delivery details
              </h1>
              {items.length ? (
                <p className="mt-3 text-sm text-slate-500">
                  {totalItems} item{totalItems > 1 ? "s" : ""} ready for checkout
                </p>
              ) : null}
            </div>
          </div>

          {items.length ? (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                <div className="rounded-[24px] border border-slate-200 bg-white shadow-card">
                  <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        Product Details
                      </h2>
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
      </div>
    </section>
  );
}
