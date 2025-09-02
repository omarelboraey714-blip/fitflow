"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import "@/components/css/Store/ProductsGrid.css";

export default function ProductsGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400">لا توجد منتجات بعد.</div>
    );
  }

  return (
    <section className="products-grid-section">
      <div className="products-grid-container">
        <h2 className="products-grid-title">جميع المنتجات</h2>
        <motion.div
          className="products-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
