"use client";

import { motion } from "framer-motion";
import "@/components/css/Store/BestSellers.css";

export default function BestSellers({ products = [] }) {
  const bestSellers = products.filter((p) => p.is_best_seller);

  if (bestSellers.length === 0) return null;

  return (
    <section className="best-sellers-section">
      <div className="best-sellers-container">
        <h2 className="best-sellers-title">الأكثر مبيعًا</h2>
        <div className="best-sellers-list">
          {bestSellers.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="best-sellers-card"
            >
              <img
                src={product.image}
                alt={product.name}
                className="best-sellers-image"
              />
              <h3 className="best-sellers-name">{product.name}</h3>
              <p className="best-sellers-price">{product.price} ر.س</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
