"use client";

import { motion } from "framer-motion";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import "@/components/css/Store/ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover="hover"
      viewport={{ once: true }}
      className="product-card group"
    >
      <div className="product-card-image-container">
        <motion.img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          variants={{
            hover: { scale: 1.1, rotate: 1 },
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          variants={{
            hover: { opacity: 1, y: 0 },
          }}
          className="product-card-overlay"
        >
          <AddToCartButton product={product} />
        </motion.div>
      </div>

      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-rating">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`product-card-star ${
                i < product.rating
                  ? "product-card-star-filled"
                  : "product-card-star-empty"
              }`}
            >
              ★
            </motion.span>
          ))}
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="product-card-price"
        >
          {product.price} ر.س
        </motion.div>
      </div>
    </motion.div>
  );
}
