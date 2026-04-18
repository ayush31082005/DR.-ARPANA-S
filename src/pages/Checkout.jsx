import AddressForm from "../components/checkout/AddressForm";
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentMethod from "../components/checkout/PaymentMethod";

export default function Checkout() {
  return (
    <section className="section-space">
      <div className="container-padded">
        <h1 className="page-title">Checkout</h1>
        <div className="mt-10 grid gap-8 xl:grid-cols-[1fr,360px]">
          <div className="space-y-6">
            <CheckoutForm />
            <AddressForm />
            <PaymentMethod />
          </div>
          <OrderSummary />
        </div>
      </div>
    </section>
  );
}
