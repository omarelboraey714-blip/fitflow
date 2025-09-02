"use client";

import { motion } from "framer-motion";
import "@/components/css/Store/ProductDetails/ProductHero.css";

export default function ProductHero({ product, avgRating }) {
  const images = product.images || [product.image];

  return (
    <section className="product-hero-section">
      <div className="product-hero-container">
        <div className="product-hero-images">
          {images.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt={product.name}
              className="product-hero-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
            />
          ))}
        </div>
        <div className="product-hero-info">
          <h1 className="product-hero-title">{product.name}</h1>
          <p className="product-hero-rating">التقييم: ⭐ {avgRating}</p>
          <p className="product-hero-price">{product.price} ر.س</p>
          {product.discount_percent > 0 && (
            <p className="product-hero-discount">
              خصم {product.discount_percent}%!
            </p>
          )}
          <p className="product-hero-description">
            {product.short_description}
          </p>
          <button className="product-hero-button">أضف للسلة</button>
        </div>
      </div>
    </section>
  );
}
