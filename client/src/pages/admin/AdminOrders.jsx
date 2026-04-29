import { useEffect, useState } from "react";
import { getAdminOrders, updateAdminOrderStatus } from "../../services/adminService";
import Pagination from "../../components/ui/Pagination";

const statusClasses = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-sky-100 text-sky-700",
  shipped: "bg-violet-100 text-violet-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};
const ITEMS_PER_PAGE = 10;

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await getAdminOrders();
        setOrders(response.orders || []);
      } catch (fetchError) {
        setError(
          fetchError.response?.data?.message || "Unable to fetch orders"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [orders.length]);

  const handleStatusChange = async (id, orderStatus) => {
    try {
      const response = await updateAdminOrderStatus(id, orderStatus);
      setOrders((current) =>
        current.map((item) => (item._id === id ? response.order : item))
      );
    } catch (updateError) {
      setError(
        updateError.response?.data?.message || "Unable to update order status"
      );
    }
  };

  const totalPages = Math.max(1, Math.ceil(orders.length / ITEMS_PER_PAGE));
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-black text-slate-900">Orders</h1>

      {error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Address</th>
                <th className="p-4 text-left">Items</th>
                <th className="p-4 text-left">Payment</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Placed On</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-500">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="p-4">
                      <div className="font-semibold text-slate-800">
                        {item.shippingInfo?.fullName || "Customer"}
                      </div>
                      <div className="text-xs text-slate-500">
                        {item.shippingInfo?.phone || item.shippingInfo?.email || "No contact"}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      <div className="max-w-[260px]">
                        <div>{item.shippingInfo?.address || "No address"}</div>
                        <div className="text-xs text-slate-500">
                          {[item.shippingInfo?.city, item.shippingInfo?.state, item.shippingInfo?.pincode]
                            .filter(Boolean)
                            .join(", ")}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      {item.items?.length || 0} item(s)
                    </td>
                    <td className="p-4 uppercase text-slate-600">
                      {item.paymentMethod || "cod"}
                    </td>
                    <td className="p-4 font-semibold text-slate-800">
                      Rs. {item.total}
                    </td>
                    <td className="p-4 text-slate-600">
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(item.createdAt))}
                    </td>
                    <td className="p-4">
                      <select
                        value={item.orderStatus}
                        onChange={(event) =>
                          handleStatusChange(item._id, event.target.value)
                        }
                        className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
                          statusClasses[item.orderStatus] || "bg-slate-100 text-slate-700"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!isLoading && orders.length > ITEMS_PER_PAGE ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : null}
    </div>
  );
}
