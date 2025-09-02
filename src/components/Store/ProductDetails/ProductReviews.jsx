"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import "@/components/css/Store/ProductDetails/ProductReviews.css";

export default function ProductReviews({ reviews = [], productId }) {
  const { user } = useCart(); // افترض أن عندك user في الكونטקסט
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // أرسل التقييم لـ /api/reviews
  };

  return (
    <div className="product-reviews">
      <h3>آراء العملاء</h3>
      {reviews.length === 0 ? (
        <p>لا توجد آراء بعد.</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((r, i) => (
            <div key={i} className="review-card">
              <p>
                <strong>{r.user_name}</strong> ⭐ {r.rating}
              </p>
              <p>"{r.comment}"</p>
            </div>
          ))}
        </div>
      )}

      {user && (
        <form onSubmit={handleSubmit} className="add-review-form">
          <h4>أضف رأيك</h4>
          <div>
            <label>التقييم:</label>
            <select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: e.target.value })
              }
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} نجوم
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            placeholder="اكتب رأيك..."
            required
          />
          <button type="submit">أرسل التقييم</button>
        </form>
      )}
    </div>
  );
}
