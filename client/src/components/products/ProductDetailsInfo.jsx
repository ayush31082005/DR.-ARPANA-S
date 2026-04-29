import { useNavigate } from "react-router-dom";
import formatPrice from "../../utils/formatPrice";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import calculateDiscount from "../../utils/calculateDiscount";
import Button from "../common/Button";

export default function ProductDetailsInfo({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  if (!product) return null;

  const originalPrice = product.originalPrice && product.originalPrice > product.price
    ? product.originalPrice
    : Math.round(product.price * 1.18);
  const discountPercent = product.discountPercent ?? calculateDiscount(originalPrice, product.price);
  const quantityText = product.quantityLabel || (product.stock ? `${product.stock} in stock` : "");
  const shortDetailsText = product.shortDetails || product.description || "";

  const handleBuyNow = () => {
    if (!isAuthenticated || !localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    addToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="max-w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-card lg:inline-block lg:w-auto">
      <div className="grid gap-0 lg:grid-cols-[auto_auto]">
        <div className="flex justify-center border-b border-slate-100 p-2 lg:justify-start lg:border-b-0 lg:border-r lg:p-2">
          <img
            src={product.image}
            alt={product.name}
            className="h-56 w-auto max-w-full rounded-[16px] object-contain lg:h-72"
          />
        </div>

        <div className="p-4 text-left md:p-5 lg:min-w-[420px]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            {product.category || "Product"}
          </p>
          <h1 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">{product.name}</h1>

          {quantityText ? (
            <div className="mt-3 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">Quantity:</span> {quantityText}
            </div>
          ) : null}

          {shortDetailsText ? (
            <div className="mt-3 text-sm leading-7 text-slate-600">
              {shortDetailsText}
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap items-end gap-3">
            <p className="text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
            {originalPrice > product.price ? (
              <p className="text-lg text-slate-400 line-through">{formatPrice(originalPrice)}</p>
            ) : null}
            {discountPercent > 0 ? (
              <span className="rounded-full bg-fuchsia-50 px-3 py-1 text-sm font-semibold text-fuchsia-700">
                {discountPercent}% OFF
              </span>
            ) : null}
          </div>

          <div className="mt-5 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">Stock:</span> {product.stock}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            <Button variant="outline" onClick={handleBuyNow}>Buy Now</Button>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-5 md:px-8">
        <details className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
          <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
            View Details
          </summary>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <p>
              {product.description || "Detailed product information for benefits, usage instructions, and everyday wellness support."}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Category:</span> {product.category || "General"}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Available Stock:</span> {product.stock}
            </p>
            {quantityText ? (
              <p>
                <span className="font-semibold text-slate-900">Quantity:</span> {quantityText}
              </p>
            ) : null}
          </div>
        </details>
      </div>
    </div>
  );
}
