"use client";

import ProductCard from "../ProductCard";
import "@/components/css/Store/ProductDetails/RelatedProducts.css";

export default function RelatedProducts({ products = [] }) {
  if (products.length === 0) return null;

  return (
    <div className="related-products">
      <h2>منتجات مشابهة</h2>
      <div className="related-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
