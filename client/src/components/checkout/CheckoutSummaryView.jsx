import { motion } from "framer-motion";
import { MapPin, PackageCheck, Wallet2 } from "lucide-react";
import formatPrice from "../../utils/formatPrice";

export default function CheckoutSummaryView({
  items,
  selectedAddress,
  paymentMethod,
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Review Before Placing Order
        </h2>
      </div>

      <div className="space-y-5">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Product Details
          </h3>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-[20px] border border-slate-200 bg-slate-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-semibold text-slate-900">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Qty {item.qty} • {formatPrice(item.price)} each
                  </p>
                  <p className="mt-3 text-base font-bold text-slate-900">
                    {formatPrice(item.price * item.qty)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Delivery Address
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  {selectedAddress?.fullName}
                </h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              {selectedAddress?.address}, {selectedAddress?.city},{" "}
              {selectedAddress?.state} - {selectedAddress?.pincode}
            </p>
            <p className="mt-3 text-sm font-semibold text-slate-700">
              {selectedAddress?.phone}
            </p>
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-100 text-sky-700">
                <Wallet2 size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Payment Mode
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  {paymentMethod === "online"
                    ? "Online Payment"
                    : "Cash on Delivery"}
                </h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              {paymentMethod === "online"
                ? "You will be redirected to a secure payment flow after placing your order."
                : "Pay when your package arrives at your selected delivery address."}
            </p>
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-gradient-to-br from-teal-50 to-white p-5 shadow-sm lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
                <PackageCheck size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Care Promise
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  Ready for safe doorstep delivery
                </h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Each order is carefully packed to protect wellness products during
              transit and maintain clinic-quality handling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
