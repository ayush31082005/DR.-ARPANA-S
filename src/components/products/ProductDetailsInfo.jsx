import Button from "../common/Button";
import formatPrice from "../../utils/formatPrice";

export default function ProductDetailsInfo() {
  return (
    <div className="surface p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Supplements</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Vitamin C Tablets</h1>
      <p className="mt-4 text-xl font-bold text-primary">{formatPrice(299)}</p>
      <p className="mt-5 text-sm leading-7 text-slate-600">Detailed product information area for benefits, dosage guidance, delivery details, stock, reviews, and related products.</p>
      <div className="mt-6 flex flex-wrap gap-4">
        <Button>Add to Cart</Button>
        <Button variant="outline">Buy Now</Button>
      </div>
    </div>
  );
}
