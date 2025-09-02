"use client";

import { motion } from "framer-motion";
import "@/components/css/Store/CustomerReviews.css";

export default function CustomerReviews({ reviews = [] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="customer-reviews-section">
      <div className="customer-reviews-container">
        <h2 className="customer-reviews-title">آراء العملاء</h2>
        <div className="customer-reviews-list">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="customer-review-card"
            >
              <div className="customer-review-avatar"></div>
              <div className="customer-review-rating">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="customer-review-star">
                    ★
                  </span>
                ))}
              </div>
              <p className="customer-review-text">"{review.text}"</p>
              <strong className="customer-review-name">{review.name}</strong>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
