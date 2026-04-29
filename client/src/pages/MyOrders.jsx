import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import Loader from "../components/common/Loader";
import OrderCard from "../components/user/OrderCard";
import useAuth from "../hooks/useAuth";
import { getMyOrders } from "../services/orderService";

export default function MyOrders() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        const response = await getMyOrders();
        setOrders(response.orders || []);
      } catch (fetchError) {
        setError(
          fetchError.response?.data?.message || "Unable to fetch your orders"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (!isAuthLoading) {
      fetchOrders();
    }
  }, [isAuthLoading, user]);

  if (isAuthLoading || isLoading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <EmptyState
        title="Login required"
        description="Please login first to view your orders."
      />
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Orders
          </p>
          <h1 className="page-title mt-2">My Orders</h1>
        </div>
        <Link to="/shop" className="btn-outline self-start">
          Continue Shopping
        </Link>
      </div>

      {error ? (
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {orders.length ? (
        <div className="mt-8 grid gap-5">
          {orders.map((order) => (
            <OrderCard key={order._id} item={order} />
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            title="No orders yet"
            description="Once you place a product order from checkout, it will appear here."
          />
        </div>
      )}
    </div>
  );
}
