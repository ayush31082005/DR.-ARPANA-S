import OrderCard from "../components/user/OrderCard";

export default function MyOrders() {
  return (
    <div>
      <h1 className="page-title">My Orders</h1>
      <div className="mt-8 grid gap-5">
        <OrderCard />
        <OrderCard />
      </div>
    </div>
  );
}
