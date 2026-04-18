import { motion } from "framer-motion";
import Button from "../common/Button";
import useCart from "../../hooks/useCart";
import formatPrice from "../../utils/formatPrice";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="card-soft h-full overflow-hidden"
    >
      <div className="h-28 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 sm:h-32">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      <div className="flex h-[calc(100%-7rem)] flex-col p-3 sm:h-[calc(100%-8rem)]">
        <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{product.name}</h3>
        <p className="mt-1 text-xs leading-5 text-slate-600">{product.description}</p>
        <div className="mt-2">
          <span className="text-sm font-bold text-primary sm:text-base">{formatPrice(product.price)}</span>
        </div>
        <Button className="mt-3 w-full px-3 py-2 text-xs sm:text-sm" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
