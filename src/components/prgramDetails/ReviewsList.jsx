"use client";

import { motion } from "framer-motion";
import AddReviewForm from "./AddReviewForm";
import "@/components/css/prgramDetails/ReviewsList.css";

export default function ReviewsList({ reviews, programId }) {
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  if (!safeReviews || safeReviews.length === 0) {
    return (
      <section
        id="reviews"
        className="reviews-section"
        role="region"
        aria-labelledby="reviews-heading"
      >
        <h2 id="reviews-heading" className="reviews-heading">
          التقييمات
        </h2>
        <p className="text-gray-400" role="alert" aria-live="polite">
          لا توجد تقييمات بعد.
        </p>
        <AddReviewForm programId={programId} />
      </section>
    );
  }

  return (
    <section
      id="reviews"
      className="reviews-section"
      role="region"
      aria-labelledby="reviews-heading"
    >
      <h2 id="reviews-heading" className="reviews-heading">
        التقييمات
      </h2>
      <div className="reviews-list" role="list">
        {safeReviews.map((review, i) => (
          <motion.div
            key={review.id || i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="review-card"
            role="listitem"
          >
            <div className="review-header">
              <strong>{review.user || "مجهول"}</strong>
              <span>{review.rating || 0} نجوم</span>
            </div>
            <p className="review-text">{review.text || "لا يوجد نص تقييم"}</p>
            <small className="review-date">
              {review.date || new Date().toISOString()}
            </small>
          </motion.div>
        ))}
      </div>
      <AddReviewForm programId={programId} />
    </section>
  );
}
