import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import formatPrice from "../../utils/formatPrice";

export default function CheckoutForm({
  items,
  onRemove,
  onChangeQty,
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Cart Review
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Confirm your selected products
          </h2>
        </div>

        <Link
          to="/shop"
          className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary sm:inline-flex"
        >
          <ArrowLeft size={16} />
          Add More
        </Link>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-card"
          >
            <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex gap-4">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[22px] border border-slate-200 bg-slate-100 sm:h-28 sm:w-28">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.name}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                    {item.description ||
                      "Premium wellness product selected for your home-care routine."}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="rounded-full bg-teal-50 px-3 py-1 font-semibold text-teal-700">
                      Qty: {item.qty}
                    </span>
                    <span className="rounded-full bg-sky-50 px-3 py-1 font-semibold text-sky-700">
                      Secure delivery
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:items-end">
                <p className="text-2xl font-bold text-slate-900">
                  {formatPrice(item.price * item.qty)}
                </p>

                <div className="inline-flex items-center rounded-2xl border border-slate-200 bg-white">
                  <button
                    type="button"
                    onClick={() => onChangeQty(item.id, item.qty - 1)}
                    className="grid h-11 w-11 place-items-center text-slate-600"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="grid min-w-[54px] border-x border-slate-200 px-3 py-3 text-sm font-semibold text-slate-900">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => onChangeQty(item.id, item.qty + 1)}
                    className="grid h-11 w-11 place-items-center text-slate-600"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 transition hover:text-rose-700"
                >
                  <Trash2 size={15} />
                  Remove
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 text-sm text-slate-500 sm:px-6">
              <ShieldCheck size={16} className="text-emerald-600" />
              Packed with care for clinic-grade quality and safe doorstep delivery.
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
