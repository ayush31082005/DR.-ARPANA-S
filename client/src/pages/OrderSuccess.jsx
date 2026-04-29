import { Link, useLocation } from "react-router-dom";
import { CheckCheck, MapPin, Package, WalletCards } from "lucide-react";
import Button from "../components/common/Button";
import formatPrice from "../utils/formatPrice";

export default function OrderSuccess() {
  const { state } = useLocation();

  return (
    <section className="section-space bg-[linear-gradient(180deg,#f8fafc_0%,#eefaf8_100%)]">
      <div className="container-padded">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-card">
            <div className="bg-[linear-gradient(135deg,#0f766e_0%,#0ea5e9_100%)] px-8 py-10 text-white">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-white/15">
                <CheckCheck size={30} />
              </div>
              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Order placed successfully
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-100 sm:text-base">
                Your wellness order is confirmed and our team will process it
                shortly for safe and timely delivery.
              </p>
            </div>

            <div className="grid gap-5 px-6 py-6 sm:px-8 sm:py-8 lg:grid-cols-3">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <Package size={20} className="text-primary" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Order Details
                  </h3>
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Order ID
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {state?.id || "ORD-DEMO-001"}
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  Total
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {formatPrice(state?.orderTotal || 0)}
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-primary" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Delivery Address
                  </h3>
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-900">
                  {state?.selectedAddress?.fullName || "Saved Address"}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {state?.selectedAddress
                    ? `${state.selectedAddress.address}, ${state.selectedAddress.city}, ${state.selectedAddress.state} - ${state.selectedAddress.pincode}`
                    : "Your selected delivery address will appear here."}
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <WalletCards size={20} className="text-primary" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Payment
                  </h3>
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-900">
                  {state?.paymentMethod === "online"
                    ? "Online Payment"
                    : "Cash on Delivery"}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {state?.paymentMethod === "online"
                    ? "Your online payment flow will continue securely after order placement."
                    : "Please keep the payable amount ready at the time of delivery."}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/my-orders">
              <Button>View Orders</Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
