import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import formatPrice from "../../utils/formatPrice";
import calculateDiscount from "../../utils/calculateDiscount";
import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ product, theme, compact = false }) {
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
  const isShopLime = theme === "shop-lime";
  const cardClass = isShopLime
    ? "h-full overflow-hidden rounded-[12px] border border-[#a9df6a] bg-[#dff8bf] shadow-[0_12px_30px_rgba(123,234,24,0.18)]"
    : "h-full overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]";
  const imageWrapClass = isShopLime
    ? `block overflow-hidden bg-[#c9f58e] ${compact ? "aspect-[5/4] p-1.5" : "aspect-[4/3] p-2"}`
    : `block overflow-hidden bg-slate-50 ${compact ? "aspect-[5/4] p-1.5" : "aspect-[4/3] p-2"}`;
  const descriptionBoxClass = isShopLime
    ? `mt-2 px-2.5 ${compact ? "min-h-[44px] py-1.5" : "min-h-[56px] py-2"}`
    : `mt-2 rounded-[10px] bg-slate-50 px-2.5 ${compact ? "min-h-[44px] py-1.5" : "min-h-[56px] py-2"}`;
  const discountClass = isShopLime
    ? "mt-1 text-sm font-semibold text-[#35690d]"
    : "mt-1 text-sm font-semibold text-fuchsia-600";
  const titleClass = isShopLime ? "hover:text-[#5ea918]" : "hover:text-primary";
  const buyNowClass = isShopLime
    ? "mt-2 flex w-full items-center justify-center rounded-[8px] border border-[#35690d] bg-[#4f8f16] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#3f7810]"
    : "mt-2 flex w-full items-center justify-center rounded-[8px] border border-slate-200 px-3 py-2 text-sm font-medium text-primary transition hover:border-primary/30 hover:bg-primary/5 hover:text-teal-700";
  const quantityBoxClass = isShopLime
    ? "flex items-center justify-between rounded-[8px] border border-[#35690d] bg-[#5ea918] px-3 py-2 text-sm font-semibold text-white"
    : "flex items-center justify-between rounded-[8px] border border-emerald-700 px-3 py-2 text-sm font-semibold text-emerald-800";
  const quantityButtonClass = isShopLime
    ? "grid h-6 w-6 place-items-center rounded-full transition hover:bg-white/15"
    : "grid h-6 w-6 place-items-center rounded-full transition hover:bg-emerald-50";
  const addToCartClass = isShopLime
    ? "flex w-full items-center justify-center gap-2 rounded-[8px] border border-[#35690d] bg-[#5ea918] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#4f8f16]"
    : "flex w-full items-center justify-center gap-2 rounded-[8px] border border-emerald-700 px-3 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-50";

  const handleAddToCart = () => {
    if (!isAuthenticated || !localStorage.getItem("token")) {
      navigate("/login");
      return false;
    }

    addToCart(product);
    return true;
  };

  const handleBuyNow = () => {
    if (!isAuthenticated || !localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    if (!cartItem) {
      const wasAdded = handleAddToCart();

      if (!wasAdded) {
        return;
      }
    }

    navigate("/checkout");
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={cardClass}
    >
      <Link
        to={`/shop/${product.id}`}
        className={imageWrapClass}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full rounded-[10px] object-cover object-center transition duration-300 hover:scale-105"
        />
      </Link>

      <div className={`flex flex-col ${compact ? "px-2.5 pb-2.5 pt-2" : "px-3 pb-3 pt-2"}`}>
        <Link
          to={`/shop/${product.id}`}
          className={`font-semibold text-slate-950 transition ${compact ? "text-[13px] leading-5" : "text-[14px] leading-6"} ${titleClass}`}
        >
          {product.name}
        </Link>

        {quantityText ? (
          <p className={`mt-0.5 font-medium text-slate-600 ${compact ? "text-[13px]" : "text-sm"}`}>{quantityText}</p>
        ) : null}

        <div className={descriptionBoxClass}>
          <p className={`text-slate-700 ${compact ? "text-[12px] leading-4.5" : "text-[13px] leading-5"}`}>
            {descriptionText}
          </p>
        </div>

        <div className={`mt-2 flex items-end gap-1.5 ${compact ? "text-[12px]" : ""}`}>
          <span className={`${compact ? "text-[12px]" : "text-sm"} text-slate-500 line-through`}>
            {formatPrice(originalPrice)}
          </span>
          <span className={`${compact ? "text-[14px]" : "text-[15px]"} font-bold text-slate-950`}>{formatPrice(product.price)}</span>
        </div>

        {discountPercent > 0 ? (
          <p className={discountClass}>{discountPercent}% OFF</p>
        ) : null}

        <button
          type="button"
          onClick={handleBuyNow}
          className={`${buyNowClass} ${compact ? "!mt-1.5 !py-1.5 !text-[13px]" : ""}`}
        >
          Buy Now
        </button>

        <div className={compact ? "mt-2" : "mt-3"}>
          {quantity > 0 ? (
            <div className={`${quantityBoxClass} ${compact ? "!py-1.5" : ""}`}>
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
                className={quantityButtonClass}
              >
                <Minus size={16} />
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                aria-label={`Increase quantity for ${product.name}`}
                onClick={handleAddToCart}
                className={quantityButtonClass}
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              aria-label={`Add ${product.name} to cart`}
              onClick={handleAddToCart}
              className={`${addToCartClass} ${compact ? "!py-1.5 !text-[13px]" : ""}`}
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
