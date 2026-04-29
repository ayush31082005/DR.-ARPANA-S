import formatPrice from "../../utils/formatPrice";

export default function CartItem({ item, onRemove, onChangeQty }) {
  return (
    <div className="flex flex-col gap-5 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[20px] border border-slate-200 bg-slate-100">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
          <p className="max-w-xl text-sm leading-6 text-slate-500">
            {item.description || "Premium wellness product selected for your cart."}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-slate-900">
              {formatPrice(item.price)}
            </span>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="text-sm font-semibold text-primary hover:text-teal-700"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 lg:flex-col lg:items-end">
        <div className="inline-flex items-center rounded-2xl border border-slate-200 bg-white">
          <button
            type="button"
            onClick={() => onChangeQty(item.id, item.qty - 1)}
            className="grid h-11 w-11 place-items-center text-lg font-semibold text-slate-600"
          >
            -
          </button>
          <span className="grid h-11 min-w-[52px] place-items-center border-x border-slate-200 text-sm font-semibold text-slate-900">
            {item.qty}
          </span>
          <button
            type="button"
            onClick={() => onChangeQty(item.id, item.qty + 1)}
            className="grid h-11 w-11 place-items-center text-lg font-semibold text-slate-600"
          >
            +
          </button>
        </div>

        <p className="text-sm font-semibold text-slate-900">
          Total: {formatPrice(item.price * item.qty)}
        </p>
      </div>
    </div>
  );
}
