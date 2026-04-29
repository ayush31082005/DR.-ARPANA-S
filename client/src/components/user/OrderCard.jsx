import formatDate from "../../utils/formatDate";
import formatPrice from "../../utils/formatPrice";

const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-sky-100 text-sky-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-rose-100 text-rose-700",
};

export default function OrderCard({ item }) {
  const itemCount =
    item?.items?.reduce((sum, product) => sum + (product.quantity || 0), 0) || 0;

  return (
    <div className="surface p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">
            Order #{item?._id?.slice(-8)?.toUpperCase() || "N/A"}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {itemCount} item{itemCount !== 1 ? "s" : ""} •{" "}
            {formatDate(item?.createdAt) || "Recently placed"}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
            statusStyles[item?.orderStatus] || "bg-slate-100 text-slate-700"
          }`}
        >
          {item?.orderStatus || "pending"}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <p>
          Payment:{" "}
          <span className="font-semibold capitalize text-slate-900">
            {item?.paymentMethod || "cod"}
          </span>
        </p>
        <p>
          Payment Status:{" "}
          <span className="font-semibold capitalize text-slate-900">
            {item?.paymentStatus || "pending"}
          </span>
        </p>
        <p>
          Customer:{" "}
          <span className="font-semibold text-slate-900">
            {item?.shippingInfo?.fullName || "N/A"}
          </span>
        </p>
        <p>
          Total:{" "}
          <span className="font-semibold text-slate-900">
            {formatPrice(item?.total || 0)}
          </span>
        </p>
      </div>

      {item?.shippingInfo ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <span className="font-semibold text-slate-900">Delivery:</span>{" "}
          {item.shippingInfo.address}, {item.shippingInfo.city},{" "}
          {item.shippingInfo.state} - {item.shippingInfo.pincode}
        </div>
      ) : null}
    </div>
  );
}
