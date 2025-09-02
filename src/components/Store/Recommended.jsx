"use client";

import { motion } from "framer-motion";
import "@/components/css/Store/Recommended.css";

export default function Recommended({ products = [] }) {
  const recommended = products.filter((p) => p.rating >= 4).slice(0, 2);

  if (recommended.length === 0) return null;

  return (
    <section className="recommended-section">
      <div className="recommended-container">
        <h2 className="recommended-title">مقترح لك</h2>
        <div className="recommended-grid">
          {recommended.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="recommended-card"
            >
              <img
                src={product.image}
                alt={product.name}
                className="recommended-image"
              />
              <div>
                <h3 className="recommended-name">{product.name}</h3>
                <p className="recommended-price">{product.price} ر.س</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
