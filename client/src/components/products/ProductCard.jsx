import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import formatPrice from "../../utils/formatPrice";
import calculateDiscount from "../../utils/calculateDiscount";
import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items, addToCart, updateQty, removeFromCart } = useCart();
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.qty ?? 0;
  const quantityText = product.quantityLabel || (product.stock ? `Stock: ${product.stock}` : "");
  const descriptionText = product.shortDetails || product.description || "Product description coming soon.";
  const originalPrice = product.originalPrice && product.originalPrice > product.price
    ? product.originalPrice
    : Math.round(product.price * 1.18);
  const discountPercent = product.discountPercent ?? calculateDiscount(originalPrice, product.price);

  const handleBuyNow = () => {
    if (!isAuthenticated || !localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    if (!cartItem) {
      addToCart(product);
    }

    navigate("/checkout");
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="h-full overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
    >
      <Link
        to={`/shop/${product.id}`}
        className="block aspect-[4/3] overflow-hidden bg-slate-50 p-2"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full rounded-[10px] object-cover object-center transition duration-300 hover:scale-105"
        />
      </Link>

      <div className="flex flex-col px-3 pb-3 pt-2">
        <Link to={`/shop/${product.id}`} className="text-[14px] font-semibold leading-6 text-slate-950 transition hover:text-primary">
          {product.name}
        </Link>

        {quantityText ? (
          <p className="mt-0.5 text-sm font-medium text-slate-600">{quantityText}</p>
        ) : null}

        <div className="mt-2 min-h-[56px] rounded-[10px] bg-slate-50 px-2.5 py-2">
          <p className="text-[13px] leading-5 text-slate-700">
            {descriptionText}
          </p>
        </div>

        <div className="mt-2 flex items-end gap-1.5">
          <span className="text-sm text-slate-500 line-through">
            {formatPrice(originalPrice)}
          </span>
          <span className="text-[15px] font-bold text-slate-950">{formatPrice(product.price)}</span>
        </div>

        {discountPercent > 0 ? (
          <p className="mt-1 text-sm font-semibold text-fuchsia-600">{discountPercent}% OFF</p>
        ) : null}

        <button
          type="button"
          onClick={handleBuyNow}
          className="mt-2 flex w-full items-center justify-center rounded-[8px] border border-slate-200 px-3 py-2 text-sm font-medium text-primary transition hover:border-primary/30 hover:bg-primary/5 hover:text-teal-700"
        >
          Buy Now
        </button>

        <div className="mt-3">
          {quantity > 0 ? (
            <div className="flex items-center justify-between rounded-[8px] border border-emerald-700 px-3 py-2 text-sm font-semibold text-emerald-800">
              <button
                type="button"
                aria-label={`Decrease quantity for ${product.name}`}
                onClick={() => {
                  if (quantity <= 1) {
                    removeFromCart(product.id);
                    return;
                  }

                  updateQty(product.id, quantity - 1);
                }}
                className="grid h-6 w-6 place-items-center rounded-full transition hover:bg-emerald-50"
              >
                <Minus size={16} />
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                aria-label={`Increase quantity for ${product.name}`}
                onClick={() => addToCart(product)}
                className="grid h-6 w-6 place-items-center rounded-full transition hover:bg-emerald-50"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              aria-label={`Add ${product.name} to cart`}
              onClick={() => addToCart(product)}
              className="flex w-full items-center justify-center gap-2 rounded-[8px] border border-emerald-700 px-3 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-50"
            >
              <span>Add to cart</span>
              <Plus size={16} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
