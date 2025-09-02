"use client";

import { useCart } from "@/lib/cart";
import { motion } from "framer-motion";
import "@/components/css/Cart/AddToCartButton.css";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    // ✅ يمكن إضافة toast لاحقًا
    // showToast(`${product.name} تمت إضافته للسلة`);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleAdd}
      className="add-to-cart-button"
      aria-label={`أضف ${product.name} للسلة`}
    >
      أضف للسلة
    </motion.button>
  );
}
