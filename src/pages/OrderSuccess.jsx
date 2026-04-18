import { Link } from "react-router-dom";
import Button from "../components/common/Button";

export default function OrderSuccess() {
  return (
    <section className="section-space">
      <div className="container-padded">
        <div className="surface mx-auto max-w-2xl p-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Order Placed Successfully</h1>
          <p className="mt-4 text-sm text-slate-600">Use this page after successful checkout or payment completion.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/my-orders"><Button>View Orders</Button></Link>
            <Link to="/shop"><Button variant="outline">Continue Shopping</Button></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
